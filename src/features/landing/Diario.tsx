import { GlassCard, PageSection } from '../../components/editorial'

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
      <div className="mb-8 text-center">
        <h1 className="flex flex-wrap items-center justify-center gap-x-2.5 text-[1.7rem] font-extrabold tracking-tight text-jona-blue md:text-[2rem] dark:text-blue-300">
          <span>Blog</span>
          <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
          <span>Diario</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
          Reflexiones sobre diseño, confección y la identidad de marca en la alta costura.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[77%]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-4">
          <article className="lg:w-[58%]">
            <GlassCard padding="p-0" className="flex h-full flex-col overflow-hidden">
              <div className="aspect-[2/1] bg-stone-200 dark:bg-stone-800" />
              <div className="p-3 sm:p-4">
                <p className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-jona-orange sm:text-xs">
                  {featured.date} · {featured.category}
                </p>
                <h2 className="mb-2 text-lg font-extrabold text-jona-blue sm:text-xl dark:text-blue-300">
                  {featured.title}
                </h2>
                <p className="line-clamp-3 text-[0.8125rem] leading-snug text-stone-600 sm:text-sm dark:text-stone-400">
                  {featured.excerpt}
                </p>
              </div>
            </GlassCard>
          </article>

          <div className="flex min-h-0 flex-col gap-3 lg:w-[42%] lg:self-stretch">
            {rest.map(({ id, date, category, title, excerpt }) => (
              <article key={id} className="flex min-h-0 flex-1 basis-0">
                <GlassCard padding="p-0" className="flex h-full w-full overflow-hidden">
                  <div className="w-[46%] max-w-[9.5rem] shrink-0 self-stretch bg-stone-200 sm:max-w-[10.5rem] dark:bg-stone-800" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 px-3 py-3 sm:px-3.5 sm:py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-[0.625rem] font-bold uppercase tracking-[0.12em] text-jona-orange sm:text-[0.65rem]">
                        {date} · {category}
                      </p>
                      <h3 className="mt-1.5 line-clamp-4 text-[0.8125rem] font-bold leading-[1.3] text-jona-blue sm:text-sm dark:text-blue-300">
                        {title}
                      </h3>
                    </div>
                    <p className="line-clamp-3 text-[0.6875rem] leading-[1.45] text-stone-600 sm:text-xs dark:text-stone-400">
                      {excerpt}
                    </p>
                  </div>
                </GlassCard>
              </article>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}
