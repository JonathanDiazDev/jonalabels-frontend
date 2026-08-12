interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} max-w-3xl ${className}`}>
      {eyebrow && (
        <p
          className={`section-eyebrow mb-4 ${light ? 'text-stone-300' : 'text-jona-orange'}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl ${
          light ? 'text-stone-50' : 'text-stone-900 dark:text-stone-50'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? 'text-stone-300' : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
