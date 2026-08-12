import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetchAdmin } from '../../api/http'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    apiFetchAdmin('/auth/refresh', { method: 'POST' })
      .then((res) => {
        if (!res.ok) throw new Error('No autorizado')
        setChecking(false)
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
  }, [navigate])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900" role="status" aria-live="polite">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1E3A5F] border-t-transparent" />
        <span className="sr-only">Verificando sesión…</span>
      </div>
    )
  }

  return <>{children}</>
}
