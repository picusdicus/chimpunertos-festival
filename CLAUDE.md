Eres un Senior Full-Stack Developer. Estoy construyendo una web de invitación de boda con Next.js 14 (App Router), TypeScript, Tailwind CSS y Supabase.

Instala las dependencias necesarias y crea la estructura de carpetas del proyecto:
- @supabase/supabase-js
- @supabase/ssr

Crea la siguiente estructura dentro de src/:
- lib/supabase.ts → cliente de Supabase (browser y server)
- types/index.ts → tipos TypeScript: Guest, Song
- components/ui/ → carpeta vacía por ahora
- components/invitation/ → carpeta vacía por ahora

El archivo .env.local ya existe con estas variables:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback

Crea los clientes de Supabase correctamente para Next.js 14 App Router (uno para componentes client, otro para server components y route handlers).