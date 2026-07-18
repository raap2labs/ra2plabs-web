export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LeadInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
}

type Intent =
  | "greeting"
  | "services"
  | "service_detail"
  | "pricing"
  | "quote"
  | "contact"
  | "process"
  | "technologies"
  | "lead_capture"
  | "meeting"
  | "faq"
  | "thanks";

const KB = {
  tagline: "RA2P Labs — Software, IA y Automatización",
  email: "ceo@ra2plabs.com",
  whatsapp: "+68345701",
  responseTime: "48 horas",
  services: [
    {
      id: "desarrollo-web",
      name: "Desarrollo Web",
      keywords: ["web", "desarrollo web", "aplicación", "sitio", "frontend", "backend", "react", "nextjs"],
      description:
        "Aplicaciones modernas con React, Next.js, Node.js y TypeScript. Desde MVPs en 4 semanas hasta plataformas completas en 12 semanas.",
      benefits: [
        "Aplicaciones a la medida",
        "Alto rendimiento y escalabilidad",
        "Seguridad integral",
        "CI/CD y despliegue automatizado",
      ],
      tech: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    },
    {
      id: "ia",
      name: "Inteligencia Artificial",
      keywords: ["ia", "inteligencia artificial", "agente", "chatbot", "gpt", "openai", "langchain", "modelo"],
      description:
        "Agentes IA personalizados, asistentes virtuales, chatbots inteligentes y automatización cognitiva. Integración con OpenAI, LangChain y modelos propios.",
      benefits: [
        "Agentes de IA personalizados",
        "Automatización cognitiva",
        "Procesamiento de lenguaje natural",
        "Análisis predictivo",
      ],
      tech: ["OpenAI", "LangChain", "Python", "TensorFlow", "PyTorch", "AWS Bedrock"],
    },
    {
      id: "automatizacion",
      name: "Automatización",
      keywords: ["automatizacion", "automatización", "automatizar", "flujo", "workflow", "n8n", "zapier", "make"],
      description:
        "Automatización de procesos empresariales con n8n, Make y Zapier. Integración de sistemas, orquestación de flujos y reportes automatizados.",
      benefits: [
        "Elimina tareas repetitivas",
        "Integración de sistemas",
        "Notificaciones y alertas",
        "Reportes automatizados",
      ],
      tech: ["n8n", "Zapier", "Make", "Python", "Node.js", "AWS Lambda"],
    },
    {
      id: "marketing-digital",
      name: "Marketing Digital",
      keywords: ["marketing", "publicidad", "anuncios", "ads", "meta", "google ads", "redes", "seo"],
      description:
        "Campañas inteligentes impulsadas por IA. Meta Ads, Google Ads, contenido generado por IA y optimización automatizada de pujas.",
      benefits: [
        "Contenido automatizado con IA",
        "Optimización de campañas",
        "Hashtags inteligentes",
        "Analítica en tiempo real",
      ],
      tech: ["Meta API", "Google Ads", "OpenAI", "Python", "Next.js"],
    },
  ],
  process: [
    "1. **Descubrimiento** — Analizamos tu negocio, objetivos y requisitos técnicos",
    "2. **Estrategia** — Diseñamos la arquitectura y plan de ejecución",
    "3. **Desarrollo** — Construimos con metodologías ágiles y entregas iterativas",
    "4. **Implementación** — Desplegamos, integramos y probamos",
    "5. **Optimización** — Monitoreamos, ajustamos y mejoramos continuamente",
  ],
  prices: {
    mvp: "desde $1,500 USD",
    medium: "$3,000 - $8,000 USD",
    full: "$8,000 - $20,000 USD",
  },
  faq: [
    { q: "¿Cuánto tiempo toma desarrollar un proyecto?", a: "De 4 a 12 semanas según la complejidad. Un MVP puede estar listo en 4 semanas." },
    { q: "¿Ofrecen mantenimiento post-lanzamiento?", a: "Sí, contamos con planes de mantenimiento continuo que incluyen actualizaciones, soporte y nuevas funcionalidades." },
    { q: "¿Trabajan con tecnologías específicas?", a: "Nos adaptamos a tu stack. Recomendamos tecnologías según los requisitos del proyecto." },
    { q: "¿Cómo garantizan la calidad?", a: "Code review, pruebas automatizadas, CI/CD y estándares de la industria en cada entrega." },
  ],
};

