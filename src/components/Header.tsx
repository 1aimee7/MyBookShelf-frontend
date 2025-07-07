"use client";

import { useState, useEffect, useContext, useRef } from "react";
import Image from "next/image";
import { Search, ChevronDown, Clock, Calendar } from "lucide-react";
import { SearchContext } from "@/context/SearchContext";

const Header = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLangOpen, setLangOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [selectedLang, setSelectedLang] = useState("English");

  const filterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimeDate = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
      setCurrentDate(now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-"));
    };
    updateTimeDate(); // Set initial value
    const interval = setInterval(updateTimeDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = ["All", "Title", "Author", "Text", "Subjects"];
  const langOptions = ["Lang","English", "French", "Swahili"];

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white shadow-sm">
      {/* Search Bar Section */}
      <div ref={filterRef} className="relative flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm focus-within:ring-2 focus-within:ring-orange-400">
        <button
          onClick={() => setFilterOpen(!isFilterOpen)}
          className="flex items-center text-sm pr-2 border-r border-gray-300 text-gray-600 hover:text-black transition-colors"
        >
          {selectedCategory} <ChevronDown size={16} className="ml-1" />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full ml-2 focus:outline-none bg-transparent text-gray-800 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suppressHydrationWarning // Handle browser extension attributes
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
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="flex items-center space-x-4">
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!isLangOpen)}
              className="flex items-center text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm hover:bg-gray-100 transition-colors"
            >
              {selectedLang} <ChevronDown size={16} className="ml-1" />
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-28 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
                {langOptions.map((lang) => (
                  <button
                    key={lang}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm min-w-[100px]">
            <Clock size={16} className="mr-2 text-gray-500" /> {currentTime || "04:22 PM"}
          </div>
          <div className="flex items-center text-sm bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm min-w-[120px]">
            <Calendar size={16} className="mr-2 text-gray-500" /> {currentDate || "07-Jul-2025"}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100 transition-colors"
          >
            <Image
              src="/authors/steve-krug.jpg"
              alt="Kenson"
              width={24}
              height={24}
              className="rounded-full"
              suppressHydrationWarning // Handle browser extension attributes
            />
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-gray-800">Kenson</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-20">
              <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Profile</a>
              <a href="/favorite" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Favourite</a>
              <a href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">Payments</a>
              <hr className="my-1 border-gray-200" />
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;