import { useEffect, useRef, useState } from 'react'
import { ImageUp, Tag } from 'lucide-react'
import { type LabelType, useQuote } from '../../context/QuoteContext'

const OPTIONS: { value: LabelType; title: string; description: string }[] = [
  { value: 'SATIN', title: 'Etiqueta de satín', description: 'Suave, elegante y lista para coser.' },
  { value: 'COLGANTE', title: 'Etiqueta colgante', description: 'Ideal para presentar tu marca y colección.' },
]

const COLORS = [
  { id: 'white', label: 'Blanco', bg: 'bg-white', border: 'border-gray-200', textDark: false, satinGradient: 'from-white to-gray-50', isDark: false },
  { id: 'beige', label: 'Crema', bg: 'bg-[#f3f0e6]', border: 'border-gray-200', textDark: false, satinGradient: 'from-white/90 to-[#f3f0e6]', isDark: false },
  { id: 'black', label: 'Negro', bg: 'bg-slate-900', border: 'border-slate-700', textDark: true, satinGradient: 'from-slate-800 to-slate-900', isDark: true },
  { id: 'navy', label: 'Azul marino', bg: 'bg-[#1B2A4A]', border: 'border-[#1B2A4A]/50', textDark: true, satinGradient: 'from-[#1e3259] to-[#1B2A4A]', isDark: true },
]

const ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg']

export default function LabelVisualizer() {
  const { labelType, logoFile, setLabelType, setLogoFile } = useQuote()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [labelColor, setLabelColor] = useState('beige')
  const [designScale, setDesignScale] = useState(0.75)
  const inputRef = useRef<HTMLInputElement>(null)

  const activeColor = COLORS.find((c) => c.id === labelColor)!

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

  const WHATSAPP_PHONE = '523339472657'

  const goToWhatsApp = () => {
    const material = labelType === 'SATIN' ? 'Satín' : 'Colgante'
    const colorLabel = activeColor.label
    const tieneDiseno = logoFile ? 'Sí, archivo adjunto en breve' : 'No'

    const message = `Hola Jona Labels, me gustaría cotizar una producción. Estuve probando el visualizador con las siguientes características:\n- Material: ${material}\n- Color de fondo: ${colorLabel}\n- ¿Tiene diseño propio?: ${tieneDiseno}\n\nA continuación les envío el archivo de mi diseño para que lo revisen.`

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="py-2 md:py-4" aria-labelledby="visualizer-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-jona-orange">Visualiza tu idea</p>
          <h2 id="visualizer-title" className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Mira cómo podría verse tu marca antes de cotizar.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Sube tu diseño, elige un formato y obtén una referencia visual. Nuestro equipo revisará contigo los detalles finales de producción.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLabelType(option.value)}
                aria-pressed={labelType === option.value}
                className={`rounded-2xl border p-4 text-left transition ${
                  labelType === option.value
                    ? 'border-jona-orange bg-jona-orange/10 ring-1 ring-jona-orange/30'
                    : 'border-gray-200 bg-white hover:border-jona-orange/50 dark:border-slate-700 dark:bg-slate-800'
                }`}
              >
                <span className="block font-semibold text-slate-900 dark:text-white">{option.title}</span>
                <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{option.description}</span>
              </button>
            ))}
          </div>

          {/* Color swatches */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Color:</span>
            {COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setLabelColor(color.id)}
                aria-label={color.label}
                className={`h-10 w-10 rounded-full ${color.bg} ${color.border} border-2 transition-all ${labelColor === color.id ? 'ring-2 ring-offset-2 ring-jona-orange dark:ring-offset-slate-900' : 'hover:scale-110'}`}
              />
            ))}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
            className="sr-only"
            onChange={(event) => handleLogo(event.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-jona-blue px-5 py-3 font-semibold text-jona-blue transition hover:bg-jona-blue/10 dark:border-orange-400/60 dark:text-orange-400 dark:hover:bg-orange-400/10"
          >
            <ImageUp className="h-5 w-5" />
            {logoFile ? 'Cambiar diseño' : 'Subir diseño'}
          </button>
          {logoFile && <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Diseño cargado exitosamente ✓</p>}
          {!logoFile && <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">Sube tu diseño con fondo transparente para un mejor resultado.</p>}
          {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        </div>

        <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 to-orange-50 p-4 shadow-2xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 sm:p-6 md:p-10">
          <div className="mb-5 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
            <span>Vista previa conceptual</span>
            <span className="inline-flex items-center gap-1"><Tag className="h-4 w-4" /> {labelType === 'SATIN' ? 'Satín' : 'Colgante'}</span>
          </div>

          {labelType === 'SATIN' ? (
            <div className={`relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-sm border shadow-md ${activeColor.border} bg-gradient-to-br ${activeColor.satinGradient}`}>
              <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0,transparent_9px,rgba(148,163,184,.35)_10px)]" />
              {activeColor.isDark && <div className="absolute inset-0 opacity-[0.04] [background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] [background-size:4px_4px]" />}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-10">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Diseño del cliente sobre etiqueta de satín"
                    className={`max-h-48 w-11/12 object-contain ${activeColor.isDark ? '' : 'mix-blend-multiply'}`}
                    style={{ transform: `scale(${designScale})` }}
                  />
                ) : (
                  <span className={`text-center text-lg font-semibold tracking-[0.22em] ${activeColor.textDark ? 'text-white/50' : 'text-slate-400'}`}>TU LOGO</span>
                )}
              </div>
              <span className={`absolute bottom-6 left-0 right-0 z-10 text-center text-[10px] font-medium uppercase tracking-[0.28em] ${activeColor.textDark ? 'text-white/60' : 'text-slate-500'}`}>Etiqueta de satín</span>
            </div>
          ) : (
            <div className={`relative mx-auto aspect-[3/4] max-w-[18rem] overflow-hidden rounded-xl border shadow-xl ${activeColor.border} bg-gradient-to-br ${activeColor.satinGradient}`}>
              <div className="absolute top-5 z-20 h-5 w-5 rounded-full border border-gray-300/50 bg-slate-700 shadow-inner" />
              <div className="absolute top-0 z-10 h-14 w-px bg-slate-500" />
              {activeColor.isDark && <div className="absolute inset-0 opacity-[0.04] [background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] [background-size:4px_4px]" />}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-8 pt-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Diseño del cliente sobre etiqueta colgante"
                    className={`max-h-48 w-11/12 object-contain ${activeColor.isDark ? '' : 'mix-blend-multiply'}`}
                    style={{ transform: `scale(${designScale})` }}
                  />
                ) : (
                  <span className={`text-center text-lg font-semibold tracking-[0.22em] ${activeColor.textDark ? 'text-white/50' : 'text-amber-900/50'}`}>TU LOGO</span>
                )}
              </div>
              <span className={`absolute bottom-7 left-0 right-0 z-10 text-center text-[10px] font-medium uppercase tracking-[0.28em] ${activeColor.textDark ? 'text-white/60' : 'text-amber-900/60'}`}>Nueva colección</span>
            </div>
          )}

          {/* Zoom slider */}
          {previewUrl && (
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Ajustar tamaño</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={designScale}
                onChange={(e) => setDesignScale(Number(e.target.value))}
                className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-jona-orange dark:bg-slate-700"
              />
            </div>
          )}

          <button type="button" onClick={goToWhatsApp} className="mt-10 w-full rounded-xl bg-jona-orange px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600">
            Cotizar etiquetas
          </button>
        </div>
      </div>
    </section>
  )
}
