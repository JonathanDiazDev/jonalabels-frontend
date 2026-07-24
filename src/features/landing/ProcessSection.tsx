import { motion } from 'framer-motion'
import { Upload, FileText, Factory, Truck } from 'lucide-react'

const STEPS = [
  {
    icon: Upload,
    number: '01',
    title: 'Sube tu diseño',
    desc: 'Envía tu logo en cualquier formato. Nuestro equipo lo revisará para asegurar la mejor calidad de impresión.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Cotización personalizada',
    desc: 'Recibe una cotización a medida en menos de 24 horas con todas las opciones de material, tamaño y acabado.',
  },
  {
    icon: Factory,
    number: '03',
    title: 'Producción',
    desc: 'Una vez aprobada la cotización, comenzamos la producción con satén de alta definición y colores que no se desvanecen.',
  },
  {
    icon: Truck,
    number: '04',
    title: 'Entrega',
    desc: 'Tus etiquetas llegan listas para coser. Coordinamos la distribución para que las recibas donde las necesites.',
  },
]

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            De tu idea a tus prendas en 4 pasos simples.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.12 }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-8 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-slate-800/50"
            >
              <span className="absolute right-6 top-6 text-5xl font-extrabold text-gray-100 transition-colors group-hover:text-orange-100 dark:text-slate-800 dark:group-hover:text-orange-900/30">
                {step.number}
              </span>
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-400 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="relative text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
