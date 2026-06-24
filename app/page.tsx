export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold mb-6">
          RA2P Labs
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          Desarrollo de Software, Inteligencia Artificial y Automatización.
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Nuestros Servicios
          </button>

          <button className="border border-white px-6 py-3 rounded-lg">
            Contactar
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold mb-10">
          Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
              Desarrollo Web
            </h3>
            <p>
              Aplicaciones modernas y sistemas empresariales.
            </p>
          </div>

          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
              Inteligencia Artificial
            </h3>
            <p>
              Agentes de IA, automatización y asistentes inteligentes.
            </p>
          </div>

          <div className="border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-3">
              WhatsApp y Meta
            </h3>
            <p>
              Chatbots, campañas y atención automatizada.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}