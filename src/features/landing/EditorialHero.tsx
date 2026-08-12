import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Factory, Gem, MessageSquareText, Truck } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeader from '../../components/SectionHeader'

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/85" />
        </div>

        <div ref={heroRef} className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="section-eyebrow mb-6 text-stone-300">Etiquetas textiles premium</p>

            <h1 className="font-display mx-auto mb-6 max-w-5xl text-5xl leading-[1.05] tracking-tight text-stone-50 md:text-6xl lg:text-7xl">
              La calidad de una prenda comienza por sus{' '}
              <span className="italic text-stone-200">detalles</span>.
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-stone-300 md:text-lg">
              En JonaLabels creamos etiquetas textiles premium para que cada prenda refleje el verdadero valor de tu marca.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/cotizar" className="btn-primary min-w-[180px] bg-white text-stone-900 shadow-none hover:bg-stone-100">
                Cotiza ahora
              </Link>
              <Link
                to="/productos"
                className="btn-secondary min-w-[180px] border-white/35 text-white hover:bg-white/10"
              >
                Ver productos
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                'Calidad Premium',
                'Envíos a todo México',
                'Atención personalizada',
                'Producción desde 5000 piezas',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-xs font-medium tracking-wide text-stone-400">
                  <Check className="h-3.5 w-3.5 text-jona-orange" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-stone-400">
          <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
        </div>
      </section>

      <section className="relative z-10 overflow-hidden py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-black/80" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Por qué elegirnos"
            title="Cada etiqueta es una tarjeta de presentación"
            subtitle="Cada etiqueta es una pequeña tarjeta de presentación que tu cliente guardará para siempre."
            light
          />

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { icon: MessageSquareText, title: 'Atención personalizada', desc: 'Te acompañamos en cada paso para lograr la etiqueta perfecta.' },
              { icon: Truck, title: 'Envíos nacionales', desc: 'Entregamos en todo México de manera rápida y segura.' },
              { icon: Factory, title: 'Fabricantes directos', desc: 'Somos el taller. Sin intermediarios, con control total de calidad.' },
              { icon: Gem, title: 'Calidad premium', desc: 'Materiales de primera y acabados que elevan tu marca.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-panel rounded-3xl p-8 text-center transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Icon strokeWidth={1.5} className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-stone-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
