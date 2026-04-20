# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Chimpunerto's Festival** is a Next.js 14 wedding invitation web application for Sole & Dani's 2026 wedding. The app features personalized invitations, RSVP management, Spotify playlist integration (guests can add songs to a shared setlist), location/schedule information, and a festival-themed design system.

## Quick Start & Commands

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router (not Pages Router)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19 with functional components
- **Styling**: Tailwind CSS 4 with CSS custom properties for theming
- **Backend**: Supabase (PostgreSQL + auth + RLS)
- **External API**: Spotify OAuth 2.0 (Authorization Code flow)
- **Authentication**: Supabase Auth (guests), Basic Auth (admin panel)

### Core Architecture Patterns

#### Server vs Client Components
- Use Server Components by default (App Router default)
- Only add `"use client"` when component needs interactivity (state, event handlers, hooks)
- Server Components can directly query Supabase and don't expose credentials to browser
- Client Components use browser Supabase client via `createBrowserClient()`

#### Authentication Tiers
1. **Public**: `/invite/[slug]` pages - accessible to everyone
2. **Guest**: RSVPed guests can add songs to playlist (token-based)
3. **Admin**: `/admin/*` routes protected by Basic Auth (ADMIN_PASSWORD env var)

#### Database & Security
- Supabase RLS (Row Level Security) policies restrict guest access to their own data
- Sensitive tokens stored in httpOnly secure cookies (Spotify tokens)
- State parameter validation prevents CSRF attacks in OAuth flows
- Service Role Key only used server-side for admin operations

### File Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout, fonts, metadata
│   ├── globals.css              # Base styles
│   ├── invite/[slug]/page.tsx   # Dynamic guest invitation page (Server Component)
│   ├── api/
│   │   ├── rsvp/route.ts        # POST: Update RSVP status
│   │   ├── songs/route.ts       # GET: Fetch songs for guest
│   │   └── spotify/
│   │       ├── login/route.ts   # GET: Initiate OAuth flow
│   │       ├── callback/route.ts # GET: Handle OAuth callback
│   │       ├── search/route.ts  # GET: Search tracks via Spotify API
│   │       └── add-song/route.ts # POST: Add track to playlist
│   └── showcase/page.tsx        # Design system demo page
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Reusable button (primary/outline/ghost variants)
│   │   ├── Badge.tsx            # Festival badge labels
│   │   └── LoadingSpinner.tsx   # Animated loading indicator
│   └── invitation/
│       ├── HeroSection.tsx       # Full-screen hero with couple photo
│       ├── FestivalHeader.tsx    # Logo + festival branding
│       ├── DateSection.tsx       # Wedding date display
│       ├── CountdownTimer.tsx    # Client Component: countdown to event
│       ├── LocationSection.tsx   # Venue, Google Maps, schedule, parking
│       ├── RSVPSection.tsx       # Client Component: RSVP form with plus-one
│       └── PlaylistSection.tsx   # Client Component: Spotify song search/add
├── lib/
│   ├── supabase/
│   │   ├── server.ts            # createServerClient() for Server Components & route handlers
│   │   ├── client.ts            # createBrowserClient() for "use client" components
│   │   └── middleware.ts        # createClient() for middleware.ts
│   └── spotify.ts               # Helper functions for Spotify API calls
├── types/
│   ├── index.ts                 # Core domain types (Guest, Song, SpotifyTrack, RSVPPayload)
│   └── database.ts              # Supabase schema types (auto-generated from DB)
├── styles/
│   └── tokens.css               # CSS variables: colors, fonts, animations
└── middleware.ts                # Auth: Supabase session refresh, /admin Basic Auth protection
```

### Database Schema
Key tables in Supabase:
- **guests**: id, name, slug, email, confirmed, plus_one, created_at
- **songs**: id, guest_id, track_id, track_name, artist_name, album_image, added_at
- **playlists**: Spotify playlist configuration (managed externally)

### Design System
All colors and typography defined in `src/styles/tokens.css` as CSS custom properties:
- Colors: `--color-cream`, `--color-green-dark`, `--color-green-light`, `--color-gold`, `--color-text-dark`, etc.
- Fonts: `--font-playfair` (headings), `--font-inter` (body)
- Use `className="text-[var(--color-green-dark)]"` in components for theming

## Environment Setup

Create `.env.local` with these variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...

# Spotify
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID=...

# Admin
ADMIN_PASSWORD=your-secure-password
```

