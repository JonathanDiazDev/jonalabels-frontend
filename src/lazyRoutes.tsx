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
  return (
    <div className="px-4 py-16 sm:px-6" aria-hidden="true">
      <div className="mx-auto max-w-6xl animate-pulse space-y-4">
        <div className="mx-auto h-8 w-48 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="mx-auto h-4 w-72 rounded-lg bg-stone-200 dark:bg-stone-800" />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800" />
          <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800" />
          <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  )
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
