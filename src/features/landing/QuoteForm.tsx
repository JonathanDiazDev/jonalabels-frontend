import { type FormEvent, useState, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiFetch } from '../../api/http'
import { whatsAppUrl } from '../../config/constants'
import { useQuote } from '../../context/QuoteContext'

interface IFormState {
  nombre: string
  whatsapp: string
  email: string
  cantidad: string
  medidas: string
  tipoProducto: string
}

const INITIAL_FORM: IFormState = {
  nombre: '',
  whatsapp: '',
  email: '',
  cantidad: '',
  medidas: '',
  tipoProducto: '',
}

type FieldErrors = Partial<Record<keyof IFormState, string>>

const INPUT_CLASS =
  'w-full rounded-xl border border-stone-200/80 bg-white/60 px-3 py-2.5 text-sm text-stone-900 outline-none transition-colors duration-300 backdrop-blur-sm focus:border-stone-900 focus:ring-1 focus:ring-stone-900/10 placeholder:text-stone-400 dark:border-stone-700/80 dark:bg-stone-900/50 dark:text-stone-100 dark:focus:border-stone-300 dark:focus:ring-stone-300/10 dark:placeholder:text-stone-500'

const INPUT_ERROR = INPUT_CLASS.replace('border-stone-200', 'border-red-400')


const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'ai', 'eps', 'pdf']

function getFileValidationError(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !ALLOWED_FILE_EXTENSIONS.includes(extension)) {
    return 'Formato no permitido. Usa PNG, JPG, SVG, AI, EPS o PDF.'
  }
  if (file.size > MAX_FILE_SIZE_BYTES) return 'El archivo no puede superar 10 MB.'
  return null
}

