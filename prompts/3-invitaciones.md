Actúa como Senior Full-Stack Developer.

Cambia a la rama feature/invitaciones-personalizadas.
Asegúrate de tener los cambios de main (git merge main o git rebase main).

PASO 1 — Supabase SQL:
Ejecuta este SQL en el editor de Supabase de tu proyecto:

CREATE TABLE guests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  confirmed boolean DEFAULT NULL,
  plus_one boolean DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE songs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id uuid REFERENCES guests(id) ON DELETE CASCADE,
  track_id text NOT NULL,
  track_name text NOT NULL,
  artist_name text NOT NULL,
  album_image text,
  added_at timestamptz DEFAULT now()
);

-- Row Level Security
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Políticas: lectura pública para guests y songs, escritura con service role
CREATE POLICY "Public read guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public read songs" ON songs FOR SELECT USING (true);
CREATE POLICY "Service insert songs" ON songs FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update guests" ON guests FOR UPDATE USING (true);

-- Invitado de prueba
INSERT INTO guests (slug, name) VALUES
  ('sole-y-dani', 'Sole y Dani'),
  ('maria-y-juan', 'María y Juan'),
  ('ana-y-pedro', 'Ana y Pedro');

PASO 2 — Página de invitación:
Crea src/app/invite/[slug]/page.tsx (Server Component) que:
1. Reciba el slug como parámetro de ruta
2. Consulte Supabase con el cliente server para buscar el invitado por slug
3. Si no existe → llame a notFound() de next/navigation
4. Renderice la página completa con estos componentes en orden:
   - <HeroSection> con la foto de la pareja (imagen en /public/images/couple.jpg — crea un placeholder si no existe)
   - <FestivalHeader> con el logo pirámide y nombre del festival
   - <DateSection>
   - <CountdownTimer>
   - <LocationSection> (crear ahora)
   - <RSVPSection> (crear ahora, conectada a Supabase)
   - <PlaylistSection> (placeholder por ahora)

PASO 3 — LocationSection:
Crea src/components/invitation/LocationSection.tsx:
- Nombre: "Escuela de Equitación RMB"
- Dirección: "Navalcarnero, Madrid · A 35 min del centro"
- Iframe de Google Maps embed con coordenadas de Navalcarnero, Madrid
- Horarios: Acceso 17:30h | Ceremonia 18:00h | Fiesta: hasta tarde
- Botón "Cómo llegar" que abre Google Maps en nueva pestaña con las coordenadas
- Nota de parking disponible

PASO 4 — RSVPSection con lógica real:
Crea src/components/invitation/RSVPSection.tsx ("use client") que:
- Muestre el nombre del invitado personalizado: "Hola [nombre], estaremos encantados de celebrarlo contigo"
- Botones: "Estaré en el festival" / "No podré asistir"
- Si confirma asistencia: mostrar checkbox "¿Vendrás con acompañante?"
- Si ya tiene estado confirmado en DB: mostrar estado actual con mensaje apropiado
- Llamar al Route Handler POST /api/rsvp al confirmar

Crea src/app/api/rsvp/route.ts:
- Recibe: { guest_id, confirmed, plus_one }
- Valida los campos (sin zod, con validación manual tipada)
- Actualiza la tabla guests en Supabase con el cliente server
- Devuelve { success: true } o error apropiado
- Manejo de errores con try/catch

Haz commit: "feat: página de invitación personalizada con RSVP real"
Haz push a feature/invitaciones-personalizadas
Abre Pull Request hacia main: "Feature: Invitaciones personalizadas y RSVP"