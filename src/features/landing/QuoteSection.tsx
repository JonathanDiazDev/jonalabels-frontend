import QuoteForm from './QuoteForm'
import SectionHeader from '../../components/SectionHeader'

export default function QuoteSection() {
  return (
    <section id="quote-form" className="relative z-10 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Cotización"
          title="Materialicemos tu visión"
          subtitle="Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de 24 horas."
        />

        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </section>
  )
}
