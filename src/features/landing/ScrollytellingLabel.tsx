import { useRef } from 'react'
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'
import { Sparkles, Scissors, Palette, Timer } from 'lucide-react'

interface ILayerConfig {
  id: string
  src: string
  alt: string
}

const SPRING = { damping: 20, stiffness: 90 }

const MATERIAL_FEATURES = [
  { icon: Sparkles, title: 'Satinado premium', desc: 'Suave al tacto, ideal para ropa.' },
  { icon: Scissors, title: 'Corte ultrasónico', desc: 'No se deshilacha.' },
]

const SERVICE_FEATURES = [
  { icon: Palette, title: 'Impresión nítida', desc: 'Alta fidelidad en tu logo.' },
  { icon: Timer, title: 'Gestión rápida', desc: 'Cotización y distribución ágil.' },
]

function MobileFeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-5 sm:p-6 ${GLASS}`}>
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-jona-orange/10 dark:text-jona-orange sm:h-11 sm:w-11">
        <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{desc}</p>
      </div>
    </div>
  )
}

function DesktopFeatureItem({
  icon: Icon,
  title,
  desc,
  align,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  align: 'right' | 'left'
}) {
  return (
    <div
      className={`flex items-start gap-3 md:mx-auto md:w-fit ${align === 'right' ? 'md:flex-row-reverse md:text-right' : ''}`}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-jona-orange/10 dark:text-jona-orange md:h-10 md:w-10 md:rounded-xl">
        <Icon className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      <div className="min-w-0">
        <h3 className="text-xs font-semibold text-white md:text-sm">{title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-white/70 md:text-sm">{desc}</p>
      </div>
    </div>
  )
}

const FRONT_LAYERS: ILayerConfig[] = [
  { id: 'base', src: '/base-etiqueta.png', alt: 'Base de la etiqueta' },
  { id: 'logo', src: '/logo-impresion.png', alt: 'Logo impreso sobre la etiqueta' },
  { id: 'detalles', src: '/detalles-costura.png', alt: 'Detalles de costura de la etiqueta' },
]

const GLASS =
  'bg-[rgba(10,15,30,0.8)] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)]'

export default function ScrollytellingLabel() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, SPRING)

  const layer1Y = useTransform(smooth, [0, 0.3], [-400, 0])
  const layer1Opacity = useTransform(smooth, [0, 0.25], [0, 1])

  const layer2X = useTransform(smooth, [0.3, 0.4], [-200, 0])
  const layer2Opacity = useTransform(smooth, [0.3, 0.4], [0, 1])

  const layer3X = useTransform(smooth, [0.33, 0.43], [200, 0])
  const layer3Opacity = useTransform(smooth, [0.33, 0.43], [0, 1])

  const flipRotateY = useTransform(smooth, [0.6, 0.8], [0, 180])
  const labelScale = useTransform(smooth, [0.6, 0.8], [1, 1.25])
  const labelFinalY = useTransform(smooth, [0.6, 0.8], [0, -40])

  const cardsTopOpacity = useTransform(smooth, [0, 0.08, 0.3, 0.4], [0, 1, 1, 0])
  const cardsBottomOpacity = useTransform(smooth, [0.5, 0.6, 0.88, 0.96], [0, 1, 1, 0])

  return (
    <section ref={containerRef} id="materiales" className="relative h-[400vh] scroll-mt-20">

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ════════════════════════════════════════════════════════════
            MÓVIL — Staggered 2×2: Cards 1 → Label → Cards 2
            Label sticky at center, cards scroll over it (z-20 > z-10)
           ════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 flex flex-col md:hidden">

          {/* Label sticky gigante — el protagonista absoluto */}
          <div
            className="sticky top-[50dvh] z-10 flex items-center justify-center w-full -translate-y-1/2"
            style={{ perspective: 1000 }}
          >
            <div className="relative h-[60vh] w-[75vw] max-w-[320px]">
              <motion.div
                style={{ rotateY: flipRotateY, scale: labelScale, y: labelFinalY, transformStyle: 'preserve-3d' }}
                className="relative h-full w-full"
              >
                <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                  {FRONT_LAYERS.map((layer, i) => {
                    const yStyle = i === 0 ? { y: layer1Y, opacity: layer1Opacity } : undefined
                    const xStyle = i === 1 ? { x: layer2X, opacity: layer2Opacity } : i === 2 ? { x: layer3X, opacity: layer3Opacity } : undefined
                    return (
                      <motion.img
                        key={layer.id}
                        src={layer.src}
                        alt={layer.alt}
                        style={{ ...yStyle, ...xStyle, backfaceVisibility: 'hidden' as const }}
                        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                      />
                    )
                  })}
                </div>
                <div
                  className="absolute inset-0"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <img
                    src="/reverso-etiqueta.png"
                    alt="Reverso de la etiqueta"
                    className="h-full w-full object-contain pointer-events-none"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tarjetas — z-20 para pasar SOBRE la imagen sticky (z-10) */}
          <div className="relative z-20 -mt-[50vh] flex flex-col">

            {/* Secuencia 1: Satinado + Impresión */}
            <motion.div
              style={{ opacity: cardsTopOpacity }}
              className="grid grid-cols-2 gap-3 px-4 pb-10 sm:gap-4 sm:px-5 sm:pb-14"
            >
              <MobileFeatureCard {...MATERIAL_FEATURES[0]} />
              <MobileFeatureCard {...SERVICE_FEATURES[0]} />
            </motion.div>

            {/* Spacer — genera la distancia visual donde solo se ve la etiqueta libre */}
            <div className="h-[65vh] w-full shrink-0" />

            {/* Secuencia 2: Corte + Gestión */}
            <motion.div
              style={{ opacity: cardsBottomOpacity }}
              className="grid grid-cols-2 gap-3 px-4 pt-10 sm:gap-4 sm:px-5 sm:pt-14"
            >
              <MobileFeatureCard {...MATERIAL_FEATURES[1]} />
              <MobileFeatureCard {...SERVICE_FEATURES[1]} />
            </motion.div>

          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            ESCRITORIO — Grid 3 columnas original (sin cambios)
           ════════════════════════════════════════════════════════════ */}

        {/* Label animado (escritorio) */}
        <div className="absolute inset-0 z-10 hidden items-center justify-center md:flex" style={{ perspective: 1000 }}>
          <div className="relative h-[65vh] aspect-[600/800]">
            <motion.div
              style={{ rotateY: flipRotateY, scale: labelScale, y: labelFinalY, transformStyle: 'preserve-3d' }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                {FRONT_LAYERS.map((layer, i) => {
                  if (i === 0) {
                    return (
                      <motion.img
                        key={layer.id}
                        src={layer.src}
                        alt={layer.alt}
                        style={{ y: layer1Y, opacity: layer1Opacity, backfaceVisibility: 'hidden' as const }}
                        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                      />
                    )
                  }
                  if (i === 1) {
                    return (
                      <motion.img
                        key={layer.id}
                        src={layer.src}
                        alt={layer.alt}
                        style={{ x: layer2X, opacity: layer2Opacity, backfaceVisibility: 'hidden' as const }}
                        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                      />
                    )
                  }
                  return (
                    <motion.img
                      key={layer.id}
                      src={layer.src}
                      alt={layer.alt}
                      style={{ x: layer3X, opacity: layer3Opacity, backfaceVisibility: 'hidden' as const }}
                      className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                    />
                  )
                })}
              </div>
              <div
                className="absolute inset-0"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <img
                  src="/reverso-etiqueta.png"
                  alt="Reverso de la etiqueta"
                  className="h-full w-full object-contain pointer-events-none"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features grid (escritorio) */}
        <motion.div
          style={{ opacity: useTransform(smooth, [0.4, 0.5, 0.7, 0.75], [0, 1, 1, 0]) }}
          className="absolute inset-0 z-20 hidden items-center justify-center px-6 pointer-events-none"
        >
          <div className="grid w-full max-w-6xl grid-cols-3 items-center gap-12">
            <div className="flex flex-col gap-8">
              {MATERIAL_FEATURES.map((f) => (
                <DesktopFeatureItem key={f.title} {...f} align="right" />
              ))}
            </div>
            <div />
            <div className="flex flex-col gap-8">
              {SERVICE_FEATURES.map((f) => (
                <DesktopFeatureItem key={f.title} {...f} align="left" />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  )
}
