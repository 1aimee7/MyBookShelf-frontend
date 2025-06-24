"use client";

import React, { useState } from "react";
import Image from "next/image";
import { books } from "../../../data/books";

export default function LibrarySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState(new Set<number>());

  const filteredBooks = books.filter((book) => {
    const categoryList: string[] = book.category ?? [];
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      categoryList.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
      );
    return matchesSearch && matchesCategory;
  });

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
      <div className="flex-1 bg-gray-50 text-black">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded mb-2 w-full"
        />

        {/* Category Dropdown */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded bg-white text-xs"
          >
            <option>All</option>
            <option>Engineering</option>
            <option>Medical</option>
            <option>Arts & Science</option>
            <option>Architecture</option>
            <option>Law</option>
          </select>
        </div>

        {/* Book List Table */}
        <div className="p-4 bg-gray-50">
          <div className="bg-white rounded shadow-sm overflow-x-auto">
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
                  const categoryList: string[] = book.category ?? [];
                  const availability = book.availability ?? "Unknown";
                  const status = book.status ?? "Unknown";
                  const isInShelf = status === "In-Shelf";

                  return (
                    <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={32}
                            height={48}
                            className="rounded object-cover"
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
                          <span className="flex items-center text-xs text-gray-500">📍</span>
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
