import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../config/constants'

const CONTACT = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: 'mailto:jonalabels.mx@gmail.com',
  instagram: 'https://www.instagram.com/jonalabels.mx/',
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-stone-200/80 bg-white/70 backdrop-blur-xl transition-colors duration-300 dark:border-stone-800/80 dark:bg-stone-950/70">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl text-stone-900 dark:text-stone-50">Jona Labels</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Etiquetas textiles personalizadas que dan identidad a tu marca.
            </p>
          </div>

          <div>
            <h4 className="section-eyebrow text-stone-900 dark:text-stone-100">Navegación</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              <li><Link to="/" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Inicio</Link></li>
              <li><Link to="/productos" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Productos</Link></li>
              <li><Link to="/nosotros" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Nosotros</Link></li>
              <li><Link to="/blog" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Diario</Link></li>
              <li><Link to="/cotizar" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Cotizar</Link></li>
              <li><Link to="/visualizar" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">Visualizar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="section-eyebrow text-stone-900 dark:text-stone-100">Contacto</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.email} className="text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                  jonalabels.mx@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-stone-200/80 pt-6 text-center text-xs text-stone-500 dark:border-stone-800/80 dark:text-stone-400 sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Jona Labels. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link to="/privacidad" className="transition-colors hover:text-stone-900 dark:hover:text-stone-200">Privacidad</Link>
            <Link to="/terminos" className="transition-colors hover:text-stone-900 dark:hover:text-stone-200">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
