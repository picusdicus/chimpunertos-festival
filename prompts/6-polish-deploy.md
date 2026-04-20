Actúa como Senior Full-Stack Developer y DevOps Engineer.

Cambia a la rama feature/polish-deploy.
Asegúrate de tener los cambios de main (git merge main).

PASO 1 — Animaciones y UX:
Añade al globals.css o como módulo CSS:
- @keyframes fadeIn: opacity 0→1, translateY 20px→0, duración 0.6s ease-out
- @keyframes slideUp: translateY 30px→0 con fade, 0.5s
- Clases utilitarias: .animate-fade-in, .animate-slide-up, .animate-delay-100/200/300
- Aplícalas a las secciones de la página de invitación con diferentes delays

PASO 2 — Metadata y SEO:
Actualiza src/app/invite/[slug]/page.tsx con generateMetadata dinámico:
- title: "Chimpunerto's Festival · [nombre del invitado]"
- description: "Sole y Dani te invitan a su boda festival el 25 de Septiembre de 2026"
- og:image apuntando a /og-image.jpg (crea un placeholder)
- og:title y og:description

Actualiza src/app/layout.tsx con metadata global del festival.

PASO 3 — Loading y Error states:
Crea src/app/invite/[slug]/loading.tsx con skeleton loader elegante
Crea src/app/invite/[slug]/error.tsx con mensaje amigable
Crea src/app/not-found.tsx con mensaje para invitados no encontrados

PASO 4 — Optimización de imagen:
En HeroSection.tsx asegúrate de usar next/image con:
- priority={true}
- sizes="100vw"
- fill y object-cover
- placeholder="blur" si tienes blurDataURL

PASO 5 — Variables de entorno para producción:
Crea .env.example con todas las variables necesarias (sin valores)
Actualiza el README.md con:
- Descripción del proyecto
- Stack tecnológico
- Instrucciones de setup local
- Variables de entorno necesarias
- Comandos: npm run dev, npm run build

PASO 6 — Deploy en Vercel:
Usando el MCP de GitHub, crea un archivo vercel.json en la raíz:
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev"
}

Haz commit: "feat: polish, animaciones, SEO y configuración de deploy"
Haz push a feature/polish-deploy
Abre Pull Request hacia main: "Polish: Animaciones, SEO y configuración deploy"

PASO 7 — Merge final:
Usando el MCP de GitHub, mergea todos los Pull Requests abiertos hacia main en este orden:
1. Setup: Arquitectura base
2. Design: Sistema de diseño
3. Feature: Invitaciones personalizadas
4. Feature: Spotify
5. Feature: Admin
6. Polish: Deploy