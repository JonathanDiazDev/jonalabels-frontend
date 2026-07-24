import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'María López',
    role: 'Diseñadora de moda',
    text: 'Las etiquetas superaron mis expectativas. El satén se siente premium y los colores quedaron exactamente como los diseñé.',
    stars: 5,
  },
  {
    name: 'Carlos Hernández',
    role: 'Fundador de marca textil',
    text: 'El proceso fue increíblemente rápido. En menos de una semana tenía mis etiquetas listas para coser en toda mi colección.',
    stars: 5,
  },
  {
    name: 'Ana García',
    role: 'Emprendedora',
    text: 'Lo que más me gustó fue la atención personalizada. Me ayudaron a elegir el material correcto para mi tipo de prenda.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
