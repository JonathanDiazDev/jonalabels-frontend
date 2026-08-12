import { memo, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, type MotionValue } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Upload, X } from 'lucide-react'
import { useQuote } from '../../context/QuoteContext'
import { whatsAppUrl } from '../../config/constants'
import Reveal from '../../components/Reveal'

const COLORS = [
  { id: 'white', label: 'Blanco', bg: 'bg-white', border: 'border-gray-200', textDark: false, satinGradient: 'from-white to-gray-50', isDark: false },
  { id: 'beige', label: 'Crema', bg: 'bg-[#f3f0e6]', border: 'border-gray-200', textDark: false, satinGradient: 'from-white/90 to-[#f3f0e6]', isDark: false },
  { id: 'black', label: 'Negro', bg: 'bg-slate-900', border: 'border-slate-700', textDark: true, satinGradient: 'from-slate-800 to-slate-900', isDark: true },
  { id: 'navy', label: 'Azul marino', bg: 'bg-[#1B2A4A]', border: 'border-[#1B2A4A]/50', textDark: true, satinGradient: 'from-[#1e3259] to-[#1B2A4A]', isDark: true },
] as const

type LabelColor = (typeof COLORS)[number]

const ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg']
const CHECKERED_OVERLAY =
  "[background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] [background-size:4px_4px]"

interface PreviewProps {
  previewUrl: string | null
  color: LabelColor
  scale: MotionValue<number>
}

const SatinPreview = memo(function SatinPreview({ previewUrl, color, scale }: PreviewProps) {
  return (
    <div
      className={`satin-shimmer relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border ${color.border} bg-gradient-to-br ${color.satinGradient} shadow-2xl shadow-stone-900/25`}
    >
      <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0,transparent_9px,rgba(148,163,184,.35)_10px)]" />
      {color.isDark && <div className={`absolute inset-0 opacity-[0.04] ${CHECKERED_OVERLAY}`} />}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-10">
        {previewUrl ? (
          <motion.img
            src={previewUrl}
            alt="Diseño del cliente sobre etiqueta de satín"
            className={`max-h-48 w-11/12 object-contain ${color.isDark ? '' : 'mix-blend-multiply'}`}
            style={{ scale }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        ) : (
          <div className={`flex flex-col items-center gap-3 text-center ${color.textDark ? 'text-white/50' : 'text-slate-400'}`}>
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span className="text-lg font-semibold tracking-[0.22em]">TU LOGO</span>
          </div>
        )}
      </div>
      <span className={`absolute bottom-6 left-0 right-0 z-10 text-center text-[10px] font-medium uppercase tracking-[0.28em] ${color.textDark ? 'text-white/60' : 'text-slate-500'}`}>
        Etiqueta de satín
      </span>
    </div>
  )
})

