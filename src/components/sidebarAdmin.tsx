"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Bookmark,
  MessageCircle,
  LogOut,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin-dashboard" },
  { label: "Manage Books", icon: BookOpen, href: "/admin/books" },
  { label: "Manage Users", icon: Users, href: "/managerUser" },
  { label: "Borrowed Books", icon: Bookmark, href: "/borrowedBooks" },
  { label: "Messages", icon: MessageCircle, href: "/admin/messages" },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm fixed left-0 top-0 z-20 hidden md:block">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
        📚 Admin Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={clsx(
                "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors text-black",
                {
                  "bg-blue-100 text-blue-700": isActive,
                  "hover:bg-gray-100 text-gray-700": !isActive,
                }
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 w-full px-4">
        <Link
          href="/logout"
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 rounded-md font-medium text-sm"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
