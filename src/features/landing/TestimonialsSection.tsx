import { useEffect, useState } from 'react'
import { apiFetch } from '../../api/http'
import SectionHeader from '../../components/SectionHeader'

interface Resena {
  id: number
  calificacion: number
  comentario: string | null
}

const FALLBACK_TESTIMONIALS = [
  {
    text: 'La calidad de las etiquetas de satín superó nuestras expectativas. Tienen un brillo elegante y los bordes no se deshilachan.',
    name: 'Valeria M.',
    role: 'Diseñadora de Modas',
    rating: 5,
  },
  {
    text: 'Excelente servicio y atención al detalle. Pedimos etiquetas de cartón colgante y los acabados son impecables.',
    name: 'Roberto C.',
    role: 'Fundador de Marca',
    rating: 5,
  },
  {
    text: 'Buscábamos un proveedor que entendiera el concepto de nuestra marca boutique. Entregaron a tiempo y con calidad insuperable.',
    name: 'Andrea G.',
    role: 'Directora Creativa',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-jona-orange">
      {[...Array(count)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS)

  useEffect(() => {
    apiFetch('/resenas')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((resenas: Resena[]) => {
        if (resenas.length === 0) return
        setTestimonials(
          resenas.slice(0, 6).map((resena, index) => ({
            text: resena.comentario ?? 'Excelente experiencia con Jona Labels.',
            name: `Cliente verificado ${index + 1}`,
            role: 'Comprador verificado',
            rating: resena.calificacion,
          })),
        )
      })
      .catch(() => {})
  }, [])

  return (
    <section className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
          subtitle="Marcas de moda que confían en la calidad de nuestros acabados."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map(({ text, name, role, rating }) => (
            <article key={name} className="glass-panel relative rounded-3xl p-8">
              <span className="font-display absolute -top-3 left-6 text-6xl leading-none text-stone-300 dark:text-stone-600">
                &ldquo;
              </span>
              <Stars count={rating} />
              <p className="mt-4 text-sm leading-relaxed text-stone-600 italic md:text-base dark:text-stone-300">
                {text}
              </p>
              <div className="mt-6 border-t border-stone-200/80 pt-4 dark:border-stone-700/80">
                <p className="font-semibold text-stone-900 dark:text-stone-100">{name}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">{role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
