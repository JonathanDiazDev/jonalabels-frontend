import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">

        {/* Text */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100/50 px-5 py-2 text-sm font-medium text-orange-800 backdrop-blur-md transition-colors duration-500 dark:border-slate-700/50 dark:bg-slate-800/40 dark:text-slate-300">
            ✨ Especialistas en Etiquetas Textiles
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 transition-colors duration-500 md:text-7xl dark:text-white">
            Etiquetas que dan <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent transition-colors duration-500">identidad</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600 transition-colors duration-500 md:text-xl dark:text-slate-400">
            Te ayudamos a convertir tu logo en etiquetas textiles listas para coordinar su producción con proveedores especializados.
          </p>
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <button
              onClick={() => navigate('/visualizar')}
              className="cursor-pointer rounded-full border border-orange-400/50 bg-orange-500 px-8 py-3.5 font-semibold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
            >
              Visualiza tu etiqueta
            </button>
            <span className="text-sm text-slate-500 transition-colors duration-500 dark:text-slate-500">Sube tu logo y explora una referencia visual.</span>
          </div>
        </div>

        {/* Image */}
        <div className="relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-[0_20px_60px_-10px_rgba(234,88,12,0.15)] transition-shadow duration-500 hover:shadow-[0_25px_70px_-5px_rgba(234,88,12,0.25)] dark:shadow-none dark:ring-1 dark:ring-white/10">
            <img
              src="/foto_log (1).png"
              alt="Etiqueta textil personalizada Jona Labels"
              loading="eager"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
