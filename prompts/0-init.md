Actúa como Senior Full-Stack Developer y DevOps Engineer.

Usando el MCP de GitHub, haz lo siguiente:

1. Crea un repositorio público llamado "chimpunertos-festival" con descripción "Web de invitación de boda — Chimpunerto's Festival 2026"
2. Inicializa el repo con un README.md que incluya el nombre del proyecto y stack tecnológico
3. Crea la rama principal "main"
4. Crea las siguientes ramas desde main:
   - feature/setup-arquitectura
   - feature/diseno-sistema
   - feature/invitaciones-personalizadas
   - feature/rsvp
   - feature/spotify-playlist
   - feature/admin-panel
   - feature/polish-deploy

Después, en local:
1. Clona el repositorio
2. Dentro del repo clonado, crea el proyecto Next.js 14:
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
3. Instala dependencias: @supabase/supabase-js @supabase/ssr
4. Crea el archivo .env.local con esta estructura (sin valores reales):
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   SPOTIFY_CLIENT_ID=
   SPOTIFY_CLIENT_SECRET=
   SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
   ADMIN_PASSWORD=
   NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID=
5. Asegúrate de que .env.local está en .gitignore
6. Haz commit inicial en main: "chore: initial Next.js 14 setup"
7. Push a main