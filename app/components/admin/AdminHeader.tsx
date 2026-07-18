"use client";

import { useState } from "react";
import { Bell, LogOut, Menu, XClose } from "../Icons";

interface AdminHeaderProps {
  title: string;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface-hover"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <XClose className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface-hover"
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-surface-hover"
            aria-label="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
