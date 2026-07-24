const PHOTOS = [
  { src: '/foto_log (2).png', alt: 'Etiqueta textil Jona Labels - primer plano' },
  { src: '/foto_log (3).png', alt: 'Etiqueta textil Jona Labels - acabado final' },
]

export default function ProductShowcase() {
  return (
    <section className="bg-stone-50 py-20 transition-colors duration-300 dark:bg-stone-900/50 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        <div className="lg:sticky lg:top-32 self-start">
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-stone-100">
            La diferencia se nota en los detalles.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-stone-600 transition-colors duration-300 dark:text-stone-400">
            Hilos de alta definición y un satén que refleja la verdadera calidad de tu marca. Observa de cerca por qué nuestros clientes confían en nosotros para su toque final.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {PHOTOS.map((photo) => (
            <div key={photo.src} className="aspect-square overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
