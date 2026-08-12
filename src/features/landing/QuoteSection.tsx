import { useLocation } from 'react-router-dom'
import QuoteForm from './QuoteForm'
import FadeIn from '../../components/FadeIn'
import { PageSection, SectionHeading, BrandHighlight } from '../../components/editorial'

export default function QuoteSection() {
  const { pathname } = useLocation()
  const isStandalone = pathname === '/cotizar'

  return (
    <PageSection id="quote-form" className={isStandalone ? 'pt-32' : ''}>
      <FadeIn>
        <SectionHeading
          eyebrow="Cotización"
          title="Materialicemos tu visión."
          subtitle={
            <>
              Sube tu diseño y nuestro equipo analizará las especificaciones para enviarte una cotización a medida en menos de{' '}
              <BrandHighlight>24 horas</BrandHighlight>.
            </>
          }
        />
      </FadeIn>

      <FadeIn delay={0.15}>
        <QuoteForm />
      </FadeIn>
    </PageSection>
  )
}
