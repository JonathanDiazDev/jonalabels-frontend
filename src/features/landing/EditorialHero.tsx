import { Link } from 'react-router-dom'

export default function EditorialHero() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-transparent px-4 pt-20 text-center">
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-stone-900 transition-colors duration-300 sm:text-5xl lg:text-6xl dark:text-stone-100">
        Somos Fabricantes y Especialistas en Etiquetas Textiles personalizadas de alta calidad, envíos a todo México
      </h1>

      <p className="mt-6 text-xl text-stone-500 transition-colors duration-300 dark:text-stone-400">
        ¡Haz brillar tu marca!
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          to="/cotizar"
          className="rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          Cotiza ahora
        </Link>
        <Link
          to="/visualizar"
          className="rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-stone-50 dark:border-stone-700 dark:bg-transparent dark:text-stone-100 dark:hover:bg-stone-800"
        >
          Ver
        </Link>
      </div>
    </section>
  )
}
