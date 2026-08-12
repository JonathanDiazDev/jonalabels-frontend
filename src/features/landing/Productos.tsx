import { Link } from 'react-router-dom'
import QuoteForm from './QuoteForm'
import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'
import { GlassCard, PageHeader, PageSection, SectionHeading } from '../../components/editorial'

const CLOUDINARY = {
  satin: 'https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg',
  colgante: 'https://res.cloudinary.com/oisispbh/image/upload/v1784921824/pexels-ron-lach-9594081_x9fu4i.jpg',
  bordado: 'https://res.cloudinary.com/oisispbh/image/upload/v1784922414/wmremove-transformed_cnwfot.png',
}

const CATEGORIES = [
  {
    title: 'Etiquetas de Satín Premium',
    slug: 'etiquetas-internas',
    image: CLOUDINARY.satin,
    desc: 'Acabado sedoso con brillo elegante que jamás irrita la piel.',
    features: ['Alta definición', 'Bordes sellados', 'Resistente al lavado'],
    popular: true,
  },
  {
    title: 'Cartón Colgante',
    slug: 'etiquetas-externas',
    image: CLOUDINARY.colgante,
    desc: 'Tu carta de presentación con acabados en relieve y detalles metalizados.',
    features: ['Relieve', 'Textura mate', 'Metalizado'],
    popular: true,
  },
  {
    title: 'Etiquetas Económicas',
    slug: 'etiquetas-economicas',
    image: CLOUDINARY.satin,
    desc: 'Soluciones accesibles sin sacrificar calidad profesional.',
    features: ['Impresión offset', 'Acabado mate/brillante', 'Corte custom'],
    popular: false,
  },
  {
    title: 'Etiquetas para Mezclilla',
    slug: 'etiquetas-mezclilla',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop',
    desc: 'Parches resistentes diseñados para envejecer con estilo.',
    features: ['Impermeable', 'Bordes sellados', 'Colores industriales'],
    popular: false,
  },
  {
    title: 'Etiquetas para Bisutería',
    slug: 'etiquetas-bisuteria',
    image: CLOUDINARY.bordado,
    desc: 'Pequeñas, delicadas y elegantes para joyería y accesorios.',
    features: ['Tamaño reducido', 'Alta resolución', 'Fondo metalizado'],
    popular: false,
  },
  {
    title: 'Etiquetas Adheribles',
    slug: 'etiquetas-adheribles',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop',
    desc: 'Adhesivo de alto rendimiento para packaging y superficies lisas.',
    features: ['Adhesivo permanente', 'Resina o vinilo', 'Impermeables'],
    popular: false,
  },
  {
    title: 'Bolsa Impresa',
    slug: 'bolsa-impresa',
    image: CLOUDINARY.colgante,
    desc: 'Empaque que vende. Bolsas personalizadas de marca memorables.',
    features: ['Kraft o coated', 'Flexográfica', 'Asas custom'],
    popular: false,
  },
  {
    title: 'Avíos Textiles',
    slug: 'avios-textiles',
    image: CLOUDINARY.bordado,
    desc: 'Botones, cierres, cordones y complementos textiles con tu marca.',
    features: ['Botones custom', 'Cierres', 'Cordones tejidos'],
    popular: false,
  },
]

export default function Productos() {
  return (
    <>
      <PageSection className="!pb-10 !pt-28 sm:!pb-12">
        <FadeIn when="load" className="mx-auto max-w-3xl">
          <PageHeader
            eyebrow="Catálogo"
            align="center"
            className="!mb-0"
            title={
              <>
                Todo lo que tu marca necesita para una experiencia de empaque{' '}
                <span className="font-serif italic text-jona-orange">premium</span>
              </>
            }
          />
        </FadeIn>

        <FadeIn className="mt-12 sm:mt-14">
          <SectionHeading title="Nuestros Productos" className="!mb-8" />
        </FadeIn>

        <Stagger stagger={0.06} className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {CATEGORIES.map(({ title, image, desc, features, popular }) => (
            <StaggerItem key={title}>
              <GlassCard
                padding="p-0"
                className={`group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  popular ? 'ring-stone-400/30 dark:ring-stone-500/30' : ''
                }`}
              >
                {popular && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-jona-blue px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Más popular
                  </span>
                )}

                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-4 lg:p-5">
                  <h3 className="mb-1.5 text-sm font-bold leading-tight text-stone-900 lg:text-base dark:text-stone-100">
                    {title}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                    {desc}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/cotizar?producto=${encodeURIComponent(title)}`}
                      className="block w-full rounded-xl bg-jona-orange py-2 text-center text-xs font-semibold text-white shadow-md shadow-jona-orange/20 transition-all duration-300 hover:shadow-lg hover:shadow-jona-orange/30"
                    >
                      Cotizar este tipo
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </PageSection>

      <PageSection className="!py-12 sm:!py-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Cotización"
            title="Materialicemos tu visión."
            subtitle="Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas."
            className="!mb-8"
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <QuoteForm />
        </FadeIn>
      </PageSection>
    </>
  )
}
