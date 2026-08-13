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
import {
  AccentIcon,
  BrandCallout,
  BrandHighlight,
  BrandSplitHeading,
  GlassCard,
  brandAccentAt,
  brandAccentTitle,
  pageMaxWidthClass,
} from '../../components/editorial'

const STEPS = [
  {
    number: '1',
    icon: ClipboardList,
    title: 'Cotizamos tu proyecto',
    desc: 'Analizamos el material, medidas, cantidad y diseño que necesitas para prepararte una cotización a tu medida.',
  },
  {
    number: '2',
    icon: Monitor,
    title: 'Preparamos tu diseño',
    desc: 'Revisamos tu diseño y lo adaptamos a las especificaciones necesarias para que quede listo para producción.',
  },
  {
    number: '3',
    icon: SearchCheck,
    title: 'Te mostramos una vista previa',
    desc: 'Te enviamos una prueba digital para que revises cada detalle. Con tu aprobación, continuamos con tu pedido.',
  },
  {
    number: '4',
    icon: Wallet,
    title: 'Anticipo',
    desc: 'Para iniciar la producción de tu pedido, solicitamos el 50% del total.',
  },
  {
    number: '5',
    icon: Cog,
    title: 'Producimos tu pedido',
    desc: 'Con el anticipo confirmado y el diseño aprobado, comenzamos la fabricación de tus etiquetas cuidando cada detalle.',
  },
  {
    number: '6',
    icon: Truck,
    title: 'Entrega y liquidación',
    desc: 'Te avisamos cuando tu pedido esté listo. Puedes recogerlo en sucursal o solicitar envío.',
    note: 'El saldo restante se puede liquidar en efectivo contra entrega, o mediante transferencia/depósito bancario para poder realizar el envío de tu paquete.',
  },
]

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative z-10 py-20 sm:py-24">
      <div className={`mx-auto ${pageMaxWidthClass} px-4 sm:px-6`}>
        <FadeIn>
          <BrandSplitHeading
            lead="Así trabajamos"
            accent="tu pedido"
            subtitle={
              <>
                Un proceso simple para ofrecerte etiquetas de <BrandHighlight>calidad</BrandHighlight>.
              </>
            }
          />
        </FadeIn>

        <Stagger stagger={0.08} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => {
            const accent = brandAccentAt(index)
            return (
              <StaggerItem key={step.number}>
                <GlassCard className="flex h-full flex-col">
                  <div className="mb-4 flex items-start gap-4">
                    <span className="text-4xl font-extrabold leading-none text-jona-blue/20 dark:text-blue-400/20">
                      {step.number}
                    </span>
                    <AccentIcon accent={accent} icon={step.icon} />
                  </div>
                  <h3
                    className={`text-base font-bold uppercase tracking-wide ${brandAccentTitle[accent]}`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {step.desc}
                  </p>
                  {step.note && (
                    <div className="mt-4">
                      <BrandCallout>{step.note}</BrandCallout>
                    </div>
                  )}
                </GlassCard>
              </StaggerItem>
            )
          })}
        </Stagger>

        <FadeIn delay={0.2} className="mt-12 flex items-center justify-center gap-2 text-center">
          <Heart className="h-5 w-5 shrink-0 text-jona-orange" strokeWidth={1.75} />
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Gracias por confiar en Jona Labels, etiquetas que{' '}
            <BrandHighlight>dan identidad</BrandHighlight>.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
