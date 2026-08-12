import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiFetchAdmin } from '../../api/http'
import { GlassCard, SectionEyebrow } from '../../components/editorial'

type Estado = 'NUEVO' | 'CONTACTADO' | 'COTIZADO' | 'CERRADO'

interface Cotizacion {
  id: number
  nombre: string
  whatsapp: string
  email: string | null
  cantidad: number
  medidas: string | null
  fechaCreacion: string
  estado: Estado
  urlDiseno: string | null
}

interface PageResponse {
  content: Cotizacion[]
  totalPages: number
  totalElements: number
  number: number
}

interface MetricasDashboard {
  totalProspectos: number
  totalPiezasSolicitadas: number
  prospectosNuevos: number
}

const API_BASE = '/cotizaciones'

const ESTADOS: Estado[] = ['NUEVO', 'CONTACTADO', 'COTIZADO', 'CERRADO']

const BADGE: Record<Estado, { label: string; bg: string; text: string; dot: string }> = {
  NUEVO: { label: 'Nuevo', bg: 'bg-jona-orange/10', text: 'text-jona-orange', dot: 'bg-jona-orange' },
  CONTACTADO: { label: 'Contactado', bg: 'bg-jona-blue/10', text: 'text-jona-blue', dot: 'bg-jona-blue' },
  COTIZADO: { label: 'Cotizado', bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
  CERRADO: { label: 'Cerrado', bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
}

function Badge({ estado }: { estado: Estado }) {
  const s = BADGE[estado]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState(() => searchParams.get('busqueda') ?? '')
  const [filtroEstado, setFiltroEstado] = useState(() => searchParams.get('estado') ?? 'TODOS')
  const [paginaActual, setPaginaActual] = useState(() => Number(searchParams.get('pagina') ?? '0'))
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [totalElementos, setTotalElementos] = useState(0)

  const [metricas, setMetricas] = useState<MetricasDashboard | null>(null)
  const [busquedaDebounced, setBusquedaDebounced] = useState(() => searchParams.get('busqueda') ?? '')
  const [error, setError] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(() => new Set())

  useEffect(() => {
    const timer = setTimeout(() => setBusquedaDebounced(busqueda), 500)
    return () => clearTimeout(timer)
  }, [busqueda])

  useEffect(() => {
    setPaginaActual(0)
  }, [busquedaDebounced, filtroEstado])

  useEffect(() => {
    const params = new URLSearchParams()
    if (busquedaDebounced) params.set('busqueda', busquedaDebounced)
    if (filtroEstado !== 'TODOS') params.set('estado', filtroEstado)
    if (paginaActual > 0) params.set('pagina', String(paginaActual))
    setSearchParams(params, { replace: true })
  }, [busquedaDebounced, filtroEstado, paginaActual, setSearchParams])

  const fetchCotizaciones = useCallback(() => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams()
    params.set('page', String(paginaActual))
    params.set('size', '10')
    if (busquedaDebounced) params.set('busqueda', busquedaDebounced)
    if (filtroEstado !== 'TODOS') params.set('estado', filtroEstado)

    apiFetchAdmin(`${API_BASE}?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('No fue posible cargar las cotizaciones.')
        return res.json()
      })
      .then((data: PageResponse) => {
        setCotizaciones(data.content)
        setTotalPaginas(data.totalPages)
        setTotalElementos(data.totalElements)
        setLoading(false)
      })
      .catch(() => {
        setError('No fue posible cargar las cotizaciones. Intenta actualizar la página.')
        setLoading(false)
      })
  }, [paginaActual, busquedaDebounced, filtroEstado])

  useEffect(() => {
    fetchCotizaciones()
  }, [fetchCotizaciones])

  useEffect(() => {
    apiFetchAdmin(`${API_BASE}/metricas`)
      .then((res) => {
        if (!res.ok) throw new Error('No fue posible cargar las métricas.')
        return res.json()
      })
      .then(setMetricas)
      .catch(() => {})
  }, [])

function generarEnlaceWhatsApp(telefono: string, nombre: string) {
  const tel = telefono.replace(/\D/g, '')
  const msg = `Hola ${nombre}, soy de Jona Labels. Recibimos tu solicitud de cotización y ya estamos evaluando los detalles para coordinar la producción de tus etiquetas (recordando que el pedido mínimo es de 5,000 piezas). ¿Tienes un momento para revisar la cotización?`
  return `https://wa.me/${tel}?text=${encodeURIComponent(msg)}`
}

const formatearFecha = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleExportar = async () => {
    setIsExporting(true)
    setError('')
    const params = new URLSearchParams()
    if (busquedaDebounced) params.set('busqueda', busquedaDebounced)
    if (filtroEstado !== 'TODOS') params.set('estado', filtroEstado)

    try {
      const res = await apiFetchAdmin(`${API_BASE}/exportar?${params}`)
      if (!res.ok) throw new Error('No fue posible exportar los prospectos.')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'prospectos_jonalabels.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch {
      setError('No fue posible exportar el CSV. Inténtalo de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }

  const cambiarEstado = async (id: number, nuevoEstado: Estado) => {
    const previas = cotizaciones
    setError('')
    setUpdatingIds((prev) => new Set(prev).add(id))
    setCotizaciones((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c)),
    )

    try {
      const res = await apiFetchAdmin(`${API_BASE}/${id}/estado?estado=${nuevoEstado}`, { method: 'PATCH' })
      if (!res.ok) throw new Error('No fue posible actualizar el estado.')
    } catch {
      setCotizaciones(previas)
      setError('No fue posible actualizar el estado. Inténtalo de nuevo.')
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  const handleLogout = async () => {
    try {
      await apiFetchAdmin('/auth/logout', { method: 'POST' })
    } finally {
      navigate('/login', { replace: true })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-jona-blue border-t-transparent" />
      </div>
    )
  }

  return (
    <section className="relative z-10 py-24 pt-32 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <SectionEyebrow>Admin</SectionEyebrow>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              Cotizaciones
            </h1>
            <p className="text-stone-500 dark:text-stone-400">
              {totalElementos} prospecto{totalElementos !== 1 && 's'}
              {totalPaginas > 1 && ` — Página ${paginaActual + 1} de ${totalPaginas}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="self-start rounded-xl border border-stone-200/80 bg-white/60 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur-sm transition hover:bg-white/80 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:bg-stone-900/80"
          >
            Cerrar sesión
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {metricas && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Total de Prospectos
              </p>
              <p className="mt-2 text-3xl font-bold text-stone-900 dark:text-stone-100">
                {metricas.totalProspectos.toLocaleString()}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Total de Piezas (Pipeline)
              </p>
              <p className="mt-2 text-3xl font-bold text-jona-orange">
                {metricas.totalPiezasSolicitadas.toLocaleString()}
              </p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                Prospectos por Atender
              </p>
              <p className="mt-2 text-3xl font-bold text-jona-blue">
                {metricas.prospectosNuevos.toLocaleString()}
              </p>
            </GlassCard>
          </div>
        )}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cliente o WhatsApp..."
            className="w-full rounded-xl border border-stone-200/80 bg-white/60 px-4 py-3 text-sm text-stone-900 outline-none backdrop-blur-sm transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 placeholder:text-stone-400 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-500 sm:w-72"
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-stone-200/80 bg-white/60 px-4 py-3 text-sm text-stone-900 outline-none backdrop-blur-sm transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-100 sm:w-44"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="NUEVO">Nuevos</option>
            <option value="CONTACTADO">Contactados</option>
            <option value="COTIZADO">Cotizados</option>
            <option value="CERRADO">Cerrados</option>
          </select>
          <button
            onClick={handleExportar}
            disabled={isExporting}
            className="rounded-xl border border-jona-blue px-5 py-3 text-sm font-semibold text-jona-blue transition hover:bg-jona-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isExporting ? 'Exportando…' : 'Exportar CSV'}
          </button>
        </div>

        <GlassCard padding="p-0" className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200/80 dark:border-stone-700/80">
              <tr className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">
                <th className="px-5 py-4">Fecha</th>
                <th className="px-5 py-4">Cliente</th>
                <th className="px-5 py-4">WhatsApp</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4 text-right">Cantidad</th>
                <th className="px-5 py-4">Medidas</th>
                <th className="px-5 py-4">Diseño</th>
                <th className="px-5 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
              {cotizaciones.map((c) => (
                <tr
                  key={c.id}
                  className="transition-colors hover:bg-white/40 dark:hover:bg-stone-800/30"
                >
                  <td className="px-5 py-4 whitespace-nowrap text-stone-600 dark:text-stone-400">
                    {formatearFecha(c.fechaCreacion)}
                  </td>
                  <td className="px-5 py-4 font-medium text-stone-900 dark:text-stone-100">
                    {c.nombre}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-700 dark:text-stone-300">{c.whatsapp}</span>
                      <a
                        href={generarEnlaceWhatsApp(c.whatsapp, c.nombre)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => cambiarEstado(c.id, 'CONTACTADO')}
                        className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-[#1DA851]"
                      >
                        Contactar
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-stone-600 dark:text-stone-400">
                    {c.email ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {c.cantidad.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-stone-600 dark:text-stone-400">
                    {c.medidas ?? '—'}
                  </td>
                  <td className="px-5 py-4">
                    {c.urlDiseno ? (
                      <a
                        href={c.urlDiseno}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-stone-200/80 px-2.5 py-1 text-xs font-medium text-stone-600 transition hover:bg-white/60 dark:border-stone-700/80 dark:text-stone-400 dark:hover:bg-stone-800/60"
                      >
                        Ver diseño
                      </a>
                    ) : (
                      <span className="text-stone-400 dark:text-stone-500">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Badge estado={c.estado} />
                      <select
                        value={c.estado}
                        onChange={(e) => cambiarEstado(c.id, e.target.value as Estado)}
                        disabled={updatingIds.has(c.id)}
                        className="cursor-pointer rounded-lg border border-stone-200/80 bg-white/60 px-2 py-1 text-xs font-medium text-stone-600 outline-none transition focus:border-jona-blue dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-300"
                      >
                        {ESTADOS.map((est) => (
                          <option key={est} value={est}>
                            {BADGE[est].label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {totalElementos === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-stone-400 dark:text-stone-500">
                    {busquedaDebounced || filtroEstado !== 'TODOS'
                      ? 'No se encontraron cotizaciones con esos filtros.'
                      : 'No hay cotizaciones registradas.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </GlassCard>

        {totalPaginas > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setPaginaActual((p) => Math.max(0, p - 1))}
              disabled={paginaActual === 0}
              className="rounded-xl border border-stone-200/80 bg-white/60 px-5 py-2.5 text-sm font-medium text-stone-700 backdrop-blur-sm transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:bg-stone-900/80"
            >
              &larr; Anterior
            </button>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              {paginaActual + 1} / {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas - 1, p + 1))}
              disabled={paginaActual >= totalPaginas - 1}
              className="rounded-xl border border-stone-200/80 bg-white/60 px-5 py-2.5 text-sm font-medium text-stone-700 backdrop-blur-sm transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700/80 dark:bg-stone-900/60 dark:text-stone-300 dark:hover:bg-stone-900/80"
            >
              Siguiente &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
