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
    <div className={`flex items-start gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-jona-orange/10 dark:text-jona-orange">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  )
}

const FRONT_LAYERS: ILayerConfig[] = [
  { id: 'base', src: '/base-etiqueta.png', alt: 'Base de la etiqueta' },
  { id: 'logo', src: '/logo-impresion.png', alt: 'Logo impreso sobre la etiqueta' },
  { id: 'detalles', src: '/detalles-costura.png', alt: 'Detalles de costura de la etiqueta' },
]

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

  const gridOpacity = useTransform(smooth, [0.4, 0.5, 0.7, 0.75], [0, 1, 1, 0])

  const flipRotateY = useTransform(smooth, [0.6, 0.8], [0, 180])
  const labelScale = useTransform(smooth, [0.6, 0.8], [1, 1.25])
  const labelFinalY = useTransform(smooth, [0.6, 0.8], [0, -40])

  return (
    <section ref={containerRef} id="materiales" className="relative h-[300vh] scroll-mt-20">

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ── Grid de características ── */}
        <motion.div
          style={{ opacity: gridOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">

            {/* Left — Material features */}
            <div className="flex flex-col gap-8">
              {MATERIAL_FEATURES.map((f) => (
                <FeatureItem key={f.title} {...f} align="right" />
              ))}
            </div>

            {/* Center — empty spacer (animated label shows through) */}
            <div />

            {/* Right — Service features */}
            <div className="flex flex-col gap-8">
              {SERVICE_FEATURES.map((f) => (
                <FeatureItem key={f.title} {...f} align="left" />
              ))}
            </div>

          </div>
        </motion.div>

        {/* ── Contenedor con perspectiva 3D ── */}
        <div className="relative h-[55vh] md:h-[65vh] aspect-[600/800]" style={{ perspective: 1000 }}>

          {/* ── Tarjeta que gira ── */}
          <motion.div
            style={{ rotateY: flipRotateY, scale: labelScale, y: labelFinalY, transformStyle: 'preserve-3d' }}
            className="relative w-full h-full"
          >

            {/* ── Cara frontal ── */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
              {FRONT_LAYERS.map((layer, i) => {
                if (i === 0) {
                  return (
                    <motion.img
                      key={layer.id}
                      src={layer.src}
                      alt={layer.alt}
                      style={{ y: layer1Y, opacity: layer1Opacity, backfaceVisibility: 'hidden' as const }}
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
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
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                  )
                }
                return (
                  <motion.img
                    key={layer.id}
                    src={layer.src}
                    alt={layer.alt}
                    style={{ x: layer3X, opacity: layer3Opacity, backfaceVisibility: 'hidden' as const }}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                )
              })}
            </div>

            {/* ── Cara trasera (reverso) ── */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <img
                src="/reverso-etiqueta.png"
                alt="Reverso de la etiqueta"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

          </motion.div>
        </div>

      </div>

    </section>
  )
}
