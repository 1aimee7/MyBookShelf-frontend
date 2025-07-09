"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, MessageSquare, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Implement search logic here, e.g., update context or trigger API call
    console.log("Search term:", e.target.value);
  };

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white text-black shadow-sm">
      {/* Search Bar */}
      <div className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
        <Search className="text-black mr-2" size={20} />
        <input
          type="text"
          placeholder="Search users, books, or borrowed items..."
          className="w-full focus:outline-none bg-transparent text-black placeholder-black"
          value={searchTerm}
          onChange={handleSearch}
          suppressHydrationWarning
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Message Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <MessageSquare size={20} className="text-black" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
          >
            <Image
              src="/authors/admin-placeholder.jpg"
              alt="Admin"
              width={24}
              height={24}
              className="rounded-full"
              suppressHydrationWarning
            />
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-black">Admin</span>
            <ChevronDown size={16} className="ml-1 text-black" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
              <a
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
              >
                Profile
              </a>
              <a
                href="/admin/settings"
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
              >
                Settings
              </a>
              <hr className="my-1 border-gray-200" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}