import { GlassCard, PageHeader, PageSection } from '../../components/editorial'

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
    <PageSection className="pt-32">
      <PageHeader
        eyebrow="Blog"
        align="left"
        title="Diario"
        subtitle="Reflexiones sobre diseño, confección y la identidad de marca en la alta costura."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <article className="md:col-span-8">
          <GlassCard padding="p-0" className="overflow-hidden">
            <div className={`${featured.imageAspect} bg-stone-200 dark:bg-stone-800`} />
            <div className="p-6 sm:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                {featured.date} · {featured.category}
              </p>
              <h2 className="mb-4 text-3xl font-bold text-stone-900 dark:text-stone-100">
                {featured.title}
              </h2>
              <p className="max-w-xl leading-relaxed text-stone-600 dark:text-stone-400">
                {featured.excerpt}
              </p>
            </div>
          </GlassCard>
        </article>

        <div className="flex flex-col gap-8 md:col-span-4">
          {rest.map(({ id, date, category, title, excerpt, imageAspect }) => (
            <article key={id}>
              <GlassCard padding="p-0" className="overflow-hidden">
                <div className={`${imageAspect} bg-stone-200 dark:bg-stone-800`} />
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {date} · {category}
                  </p>
                  <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-100">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {excerpt}
                  </p>
                </div>
              </GlassCard>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  )
}
