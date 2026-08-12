import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../config/constants'

const CONTACT = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: 'mailto:jonalabels.mx@gmail.com',
  instagram: 'https://www.instagram.com/jonalabels.mx/',
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-stone-200/50 bg-white/60 backdrop-blur-md transition-colors duration-300 dark:border-stone-800/50 dark:bg-stone-950/60">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div>
            <span className="text-sm font-bold tracking-tight text-jona-blue dark:text-blue-300">Jona Labels</span>
            <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              Etiquetas textiles personalizadas que <span className="font-semibold text-jona-orange">dan identidad</span> a tu marca.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-jona-blue dark:text-blue-300">Navegación</h4>
            <ul className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1.5">
              <li><Link to="/" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Inicio</Link></li>
              <li><Link to="/productos" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Productos</Link></li>
              <li><Link to="/nosotros" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Nosotros</Link></li>
              <li><Link to="/blog" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Diario</Link></li>
              <li><Link to="/cotizar" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Cotizar</Link></li>
              <li><Link to="/visualizar" className="text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">Visualizar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-jona-blue dark:text-blue-300">Contacto</h4>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={CONTACT.email} className="inline-flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-jona-orange dark:text-stone-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  jonalabels.mx@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-4 flex flex-col items-center gap-1 border-t border-stone-200 pt-3 text-center text-[10px] text-stone-600 transition-colors duration-300 dark:border-stone-800 dark:text-stone-400 sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Jona Labels. Todos los derechos reservados.</span>
          <div className="flex gap-3">
            <Link to="/privacidad" className="transition-colors hover:text-jona-orange">Privacidad</Link>
            <Link to="/terminos" className="transition-colors hover:text-jona-orange">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
