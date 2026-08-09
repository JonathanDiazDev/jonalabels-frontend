import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl bg-stone-50 px-6 py-24 transition-colors duration-300 dark:bg-stone-950">
      <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600">
        ← Volver al inicio
      </Link>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Términos y Condiciones</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Última actualización: julio 2026</p>

      <div className="prose prose-slate dark:prose-invert mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Aceptación</h2>
          <p>Al utilizar los servicios de Jona Labels, aceptas los términos y condiciones aquí establecidos. Si no estás de acuerdo, te pedimos no utilizar nuestros servicios.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Servicios</h2>
          <p>Jona Labels ofrece servicios de diseño y producción de etiquetas textiles personalizadas. Los precios, tiempos de entrega y especificaciones se acordarán individualmente en cada cotización.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Cotizaciones</h2>
          <p>Las cotizaciones son válidas por 15 días naturales a partir de la fecha de emisión. Los precios pueden variar según el material, cantidad y complejidad del diseño.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Producción y entrega</h2>
          <p>Los tiempos de producción comienzan una vez aprobada la cotización y confirmado el pago. Jona Labels no se hace responsable por retrasos causados por información incompleta del cliente.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Propiedad intelectual</h2>
          <p>Los diseños, logos y arte que nos proporciones son de tu exclusiva propiedad. Jona Labels no utilizará tus diseños para ningún fin distinto al de producir las etiquetas solicitadas.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Cancelaciones</h2>
          <p>Una vez iniciada la producción, no se aceptan cancelaciones ni devoluciones. Si necesitas hacer cambios, contáctanos lo antes posible para evaluar la posibilidad.</p>
        </section>
      </div>
    </div>
  )
}
