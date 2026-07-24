import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Hero from './features/landing/Hero'
import LabelVisualizer from './features/landing/LabelVisualizer'
import ScrollytellingLabel from './features/landing/ScrollytellingLabel'
import ValueProposition from './features/landing/ValueProposition'
import ProductShowcase from './features/landing/ProductShowcase'
import QuoteSection from './features/landing/QuoteSection'
import ProcessSection from './features/landing/ProcessSection'
import TestimonialsSection from './features/landing/TestimonialsSection'
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
            <Hero />
            <ScrollytellingLabel />
            <ValueProposition />
            <ProcessSection />
            <ProductShowcase />
            <TestimonialsSection />
            <QuoteSection />
          </div>
        ),
      },
      { path: 'visualizar', element: <LabelVisualizer /> },
      { path: 'cotizar', element: <QuoteSection /> },
      { path: 'admin', element: <AdminRoute /> },
      { path: 'privacidad', element: <PrivacyPolicy /> },
      { path: 'terminos', element: <TermsOfService /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'login', element: <Login /> },
])
