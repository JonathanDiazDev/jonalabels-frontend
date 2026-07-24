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

function FeatureItem({
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
      <div className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-jona-orange/10 dark:text-jona-orange md:h-9 md:w-9 md:rounded-lg">
        <Icon className="h-6 w-6 md:h-4 md:w-4" />
      </div>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-white md:text-xs">{title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-white/70 md:text-xs">{desc}</p>
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

  const chevronLeft1 = useTransform(smooth, [0.35, 0.45, 0.68, 0.75], [0, 1, 1, 0])
  const chevronRight1 = useTransform(smooth, [0.38, 0.48, 0.68, 0.75], [0, 1, 1, 0])
  const chevronLeft2 = useTransform(smooth, [0.43, 0.53, 0.68, 0.75], [0, 1, 1, 0])
  const chevronRight2 = useTransform(smooth, [0.46, 0.56, 0.68, 0.75], [0, 1, 1, 0])

  return (
    <section ref={containerRef} id="materiales" className="relative h-[300vh] scroll-mt-20">

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ════════════════════════════════════════════════════════════
            MÓVIL — Grid 3 filas: cards arriba + label center + cards abajo
           ════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 grid grid-rows-[auto_1fr_auto] items-center md:hidden px-5 py-6">

          {/* ── Tarjetas superiores: 2 apiladas ── */}
          <div className="flex flex-col gap-4">
            <motion.div style={{ opacity: chevronLeft1 }}>
              <div className={`${GLASS} relative overflow-hidden p-6`}>
                <FeatureItem {...MATERIAL_FEATURES[0]} align="left" />
              </div>
            </motion.div>
            <motion.div style={{ opacity: chevronRight1 }}>
              <div className={`${GLASS} relative overflow-hidden p-6`}>
                <FeatureItem {...SERVICE_FEATURES[0]} align="left" />
              </div>
            </motion.div>
          </div>

          {/* ── Imagen central gigante ── */}
          <div
            className="sticky top-0 z-20 mx-auto flex items-center justify-center w-full"
            style={{ perspective: 1000 }}
          >
            <div className="relative h-[50vh] w-[70vw] max-w-[360px]">
                <motion.div
                  style={{ rotateY: flipRotateY, scale: labelScale, y: labelFinalY, transformStyle: 'preserve-3d' }}
                  className="relative h-full w-full"
                >
                  {/* Cara frontal */}
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
                  {/* Cara trasera */}
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

          {/* ── Tarjetas inferiores: 2 apiladas ── */}
          <div className="flex flex-col gap-4">
            <motion.div style={{ opacity: chevronLeft2 }}>
              <div className={`${GLASS} relative overflow-hidden p-6`}>
                <FeatureItem {...MATERIAL_FEATURES[1]} align="left" />
              </div>
            </motion.div>
            <motion.div style={{ opacity: chevronRight2 }}>
              <div className={`${GLASS} relative overflow-hidden p-6`}>
                <FeatureItem {...SERVICE_FEATURES[1]} align="left" />
              </div>
            </motion.div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════
            ESCRITORIO — Grid 3 columnas original
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
                <FeatureItem key={f.title} {...f} align="right" />
              ))}
            </div>
            <div />
            <div className="flex flex-col gap-8">
              {SERVICE_FEATURES.map((f) => (
                <FeatureItem key={f.title} {...f} align="left" />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  )
}
