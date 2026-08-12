import { memo, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, type MotionValue } from 'framer-motion'
import { ArrowRight, CheckCircle2, Sparkles, Upload, X } from 'lucide-react'
import { useQuote } from '../../context/QuoteContext'
import { whatsAppUrl } from '../../config/constants'

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
      className={`relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border ${color.border} bg-gradient-to-br ${color.satinGradient} shadow-2xl shadow-stone-900/20`}
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
          />
        ) : (
          <div className={`flex flex-col items-center gap-3 text-center ${color.textDark ? 'text-white/50' : 'text-slate-400'}`}>
            <Sparkles className="h-6 w-6" />
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
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[18rem]">
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
            />
          ) : (
            <div className={`flex flex-col items-center gap-3 text-center ${color.textDark ? 'text-white/50' : 'text-amber-900/50'}`}>
              <Sparkles className="h-6 w-6" />
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
      onChange={(e) => scale.set(Number(e.target.value))}
      className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-stone-300 accent-stone-900 transition-colors duration-300 dark:bg-stone-700 dark:accent-stone-100"
    />
  )
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
    <section className="relative overflow-hidden bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat px-4 pb-20 pt-28 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-stone-50/70 transition-colors duration-300 dark:bg-stone-950/75"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">

        {/* Columna izquierda — Controles */}
        <div className="lg:col-span-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400 transition-colors duration-300 dark:text-stone-500">
            Visualizador
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 transition-colors duration-300 md:text-5xl dark:text-stone-100">
            Visualiza tu marca
          </h1>
          <p className="mb-10 text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
            Sube tu diseño, elige un formato y obtén una referencia visual antes de cotizar.
          </p>

          {/* Selectores de Material */}
          <div className="mb-8 inline-flex gap-6 border-b border-stone-200 transition-colors duration-300 dark:border-stone-800">
            {(['SATIN', 'COLGANTE'] as const).map((type) => {
              const selected = labelType === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLabelType(type)}
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
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-stone-900 transition-colors duration-300 dark:bg-white"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Selectores de Color */}
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400 transition-colors duration-300 dark:text-stone-500">
              Color
            </span>
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
                    className={`relative h-10 w-10 rounded-full border transition-colors duration-200 ${color.bg} ${
                      selected
                        ? 'scale-110 border-stone-900 ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-50 dark:border-white dark:ring-white dark:ring-offset-stone-950'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, ease: 'backOut' }}
                        className={`absolute inset-0 grid place-items-center ${color.textDark ? 'text-white' : 'text-stone-900'}`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Botón Subir Diseño */}
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
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-400 hover:shadow-md dark:border-stone-700 dark:bg-stone-800/70 dark:text-stone-300 dark:hover:border-stone-600"
          >
            <Upload className="h-5 w-5 text-stone-400 transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-stone-500" />
            {logoFile ? 'Cambiar diseño' : 'Subir diseño'}
          </motion.button>

          {logoFile && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{logoFile.name}</span>
              <button
                type="button"
                onClick={removeLogo}
                aria-label="Quitar diseño"
                className="rounded-md p-1 text-emerald-600 transition-colors hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {!logoFile && (
            <p className="mt-3 text-xs text-stone-500 transition-colors duration-300 dark:text-stone-400">
              Sube tu diseño con fondo transparente para un mejor resultado.
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Columna derecha — Previsualización */}
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col">
            <div className="mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl bg-white/60 p-6 shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 backdrop-blur-sm transition-colors duration-300 dark:bg-stone-900/60 dark:ring-white/5 sm:p-10 md:aspect-square">
              <div className="flex h-full w-full items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={labelType}
                    initial={{ opacity: 0, scale: 0.96, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -6 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    {labelType === 'SATIN' ? (
                      <SatinPreview previewUrl={previewUrl} color={activeColor} scale={designScale} />
                    ) : (
                      <ColgantePreview previewUrl={previewUrl} color={activeColor} scale={designScale} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Zoom slider */}
            {previewUrl && (
              <div className="mt-5 flex items-center gap-3 px-1">
                <span className="whitespace-nowrap text-xs font-medium text-stone-600 transition-colors duration-300 dark:text-stone-400">
                  Ajustar tamaño
                </span>
                <ZoomSlider scale={designScale} />
              </div>
            )}

            {/* CTA */}
            <motion.button
              type="button"
              onClick={goToWhatsApp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/30"
            >
              Cotizar etiquetas
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  )
}
