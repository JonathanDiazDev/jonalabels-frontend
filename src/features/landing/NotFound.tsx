import { Link } from 'react-router-dom'
import { GlassCard, btnPrimaryClass } from '../../components/editorial'

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-6 py-24 text-center">
      <GlassCard className="max-w-md">
        <span className="text-7xl font-extrabold tracking-tight text-jona-blue dark:text-blue-300">404</span>
        <h1 className="mt-6 text-3xl font-bold text-stone-900 dark:text-stone-100">Página no encontrada</h1>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className={`mt-8 inline-flex ${btnPrimaryClass}`}
        >
          Volver al inicio
        </Link>
      </GlassCard>
    </div>
  )
}
