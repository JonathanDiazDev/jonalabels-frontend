import { motion } from 'framer-motion'

const CARDS = [
  {
    title: 'Calidad Premium Garantizada',
    text: 'No tienes que lidiar con fábricas ni maquinaria. Nosotros filtramos a los mejores proveedores para entregarte satén de alta definición.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-jona-orange">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Producción Sin Estrés',
    text: 'Envías tu visión y nosotros orquestamos todo el proceso. Desde la cotización hasta que las etiquetas llegan listas para coser.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-jona-orange">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: 'Servicio de Primera',
    text: 'Atención meticulosa en cada paso. Nos aseguramos de que el resultado final represente exactamente la identidad de tu negocio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-jona-orange">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const childVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function ValueProposition() {
  return (
    <section id="beneficios" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          <motion.div variants={childVariants} className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              Nos encargamos de los <span className="text-jona-orange">detalles</span>. Tú de hacer crecer tu marca.
            </h2>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed dark:text-slate-400">
              El aliado estratégico para boutiques, emprendedores de costura y creadores de moda.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={childVariants}
                className="flex flex-col gap-5 rounded-2xl bg-gray-50 border border-gray-100 p-8 lg:p-10 dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue/5 dark:bg-white/5">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue dark:text-white">
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed dark:text-slate-400">
                  {card.text}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
