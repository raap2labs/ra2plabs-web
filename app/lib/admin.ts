export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  source: "chat" | "form" | "whatsapp";
  status: "new" | "contacted" | "qualified" | "lost";
  score: "hot" | "warm" | "cold";
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published: boolean;
  views: number;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  service: string;
  status: "active" | "completed" | "paused" | "planning";
  budget: number;
  progress: number;
  startDate: string;
  endDate: string | null;
}

export interface AnalyticsSummary {
  totalLeads: number;
  totalMessages: number;
  totalProjects: number;
  totalBlogPosts: number;
  leadsThisMonth: number;
  messagesThisMonth: number;
  conversionRate: number;
  avgResponseTime: string;
}

export function getAnalyticsSummary(): AnalyticsSummary {
  return {
    totalLeads: 48,
    totalMessages: 124,
    totalProjects: 12,
    totalBlogPosts: 6,
    leadsThisMonth: 7,
    messagesThisMonth: 18,
    conversionRate: 23,
    avgResponseTime: "3.2h",
  };
}

export function getLeads(): Lead[] {
  return [
    { id: "1", name: "Carlos Mendoza", email: "carlos@empresa.com", phone: "+503 6123 4567", company: "TechSolutions SV", service: "Desarrollo Web", source: "form", status: "new", score: "hot", createdAt: "2026-07-16T10:30:00Z" },
    { id: "2", name: "Ana Rodríguez", email: "ana@logistica.com", phone: "+503 7234 5678", company: "Logística SA", service: "Automatización", source: "chat", status: "contacted", score: "warm", createdAt: "2026-07-15T14:20:00Z" },
    { id: "3", name: "Roberto García", email: "roberto@consultoria.com", phone: "+503 6345 6789", company: "Consultoría GE", service: "IA", source: "whatsapp", status: "qualified", score: "hot", createdAt: "2026-07-14T09:15:00Z" },
    { id: "4", name: "María López", email: "maria@hoteles.com", phone: "+503 7456 7890", company: "Hoteles del Pacífico", service: "Marketing Digital", source: "form", status: "new", score: "warm", createdAt: "2026-07-13T16:45:00Z" },
    { id: "5", name: "José Hernández", email: "jose@fintech.io", phone: "+503 6567 8901", company: "FinTech Solutions", service: "Desarrollo Web", source: "chat", status: "lost", score: "cold", createdAt: "2026-07-12T11:00:00Z" },
    { id: "6", name: "Laura Martínez", email: "laura@salud.com", phone: "+503 7678 9012", company: "Salud Integral", service: "IA", source: "form", status: "contacted", score: "hot", createdAt: "2026-07-11T08:30:00Z" },
    { id: "7", name: "Pedro Sánchez", email: "pedro@comercio.com", phone: "+503 6789 0123", company: "Comercio Global", service: "Automatización", source: "whatsapp", status: "new", score: "warm", createdAt: "2026-07-10T13:10:00Z" },
    { id: "8", name: "Diana Torres", email: "diana@edu.com", phone: "+503 7890 1234", company: "EduTech", service: "Desarrollo Web", source: "form", status: "qualified", score: "hot", createdAt: "2026-07-09T15:25:00Z" },
  ];
}

export function getMessages(): Message[] {
  return [
    { id: "1", name: "Carlos Mendoza", email: "carlos@empresa.com", company: "TechSolutions SV", service: "Desarrollo Web", message: "Necesitamos una plataforma web para gestión de inventarios con reportes en tiempo real.", read: false, replied: false, createdAt: "2026-07-16T10:30:00Z" },
    { id: "2", name: "Ana Rodríguez", email: "ana@logistica.com", company: "Logística SA", service: "Automatización", message: "Buscamos automatizar el proceso de conciliación bancaria que actualmente toma 3 días.", read: true, replied: true, createdAt: "2026-07-15T14:20:00Z" },
    { id: "3", name: "María López", email: "maria@hoteles.com", company: "Hoteles del Pacífico", service: "Marketing Digital", message: "Queremos mejorar nuestra presencia en redes sociales con contenido automatizado.", read: false, replied: false, createdAt: "2026-07-13T16:45:00Z" },
    { id: "4", name: "Roberto García", email: "roberto@consultoria.com", company: "Consultoría GE", service: "IA", message: "Estamos interesados en implementar un chatbot con IA para atención al cliente.", read: true, replied: false, createdAt: "2026-07-14T09:15:00Z" },
    { id: "5", name: "Pedro Sánchez", email: "pedro@comercio.com", company: "Comercio Global", service: "Automatización", message: "Necesitamos automatizar el envío de facturas y reportes mensuales a clientes.", read: true, replied: true, createdAt: "2026-07-10T13:10:00Z" },
  ];
}

export function getBlogPosts(): BlogPost[] {
  return [
    { id: "1", title: "IA en el Desarrollo de Software", slug: "ia-transformando-desarrollo-software", excerpt: "Cómo la inteligencia artificial está transformando la forma en que desarrollamos software.", author: "Admin", published: true, views: 342, createdAt: "2026-07-01T08:00:00Z" },
    { id: "2", title: "Guía de Automatización de Procesos", slug: "automatizacion-procesos-guia-empresas", excerpt: "Guía completa para automatizar procesos empresariales.", author: "Admin", published: true, views: 285, createdAt: "2026-06-25T10:00:00Z" },
    { id: "3", title: "Next.js 16 Novedades", slug: "nextjs-16-novedades", excerpt: "Las novedades más importantes de Next.js 16.", author: "Admin", published: true, views: 156, createdAt: "2026-06-20T09:00:00Z" },
    { id: "4", title: "Machine Learning para PyMEs", slug: "machine-learning-pymes", excerpt: "Cómo las pequeñas empresas pueden aprovechar el machine learning.", author: "Admin", published: false, views: 0, createdAt: "2026-07-10T14:00:00Z" },
  ];
}

export function getProjects(): Project[] {
  return [
    { id: "1", name: "Portal de Inventarios", client: "TechSolutions SV", service: "Desarrollo Web", status: "active", budget: 8500, progress: 65, startDate: "2026-05-01", endDate: null },
    { id: "2", name: "Automatización Contable", client: "Logística SA", service: "Automatización", status: "active", budget: 6200, progress: 40, startDate: "2026-06-15", endDate: null },
    { id: "3", name: "Chatbot Atención Cliente", client: "Consultoría GE", service: "IA", status: "planning", budget: 4800, progress: 10, startDate: "2026-07-01", endDate: null },
    { id: "4", name: "Campaña Meta Ads", client: "Hoteles del Pacífico", service: "Marketing Digital", status: "completed", budget: 3200, progress: 100, startDate: "2026-04-01", endDate: "2026-06-30" },
    { id: "5", name: "App Financiera", client: "FinTech Solutions", service: "Desarrollo Web", status: "paused", budget: 12000, progress: 55, startDate: "2026-03-01", endDate: null },
  ];
}
