import { Sparkles, Scissors, Palette, Timer } from 'lucide-react'

const FEATURES = [
  { icon: Sparkles, title: 'Tacto Sedoso', desc: 'Un acabado suave que no irrita, ideal para prendas de uso diario o alta costura.' },
  { icon: Palette, title: 'Identidad Fiel', desc: 'Colores vibrantes y precisión milimétrica para que tu logo luzca exactamente como lo imaginaste.' },
  { icon: Scissors, title: 'Bordes Perfectos', desc: 'Sellado impecable que nunca se deshilacha. Cuidado absoluto en cada detalle.' },
  { icon: Timer, title: 'A tu Ritmo', desc: 'Cotizaciones ágiles y producción diseñada para adaptarse a los tiempos de tu taller.' },
]

export default function ScrollytellingLabel() {
  return (
    <section id="materiales" className="bg-white py-20 transition-colors duration-300 dark:bg-stone-950 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mx-auto max-w-lg">
          <img
            src="/base-etiqueta.png"
            alt="Etiqueta textil premium de JonaLabels"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-16">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-stone-200/60 bg-stone-50 p-6 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-stone-900 transition-colors duration-300 dark:text-stone-100">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500 transition-colors duration-300 dark:text-stone-400">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
