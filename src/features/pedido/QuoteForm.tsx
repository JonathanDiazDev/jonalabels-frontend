import { type FormEvent, useState } from 'react'
import { crearPedido, getProductoIdByMaterial } from './pedidoService'
import type { IPedidoResponse } from './pedidoService'

type MaterialTipo = 'SATEN' | 'DAMASCO' | 'ALGODON'

interface IQuoteFormState {
  tipoMaterial: MaterialTipo | ''
  ancho: string
  alto: string
  cantidad: string
}

interface ISubmitState {
  loading: boolean
  error: string | null
  success: boolean
  pedido: IPedidoResponse | null
}

const INITIAL_FORM: IQuoteFormState = {
  tipoMaterial: '',
  ancho: '',
  alto: '',
  cantidad: '',
}

const INITIAL_SUBMIT: ISubmitState = {
  loading: false,
  error: null,
  success: false,
  pedido: null,
}

const INPUT_CLASS =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white'

const LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700 dark:text-brand-blue'

const MATERIAL_OPTIONS: { value: MaterialTipo; label: string }[] = [
  { value: 'SATEN', label: 'Satén' },
  { value: 'DAMASCO', label: 'Damasco' },
  { value: 'ALGODON', label: 'Algodón' },
]

export default function QuoteForm() {
  const [form, setForm] = useState<IQuoteFormState>(INITIAL_FORM)
  const [file, setFile] = useState<File | null>(null)
  const [submit, setSubmit] = useState<ISubmitState>(INITIAL_SUBMIT)

  const updateField = (name: keyof IQuoteFormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const validate = (): string | null => {
    if (!form.tipoMaterial) return 'Selecciona un tipo de material'
    if (!form.ancho || Number(form.ancho) <= 0) return 'Indica un ancho válido'
    if (!form.alto || Number(form.alto) <= 0) return 'Indica un alto válido'
    if (!form.cantidad || Number(form.cantidad) <= 0) return 'Indica una cantidad válida'
    if (!file) return 'Sube el archivo de tu diseño o logo'
    return null
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setFile(null)
    setSubmit(INITIAL_SUBMIT)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmit(INITIAL_SUBMIT)

    const errorMsg = validate()
    if (errorMsg) {
      setSubmit({ loading: false, error: errorMsg, success: false, pedido: null })
      return
    }

    const formData = new FormData()
    formData.append('archivo', file!)
    formData.append('tipoMaterial', form.tipoMaterial)
    formData.append('ancho', form.ancho)
    formData.append('alto', form.alto)
    formData.append('cantidad', form.cantidad)
    formData.append('usuarioId', '1')
    formData.append('productoId', String(getProductoIdByMaterial(form.tipoMaterial as MaterialTipo)))
    formData.append('disenoId', '1')

    setSubmit({ loading: true, error: null, success: false, pedido: null })

    try {
      const pedido = await crearPedido(formData)
      setSubmit({ loading: false, error: null, success: true, pedido })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado'
      setSubmit({ loading: false, error: message, success: false, pedido: null })
    }
  }

  if (submit.success && submit.pedido) {
    return (
      <section className="mx-auto max-w-lg px-4 py-16 text-center" aria-label="Pedido creado exitosamente">
        <div className="mb-4 text-5xl">✓</div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-brand-blue">Solicitud enviada</h2>
        <p className="mb-6 text-slate-600 dark:text-brand-blue/70">
          Tu pedido <span className="font-semibold">#{submit.pedido.id}</span> está en
          revisión. Te contactaremos pronto.
        </p>
        <button
          onClick={resetForm}
          className="cursor-pointer rounded-lg bg-brand-orange px-8 py-3 font-semibold text-white shadow-lg shadow-brand-orange/30 transition hover:scale-105 active:scale-95"
        >
          Nueva cotización
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-12" aria-label="Formulario de cotización">
      <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-brand-blue">Cotiza tus etiquetas</h2>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="tipoMaterial" className={LABEL_CLASS}>
            Tipo de material
          </label>
          <select
            id="tipoMaterial"
            value={form.tipoMaterial}
            onChange={(e) => updateField('tipoMaterial', e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">Selecciona un material</option>
            {MATERIAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ancho" className={LABEL_CLASS}>
              Ancho (cm)
            </label>
            <input
              id="ancho"
              type="number"
              min={1}
              step={0.1}
              value={form.ancho}
              onChange={(e) => updateField('ancho', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Ej: 5"
            />
          </div>
          <div>
            <label htmlFor="alto" className={LABEL_CLASS}>
              Alto (cm)
            </label>
            <input
              id="alto"
              type="number"
              min={1}
              step={0.1}
              value={form.alto}
              onChange={(e) => updateField('alto', e.target.value)}
              className={INPUT_CLASS}
              placeholder="Ej: 3"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cantidad" className={LABEL_CLASS}>
            Cantidad
          </label>
          <input
            id="cantidad"
            type="number"
            min={1}
            value={form.cantidad}
            onChange={(e) => updateField('cantidad', e.target.value)}
            className={INPUT_CLASS}
            placeholder="Ej: 500"
          />
        </div>

        <div>
          <label htmlFor="archivo" className={LABEL_CLASS}>
            Logo o diseño
          </label>
          <input
            id="archivo"
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className={`${INPUT_CLASS} file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-orange/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-orange hover:file:bg-brand-orange/20`}
          />
          {file && (
            <p className="mt-1.5 text-xs text-brand-blue/60">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>

        {submit.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submit.error}
          </div>
        )}

        <button
          type="submit"
          disabled={submit.loading}
          className="w-full cursor-pointer rounded-xl bg-orange-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submit.loading ? 'Procesando...' : 'Enviar cotización'}
        </button>
      </form>
    </section>
  )
}
