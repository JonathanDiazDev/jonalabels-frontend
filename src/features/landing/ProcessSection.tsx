import { Upload, FileText, Factory, Truck } from 'lucide-react'
import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'

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
    <section id="proceso" className="relative z-10 py-20 transition-colors duration-300 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
            Cómo funciona
          </h2>
          <p className="mt-4 text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
            De tu idea a tus prendas en 4 pasos simples.
          </p>
        </FadeIn>

        <Stagger stagger={0.1} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StaggerItem key={step.number} className="relative">
              <span className="mb-4 block text-5xl font-extrabold text-stone-300 transition-colors duration-300 dark:text-stone-600">
                {step.number}
              </span>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900 text-white transition-colors duration-300 dark:bg-stone-100 dark:text-stone-900">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">{step.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
