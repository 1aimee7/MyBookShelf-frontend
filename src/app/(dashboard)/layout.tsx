import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // This div creates the space around the white panel, letting the wallpaper show through.
    <div className="min-h-screen p-3 sm:p-4">
      
      {/* THE MAIN WHITE PANEL */}
      {/* This is the container for your entire dashboard UI.
          - It has a solid white background to cover the wallpaper.
          - It has a shadow to "lift" it off the page.
          - It's a flex container to hold the Sidebar and main content. */}
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)]">
        
        {/* The Sidebar component sits inside the white panel. */}
        <Sidebar />
        
        {/* This div wraps the Header and the main scrollable content. */}
        <div className="flex-1 flex flex-col">
          
          <Header />
          
          {/* This is the only part that scrolls. */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}