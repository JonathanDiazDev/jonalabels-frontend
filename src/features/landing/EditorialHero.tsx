import { Link } from 'react-router-dom'

export default function EditorialHero() {
  return (
    <>
      {/* Video — fixed, siempre queda detrás de todo */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="https://res.cloudinary.com/oisispbh/video/upload/v1784917112/0724_njhd6w.mp4"
        />
        <div className="absolute inset-0 bg-stone-950/70" />
      </div>

      {/* Texto — fluye normal, scrollea y desaparece */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight text-stone-50 md:text-6xl">
            Somos Fabricantes y Especialistas en Etiquetas Textiles personalizadas de alta calidad, envíos a todo México
          </h1>

          <p className="mb-8 text-xl text-stone-300 transition-colors duration-300">
            Creamos etiquetas que cuentan la historia de tu marca.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/cotizar"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition-all duration-300 hover:bg-stone-100"
            >
              Cotiza ahora
            </Link>
            <Link
              to="/visualizar"
              className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Ver
            </Link>
          </div>
        </div>
      </div>

      {/* Beneficios — fondo sólido cubre el video */}
      <section className="relative z-10 -mt-[1px] bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-4 text-center text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl dark:text-stone-100">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-stone-500 transition-colors duration-300 dark:text-stone-400">
            Cada etiqueta es una pequeña tarjeta de presentación que tu cliente guardará para siempre.
          </p>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Calidad Premium', desc: 'Utilizamos materiales de primera para que cada etiqueta refleje la excelencia de tu marca.' },
              { title: 'Diseño Personalizado', desc: 'Creamos diseños únicos que capturan la esencia y identidad de tu colección.' },
              { title: 'Envío Rápido', desc: 'Producción eficiente sin sacrificar calidad. Tus etiquetas en tiempo récord.' },
              { title: 'Precios Competitivos', desc: 'Calidad de lujo a precios justos para marcas en crecimiento.' },
              { title: 'Asesoría Experta', desc: 'Nuestro equipo te guía en cada paso para lograr el resultado perfecto.' },
              { title: 'Satisfacción Garantizada', desc: 'Si no estás satisfecho, trabajamos hasta que lo estés.' },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h3 className="mb-2 text-lg font-semibold text-stone-900 transition-colors duration-300 dark:text-stone-100">{title}</h3>
                <p className="text-stone-600 transition-colors duration-300 dark:text-stone-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
