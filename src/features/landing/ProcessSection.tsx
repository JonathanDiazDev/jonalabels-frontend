import { Upload, FileText, Factory, Truck } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'

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
    desc: 'Una vez aprobada la cotización, comenzamos la producción con satín de alta definición y colores que no se desvanecen.',
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
    <section id="proceso" className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Proceso"
          title="Cómo funciona"
          subtitle="De tu idea a tus prendas en 4 pasos simples."
        />

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent lg:block dark:via-stone-700"
          />

          {STEPS.map((step) => (
            <div
              key={step.number}
              className="glass-panel relative rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="mb-3 block font-display text-4xl text-stone-300 dark:text-stone-600">
                {step.number}
              </span>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-jona-blue text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
