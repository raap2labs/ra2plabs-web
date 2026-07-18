import AdminHeader from "../../components/admin/AdminHeader";
import DataTable from "../../components/admin/DataTable";
import { getBlogPosts, type BlogPost } from "../../lib/admin";

export default function AdminBlog() {
  const posts = getBlogPosts();

  return (
    <>
      <AdminHeader title="Blog" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {posts.filter((p) => p.published).length} publicados · {posts.length} totales
          </p>
        </div>
        <DataTable<BlogPost>
          keyField="id"
          columns={[
            { header: "Título", key: "title", className: "font-medium" },
            { header: "Slug", key: "slug", render: (p) => <code className="text-xs text-muted-foreground">{p.slug}</code> },
            {
              header: "Estado",
              key: "published",
              render: (p) => (
                <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full border ${p.published ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                  {p.published ? "Publicado" : "Borrador"}
                </span>
              ),
            },
            { header: "Vistas", key: "views" },
            { header: "Autor", key: "author" },
            {
              header: "Fecha",
              key: "createdAt",
              render: (p) => new Date(p.createdAt).toLocaleDateString("es-MX"),
            },
          ]}
          data={posts}
        />
      </div>
    </>
  );
}
