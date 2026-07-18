import AdminHeader from "../../components/admin/AdminHeader";
import DashboardCard from "../../components/admin/DashboardCard";
import ChartPlaceholder from "../../components/admin/ChartPlaceholder";
import { getAnalyticsSummary } from "../../lib/admin";
import { Trending, Users, MessageCircle, Clock } from "../../components/Icons";

export default function AdminAnalytics() {
  const summary = getAnalyticsSummary();

  return (
    <>
      <AdminHeader title="Analíticas" />
      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Tasa de Conversión" value={`${summary.conversionRate}%`} trend={{ value: "+5%", positive: true }} icon={<Trending className="w-4 h-4" />} />
          <DashboardCard title="Leads por Mes" value={summary.leadsThisMonth} subtitle={+summary.leadsThisMonth > 5 ? "Alto volumen" : "Volumen normal"} icon={<Users className="w-4 h-4" />} />
          <DashboardCard title="Mensajes por Mes" value={summary.messagesThisMonth} subtitle="Requiere atención" icon={<MessageCircle className="w-4 h-4" />} />
          <DashboardCard title="Respuesta Promedio" value={summary.avgResponseTime} subtitle="Tiempo de respuesta" icon={<Clock className="w-4 h-4" />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Leads por Canal" type="bar" height={300} />
          <ChartPlaceholder title="Proyectos por Servicio" type="pie" height={300} />
        </div>

        <ChartPlaceholder title="Mensajes y Leads (Últimos 30 Días)" type="line" height={280} />
      </div>
    </>
  );
}
