import { Link } from 'react-router-dom'
import FadeIn, { Stagger, StaggerItem } from '../../components/FadeIn'

const SPECIALTIES = [
  {
    title: 'Cartón Colgante',
    image: 'https://res.cloudinary.com/oisispbh/image/upload/v1784921824/pexels-ron-lach-9594081_x9fu4i.jpg',
  },
  {
    title: 'Bordado',
    image: 'https://res.cloudinary.com/oisispbh/image/upload/v1784922414/wmremove-transformed_cnwfot.png',
  },
  {
    title: 'Satín',
    image: 'https://res.cloudinary.com/oisispbh/image/upload/v1784921748/pexels-dmitriy-steinke-559643503-31438256_kioskz.jpg',
  },
]

export default function SpecialtySection() {
  return (
    <section className="relative z-10 py-20 transition-colors duration-300 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-medium text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
            Nuestra Especialidad
          </h2>
        </FadeIn>

        <Stagger stagger={0.14} className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SPECIALTIES.map(({ title, image }) => (
            <StaggerItem
              key={title}
              className="group relative h-[450px] overflow-hidden rounded-3xl"
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full flex-col items-center p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">{title}</h3>
                <Link
                  to="/productos"
                  className="rounded-full border border-white/20 bg-black/50 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  Ver más
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