Note: `NEXT_PUBLIC_*` prefix makes vars available to browser. Spotify Client ID is public (in OAuth flow). Secret key stays server-only.

## Common Development Tasks

### Add a new guest invitation
1. Insert row in Supabase `guests` table: `{ name: "John Doe", slug: "john-doe", email: "john@example.com", confirmed: null, plus_one: null }`
2. Access invitation at `http://localhost:3000/invite/john-doe`
3. Guest can RSVP and add songs to playlist

### Add a new UI component
1. Create in `src/components/ui/YourComponent.tsx`
2. Export interface + component function with props
3. Add demo in `src/app/showcase/page.tsx` to preview styling
4. Use CSS custom properties for colors: `text-[var(--color-green-dark)]`

### Test Spotify OAuth flow
1. Run dev server: `npm run dev`
2. Navigate to `http://localhost:3000/api/spotify/login`
3. Authorize with Spotify account
4. Callback to `/admin/spotify-connected` (protected by Basic Auth)
5. Check browser cookies to verify tokens stored as httpOnly

### Debug Supabase RLS issues
- Enable RLS row visibility in Supabase dashboard: Tables > [table_name] > RLS
- Check policies: all policies must explicitly ALLOW rows (no implicit deny)
- Use `select * from guests` in SQL Editor with different row-level permissions to test

### Refresh expired Spotify token
- Search endpoint (`/api/spotify/search`) auto-refreshes 401 responses
- Add-song endpoint (`/api/spotify/add-song`) also handles token refresh
- Manual refresh: POST to Spotify token endpoint with `grant_type: 'refresh_token'`

## Key Design Decisions

### Why Server Components by Default?
- Reduces bundle size (no JS shipped for read-only pages)
- Direct database access without API layer overhead
- Credentials stay server-side
- Guest invitation pages are static-renderable Server Components

### Why Supabase?
- Built-in auth (simplifies guest authentication)
- Real-time database (future: live playlist updates)
- RLS policies for guest data isolation
- Easy to set up (no separate backend needed)

### Why Spotify OAuth Instead of Client Credentials?
- Allows personalization (user's saved songs, playlists)
- Token tied to user account (better rate limiting)
- Can access user's profile info if needed later
- Required to add songs to user's playlist

### Why httpOnly Cookies for Tokens?
- Prevents XSS attacks (JS cannot access tokens)
- Browsers auto-send in requests (no manual header management)
- Secure flag ensures HTTPS-only in production
- sameSite='lax' prevents CSRF token theft

### Why CSS Custom Properties Over Tailwind Config?
- Single source of truth for design tokens (one file to update)
- Dynamic theming possible (future: dark mode)
- Easier to audit all colors/spacing used in design
- Tailwind's @apply still works for complex components

## Testing

No formal test suite yet. Manual testing approach:
- Visit `http://localhost:3000/invite/[existing-slug]` to test guest flow
- Check browser DevTools > Application > Cookies to verify token storage
- Check server console for OAuth state validation logs
- Use Supabase SQL Editor to verify RLS policies allow/deny rows correctly

## Deployment Notes

- Environment variables must be set in deployment platform (Vercel, etc.)
- SPOTIFY_REDIRECT_URI must match registered URI in Spotify Dashboard
- Ensure `NODE_ENV=production` to enable secure cookies (httpOnly + secure)
- RLS policies must be configured in Supabase before guests can access data
- Admin password should be strong random string, passed via environment

## Common Gotchas

1. **"Module not found: Can't resolve '@supabase/ssr'"**: Run `npm install @supabase/ssr`
2. **Supabase URL/Key required error**: Check `.env.local` has correct variable names (with NEXT_PUBLIC_ prefix where needed)
3. **404 on /invite/slug**: Guest slug doesn't exist in Supabase or RLS policy blocks access
4. **Spotify 400 on callback**: State mismatch - check cookies are preserved across redirect
5. **Spotify 401 on add-song**: Token expired - endpoint auto-refreshes, check refresh token is valid
