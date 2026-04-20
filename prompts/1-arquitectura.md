Actúa como Senior Full-Stack Developer.

Cambia a la rama feature/setup-arquitectura.

Crea la arquitectura base del proyecto Chimpunerto's Festival:

ESTRUCTURA DE CARPETAS a crear dentro de src/:
- src/lib/supabase/client.ts → cliente Supabase para componentes "use client"
- src/lib/supabase/server.ts → cliente Supabase para Server Components y Route Handlers
- src/lib/supabase/middleware.ts → cliente para middleware
- src/lib/spotify.ts → helpers para la API de Spotify
- src/types/index.ts → todos los tipos TypeScript del proyecto
- src/components/ui/ → carpeta vacía (componentes base)
- src/components/invitation/ → carpeta vacía (secciones de la invitación)

TIPOS a crear en src/types/index.ts:
```typescript
export type Guest = {
  id: string
  slug: string
  name: string
  confirmed: boolean | null
  plus_one: boolean | null
  created_at: string
}

export type Song = {
  id: string
  guest_id: string
  track_id: string
  track_name: string
  artist_name: string
  album_image: string | null
  added_at: string
}

export type SpotifyTrack = {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  preview_url: string | null
}

export type RSVPPayload = {
  guest_id: string
  confirmed: boolean
  plus_one: boolean
}
```

CLIENTES SUPABASE:
- Usa @supabase/ssr correctamente para Next.js 14 App Router
- client.ts: createBrowserClient
- server.ts: createServerClient con cookies() de next/headers
- middleware.ts: createServerClient para uso en middleware.ts

Crea también src/middleware.ts en la raíz de src/ que:
- Proteja la ruta /admin con Basic Auth usando ADMIN_PASSWORD del .env
- Refresque la sesión de Supabase en cada request

Haz commit: "feat: arquitectura base, tipos TypeScript y clientes Supabase"
Haz push a feature/setup-arquitectura
Abre un Pull Request en GitHub hacia main con título "Setup: Arquitectura base y tipos"