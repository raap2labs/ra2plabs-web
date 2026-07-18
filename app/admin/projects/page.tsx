import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import { getProjects, type Project } from "../../lib/admin";

const statusBadge: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paused: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  planning: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function AdminProjects() {
  const projects = getProjects();

  return (
    <>
      <AdminHeader title="Proyectos" />
      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-6">
          {projects.filter((p) => p.status === "active").length} activos · {projects.length} totales
        </p>
        <DataTable<Project>
          keyField="id"
          columns={[
            { header: "Nombre", key: "name", className: "font-medium" },
            { header: "Cliente", key: "client" },
            { header: "Servicio", key: "service" },
            {
              header: "Estado",
              key: "status",
              render: (p) => (
                <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full border ${statusBadge[p.status] || ""}`}>
                  {p.status === "active" ? "Activo" : p.status === "completed" ? "Completado" : p.status === "paused" ? "Pausado" : "Planeando"}
                </span>
              ),
            },
            {
              header: "Progreso",
              key: "progress",
              render: (p) => (
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-surface-hover rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{p.progress}%</span>
                </div>
              ),
            },
            {
              header: "Presupuesto",
              key: "budget",
              render: (p) => <span>${p.budget.toLocaleString()}</span>,
            },
            {
              header: "Inicio",
              key: "startDate",
              render: (p) => new Date(p.startDate).toLocaleDateString("es-MX"),
            },
          ]}
          data={projects}
        />
      </div>
    </>
  );
}