function buildSystemPrompt(): string {
  return [
    "Eres Nexus, el asistente virtual de RA2P Labs. Respondes en español, profesional y amigable.",
    "Tus respuestas son concisas (máximo 3 párrafos) pero completas.",
    "",
    "SERVICIOS:",
    ...KB.services.map(
      (s) => `- ${s.name}: ${s.description}`,
    ),
    "",
    "PRECIOS:",
    `- MVP / proyecto pequeño: ${KB.prices.mvp}`,
    `- Proyecto mediano: ${KB.prices.medium}`,
    `- Plataforma completa: ${KB.prices.full}`,
    "",
    "PROCESO:",
    ...KB.process.map((s) => `- ${s.replace(/\*\*/g, "").replace(/ —.*/, "")}`),
    "",
    "CONTACTO:",
    `- Email: ${KB.email}`,
    `- WhatsApp: ${KB.whatsapp}`,
    `- Respuesta en menos de ${KB.responseTime}`,
    "",
    "DIRECTRICES:",
    "- Si el usuario muestra interés en comprar, pide su nombre, email y empresa.",
    "- Si el usuario comparte su información, agradécele y confirma los datos recibidos.",
    "- Después de recolectar leads, sugiere agendar una reunión.",
    "- No inventes precios ni servicios. Usa solo la información proporcionada.",
    "- Sé proactivo: si identificas una necesidad, ofrece la solución adecuada.",
  ].join("\n");
}

function detectIntent(input: string): Intent {
  const lower = input.toLowerCase().trim();

  const patterns: [RegExp, Intent][] = [
    [/^(hola|buenas|buen[asd]|hey|saludos)/, "greeting"],
    [/(servicios|ofrece[n]?|hacen|soluciones|productos)/, "services"],
    [/(web|desarrollo web|aplicación|sitio)/, "service_detail"],
    [/(ia|inteligencia artificial|agente|chatbot|gpt|openai)/, "service_detail"],
    [/(automatizacion|automatización|automatizar|flujo|workflow)/, "service_detail"],
    [/(marketing|publicidad|anuncios|ads|redes sociales)/, "service_detail"],
    [/(precio|costo|cuanto cuesta|tarifa|presupuesto)/, "pricing"],
    [/(cotiz|presupuesto|quiero contratar|necesito|me interesa)/, "quote"],
    [/(contacto|email|correo|whatsapp|telefono|hablar|llamar)/, "contact"],
    [/(proceso|metodologia|como trabajan|etapas|pasantos)/, "process"],
    [/(tecnolog|stack|herramientas|lenguaje|framework)/, "technologies"],
    [/(gracias|graci|muchas gracias|excelente|perfecto)/, "thanks"],
    [/(reunion|reunión|agendar|calendly|cita|consultor)/, "meeting"],
  ];

  for (const [regex, intent] of patterns) {
    if (regex.test(lower)) return intent;
  }

  return "faq";
}