const ColgantePreview = memo(function ColgantePreview({ previewUrl, color, scale }: PreviewProps) {
  return (
    <div className="preview-float relative mx-auto aspect-[3/4] w-full max-w-[18rem]">
      <div className="absolute -top-1 left-1/2 z-0 h-14 w-px -translate-x-1/2 bg-slate-400/70 dark:bg-slate-500/70" />
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-2xl border ${color.border} bg-gradient-to-br ${color.satinGradient} shadow-xl shadow-stone-900/25`}
      >
        <div className="absolute top-3 left-1/2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-stone-100 shadow-inner dark:bg-[#1a1816]" />
        {color.isDark && <div className={`absolute inset-0 opacity-[0.04] ${CHECKERED_OVERLAY}`} />}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-8 pt-4">
          {previewUrl ? (
            <motion.img
              src={previewUrl}
              alt="Diseño del cliente sobre etiqueta colgante"
              className={`max-h-48 w-11/12 object-contain ${color.isDark ? '' : 'mix-blend-multiply'}`}
              style={{ scale }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          ) : (
            <div className={`flex flex-col items-center gap-3 text-center ${color.textDark ? 'text-white/50' : 'text-amber-900/50'}`}>
              <Sparkles className="h-6 w-6 animate-pulse" />
              <span className="text-lg font-semibold tracking-[0.22em]">TU LOGO</span>
            </div>
          )}
        </div>
        <span className={`absolute bottom-7 left-0 right-0 z-10 text-center text-[10px] font-medium uppercase tracking-[0.28em] ${color.textDark ? 'text-white/60' : 'text-amber-900/60'}`}>
          Nueva colección
        </span>
      </div>
    </div>
  )
})

function ZoomSlider({ scale }: { scale: MotionValue<number> }) {
  return (
    <input
      type="range"
      min="0.5"
      max="2"
      step="0.05"
      defaultValue="0.75"
      aria-label="Ajustar tamaño del diseño"
      onChange={(e) => scale.set(Number(e.target.value))}
      className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-stone-300 accent-jona-blue transition-colors duration-300 dark:bg-stone-700"
    />
  )
}

const controlVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
}

export default function LabelVisualizer() {
  const { labelType, logoFile, setLabelType, setLogoFile } = useQuote()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [labelColor, setLabelColor] = useState('beige')
  const designScale = useMotionValue(0.75)
  const inputRef = useRef<HTMLInputElement>(null)

  const activeColor = COLORS.find((c) => c.id === labelColor) ?? COLORS[1]

  useEffect(() => {
    if (!logoFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(logoFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [logoFile])

  const handleLogo = (file?: File) => {
    if (!file) return
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
      setError('Sube un diseño en PNG, JPG o SVG.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('El diseño no puede superar 10 MB.')
      return
    }
    setError('')
    setLogoFile(file)
  }

  const removeLogo = () => {
    setLogoFile(null)
    setError('')
  }

  const goToWhatsApp = () => {
    const material = labelType === 'SATIN' ? 'Satín' : 'Colgante'
    const colorLabel = activeColor.label
    const tieneDiseno = logoFile ? 'Sí, archivo adjunto en breve' : 'No'

    const message = `Hola Jona Labels, me gustaría cotizar una producción. Estuve probando el visualizador con las siguientes características:\n- Material: ${material}\n- Color de fondo: ${colorLabel}\n- ¿Tiene diseño propio?: ${tieneDiseno}\n\nA continuación les envío el archivo de mi diseño para que lo revisen.`

    window.open(whatsAppUrl(message), '_blank')
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <motion.div
            className="glass-panel rounded-[2rem] p-6 sm:p-8"
            initial="hidden"
            animate="visible"
          >
            <motion.p custom={0} variants={controlVariants} className="section-eyebrow mb-4 text-jona-orange">
              Visualizador
            </motion.p>
            <motion.h1 custom={1} variants={controlVariants} className="font-display mb-4 text-4xl tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
              Visualiza tu marca
            </motion.h1>
            <motion.p custom={2} variants={controlVariants} className="mb-8 text-base text-stone-600 dark:text-stone-400">
              Sube tu diseño, elige un formato y obtén una referencia visual antes de cotizar.
            </motion.p>

            <motion.div custom={3} variants={controlVariants} className="mb-8 inline-flex gap-6 border-b border-stone-200 dark:border-stone-700">
              {(['SATIN', 'COLGANTE'] as const).map((type) => {
                const selected = labelType === type
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setLabelType(type)}
                    aria-pressed={selected}
                    className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                      selected
                        ? 'text-stone-900 dark:text-white'
                        : 'text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300'
                    }`}
                  >
                    {type === 'SATIN' ? 'Satín' : 'Colgante'}
                    {selected && (
                      <motion.span
                        layoutId="material-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 bg-jona-blue dark:bg-white"
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      />
                    )}
                  </button>
                )
              })}
            </motion.div>

            <motion.div custom={4} variants={controlVariants} className="mb-8">
              <span className="mb-3 block text-xs font-medium uppercase tracking-wider text-stone-500">Color</span>
              <div className="flex items-center gap-3">
                {COLORS.map((color) => {
                  const selected = labelColor === color.id
                  return (
                    <motion.button
                      key={color.id}
                      type="button"
                      onClick={() => setLabelColor(color.id)}
                      aria-label={color.label}
                      aria-pressed={selected}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative h-10 w-10 rounded-full border ${color.bg} ${
                        selected
                          ? 'border-jona-blue ring-2 ring-jona-blue ring-offset-2 ring-offset-white dark:ring-offset-stone-900'
                          : 'border-stone-300 dark:border-stone-600'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`absolute inset-0 grid place-items-center ${color.textDark ? 'text-white' : 'text-stone-900'}`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            <motion.div custom={5} variants={controlVariants}>
              <input
                ref={inputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
                className="sr-only"
                onChange={(event) => handleLogo(event.target.files?.[0])}
              />
              <motion.button
                type="button"
                onClick={() => inputRef.current?.click()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white/80 px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-200"
              >
                <Upload className="h-5 w-5 text-stone-400" />
                {logoFile ? 'Cambiar diseño' : 'Subir diseño'}
              </motion.button>

              {logoFile && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{logoFile.name}</span>
                  <button type="button" onClick={removeLogo} aria-label="Quitar diseño" className="rounded-md p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/50">
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
              {!logoFile && (
                <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                  Sube tu diseño con fondo transparente para un mejor resultado.
                </p>
              )}
              {error && (
                <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400" role="alert">
                  {error}
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="flex h-full flex-col">
            <motion.div
              className="preview-float mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-[2rem] p-6 sm:p-10 md:aspect-square glass-panel"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${labelType}-${labelColor}`}
                    initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.94, rotateY: 8 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex h-full w-full items-center justify-center"
                    style={{ perspective: 1000 }}
                  >
                    {labelType === 'SATIN' ? (
                      <SatinPreview previewUrl={previewUrl} color={activeColor} scale={designScale} />
                    ) : (
                      <ColgantePreview previewUrl={previewUrl} color={activeColor} scale={designScale} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <AnimatePresence>
              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 flex items-center gap-3 px-1"
                >
                  <span className="whitespace-nowrap text-xs font-medium text-stone-600 dark:text-stone-400">
                    Ajustar tamaño
                  </span>
                  <ZoomSlider scale={designScale} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                onClick={goToWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex-1 bg-jona-orange shadow-lg shadow-jona-orange/25 hover:bg-orange-500"
              >
                <span className="inline-flex items-center gap-2">
                  Cotizar por WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>
              <Link to="/cotizar" className="btn-secondary flex-1 border-stone-300 text-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800">
                Enviar cotización web
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
