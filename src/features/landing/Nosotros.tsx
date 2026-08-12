import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeader from '../../components/SectionHeader'
import Reveal from '../../components/Reveal'

const STUDIO_IMAGE =
  'https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg'

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
    <section className="relative px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <motion.div
              className="group relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={STUDIO_IMAGE}
                alt="Detalle de etiqueta textil de satín"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-sm text-white/90">
                Cada detalle cuenta una historia de marca.
              </p>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="section-eyebrow mb-4 text-jona-orange">Nuestra historia</p>
            <h1 className="font-display mb-6 text-4xl leading-tight tracking-tight text-stone-900 md:text-5xl dark:text-stone-100">
              Donde la identidad de tu marca se vuelve tangible
            </h1>

            <div className="space-y-5 text-base leading-relaxed text-stone-700 md:text-lg dark:text-stone-300">
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

            <Link to="/cotizar" className="btn-primary mt-8 inline-flex">
              Trabajemos juntos
            </Link>
          </Reveal>
        </div>

        <div className="mt-24">
          <SectionHeader
            eyebrow="Filosofía"
            title="Lo que nos guía"
            subtitle="Misión, visión y valores que sostienen cada producción."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PILARES.map(({ number, title, subtitle, desc }, index) => (
              <Reveal key={number} delay={index * 0.08}>
                <motion.article
                  className="glass-panel h-full rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1"
                  whileHover={{ y: -4 }}
                >
                  <span className="font-display mb-4 block text-5xl text-stone-300 dark:text-stone-600">
                    {number}
                  </span>
                  <p className="section-eyebrow mb-2 text-jona-orange">{subtitle}</p>
                  <h2 className="mb-3 text-xl font-semibold text-stone-900 dark:text-stone-100">{title}</h2>
                  <p className="leading-relaxed text-stone-600 dark:text-stone-400">{desc}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
