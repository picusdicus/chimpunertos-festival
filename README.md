# Chimpunerto's Festival

Aplicación web de invitaciones personalizadas para la boda de Sole & Dani el **25 de Septiembre de 2026**.

Cada invitado recibe un enlace único con su nombre, puede confirmar asistencia, añadir canciones a la playlist compartida y dejar mensajes.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| UI | React 19, Tailwind CSS 4 |
| Base de datos | Supabase (PostgreSQL + RLS) |
| Autenticación | Supabase Auth (invitados), Basic Auth (admin) |
| API externa | Spotify OAuth 2.0 |
| Despliegue | Vercel (recomendado) |

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Rellena cada variable en `.env.local` (ver sección [Variables de entorno](#variables-de-entorno)).

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Para acceder a una invitación: `http://localhost:3000/invite/<slug-del-invitado>`

## Comandos

```bash
npm run dev        # Servidor de desarrollo (http://localhost:3000)
npm run build      # Build de producción
npm start          # Iniciar servidor de producción
npm run lint       # Ejecutar ESLint
```

## Variables de entorno

| Variable | Descripción | Público |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase (admin) | No |
| `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` | Client ID de la app Spotify | Sí |
| `SPOTIFY_CLIENT_SECRET` | Client Secret de Spotify | No |
| `SPOTIFY_REDIRECT_URI` | URI de callback OAuth de Spotify | No |
| `NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID` | ID de la playlist compartida | Sí |
| `SPOTIFY_OWNER_REFRESH_TOKEN` | Refresh token del dueño de la playlist | No |
| `ADMIN_PASSWORD` | Contraseña para el panel `/admin` | No |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (para OG images) | Sí |

> Las variables con prefijo `NEXT_PUBLIC_` son accesibles desde el navegador. El resto son exclusivamente server-side.

## OG Image

El archivo `public/og-image.jpg` es un placeholder SVG. Para producción, reemplázalo con una imagen real de **1200 × 630 px** en formato JPG o PNG.

## Añadir un invitado

1. Inserta una fila en la tabla `guests` de Supabase:
   ```sql
   INSERT INTO guests (name, slug) VALUES ('Nombre Apellido', 'nombre-apellido');
   ```
2. Comparte el enlace: `https://tu-dominio.com/invite/nombre-apellido`

## Despliegue en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Añade todas las variables de entorno en el dashboard de Vercel
3. Actualiza `SPOTIFY_REDIRECT_URI` con la URL de producción
4. Actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio de producción
