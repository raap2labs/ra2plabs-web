import { headers } from "next/headers";
import AdminSidebar from "../components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const pathname = hdrs.get("x-invoke-path") || "";
  const isAuth = pathname === "/admin/auth";

  if (isAuth) return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
