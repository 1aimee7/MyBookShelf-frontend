"use client";

// Import `useEffect` to safely handle time rendering
import { useState, useEffect, useContext } from 'react'; 
import Image from 'next/image';
import { Search, ChevronDown, Clock, Calendar } from 'lucide-react';
import { SearchContext } from '@/context/SearchContext'; 

const Header = () => {
  // Local state for the dropdowns
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get the shared state from the SearchContext
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  // State to safely render time/date on the client
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // This code runs only on the client, after the page is interactive
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    
    const day = String(now.getDate()).padStart(2, '0');
    // Using short month name like "Mar"
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = now.getFullYear();
    setCurrentDate(`${day}-${month}-${year}`);

  }, []); // Empty array ensures this runs only once on mount

  const filterOptions = ["All", "Title", "Author", "Text", "Subjects"];

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
      
      {/* Search Bar Section (You already had this part) */}
      <div className="relative flex items-center bg-white border rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm">
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
              <a key={opt} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); setSelectedCategory(opt); setFilterOpen(false); }}>
                {opt}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/*  THIS IS THE COMPLETED SECTION YOU ASKED FOR             */}
      {/* ========================================================= */}
      <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
        
        {/* The controls that are hidden on smaller screens */}
        <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm hover:bg-gray-100">Lang <ChevronDown size={16} className="ml-1" /></button>
            <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm min-w-[120px]">
              <Clock size={16} className="mr-2 text-gray-500" /> {currentTime || '...'}
            </div>
            <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm min-w-[140px]">
              <Calendar size={16} className="mr-2 text-gray-500" /> {currentDate || '...'}
            </div>
        </div>

        {/* The user profile dropdown */}
        <div className="relative">
          <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center bg-white border rounded-lg p-2 cursor-pointer shadow-sm hover:bg-gray-100">
            <Image src="/avatar.png" alt="Kenson" width={24} height={24} className="rounded-full" />
            <span className="hidden sm:inline ml-2 text-sm font-semibold">Kenson</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favourite</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Payments</a>
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