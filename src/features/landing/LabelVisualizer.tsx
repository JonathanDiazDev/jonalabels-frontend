import { memo, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useMotionValue, type MotionValue } from 'framer-motion'
import { ArrowRight, CheckCircle2, Eye, Pipette, Sparkles, Upload, X } from 'lucide-react'
import { useQuote, type GarmentZoneKey } from '../../context/QuoteContext'
import { whatsAppUrl } from '../../config/constants'
import { SectionEyebrow, btnPrimaryClass, pageMaxWidthNarrowClass } from '../../components/editorial'

const PRESET_COLORS = [
  { id: 'white', label: 'Blanco', hex: '#FFFFFF' },
  { id: 'beige', label: 'Crema', hex: '#F3F0E6' },
  { id: 'gray', label: 'Gris', hex: '#9CA3AF' },
  { id: 'black', label: 'Negro', hex: '#1E293B' },
  { id: 'navy', label: 'Azul marino', hex: '#1B2A4A' },
  { id: 'burgundy', label: 'Vino', hex: '#722F37' },
  { id: 'gold', label: 'Dorado', hex: '#C5A572' },
  { id: 'forest', label: 'Verde bosque', hex: '#2D4A3E' },
] as const

type PresetId = (typeof PRESET_COLORS)[number]['id']

export interface ResolvedLabelColor {
  id: string
  label: string
  hex: string
  isDark: boolean
  textDark: boolean
  borderClass: string
  gradientStyle: CSSProperties
}

