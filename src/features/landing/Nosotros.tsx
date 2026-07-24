const PILARES = [
  {
    number: '01',
    title: 'El Propósito',
    subtitle: 'Misión',
    desc: 'Ser la fuente de valor añadido definitivo para tu marca. Convertimos tu logotipo y visión en piezas textiles de calidad internacional que elevan la percepción de cada prenda.',
  },
  {
    number: '02',
    title: 'El Futuro',
    subtitle: 'Visión',
    desc: 'Consolidarnos como el estudio líder en innovación de etiquetado textil, estableciendo los más altos estándares de excelencia y diseño para la industria de la moda contemporánea.',
  },
  {
    number: '03',
    title: 'La Esencia',
    subtitle: 'Valores',
    desc: 'Compromiso absoluto con el detalle. Transparencia en nuestros procesos. Calidad innegociable en cada milímetro de tela.',
  },
]

export default function Nosotros() {
  return (
    <section className="bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed px-4 pt-32 pb-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Imagen */}
          <div className="flex items-center justify-center">
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-stone-200 transition-colors duration-300 dark:bg-stone-800">
              <span className="text-sm text-stone-500 dark:text-stone-400">Imagen de estudio / satín</span>
            </div>
          </div>

          {/* Texto */}
          <div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 transition-colors duration-300 md:text-5xl dark:text-stone-100">
              Nuestra Historia
            </h1>

            <div className="space-y-6 text-lg leading-relaxed text-stone-700 transition-colors duration-300 dark:text-stone-300">
              <p>
                Nacimos con una convicción clara: cada prenda merece una firma a la altura de su diseño.
                Entendemos que el empaque y el etiquetado no son un paso final, sino la primera experiencia
                táctil de tu cliente.
              </p>
              <p>
                A lo largo de nuestra trayectoria, nos hemos especializado en la creación de etiquetas
                personalizadas de alta gama, perfeccionando técnicas sobre satín, algodón y materiales
                vanguardistas para asegurar que tu identidad de marca se comunique con total precisión.
              </p>
            </div>
          </div>

        </div>

        {/* Pilares */}
        <div className="mt-32 mb-24 grid grid-cols-1 gap-12 md:grid-cols-3">
          {PILARES.map(({ number, title, subtitle, desc }) => (
            <div key={number}>
              <span className="mb-4 block text-5xl font-light text-stone-300 transition-colors duration-300 dark:text-stone-700">
                {number}
              </span>
              <h2 className="mb-3 text-xl font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">
                {title}
              </h2>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-400 transition-colors duration-300 dark:text-stone-500">
                {subtitle}
              </p>
              <p className="leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
