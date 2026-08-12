import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../../api/http'

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
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <section className="flex min-h-screen items-center justify-center bg-stone-100 px-6 dark:bg-stone-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="font-display text-3xl text-stone-900 dark:text-stone-50">
            Jona Labels
          </Link>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-8">
          <div className="mb-5">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jonalabels.com"
              className="w-full rounded-xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/15 dark:border-stone-700 dark:bg-stone-900/80 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/15 dark:border-stone-700 dark:bg-stone-900/80 dark:text-white"
            />
          </div>

          {error && (
            <p className="mb-4 text-center text-sm font-medium text-jona-orange">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </section>
  )
}
