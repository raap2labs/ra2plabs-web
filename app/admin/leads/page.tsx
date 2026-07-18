import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import { getLeads, type Lead } from "../../lib/admin";

const scoreBadge: Record<string, string> = {
  hot: "bg-red-500/10 text-red-400 border-red-500/20",
  warm: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  cold: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const statusBadge: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  qualified: "bg-green-500/10 text-green-400 border-green-500/20",
  lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminLeads() {
  const leads = getLeads();

  return (
    <>
      <AdminHeader title="Leads" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {leads.length} leads registrados
          </p>
        </div>
        <DataTable<Lead>
          keyField="id"
          columns={[
            { header: "Nombre", key: "name", className: "font-medium" },
            { header: "Email", key: "email" },
            { header: "Empresa", key: "company" },
            { header: "Servicio", key: "service" },
            {
              header: "Score",
              key: "score",
              render: (l) => (
                <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full border ${scoreBadge[l.score] || ""}`}>
                  {l.score === "hot" ? "Caliente" : l.score === "warm" ? "Tibio" : "Frío"}
                </span>
              ),
            },
            {
              header: "Estado",
              key: "status",
              render: (l) => (
                <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full border ${statusBadge[l.status] || ""}`}>
                  {l.status === "new" ? "Nuevo" : l.status === "contacted" ? "Contactado" : l.status === "qualified" ? "Calificado" : "Perdido"}
                </span>
              ),
            },
            {
              header: "Contactado",
              key: "createdAt",
              render: (l) => new Date(l.createdAt).toLocaleDateString("es-MX"),
            },
          ]}
          data={leads}
        />
      </div>
    </>
  );
}
