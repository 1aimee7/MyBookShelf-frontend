"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Clock, Calendar } from 'lucide-react';

const Header = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterOptions = ["All", "Title", "Author", "Text", "Subjects"];

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
      <div className="relative flex items-center bg-white border rounded-lg p-2 w-full max-w-sm lg:max-w-md shadow-sm">
        <button
          onClick={() => setFilterOpen(!isFilterOpen)}
          className="flex items-center text-sm pr-2 border-r text-gray-600 hover:text-black"
        >
          {selectedCategory} <ChevronDown size={16} className="ml-1" />
        </button>
        <input type="text" placeholder="Search" className="w-full ml-2 focus:outline-none bg-transparent" />
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
      <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
        <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm hover:bg-gray-100">Lang <ChevronDown size={16} className="ml-1" /></button>
            <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm"><Clock size={16} className="mr-2 text-gray-500" /> 09:00 AM</div>
            <div className="flex items-center text-sm bg-white border rounded-lg p-2 shadow-sm"><Calendar size={16} className="mr-2 text-gray-500" /> 4-MAR-2023</div>
        </div>
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