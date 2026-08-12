import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import EditorialHero from './features/landing/EditorialHero'
import Login from './features/auth/Login'
import Seo from './components/Seo'
import {
  LazyRoute,
  LazySection,
  LabelVisualizer,
  Diario,
  AdminRoute,
  SpecialtySection,
  ProcessSection,
  InstagramSection,
  TestimonialsSection,
  QuoteSection,
  Productos,
  Nosotros,
  PrivacyPolicy,
  TermsOfService,
  NotFound,
} from './lazyRoutes'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Seo path="/" />
            <div className="relative">
              <EditorialHero />
              <LazySection component={SpecialtySection} />
              <LazySection component={ProcessSection} />
              <LazySection component={InstagramSection} />
              <LazySection component={TestimonialsSection} />
              <LazySection component={QuoteSection} />
            </div>
          </>
        ),
      },
      {
        path: 'visualizar',
        element: (
          <>
            <Seo title="Visualizador de etiquetas — Jona Labels" description="Diseña y visualiza tu etiqueta textil personalizada antes de cotizar." path="/visualizar" />
            <LazyRoute component={LabelVisualizer} />
          </>
        ),
      },
      {
        path: 'productos',
        element: (
          <>
            <Seo title="Productos y materiales — Jona Labels" description="Etiquetas de satín, raso y algodón con estampado de alta definición para tu marca." path="/productos" />
            <LazyRoute component={Productos} />
          </>
        ),
      },
      {
        path: 'nosotros',
        element: (
          <>
            <Seo title="Nosotros — Jona Labels" description="Conoce la historia de Jona Labels: etiquetas textiles que dan identidad a marcas de ropa." path="/nosotros" />
            <LazyRoute component={Nosotros} />
          </>
        ),
      },
      {
        path: 'blog',
        element: (
          <>
            <Seo title="Diario — Jona Labels" description="Reflexiones sobre diseño, confección e identidad de marca en la alta costura." path="/blog" />
            <LazyRoute component={Diario} />
          </>
        ),
      },
      {
        path: 'cotizar',
        element: (
          <>
            <Seo title="Cotizar etiquetas — Jona Labels" description="Solicita una cotización para tus etiquetas textiles personalizadas en minutos." path="/cotizar" />
            <LazyRoute component={QuoteSection} />
          </>
        ),
      },
      {
        path: 'admin',
        element: (
          <>
            <Seo title="Panel de administración — Jona Labels" description="Panel de administración de Jona Labels." path="/admin" noindex />
            <LazyRoute component={AdminRoute} />
          </>
        ),
      },
      {
        path: 'privacidad',
        element: (
          <>
            <Seo title="Aviso de privacidad — Jona Labels" description="Aviso de privacidad de Jona Labels." path="/privacidad" />
            <LazyRoute component={PrivacyPolicy} />
          </>
        ),
      },
      {
        path: 'terminos',
        element: (
          <>
            <Seo title="Términos y condiciones — Jona Labels" description="Términos y condiciones de Jona Labels." path="/terminos" />
            <LazyRoute component={TermsOfService} />
          </>
        ),
      },
      {
        path: '*',
        element: (
          <>
            <Seo title="Página no encontrada — Jona Labels" description="La página que buscas no existe o fue movida." path="/404" />
            <LazyRoute component={NotFound} />
          </>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: (
      <>
        <Seo title="Iniciar sesión — Jona Labels" description="Accede al panel de administración de Jona Labels." path="/login" />
        <Login />
      </>
    ),
  },
])
