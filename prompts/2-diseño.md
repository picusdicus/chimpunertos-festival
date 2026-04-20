Actúa como Senior Frontend Developer especializado en diseño de sistemas.

Cambia a la rama feature/diseno-sistema.

Crea el sistema de diseño completo del Chimpunerto's Festival con estas especificaciones exactas:

IDENTIDAD VISUAL:
- Nombre del festival: "Chimpunerto's Festival"
- Pareja: Sole & Dani
- Fecha: Viernes 25 de Septiembre de 2026
- Hora: 18:00h (acceso 17:30h)
- Lugar: Escuela de Equitación RMB, Navalcarnero, Madrid

PALETA DE COLORES (crear en src/styles/tokens.css):
--color-cream: #F5EFE0
--color-green-dark: #2a4a28
--color-green-mid: #3d6b3a
--color-green-light: #8aaa60
--color-gold: #c17f3a
--color-gold-light: #e8b84b
--color-beige: #d4c9a8
--color-text-dark: #3d3530
--color-text-muted: #7a6a45
--color-text-hint: #8a7a50
--color-white-warm: #ffffff
--color-surface: #f0ebe3

TIPOGRAFÍA: Usar next/font/google
- Títulos: "Playfair Display" (serif, bold) — estilo cartel festival
- Cuerpo: "Inter" (sans-serif)
- Acento: letter-spacing amplio en mayúsculas para etiquetas

COMPONENTES A CREAR:

1. src/components/ui/Button.tsx
   - Variantes: primary (verde oscuro), outline (borde verde), ghost
   - Tamaños: sm, md, lg
   - Estado loading con spinner
   - Props tipados con TypeScript estricto

2. src/components/ui/Badge.tsx
   - Para etiquetas tipo festival (Ceremonia, Banquete, Fiesta)
   - Variantes: filled (verde) y outline

3. src/components/invitation/HeroSection.tsx
   - Foto de pareja a pantalla completa (acepta imageUrl prop)
   - Overlay verde oscuro en la parte inferior
   - Nombres "Sole & Dani" superpuestos en blanco con & dorado
   - Subtítulo: "Se casan · 25 Sep · 2026"
   - Animación fade-in con CSS puro (no librerías)

4. src/components/invitation/FestivalHeader.tsx
   - Logo pirámide SVG (estilo Glastonbury: pirámide con niveles degradados en verde)
   - Nombre "Chimpunerto's" en tipografía bold uppercase grande
   - "Festival" en letra-spacing amplio debajo
   - Badges: Ceremonia, Banquete, Fiesta, Edición 2026

5. src/components/invitation/DateSection.tsx
   - Bloque de fecha con borde verde oscuro estilo cartel
   - "25" grande a la izquierda, "Septiembre · 2026 / Viernes" a la derecha
   - "Navalcarnero · Puertas: 17:30h" como subtítulo

6. src/components/invitation/CountdownTimer.tsx
   - Componente cliente ("use client")
   - Cuenta atrás real hasta 2026-09-25T18:00:00
   - Muestra días, horas, minutos
   - Cada unidad en su propia caja con fondo blanco y borde beige
   - Se actualiza cada minuto

7. src/components/invitation/LoadingSpinner.tsx
   - Spinner sencillo animado en verde

Todos los componentes deben:
- Tener tipado TypeScript estricto (sin any)
- Ser mobile-first y responsive con Tailwind
- Usar las variables CSS del sistema de tokens
- Incluir manejo de estados vacíos o de error donde aplique

Actualiza src/app/layout.tsx con:
- Fuentes Google (Playfair Display + Inter)
- Import del tokens.css
- Metadata del proyecto: title "Chimpunerto's Festival · Sole & Dani · 2026"

Haz commit: "feat: sistema de diseño, tokens CSS y componentes base"
Haz push a feature/diseno-sistema