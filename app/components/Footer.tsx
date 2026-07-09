import Link from "next/link";
import Logo from "./Logo";
import { SITE, NAV_LINKS } from "../lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/">
              <Logo />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Transformamos empresas con software inteligente,
              automatización avanzada e inteligencia artificial.
              Tu socio tecnológico para el futuro digital.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-muted mb-5">Servicios</h4>
            <ul className="space-y-3">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-muted mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${SITE.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Solicitar Cotización
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
