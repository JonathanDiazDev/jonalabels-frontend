import { Link } from 'react-router-dom'
import { GlassCard, PageHeader, PageSection, linkBrandClass } from '../../components/editorial'

export default function PrivacyPolicy() {
  return (
    <PageSection className="pt-32">
      <GlassCard className="mx-auto max-w-3xl">
        <Link to="/" className={`mb-8 inline-flex items-center gap-1 ${linkBrandClass}`}>
          ← Volver al inicio
        </Link>
        <PageHeader
          eyebrow="Legal"
          align="left"
          title="Aviso de Privacidad"
          subtitle="Última actualización: julio 2026"
        />

        <div className="space-y-6 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">1. Responsable del tratamiento</h2>
          <p>Jona Labels, con domicilio en México, es responsable del uso y protección de los datos personales que nos proporciones a través de nuestro sitio web y servicios.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">2. Datos personales que recabamos</h2>
          <p>Para prestar nuestros servicios, podemos recabar los siguientes datos personales:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Nombre completo</li>
            <li>Número de teléfono / WhatsApp</li>
            <li>Correo electrónico</li>
            <li>Diseños y logos que nos proporciones para la producción de etiquetas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">3. Finalidad del uso de datos</h2>
          <p>Tus datos personales serán utilizados exclusivamente para:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Responder a tus solicitudes de cotización</li>
            <li>Coordinar la producción y entrega de etiquetas</li>
            <li>Comunicarnos contigo sobre el estado de tu pedido</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">4. Protección de datos</h2>
          <p>Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">5. Derechos ARCO</h2>
          <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al uso de tus datos personales. Para ejercer estos derechos, contáctanos a través de nuestro correo electrónico.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">6. Cambios en este aviso</h2>
          <p>Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Los cambios serán publicados en esta misma página.</p>
        </section>
        </div>
      </GlassCard>
    </PageSection>
  )
}
