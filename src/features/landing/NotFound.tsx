import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center bg-stone-50 px-6 text-center transition-colors duration-300 dark:bg-stone-950">
      <span className="text-8xl font-extrabold tracking-tight text-orange-500 dark:text-orange-400">404</span>
      <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">Página no encontrada</h1>
      <p className="mt-4 max-w-md text-lg text-slate-600 dark:text-slate-400">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-orange-500 px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-orange-500/30"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
