import { Link } from 'react-router-dom'
import QuoteForm from './QuoteForm'
import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'

const CATEGORIES = [
  {
    title: 'Etiquetas de Satín Premium',
    slug: 'etiquetas-internas',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop',
    desc: 'Acabado sedoso con brillo elegante que jamás irrita la piel.',
    features: ['Alta definición', 'Bordes sellados', 'Resistente al lavado'],
    popular: true,
  },
  {
    title: 'Cartón Colgante',
    slug: 'etiquetas-externas',
    image: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&h=600&fit=crop',
    desc: 'Tu carta de presentación con acabados en relieve y detalles metalizados.',
    features: ['Relieve', 'Textura mate', 'Metalizado'],
    popular: true,
  },
  {
    title: 'Etiquetas Económicas',
    slug: 'etiquetas-economicas',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop',
    desc: 'Empaque que vende. Bolsas personalizadas de marca memorables.',
    features: ['Kraft o coated', 'Flexográfica', 'Asas custom'],
    popular: false,
  },
  {
    title: 'Avíos Textiles',
    slug: 'avios-textiles',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop',
    desc: 'Botones, cierres, cordones y complementos textiles con tu marca.',
    features: ['Botones custom', 'Cierres', 'Cordones tejidos'],
    popular: false,
  },
]

export default function Productos() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-24 transition-colors duration-300 sm:py-32 md:py-40">
        <FadeIn when="load" className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-light leading-tight tracking-tight text-stone-900 transition-colors duration-300 sm:text-5xl lg:text-6xl dark:text-stone-100">
            Todo lo que tu marca necesita: combina nuestras etiquetas para crear una experiencia de empaque{' '}
            <span className="italic text-stone-500 dark:text-stone-400">premium</span>
          </h1>
        </FadeIn>
      </section>

      {/* Grid de Productos */}
      <section className="relative px-4 py-16 transition-colors duration-300 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
              Nuestros Productos
            </h2>
          </FadeIn>

          <Stagger stagger={0.06} className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {CATEGORIES.map(({ title, image, desc, features, popular }) => (
              <StaggerItem
                key={title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  popular
                    ? 'border-stone-400 dark:border-stone-500'
                    : 'border-stone-200 dark:border-stone-800'
                } bg-white dark:bg-stone-950`}
              >
                {popular && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white dark:bg-stone-100 dark:text-stone-900">
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
                  <h3 className="mb-1.5 text-sm font-bold leading-tight text-stone-900 transition-colors duration-300 lg:text-base dark:text-stone-100">
                    {title}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-stone-500 transition-colors duration-300 dark:text-stone-400">
                    {desc}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 transition-colors duration-300 dark:bg-stone-800 dark:text-stone-400"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/cotizar?producto=${encodeURIComponent(title)}`}
                      className="block w-full rounded-full bg-stone-900 py-2 text-center text-xs font-semibold text-white transition-all duration-300 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
                    >
                      Cotizar este tipo
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Cotización */}
      <section className="relative py-20 transition-colors duration-300 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-stone-100">
              Materialicemos tu visión.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
              Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <QuoteForm />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
