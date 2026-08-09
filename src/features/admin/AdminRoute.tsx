import { lazy, Suspense } from 'react'
import ProtectedRoute from '../auth/ProtectedRoute'

const AdminDashboard = lazy(() => import('./AdminDashboard'))

export default function AdminRoute() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center bg-stone-50 dark:bg-stone-950">Cargando panel...</div>}>
        <AdminDashboard />
      </Suspense>
    </ProtectedRoute>
  )
}
