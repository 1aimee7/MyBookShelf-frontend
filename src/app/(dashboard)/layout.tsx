import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { SearchProvider } from '@/context/SearchContext'; // <-- Import the provider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)]">
        <Sidebar />
        
        {/* Wrap the main content area with the SearchProvider */}
        <SearchProvider>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </SearchProvider>

      </div>
    </div>
  );
}