export default function QuoteForm() {
  const { labelType, logoFile, setLogoFile } = useQuote()
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState<IFormState>(() => ({
    ...INITIAL_FORM,
    tipoProducto: searchParams.get('producto') || '',
  }))
  const [dragging, setDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [quantityError, setQuantityError] = useState('')
  const [fileError, setFileError] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const file = logoFile

  const updateField = (name: keyof IFormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) validateField(name, value)
  }

  const validateField = (name: keyof IFormState, value: string) => {
    const errs = { ...fieldErrors }
    delete errs[name]
    if (name === 'whatsapp' && value) {
      const phone = value.replace(/\D/g, '')
      if (!/^(?:52)?\d{10}$/.test(phone)) errs.whatsapp = 'Número no válido. Ej: 55 1234 5678'
    }
    if (name === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      errs.email = 'Correo no válido'
    }
    if (name === 'nombre' && !value.trim()) errs.nombre = 'El nombre es obligatorio'
    if (name === 'medidas' && !value.trim()) errs.medidas = 'Las medidas son obligatorias'
    setFieldErrors(errs)
  }

  const handleBlur = (name: keyof IFormState) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, form[name])
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    const validationError = f ? getFileValidationError(f) : null
    if (f && !validationError) {
      setLogoFile(f)
      setFileError('')
      if (fileRef.current) fileRef.current.value = ''
    } else if (validationError) {
      setFileError(validationError)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const validationError = getFileValidationError(f)
    if (validationError) {
      setFileError(validationError)
      if (fileRef.current) fileRef.current.value = ''
      return
    }
    setLogoFile(f)
    setFileError('')
  }

  const handleRemoveFile = () => {
    setLogoFile(null)
    setFileError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setLogoFile(null)
    setIsSuccess(false)
    setError('')
    setQuantityError('')
    setFileError('')
    setTouched({})
    setFieldErrors({})
    if (fileRef.current) fileRef.current.value = ''
  }

  const CANTIDAD_MIN = 5000

  const buildFormData = (): FormData => {
    const data = new FormData()
    data.append(
      'data',
      new Blob([JSON.stringify({ nombre: form.nombre, whatsapp: form.whatsapp, email: form.email || null, cantidad: Number(form.cantidad) || null, medidas: form.medidas || null, tipoProducto: form.tipoProducto || null })], {
        type: 'application/json',
      }),
    )
    if (file) data.append('archivo', file)
    return data
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setQuantityError('')

    const cantidad = Number(form.cantidad)
    if (!form.nombre.trim() || !form.whatsapp.trim() || !form.medidas.trim()) {
      setError('Completa tu nombre, WhatsApp y las medidas deseadas.')
      return
    }
    const telefono = form.whatsapp.replace(/\D/g, '')
    if (!/^(?:52)?\d{10}$/.test(telefono)) {
      setError('Ingresa un número de WhatsApp mexicano válido.')
      return
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    if (!cantidad || cantidad < CANTIDAD_MIN) {
      setQuantityError(`La cantidad mínima de producción es de ${CANTIDAD_MIN.toLocaleString()} piezas`)
      return
    }

    setIsSubmitting(true)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    try {
      const res = await apiFetch('/cotizaciones', { method: 'POST', body: buildFormData(), signal: controller.signal })

      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

      setIsSuccess(true)
    } catch (err) {
      console.error('[QuoteForm] Error al enviar cotización:', err)
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('El servidor está despertando. Por favor, intenta de nuevo en unos segundos.')
      } else {
        setError('No pudimos enviar tu solicitud. Verifica tu conexión e intenta de nuevo.')
      }
    } finally {
      clearTimeout(timeoutId)
      setIsSubmitting(false)
    }
  }

  const sendLeadToBackend = () => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    apiFetch('/cotizaciones', { method: 'POST', body: buildFormData(), signal: controller.signal })
      .catch(() => {})
      .finally(() => clearTimeout(timeoutId))
  }

  const handleWhatsAppClick = () => {
    if (!form.nombre.trim() || !form.whatsapp.trim()) {
      setError('Completa tu nombre y WhatsApp antes de contactarnos por WhatsApp.')
      return
    }
    const telefono = form.whatsapp.replace(/\D/g, '')
    if (!/^(?:52)?\d{10}$/.test(telefono)) {
      setError('Ingresa un número de WhatsApp mexicano válido.')
      return
    }
    setError('')

    sendLeadToBackend()

    const lines = [
      'Hola, me interesa cotizar.',
      '',
      `Nombre: ${form.nombre}`,
      `Producto: ${form.tipoProducto || 'No especificado'}`,
      `Cantidad: ${form.cantidad ? Number(form.cantidad).toLocaleString() + ' piezas' : 'No especificada'}`,
      `Medidas: ${form.medidas || 'No especificadas'}`,
    ]
    if (form.email) lines.push(`Email: ${form.email}`)
    lines.push('', 'Quedo al pendiente de su respuesta. Gracias.')

    const text = lines.join('\n')
    window.open(whatsAppUrl(text), '_blank')
  }

  if (isSuccess) {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white/60 p-6 text-center shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 backdrop-blur-sm dark:bg-stone-900/60 dark:ring-white/5 md:p-8">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-4 h-12 w-12 text-stone-900 transition-colors duration-300 dark:text-stone-100">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="text-xl font-bold text-stone-900 transition-colors duration-300 dark:text-stone-100">
          ¡Solicitud enviada!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-stone-600 transition-colors duration-300 dark:text-stone-400">
          En unos momentos te daremos seguimiento a tu cotización.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-5 cursor-pointer text-sm font-semibold text-stone-900 underline underline-offset-4 transition-opacity hover:opacity-70 dark:text-stone-100"
        >
          Nueva cotización
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-4 rounded-2xl bg-white/60 p-5 shadow-lg shadow-stone-900/5 ring-1 ring-stone-900/5 backdrop-blur-sm dark:bg-stone-900/60 dark:ring-white/5 sm:p-6"
      noValidate
    >
      {logoFile && (
        <p className="text-center text-xs font-medium text-stone-500 transition-colors duration-300 dark:text-stone-400">
          Vista previa: etiqueta {labelType === 'SATIN' ? 'de satín' : 'colgante'}.
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="qtipoProducto" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Tipo de Producto
          </label>
          <input
            id="qtipoProducto"
            type="text"
            readOnly={!!form.tipoProducto}
            value={form.tipoProducto}
            onChange={(e) => updateField('tipoProducto', e.target.value)}
            className={`${INPUT_CLASS} ${form.tipoProducto ? 'cursor-default font-medium' : ''}`}
            placeholder="Ej: Etiquetas de Satín Premium"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="qnombre" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Nombre Completo <span className="text-red-400">*</span>
          </label>
          <input
            id="qnombre"
            type="text"
            required
            value={form.nombre}
            onChange={(e) => updateField('nombre', e.target.value)}
            onBlur={() => handleBlur('nombre')}
            className={fieldErrors.nombre ? INPUT_ERROR : INPUT_CLASS}
            placeholder="Nombre del cliente o marca"
            disabled={isSubmitting}
          />
          {fieldErrors.nombre && <p className="mt-0.5 text-[11px] text-red-500">{fieldErrors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="qwhatsapp" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            WhatsApp <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <input
              id="qwhatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              onBlur={() => handleBlur('whatsapp')}
              className={`${fieldErrors.whatsapp ? INPUT_ERROR : INPUT_CLASS} pl-9`}
              placeholder="55 1234 5678"
              disabled={isSubmitting}
            />
          </div>
          {fieldErrors.whatsapp && <p className="mt-0.5 text-[11px] text-red-500">{fieldErrors.whatsapp}</p>}
        </div>
        <div>
          <label htmlFor="qemail" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Correo Electrónico <span className="font-normal text-stone-400">(Opcional)</span>
          </label>
          <input
            id="qemail"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={fieldErrors.email ? INPUT_ERROR : INPUT_CLASS}
            placeholder="ejemplo@correo.com"
            disabled={isSubmitting}
          />
          {fieldErrors.email && <p className="mt-0.5 text-[11px] text-red-500">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="qcantidad" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Cantidad <span className="text-red-400">*</span>
          </label>
          <input
            id="qcantidad"
            type="number"
            min={CANTIDAD_MIN}
            value={form.cantidad}
            onChange={(e) => {
              updateField('cantidad', e.target.value)
              if (quantityError) setQuantityError('')
            }}
            className={`${INPUT_CLASS} ${quantityError ? INPUT_ERROR : ''}`}
            placeholder="Mínimo 5,000"
            disabled={isSubmitting}
          />
          {quantityError && <p className="mt-0.5 text-[11px] text-red-500" role="alert">{quantityError}</p>}
        </div>
        <div>
          <label htmlFor="qmedidas" className="mb-1 block text-xs font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Medidas <span className="text-red-400">*</span>
          </label>
          <input
            id="qmedidas"
            type="text"
            required
            value={form.medidas}
            onChange={(e) => updateField('medidas', e.target.value)}
            onBlur={() => handleBlur('medidas')}
            className={fieldErrors.medidas ? INPUT_ERROR : INPUT_CLASS}
            placeholder="Ej: 5cm x 3cm"
            disabled={isSubmitting}
          />
          {fieldErrors.medidas && <p className="mt-0.5 text-[11px] text-red-500">{fieldErrors.medidas}</p>}
        </div>
      </div>

      <label
        htmlFor="quote-logo-file"
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}
        className={`block cursor-pointer rounded-xl border-2 border-dashed px-4 py-4 text-center transition-colors duration-300 focus-within:border-stone-900 focus-within:ring-1 focus-within:ring-stone-900/20 dark:focus-within:border-stone-300 ${
          isSubmitting ? 'cursor-default opacity-60' : ''
        } ${
          dragging ? 'border-stone-900 bg-stone-100 dark:border-stone-300 dark:bg-stone-800' : 'border-stone-200 bg-stone-50 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900/40 dark:hover:border-stone-600'
        }`}
      >
        <input
          ref={fileRef}
          id="quote-logo-file"
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.ai,.eps,.pdf"
          onChange={handleFileChange}
          disabled={isSubmitting}
          className="sr-only"
        />
        {file ? (
          <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 shrink-0 text-stone-900 transition-colors duration-300 dark:text-stone-100">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="max-w-[180px] truncate text-xs font-medium text-stone-700 transition-colors duration-300 dark:text-stone-300">{file.name}</span>
            {!isSubmitting && (
              <button
                type="button"
                onClick={handleRemoveFile}
                aria-label="Quitar archivo"
                className="ml-auto cursor-pointer rounded-full p-0.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-stone-500 transition-colors duration-300 dark:text-stone-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-xs font-medium">Logo o diseño</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500">(PNG, JPG, AI, EPS, PDF — máx. 10 MB)</span>
          </div>
        )}
      </label>

      {fileError && <p className="text-center text-xs text-red-500" role="alert">{fileError}</p>}

      {error && (
        <p className="text-center text-xs text-red-500" role="alert">{error}</p>
      )}

      <div className="flex flex-col gap-2.5">
        <p className="text-center text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
          Al enviar aceptas nuestro{' '}
          <Link to="/privacidad" className="font-medium text-stone-700 underline underline-offset-2 dark:text-stone-300">
            aviso de privacidad
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 animate-spin">
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
              </svg>
            )}
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud web'}
          </span>
        </button>
        <button
          type="button"
          onClick={handleWhatsAppClick}
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-full border border-[#25D366]/50 bg-[#25D366]/5 px-6 py-3 text-sm font-semibold text-[#1eb457] transition-all duration-300 hover:bg-[#25D366]/15 disabled:cursor-not-allowed disabled:opacity-70 dark:border-[#25D366]/40 dark:text-[#25D366]"
        >
          <span className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar por WhatsApp
          </span>
        </button>
        <p className="text-center text-[11px] text-stone-400 transition-colors duration-300 dark:text-stone-500">
          ¿Prefieres respuesta inmediata? Escríbenos por WhatsApp.
        </p>
      </div>
    </form>
  )
}
