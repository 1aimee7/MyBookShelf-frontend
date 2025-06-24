"use client";

import React, { useState } from "react";
import { Home, Search, BarChart3, Gift } from "lucide-react";
import { books } from "../../data/books"; // Your existing data and interface

export default function LibrarySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("Lang");
  const [favorites, setFavorites] = useState(new Set<number>()); // Track favorite book IDs
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Filter books, safe fallback for category (assumed to be string[])
  const filteredBooks = books.filter((book) => {
    const categoryList: string[] = (book as any).category ?? [];
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      categoryList.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const getCurrentTime = () => {
    const now = new Date("2025-06-24T09:34:00Z");
    return (
      now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }) + " HRS"
    );
  };

  const getCurrentDate = () => {
    const now = new Date("2025-06-24T09:34:00Z");
    return now.toISOString().split("T")[0];
  };

  const toggleFavorite = (bookId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="relative min-h-screen flex p-6">
      {/* Background with SVG */}
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

      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col">
        <div className="p-4 flex-1">
          <div className="border border-gray-300 rounded p-3 mb-8">
            <h2 className="text-lg font-bold text-gray-800">
              My <span className="text-orange-500">Book</span>
            </h2>
            <h2 className="text-lg font-bold text-gray-800">Shelf</h2>
          </div>

          <nav className="space-y-3">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              <Home size={16} />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
            >
              <Search size={16} />
              <span>Search</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              <BarChart3 size={16} />
              <span>My Shelf</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              <Gift size={16} />
              <span>Contribute</span>
            </a>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2 text-gray-500 text-xs">
            <p className="cursor-pointer hover:text-gray-700 transition-colors">About</p>
            <p className="cursor-pointer hover:text-gray-700 transition-colors">Support</p>
            <p className="cursor-pointer hover:text-gray-700 transition-colors">
              Terms & Condition
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 text-black">
        {/* Header */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-xs"
              >
                <option value="All">All</option>
                <option value="Title">Title</option>
                <option value="Author">Author</option>
                <option value="Text">Text</option>
                <option value="Subjects">Subjects</option>
              </select>

              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded bg-white text-xs w-32"
              />

              <button className="px-2 py-1 bg-gray-200 border border-gray-300 rounded text-xs">🔍</button>

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

            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="text-gray-700 text-xs">Kenson</span>
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">
                  K
                </div>
                <span className="text-gray-600 text-xs">▼</span>
              </div>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Favorite
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Payments
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
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
                {filteredBooks.map((book) => {
                  // Safe access to optional fields
                  const categoryList: string[] = (book as any).category ?? [];
                  const availability = (book as any).availability ?? "Unknown";
                  const status = (book as any).status ?? "Unknown";
                  const isInShelf = status === "In-Shelf";

                  return (
                    <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-8 h-12 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 text-xs">{book.title}</h3>
                            <p className="text-xs text-gray-500">
                              {book.author}, {book.year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{book.rating}/5</td>
                      <td className="px-4 py-3 text-xs text-gray-700">
                        {categoryList.length > 0 ? categoryList.join(", ") : "N/A"}
                      </td>
                      <td className="px-4 py-3 text-xs">{availability}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              isInShelf ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {status}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            📍 {/* Location logic if available */}
                          </span>
                          <button
                            className={`text-xs ${
                              favorites.has(book.id)
                                ? "text-red-500 hover:text-red-700"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => toggleFavorite(book.id)}
                          >
                            {favorites.has(book.id) ? "❤️" : "🤍"}
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 text-xs bg-gray-200 px-2 py-1 rounded"
                            onClick={() => (window.location.href = `/preview/${book.id}`)}
                          >
                            Preview
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
