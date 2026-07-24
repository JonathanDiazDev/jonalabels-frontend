const TESTIMONIALS = [
  {
    text: 'La calidad de las etiquetas de satín superó nuestras expectativas. Tienen un brillo elegante y los bordes no se deshilachan. Le dieron el toque premium que nuestra colección necesitaba.',
    name: 'Valeria M.',
    role: 'Diseñadora de Modas',
  },
  {
    text: 'Excelente servicio y atención al detalle. Pedimos etiquetas de cartón colgante y los acabados son impecables. Definitivamente volveremos a trabajar con ellos.',
    name: 'Roberto C.',
    role: 'Fundador de Marca',
  },
  {
    text: 'Buscábamos un proveedor que entendiera el concepto de nuestra marca boutique. Entregaron a tiempo, con precios justos y una calidad de impresión en tela insuperable.',
    name: 'Andrea G.',
    role: 'Directora Creativa',
  },
]

function Stars() {
  return (
    <div className="flex gap-1 text-stone-800 dark:text-stone-200">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        <h2 className="mb-16 text-center text-3xl font-medium text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {TESTIMONIALS.map(({ text, name, role }) => (
            <div key={name} className="relative">
              <span className="absolute -top-6 -left-2 text-6xl font-serif leading-none text-stone-300 transition-colors duration-300 dark:text-stone-600">&ldquo;</span>
              <Stars />
              <p className="mt-4 text-sm leading-relaxed text-stone-600 italic transition-colors duration-300 md:text-base dark:text-stone-400">
                {text}
              </p>
              <div className="mt-6">
                <p className="font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">{name}</p>
                <p className="text-sm text-stone-400 transition-colors duration-300 dark:text-stone-500">{role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
