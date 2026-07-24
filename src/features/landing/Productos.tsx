import QuoteForm from './QuoteForm'

const CATEGORIES = [
  {
    title: 'Etiquetas Económicas',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=450&fit=crop',
    desc: 'Soluciones de identidad accesibles sin sacrificar calidad. Ideales para marcas que están comenzando y buscan una presencia profesional.',
    items: ['Papel estucado', 'Impresión offset', 'Acabado mate o brillante', 'Corte personalizado'],
  },
  {
    title: 'Etiquetas Internas',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=450&fit=crop',
    desc: 'Satín de Alta Definición: El roce perfecto. Un acabado sedoso con brillo elegante que jamás irrita la piel. Ideal para alta costura y lencería. Bordes sellados impecables que no se deshilachan.',
    items: ['Satín suave', 'Tejido de alta densidad', 'Tinta resistente al lavado', 'Impresión digital'],
  },
  {
    title: 'Etiquetas Externas',
    image: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&h=450&fit=crop',
    desc: 'Cartón Colgante (Hang Tags): Tu carta de presentación. El primer contacto físico del cliente con tu identidad. Acabados en relieve, texturas mate y detalles metalizados para un unboxing inolvidable.',
    items: ['Satín brillante', 'Damasco tejido', 'Bordado premium', 'Sellos en relieve'],
  },
  {
    title: 'Etiquetas para Mezclilla',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=450&fit=crop',
    desc: 'Parches Sintéticos: Carácter y resistencia. Diseñados para envejecer con estilo junto al streetwear, soportando lavados intensivos sin perder el relieve de tu logotipo.',
    items: ['Tejido resistente', 'Tinta impermeable', 'Bordes sellados', 'Colores industriales'],
  },
  {
    title: 'Etiquetas para Bisutería',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop',
    desc: 'Pequeñas, delicadas y elegantes. Perfectas para joyería, accesorios y piezas donde cada milímetro cuenta.',
    items: ['Tamaño reducido', 'Impresión de alta resolución', 'Fondo metalizado', 'Acabado laminado'],
  },
  {
    title: 'Etiquetas Adheribles',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=450&fit=crop',
    desc: 'Adhesivo de alto rendimiento para pegarse directamente en packaging, cajas y superficies lisas sin necesidad de coser.',
    items: ['Adhesivo permanente', 'Resina o vinilo', 'Corte a medida', 'Impermeables'],
  },
  {
    title: 'Bolsa Impresa',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=450&fit=crop',
    desc: 'Empaque que vende. Bolsas personalizadas que convierten cada compra en una experiencia de marca memorable.',
    items: ['Papel kraft o coated', 'Impresión flexográfica', 'Asas de cordón o plana', 'Tamaños estándar y custom'],
  },
  {
    title: 'Avíos Textiles',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=450&fit=crop',
    desc: 'El detalle final que completa tu producto. Botones, cierres, cordones y complementos textiles con tu marca.',
    items: ['Botones personalizados', 'Cierres y cremalleras', 'Cordones tejidos', 'Hilos de colores'],
  },
]

export default function Productos() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-24 transition-colors duration-300 sm:py-32 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-light leading-tight tracking-tight text-stone-900 transition-colors duration-300 sm:text-5xl lg:text-6xl dark:text-stone-100">
            Todo lo que tu marca necesita: combina nuestras etiquetas para crear una experiencia de empaque{' '}
            <span className="italic text-stone-500 dark:text-stone-400">premium</span>
          </h1>
        </div>
      </section>

      {/* Catálogo */}
      <section className="px-4 py-16 transition-colors duration-300 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-20 sm:space-y-28">
          {CATEGORIES.map(({ title, image, desc, items }, i) => {
            const isEven = i % 2 === 0

            return (
              <div key={title} className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                {/* Texto */}
                <div className={`flex flex-col justify-center px-4 md:px-12 lg:px-16 py-8 ${isEven ? '' : 'md:order-last'}`}>
                  <p className="mb-6 text-2xl font-bold uppercase tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-white">
                    {title}
                  </p>
                  <p className="mb-6 max-w-md text-base font-normal leading-relaxed text-stone-800 transition-colors duration-300 md:text-lg dark:text-stone-200">
                    {desc}
                  </p>
                  <ul className="mb-8 space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-center text-base font-medium text-stone-900 transition-colors duration-300 md:text-lg dark:text-stone-100">
                        <span className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400 dark:bg-stone-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Imagen */}
                <div className={!isEven ? '' : 'md:order-last'}>
                  <img
                    src={image}
                    alt={title}
                    className="w-full rounded-2xl object-cover shadow-sm transition-shadow duration-300 hover:shadow-md"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Cotización */}
      <section className="bg-stone-50 py-20 transition-colors duration-300 dark:bg-stone-900/50 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-stone-100">
              Materialicemos tu visión.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
              Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas.
            </p>
          </div>

          <QuoteForm />
        </div>
      </section>
    </>
  )
}
