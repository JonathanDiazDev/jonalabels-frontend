import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { apiFetch } from '../../api/http'
import PageBackground from '../../components/PageBackground'
import { GlassCard, SectionEyebrow } from '../../components/editorial'

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
    <div className="relative min-h-screen text-stone-900 dark:text-stone-100">
      <PageBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-stone-50/70 dark:bg-stone-950/75"
      />
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-6 w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img src="/logo-impresion.svg" alt="" className="mx-auto mb-4 h-10 w-10 dark:invert" />
          <SectionEyebrow>Acceso</SectionEyebrow>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Jona Labels
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Panel de administración
          </p>
        </div>

        <GlassCard padding="p-8">
        <form onSubmit={handleSubmit}>
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
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 placeholder:text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
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
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 placeholder:text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>

          {error && (
            <p className="mb-4 text-center text-sm font-medium text-jona-orange" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-jona-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-jona-blue/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 animate-spin">
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
              </svg>
            )}
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
        </GlassCard>
      </div>
      </section>
    </div>
  )
}
