import SidebarAdmin from "@/components/sidebarAdmin";

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="ml-64 w-full min-h-screen p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
