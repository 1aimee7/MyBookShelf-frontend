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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar - fixed width */}
      <div className="w-64 h-screen fixed top-0 left-0 z-40">
        <SidebarAdmin />
      </div>

      {/* Main content area shifted right by sidebar width */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen overflow-hidden">
        <SearchProvider>
          {/* Header at top */}
          <div className="flex-shrink-0">
            <HeaderAdmin />
          </div>

          {/* Scrollable body content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            {children}
          </main>
        </SearchProvider>
      </div>
    </div>
  );
}
