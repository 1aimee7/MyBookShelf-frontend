"use client";

import { useState, useEffect, useContext, useRef } from 'react'; 
import Image from 'next/image';
import { Search, ChevronDown, Clock, Calendar } from 'lucide-react';
import { SearchContext } from '@/context/SearchContext'; 

const Header = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const filterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = now.getFullYear();
    setCurrentDate(`${day}-${month}-${year}`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = ["All", "Title", "Author", "Text", "Subjects"];

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 text-black">
      
      {/* Search Bar Section */}
      <div ref={filterRef} className="relative flex items-center bg-white border rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm">
        <button
          onClick={() => setFilterOpen(!isFilterOpen)}
          className="flex items-center text-sm pr-2 border-r text-gray-600 hover:text-black"
        >
          {selectedCategory} <ChevronDown size={16} className="ml-1" />
        </button>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full ml-2 focus:outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-400 cursor-pointer" />
        {isFilterOpen && (
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-20">
            {filterOptions.map(opt => (
              <button key={opt}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
      <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm hover:bg-gray-100">
            Lang <ChevronDown size={16} className="ml-1" />
          </button>
          <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm min-w-[120px]">
            <Clock size={16} className="mr-2 text-gray-500" /> {currentTime || '...'}
          </div>
          <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm min-w-[140px]">
            <Calendar size={16} className="mr-2 text-gray-500" /> {currentDate || '...'}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center bg-white border rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100">
            <Image src="/authors/steve-krug.jpg" alt="Kenson" width={24} height={24} className="rounded-full" />
            <span className="hidden sm:inline ml-2 text-sm font-semibold">Kenson</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
              <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/favorite" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favourite</a>
              <a href="/payment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Payments</a>
              <hr className="my-1"/>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

