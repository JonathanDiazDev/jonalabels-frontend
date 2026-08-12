import QuoteForm from './QuoteForm'
import FadeIn from '../../components/FadeIn'

export default function QuoteSection() {
  return (
    <section id="quote-form" className="relative z-10 py-20 transition-colors duration-300 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-stone-900 transition-colors duration-300 md:text-4xl lg:text-5xl dark:text-stone-100">
            Materialicemos tu visión.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600 transition-colors duration-300 dark:text-stone-400">
            Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <QuoteForm />
        </FadeIn>
      </div>
    </section>
  )
}
