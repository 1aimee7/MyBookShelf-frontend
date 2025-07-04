"use client";

import { useState, useContext, useEffect } from "react";
import { books } from "@/data/books";
import { SearchContext } from "@/context/SearchContext";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  const { searchTerm } = useContext(SearchContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteBooks");
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (bookId: number) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(bookId)) {
      updatedFavorites.delete(bookId);
    } else {
      updatedFavorites.add(bookId);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteBooks", JSON.stringify(Array.from(updatedFavorites)));
  };

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

  return (
    <div className="bg-gray-50 text-black">
      {/* Filter Header */}
      <div className="px-4 py-2 bg-white border-b border-gray-200 mb-4 rounded-lg shadow-sm">
        <label
          htmlFor="category-select"
          className="text-sm font-medium text-gray-700 mr-2"
        >
          Browse by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded bg-white text-sm"
        >
          <option>All</option>
          <option>Design</option>
          <option>Engineering</option>
          <option>Programming</option>
          <option>JavaScript</option>
          <option>UX</option>
          <option>Finance</option>
          <option>Religion</option>
          <option>Fiction</option>
        </select>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-gray-700 text-sm font-medium">Title</th>
              <th className="text-left px-4 py-3 text-gray-700 text-sm font-medium">Ratings</th>
              <th className="text-left px-4 py-3 text-gray-700 text-sm font-medium">Category</th>
              <th className="text-left px-4 py-3 text-gray-700 text-sm font-medium">Availability</th>
              <th className="text-left px-4 py-3 text-gray-700 text-sm font-medium">Actions</th>
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
                        className="w-8 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{book.title}</h3>
                        <p className="text-xs text-gray-500">{book.author}, {book.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{book.rating}/5</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{categoryList.join(", ")}</td>
                  <td className="px-4 py-3 text-sm">{availability}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isInShelf ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {status}
                      </span>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => toggleFavorite(book.id)}
                        title={favorites.has(book.id) ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        {favorites.has(book.id) ? "❤️" : "🤍"}
                      </button>
                      <Link 
                        href={`/preview/${book.id}`}
                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        Preview
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredBooks.length === 0 && (
          <div className="text-center text-sm text-gray-500 p-6">
            No books match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
