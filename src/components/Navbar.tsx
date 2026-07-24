import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Materiales', href: '#materiales' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Contacto', href: '#quote-form' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { isDark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    if (!isHome) {
      window.location.href = '/' + href
      return
    }
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80' : 'border-transparent bg-white/10 backdrop-blur-md dark:bg-slate-950/10'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" aria-label="Ir al inicio de Jona Labels">
          <img
            src={isDark ? '/HorizontalOscuro.png' : '/HorizontalClaro.png'}
            alt="Jona Labels"
            className="h-14 w-auto max-h-16 object-contain"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link to="/visualizar" className="rounded-lg border border-jona-blue px-4 py-2 text-sm font-semibold text-jona-blue transition-colors hover:bg-jona-blue/10 dark:border-orange-400/60 dark:text-orange-400 dark:hover:bg-orange-400/10">
          Visualizar
        </Link>
      </div>
    </nav>
  )
}
