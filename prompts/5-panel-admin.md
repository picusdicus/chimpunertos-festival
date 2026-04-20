Actúa como Senior Full-Stack Developer.

Cambia a la rama feature/admin-panel.
Asegúrate de tener los cambios de main (git merge main).

Crea el panel de administración completo.

1. src/app/admin/page.tsx (Server Component protegido por middleware):
   Panel con 4 secciones:

   SECCIÓN 1 — Stats en tarjetas:
   - Total invitados | Confirmados | Pendientes | No asisten
   - Diseño con tarjetas en grid 2x2

   SECCIÓN 2 — Lista de invitados:
   - Tabla con: Nombre, Slug, Estado (badge colored), Acompañante, Fecha confirmación
   - Badge verde=confirmado, amarillo=pendiente, rojo=no asiste
   - Botón "Copiar enlace" para cada invitado (copia tudominio.com/invite/[slug])

   SECCIÓN 3 — Crear nuevo invitado:
   - Formulario: campo Nombre del invitado/s
   - El slug se auto-genera desde el nombre (toLowerCase, reemplazar espacios por -, quitar acentos)
   - Muestra preview del enlace generado
   - POST a /api/admin/guests

   SECCIÓN 4 — Setlist actual:
   - Lista de todas las canciones añadidas con: carátula, nombre, artista, quién la añadió
   - Botón para conectar/reconectar Spotify (enlace a /api/spotify/login)

2. src/app/api/admin/guests/route.ts:
   - POST: recibe { name }, genera slug, inserta en tabla guests con SUPABASE_SERVICE_ROLE_KEY
   - GET: devuelve todos los invitados con sus stats

3. Actualiza src/middleware.ts:
   - La ruta /admin/* requiere header Authorization con Basic Auth
   - Credenciales: usuario "admin", contraseña = ADMIN_PASSWORD del .env
   - Si no hay credenciales o son incorrectas: responder con 401 y header WWW-Authenticate

Haz commit: "feat: panel de administración completo"
Haz push a feature/admin-panel
Abre Pull Request hacia main: "Feature: Panel de administración"