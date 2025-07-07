"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft } from 'lucide-react';
import { books } from '@/data/books';
import Image from "next/image";

export default function Favorite() {
  const router = useRouter();
  const [favoriteBooks, setFavoriteBooks] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    if (savedFavorites) {
      setFavoriteBooks(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const toggleFavorite = (bookId: number) => {
    setFavoriteBooks((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId];
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const getFavoriteBooks = () => {
    return books.filter(book => favoriteBooks.includes(book.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-gray-800">
              My <span className="text-orange-500">Book</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">Shelf</div>
          </div>

          <div className="flex items-center space-x-4">
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option>All</option>
            </select>
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Search" 
                className="px-3 py-1 border border-gray-300 rounded text-sm w-48"
              />
              <button className="text-orange-500">🔍</button>
            </div>
            <select className="px-3 py-1 border border-gray-300 rounded text-sm">
              <option>Lang</option>
            </select>
            <div className="text-sm text-gray-600">09:02 HRS</div>
            <div className="text-sm text-gray-600">W-MAR-2023</div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm">Kenson</span>
            </div>
          </div>
        </div>

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Favourite</h1>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Ratings</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Availability</div>
            <div className="col-span-2">Status</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {getFavoriteBooks().map((book) => (
              <div key={book.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50">
                {/* Title Column */}
                <div className="col-span-4 flex items-center space-x-3">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="w-12 h-16 rounded object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/60x80/ff6b35/ffffff?text=${encodeURIComponent(book.title.split(' ').map(word => word[0]).join('').slice(0, 2))}`;
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">{book.title}</h4>
                    <p className="text-sm text-gray-600">{book.author}, {book.year}</p>
                  </div>
                </div>

                {/* Ratings */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium">{book.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2 flex items-center">
                  <div className="text-sm font-medium text-gray-800">{book.category?.join(', ') || 'No Category'}</div>


                </div>

                {/* Availability */}
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{book.availability}</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="col-span-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      book.status === 'In-Shelf'
                        ? 'bg-green-100 text-green-800'
                        : book.status === 'Borrowed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {book.status}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">{book.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className="text-red-500 hover:text-red-600 focus:outline-none"
                    >
                      <Heart
                        size={18}
                        fill={favoriteBooks.includes(book.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                    <button className="px-3 py-1 text-xs border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No favorites message */}
        {getFavoriteBooks().length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center mt-6">
            <p className="text-gray-500">No favorite books yet. Add some books to your favorites!</p>
          </div>
        )}
      </div>
    </div>
  );
}
