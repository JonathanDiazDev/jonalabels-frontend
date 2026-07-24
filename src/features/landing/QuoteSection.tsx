import { type FormEvent, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-gray-400 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20 dark:placeholder:text-gray-500'

const INPUT_ERROR = INPUT_CLASS.replace('border-gray-200', 'border-red-400').replace('dark:border-slate-600', 'dark:border-red-500')

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

export default function QuoteSection() {
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
      console.error('[QuoteSection] Error al enviar cotización:', err)
      setError('No pudimos enviar tu solicitud. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="quote-form" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
              Materialicemos tu visión.
            </h2>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto dark:text-white/60">
              Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas.
            </p>
          </div>

          {logoFile && (
            <p className="-mt-8 mb-8 text-center text-sm font-medium text-jona-orange">
              Vista previa seleccionada: etiqueta {labelType === 'SATIN' ? 'de satín' : 'colgante'}.
            </p>
          )}

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                 className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center dark:bg-slate-800 dark:border dark:border-slate-700"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-16 h-16 mx-auto mb-6 text-jona-orange">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3 className="text-2xl md:text-3xl font-bold text-jona-blue dark:text-white">
                  ¡Solicitud enviada!
                </h3>
                <p className="mt-4 text-jona-blue/70 max-w-md mx-auto dark:text-white/70">
                  En unos momentos le daremos seguimiento a su cotización y se la enviaremos cuando esté lista.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 cursor-pointer text-sm font-semibold text-jona-blue underline underline-offset-4 transition-opacity hover:opacity-70 dark:text-white"
                >
                  Nueva cotización
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6 dark:bg-slate-800 dark:border dark:border-slate-700"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="qnombre" className="block mb-1.5 text-sm font-medium text-jona-blue dark:text-white">
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
                    <label htmlFor="qwhatsapp" className="block mb-1.5 text-sm font-medium text-jona-blue dark:text-white">
                      WhatsApp <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500">
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
                    <label htmlFor="qemail" className="block mb-1.5 text-sm font-medium text-jona-blue dark:text-white">
                      Correo Electrónico <span className="text-gray-400 font-normal">(Opcional)</span>
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
                    <label htmlFor="qcantidad" className="block mb-1.5 text-sm font-medium text-jona-blue dark:text-white">
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
                      className={`${INPUT_CLASS} ${quantityError ? 'border-jona-orange ring-1 ring-jona-orange/30' : ''}`}
                      placeholder="Ej. 5000"
                      disabled={isSubmitting}
                    />
                    {quantityError ? (
                      <p className="mt-1 text-xs text-jona-orange">{quantityError}</p>
                    ) : (
                      <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">Pedido mínimo: 5,000 piezas</span>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="qmedidas" className="block mb-1.5 text-sm font-medium text-jona-blue dark:text-white">
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
                  className={`col-span-full rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
                    isSubmitting ? 'cursor-default opacity-60' : 'cursor-pointer'
                  } ${
                    dragging ? 'border-jona-orange bg-jona-orange/5' : 'border-gray-300 bg-gray-50 hover:border-jona-orange dark:border-slate-600 dark:bg-slate-700/50'
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-jona-blue shrink-0">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[200px] dark:text-gray-300">{file.name}</span>
                      {!isSubmitting && (
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="ml-auto cursor-pointer rounded-full p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Arrastra tu logo aquí o haz clic para explorar
                      </p>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">PNG, JPG, AI, PDF</p>
                    </>
                  )}
                </div>

                {fileError && <p className="text-center text-sm text-red-500" role="alert">{fileError}</p>}

                {error && (
                  <p className="text-sm text-red-500 text-center" role="alert">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  className="w-full cursor-pointer rounded-xl bg-orange-500 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-orange-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-70 hover:bg-orange-600"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 animate-spin">
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
                      </svg>
                    )}
                    {isSubmitting ? 'Enviando...' : 'Solicitar Cotización'}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
