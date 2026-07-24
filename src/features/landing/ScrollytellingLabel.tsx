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

const CHEVRON_CLIP = {
  left: 'polygon(0% 0%, calc(100% - 16px) 0%, 100% 50%, calc(100% - 16px) 100%, 0% 100%)',
  right: 'polygon(16px 0%, 100% 0%, 100% 100%, 16px 100%, 0% 50%)',
}

const CHEVRON_CLIP_PADDED = {
  left: 'polygon(6px 6px, calc(100% - 22px) 6px, calc(100% - 6px) 50%, calc(100% - 22px) calc(100% - 6px), 6px calc(100% - 6px))',
  right: 'polygon(22px 6px, calc(100% - 6px) 6px, calc(100% - 6px) calc(100% - 6px), 22px calc(100% - 6px), 6px 50%)',
}

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

      {/* SVG ClipPaths para las flechas chevron */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id="chevron-left" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L0.88,0 L1,0.5 L0.88,1 L0,1 Z" />
          </clipPath>
          <clipPath id="chevron-right" clipPathUnits="objectBoundingBox">
            <path d="M0.12,0 L1,0 L1,1 L0.12,1 L0,0.5 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ════════════════════════════════════════════════════════════
            MÓVIL — Grid 2×2 + imagen central sticky
           ════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-10 flex items-center justify-center md:hidden">
          <div className="w-full max-w-lg px-3">

            {/* ── Fila superior: 2 chevrons ── */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <motion.div style={{ opacity: chevronLeft1 }}>
                <div
                  className={`${GLASS} relative overflow-hidden p-4 pr-5`}
                  style={{ clipPath: 'url(#chevron-left)' }}
                >
                  <FeatureItem {...MATERIAL_FEATURES[0]} align="left" />
                </div>
              </motion.div>
              <motion.div style={{ opacity: chevronRight1 }}>
                <div
                  className={`${GLASS} relative overflow-hidden p-4 pl-5`}
                  style={{ clipPath: 'url(#chevron-right)' }}
                >
                  <FeatureItem {...SERVICE_FEATURES[0]} align="left" />
                </div>
              </motion.div>
            </div>

            {/* ── Imagen central sticky ── */}
            <div
              className="sticky top-0 z-20 mx-auto flex items-center justify-center py-2"
              style={{ perspective: 1000 }}
            >
              <div className="relative h-[38vh] w-full max-w-[220px]">
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

            {/* ── Fila inferior: 2 chevrons ── */}
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              <motion.div style={{ opacity: chevronLeft2 }}>
                <div
                  className={`${GLASS} relative overflow-hidden p-4 pr-5`}
                  style={{ clipPath: 'url(#chevron-left)' }}
                >
                  <FeatureItem {...MATERIAL_FEATURES[1]} align="left" />
                </div>
              </motion.div>
              <motion.div style={{ opacity: chevronRight2 }}>
                <div
                  className={`${GLASS} relative overflow-hidden p-4 pl-5`}
                  style={{ clipPath: 'url(#chevron-right)' }}
                >
                  <FeatureItem {...SERVICE_FEATURES[1]} align="left" />
                </div>
              </motion.div>
            </div>

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
