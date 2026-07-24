import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScroll, useTransform, useSpring, motion, LayoutGroup } from 'framer-motion'
import Label3DModel from './Label3DModel'

const SPRING = { damping: 20, stiffness: 90 }

function HeroLogo() {
  return (
    <motion.div layoutId="brand-logo" className="flex flex-col items-center gap-3">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-blue">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span className="text-xl font-bold tracking-wider uppercase text-brand-blue">JL</span>
      <span className="text-sm font-medium text-brand-blue/70">Jonalabels</span>
    </motion.div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smooth = useSpring(raw, SPRING)

  const heroOpacity = useTransform(smooth, [0, 0.2], [1, 0])
  const heroY = useTransform(smooth, [0, 0.18], [0, '-20vh'])

  const baseY = useTransform(smooth, [0.2, 0.6], [window.innerHeight, 0])
  const detailsOpacity = useTransform(smooth, [0.5, 0.7], [0, 1])

  const ctaOpacity = useTransform(smooth, [0.75, 0.9], [0, 1])
  const ctaY = useTransform(smooth, [0.75, 0.9], ['8vh', '0vh'])

  const handleCtaClick = () => {
    navigate('/cotizar')
  }

  return (
    <LayoutGroup>
      <section ref={containerRef} className="relative" aria-label="Sección principal de bienvenida">

        {/* ── Hero ── */}
        <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="flex flex-col items-center gap-6 px-6 text-center"
          >
            <HeroLogo />
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-brand-blue md:text-5xl lg:text-6xl">
              Etiquetas que dan identidad
            </h1>
            <p className="max-w-xl text-lg font-medium text-brand-blue/70">
              Dale identidad a tus prendas con etiquetas de satín premium personalizadas.
            </p>
          </motion.div>
        </div>

        {/* ── Scroll trigger spacer ── */}
        <div className="h-[200vh] relative z-20">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <Label3DModel
              layer1={{ y: baseY }}
              layer3={{ opacity: detailsOpacity }}
              logoLayoutId="brand-logo"
            />
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="relative z-30 flex flex-col items-center justify-center px-6 py-32"
        >
          <p className="mb-8 max-w-xl text-center text-lg font-medium text-brand-blue/80">
            Dale identidad a tus prendas con etiquetas de satín premium personalizadas.
          </p>
          <motion.button
            onClick={handleCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer rounded-xl bg-brand-orange px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-brand-orange/30"
          >
            Cotizar mi diseño
          </motion.button>
        </motion.div>

      </section>
    </LayoutGroup>
  )
}
