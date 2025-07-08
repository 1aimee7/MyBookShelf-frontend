"use client";

import { useState } from "react";
import { books as initialBooks, type Book } from "@/data/books"; // Import Book type and books data
import Image from "next/image";

export default function MyShelf() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("All Books");

  // State to manage the selected book and form visibility
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // State to manage books list
  const [books, setBooks] = useState<Book[]>(initialBooks);

  // Form state
  const [formData, setFormData] = useState({
    fromDay: "04",
    fromMonth: "03",
    fromYear: "2023",
    toDay: "08",
    toMonth: "03",
    toYear: "2023",
    bookSerialNo: "84567023",
    penalties: "100",
  });

  // Define tabs
  const tabs = [
    "All Books",
    "Favourite",
    "Borrowed Books",
    "E-Books",
    "Audio Books",
    "Articles & Journals",
  ];

  // Filter books based on active tab
  const getFilteredBooks = () => {
    switch (activeTab) {
      case "Borrowed Books":
        return books.filter((book) => book.status === "Borrowed");
      case "E-Books":
      case "Audio Books":
      case "Articles & Journals":
        return books;
      case "Favourite":
        return books.slice(0, 2);
      default:
        return books;
    }
  };

  // Handle book return
  const handleReturn = (book: Book) => {
    setSelectedBook(book);
    // Set form data based on book borrowedDate
  const borrowedDate = book.borrowedDate ? new Date(book.borrowedDate) : new Date("2025-06-15");

    const returnDate = new Date("2025-06-28T10:58:00Z"); // Current time: 10:58 AM CAT

    setFormData({
      fromDay: borrowedDate.getDate().toString().padStart(2, "0"),
      fromMonth: (borrowedDate.getMonth() + 1).toString().padStart(2, "0"),
      fromYear: borrowedDate.getFullYear().toString(),
      toDay: returnDate.getDate().toString().padStart(2, "0"),
      toMonth: (returnDate.getMonth() + 1).toString().padStart(2, "0"),
      toYear: returnDate.getFullYear().toString(),
      bookSerialNo: `${book.id}${Math.floor(Math.random() * 1000000)}`,
      penalties: "0",
    });
  };

  // Handle form submission
  const handleSubmitReturn = () => {
    if (selectedBook) {
      // Update book status to 'In-Shelf' locally
      setBooks(
        books.map((book) =>
          book.id === selectedBook.id ? { ...book, status: "In-Shelf" } : book
        )
      );
      setSelectedBook(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // BookCard component
  const BookCard = ({ book }: { book: Book }) => {
    const borrowedDate = book.borrowedDate ? new Date(book.borrowedDate) : null;
    const dueDate = borrowedDate
      ? new Date(borrowedDate.getTime() + 14 * 24 * 60 * 60 * 1000)
      : new Date("2025-07-12");
    const isOverdue =
      borrowedDate && dueDate < new Date("2025-06-28T10:58:00Z"); // Current time: 10:58 AM CAT

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center relative">
        {/* Book Cover */}
        <div className="relative w-20 h-28 mb-3">
          <Image
            src={book.coverImage}
            alt={book.title}
            width={80}
            height={112}
            className="w-20 h-28 rounded object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = document.createElement("div");
              fallback.className =
                "w-20 h-28 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-xs font-bold text-center absolute top-0 left-0";
              fallback.textContent = book.title
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 3);
              target.parentElement?.appendChild(fallback);
            }}
          />
        </div>

        {/* Book Info */}
        <h3 className="font-medium text-sm text-center mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-xs text-gray-600 mb-2">
          {book.author}, {book.year}
        </p>
        <div className="flex items-center text-xs text-yellow-500 mb-2">
          <span>{'★'.repeat(Math.floor(book.rating))}</span>
          <span className="ml-1">{book.rating}/5</span>
        </div>

        {/* Status and Actions */}
        {book.status === "Borrowed" ? (
          <div className="w-full">
            <p className="text-xs text-gray-600 mb-1">Borrowed on</p>
            <p className="text-xs text-gray-800 font-medium mb-1">
              {book.borrowedBy ? `by ${book.borrowedBy}` : "Unknown"}
            </p>
            <p className="text-xs text-gray-600 mb-1">Submission Due</p>
            <p
              className={`text-xs font-medium mb-3 ${
                isOverdue ? "text-red-500" : "text-gray-800"
              }`}
            >
              {dueDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button className="w-full bg-gray-400 text-white px-3 py-1.5 rounded text-xs font-medium">
              Borrowed
            </button>
            <button
              className="w-full bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium mt-1 hover:bg-red-600"
              onClick={() => handleReturn(book)}
            >
              Return
            </button>
          </div>
        ) : (
          <div className="w-full">
            <button className="w-full bg-green-500 text-white px-3 py-1.5 rounded text-xs font-medium mb-1 hover:bg-green-600">
              E-BOOK
            </button>
            <button className="w-full bg-orange-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-orange-600 flex items-center justify-center">
              Read
              <span className="ml-1">🎧</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Return Form Modal
  const ReturnForm = ({
    onClose,
    onSubmit,
  }: {
    onClose: () => void;
    onSubmit: () => void;
  }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-96 max-w-md mx-4">
          {/* Header */}
          <div className="bg-gray-100 px-6 py-4 rounded-t-lg border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Fill Up the Details
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4">
            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="flex space-x-2">
                <select
                  value={formData.fromDay}
                  onChange={(e) => handleInputChange("fromDay", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option
                      key={day}
                      value={day.toString().padStart(2, "0")}
                    >
                      {day.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.fromMonth}
                  onChange={(e) =>
                    handleInputChange("fromMonth", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(
                    (month) => (
                      <option
                        key={month}
                        value={month.toString().padStart(2, "0")}
                      >
                        {month.toString().padStart(2, "0")}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={formData.fromYear}
                  onChange={(e) =>
                    handleInputChange("fromYear", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {[2023, 2024, 2025].map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="flex space-x-2">
                <select
                  value={formData.toDay}
                  onChange={(e) => handleInputChange("toDay", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option
                      key={day}
                      value={day.toString().padStart(2, "0")}
                    >
                      {day.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.toMonth}
                  onChange={(e) => handleInputChange("toMonth", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(
                    (month) => (
                      <option
                        key={month}
                        value={month.toString().padStart(2, "0")}
                      >
                        {month.toString().padStart(2, "0")}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={formData.toYear}
                  onChange={(e) => handleInputChange("toYear", e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {[2023, 2024, 2025].map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Book Serial No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Serial No.
              </label>
              <input
                type="text"
                value={formData.bookSerialNo}
                onChange={(e) => handleInputChange("bookSerialNo", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter book serial number"
              />
            </div>

            {/* Penalties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penalties
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.penalties}
                  onChange={(e) => handleInputChange("penalties", e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex space-x-3">
            <button
              onClick={onSubmit}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 font-medium"
            >
              Pay Now
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 font-medium"
            >
              Credit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header Tabs */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {getFilteredBooks().map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Empty State */}
      {getFilteredBooks().length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found in this category.</p>
        </div>
      )}

      {/* Return Form Modal */}
      {selectedBook && (
        <ReturnForm onClose={() => setSelectedBook(null)} onSubmit={handleSubmitReturn} />
      )}
    </div>
  );
}