const ACCEPTED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg']
const CHECKERED_OVERLAY =
  "[background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] [background-size:4px_4px]"

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  const value = normalized.slice(1)
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((c) => clampChannel(c).toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

function normalizeHex(input: string): string | null {
  const raw = input.trim().replace(/^#/, '')
  if (/^[0-9A-Fa-f]{3}$/.test(raw)) {
    const expanded = raw.split('').map((c) => c + c).join('')
    return `#${expanded.toUpperCase()}`
  }
  if (/^[0-9A-Fa-f]{6}$/.test(raw)) {
    return `#${raw.toUpperCase()}`
  }
  return null
}

function relativeLuminance(hex: string) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 1
  const channels = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function adjustHex(hex: string, amount: number) {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return rgbToHex(rgb.r + amount, rgb.g + amount, rgb.b + amount)
}

function buildGradientStyle(hex: string): CSSProperties {
  const lighter = adjustHex(hex, 18)
  const darker = adjustHex(hex, -22)
  return { background: `linear-gradient(to bottom right, ${lighter}, ${hex} 55%, ${darker})` }
}

function resolveLabelColor(presetId: PresetId | 'custom', customHex: string): ResolvedLabelColor {
  if (presetId !== 'custom') {
    const preset = PRESET_COLORS.find((color) => color.id === presetId) ?? PRESET_COLORS[1]
    const isDark = relativeLuminance(preset.hex) < 0.35
    return {
      id: preset.id,
      label: preset.label,
      hex: preset.hex,
      isDark,
      textDark: isDark,
      borderClass: isDark ? 'border-stone-700' : 'border-stone-200',
      gradientStyle: buildGradientStyle(preset.hex),
    }
  }

  const hex = normalizeHex(customHex) ?? '#F3F0E6'
  const isDark = relativeLuminance(hex) < 0.35
  return {
    id: 'custom',
    label: hex,
    hex,
    isDark,
    textDark: isDark,
    borderClass: isDark ? 'border-stone-700' : 'border-stone-200',
    gradientStyle: buildGradientStyle(hex),
  }
}

interface PreviewProps {
  previewUrl: string | null
  color: ResolvedLabelColor
  scale: MotionValue<number>
}

const SatinPreview = memo(function SatinPreview({ previewUrl, color, scale }: PreviewProps) {
  return (
    <div
      className={`relative mx-auto aspect-[4/5] w-full max-w-[330px] overflow-hidden rounded-lg border ${color.borderClass} shadow-2xl shadow-stone-900/20`}
      style={color.gradientStyle}
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
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px]">
      <div className="absolute -top-1 left-1/2 z-0 h-14 w-px -translate-x-1/2 bg-slate-400/70 dark:bg-slate-500/70" />
      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-2xl border ${color.borderClass} shadow-xl shadow-stone-900/25`}
        style={color.gradientStyle}
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
      aria-label="Ajustar tamaño del diseño"
      onChange={(e) => scale.set(Number(e.target.value))}
      className="h-2.5 flex-1 cursor-pointer appearance-none rounded-full bg-stone-300 accent-stone-900 transition-colors duration-300 dark:bg-stone-700 dark:accent-stone-100"
    />
  )
}

const GARMENT_ZONES: Record<
  GarmentZoneKey,
  {
    label: string
    baseImage: string
    shadingLayer: string
    material: 'SATIN' | 'COLGANTE'
    zone?: { top: string; left: string; width: string; height: string }
    rotatedZone?: {
      centerTop: string
      centerLeft: string
      width: string
      height: string
      rotate: string
    }
  }
> = {
  cuello_playera: {
    label: 'Cuello de playera',
    baseImage: '/mockups/saten/saten-base/cuello_playera_base.jpg',
    shadingLayer: '/mockups/saten/saten-shading/cuello_playera_shading.png',
    zone: { top: '41.25%', left: '28.79%', width: '44.87%', height: '14.58%' },
    material: 'SATIN',
  },
  dobladillo_sudadera: {
    label: 'Dobladillo',
    baseImage: '/mockups/saten/saten-base/dobladillo_sudadera_base.jpg',
    shadingLayer: '/mockups/saten/saten-shading/dobladillo_sudadera_shading.png',
    zone: { top: '41.25%', left: '35.94%', width: '30.80%', height: '14.17%' },
    material: 'SATIN',
  },
  cuello_negro: {
    label: 'Cuello negro',
    baseImage: '/mockups/saten/saten-base/cuello_negro_base.jpg',
    shadingLayer: '/mockups/saten/saten-shading/cuello_negro_shading.png',
    zone: { top: '35.67%', left: '42.19%', width: '15.51%', height: '8.33%' },
    material: 'SATIN',
  },
  colgante_1: {
    label: 'Colgante 1',
    baseImage: '/mockups/saten/hangtag-base/hangtag_1_base.png',
    shadingLayer: '/mockups/saten/hangtag-shading/hangtag_1_shading.png',
    rotatedZone: {
      centerTop: '59.10%',
      centerLeft: '55.14%',
      width: '17.60%',
      height: '58.67%',
      rotate: '35.8deg',
    },
    material: 'COLGANTE',
  },
  colgante_2: {
    label: 'Colgante 2',
    baseImage: '/mockups/saten/hangtag-base/hangtag_2_base.png',
    shadingLayer: '/mockups/saten/hangtag-shading/hangtag_2_shading.png',
    zone: { top: '36.67%', left: '33.86%', width: '12.75%', height: '47.30%' },
    material: 'COLGANTE',
  },
  colgante_3: {
    label: 'Colgante 3',
    baseImage: '/mockups/saten/hangtag-base/hangtag_3_base.png',
    shadingLayer: '/mockups/saten/hangtag-shading/hangtag_3_shading.png',
    rotatedZone: {
      centerTop: '59.25%',
      centerLeft: '56.44%',
      width: '14.33%',
      height: '47.03%',
      rotate: '49.15deg',
    },
    material: 'COLGANTE',
  },
  colgante_4: {
    label: 'Colgante 4',
    baseImage: '/mockups/saten/hangtag-base/hangtag_4_base.png',
    shadingLayer: '/mockups/saten/hangtag-shading/hangtag_4_shading.png',
    rotatedZone: {
      centerTop: '59.15%',
      centerLeft: '54.78%',
      width: '15.18%',
      height: '55.47%',
      rotate: '40.52deg',
    },
    material: 'COLGANTE',
  },
}

interface GarmentPreviewProps {
  previewUrl: string | null
  garmentKey: GarmentZoneKey
  scale: MotionValue<number>
}

const GarmentPreview = memo(function GarmentPreview({
  previewUrl,
  garmentKey,
  scale,
}: GarmentPreviewProps) {
  const garment = GARMENT_ZONES[garmentKey]
  const isSatin = garment.material === 'SATIN'

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={garmentKey}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full overflow-hidden rounded-2xl bg-stone-100 shadow-lg shadow-stone-900/10 ring-1 ring-stone-900/5 dark:bg-stone-800 dark:ring-white/5"
          style={{ aspectRatio: isSatin ? '896 / 1200' : '3 / 4' }}
        >
          <img
            src={garment.baseImage}
            alt={garment.label}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {previewUrl && garment.zone && (
            <>
              <motion.img
                src={previewUrl}
                alt="Tu logo"
                className="absolute object-contain"
                style={{
                  top: garment.zone.top,
                  left: garment.zone.left,
                  width: garment.zone.width,
                  height: garment.zone.height,
                  scale,
                }}
              />
              <img
                src={garment.shadingLayer}
                alt=""
                aria-hidden
                className="pointer-events-none absolute object-cover"
                style={{
                  top: garment.zone.top,
                  left: garment.zone.left,
                  width: garment.zone.width,
                  height: garment.zone.height,
                  mixBlendMode: 'multiply',
                }}
              />
            </>
          )}

          {previewUrl && garment.rotatedZone && (
            <div
              className="absolute overflow-hidden"
              style={{
                top: garment.rotatedZone.centerTop,
                left: garment.rotatedZone.centerLeft,
                width: garment.rotatedZone.width,
                height: garment.rotatedZone.height,
                transform: `translate(-50%, -50%) rotate(${garment.rotatedZone.rotate})`,
              }}
            >
              <motion.img
                src={previewUrl}
                alt="Tu logo"
                className="absolute inset-0 h-full w-full object-contain"
                style={{ scale }}
              />
              <img
                src={garment.shadingLayer}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          )}

          <span className="absolute bottom-4 left-0 right-0 z-10 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500/80">
            {garment.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

export default function LabelVisualizer() {
  const { labelType, garmentZone, logoFile, setLabelType, setGarmentZone, setLogoFile } = useQuote()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [presetId, setPresetId] = useState<PresetId | 'custom'>('beige')
  const [customHex, setCustomHex] = useState('#F3F0E6')
  const [hexInput, setHexInput] = useState('F3F0E6')
  const [hexError, setHexError] = useState('')
  const [showMockup, setShowMockup] = useState(false)
  const designScale = useMotionValue(0.75)
  const inputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLInputElement>(null)

  const activeColor = useMemo(
    () => resolveLabelColor(presetId, customHex),
    [presetId, customHex],
  )

  useEffect(() => {
    if (!logoFile) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(logoFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [logoFile])

  const selectPreset = (id: PresetId) => {
    setPresetId(id)
    setHexError('')
    const preset = PRESET_COLORS.find((color) => color.id === id)
    if (preset) {
      setCustomHex(preset.hex)
      setHexInput(preset.hex.replace('#', ''))
    }
  }

  const selectCustomMode = () => {
    setPresetId('custom')
    setHexError('')
  }

  const applyHexInput = (raw: string) => {
    setHexInput(raw.replace('#', '').toUpperCase())
    const normalized = normalizeHex(raw)
    if (!normalized) {
      setHexError('Usa un hex válido, por ejemplo F3F0E6 o #FFF')
      return
    }
    setHexError('')
    setCustomHex(normalized)
    setPresetId('custom')
  }

  const handleColorPicker = (value: string) => {
    const normalized = normalizeHex(value)
    if (!normalized) return
    setCustomHex(normalized)
    setHexInput(normalized.replace('#', ''))
    setPresetId('custom')
    setHexError('')
  }

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
    const colorLabel = presetId === 'custom' ? activeColor.hex : activeColor.label
    const tieneDiseno = logoFile ? 'Sí, archivo adjunto en breve' : 'No'

    const message = `Hola Jona Labels, me gustaría cotizar una producción. Estuve probando el visualizador con las siguientes características:\n- Material: ${material}\n- Color de fondo: ${colorLabel}\n- ¿Tiene diseño propio?: ${tieneDiseno}\n\nA continuación les envío el archivo de mi diseño para que lo revisen.`

    window.open(whatsAppUrl(message), '_blank')
  }

  const isCustomActive = presetId === 'custom'

  return (
    <section className="relative z-10 px-4 pb-8 pt-24 sm:px-6 lg:pb-10">
      <div className={`mx-auto flex ${pageMaxWidthNarrowClass} flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-10 xl:gap-12`}>
        <div className="w-full max-w-md text-center lg:max-w-sm lg:flex-1 lg:text-left xl:max-w-md">
          <SectionEyebrow>Visualizador</SectionEyebrow>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-jona-blue md:text-4xl dark:text-blue-300">
            Visualiza tu marca
          </h1>
          <p className="mb-5 text-base text-stone-600 dark:text-stone-400">
            Sube tu diseño, elige un formato y obtén una referencia visual antes de cotizar.
          </p>

          <div className="mb-5 inline-flex gap-5 border-b border-stone-200 dark:border-stone-800">
            {(['SATIN', 'COLGANTE'] as const).map((type) => {
              const selected = labelType === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLabelType(type)}
                  className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
                    selected
                      ? 'text-jona-blue dark:text-blue-300'
                      : 'text-stone-400 hover:text-jona-orange dark:text-stone-500 dark:hover:text-jona-orange'
                  }`}
                >
                  {type === 'SATIN' ? 'Satín' : 'Colgante'}
                  {selected && (
                    <motion.span
                      layoutId="material-underline"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-jona-orange"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Color de fondo
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {PRESET_COLORS.map((color) => {
                const selected = presetId === color.id
                const isDark = relativeLuminance(color.hex) < 0.35
                return (
                  <motion.button
                    key={color.id}
                    type="button"
                    onClick={() => selectPreset(color.id)}
                    aria-label={color.label}
                    aria-pressed={selected}
                    title={color.label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-8 w-8 rounded-full border transition-colors duration-200 ${
                      selected
                        ? 'scale-110 border-stone-900 ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-50 dark:border-white dark:ring-white dark:ring-offset-stone-950'
                        : 'border-stone-300 dark:border-stone-600'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute inset-0 grid place-items-center ${isDark ? 'text-white' : 'text-stone-900'}`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}

              <motion.button
                type="button"
                onClick={selectCustomMode}
                aria-label="Color personalizado"
                aria-pressed={isCustomActive}
                title="Color personalizado"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200 ${
                  isCustomActive
                    ? 'border-stone-900 ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-50 dark:border-white dark:ring-white dark:ring-offset-stone-950'
                    : 'border-dashed border-stone-400 dark:border-stone-500'
                }`}
                style={{ backgroundColor: isCustomActive ? activeColor.hex : undefined }}
              >
                {!isCustomActive && <Pipette className="h-4 w-4 text-stone-500 dark:text-stone-400" />}
                {isCustomActive && (
                  <CheckCircle2 className={`h-3.5 w-3.5 ${activeColor.isDark ? 'text-white' : 'text-stone-900'}`} />
                )}
              </motion.button>
            </div>

            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              Seleccionado: <span className="font-medium text-stone-700 dark:text-stone-300">{activeColor.label}</span>
            </p>

            <div className="mt-3 rounded-xl border border-stone-200 bg-white/80 p-2.5 dark:border-stone-700 dark:bg-stone-900/70">
              <p className="mb-1.5 text-xs font-medium text-stone-600 dark:text-stone-400">Color personalizado</p>
              <div className="flex items-center gap-2">
                <label className="relative shrink-0 cursor-pointer">
                  <span className="sr-only">Selector gráfico de color</span>
                  <input
                    ref={colorPickerRef}
                    type="color"
                    value={activeColor.hex}
                    onChange={(e) => handleColorPicker(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded-lg border border-stone-300 bg-transparent p-0.5 dark:border-stone-600"
                  />
                </label>
                <div className="flex min-w-0 flex-1 items-center rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800">
                  <span className="pl-2.5 text-sm text-stone-400">#</span>
                  <input
                    type="text"
                    value={hexInput}
                    maxLength={6}
                    spellCheck={false}
                    aria-label="Código hexadecimal del color"
                    placeholder="F3F0E6"
                    onFocus={selectCustomMode}
                    onChange={(e) => {
                      const next = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()
                      setHexInput(next)
                      if (next.length === 3 || next.length === 6) applyHexInput(next)
                      else setHexError('')
                    }}
                    onBlur={() => {
                      if (hexInput.length > 0) applyHexInput(hexInput)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') applyHexInput(hexInput)
                    }}
                    className="w-full bg-transparent py-2 pr-2.5 text-sm uppercase text-stone-900 outline-none placeholder:text-stone-400 dark:text-stone-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => colorPickerRef.current?.click()}
                  className="shrink-0 rounded-lg border border-stone-200 px-2.5 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  Elegir
                </button>
              </div>
              {hexError && (
                <p className="mt-2 text-xs text-red-500" role="alert">{hexError}</p>
              )}
            </div>
          </div>

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
            className="group mx-auto inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all duration-300 hover:border-stone-400 hover:shadow-md dark:border-stone-700 dark:bg-stone-800/70 dark:text-stone-300 dark:hover:border-stone-600 lg:mx-0"
          >
            <Upload className="h-4 w-4 text-stone-400 transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-stone-500" />
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
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              Sube tu diseño con fondo transparente para un mejor resultado.
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex w-full max-w-[480px] shrink-0 flex-col items-center lg:max-w-[460px] xl:max-w-[480px]">
          <div className="flex w-full flex-col items-center">
            <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white/60 p-4 shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 backdrop-blur-sm dark:bg-stone-900/60 dark:ring-white/5 sm:p-5">
              <div className="flex h-full w-full items-center justify-center">
                <AnimatePresence mode="wait">
                  {showMockup ? (
                    <motion.div
                      key={`mockup-${garmentZone}`}
                      initial={{ opacity: 0, scale: 0.96, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <GarmentPreview
                        previewUrl={previewUrl}
                        garmentKey={garmentZone}
                        scale={designScale}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${labelType}-${activeColor.hex}`}
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
                  )}
                </AnimatePresence>
              </div>
            </div>

            {showMockup && (
              <div className="mt-4 flex w-full flex-wrap justify-center gap-2 px-1">
                {(Object.entries(GARMENT_ZONES) as [GarmentZoneKey, (typeof GARMENT_ZONES)[GarmentZoneKey]][])
                  .filter(([, g]) => g.material === labelType)
                  .map(([key, g]) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => setGarmentZone(key)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        garmentZone === key
                          ? 'bg-[#11317B] text-white shadow-md shadow-[#11317B]/20'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700'
                      }`}
                    >
                      {g.label}
                    </motion.button>
                  ))}
              </div>
            )}

            {previewUrl && (
              <div className="mt-4 flex w-full items-center gap-3 px-1">
                <span className="whitespace-nowrap text-xs font-medium text-stone-600 transition-colors duration-300 dark:text-stone-400">
                  Ajustar tamaño
                </span>
                <ZoomSlider scale={designScale} />
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowMockup((v) => !v)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 transition-colors duration-200 hover:text-[#11317B] dark:text-stone-400 dark:hover:text-blue-300"
            >
              <Eye className="h-3.5 w-3.5" />
              {showMockup ? 'Volver al diseño' : '¿Quieres ver cómo se vería en una prenda?'}
            </button>

            <motion.button
              type="button"
              onClick={goToWhatsApp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group mt-5 flex w-full items-center justify-center gap-2 ${btnPrimaryClass}`}
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
