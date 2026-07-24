import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../api/http'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch(apiUrl('/auth/refresh'), {
      method: 'POST',
      credentials: 'include',
    })
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1E3A5F] border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
