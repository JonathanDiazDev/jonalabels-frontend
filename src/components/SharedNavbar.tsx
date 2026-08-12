import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { WHATSAPP_NUMBER } from '../config/constants'

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Productos', to: '/productos' },
  { label: 'Visualizador', to: '/visualizar' },
  { label: 'Diario', to: '/blog' },
  { label: 'Cotizar', to: '/cotizar' },
]

function isActivePath(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

const linkClass = (active: boolean) =>
  active
    ? 'text-sm font-semibold text-stone-900 dark:text-stone-100'
    : 'text-sm font-medium text-stone-600 transition-colors duration-300 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'

const mobileLinkClass = (active: boolean) =>
  active
    ? 'rounded-lg bg-stone-100 px-3 py-2.5 text-sm font-semibold text-stone-900 dark:bg-stone-800 dark:text-stone-100'
    : 'rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition-colors duration-300 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100'

export default function SharedNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggle } = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-stone-200/50 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-stone-800/50 dark:bg-stone-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo-impresion.svg"
            alt=""
            className="h-8 w-8 dark:invert"
          />
          <span className="text-lg font-bold tracking-tight text-stone-900 transition-colors duration-300 dark:text-stone-100">
            Jona Labels
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={linkClass(active)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors duration-300 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors duration-300 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition-colors duration-300 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200/50 bg-white/95 px-4 pb-4 pt-2 backdrop-blur-md transition-colors duration-300 dark:border-stone-800/50 dark:bg-stone-950/95 md:hidden">
          <nav id="mobile-menu" className="flex flex-col gap-1" aria-label="Principal móvil">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.to)
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={mobileLinkClass(active)}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full border border-stone-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
