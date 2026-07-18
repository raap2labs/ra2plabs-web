"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { dict } = useLanguage();
  const nav = dict.nav as {
    services: string;
    nexus: string;
    process: string;
    contact: string;
    quote: string;
    openMenu: string;
    closeMenu: string;
  };
  const { lang } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = [
    { href: `/${lang}/services`, label: nav.services },
    { href: `/${lang}/#nexus`, label: nav.nexus },
    { href: `/${lang}/#proceso`, label: nav.process },
    { href: `/${lang}/#contacto`, label: nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${lang}`} data-analytics="nav_click" data-analytics-label="logo" aria-label="RA2P Labs - Inicio">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-analytics="nav_click"
                data-analytics-label={link.label}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href={`/${lang}/#contacto`}
            data-analytics="cta_click"
            data-analytics-label="navbar-cotizar"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-primary hover:bg-primary-hover rounded-lg transition-all duration-200"
          >
            {nav.quote}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-white/[0.04]">
          <ul className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-analytics="nav_click"
                  data-analytics-label={link.label}
                  onClick={() => setOpen(false)}
                  className="block text-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`/${lang}/#contacto`}
                data-analytics="cta_click"
                data-analytics-label="navbar-cotizar-mobile"
                onClick={() => setOpen(false)}
                className="block text-center px-5 py-3 bg-primary hover:bg-primary-hover rounded-lg font-medium transition-all duration-200"
              >
                {nav.quote}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
