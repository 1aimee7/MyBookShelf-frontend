import SidebarAdmin from "@/components/sidebarAdmin";
import Header from "@/components/Header";

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <Header />
      <main className="ml-64 w-full min-h-screen p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
