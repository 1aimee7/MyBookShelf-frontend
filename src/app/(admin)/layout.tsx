"use client";

import React from "react";
import SidebarAdmin from "@/components/sidebarAdmin";
import HeaderAdmin from "@/components/HeaderAdmin";
import { SearchProvider } from "@/context/SearchContext";

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-3 sm:p-4 bg-gray-100">
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)]">
        <SidebarAdmin />

        {/* Content area pushed right with margin-left equal to sidebar width (w-64 = 16rem = 256px) */}
        <SearchProvider>
          <div className="flex flex-col ml-64">  
            <HeaderAdmin />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
              {children}
            </main>
          </div>
        </SearchProvider>
      </div>
    </div>
  );
}
