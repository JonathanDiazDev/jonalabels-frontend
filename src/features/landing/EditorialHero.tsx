import { useEffect, useRef } from 'react'
import { Check, Factory, Gem, MessageSquareText, Truck } from 'lucide-react'
import FadeIn, { MotionLinkButton, Stagger, StaggerItem } from '../../components/FadeIn'

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
            className="h-full w-full object-cover will-change-transform transform-gpu"
            src="https://res.cloudinary.com/oisispbh/video/upload/v1784917112/0724_njhd6w.mp4"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div ref={heroRef} className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <Stagger when="load" stagger={0.12} className="text-center">
            <StaggerItem>
              <h1 className="mb-6 max-w-4xl text-5xl font-normal leading-tight tracking-tighter text-stone-50 md:text-6xl lg:text-7xl">
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
                  className="rounded-full bg-white px-10 py-4 text-sm font-semibold text-stone-900 transition-colors duration-300 hover:bg-stone-100"
                >
                  Cotiza ahora
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
              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 sm:text-xs">
                {[
                  'Calidad Premium',
                  'Envíos a todo México',
                  'Atención personalizada',
                  'Producción desde 5000 piezas',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs font-light text-stone-400">
                    <Check className="h-3.5 w-3.5 text-stone-500" />
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="relative z-10 py-20 transition-colors duration-300 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
              ¿Por qué elegirnos?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
              Cada etiqueta es una pequeña tarjeta de presentación que tu cliente guardará para siempre.
            </p>
          </FadeIn>

          <Stagger stagger={0.12} className="mx-auto grid max-w-3xl grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
            {[
              { icon: MessageSquareText, title: 'Atención personalizada', desc: 'Te acompañamos en cada paso para lograr la etiqueta perfecta.' },
              { icon: Truck, title: 'Envíos nacionales', desc: 'Entregamos en todo México de manera rápida y segura.' },
              { icon: Factory, title: 'Fabricantes directos', desc: 'Somos el taller. Sin intermediarios, con control total de calidad.' },
              { icon: Gem, title: 'Calidad premium', desc: 'Materiales de primera y acabados que elevan tu marca.' },
            ].map(({ icon: Icon, title, desc }) => (
              <StaggerItem key={title} className="flex flex-col items-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-stone-200 bg-stone-100 transition-colors duration-300 dark:border-stone-700 dark:bg-stone-800">
                  <Icon strokeWidth={1.5} className="h-7 w-7 text-stone-900 dark:text-stone-100" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">{desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  )
}
