import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'
import { GlassCard, PageHeader, PageSection, SectionEyebrow } from '../../components/editorial'

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
    <PageSection className="pt-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn delay={0.1} className="flex items-center justify-center">
          <GlassCard padding="p-0" className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src="https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg"
              alt="Detalle de etiqueta textil de satín en producción"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </GlassCard>
        </FadeIn>

        <FadeIn>
          <PageHeader
            eyebrow="Nosotros"
            align="left"
            title="Nuestra Historia"
          />

          <div className="space-y-6 text-lg leading-relaxed text-stone-700 dark:text-stone-300">
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
        </FadeIn>
      </div>

      <Stagger stagger={0.12} className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PILARES.map(({ number, title, subtitle, desc }) => (
          <StaggerItem key={number}>
            <GlassCard className="h-full">
              <span className="mb-4 block text-5xl font-light text-stone-300 dark:text-stone-600">
                {number}
              </span>
              <SectionEyebrow>{subtitle}</SectionEyebrow>
              <h2 className="mb-3 text-xl font-semibold text-stone-900 dark:text-stone-100">
                {title}
              </h2>
              <p className="leading-relaxed text-stone-600 dark:text-stone-400">{desc}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </PageSection>
  )
}
