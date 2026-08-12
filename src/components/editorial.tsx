import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export type BrandAccent = 'blue' | 'orange'

export const brandAccentTitle: Record<BrandAccent, string> = {
  blue: 'text-jona-blue dark:text-blue-300',
  orange: 'text-jona-orange dark:text-orange-400',
}

export const brandAccentIconBg: Record<BrandAccent, string> = {
  blue: 'bg-jona-blue text-white dark:bg-jona-blue/90',
  orange: 'bg-jona-orange text-white dark:bg-jona-orange/90',
}

export function brandAccentAt(index: number): BrandAccent {
  return index % 2 === 0 ? 'blue' : 'orange'
}

export function BrandHighlight({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-jona-orange">{children}</span>
}

export function BrandAccentScript({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif normal-case italic text-jona-orange">{children}</span>
  )
}

export function AccentIcon({
  accent,
  icon: Icon,
  className = '',
}: {
  accent: BrandAccent
  icon: LucideIcon
  className?: string
}) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${brandAccentIconBg[accent]} ${className}`}
    >
      <Icon className="h-6 w-6" strokeWidth={1.75} />
    </div>
  )
}

export function BrandCallout({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-jona-orange/20 bg-jona-orange/10 px-4 py-3 text-xs leading-relaxed text-stone-700 dark:border-jona-orange/30 dark:bg-jona-orange/15 dark:text-stone-300">
      {children}
    </p>
  )
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-jona-blue/80 dark:text-blue-300/80">
      {children}
    </p>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h1 className="text-4xl font-extrabold tracking-tight text-jona-blue md:text-5xl dark:text-blue-300">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400">{subtitle}</p>
      )}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2 className="text-3xl font-extrabold tracking-tight text-jona-blue md:text-4xl dark:text-blue-300">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-400">{subtitle}</p>
      )}
    </div>
  )
}

export function BrandSplitHeading({
  lead,
  accent,
  subtitle,
  className = '',
}: {
  lead: string
  accent: string
  subtitle?: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-jona-blue md:text-4xl lg:text-5xl dark:text-blue-300">
        {lead}{' '}
        <BrandAccentScript>{accent}</BrandAccentScript>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600 dark:text-stone-400">{subtitle}</p>
      )}
    </div>
  )
}

export function GlassCard({
  children,
  className = '',
  padding = 'p-6',
}: {
  children: ReactNode
  className?: string
  padding?: string
}) {
  return (
    <div
      className={`rounded-2xl bg-white/60 shadow-lg shadow-jona-blue/5 ring-1 ring-jona-blue/10 backdrop-blur-sm transition-colors duration-300 dark:bg-stone-900/60 dark:shadow-black/20 dark:ring-white/5 ${padding} ${className}`}
    >
      {children}
    </div>
  )
}

export function GlassPanel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-xl border border-jona-blue/10 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-stone-700/80 dark:bg-stone-900/70 ${className}`}
    >
      {children}
    </div>
  )
}

export function PageSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`relative z-10 px-4 py-20 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export const btnPrimaryClass =
  'rounded-xl bg-jona-orange px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-jona-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-jona-orange/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnSecondaryClass =
  'rounded-xl border border-jona-blue/20 bg-white/60 px-6 py-3 text-sm font-semibold text-jona-blue backdrop-blur-sm transition-all duration-300 hover:border-jona-blue/40 hover:bg-white/80 dark:border-blue-400/20 dark:bg-stone-900/60 dark:text-blue-300 dark:hover:border-blue-400/40'

export const inputBrandClass =
  'w-full rounded-xl border border-stone-200/80 bg-white/60 px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors duration-300 backdrop-blur-sm focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 placeholder:text-stone-400 dark:border-stone-700/80 dark:bg-stone-900/50 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20 dark:placeholder:text-stone-500'

export const linkBrandClass =
  'text-sm font-medium text-jona-blue transition-colors hover:text-jona-orange dark:text-blue-300 dark:hover:text-jona-orange'
