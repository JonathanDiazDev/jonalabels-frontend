import QuoteForm from './QuoteForm'

export default function QuoteSection() {
  return (
    <section id="quote-form" className="relative z-10 bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784921587/pexels-sandra-filipe-64798-7087672_dmpspn.jpg')] bg-cover bg-center bg-no-repeat bg-fixed py-20 transition-colors duration-300 dark:bg-[url('https://res.cloudinary.com/oisispbh/image/upload/v1784920003/pexels-laurachouette-21926652_b5bp1b.jpg')] sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-stone-100">
            Materialicemos tu visión.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
            Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas.
          </p>
        </div>

        <QuoteForm />
      </div>
    </section>
  )
}
