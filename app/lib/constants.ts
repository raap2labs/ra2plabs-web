export const SITE = {
  name: "RA2P Labs",
  tagline: "Innovación y Tecnología",
  description:
    "En RA2P Labs ayudamos a empresas a digitalizar procesos, automatizar tareas y desarrollar soluciones tecnológicas modernas con Inteligencia Artificial.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ra2plabs.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ceo@ra2plabs.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+503 68345701",
  foundingDate: "2024",
} as const;

export const NAV_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#marketplace", label: "Marketplace" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const SECTION = {
  PADDING: "py-28 md:py-36",
  CONTAINER: "max-w-7xl mx-auto px-6",
} as const;
