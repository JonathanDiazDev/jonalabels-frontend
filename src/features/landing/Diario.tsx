import FixedBackground from '../../components/FixedBackground'

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

function lastSundays(count: number): Date[] {
  const now = new Date()
  const daysSinceSunday = now.getDay()
  const sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceSunday)
  return Array.from({ length: count }, (_, i) => new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() - 7 * i))
}

const [dateFeatured, dateSecond, dateThird] = lastSundays(3)

const ARTICLES = [
  {
    id: 1,
    featured: true,
    date: formatDate(dateFeatured),
    category: 'Diseño',
    title: 'El renacimiento del satín en las colecciones de temporada',
    excerpt: 'Descubre cómo las marcas independientes están utilizando etiquetas de satín para elevar el valor percibido de sus prendas desde el primer contacto.',
    imageAspect: 'aspect-video',
  },
  {
    id: 2,
    featured: false,
    date: formatDate(dateSecond),
    category: 'Técnica',
    title: 'Guía de costura: Integrando etiquetas en tejidos delicados sin alterar la caída',
    excerpt: 'La clave está en la selección del material y la técnica de insertado. Te enseñamos cómo lograr un etiquetado invisible al tacto pero presente en la identidad.',
    imageAspect: 'aspect-square',
  },
  {
    id: 3,
    featured: false,
    date: formatDate(dateThird),
    category: 'Branding',
    title: 'Por qué el minimalismo sigue dominando el branding textil contemporáneo',
    excerpt: 'Menos ruido, más señal. El diseño de etiquetas minimalista no es tendencia pasajera: es la nueva norma del lujo contemporáneo.',
    imageAspect: 'aspect-square',
  },
]

export default function Diario() {
  const [featured, ...rest] = ARTICLES

  return (
    <section className="relative px-4 pt-32 pb-20 transition-colors duration-300 sm:px-6 lg:px-8">
      <FixedBackground />
      <div className="mx-auto max-w-6xl">

        {/* Hero */}
        <div className="mb-16">
          <h1 className="mb-4 text-5xl font-light tracking-tighter text-stone-900 transition-colors duration-300 md:text-7xl dark:text-stone-100">
            Diario
          </h1>
          <p className="text-xl text-stone-500 transition-colors duration-300 dark:text-stone-400">
            Reflexiones sobre diseño, confección y la identidad de marca en la alta costura.
          </p>
        </div>

        {/* Grid asimétrico */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">

          {/* Artículo destacado */}
          <article className="md:col-span-8">
            <div className={`mb-6 overflow-hidden ${featured.imageAspect} bg-stone-200 transition-colors duration-300 dark:bg-stone-800`} />
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-500 transition-colors duration-300 dark:text-stone-400">
              {featured.date} · {featured.category}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-stone-900 transition-colors duration-300 dark:text-stone-100">
              {featured.title}
            </h2>
            <p className="mb-4 max-w-xl text-stone-600 leading-relaxed transition-colors duration-300 dark:text-stone-400">
              {featured.excerpt}
            </p>
          </article>

          {/* Artículos secundarios */}
          {rest.map(({ id, date, category, title, excerpt, imageAspect }) => (
            <article key={id} className="md:col-span-4">
              <div className={`mb-4 overflow-hidden ${imageAspect} bg-stone-200 transition-colors duration-300 dark:bg-stone-800`} />
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-stone-500 transition-colors duration-300 dark:text-stone-400">
                {date} · {category}
              </p>
              <h3 className="mb-2 text-xl font-bold text-stone-900 transition-colors duration-300 dark:text-stone-100">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">
                {excerpt}
              </p>
            </article>
          ))}

        </div>

      </div>
    </section>
  )
}
