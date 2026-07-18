import AdminHeader from "../components/admin/AdminHeader";
import DashboardCard from "../components/admin/DashboardCard";
import ChartPlaceholder from "../components/admin/ChartPlaceholder";
import {
  getAnalyticsSummary,
  getLeads,
  getMessages,
  getProjects,
  type Lead,
  type Message,
  type Project,
} from "../lib/admin";
import { Users, Mail, Briefcase, FileText, MessageCircle } from "../components/Icons";

const statusColor: Record<string, string> = {
  new: "text-blue-400",
  contacted: "text-yellow-400",
  qualified: "text-green-400",
  lost: "text-red-400",
  active: "text-green-400",
  completed: "text-blue-400",
  paused: "text-yellow-400",
  planning: "text-purple-400",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-MX", { day: "numeric", month: "short" });
}

export default function AdminDashboard() {
  const summary = getAnalyticsSummary();
  const leads = getLeads().slice(0, 4);
  const messages = getMessages().slice(0, 3);
  const projects = getProjects().slice(0, 3);

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Leads"
            value={summary.totalLeads}
            subtitle={`${summary.leadsThisMonth} este mes`}
            trend={{ value: "+12%", positive: true }}
            icon={<Users className="w-4 h-4" />}
          />
          <DashboardCard
            title="Mensajes"
            value={summary.totalMessages}
            subtitle={`${summary.messagesThisMonth} este mes`}
            trend={{ value: "+8%", positive: true }}
            icon={<Mail className="w-4 h-4" />}
          />
          <DashboardCard
            title="Proyectos"
            value={summary.totalProjects}
            subtitle="5 activos"
            icon={<Briefcase className="w-4 h-4" />}
          />
          <DashboardCard
            title="Blog Posts"
            value={summary.totalBlogPosts}
            subtitle="2 borradores"
            icon={<FileText className="w-4 h-4" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Leads por Mes" type="bar" />
          <ChartPlaceholder title="Conversión por Canal" type="pie" />
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4">Leads Recientes</h3>
            <div className="space-y-3">
              {leads.map((l: Lead) => (
                <div key={l.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.company}</p>
                  </div>
                  <span className={`text-xs font-medium ${statusColor[l.score] || "text-muted-foreground"}`}>
                    {l.score === "hot" ? "Caliente" : l.score === "warm" ? "Tibio" : "Frío"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4">Mensajes Recientes</h3>
            <div className="space-y-3">
              {messages.map((m: Message) => (
                <div key={m.id} className="flex items-start gap-3">
                  <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.message}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{formatDate(m.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4">Proyectos Activos</h3>
            <div className="space-y-4">
              {projects.map((p: Project) => (
                <div key={p.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <span className={`text-xs font-medium ${statusColor[p.status] || "text-muted-foreground"}`}>
                      {p.status === "active" ? "Activo" : p.status === "completed" ? "Completado" : p.status === "paused" ? "Pausado" : "Planeando"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{p.progress}% · ${p.budget.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
