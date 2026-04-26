Actúa como Senior Full-Stack Developer especializado en OAuth y APIs externas.

Cambia a la rama feature/spotify-playlist.
Asegúrate de tener los cambios de main (git merge main).

Implementa la integración completa con Spotify.

VARIABLES DE ENTORNO necesarias en .env.local:
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/spotify/callback
NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID=id_de_tu_playlist

FLUJO OAUTH — crea estos Route Handlers:

1. src/app/api/spotify/login/route.ts
- GET: genera la URL de autorización de Spotify
- Scopes necesarios: playlist-modify-public playlist-modify-private
- Redirige al usuario a accounts.spotify.com/authorize
- Incluye state para seguridad CSRF

2. src/app/api/spotify/callback/route.ts
- GET: recibe code y state de Spotify
- Intercambia code por access_token y refresh_token via fetch a accounts.spotify.com/api/token
- Guarda access_token y refresh_token en cookies httpOnly, Secure, SameSite=Lax
- Redirige a /admin/spotify-connected

3. src/app/api/spotify/search/route.ts
- GET con query param ?q=...
- Si hay access_token en cookie: úsalo para buscar
- Si no: usa Client Credentials (client_id + client_secret) como fallback
- Llama a api.spotify.com/v1/search?type=track&limit=8
- Devuelve array de SpotifyTrack tipado
- Manejo de token expirado: refresh automático

4. src/app/api/spotify/add-song/route.ts
- POST con body: { track_id, track_name, artist_name, album_image, guest_id }
- Añade la canción a la playlist (NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID) via Spotify API
- Guarda el registro en la tabla songs de Supabase
- Usa el access_token guardado en cookie (sólo el admin/dueño puede añadir)
- Si el token expiró: refresca usando refresh_token y guarda el nuevo
- Devuelve { success: true, song } o error

COMPONENTE PlaylistSection:
Crea src/components/invitation/PlaylistSection.tsx ("use client") que:
- Input de búsqueda con debounce de 500ms (implementar con useEffect y setTimeout, sin librerías)
- Llama a /api/spotify/search?q=... al escribir
- Muestra resultados: carátula del álbum (img), nombre de canción, artista
- Botón "+" en cada resultado para añadir
- Al añadir: POST a /api/spotify/add-song
- Lista de canciones ya añadidas (fetch al cargar desde tabla songs de Supabase)
- Contador: "X canciones en El cartel"
- Estados: loading, error, vacío, success
- Diseño consistente con el festival (fondo crema, verde, dorado)

Haz commit: "feat: integración Spotify OAuth y playlist colaborativa"
Haz push a feature/spotify-playlist
Abre Pull Request hacia main: "Feature: Spotify OAuth y playlist colaborativa"