function generateResponse(input: string, history: ChatMessage[], intent: Intent): string {
  const lower = input.toLowerCase().trim();

  switch (intent) {
    case "greeting":
      return (
        "¡Hola! 👋 Soy **Nexus**, el asistente virtual de RA2P Labs.\n\n" +
        "Puedo ayudarte con:\n" +
        "• Información sobre nuestros servicios\n" +
        "• Precios y presupuestos\n" +
        "• Proceso de trabajo\n" +
        "• Tecnologías que usamos\n" +
        "• Cotizaciones personalizadas\n\n" +
        "¿En qué puedo ayudarte?"
      );

    case "services":
      return (
        "Ofrecemos **4 servicios principales**:\n\n" +
        KB.services
          .map((s) => `• **${s.name}** — ${s.description.split(".")[0]}.`)
          .join("\n") +
        "\n\n¿Sobre cuál te gustaría conocer más detalles?"
      );

    case "service_detail": {
      const matched = KB.services.find((s) =>
        s.keywords.some((k) => lower.includes(k)),
      );
      if (matched) {
        return (
          `**${matched.name}**\n\n${matched.description}\n\n` +
          "**Beneficios:**\n" +
          matched.benefits.map((b) => `• ${b}`).join("\n") +
          "\n\n**Tecnologías:** " +
          matched.tech.join(", ") +
          "\n\n¿Te gustaría solicitar una cotización para este servicio?"
        );
      }
      return (
        "Te recomiendo estos servicios según tu interés:\n\n" +
        KB.services
          .map((s) => `• **${s.name}** — ${s.description.split(".")[0]}.`)
          .join("\n") +
        "\n\n¿Cuál te gustaría explorar?"
      );
    }

    case "pricing":
      return (
        "Nuestros rangos de inversión son:\n\n" +
        `• **MVP / proyecto pequeño:** ${KB.prices.mvp}\n` +
        `• **Proyecto mediano:** ${KB.prices.medium}\n` +
        `• **Plataforma completa:** ${KB.prices.full}\n\n` +
        "Cada proyecto se cotiza de forma personalizada. ¿Quieres que te ayudemos con una cotización exacta?"
      );

    case "quote": {
      const leadInfo = extractLeadInfo(history);
      if (!leadInfo.name) {
        return (
          "¡Excelente! Para darte una cotización personalizada, necesito algunos datos:\n\n" +
          "1. ¿Cuál es tu **nombre**?\n" +
          "2. ¿Cuál es tu **correo electrónico**?\n" +
          "3. ¿Cuál es el nombre de tu **empresa**?\n\n" +
          "¿Me compartes esa información?"
        );
      }
      return (
        `Gracias ${leadInfo.name} 🙌 Ya tengo tus datos registrados.` +
        "\n\n¿Te gustaría **agendar una reunión** con nuestro equipo para recibir una cotización detallada y resolver todas tus dudas?"
      );
    }

    case "contact":
      return (
        "Puedes contactarnos por:\n\n" +
        `• **Email:** ${KB.email}\n` +
        `• **WhatsApp:** ${KB.whatsapp}\n` +
        `• **Formulario web:** Sección Contacto en nuestra página\n\n` +
        `Respondemos en menos de ${KB.responseTime}. ¿Hay algo más en lo que pueda ayudarte?`
      );

    case "process":
      return (
        "Nuestro proceso consta de **5 etapas**:\n\n" +
        KB.process.join("\n") +
        "\n\nEl tiempo total depende de la complejidad, pero un MVP puede estar listo en **4 semanas**."
      );

    case "technologies":
      return (
        "Trabajamos con un stack moderno y flexible:\n\n" +
        "**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n" +
        "**Backend:** Node.js, Python, PostgreSQL, MongoDB\n" +
        "**IA:** OpenAI, LangChain, TensorFlow, PyTorch\n" +
        "**Infra:** Docker, AWS, Vercel, Redis\n\n" +
        "¿Quieres saber más sobre alguna tecnología en particular?"
      );

    case "meeting":
      return (
        "¡Claro! Podemos agendar una reunión de **30 minutos** para conocerte y entender tu proyecto.\n\n" +
        "Mientras tanto, ¿me compartes tu **nombre**, **correo** y **empresa** para que nuestro equipo te contacte?"
      );

    case "thanks":
      return (
        "¡De nada! 😊 Si tienes más preguntas, aquí estoy.\n\n" +
        "También puedes:\n" +
        `• Visitarnos en **${KB.tagline}**\n` +
        `• Escribirnos al **WhatsApp**\n` +
        "¡Que tengas un excelente día!"
      );

    default: {
      const matchedFaq = KB.faq.find((f) =>
        f.q.toLowerCase().includes(lower) ||
        lower.includes(f.q.toLowerCase().slice(0, 8)),
      );
      if (matchedFaq) return matchedFaq.a;

      return (
        "Entiendo tu pregunta. Permíteme ayudarte:\n\n" +
        "Puedes consultarme sobre:\n" +
        "• **Servicios** — Desarrollo Web, IA, Automatización, Marketing Digital\n" +
        "• **Precios** — Rangos de inversión y cotizaciones\n" +
        "• **Proceso** — Cómo trabajamos y tiempos de entrega\n" +
        "• **Tecnologías** — Stack y herramientas\n" +
        "• **Contacto** — Cómo comunicarte con nosotros\n\n" +
        "¿Sobre cuál te gustaría saber más?"
      );
    }
  }
}

