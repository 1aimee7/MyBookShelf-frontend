import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | My Book Shelf',
  description: 'Your personal bookshelf and library management.',
};

// THIS IS THE CRUCIAL LINE THAT MUST BE CORRECT
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. THE GRAY "DESKTOP" BACKGROUND
    <div className="bg-gray-100 min-h-screen p-3 sm:p-4 md:p-5">
      
      {/* 2. THE ORANGE TOP BORDER */}
      <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-t-2xl" />

      {/* 3. THE MAIN WHITE PANEL */}
      <div className="flex bg-white rounded-b-2xl shadow-2xl overflow-hidden h-[calc(100vh-2.5rem)] md:h-[calc(100vh-3.25rem)]">

        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}