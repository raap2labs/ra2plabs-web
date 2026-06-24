export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <span className="text-blue-500 font-semibold">
            Innovación y Tecnología
          </span>

          <h1 className="text-6xl font-bold mt-4 mb-8">
            Construimos Software,
            <br />
            Inteligencia Artificial
            <br />
            y Automatización
          </h1>

          <p className="text-xl text-gray-400 mb-10">
            En RA2 Labs ayudamos a empresas a digitalizar procesos,
            automatizar tareas y desarrollar soluciones tecnológicas
            modernas para crecer más rápido.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold">
              Solicitar Cotización
            </button>

            <button className="border border-gray-600 px-8 py-4 rounded-xl">
              Ver Servicios
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold mb-14">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Desarrollo Web
            </h3>

            <p className="text-gray-400">
              Sitios corporativos, sistemas empresariales,
              plataformas web y aplicaciones modernas.
            </p>
          </div>

          <div className="border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Inteligencia Artificial
            </h3>

            <p className="text-gray-400">
              Agentes inteligentes, asistentes virtuales,
              análisis de datos y automatización avanzada.
            </p>
          </div>

          <div className="border border-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              WhatsApp y Meta
            </h3>

            <p className="text-gray-400">
              Chatbots, atención automatizada,
              campañas y generación de clientes.
            </p>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="bg-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-14">
            Proyectos
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Marketplace AI Agent
              </h3>

              <p className="text-gray-400">
                Plataforma para generar publicaciones,
                precios, campañas y automatizaciones
                utilizando inteligencia artificial.
              </p>
            </div>

            <div className="border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Soluciones Empresariales
              </h3>

              <p className="text-gray-400">
                Desarrollo de sistemas internos,
                control de inventarios, ventas
                y procesos corporativos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold mb-8">
          Hablemos
        </h2>

        <p className="text-gray-400 text-xl mb-8">
          Cuéntanos tu proyecto y te ayudaremos
          a convertirlo en una solución real.
        </p>

        <div className="space-y-4">
          <p>📧 ceo@ra2plabs.com</p>
          <p>🌐 www.ra2plabs.com</p>
        </div>
      </section>
    </main>
  );
}