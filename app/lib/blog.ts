export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: { name: string; role: string };
  date: string;
  tags: string[];
  featured: boolean;
  coverGradient: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: { name: string; role: string };
  date: string;
  tags: string[];
  featured: boolean;
  coverGradient: string;
  readingTime: number;
}

function computeReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    date: post.date,
    tags: post.tags,
    featured: post.featured,
    coverGradient: post.coverGradient,
    readingTime: computeReadingTime(post.content),
  };
}

const posts: BlogPost[] = [
  {
    slug: "ia-transformando-desarrollo-software",
    title: "Cómo la IA está transformando el desarrollo de software",
    excerpt:
      "La inteligencia artificial está revolucionando la forma en que creamos software. Descubre cómo los agentes de IA, la generación de código automatizada y las herramientas inteligentes están cambiando la industria.",
    content: `
      <p>La inteligencia artificial ha dejado de ser una promesa futurista para convertirse en una herramienta tangible que está transformando cada aspecto del desarrollo de software. Desde la generación automática de código hasta la depuración inteligente, los desarrolladores hoy cuentan con asistentes que multiplican su productividad.</p>

      <h3>Generación de código con IA</h3>
      <p>Herramientas como GitHub Copilot, Cursor y otros asistentes basados en modelos de lenguaje han demostrado que la IA puede escribir código funcional, reducir errores comunes y acelerar significativamente los tiempos de desarrollo. Estudios recientes muestran que los desarrolladores que usan estas herramientas completan tareas hasta un 55% más rápido.</p>

      <h3>Pruebas automatizadas inteligentes</h3>
      <p>La IA está revolucionando las pruebas de software. Los sistemas modernos pueden generar casos de prueba automáticamente, identificar edge cases que los humanos pasarían por alto y predecir qué partes del código tienen más probabilidades de contener errores.</p>

      <h3>Mantenimiento predictivo</h3>
      <p>Los sistemas de IA pueden analizar logs, métricas de rendimiento y patrones de uso para predecir fallos antes de que ocurran. Esto permite a los equipos de desarrollo abordar problemas proactivamente, reduciendo el tiempo de inactividad y mejorando la experiencia del usuario.</p>

      <p>En RA2P Labs integramos estas capacidades en cada proyecto, combinando la experiencia humana con el poder de la IA para entregar soluciones más rápidas, seguras y confiables.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de Innovación" },
    date: "2026-06-15",
    tags: ["Inteligencia Artificial", "Desarrollo", "Tecnología"],
    featured: true,
    coverGradient: "from-violet-600 to-blue-600",
  },
  {
    slug: "automatizacion-procesos-guia-empresas",
    title: "Automatización de procesos: guía completa para empresas",
    excerpt:
      "Una guía práctica para entender cómo la automatización puede transformar tus operaciones, reducir costos y liberar a tu equipo para tareas de alto valor.",
    content: `
      <p>La automatización de procesos empresariales ya no es un lujo reservado para grandes corporaciones. Hoy, cualquier empresa puede implementar soluciones de automatización que generen un retorno de inversión significativo en cuestión de semanas.</p>

      <h3>¿Qué procesos se pueden automatizar?</h3>
      <p>Prácticamente cualquier tarea repetitiva y basada en reglas: facturación, conciliación bancaria, generación de reportes, notificaciones, aprobaciones, sincronización de datos entre sistemas y mucho más. La clave está en identificar procesos que consumen tiempo valioso de tu equipo y tienen un flujo definido.</p>

      <h3>Beneficios inmediatos</h3>
      <p>Las empresas que automatizan reportan una reducción de hasta 80% en el tiempo de ejecución de procesos, eliminación de errores humanos, y la capacidad de operar 24/7 sin supervisión. Además, los equipos pueden enfocarse en actividades estratégicas que generan mayor valor.</p>

      <h3>Cómo empezar</h3>
      <p>Recomendamos comenzar con un proceso piloto de bajo riesgo, medir los resultados y escalar gradualmente. Herramientas como n8n, Make y soluciones personalizadas permiten crear flujos de automatización robustos sin necesidad de reemplazar tus sistemas existentes.</p>

      <p>En RA2P Labs diseñamos e implementamos soluciones de automatización a la medida, integrando tus herramientas actuales y maximizando el retorno de inversión desde el primer mes.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de Automatización" },
    date: "2026-05-28",
    tags: ["Automatización", "Empresas", "Productividad"],
    featured: false,
    coverGradient: "from-emerald-600 to-teal-600",
  },
  {
    slug: "nextjs-16-novedades",
    title: "Next.js 16: lo que necesitas saber",
    excerpt:
      "Exploramos las características más importantes de Next.js 16 y cómo aprovecharlas para construir aplicaciones web más rápidas y eficientes.",
    content: `
      <p>Next.js 16 trae consigo mejoras significativas en rendimiento, experiencia de desarrollo y nuevas APIs que facilitan la construcción de aplicaciones web modernas. En este artículo exploramos las novedades más relevantes.</p>

      <h3>Turbopack como bundler predeterminado</h3>
      <p>Next.js 16 integra Turbopack como el bundler predeterminado, ofreciendo tiempos de compilación y recarga en caliente significativamente más rápidos. Los desarrolladores experimentan un inicio de servidor hasta 10 veces más rápido y actualizaciones de código instantáneas.</p>

      <h3>Server Actions mejoradas</h3>
      <p>Las Server Actions se han estabilizado y ahora ofrecen una integración más profunda con formularios, manejo de errores y revalidación de datos. Esto simplifica enormemente la construcción de aplicaciones que requieren interacción con el servidor.</p>

      <h3>Optimizaciones de imágenes y fuentes</h3>
      <p>El nuevo sistema de optimización de imágenes ofrece mejor compresión y formatos modernos como AVIF. Las fuentes variables ahora se cargan de manera más eficiente, mejorando las métricas de rendimiento web.</p>

      <p>En RA2P Labs adoptamos Next.js 16 como nuestro framework principal para desarrollo web, aprovechando estas mejoras para entregar aplicaciones más rápidas y con mejor experiencia de usuario.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de Desarrollo" },
    date: "2026-05-10",
    tags: ["Next.js", "Desarrollo", "Frontend"],
    featured: false,
    coverGradient: "from-blue-600 to-cyan-600",
  },
  {
    slug: "por-que-tu-empresa-necesita-agente-ia",
    title: "Por qué tu empresa necesita un agente de IA",
    excerpt:
      "Los agentes de IA están redefiniendo la eficiencia empresarial. Conoce cómo funcionan, qué problemas resuelven y por qué tu competencia ya los está usando.",
    content: `
      <p>Los agentes de inteligencia artificial representan la evolución más reciente en automatización inteligente. A diferencia de los chatbots tradicionales, estos agentes pueden ejecutar acciones complejas, tomar decisiones autónomas y aprender de sus interacciones.</p>

      <h3>¿Qué es un agente de IA?</h3>
      <p>Un agente de IA es un sistema que combina modelos de lenguaje con capacidades de razonamiento y ejecución. Puede entender instrucciones en lenguaje natural, planificar una secuencia de acciones, ejecutarlas utilizando herramientas y APIs, y aprender de los resultados.</p>

      <h3>Aplicaciones prácticas</h3>
      <p>Atención al cliente automatizada que resuelve problemas complejos sin intervención humana, asistentes de ventas que califican leads y programan reuniones, sistemas de soporte técnico que diagnostican y resuelven incidencias, y agentes de análisis que generan reportes inteligentes.</p>

      <h3>Retorno de inversión</h3>
      <p>Las empresas que implementan agentes de IA reportan reducciones de hasta 70% en costos operativos, mejora en tiempos de respuesta y satisfacción del cliente, y la capacidad de escalar su operación sin incrementar su plantilla.</p>

      <p>En RA2P Labs desarrollamos agentes de IA personalizados para cada negocio, entrenados con el conocimiento específico de tu empresa y listos para integrarse con tus sistemas actuales.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de IA" },
    date: "2026-04-20",
    tags: ["Inteligencia Artificial", "Agentes IA", "Negocios"],
    featured: false,
    coverGradient: "from-purple-600 to-pink-600",
  },
  {
    slug: "marketing-digital-con-ia-casos-reales",
    title: "Marketing digital con IA: casos reales",
    excerpt:
      "Descubre cómo empresas están usando inteligencia artificial para transformar sus campañas de marketing, generar contenido y maximizar su inversión publicitaria.",
    content: `
      <p>La inteligencia artificial está revolucionando el marketing digital. Desde la generación automática de contenido hasta la optimización en tiempo real de campañas publicitarias, las empresas que adoptan estas tecnologías están obteniendo ventajas competitivas significativas.</p>

      <h3>Generación de contenido automatizada</h3>
      <p>Una agencia de marketing implementó nuestro sistema de generación de contenido con IA y pasó de producir 10 publicaciones semanales a más de 100, manteniendo la calidad y consistencia de marca. El tiempo de producción se redujo en un 80%.</p>

      <h3>Optimización de campañas en tiempo real</h3>
      <p>Una tienda en línea integró nuestro agente de optimización de Meta Ads, que ajusta automáticamente pujas, segmentación y creatividades basándose en el rendimiento en tiempo real. El costo por adquisición se redujo en un 45% en las primeras tres semanas.</p>

      <h3>Análisis predictivo de tendencias</h3>
      <p>Una marca de moda utiliza nuestro sistema de análisis predictivo para identificar tendencias emergentes antes que su competencia. Esto les permite ajustar su estrategia de contenido y campañas con semanas de anticipación.</p>

      <p>El marketing digital con IA no es el futuro, es el presente. En RA2P Labs te ayudamos a implementar estas soluciones en tu empresa para maximizar el retorno de tu inversión en marketing.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de Marketing" },
    date: "2026-04-05",
    tags: ["Marketing Digital", "IA", "Casos de Éxito"],
    featured: false,
    coverGradient: "from-orange-600 to-rose-600",
  },
  {
    slug: "desarrollo-web-2026-tendencias",
    title: "Desarrollo web en 2026: tendencias y tecnologías",
    excerpt:
      "Un análisis de las tendencias que están definiendo el desarrollo web en 2026: frameworks, herramientas, arquitecturas y mejores prácticas.",
    content: `
      <p>El desarrollo web continúa evolucionando a un ritmo acelerado. 2026 trae consigo maduración de tecnologías, nuevos paradigmas de arquitectura y herramientas que prometen hacer el desarrollo más eficiente que nunca.</p>

      <h3>Frameworks full-stack</h3>
      <p>Next.js, Remix y Astro lideran el ecosistema, ofreciendo experiencias de desarrollo integradas que combinan renderizado del lado del servidor, generación estática y funciones serverless en un solo proyecto. El enfoque en el rendimiento y la experiencia del desarrollador es el diferenciador clave.</p>

      <h3>Arquitecturas híbridas</h3>
      <p>La combinación de SSR, SSG e ISR permite construir aplicaciones que cargan instantáneamente pero mantienen contenido dinámico y actualizado. Las arquitecturas híbridas son ahora el estándar para aplicaciones web modernas.</p>

      <h3>Rendimiento como requisito</h3>
      <p>Core Web Vitals y las métricas de rendimiento son ahora factores críticos para el SEO y la experiencia del usuario. Las herramientas de medición y optimización se han vuelto más sofisticadas, permitiendo identificar y resolver cuellos de botella con precisión.</p>

      <p>En RA2P Labs nos mantenemos a la vanguardia de estas tendencias, aplicando las mejores prácticas y tecnologías más adecuadas para cada proyecto.</p>
    `,
    author: { name: "RA2P Labs", role: "Equipo de Desarrollo" },
    date: "2026-03-15",
    tags: ["Desarrollo Web", "Tendencias", "Tecnología"],
    featured: false,
    coverGradient: "from-sky-600 to-indigo-600",
  },
];

export function getAllPosts(): BlogPostMeta[] {
  return posts.map(toMeta).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPost(): BlogPostMeta | null {
  const featured = posts.find((p) => p.featured);
  return featured ? toMeta(featured) : null;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
