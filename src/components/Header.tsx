"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { Search, ChevronDown, Clock, Calendar } from "lucide-react";

// Dummy SearchContext for standalone usage
const SearchContext = React.createContext({
  searchTerm: "",
  // --- FIX IS HERE ---
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSearchTerm: (_term: string) => {},
});

const Header = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [name, setName] = useState("Guest");

  const filterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData?.user?.name) {
          setName(parsedData.user.name);
        } else {
          setName("Guest");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        setName("Guest");
      }
    }

    const updateTimeDate = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
      setCurrentDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-"));
    };
    updateTimeDate();
    const interval = setInterval(updateTimeDate, 60000);

    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterOptions = ["All", "Title", "Author", "Text", "Subjects"];

  const getInitial = (currentName: string) => {
    return currentName ? currentName.charAt(0).toUpperCase() : "G";
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/auth/login";
  };

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white text-black shadow-sm">
      <div ref={filterRef} className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
        <button
          onClick={() => setFilterOpen(!isFilterOpen)}
          className="flex items-center text-sm pr-2 border-r border-gray-300 text-gray-600 hover:text-black transition-colors"
          type="button"
        >
          {selectedCategory} <ChevronDown size={16} className="ml-1" />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full ml-2 focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suppressHydrationWarning
        />
        <Search className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
        {isFilterOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setSelectedCategory(opt);
                  setFilterOpen(false);
                }}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm min-w-[100px]">
            <Clock size={16} className="mr-2 text-gray-500" /> {currentTime}
          </div>
          <div className="hidden lg:flex items-center text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm min-w-[120px]">
            <Calendar size={16} className="mr-2 text-gray-500" /> {currentDate}
          </div>
        </div>
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
            type="button"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
              {getInitial(name)}
            </div>
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-gray-800">
              {name}
            </span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
              <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile</a>
              <a href="/favorite" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Favourite</a>
              <a href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Payments</a>
              <hr className="my-1 border-gray-200" />
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;