import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import EditorialHero from './features/landing/EditorialHero'
import BenefitsSection from './features/landing/BenefitsSection'
import SpecialtySection from './features/landing/SpecialtySection'
import InstagramSection from './features/landing/InstagramSection'
import TestimonialsSection from './features/landing/TestimonialsSection'
import LabelVisualizer from './features/landing/LabelVisualizer'
import ProcessSection from './features/landing/ProcessSection'
import QuoteSection from './features/landing/QuoteSection'
import Productos from './features/landing/Productos'
import Nosotros from './features/landing/Nosotros'
import Diario from './features/landing/Diario'
import NotFound from './features/landing/NotFound'
import PrivacyPolicy from './features/landing/PrivacyPolicy'
import TermsOfService from './features/landing/TermsOfService'
import Login from './features/auth/Login'
import AdminRoute from './features/admin/AdminRoute'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="relative">
            <EditorialHero />
            <BenefitsSection />
            <SpecialtySection />
            <ProcessSection />
            <InstagramSection />
            <TestimonialsSection />
            <QuoteSection />
          </div>
        ),
      },
      { path: 'visualizar', element: <LabelVisualizer /> },
      { path: 'productos', element: <Productos /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'blog', element: <Diario /> },
      { path: 'cotizar', element: <QuoteSection /> },
      { path: 'admin', element: <AdminRoute /> },
      { path: 'privacidad', element: <PrivacyPolicy /> },
      { path: 'terminos', element: <TermsOfService /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'login', element: <Login /> },
])
