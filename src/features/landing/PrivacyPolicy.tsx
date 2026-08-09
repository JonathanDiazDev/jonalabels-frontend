import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl bg-stone-50 px-6 py-24 transition-colors duration-300 dark:bg-stone-950">
      <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600">
        ← Volver al inicio
      </Link>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Aviso de Privacidad</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Última actualización: julio 2026</p>

      <div className="prose prose-slate dark:prose-invert mt-8 space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">1. Responsable del tratamiento</h2>
          <p>Jona Labels, con domicilio en México, es responsable del uso y protección de los datos personales que nos proporciones a través de nuestro sitio web y servicios.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">2. Datos personales que recabamos</h2>
          <p>Para prestar nuestros servicios, podemos recabar los siguientes datos personales:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Nombre completo</li>
            <li>Número de teléfono / WhatsApp</li>
            <li>Correo electrónico</li>
            <li>Diseños y logos que nos proporciones para la producción de etiquetas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">3. Finalidad del uso de datos</h2>
          <p>Tus datos personales serán utilizados exclusivamente para:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>Responder a tus solicitudes de cotización</li>
            <li>Coordinar la producción y entrega de etiquetas</li>
            <li>Comunicarnos contigo sobre el estado de tu pedido</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">4. Protección de datos</h2>
          <p>Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">5. Derechos ARCO</h2>
          <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al uso de tus datos personales. Para ejercer estos derechos, contáctanos a través de nuestro correo electrónico.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">6. Cambios en este aviso</h2>
          <p>Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Los cambios serán publicados en esta misma página.</p>
        </section>
      </div>
    </div>
  )
}
