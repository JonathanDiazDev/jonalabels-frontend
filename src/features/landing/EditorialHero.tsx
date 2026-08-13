import { useEffect, useRef, type ReactNode } from 'react'
import { Check, Factory, Gem, MessageSquareText, Truck } from 'lucide-react'
import FadeIn, { MotionLinkButton, Stagger, StaggerItem } from '../../components/FadeIn'
import { GlassCard, SectionHeading, AccentIcon, brandAccentAt, brandAccentTitle, pageMaxWidthClass } from '../../components/editorial'

function MexicanFlagIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
      <rect width="8" height="16" fill="#006847" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#CE1126" />
      <ellipse cx="12" cy="8" rx="2.2" ry="2" fill="#8B4513" opacity="0.85" />
    </svg>
  )
}

export default function EditorialHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const hero = heroRef.current
    if (!video || !hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster="https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg"
            className="h-full w-full object-cover will-change-transform transform-gpu"
            src="https://res.cloudinary.com/oisispbh/video/upload/v1784917112/0724_njhd6w.mp4"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div ref={heroRef} className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <Stagger when="load" stagger={0.12} className="text-center">
            <StaggerItem>
              <h1 className="mb-6 max-w-4xl text-5xl font-normal leading-tight tracking-tighter text-jona-blue transition-colors duration-300 md:text-6xl lg:text-7xl dark:text-blue-300">
                La calidad de una prenda comienza por sus detalles.
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-stone-300 transition-colors duration-300 md:text-lg">
                En JonaLabels creamos etiquetas textiles premium para que cada prenda refleje el verdadero valor de tu marca.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <MotionLinkButton
                  to="/cotizar"
                  className="rounded-full bg-jona-orange px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-jona-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-jona-orange/30"
                >
                  Cotiza ahora
                </MotionLinkButton>
                <MotionLinkButton
                  to="/visualizar"
                  className="rounded-full border border-white/35 bg-white/10 px-10 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15"
                >
                  Visualiza tu etiqueta
                </MotionLinkButton>
                <MotionLinkButton
                  to="/productos"
                  className="rounded-full border border-white/30 bg-transparent px-10 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                >
                  Ver productos
                </MotionLinkButton>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3">
                {[
                  'Calidad Premium',
                  'Envíos a todo México',
                  'Atención personalizada',
                  'Producción desde 5000 piezas',
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-xs font-normal text-stone-200/90 drop-shadow-sm sm:text-sm"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-jona-orange sm:h-4 sm:w-4" />
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="relative z-10 py-20 sm:py-24">
        <div className={`mx-auto ${pageMaxWidthClass} px-4 sm:px-6`}>
          <FadeIn>
            <SectionHeading
              eyebrow="Ventajas"
              title="¿Por qué elegirnos?"
              subtitle="Cada etiqueta es una pequeña tarjeta de presentación de tu prenda a tus clientes y forma segura de encontrarte de nuevo."
            />
          </FadeIn>

          <Stagger stagger={0.12} className="mx-auto grid max-w-4xl grid-cols-1 gap-6 text-center sm:grid-cols-2">
            {([
              { id: 'atencion', icon: MessageSquareText, title: 'Atención personalizada', desc: 'Te acompañamos en cada paso para lograr la etiqueta perfecta.' },
              {
                id: 'envios',
                icon: Truck,
                title: (
                  <>
                    Envíos a todo el{' '}
                    <span className="inline-flex items-center gap-1">
                      país
                      <MexicanFlagIcon className="h-3.5 w-5 shrink-0 rounded-sm shadow-sm ring-1 ring-stone-900/10" />
                    </span>
                  </>
                ),
                desc: 'Entregas personales en algunos puntos de Guadalajara',
              },
              { id: 'fabricantes', icon: Factory, title: 'Fabricantes directos', desc: 'Somos el taller. Sin intermediarios, con control total de calidad.' },
              { id: 'calidad', icon: Gem, title: 'Calidad premium', desc: 'Materiales de primera y acabados que elevan tu marca.' },
            ] satisfies { id: string; icon: typeof MessageSquareText; title: ReactNode; desc: string }[]).map((item, index) => {
              const accent = brandAccentAt(index)
              return (
              <StaggerItem key={item.id}>
                <GlassCard className="flex h-full flex-col items-center text-center">
                  <div className="mb-5">
                    <AccentIcon accent={accent} icon={item.icon} className="mx-auto h-16 w-16 rounded-full" />
                  </div>
                  <h3 className={`mb-2 text-xl font-bold ${brandAccentTitle[accent]}`}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-stone-600 dark:text-stone-400">{item.desc}</p>
                </GlassCard>
              </StaggerItem>
            )})}
          </Stagger>
        </div>
      </section>
    </>
  )
}
