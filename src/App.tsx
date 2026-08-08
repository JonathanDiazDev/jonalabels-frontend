import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import EditorialHero from './features/landing/EditorialHero'
import SpecialtySection from './features/landing/SpecialtySection'
import InstagramSection from './features/landing/InstagramSection'
import TestimonialsSection from './features/landing/TestimonialsSection'
import ProcessSection from './features/landing/ProcessSection'
import QuoteSection from './features/landing/QuoteSection'
import Productos from './features/landing/Productos'
import Nosotros from './features/landing/Nosotros'
import NotFound from './features/landing/NotFound'
import PrivacyPolicy from './features/landing/PrivacyPolicy'
import TermsOfService from './features/landing/TermsOfService'
import Login from './features/auth/Login'
import { LazyRoute, LabelVisualizer, Diario, AdminRoute } from './lazyRoutes'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="relative">
            <EditorialHero />
            <SpecialtySection />
            <ProcessSection />
            <InstagramSection />
            <TestimonialsSection />
            <QuoteSection />
          </div>
        ),
      },
      { path: 'visualizar', element: <LazyRoute component={LabelVisualizer} /> },
      { path: 'productos', element: <Productos /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'blog', element: <LazyRoute component={Diario} /> },
      { path: 'cotizar', element: <QuoteSection /> },
      { path: 'admin', element: <LazyRoute component={AdminRoute} /> },
      { path: 'privacidad', element: <PrivacyPolicy /> },
      { path: 'terminos', element: <TermsOfService /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'login', element: <Login /> },
])
