"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft } from "lucide-react";
import { books } from "@/data/books";
import Image from "next/image";
import Link from "next/link";

export default function Favorite() {
  const router = useRouter();
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteBooks");
    if (savedFavorites) {
      setFavoriteBooks(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const toggleFavorite = (bookId: number) => {
    setFavoriteBooks((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId];
      localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const getFavoriteBooks = () => {
    return books.filter((book) => favoriteBooks.includes(book.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
      <div className="flex-1 p-4 sm:p-6">
        {/* Back Button */}
        <div className="mb-4">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Your Favourite</h1>

        {/* Favorites Table */}
        {getFavoriteBooks().length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-25">
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-4">Title</div>
              <div className="col-span-2">Ratings</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-4">Actions</div>
            </div>

            {/* Book List */}
            <div className="divide-y divide-gray-200">
              {getFavoriteBooks().map((book) => (
                <div
                  key={book.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                >
                  {/* Title */}
                  <div className="sm:col-span-4 flex items-center space-x-3">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={48}
                      height={64}
                      className="rounded object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/48x64/ff6b35/ffffff?text=${encodeURIComponent(
                          book.title
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                        )}`;
                      }}
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">{book.title}</h4>
                      <p className="text-sm text-gray-600">
                        {book.author}, {book.year}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="sm:col-span-2 flex items-center text-sm ml-3">
                    <span className="mr-2 font-medium">{book.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        ></span>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div className="sm:col-span-2 text-sm font-medium text-gray-800 ml-1">
                    {book.category?.join(", ") || "No Category"}
                  </div>

                  {/* Actions (Favorite + Preview) */}
                  <div className="sm:col-span-4 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleFavorite(book.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart
                            size={18}
                            fill={
                              favoriteBooks.includes(book.id) ? "currentColor" : "none"
                            }
                          />
                        </button>
                        <Link href={`/preview/${book.id}`}>
                          <button className="ml-2 px-3 py-1 text-xs border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
                            Preview
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center mt-6">
            <p className="text-gray-500">
              No favorite books yet. Add some books to your favorites!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
