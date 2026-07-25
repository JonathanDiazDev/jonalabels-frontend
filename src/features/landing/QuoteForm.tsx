import { type FormEvent, useEffect, useState, useRef } from 'react'
import { apiUrl } from '../../api/http'
import { useQuote } from '../../context/QuoteContext'

interface IFormState {
  nombre: string
  whatsapp: string
  email: string
  cantidad: string
  medidas: string
}

const INITIAL_FORM: IFormState = {
  nombre: '',
  whatsapp: '',
  email: '',
  cantidad: '',
  medidas: '',
}

type FieldErrors = Partial<Record<keyof IFormState, string>>

const INPUT_CLASS =
  'w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-900 outline-none transition-colors duration-300 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 placeholder:text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-stone-300 dark:focus:ring-stone-300/10 dark:placeholder:text-stone-500'

const INPUT_ERROR = INPUT_CLASS.replace('border-stone-200', 'border-red-400')

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'ai', 'pdf']

function getFileValidationError(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !ALLOWED_FILE_EXTENSIONS.includes(extension)) {
    return 'Formato no permitido. Usa PNG, JPG, SVG, AI o PDF.'
  }
  if (file.size > MAX_FILE_SIZE_BYTES) return 'El archivo no puede superar 10 MB.'
  return null
}

export default function QuoteForm() {
  const { labelType, logoFile, setLogoFile } = useQuote()
  const [form, setForm] = useState<IFormState>(INITIAL_FORM)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [quantityError, setQuantityError] = useState('')
  const [fileError, setFileError] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (logoFile) setFile(logoFile)
  }, [logoFile])

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
      setFile(f)
      setLogoFile(f)
      setFileError('')
    } else if (validationError) {
      setFileError(validationError)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const validationError = getFileValidationError(f)
    if (validationError) {
      setFile(null)
      setFileError(validationError)
      return
    }
    setFile(f)
    setLogoFile(f)
    setFileError('')
  }

  const handleRemoveFile = () => {
    setFile(null)
    setLogoFile(null)
    setFileError('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setFile(null)
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

    try {
      const data = new FormData()
      data.append(
        'data',
        new Blob([JSON.stringify({ nombre: form.nombre, whatsapp: form.whatsapp, email: form.email || null, cantidad, medidas: form.medidas || null })], {
          type: 'application/json',
        }),
      )
      if (file) data.append('archivo', file)

      const res = await fetch(apiUrl('/cotizaciones'), { method: 'POST', body: data })

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

      setIsSuccess(true)
    } catch (err) {
      console.error('[QuoteForm] Error al enviar cotización:', err)
      setError('No pudimos enviar tu solicitud. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950 md:p-12">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-6 h-16 w-16 text-stone-900 transition-colors duration-300 dark:text-stone-100">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3 className="text-2xl font-bold text-stone-900 transition-colors duration-300 md:text-3xl dark:text-stone-100">
          ¡Solicitud enviada!
        </h3>
        <p className="mx-auto mt-4 max-w-md text-stone-600 transition-colors duration-300 dark:text-stone-400">
          En unos momentos le daremos seguimiento a su cotización y se la enviaremos cuando esté lista.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-8 cursor-pointer text-sm font-semibold text-stone-900 underline underline-offset-4 transition-opacity hover:opacity-70 dark:text-stone-100"
        >
          Nueva cotización
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-stone-200 bg-white p-8 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950 md:p-12"
      noValidate
    >
      {logoFile && (
        <p className="-mt-2 mb-4 text-center text-sm font-medium text-stone-500 transition-colors duration-300 dark:text-stone-400">
          Vista previa seleccionada: etiqueta {labelType === 'SATIN' ? 'de satín' : 'colgante'}.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="qnombre" className="mb-1.5 block text-sm font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Nombre Completo
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
          {fieldErrors.nombre && <p className="mt-1 text-xs text-red-500">{fieldErrors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="qwhatsapp" className="mb-1.5 block text-sm font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            WhatsApp <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 transition-colors duration-300 dark:text-stone-500">
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            <input
              id="qwhatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              onBlur={() => handleBlur('whatsapp')}
              className={`${fieldErrors.whatsapp ? INPUT_ERROR : INPUT_CLASS} pl-10`}
              placeholder="Ej. 55 1234 5678"
              disabled={isSubmitting}
            />
          </div>
          {fieldErrors.whatsapp && <p className="mt-1 text-xs text-red-500">{fieldErrors.whatsapp}</p>}
        </div>
        <div>
          <label htmlFor="qemail" className="mb-1.5 block text-sm font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
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
          {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="qcantidad" className="mb-1.5 block text-sm font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
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
            className={`${INPUT_CLASS} ${quantityError ? 'border-stone-900 ring-1 ring-stone-900/20' : ''}`}
            placeholder="Ej. 5000"
            disabled={isSubmitting}
          />
          {quantityError ? (
              <p className="mt-1 text-xs text-stone-600 transition-colors duration-300 dark:text-stone-400">{quantityError}</p>
          ) : (
            <span className="mt-1 block text-xs text-stone-400 transition-colors duration-300 dark:text-stone-500">Pedido mínimo: 5,000 piezas</span>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="qmedidas" className="mb-1.5 block text-sm font-medium text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Medidas deseadas
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
          {fieldErrors.medidas && <p className="mt-1 text-xs text-red-500">{fieldErrors.medidas}</p>}
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleFileDrop}
        onClick={() => !isSubmitting && fileRef.current?.click()}
        className={`col-span-full cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors duration-300 ${
          isSubmitting ? 'cursor-default opacity-60' : ''
        } ${
          dragging ? 'border-stone-900 bg-stone-100 dark:border-stone-300 dark:bg-stone-800' : 'border-stone-200 bg-stone-50 hover:border-stone-400 dark:border-stone-700 dark:bg-stone-900/40 dark:hover:border-stone-600'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.ai,.pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={isSubmitting}
        />
        {file ? (
          <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 shrink-0 text-stone-900 transition-colors duration-300 dark:text-stone-100">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="max-w-[200px] truncate text-sm font-medium text-stone-700 transition-colors duration-300 dark:text-stone-300">{file.name}</span>
            {!isSubmitting && (
              <button
                type="button"
                onClick={handleRemoveFile}
                className="ml-auto cursor-pointer rounded-full p-1 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 h-10 w-10 text-stone-400">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm font-medium text-stone-600 transition-colors duration-300 dark:text-stone-400">
              Arrastra tu logo aquí o haz clic para explorar
            </p>
            <p className="mt-1 text-xs text-stone-400 transition-colors duration-300 dark:text-stone-500">PNG, JPG, AI, PDF</p>
          </>
        )}
      </div>

      {fileError && <p className="text-center text-sm text-red-500" role="alert">{fileError}</p>}

      {error && (
        <p className="text-center text-sm text-red-500" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
      >
        <span className="flex items-center justify-center gap-3">
          {isSubmitting && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5 animate-spin">
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
            </svg>
          )}
          {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
        </span>
      </button>
    </form>
  )
}
