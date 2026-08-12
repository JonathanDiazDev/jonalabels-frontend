import { Link } from 'react-router-dom'
import SectionHeader from '../../components/SectionHeader'

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
    <section className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Materiales"
          title="Nuestra especialidad"
          subtitle="Tres acabados distintivos para elevar la identidad de tu marca."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SPECIALTIES.map(({ title, image }) => (
            <div
              key={title}
              className="group relative h-[420px] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:ring-white/10"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <div className="absolute bottom-0 left-0 flex w-full flex-col items-start p-8">
                <p className="section-eyebrow mb-3 text-white/70">Colección</p>
                <h3 className="font-display text-3xl text-white">{title}</h3>
                <Link
                  to="/productos"
                  className="mt-5 rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                >
                  Ver más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
