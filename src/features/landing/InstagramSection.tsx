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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-white">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function InstagramSection() {
  return (
    <section className="relative z-10 -mt-[1px] bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-16 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:py-20">
      <div className="mx-auto max-w-5xl px-4">

        <h2 className="mb-10 text-center text-3xl font-medium text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-50">
          Nuestro Instagram
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {instagramPosts.map(({ id, imageUrl }) => (
            <a
              key={id}
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-3xl"
            >
              <img
                src={imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 flex w-full flex-col items-center p-8">
                <InstagramIcon />
                <h3 className="mt-4 text-2xl font-bold text-white">@jonalabels</h3>
                <button className="mt-4 rounded-full border border-white/20 bg-black/50 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20">
                  Seguir
                </button>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
