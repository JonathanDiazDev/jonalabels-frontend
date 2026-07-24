import { useEffect, useRef, useState } from 'react'
import {  useQuote } from '../../context/QuoteContext'

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
    <section className="bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed px-4 pt-32 pb-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">

        {/* Columna izquierda — Controles */}
        <div className="lg:col-span-5">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 transition-colors duration-300 md:text-5xl dark:text-stone-100">
            Visualiza tu marca
          </h1>
          <p className="mb-10 text-lg text-stone-500 transition-colors duration-300 dark:text-stone-400">
            Sube tu diseño, elige un formato y obtén una referencia visual antes de cotizar.
          </p>

          {/* Selectores de Material */}
          <div className="mb-8 flex gap-6">
            <button
              type="button"
              onClick={() => setLabelType('SATIN')}
              className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                labelType === 'SATIN'
                  ? 'font-semibold text-stone-900 border-b-2 border-stone-900 dark:text-white dark:border-white'
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
              }`}
            >
              Satín
            </button>
            <button
              type="button"
              onClick={() => setLabelType('COLGANTE')}
              className={`pb-2 text-sm font-medium transition-colors duration-300 ${
                labelType === 'COLGANTE'
                  ? 'font-semibold text-stone-900 border-b-2 border-stone-900 dark:text-white dark:border-white'
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
              }`}
            >
              Colgante
            </button>
          </div>

          {/* Selectores de Color */}
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Color:</span>
            {COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => setLabelColor(color.id)}
                aria-label={color.label}
                className={`h-10 w-10 rounded-full ${color.bg} ${color.border} border transition-all duration-200 ${
                  labelColor === color.id
                    ? 'ring-1 ring-offset-2 ring-stone-800 dark:ring-offset-stone-950'
                    : 'hover:scale-110'
                }`}
              />
            ))}
          </div>

          {/* Botón Subir Diseño */}
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
            className="inline-flex items-center gap-2 border border-stone-300 bg-transparent px-5 py-3 text-sm font-medium text-stone-700 transition-colors duration-300 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {logoFile ? 'Cambiar diseño' : 'Subir diseño'}
          </button>
          {logoFile && <p className="mt-3 text-sm text-stone-500 transition-colors duration-300 dark:text-stone-400">Diseño cargado exitosamente.</p>}
          {!logoFile && <p className="mt-3 text-xs text-stone-400 transition-colors duration-300 dark:text-stone-500">Sube tu diseño con fondo transparente para un mejor resultado.</p>}
          {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        </div>

        {/* Columna derecha — Previsualización */}
        <div className="lg:col-span-7">
          <div className="flex h-full flex-col">
            <div className="w-full max-w-lg mx-auto aspect-[4/5] md:aspect-square relative overflow-hidden rounded-md bg-stone-200/50 p-6 transition-colors duration-300 dark:bg-stone-800/50 sm:p-10">

              {labelType === 'SATIN' ? (
                <div className={`relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-sm border ${activeColor.border} bg-gradient-to-br ${activeColor.satinGradient}`}>
                  <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0,transparent_9px,rgba(148,163,184,.35)_10px)]" />
                  {activeColor.isDark && <div className="absolute inset-0 opacity-[0.04] [background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] [background-size:4px_4px]" />}
                  <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full px-10">
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
                <div className={`relative mx-auto aspect-[3/4] max-w-[18rem] overflow-hidden rounded-xl border ${activeColor.border} bg-gradient-to-br ${activeColor.satinGradient}`}>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-stone-100 dark:bg-[#1a1816] shadow-inner" />
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
                  <span className="whitespace-nowrap text-xs font-medium text-stone-500 transition-colors duration-300 dark:text-stone-400">Ajustar tamaño</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={designScale}
                    onChange={(e) => setDesignScale(Number(e.target.value))}
                    className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-stone-300 accent-stone-900 transition-colors duration-300 dark:bg-stone-700 dark:accent-stone-100"
                  />
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={goToWhatsApp}
              className="mt-6 w-full bg-stone-900 py-4 text-sm font-medium tracking-wide text-white transition-opacity duration-300 hover:opacity-90 dark:bg-stone-100 dark:text-stone-900"
            >
              Cotizar etiquetas
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
