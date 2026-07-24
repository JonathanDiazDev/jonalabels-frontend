import { motion } from 'framer-motion'

const PHOTOS = [
  { src: '/foto_log (2).png', alt: 'Etiqueta textil Jona Labels - primer plano' },
  { src: '/foto_log (3).png', alt: 'Etiqueta textil Jona Labels - acabado final' },
]

export default function ProductShowcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        <div className="lg:sticky lg:top-32 self-start">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            La diferencia se nota en los detalles.
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="mt-6 text-lg text-slate-700 leading-relaxed dark:text-slate-300"
          >
            Hilos de alta definición y un satén que refleja la verdadera calidad de tu marca. Observa de cerca por qué nuestros clientes confían en nosotros para su toque final.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.2 }}
              className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg dark:bg-slate-800 dark:shadow-none"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
