const SPECIALTIES = [
  {
    title: 'Cartón Colgante',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop',
  },
  {
    title: 'Bordado',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop',
  },
  {
    title: 'Satín',
    image: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=600&h=800&fit=crop',
  },
]

export default function SpecialtySection() {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-transparent sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <h2 className="text-center text-3xl font-medium text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
          Nuestra Especialidad
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SPECIALTIES.map(({ title, image }) => (
            <div
              key={title}
              className="group relative h-[450px] overflow-hidden rounded-3xl"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full flex-col items-center p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
                <button className="rounded-full border border-white/20 bg-black/50 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20">
                  Ver mas
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
