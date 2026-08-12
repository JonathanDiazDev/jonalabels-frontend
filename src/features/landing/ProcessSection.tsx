import {
  ClipboardList,
  Cog,
  Heart,
  Monitor,
  SearchCheck,
  Truck,
  Wallet,
} from 'lucide-react'
import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'
import { GlassCard } from '../../components/editorial'

const STEPS = [
  {
    number: '1',
    icon: ClipboardList,
    title: 'Cotizamos tu proyecto',
    accent: 'blue' as const,
    desc: 'Analizamos el material, medidas, cantidad y diseño que necesitas para prepararte una cotización a tu medida.',
  },
  {
    number: '2',
    icon: Monitor,
    title: 'Preparamos tu diseño',
    accent: 'orange' as const,
    desc: 'Revisamos tu diseño y lo adaptamos a las especificaciones necesarias para que quede listo para producción.',
  },
  {
    number: '3',
    icon: SearchCheck,
    title: 'Te mostramos una vista previa',
    accent: 'blue' as const,
    desc: 'Te enviamos una prueba digital para que revises cada detalle. Con tu aprobación, continuamos con tu pedido.',
  },
  {
    number: '4',
    icon: Wallet,
    title: 'Anticipo',
    accent: 'orange' as const,
    desc: 'Para iniciar la producción de tu pedido, solicitamos el 50% del total.',
  },
  {
    number: '5',
    icon: Cog,
    title: 'Producimos tu pedido',
    accent: 'blue' as const,
    desc: 'Con el anticipo confirmado y el diseño aprobado, comenzamos la fabricación de tus etiquetas cuidando cada detalle.',
  },
  {
    number: '6',
    icon: Truck,
    title: 'Entrega y liquidación',
    accent: 'orange' as const,
    desc: 'Te avisamos cuando tu pedido esté listo. Puedes recogerlo en sucursal o solicitar envío.',
    note: 'El saldo restante se puede liquidar en efectivo contra entrega, o mediante transferencia/depósito bancario para poder realizar el envío de tu paquete.',
  },
]

const accentTitleClass = {
  blue: 'text-jona-blue dark:text-blue-300',
  orange: 'text-jona-orange dark:text-orange-400',
}

const accentIconClass = {
  blue: 'bg-jona-blue text-white dark:bg-jona-blue/90',
  orange: 'bg-jona-orange text-white dark:bg-jona-orange/90',
}

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-jona-blue md:text-4xl lg:text-5xl dark:text-blue-300">
            Así trabajamos{' '}
            <span className="font-serif text-4xl normal-case italic text-brand-orange md:text-5xl lg:text-6xl">
              tu pedido
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
            Un proceso simple para ofrecerte etiquetas de{' '}
            <span className="font-semibold text-jona-orange">calidad</span>.
          </p>
        </FadeIn>

        <Stagger stagger={0.08} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <GlassCard className="flex h-full flex-col">
                <div className="mb-4 flex items-start gap-4">
                  <span className="text-4xl font-extrabold leading-none text-stone-300 dark:text-stone-600">
                    {step.number}
                  </span>
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentIconClass[step.accent]}`}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                </div>
                <h3
                  className={`text-base font-bold uppercase tracking-wide ${accentTitleClass[step.accent]}`}
                >
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {step.desc}
                </p>
                {step.note && (
                  <p className="mt-4 rounded-xl border border-jona-orange/20 bg-jona-orange/10 px-4 py-3 text-xs leading-relaxed text-stone-700 dark:border-jona-orange/30 dark:bg-jona-orange/15 dark:text-stone-300">
                    {step.note}
                  </p>
                )}
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2} className="mt-12 flex items-center justify-center gap-2 text-center">
          <Heart className="h-5 w-5 shrink-0 text-jona-orange" strokeWidth={1.75} />
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Gracias por confiar en Jona Labels, etiquetas que{' '}
            <span className="font-semibold text-jona-orange">dan identidad</span>.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
