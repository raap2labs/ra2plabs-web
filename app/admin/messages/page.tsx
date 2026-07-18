import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import { getMessages, type Message } from "../../lib/admin";

export default function AdminMessages() {
  const messages = getMessages();

  return (
    <>
      <AdminHeader title="Mensajes" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {messages.filter((m) => !m.read).length} sin leer · {messages.length} totales
          </p>
        </div>
        <DataTable<Message>
          keyField="id"
          columns={[
            {
              header: "",
              key: "read",
              className: "w-8",
              render: (m) => !m.read && <span className="inline-block w-2 h-2 bg-primary rounded-full" />,
            },
            { header: "Nombre", key: "name", className: "font-medium" },
            { header: "Email", key: "email" },
            { header: "Empresa", key: "company" },
            { header: "Servicio", key: "service" },
            {
              header: "Mensaje",
              key: "message",
              render: (m) => (
                <span className="block max-w-[240px] truncate text-muted-foreground">
                  {m.message}
                </span>
              ),
            },
            {
              header: "Respondido",
              key: "replied",
              render: (m) => (
                <span className={m.replied ? "text-green-400" : "text-muted-foreground"}>
                  {m.replied ? "Sí" : "No"}
                </span>
              ),
            },
            {
              header: "Fecha",
              key: "createdAt",
              render: (m) => new Date(m.createdAt).toLocaleDateString("es-MX"),
            },
          ]}
          data={messages}
        />
      </div>
    </>
  );
}
