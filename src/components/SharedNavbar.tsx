import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

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

  return (
    <header className="fixed top-0 z-50 w-full border-b border-stone-200 bg-white/90 backdrop-blur-md transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link to="/" className="text-xl font-bold tracking-tight text-stone-900 transition-colors duration-300 dark:text-stone-100">
          JonaLabels
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-stone-600 transition-colors duration-300 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
            >
              {link.label}
            </Link>
          ))}
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
            href="https://wa.me/523339472657"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition-colors duration-300 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-white px-4 pb-4 pt-2 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-950 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-stone-600 transition-colors duration-300 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/523339472657"
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
