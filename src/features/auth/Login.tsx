import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../api/http'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = { email, password }
    try {
      const res = await fetch(apiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        navigate('/admin')
        return
      }

      setError(res.status === 401 ? 'Correo o contraseña incorrectos' : 'No fue posible iniciar sesión')
    } catch {
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-slate-900">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Jona Labels
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Panel de administración
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-5">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jonalabels.com"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 placeholder:text-gray-400 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-slate-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 placeholder:text-gray-400 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          {error && (
            <p className="mb-4 text-center text-sm font-medium text-[#F4793E]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#162d4a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </section>
  )
}
