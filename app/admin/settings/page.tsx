import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminSettings() {
  return (
    <>
      <AdminHeader title="Ajustes" />
      <div className="p-6 space-y-6">
        <section className="bg-surface border border-border rounded-xl p-6 max-w-2xl">
          <h2 className="text-base font-semibold mb-1">Perfil</h2>
          <p className="text-sm text-muted-foreground mb-6">Configuración de la cuenta de administrador.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Nombre</label>
              <input
                type="text"
                defaultValue="Admin"
                readOnly
                className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-not-allowed opacity-60"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
              <input
                type="email"
                defaultValue="admin@ra2plabs.com"
                readOnly
                className="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-sm text-foreground focus:outline-none cursor-not-allowed opacity-60"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 max-w-2xl">
          <h2 className="text-base font-semibold mb-1">Notificaciones</h2>
          <p className="text-sm text-muted-foreground mb-6">Configura qué notificaciones recibes.</p>
          <div className="space-y-4">
            {["Nuevos leads", "Nuevos mensajes", "Proyectos completados", "Alertas del sistema"].map((item) => (
              <label key={item} className="flex items-center justify-between">
                <span className="text-sm">{item}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border bg-surface-hover text-primary focus:ring-primary" />
              </label>
            ))}
          </div>
        </section>

        <section className="bg-surface border border-border rounded-xl p-6 max-w-2xl">
          <h2 className="text-base font-semibold mb-1">Seguridad</h2>
          <p className="text-sm text-muted-foreground mb-6">La autenticación estará disponible próximamente.</p>
          <div className="flex items-center gap-4 p-4 bg-surface-hover rounded-lg border border-border">
            <svg className="w-10 h-10 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <div>
              <p className="text-sm font-medium">Autenticación</p>
              <p className="text-xs text-muted-foreground">Próximamente: inicio de sesión con email y contraseña.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
