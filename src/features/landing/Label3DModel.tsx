import type { MotionValue } from 'framer-motion'
import { motion } from 'framer-motion'

interface LayerY {
  y: MotionValue<number>
}

interface Label3DModelProps {
  layer1: LayerY
  layer3: { opacity: MotionValue<number> }
  logoLayoutId?: string
}

const ABSOLUTE = 'absolute inset-0 flex items-center justify-center'

function BaseLayer({ y }: LayerY) {
  return (
    <motion.div
      style={{ y }}
      className={`${ABSOLUTE} rounded-2xl bg-white shadow-lg`}
    />
  )
}

function LogoLayer({ layoutId }: { layoutId?: string }) {
  return (
    <motion.div layoutId={layoutId} className={`${ABSOLUTE} flex-col gap-3 pointer-events-none`}>
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-blue">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span className="text-lg font-bold tracking-wider uppercase text-brand-blue">JL</span>
      <span className="text-sm font-medium text-brand-blue/70">Jonalabels</span>
    </motion.div>
  )
}

function DetailsLayer({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className={`${ABSOLUTE} rounded-2xl border-t-2 border-dashed border-brand-blue/30 shadow-inner`}
    />
  )
}

export default function Label3DModel({ layer1, layer3, logoLayoutId }: Label3DModelProps) {
  return (
    <div className="relative w-64 h-80" aria-label="Animación de etiqueta textil ensamblada por capas">
      <BaseLayer y={layer1.y} />
      <LogoLayer layoutId={logoLayoutId} />
      <DetailsLayer opacity={layer3.opacity} />
    </div>
  )
}
