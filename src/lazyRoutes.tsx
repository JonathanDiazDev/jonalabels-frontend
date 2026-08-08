import { lazy, Suspense, type ComponentType } from 'react'
import RouteSkeleton from './components/RouteSkeleton'

const LabelVisualizer = lazy(() => import('./features/landing/LabelVisualizer'))
const Diario = lazy(() => import('./features/landing/Diario'))
const AdminRoute = lazy(() => import('./features/admin/AdminRoute'))

export function LazyRoute({ component: Component }: { component: ComponentType }) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Component />
    </Suspense>
  )
}

export { LabelVisualizer, Diario, AdminRoute }
