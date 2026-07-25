import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

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
      { threshold: 0.1 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Video — fixed, siempre queda detrás de todo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover will-change-transform transform-gpu"
          src="https://res.cloudinary.com/oisispbh/video/upload/v1784917112/0724_njhd6w.mp4"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Texto — fluye normal, scrollea y desaparece */}
      <div ref={heroRef} className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-6 max-w-4xl text-5xl font-normal leading-tight tracking-tighter text-stone-50 md:text-6xl lg:text-7xl">
            La calidad de una prenda comienza por sus detalles.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-stone-300 transition-colors duration-300 md:text-xl">
            En JonaLabels creamos etiquetas textiles premium para que cada prenda refleje el verdadero valor de tu marca.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/cotizar"
              className="rounded-full bg-white px-10 py-4 text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-stone-100"
            >
              Cotiza ahora
            </Link>
            <Link
              to="/productos"
              className="rounded-full border border-white/30 bg-transparent px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Ver productos
            </Link>
          </div>

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
        </div>
      </div>

      {/* Beneficios — fondo sólido cubre el video */}
      <section className="relative z-10 -mt-[1px] bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-4 text-center text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-stone-500 transition-colors duration-300 dark:text-stone-400">
            Cada etiqueta es una pequeña tarjeta de presentación que tu cliente guardará para siempre.
          </p>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
            {[
              { icon: '⭐', title: 'Atención personalizada', desc: 'Te acompañamos en cada paso para lograr la etiqueta perfecta.' },
              { icon: '📦', title: 'Envíos nacionales', desc: 'Entregamos en todo México de manera rápida y segura.' },
              { icon: '🏭', title: 'Fabricantes directos', desc: 'Somos el taller. Sin intermediarios, con control total de calidad.' },
              { icon: '🎯', title: 'Calidad premium', desc: 'Materiales de primera y acabados que elevan tu marca.' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <h3 className="mb-3 flex items-center gap-3 text-xl font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">
                  <span className="text-2xl">{icon}</span> {title}
                </h3>
                <p className="text-base leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
