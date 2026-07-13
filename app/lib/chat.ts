export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = [
  "Eres Nexus, el asistente virtual de RA2P Labs, una empresa de desarrollo de software,",
  "inteligencia artificial y automatización. Respondes en español, de forma profesional",
  "y amigable. Tus respuestas son concisas pero completas.",
  "",
  "SERVICIOS:",
  "- Desarrollo Web: Aplicaciones modernas con React, Next.js, Node.js, TypeScript.",
  "  Desde MVPs en 4 semanas hasta plataformas completas en 12 semanas.",
  "- Inteligencia Artificial: Agentes IA, asistentes virtuales, chatbots inteligentes.",
  "  Integración con OpenAI, LangChain, modelos propios.",
  "- Automatización: Procesos empresariales con n8n, Make, Zapier.",
  "  Integración de sistemas, orquestación de flujos, reportes automatizados.",
  "- Marketing Digital: Meta Ads, contenido con IA, optimización de pujas.",
  "",
  "PROCESO: 1. Descubrimiento 2. Estrategia 3. Desarrollo 4. Implementación 5. Optimización",
  "",
  "TECNOLOGÍAS: React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB,",
  "OpenAI, LangChain, TensorFlow, Docker, AWS, Vercel, Redis.",
  "",
  "CONTACTO: ceo@ra2plabs.com | WhatsApp +68345701 | Respuesta en <48h",
].join("\n");

const mockResponses: Record<string, string> = {
  hola: "¡Hola! 👋 Soy Nexus, el asistente virtual de RA2P Labs. ¿En qué puedo ayudarte? Puedes preguntarme sobre nuestros servicios, tecnologías, proceso de trabajo o solicitar una cotización.",
  servicios: "Ofrecemos cuatro servicios principales:\n\n• **Desarrollo Web** — Apps modernas con React, Next.js y Node.js\n• **Inteligencia Artificial** — Agentes IA, chatbots y automatización cognitiva\n• **Automatización** — Procesos empresariales automatizados con n8n y Make\n• **Marketing Digital** — Campañas Meta Ads y contenido generado por IA\n\n¿Sobre cuál te gustaría saber más?",
  precio: "Los proyectos en RA2P Labs se cotizan de forma personalizada. El rango general es:\n\n• **MVP / proyecto pequeño:** desde $1,500 USD\n• **Proyecto mediano:** $3,000 - $8,000 USD\n• **Plataforma completa:** $8,000 - $20,000 USD\n\n¿Quieres solicitar una cotización exacta?",
  cotizacion: "Para una cotización precisa puedes:\n\n1. Enviarnos un correo a **ceo@ra2plabs.com**\n2. Escribirnos al **WhatsApp +68345701**\n3. Usar el formulario de contacto en nuestra página\n\nTe responderemos en menos de 48 horas.",
  contacto: "Puedes contactarnos por:\n\n• **Email:** ceo@ra2plabs.com\n• **WhatsApp:** +68345701\n• **Formulario web:** sección Contacto de nuestro sitio\n\nRespondemos en menos de 48 horas.",
  proceso: "Nuestro proceso consta de 5 etapas:\n\n1. **Descubrimiento** — Analizamos tu negocio y objetivos\n2. **Estrategia** — Diseñamos la arquitectura tecnológica\n3. **Desarrollo** — Construimos con metodologías ágiles\n4. **Implementación** — Desplegamos e integramos\n5. **Optimización** — Monitoreamos y mejoramos continuamente\n\nEl proceso toma de 4 a 12 semanas según la complejidad.",
  tecnologias: "Trabajamos con tecnologías modernas:\n\n• **Frontend:** React, Next.js, TypeScript, Tailwind CSS\n• **Backend:** Node.js, Python, PostgreSQL, MongoDB\n• **IA:** OpenAI, LangChain, TensorFlow, PyTorch\n• **Infra:** Docker, AWS, Vercel, Redis\n\n¿Quieres saber más sobre alguna tecnología?",
  web: "Nuestro **Desarrollo Web** incluye:\n\n• Apps a la medida con React y Next.js\n• Sistemas empresariales y paneles administrativos\n• APIs y microservicios con Node.js o Python\n• Optimización de rendimiento y SEO técnico\n• CI/CD y despliegue automatizado\n\nUn MVP puede estar listo en 4 semanas.",
  ia: "Nuestra **Inteligencia Artificial** incluye:\n\n• Agentes de IA personalizados\n• Chatbots con lenguaje natural\n• Automatización cognitiva de procesos\n• Análisis predictivo y detección de patrones\n• Integración con sistemas existentes vía API",
  automatizacion: "Nuestra **Automatización** incluye:\n\n• Automatización de procesos repetitivos\n• Integración de sistemas (CRM, ERP, APIs)\n• Orquestación de flujos complejos\n• Notificaciones y alertas automatizadas\n• Reportes generados automáticamente\n\nClientes reportan hasta 80% de reducción en tiempo de procesos.",
  marketing: "Nuestro **Marketing Digital** incluye:\n\n• Generación automatizada de contenido con IA\n• Optimización de Meta Ads y Google Ads\n• Hashtags inteligentes y precios dinámicos\n• Analítica en tiempo real\n• Gestión multiplataforma unificada",
  gracias: "¡De nada! 😊 Si tienes más preguntas, aquí estoy. También puedes visitar nuestra página o contactarnos directamente. ¡Que tengas un excelente día!",
};

