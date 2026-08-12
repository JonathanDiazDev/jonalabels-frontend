# Jona Labels Frontend

Plataforma web de alta conversión para marcas de ropa que buscan cotizar y ordenar etiquetas textiles personalizadas. Incluye visualizador interactivo de etiquetas en tiempo real, cotizador dinámico con animaciones por scroll (scrollytelling) y panel administrativo para gestión de prospectos.

## Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | **React 19** |
| Lenguaje | **TypeScript 6** |
| Bundler | **Vite 8** |
| Estilos | **Tailwind CSS 4** (vía plugin Vite, sin config legacy) |
| Animaciones | **Framer Motion 12** |
| Rutas | **React Router DOM 7** |
| Iconos | **Lucide React** |
| Linting | **oxlint** |
| Testing | **Vitest 4** + **Testing Library** + **jsdom** |

## Estructura del Proyecto

```
frontend/
├── public/                          # Estáticos, robots.txt, sitemap.xml
├── scripts/prerender.mjs            # Post-build SEO con Playwright
├── src/
│   ├── api/http.ts                  # apiFetch + apiUrl (cookies incluidas)
│   ├── config/constants.ts          # WhatsApp, SITE_URL, helpers
│   ├── components/                  # SharedNavbar, Footer, Seo, WhatsAppButton, etc.
│   ├── context/                     # ThemeContext, QuoteContext
│   ├── features/
│   │   ├── landing/                 # EditorialHero, QuoteForm, LabelVisualizer, etc.
│   │   ├── auth/                    # Login, ProtectedRoute
│   │   └── admin/                   # AdminRoute, AdminDashboard
│   ├── layouts/MainLayout.tsx
│   ├── lazyRoutes.tsx               # Code splitting
│   ├── App.tsx                      # Rutas
│   └── index.css                    # Tailwind v4 + tokens de marca
├── index.html                       # Meta SEO + JSON-LD
├── vercel.json                      # Deploy en Vercel
└── vite.config.ts                   # Proxy /api → localhost:8080
```

## Requisitos Previos

- **Node.js 20+**
- **npm**, **pnpm** o **yarn**

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/jonalabels-frontend.git
cd jonalabels-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `VITE_API_URL` | `/api/v1` | Base URL de la API backend. En dev, Vite proxea `/api/*` a `localhost:8080`. |

Crear un archivo `.env` en la raíz si necesitas override:

```bash
# .env (opcional en local, obligatorio en producción)
VITE_API_URL=https://tu-backend.vercel.app/api/v1
```

En producción (Vercel), establecer `VITE_API_URL` como variable de entorno del proyecto.

## Comandos

```bash
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Build de producción (tsc + vite build)
npm run preview      # Preview del build de producción
npm run test         # Ejecutar tests una vez
npm run test:watch   # Ejecutar tests en modo watch
npm run lint         # Linting con oxlint
```

## Rutas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Landing page | Hero + Scrollytelling + Beneficios + Proceso + Showcase + Testimonios + Formulario |
| `/visualizar` | LabelVisualizer | Visualizador interactivo: subir logo, elegir tipo/color, vista previa en tiempo real |
| `/cotizar` | QuoteSection | Formulario de cotización independiente |
| `/admin` | AdminRoute | Dashboard administrativo (protegido, requiere login) |
| `/login` | Login | Formulario de acceso al panel admin |
| `/privacidad` | PrivacyPolicy | Política de privacidad |
| `/terminos` | TermsOfService | Términos de servicio |
| `/*` | NotFound | Página 404 |

## Integración con la API

Todas las llamadas a la API se realizan a través de `apiFetch` (`src/api/http.ts`), que envía las cookies HttpOnly automáticamente:

```ts
// src/api/http.ts
const res = await fetch(apiUrl(path), {
  ...init,
  credentials: 'include',  // Adjunta cookies HttpOnly (access_token, refresh_token)
})

// En caso de 401 (sesión expirada), redirige a /login
if (res.status === 401 && !window.location.pathname.startsWith('/login')) {
  window.location.href = '/login'
}
```

### Endpoints consumidos

| Método | Ruta | Componente | Acceso |
|--------|------|------------|--------|
| `POST` | `/auth/login` | Login | Público |
| `POST` | `/auth/refresh` | ProtectedRoute | Público (cookie) |
| `POST` | `/cotizaciones` | QuoteSection | Público (multipart) |
| `GET` | `/cotizaciones` | AdminDashboard | Autenticado |
| `GET` | `/cotizaciones/metricas` | AdminDashboard | Autenticado |
| `GET` | `/cotizaciones/exportar` | AdminDashboard | Autenticado |
| `PATCH` | `/cotizaciones/{id}/estado` | AdminDashboard | Autenticado |

### Flujo de autenticación

1. **Login** → `POST /auth/login` → Backend Set-Cookie (`access_token` 15min, `refresh_token` 7 días)
2. **Navegación admin** → `ProtectedRoute` llama `POST /auth/refresh` para validar la cookie
3. **Expiración** → Si `refresh` devuelve 401, redirige a `/login`
4. **Logout** → `POST /auth/logout` → Backend limpia ambas cookies

### Proxy en desarrollo

Vite proxea automáticamente las requests a `/api/*` al backend:

```ts
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

## Diseño y Temas

- **Dark mode** basado en clase `.dark` en `<html>`, persistido en `localStorage`
- **Tokens de marca** definidos en `src/index.css` con `@theme`:
  - `jona-blue: #11317B` — Botones outline secundarios
  - `jona-orange: #FF6B00` — CTA primarios
- **Glow** animado en el fondo (`MainLayout.tsx`), capado a 800px para pantallas ultrawide
- **Logo dinámico**: `HorizontalClaro.png` (light) / `HorizontalOscuro.png` (dark)
- **Mobile-first**: Layout responsivo con `sm:`, `md:`, `lg:` breakpoints

## Producción

1. Configurar `VITE_API_URL` apuntando al backend desplegado
2. Ejecutar `npm run build` → genera `dist/`
3. Desplegar `dist/` en Vercel (o cualquier CDN estático)

## Licencia

Proyecto privado — Jona Labels © 2026
