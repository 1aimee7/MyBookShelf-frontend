"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("Admin");
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.username) {
          setUsername(user.username);
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }

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
    console.log("Search term:", e.target.value);
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/auth/login");
  };

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white text-black shadow-sm">
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

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <MessageSquare size={20} className="text-black" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
              {getInitial(username)}
            </div>
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-black">
              {username}
            </span>
            <ChevronDown size={16} className="ml-1 text-black" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
              <a
                href="/accountAdmin"
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
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
