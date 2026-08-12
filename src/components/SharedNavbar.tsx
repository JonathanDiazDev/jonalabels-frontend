import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { WHATSAPP_NUMBER } from '../config/constants'
import { useScrollY } from '../hooks/useScrollY'

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Productos', to: '/productos' },
  { label: 'Diario', to: '/blog' },
  { label: 'Cotizar', to: '/cotizar' },
]

export default function SharedNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isDark, toggle } = useTheme()
  const { pathname } = useLocation()
  const scrolled = useScrollY(24)
  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !mobileOpen

  const linkClass = (to: string) => {
    const active = pathname === to
    if (transparent) {
      return active
        ? 'text-white font-semibold'
        : 'text-white/75 hover:text-white'
    }
    return active
      ? 'text-stone-900 font-semibold dark:text-stone-50'
      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        transparent
          ? 'border-transparent bg-transparent'
          : 'border-b border-stone-200/60 bg-white/85 shadow-sm backdrop-blur-xl dark:border-stone-800/60 dark:bg-stone-950/85'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={`font-display text-2xl tracking-tight transition-colors duration-300 ${
            transparent ? 'text-white' : 'text-stone-900 dark:text-stone-50'
          }`}
        >
          JonaLabels
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-300 ${linkClass(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggle}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
              transparent
                ? 'text-white/80 hover:bg-white/10'
                : 'text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              transparent
                ? 'bg-jona-orange text-white hover:bg-orange-500'
                : 'bg-jona-blue text-white hover:bg-[#0e2860]'
            }`}
          >
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
              transparent
                ? 'text-white/80 hover:bg-white/10'
                : 'text-stone-500 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
            }`}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ${
              transparent
                ? 'text-white hover:bg-white/10'
                : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200/50 bg-white/95 px-4 pb-4 pt-2 backdrop-blur-xl transition-colors duration-300 dark:border-stone-800/50 dark:bg-stone-950/95 md:hidden">
          <nav id="mobile-menu" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  pathname === link.to
                    ? 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-50'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-jona-orange px-5 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-500"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
