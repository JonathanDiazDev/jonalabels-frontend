import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'
import { GlassCard, PageHeader, PageSection } from '../../components/editorial'

const PILLAR_COLOR = 'text-jona-blue dark:text-blue-300'

const PILARES = [
  {
    number: '01',
    title: 'El Propósito',
    subtitle: 'Misión',
    desc: 'Ser la fuente de valor añadido definitivo para tu marca. Convertimos tu logotipo y visión en piezas textiles de calidad internacional que elevan la percepción de cada prenda.',
  },
  {
    number: '02',
    title: 'El Futuro',
    subtitle: 'Visión',
    desc: 'Consolidarnos como el estudio líder en innovación de etiquetado textil, estableciendo los más altos estándares de excelencia y diseño para la industria de la moda contemporánea.',
  },
  {
    number: '03',
    title: 'La Esencia',
    subtitle: 'Valores',
    desc: 'Compromiso absoluto con el detalle. Transparencia en nuestros procesos. Calidad innegociable en cada milímetro de tela.',
  },
]

export default function Nosotros() {
  return (
    <PageSection className="pt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-4">
        <FadeIn delay={0.1} className="shrink-0">
          <GlassCard padding="p-0" className="relative aspect-[4/5] w-[min(100%,26.2rem)] overflow-hidden sm:w-[27.625rem] lg:w-[25.45rem]">
            <img
              src="https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg"
              alt="Detalle de etiqueta textil de satín en producción"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </GlassCard>
        </FadeIn>

        <FadeIn className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="w-full">
            <PageHeader
              align="center"
              title="Nuestra Historia"
              className="!mb-5 !max-w-none w-full [&>h1]:text-2xl [&>h1]:md:text-3xl"
            />

            <div className="space-y-3 text-justify text-base leading-relaxed text-stone-700 dark:text-stone-300">
              <p>
                Nacimos con una convicción clara: cada prenda merece una firma a la altura de su diseño.
                Entendemos que el empaque y el etiquetado no son un paso final, sino la primera experiencia
                táctil de tu cliente.
              </p>
              <p>
                A lo largo de nuestra trayectoria, nos hemos especializado en la creación de etiquetas
                personalizadas de alta gama, perfeccionando técnicas sobre satín, algodón y materiales
                vanguardistas para asegurar que tu identidad de marca se comunique con total precisión.
              </p>
            </div>
          </div>

          <Stagger stagger={0.12} className="grid grid-cols-3 gap-2 sm:gap-3">
            {PILARES.map(({ number, title, subtitle, desc }) => (
              <StaggerItem key={number} className="min-w-0">
                <GlassCard padding="p-3" className="h-full">
                  <div className="mb-2 flex items-center gap-2 sm:gap-3">
                    <span className={`shrink-0 text-3xl font-light leading-none opacity-40 sm:text-4xl ${PILLAR_COLOR}`}>
                      {number}
                    </span>
                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.1em] text-jona-blue/80 sm:text-xs dark:text-blue-300/80">
                      {subtitle}
                    </p>
                  </div>
                  <h2 className={`mb-2 text-base font-bold ${PILLAR_COLOR}`}>
                    {title}
                  </h2>
                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </Stagger>
        </FadeIn>
      </div>
    </PageSection>
  )
}
