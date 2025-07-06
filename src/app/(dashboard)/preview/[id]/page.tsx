"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { books } from "@/data/books";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  BookOpen,
  Headset,
  HardDrive,
  Share2,
  FileText,
  MessageCircle,
  Heart,
  CheckCircle,
  ScanLine,
} from "lucide-react";
import { Dialog } from "@headlessui/react";

// Helper hook to avoid hydration errors
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}

export default function BookPreviewPage() {
  const hasMounted = useHasMounted();
  const params = useParams();
  const id = params?.id;

  // State for tab, favorite, modals
  const [activeTab, setActiveTab] = useState("Overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBorrowModalOpen, setBorrowModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  if (!hasMounted) {
    return null; // or a spinner/loading state
  }

  const book = books.find((b) => b.id === parseInt(id as string));

  // Declare tabs here to avoid ReferenceError
  const tabs = [
    "Overview",
    "View 166 Editions",
    "Details",
    "4.1k Reviews",
    "Lists",
    "Related Books",
  ];

  if (!book) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Book not found</h1>
        <Link
          href="/search"
          className="text-purple-600 hover:underline mt-4 inline-block"
        >
          ← Back to Search
        </Link>
      </div>
    );
  }

  const handleBorrowSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBorrowModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <Link
        href="/search"
        className="flex items-center text-sm text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3">
          <Image
            src={book.coverImage}
            alt={book.title}
            width={250}
            height={340}
            className="rounded-lg shadow-lg mx-auto"
          />
          <div className="flex justify-center space-x-6 mt-4">
            <button className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600">
              <FileText size={20} />
              <span className="mt-1">Review</span>
            </button>
            <button className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600">
              <MessageCircle size={20} />
              <span className="mt-1">Notes</span>
            </button>
            <button className="flex flex-col items-center text-xs text-gray-600 hover:text-purple-600">
              <Share2 size={20} />
              <span className="mt-1">Share</span>
            </button>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-3 text-sm text-gray-700">
              Buy this book Online
            </h3>
            <div className="space-y-2">
              <button className="w-full bg-yellow-400 text-black text-sm font-semibold py-2 rounded">
                Buy Now
              </button>
              <button className="w-full border text-sm font-semibold py-2 rounded">
                Buy Now
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              When you buy books using these links the Internet Archive may earn
              a small commission.
            </p>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="lg:col-span-6">
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-500 text-sm mb-1">
            By <span className="text-purple-600">{book.author}</span>,{" "}
            {book.year}
          </p>
          <p className="text-xs text-gray-500 mb-4">{book.edition}</p>

          <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(book.rating ?? 0) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="font-semibold">{book.rating} Ratings</span>
            <span className="text-gray-500">{book.currentlyReading} Currently reading</span>
            <span className="text-gray-500">{book.haveRead} Have read</span>
          </div>

          <div className="grid grid-cols-3 text-sm gap-y-2 gap-x-4 mb-4">
            <span className="font-semibold">Availability</span>
            <span className="font-semibold">Status</span>
            <span></span>
            <span className="flex items-center">
              <HardDrive size={14} className="mr-1" /> Hard Copy
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs w-fit ${
                book.status === "In-Shelf"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {book.status}
            </span>
            <button className="border px-2 py-1 rounded text-sm">Add to List</button>
            <span className="flex items-center">
              <BookOpen size={14} className="mr-1" /> E - Book
            </span>
            <span className="text-gray-500">{book.location}</span>
            <span></span>
            <span className="flex items-center">
              <Headset size={14} className="mr-1" /> Audio book
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setBorrowModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-2 rounded"
            >
              BORROW
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-6 py-2 rounded">
              Read Now
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${
                isFavorite ? "text-red-500 bg-red-100" : "text-gray-500 bg-gray-100"
              }`}
            >
              <Heart size={20} />
            </button>
          </div>

          <div className="mt-10 border-t">
            <div className="flex gap-6 border-b pt-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-semibold shrink-0 ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="py-4 text-sm">
              {activeTab === "Overview" && (
                <div>
                  <p className="text-gray-600 leading-relaxed">{book.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Publish Date</h4>
                      <p className="text-sm text-gray-500">{book.year}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Publisher</h4>
                      <p className="text-sm text-red-500">{book.publisher}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Language</h4>
                      <p className="text-sm text-gray-500">{book.language}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Pages</h4>
                      <p className="text-sm text-gray-500">{book.pages}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3">
          <h3 className="font-bold mb-2 text-sm text-gray-700">About Author</h3>
          <div className="flex gap-3 mb-4">
            {book.authorImage && (
              <Image
                src={book.authorImage}
                alt={book.author}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <p className="text-sm text-gray-600">{book.authorBio}</p>
          </div>
          <h4 className="font-semibold mb-2 text-sm">Other Books</h4>
          <div className="flex gap-2">
            {books
              .filter((b) => b.author === book.author && b.id !== book.id)
              .slice(0, 2)
              .map((other) => (
                <Image
                  key={other.id}
                  src={other.coverImage}
                  alt={other.title}
                  width={60}
                  height={90}
                  className="rounded shadow"
                />
              ))}
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      <Dialog
        open={isBorrowModalOpen}
        onClose={() => setBorrowModalOpen(false)}
        className="fixed z-50 inset-0 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      >
        <Dialog.Panel className="relative bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-center font-semibold text-lg mb-4">
            Fill Up the Details
          </Dialog.Title>
          <form onSubmit={handleBorrowSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="date"
                  required
                  className="w-full p-2 border rounded-md bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Serial No.
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Enter 6 Digit Serial No. Or Scan"
                  className="w-full p-2 border rounded-md pl-3 pr-10"
                />
                <ScanLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border p-2 rounded-md"
                rows={3}
                placeholder="Purpose"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white w-full py-2.5 rounded font-semibold hover:bg-orange-600"
            >
              BORROW
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        className="fixed z-50 inset-0 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      >
        <Dialog.Panel className="relative bg-white w-[90%] max-w-sm p-8 rounded-lg text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <Dialog.Title className="font-bold text-lg mb-2">
            Process Completed
          </Dialog.Title>
          <p className="text-sm text-gray-500">
            You have successfully submitted your request to borrow the book.
          </p>
          <button
            onClick={() => setSuccessModalOpen(false)}
            className="mt-6 bg-orange-500 text-white py-2.5 px-10 rounded-lg font-semibold hover:bg-orange-600"
          >
            Back
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
