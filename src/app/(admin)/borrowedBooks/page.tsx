
"use client";

import React, { useState, useEffect } from "react";
import { Search, CheckCircle, ChevronDown } from "lucide-react";

// Mock data for borrowed books (replace with API call later)
const mockBorrowedBooks = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    borrower: "john_doe",
    borrowerEmail: "john@example.com",
    borrowDate: "2025-06-20",
    returnDate: "2025-07-10",
    status: "Borrowed",
    fine: 0,
  },
  {
    id: "2",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    borrower: "jane_smith",
    borrowerEmail: "jane@example.com",
    borrowDate: "2025-06-15",
    returnDate: "2025-07-05",
    status: "Overdue",
    fine: 0,
  },
  {
    id: "3",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    borrower: "admin_01",
    borrowerEmail: "admin@example.com",
    borrowDate: "2025-07-01",
    returnDate: "2025-07-15",
    status: "Borrowed",
    fine: 0,
  },
];

export default function BorrowedBooks() {
  const [books, setBooks] = useState(mockBorrowedBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Update overdue status and fines dynamically
  useEffect(() => {
    const updateBooks = () => {
      const today = new Date(); // Current date and time (e.g., 2025-07-09 12:03 PM CAT)
      setBooks((prevBooks) =>
        prevBooks.map((book) => {
          if (book.status === "Returned") return book;
          const returnDateObj = new Date(book.returnDate);
          const isOverdue = returnDateObj < today;
          const fine = isOverdue
            ? Math.floor((today.getTime() - returnDateObj.getTime()) / (1000 * 60 * 60 * 24)) * 2 // $2/day
            : 0;
          return {
            ...book,
            status: isOverdue ? "Overdue" : "Borrowed",
            fine,
          };
        })
      );
    };
    updateBooks();
    const interval = setInterval(updateBooks, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Filter and search logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrowerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      filter === book.status;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  // Handle mark as returned
  const handleMarkReturned = (id: string) => {
    if (confirm("Mark this book as returned?")) {
      setBooks(
        books.map((book) =>
          book.id === id ? { ...book, status: "Returned", fine: 0 } : book
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Borrowed Books</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
            />
            <input
              type="text"
              placeholder="Search by title, author, or borrower..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-black placeholder-black"
            />
          </div>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-black"
            >
              <option value="All">All</option>
              <option value="Borrowed">Borrowed</option>
              <option value="Overdue">Overdue</option>
              <option value="Returned">Returned</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black pointer-events-none"
            />
          </div>
        </div>

        {/* Borrowed Books Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-sm font-semibold text-black">Title</th>
                <th className="p-3 text-sm font-semibold text-black">Author</th>
                <th className="p-3 text-sm font-semibold text-black">Borrower</th>
                <th className="p-3 text-sm font-semibold text-black">Email</th>
                <th className="p-3 text-sm font-semibold text-black">Borrow Date</th>
                <th className="p-3 text-sm font-semibold text-black">Return Date</th>
                <th className="p-3 text-sm font-semibold text-black">Status</th>
                <th className="p-3 text-sm font-semibold text-black">Fine ($)</th>
                <th className="p-3 text-sm font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr key={book.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-sm text-black">{book.title}</td>
                  <td className="p-3 text-sm text-black">{book.author}</td>
                  <td className="p-3 text-sm text-black">{book.borrower}</td>
                  <td className="p-3 text-sm text-black">{book.borrowerEmail}</td>
                  <td className="p-3 text-sm text-black">{book.borrowDate}</td>
                  <td className="p-3 text-sm text-black">{book.returnDate}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        book.status === "Borrowed"
                          ? "bg-blue-100 text-blue-700"
                          : book.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-black">{book.fine}</td>
                  <td className="p-3 text-sm">
                    {book.status !== "Returned" && (
                      <button
                        onClick={() => handleMarkReturned(book.id)}
                        className="text-green-500 hover:text-green-600"
                        title="Mark as Returned"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 text-black"
            >
              Previous
            </button>
            <span className="text-black">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 text-black"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
