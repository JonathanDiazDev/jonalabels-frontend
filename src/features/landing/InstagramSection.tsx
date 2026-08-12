import SectionHeader from '../../components/SectionHeader'

const PROFILE_URL = 'https://instagram.com/jonalabels'

const instagramPosts = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop' },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop' },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1528459105426-b9548367069b?w=400&h=400&fit=crop' },
  { id: 4, imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' },
  { id: 5, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop' },
  { id: 6, imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function InstagramSection() {
  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Redes"
          title="Nuestro Instagram"
          subtitle="Inspírate con procesos, acabados y proyectos recientes."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {instagramPosts.map(({ id, imageUrl }) => (
            <a
              key={id}
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:ring-white/10"
            >
              <img
                src={imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center">
                <InstagramIcon />
                <p className="mt-3 text-sm font-semibold text-white">@jonalabels</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
