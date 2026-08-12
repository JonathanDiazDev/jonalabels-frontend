import type { ReactNode } from 'react'

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
      {children}
    </p>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
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
      <h2 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl dark:text-stone-100">
        {title}
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
      className={`rounded-2xl bg-white/60 shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 backdrop-blur-sm transition-colors duration-300 dark:bg-stone-900/60 dark:ring-white/5 ${padding} ${className}`}
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
      className={`rounded-xl border border-stone-200/80 bg-white/80 backdrop-blur-sm transition-colors duration-300 dark:border-stone-700/80 dark:bg-stone-900/70 ${className}`}
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