export function extractLeadInfo(history: ChatMessage[]): Partial<LeadInfo> {
  const allText = history
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");

  const emailMatch = allText.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  const phoneMatch = allText.match(/[\+\d][\d\s\-()]{7,15}/);

  return {
    email: emailMatch?.[0] || undefined,
    phone: phoneMatch?.[0]?.trim() || undefined,
  };
}

export function qualifyLead(history: ChatMessage[]): "hot" | "warm" | "cold" {
  const userMessages = history.filter((m) => m.role === "user");
  const text = userMessages.map((m) => m.content.toLowerCase()).join(" ");

  const buySignals = [
    "cotiz", "precio", "contratar", "presupuesto", "me interesa",
    "necesito", "quiero", "cuanto cuesta", "reunion", "reunión",
  ];
  const signalCount = buySignals.filter((s) => text.includes(s)).length;

  const leadInfo = extractLeadInfo(history);
  const hasContact = !!(leadInfo.email || leadInfo.phone);

  if (signalCount >= 2 && hasContact) return "hot";
  if (signalCount >= 1) return "warm";
  return "cold";
}

export function getSuggestedQuestions(history: ChatMessage[]): string[] {
  const userCount = history.filter((m) => m.role === "user").length;
  const leadInfo = extractLeadInfo(history);
  const qualification = qualifyLead(history);

  if (userCount === 0) {
    return [
      "¿Qué servicios ofrecen?",
      "¿Cuánto cuesta un proyecto?",
      "¿Cómo es el proceso de trabajo?",
    ];
  }

  if (qualification === "hot" && !leadInfo.name) {
    return [
      "Mi nombre es...",
      "Quiero agendar una reunión",
      "¿Qué sigue después de contratar?",
    ];
  }

  if (qualification === "hot") {
    return [
      "Quiero agendar una reunión",
      "¿Qué incluye el proceso?",
      "¿Tienen casos de éxito?",
    ];
  }

  const lastMessage = history[history.length - 1];
  if (lastMessage?.role === "assistant") {
    const lower = lastMessage.content.toLowerCase();
    if (lower.includes("servicio") || lower.includes("ofrecemos")) {
      return [
        "Cuéntame sobre Desarrollo Web",
        "¿Cómo funciona la IA?",
        "¿Qué automatizan?",
      ];
    }
    if (lower.includes("precio") || lower.includes("inversión")) {
      return [
        "Quiero una cotización",
        "¿Qué incluye el precio?",
        "¿Tienen planes de pago?",
      ];
    }
  }

  return [
    "¿Qué servicios ofrecen?",
    "¿Cuánto cuesta un proyecto?",
    "Quiero una cotización",
    "¿Cómo los contacto?",
  ];
}

const SYSTEM_PROMPT = buildSystemPrompt();

export async function getChatResponse(
  userMessage: string,
  history: ChatMessage[],
): Promise<string> {
  const openAiKey = process.env.OPENAI_API_KEY;

  if (openAiKey) {
    try {
      return await getOpenAIResponse(userMessage, history);
    } catch (err) {
      console.error("OpenAI error, falling back to mock:", err);
    }
  }

  await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
  const intent = detectIntent(userMessage);
  return generateResponse(userMessage, history, intent);
}

async function getOpenAIResponse(
  userMessage: string,
  history: ChatMessage[],
): Promise<string> {
  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return (data.choices?.[0]?.message?.content || "").trim();
}

export const GREETING_MESSAGE =
  "¡Hola! 👋 Soy **Nexus**, el asistente virtual de RA2P Labs. " +
  "Puedo ayudarte con información sobre servicios, precios, tecnologías y más. " +
  "¿En qué puedo ayudarte?";
