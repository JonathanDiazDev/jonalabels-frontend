import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, LogOut, Search, Users, Package, Sparkles } from 'lucide-react'
import { apiFetch } from '../../api/http'

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

const metricCards = [
  { key: 'totalProspectos' as const, label: 'Total de prospectos', icon: Users, accent: 'text-stone-900 dark:text-white' },
  { key: 'totalPiezasSolicitadas' as const, label: 'Piezas en pipeline', icon: Package, accent: 'text-jona-orange' },
  { key: 'prospectosNuevos' as const, label: 'Por atender', icon: Sparkles, accent: 'text-jona-blue' },
]

function Badge({ estado }: { estado: Estado }) {
  const s = BADGE[estado]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

function LoadingSkeleton() {
  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
            <div className="h-10 w-64 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded-xl bg-stone-200 dark:bg-stone-800" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-panel h-32 animate-pulse rounded-2xl" />
          ))}
        </div>
        <div className="glass-panel h-96 animate-pulse rounded-2xl" />
      </div>
    </section>
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

    apiFetch(`${API_BASE}?${params}`)
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
    apiFetch(`${API_BASE}/metricas`)
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
      const res = await apiFetch(`${API_BASE}/exportar?${params}`)
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
      const res = await apiFetch(`${API_BASE}/${id}/estado?estado=${nuevoEstado}`, { method: 'PATCH' })
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
      await apiFetch('/auth/logout', { method: 'POST' })
    } finally {
      navigate('/login', { replace: true })
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="section-eyebrow mb-2 text-jona-orange">Panel admin</p>
            <h1 className="font-display text-3xl tracking-tight text-stone-900 md:text-4xl dark:text-stone-100">
              Cotizaciones
            </h1>
            <p className="mt-2 text-stone-500 dark:text-stone-400">
              {totalElementos} prospecto{totalElementos !== 1 && 's'}
              {totalPaginas > 1 && ` — Página ${paginaActual + 1} de ${totalPaginas}`}
            </p>
          </div>
          <motion.button
            type="button"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary inline-flex items-center gap-2 self-start border-stone-300 text-stone-700 dark:border-stone-600 dark:text-stone-200"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {metricas && (
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {metricCards.map(({ key, label, icon: Icon, accent }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="glass-panel group rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {label}
                  </p>
                  <div className="rounded-lg bg-stone-100 p-2 text-stone-500 transition-colors group-hover:bg-jona-blue/10 group-hover:text-jona-blue dark:bg-stone-800 dark:group-hover:bg-jona-blue/20">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <motion.p
                  key={metricas[key]}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-3xl font-bold tabular-nums ${accent}`}
                >
                  {metricas[key].toLocaleString()}
                </motion.p>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar cliente o WhatsApp..."
              className="w-full rounded-xl border border-stone-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-stone-900 outline-none backdrop-blur-sm transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 placeholder:text-stone-400 dark:border-stone-700 dark:bg-stone-900/70 dark:text-white dark:placeholder:text-stone-500"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="cursor-pointer rounded-xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 outline-none backdrop-blur-sm transition focus:border-jona-blue focus:ring-2 focus:ring-jona-blue/20 dark:border-stone-700 dark:bg-stone-900/70 dark:text-white sm:w-44"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="NUEVO">Nuevos</option>
            <option value="CONTACTADO">Contactados</option>
            <option value="COTIZADO">Cotizados</option>
            <option value="CERRADO">Cerrados</option>
          </select>
          <motion.button
            onClick={handleExportar}
            disabled={isExporting}
            whileHover={{ scale: isExporting ? 1 : 1.02 }}
            whileTap={{ scale: isExporting ? 1 : 0.98 }}
            className="btn-secondary inline-flex items-center justify-center gap-2 border-jona-blue text-jona-blue hover:bg-jona-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exportando…' : 'Exportar CSV'}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="glass-panel overflow-hidden rounded-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200/80 dark:border-stone-700/80">
                <tr className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
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
                <AnimatePresence mode="popLayout">
                  {cotizaciones.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      className="transition-colors hover:bg-stone-50/80 dark:hover:bg-stone-800/40"
                    >
                      <td className="whitespace-nowrap px-5 py-4 text-stone-600 dark:text-stone-400">
                        {formatearFecha(c.fechaCreacion)}
                      </td>
                      <td className="px-5 py-4 font-medium text-stone-900 dark:text-white">
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
                      <td className="whitespace-nowrap px-5 py-4 text-right font-medium tabular-nums text-stone-900 dark:text-white">
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
                            className="inline-flex items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-100 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
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
                            className="cursor-pointer rounded-lg border border-stone-200 bg-white/80 px-2 py-1 text-xs font-medium text-stone-600 outline-none transition focus:border-jona-blue disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300"
                          >
                            {ESTADOS.map((est) => (
                              <option key={est} value={est}>
                                {BADGE[est].label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {totalElementos === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center text-stone-400 dark:text-stone-500">
                      {busquedaDebounced || filtroEstado !== 'TODOS'
                        ? 'No se encontraron cotizaciones con esos filtros.'
                        : 'No hay cotizaciones registradas.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {totalPaginas > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => setPaginaActual((p) => Math.max(0, p - 1))}
              disabled={paginaActual === 0}
              whileHover={{ scale: paginaActual === 0 ? 1 : 1.02 }}
              whileTap={{ scale: paginaActual === 0 ? 1 : 0.98 }}
              className="btn-secondary border-stone-300 text-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-600 dark:text-stone-200"
            >
              &larr; Anterior
            </motion.button>
            <span className="text-sm tabular-nums text-stone-500 dark:text-stone-400">
              {paginaActual + 1} / {totalPaginas}
            </span>
            <motion.button
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas - 1, p + 1))}
              disabled={paginaActual >= totalPaginas - 1}
              whileHover={{ scale: paginaActual >= totalPaginas - 1 ? 1 : 1.02 }}
              whileTap={{ scale: paginaActual >= totalPaginas - 1 ? 1 : 0.98 }}
              className="btn-secondary border-stone-300 text-stone-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-600 dark:text-stone-200"
            >
              Siguiente &rarr;
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
