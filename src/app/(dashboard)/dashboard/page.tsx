"use client"; // Must be a client component to use hooks

import { useState, useEffect, useContext } from "react";
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import { SearchContext } from "@/context/SearchContext";

export default function DashboardPage() {
  const { searchTerm } = useContext(SearchContext);
  const [displayedBooks, setDisplayedBooks] = useState(books);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedBooks(books);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowercasedTerm) ||
        book.author.toLowerCase().includes(lowercasedTerm)
      );
      setDisplayedBooks(filtered);
    }
  }, [searchTerm]);

  const recommendedBooks = displayedBooks.slice(0, 8);
  const recentReadings = [...displayedBooks].reverse().slice(0, 8);

  const newArrivalsData = [
    { id: 10, title: "Holy Bible", coverImage: "/books/holy-bible.jpg" },
    { id: 7, title: "Harry Potter...", coverImage: "/books/harry-potter.jpg" },
    { id: 4, title: "Lean UX...", coverImage: "/books/lean-ux.jpg" },
    { id: 1, title: "Don&apos;t Make Me Think", coverImage: "/books/dont-make-me-think.jpg" },
  ];

  return (
    <div>
      {/* ========================================================= */}
      {/*  THIS IS THE COMPLETED SECTION YOU ASKED FOR             */}
      {/* ========================================================= */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Today's Quote Box - now 1/3 */}
        <div
          className="lg:w-1/3 bg-orange-400 text-white rounded-2xl p-6 lg:p-8 flex flex-col justify-between"
          style={{ minHeight: '220px' }}
        >
          <div>
            <h2 className="text-lg font-semibold mb-2">Today&apos;s Quote</h2>
            <p className="text-xl leading-relaxed">
              &quot;There is more treasure in books than in all the pirate&apos;s loot on Treasure Island.&quot;
            </p>
          </div>
          <div className="flex justify-between items-end mt-4">
            <p className="text-right text-sm opacity-80">- Walt Disney</p>
            <div className="flex space-x-1.5">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              <span className="w-2 h-2 bg-white/50 rounded-full"></span>
              <span className="w-2 h-2 bg-white/50 rounded-full"></span>
            </div>
          </div>
        </div>

        {/* New Arrivals Box - now 2/3 */}
        <div className="lg:w-2/3 flex">
          <div className="bg-red-500 text-white [writing-mode:vertical-rl] transform rotate-180 flex items-center justify-center p-2 rounded-l-lg font-semibold text-lg">
            New Arrivals
          </div>
          <div className="bg-white p-4 rounded-r-lg shadow-md border flex-1 flex items-center justify-around space-x-2">
            {newArrivalsData.map((book) => (
              <div
                key={`new-${book.id}`}
                className="w-20 h-32 sm:w-24 sm:h-36 relative rounded-md overflow-hidden border hover:shadow-lg transition-shadow"
              >
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-10 mb-4">Good Morning</h2>

      {/* Recommended Books */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recommended for You</h3>
          <button className="text-sm text-purple-600 font-semibold hover:underline">Show All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-5">
          {recommendedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Recent Readings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Readings</h3>
          <button className="text-sm text-purple-600 font-semibold hover:underline">Show All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-5">
          {recentReadings.map((book) => (
            <BookCard key={`recent-${book.id}`} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
