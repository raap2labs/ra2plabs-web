export const SITE = {
  name: "RA2P Labs",
  tagline: "Innovación y Tecnología",
  description:
    "En RA2P Labs ayudamos a empresas a digitalizar procesos, automatizar tareas y desarrollar soluciones tecnológicas modernas con Inteligencia Artificial.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ra2plabs.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ceo@ra2plabs.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "68345701",
  foundingDate: "2024",
} as const;

export const NAV_LINKS = [
  { href: "/services", label: "Servicios" },
  { href: "/#nexus", label: "Nexus" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const SERVICES = [
  { value: "desarrollo-web", label: "Desarrollo Web" },
  { value: "ia", label: "Inteligencia Artificial" },
  { value: "automatizacion", label: "Automatización" },
  { value: "marketing-digital", label: "Marketing Digital" },
  { value: "otro", label: "Otro" },
] as const;

export const SECTION = {
  PADDING: "py-28 md:py-36",
  CONTAINER: "max-w-7xl mx-auto px-6",
} as const;

export interface ServicePageData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroGradient: string;
  heroIcon: string;
  benefits: { title: string; description: string }[];
  technologies: { name: string; category: string }[];
  faq: { question: string; answer: string }[];
  meta: { title: string; description: string };
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "web-development",
    title: "Desarrollo Web",
    subtitle: "Aplicaciones modernas que impulsan tu negocio",
    description:
      "Creamos aplicaciones web, sistemas empresariales y plataformas personalizadas con tecnologías de vanguardia. Desde sitios corporativos hasta plataformas complejas, cada proyecto se construye con estándares de calidad, rendimiento y seguridad.",
    heroGradient: "from-blue-600 to-cyan-600",
    heroIcon: "Code",
    benefits: [
      {
        title: "Aplicaciones a la medida",
        description: "Soluciones diseñadas específicamente para los procesos y necesidades de tu empresa, sin limitaciones de plantillas.",
      },
      {
        title: "Alto rendimiento",
        description: "Optimizamos cada aplicación para máxima velocidad, usando las mejores prácticas de rendimiento web y técnicas de caching avanzadas.",
      },
      {
        title: "Escalabilidad garantizada",
        description: "Arquitecturas preparadas para crecer contigo, desde cientos hasta millones de usuarios sin comprometer la experiencia.",
      },
      {
        title: "Seguridad integral",
        description: "Protegemos tu aplicación con las mejores prácticas de seguridad, autenticación robusta y cifrado de datos en tránsito y reposo.",
      },
      {
        title: "Integración continua",
        description: "Implementamos pipelines de CI/CD que aseguran despliegues rápidos, confiables y sin tiempo de inactividad.",
      },
      {
        title: "Soporte y evolución",
        description: "Acompañamos tu proyecto post-lanzamiento con mantenimiento, actualizaciones y nuevas funcionalidades continuas.",
      },
    ],
    technologies: [
      { name: "React", category: "Frontend" },
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Python", category: "Backend" },
      { name: "PostgreSQL", category: "Base de Datos" },
      { name: "MongoDB", category: "Base de Datos" },
      { name: "Redis", category: "Infraestructura" },
      { name: "Docker", category: "Infraestructura" },
      { name: "AWS", category: "Infraestructura" },
      { name: "Vercel", category: "Infraestructura" },
    ],
    faq: [
      {
        question: "¿Cuánto tiempo toma desarrollar una aplicación web?",
        answer: "Dependiendo de la complejidad, un proyecto puede tomar desde 4 semanas para un MVP hasta 12 semanas para una plataforma completa. Durante la fase de descubrimiento definimos un cronograma preciso.",
      },
      {
        question: "¿Ofrecen mantenimiento después del lanzamiento?",
        answer: "Sí, ofrecemos planes de mantenimiento continuo que incluyen actualizaciones de seguridad, optimización de rendimiento, nuevas funcionalidades y soporte técnico.",
      },
      {
        question: "¿Trabajan con tecnologías específicas o se adaptan?",
        answer: "Nos adaptamos a las necesidades del proyecto. Recomendamos tecnologías basadas en los requisitos, pero podemos trabajar con tu stack tecnológico existente.",
      },
      {
        question: "¿Cómo garantizan la calidad del código?",
        answer: "Seguimos prácticas de code review, pruebas automatizadas, integración continua y estándares de la industria. Cada entrega pasa por un riguroso control de calidad.",
      },
    ],
    meta: {
      title: "Desarrollo Web Profesional | RA2P Labs",
      description:
        "Creamos aplicaciones web modernas, sistemas empresariales y plataformas personalizadas. React, Next.js, Node.js. Calidad y rendimiento garantizados.",
    },
  },
  {
    slug: "artificial-intelligence",
    title: "Inteligencia Artificial",
    subtitle: "Agentes inteligentes que transforman tu negocio",
    description:
      "Implementamos soluciones de inteligencia artificial que automatizan decisiones, optimizan procesos y generan valor real. Desde asistentes virtuales hasta sistemas multi-agente, llevamos la IA a tu empresa.",
    heroGradient: "from-violet-600 to-blue-600",
    heroIcon: "Circuit",
    benefits: [
      {
        title: "Agentes de IA personalizados",
        description: "Creamos asistentes virtuales y agentes autónomos entrenados con el conocimiento de tu negocio para resolver tareas específicas.",
      },
      {
        title: "Automatización cognitiva",
        description: "Sistemas que aprenden de tus datos para tomar decisiones, clasificar información y ejecutar acciones sin intervención humana.",
      },
      {
        title: "Procesamiento de lenguaje natural",
        description: "Chatbots y asistentes que entienden y responden en lenguaje natural, integrados con WhatsApp, web y sistemas internos.",
      },
      {
        title: "Análisis predictivo",
        description: "Modelos que anticipan tendencias, comportamientos de clientes y patrones de negocio para tomar decisiones informadas.",
      },
      {
        title: "Integración con sistemas existentes",
        description: "Conectamos la IA con tus herramientas actuales: CRM, ERP, bases de datos y APIs para potenciar tu infraestructura.",
      },
      {
        title: "Escalabilidad inteligente",
        description: "Soluciones que crecen contigo, procesando desde cientos hasta millones de solicitudes con infraestructura cloud elástica.",
      },
    ],
    technologies: [
      { name: "OpenAI", category: "Modelos" },
      { name: "LangChain", category: "Modelos" },
      { name: "LlamaIndex", category: "Modelos" },
      { name: "Python", category: "Desarrollo" },
      { name: "TensorFlow", category: "Desarrollo" },
      { name: "PyTorch", category: "Desarrollo" },
      { name: "PostgreSQL", category: "Datos" },
      { name: "Redis", category: "Datos" },
      { name: "Docker", category: "Infraestructura" },
      { name: "AWS Bedrock", category: "Infraestructura" },
    ],
    faq: [
      {
        question: "¿Necesito grandes volúmenes de datos para implementar IA?",
        answer: "No necesariamente. Podemos trabajar con tus datos existentes y, en muchos casos, usar modelos pre-entrenados que se adaptan a tu caso de uso con datos mínimos.",
      },
      {
        question: "¿Cómo se integra la IA con mis sistemas actuales?",
        answer: "A través de APIs y webhooks. Diseñamos la integración para que la IA funcione como un conector más en tu ecosistema tecnológico.",
      },
      {
        question: "¿Qué tipo de problemas puede resolver la IA en mi empresa?",
        answer: "Desde atención al cliente automatizada, análisis de documentos, detección de fraudes, hasta optimización de inventarios y predicción de demanda.",
      },
      {
        question: "¿Cómo garantizan la precisión del modelo?",
        answer: "Implementamos ciclos de entrenamiento, validación y retroalimentación continua. Monitoreamos métricas de precisión y ajustamos el modelo según los resultados.",
      },
    ],
    meta: {
      title: "Inteligencia Artificial para Empresas | RA2P Labs",
      description:
        "Agentes de IA, asistentes virtuales, automatización cognitiva y análisis predictivo. Integramos IA en tu negocio para generar resultados reales.",
    },
  },
  {
    slug: "automation",
    title: "Automatización",
    subtitle: "Elimina tareas repetitivas, enfócate en crecer",
    description:
      "Automatizamos procesos empresariales para eliminar tareas repetitivas, reducir errores y liberar a tu equipo para actividades de alto valor. Integramos sistemas, orquestamos flujos y optimizamos operaciones.",
    heroGradient: "from-emerald-600 to-teal-600",
    heroIcon: "Gear",
    benefits: [
      {
        title: "Automatización de procesos",
        description: "Identificamos y automatizamos flujos de trabajo repetitivos, eliminando cuellos de botella y reduciendo tiempos de ejecución.",
      },
      {
        title: "Integración de sistemas",
        description: "Conectamos tus herramientas y plataformas existentes para que trabajen en conjunto sin intervención manual.",
      },
      {
        title: "Orquestación inteligente",
        description: "Coordinamos tareas complejas que involucran múltiples sistemas, decisiones condicionales y aprobaciones automatizadas.",
      },
      {
        title: "Notificaciones y alertas",
        description: "Sistemas de monitoreo que notifican automáticamente sobre eventos críticos, anomalías y cambios en tiempo real.",
      },
      {
        title: "Reportes automatizados",
        description: "Generación de informes periódicos con datos en vivo, sin intervención manual y con la frecuencia que necesites.",
      },
      {
        title: "Escalabilidad operativa",
        description: "Procesos que funcionan 24/7 sin supervisión, manejando volúmenes crecientes sin necesidad de contratar más personal.",
      },
    ],
    technologies: [
      { name: "n8n", category: "Orquestación" },
      { name: "Zapier", category: "Orquestación" },
      { name: "Make", category: "Orquestación" },
      { name: "Python", category: "Desarrollo" },
      { name: "Node.js", category: "Desarrollo" },
      { name: "PostgreSQL", category: "Datos" },
      { name: "Redis", category: "Datos" },
      { name: "Docker", category: "Infraestructura" },
      { name: "AWS Lambda", category: "Infraestructura" },
    ],
    faq: [
      {
        question: "¿Qué procesos se pueden automatizar?",
        answer: "Cualquier proceso repetitivo y basado en reglas: facturación, conciliación, reportes, notificaciones, aprobaciones, sincronización de datos y más.",
      },
      {
        question: "¿Es costoso implementar automatización?",
        answer: "La automatización tiene un ROI rápido. La mayoría de nuestros clientes recuperan la inversión en los primeros 3-6 meses gracias al ahorro en tiempo y reducción de errores.",
      },
      {
        question: "¿Necesito reemplazar mis sistemas actuales?",
        answer: "No. La automatización se integra con tus sistemas existentes. No necesitas cambiar tus herramientas, solo conectarlas de forma inteligente.",
      },
      {
        question: "¿Qué mantenimiento requiere la automatización?",
        answer: "Muy poco. Una vez implementada, la automatización funciona de forma autónoma. Realizamos ajustes periódicos para optimizar y adaptar los flujos.",
      },
    ],
    meta: {
      title: "Automatización de Procesos Empresariales | RA2P Labs",
      description:
        "Automatizamos procesos, integramos sistemas y orquestamos flujos de trabajo. Elimina tareas repetitivas y enfoca tu equipo en lo que importa.",
    },
  },
  {
    slug: "digital-marketing",
    title: "Marketing Digital",
    subtitle: "Campañas inteligentes impulsadas por IA",
    description:
      "Potenciamos tu presencia digital con estrategias de marketing automatizadas. Generamos contenido, optimizamos campañas y maximizamos resultados usando inteligencia artificial y datos en tiempo real.",
    heroGradient: "from-orange-600 to-rose-600",
    heroIcon: "Chart",
    benefits: [
      {
        title: "Contenido automatizado",
        description: "Generamos publicaciones, descripciones y copywriting para redes sociales y sitios web usando IA, manteniendo consistencia y calidad.",
      },
      {
        title: "Optimización de campañas",
        description: "Ajustamos automáticamente pujas, segmentación y presupuestos en Meta Ads y Google Ads para maximizar el ROI.",
      },
      {
        title: "Hashtags inteligentes",
        description: "Sistema que analiza tendencias y recomienda los hashtags más efectivos para maximizar el alcance orgánico.",
      },
      {
        title: "Analítica en tiempo real",
        description: "Dashboards que muestran el rendimiento de tus campañas al instante, con recomendaciones accionables basadas en datos.",
      },
      {
        title: "Multiplataforma",
        description: "Gestión unificada de campañas en Meta, Google, LinkedIn y más, desde un solo panel de control automatizado.",
      },
      {
        title: "Precios inteligentes",
        description: "Algoritmos que recomiendan precios óptimos basados en demanda, competencia y comportamiento del mercado.",
      },
    ],
    technologies: [
      { name: "Meta API", category: "Plataformas" },
      { name: "Google Ads", category: "Plataformas" },
      { name: "LinkedIn Ads", category: "Plataformas" },
      { name: "OpenAI", category: "IA" },
      { name: "LangChain", category: "IA" },
      { name: "Next.js", category: "Desarrollo" },
      { name: "Python", category: "Desarrollo" },
      { name: "PostgreSQL", category: "Datos" },
      { name: "Redis", category: "Datos" },
    ],
    faq: [
      {
        question: "¿Cómo se diferencia de una agencia de marketing tradicional?",
        answer: "Usamos IA para automatizar la creación de contenido, optimización de campañas y análisis de resultados. Esto permite mayor velocidad, precisión y escalabilidad a menor costo.",
      },
      {
        question: "¿Con qué plataformas trabajan?",
        answer: "Meta (Facebook e Instagram), Google Ads, LinkedIn Ads, TikTok y más. Gestionamos todo desde un sistema centralizado automatizado.",
      },
      {
        question: "¿Puedo mantener el control sobre las campañas?",
        answer: "Sí. Tú defines las estrategias y directrices. La IA ejecuta y optimiza, pero siempre mantienes el control sobre las decisiones importantes.",
      },
      {
        question: "¿En cuánto tiempo veo resultados?",
        answer: "Las campañas optimizadas con IA suelen mostrar mejoras en la primera semana. Resultados significativos en métricas como CPA y ROAS se ven en 2-4 semanas.",
      },
    ],
    meta: {
      title: "Marketing Digital con IA | RA2P Labs",
      description:
        "Campañas automatizadas, contenido generado por IA, optimización de anuncios y analítica en tiempo real. Maximiza tu inversión en marketing digital.",
    },
  },
];
