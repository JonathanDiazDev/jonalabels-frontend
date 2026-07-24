const BENEFITS = [
  {
    title: 'Atención Personalizada',
    desc: 'Ofrecemos asesoría directa para entender sus necesidades y recomendarle la opción ideal para etiquetar sus productos.',
  },
  {
    title: 'Variedad de soluciones',
    desc: 'Contamos con una amplia gama de opciones (materiales y acabados) para adaptarnos al estilo de su marca.',
  },
  {
    title: 'Máxima Calidad y Precisión',
    desc: 'Producción bajo altos estándares de calidad, asegurando que sus etiquetas siempre reflejen el valor de su marca.',
  },
  {
    title: 'Precios de Fábrica',
    desc: 'Calidad premium con el beneficio de una cadena de suministro directa, sin costos de intermediarios.',
  },
  {
    title: 'Envíos a Todo México',
    desc: 'Entregas a tiempo y en perfecto estado. Realizamos envíos a toda la República Mexicana con tarifas preferenciales.',
  },
  {
    title: 'Experiencia y Confianza',
    desc: 'Más de 20 años en la industria textil nos respaldan como un socio confiable y efectivo para su empresa.',
  },
]

export default function BenefitsSection() {
  return (
    <section className="bg-[#FBFBFA] py-20 transition-colors duration-300 dark:bg-[#161614] sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <h2 className="text-center text-3xl font-medium text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
          ¿Por qué elegirnos?
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 text-center md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ title, desc }) => (
            <div key={title}>
              <h3 className="mb-4 text-lg font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">{title}</h3>
              <p className="text-sm leading-relaxed text-stone-600 transition-colors duration-300 md:text-base dark:text-stone-400">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
