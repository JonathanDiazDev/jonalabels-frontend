import { lazy, Suspense, type ComponentType } from 'react'
import RouteSkeleton from './components/RouteSkeleton'

const LabelVisualizer = lazy(() => import('./features/landing/LabelVisualizer'))
const Diario = lazy(() => import('./features/landing/Diario'))
const AdminRoute = lazy(() => import('./features/admin/AdminRoute'))

const SpecialtySection = lazy(() => import('./features/landing/SpecialtySection'))
const ProcessSection = lazy(() => import('./features/landing/ProcessSection'))
const InstagramSection = lazy(() => import('./features/landing/InstagramSection'))
const TestimonialsSection = lazy(() => import('./features/landing/TestimonialsSection'))
const QuoteSection = lazy(() => import('./features/landing/QuoteSection'))
const Productos = lazy(() => import('./features/landing/Productos'))
const Nosotros = lazy(() => import('./features/landing/Nosotros'))
const PrivacyPolicy = lazy(() => import('./features/landing/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./features/landing/TermsOfService'))
const NotFound = lazy(() => import('./features/landing/NotFound'))

export function LazyRoute({ component: Component }: { component: ComponentType }) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Component />
    </Suspense>
  )
}

function SectionFallback() {
  return <div className="min-h-[50vh]" aria-hidden="true" />
}

export function LazySection({ component: Component }: { component: ComponentType }) {
  return (
    <Suspense fallback={<SectionFallback />}>
      <Component />
    </Suspense>
  )
}

export {
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
}