function findBestMatch(input: string): string {
  const lower = input.toLowerCase().trim();
  if (!lower || lower.length < 2) return mockResponses.hola;

  const keywords: [string, string][] = [
    ["precio", "precio"], ["costo", "precio"], ["cuanto cuesta", "precio"],
    ["tarifa", "precio"], ["presupuesto", "precio"], ["cotiz", "cotizacion"],
    ["contacto", "contacto"], ["email", "contacto"], ["correo", "contacto"],
    ["whatsapp", "contacto"], ["telefono", "contacto"], ["hablar", "contacto"],
    ["proceso", "proceso"], ["metodologia", "proceso"], ["como trabajan", "proceso"],
    ["etapas", "proceso"], ["tecnolog", "tecnologias"], ["stack", "tecnologias"],
    ["herramientas", "tecnologias"], ["lenguaje", "tecnologias"],
    ["framework", "tecnologias"], ["web", "web"], ["desarrollo web", "web"],
    ["ia", "ia"], ["inteligencia artificial", "ia"], ["agente", "ia"], ["chatbot", "ia"],
    ["automatizacion", "automatizacion"], ["automatización", "automatizacion"],
    ["automatizar", "automatizacion"], ["marketing", "marketing"],
    ["publicidad", "marketing"], ["anuncios", "marketing"], ["ads", "marketing"],
    ["servicios", "servicios"], ["que hacen", "servicios"], ["que ofrecen", "servicios"],
    ["soluciones", "servicios"], ["hola", "hola"], ["buenas", "hola"],
    ["gracias", "gracias"], ["ayuda", "hola"],
  ];

  for (const [keyword, responseKey] of keywords) {
    if (lower.includes(keyword)) {
      const response = mockResponses[responseKey];
      if (response) return response;
    }
  }

  return mockResponses.servicios;
}

export async function getChatResponse(
  userMessage: string,
  _conversation: ChatMessage[]
): Promise<string> {
  void _conversation;
  void SYSTEM_PROMPT;

  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
  return findBestMatch(userMessage);
}

export const SUGGESTED_QUESTIONS = [
  "¿Qué servicios ofrecen?",
  "¿Cuánto cuesta un proyecto?",
  "¿Cómo es el proceso de trabajo?",
  "¿Qué tecnologías usan?",
  "¿Cómo los contacto?",
];

export const GREETING_MESSAGE = "¡Hola! 👋 Soy **Nexus**, el asistente virtual de RA2P Labs. Puedo ayudarte con información sobre servicios, precios, tecnologías y más. ¿En qué puedo ayudarte?";
