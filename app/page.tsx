export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <span className="text-blue-500 font-semibold">
          Innovación y Tecnología
        </span>

        <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
          Construimos Software,
          <br />
          Inteligencia Artificial
          <br />
          y Automatización
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-3xl">
          En RA2 Labs ayudamos a empresas a digitalizar procesos,
          automatizar tareas y desarrollar soluciones tecnológicas
          modernas para crecer más rápido.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="#contacto"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
          >
            Solicitar Cotización
          </a>

          <a
            href="#servicios"
            className="border border-gray-500 px-8 py-4 rounded-xl"
          >
            Ver Servicios
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-12">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Desarrollo Web
            </h3>

            <p className="text-gray-400">
              Aplicaciones modernas, sistemas empresariales y
              plataformas personalizadas.
            </p>
          </div>

          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Inteligencia Artificial
            </h3>

            <p className="text-gray-400">
              Agentes de IA, asistentes virtuales y automatización
              inteligente.
            </p>
          </div>

          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Automatización
            </h3>

            <p className="text-gray-400">
              Integración de procesos y eliminación de tareas
              repetitivas.
            </p>
          </div>

          <div className="border border-gray-800 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Marketing Digital
            </h3>

            <p className="text-gray-400">
              Meta Ads, generación de contenido y estrategias
              impulsadas por IA.
            </p>
          </div>
        </div>
      </section>

      {/* MARKETPLACE AGENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-3xl p-10">
          <h2 className="text-4xl font-bold">
            Marketplace AI Agent
          </h2>

          <p className="mt-6 text-lg text-gray-200">
            Nuestro sistema inteligente genera publicaciones,
            precios recomendados, hashtags y campañas para redes
            sociales en segundos.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div>✓ Generación de contenido</div>
            <div>✓ Hashtags inteligentes</div>
            <div>✓ Recomendación de precios</div>
            <div>✓ Campañas Meta Ads</div>
            <div>✓ WhatsApp Business</div>
            <div>✓ Automatización comercial</div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold">
          Hablemos de tu proyecto
        </h2>

        <p className="text-gray-400 mt-4">
          Contáctanos para desarrollar software, IA o
          automatizaciones para tu empresa.
        </p>

        <div className="mt-8">
          <a
            href="mailto:ceo@ra2plabs.com"
            className="bg-blue-600 px-8 py-4 rounded-xl inline-block"
          >
            ceo@ra2plabs.com
          </a>
        </div>
      </section>
    </main>
  );
}