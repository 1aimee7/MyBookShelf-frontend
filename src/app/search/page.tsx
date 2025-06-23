"use client";

import React, { useState } from "react";
import { Home, Search, BarChart3, Gift } from 'lucide-react';

export default function LibrarySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("Lang");

  // Static book data
  const books = [
    {
      id: 1,
      title: "Don't Make Me Think",
      author: "Steve Krug, 2000",
      rating: "4.5/5",
      category: "Computer Science, UX Design",
      availability: ["Hard Copy", "E-Book", "Audio book"],
      status: "In-Shelf",
      location: "CS-A-15",
      borrowedBy: "",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop"
    },
    {
      id: 2,
      title: "The Design of Everyday Things",
      author: "Don Norman, 1988",
      rating: "4.5/5",
      category: "Computer Science, UX Design",
      availability: ["Hard Copy", "E-Book", "Audio book"],
      status: "In-Shelf",
      location: "CS-A-15",
      borrowedBy: "",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki, 1997",
      rating: "4.5/5",
      category: "Financial MGMT",
      availability: ["Hard Copy", "E-Book", "Audio book"],
      status: "In-Shelf",
      location: "FM-B-12",
      borrowedBy: "",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Clean Code",
      author: "Robert C. Martin, 2008",
      rating: "4.7/5",
      category: "Computer Science, Programming",
      availability: ["Hard Copy", "E-Book"],
      status: "Borrowed",
      location: "CS-A-20",
      borrowedBy: "John Doe",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=150&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Atomic Habits",
      author: "James Clear, 2018",
      rating: "4.8/5",
      category: "Self Help, Psychology",
      availability: ["Hard Copy", "E-Book", "Audio book"],
      status: "In-Shelf",
      location: "SH-C-05",
      borrowedBy: "",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=200&fit=crop"
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }) + ' HRS';
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  return (
    <div className="relative min-h-screen flex p-6">
      
      {/* Background with exact SVG from image */}
      <div className="absolute inset-0 -z-10" style={{ background: "white" }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1078"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="paint0_linear_7_126" x1="533.5" y1="-250.046" x2="930.38" y2="1569.83" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FA7C54"/>
              <stop offset="1" stopColor="#EC2C5A"/>
            </linearGradient>
          </defs>
          <path d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z" fill="url(#paint0_linear_7_126)"/>
        </svg>
      </div>

      {/* Sidebar - White with border */}
      <div className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col">
        <div className="p-4 flex-1">
          <div className="border border-gray-300 rounded p-3 mb-8">
            <h2 className="text-lg font-bold text-gray-800">
              My <span className="text-orange-500">Book</span>
            </h2>
            <h2 className="text-lg font-bold text-gray-800">Shelf</h2>
          </div>
          
          <nav className="space-y-3">
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
              <Home size={16} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm">
              <Search size={16} />
              <span>Search</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
              <BarChart3 size={16} />
              <span>My Shelf</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm">
              <Gift size={16} />
              <span>Contribute</span>
            </a>
          </nav>
        </div>
        
        {/* Footer Section at the bottom of the sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2 text-gray-500 text-xs">
            <p className="cursor-pointer hover:text-gray-700 transition-colors">About</p>
            <p className="cursor-pointer hover:text-gray-700 transition-colors">Support</p>
            <p className="cursor-pointer hover:text-gray-700 transition-colors">Terms & Condition</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 text-black">
        {/* Header - Light gray background */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-xs"
              >
                <option value="All">All</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Financial">Financial</option>
                <option value="Self Help">Self Help</option>
              </select>
              
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-xs w-32"
              />
              
              <button className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs">
                🔍
              </button>
              
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-xs"
              >
                <option value="Lang">Lang</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
              
              <span className="text-xs text-gray-600">⏰ {getCurrentTime()}</span>
              
              <input 
                type="date" 
                defaultValue={getCurrentDate()}
                className="px-2 py-1 border border-gray-300 rounded text-xs bg-white"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-xs">Kenson</span>
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                K
              </div>
              <span className="text-gray-600 text-xs">▼</span>
            </div>
          </div>
        </div>

        {/* Browse Section */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <select className="px-2 py-1 border border-gray-300 rounded bg-white text-xs">
            <option>Browse</option>
            <option>Engineering</option>
            <option>Medical</option>
            <option>Arts & Science</option>
            <option>Architecture</option>
            <option>Law</option>
          </select>
        </div>

        {/* Book List */}
        <div className="p-4 bg-gray-50">
          <div className="bg-white rounded shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-700 text-xs font-medium">Title</th>
                  <th className="text-left px-4 py-2 text-gray-700 text-xs font-medium">Ratings</th>
                  <th className="text-left px-4 py-2 text-gray-700 text-xs font-medium">Category</th>
                  <th className="text-left px-4 py-2 text-gray-700 text-xs font-medium">Availability</th>
                  <th className="text-left px-4 py-2 text-gray-700 text-xs font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-8 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-xs">{book.title}</h3>
                          <p className="text-xs text-gray-500">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{book.rating}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-700">
                        <div className="font-medium">{book.category.split(',')[0]}</div>
                        <div className="text-gray-500">{book.category.split(',')[1]}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs">
                        {book.availability.map((format, index) => (
                          <div key={index} className="flex items-center space-x-1 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">{format}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            book.status === "In-Shelf"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {book.status}
                        </span>
                        {book.borrowedBy && (
                          <span className="text-xs text-gray-500">by {book.borrowedBy}</span>
                        )}
                        <span className="flex items-center text-xs text-gray-500">
                          📍 {book.location}
                        </span>
                        <button className="text-red-500 hover:text-red-700 text-xs">
                          ❤️
                        </button>
                        <button className="text-red-500 hover:text-red-700 text-xs">
                          Preview
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}