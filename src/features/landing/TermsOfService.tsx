import { Link } from 'react-router-dom'
import { GlassCard, PageHeader, PageSection } from '../../components/editorial'

export default function TermsOfService() {
  return (
    <PageSection className="pt-32">
      <GlassCard className="mx-auto max-w-3xl">
        <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-brand-orange hover:text-brand-orange/80">
          ← Volver al inicio
        </Link>
        <PageHeader
          eyebrow="Legal"
          align="left"
          title="Términos y Condiciones"
          subtitle="Última actualización: julio 2026"
        />

        <div className="space-y-6 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">1. Aceptación</h2>
            <p>Al utilizar los servicios de Jona Labels, aceptas los términos y condiciones aquí establecidos. Si no estás de acuerdo, te pedimos no utilizar nuestros servicios.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">2. Servicios</h2>
            <p>Jona Labels ofrece servicios de diseño y producción de etiquetas textiles personalizadas. Los precios, tiempos de entrega y especificaciones se acordarán individualmente en cada cotización.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">3. Cotizaciones</h2>
            <p>Las cotizaciones son válidas por 15 días naturales a partir de la fecha de emisión. Los precios pueden variar según el material, cantidad y complejidad del diseño.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">4. Producción y entrega</h2>
            <p>Los tiempos de producción comienzan una vez aprobada la cotización y confirmado el pago. Jona Labels no se hace responsable por retrasos causados por información incompleta del cliente.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">5. Propiedad intelectual</h2>
            <p>Los diseños, logos y arte que nos proporciones son de tu exclusiva propiedad. Jona Labels no utilizará tus diseños para ningún fin distinto al de producir las etiquetas solicitadas.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">6. Cancelaciones</h2>
            <p>Una vez iniciada la producción, no se aceptan cancelaciones ni devoluciones. Si necesitas hacer cambios, contáctanos lo antes posible para evaluar la posibilidad.</p>
          </section>
        </div>
      </GlassCard>
    </PageSection>
  )
}
