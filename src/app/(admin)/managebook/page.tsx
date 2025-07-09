"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import  uploadToCloudinary  from "@/utils/cloudinaryUpload";



type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
  rating: number;
  available: boolean;
  coverFile?: File | null; // local file before upload
  bookFile?: File | null;  // local file before upload
  coverUrl?: string;       // Cloudinary URL after upload
  bookUrl?: string;        // Cloudinary URL after upload
};



const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      isbn: "123456789",
      publishDate: "2018-10-16",
      category: "Self-help",
      rating: 4.5,
      available: true,
      coverUrl: "", // optionally preset URLs here
      bookUrl: "",
    },
    {
      id: 2,
      title: "Deep Work",
      author: "Cal Newport",
      isbn: "987654321",
      publishDate: "2016-01-05",
      category: "Productivity",
      rating: 4.7,
      available: false,
      coverUrl: "",
      bookUrl: "",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    isbn: "",
    publishDate: "",
    category: "",
    rating: 0,
    available: true,
    coverFile: null,
    bookFile: null,
    coverUrl: "",
    bookUrl: "",
  });

  // Handle text/select/checkbox inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setNewBook((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Handle file inputs separately
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    setNewBook((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Open modal for adding new book
  const openAddModal = () => {
    setNewBook({
      id: 0,
      title: "",
      author: "",
      isbn: "",
      publishDate: "",
      category: "",
      rating: 0,
      available: true,
      coverFile: null,
      bookFile: null,
      coverUrl: "",
      bookUrl: "",
    });
    setEditingBookId(null);
    setIsModalOpen(true);
  };

  // Save (Add or Update) book with async file uploads
  const handleSaveBook = async () => {
    try {
      let coverUrl = newBook.coverUrl || "";
      let bookUrl = newBook.bookUrl || "";

      if (newBook.coverFile instanceof File) {
        coverUrl = await uploadToCloudinary(newBook.coverFile);
      }

      if (newBook.bookFile instanceof File) {
        bookUrl = await uploadToCloudinary(newBook.bookFile);
      }

      const bookData: Book = {
        ...newBook,
        id: editingBookId ?? Date.now(),
        coverUrl,
        bookUrl,
        // clear local files after upload
        coverFile: null,
        bookFile: null,
      };

      if (editingBookId !== null) {
        setBooks((prev) =>
          prev.map((book) => (book.id === editingBookId ? bookData : book))
        );
      } else {
        setBooks((prev) => [...prev, bookData]);
      }

      setIsModalOpen(false);
      setEditingBookId(null);
      setNewBook({
        id: 0,
        title: "",
        author: "",
        isbn: "",
        publishDate: "",
        category: "",
        rating: 0,
        available: true,
        coverFile: null,
        bookFile: null,
        coverUrl: "",
        bookUrl: "",
      });
    } catch (error) {
      console.error("Upload or save failed", error);
      alert("Upload or save failed, please try again.");
    }
  };

  // Delete book by id
  const handleDelete = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  // Edit a book (open modal and load data)
  const handleEdit = (book: Book) => {
    setNewBook(book);
    setEditingBookId(book.id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Books</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add New Book
        </button>
      </div>

      {/* Book Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-orange-100 text-left text-sm">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Published Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Available</th>
              <th className="p-3">PDF</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  No books available.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="border-t text-sm">
                  <td className="p-3">
                    {book.coverUrl ? (
<Image
  src={book.coverUrl}
  alt={`${book.title} cover`}
  width={48}
  height={64}
  className="object-cover rounded"
/>
                    ) : (
                      "No cover"
                    )}
                  </td>
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.author}</td>
                  <td className="p-3">{book.isbn}</td>
                  <td className="p-3">{book.publishDate}</td>
                  <td className="p-3">{book.category}</td>
                  <td className="p-3">{book.rating}</td>
                  <td className="p-3">{book.available ? "Yes" : "No"}</td>
                  <td className="p-3">
                    {book.bookUrl ? (
                      <a
                        href={book.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      "No PDF"
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
              {editingBookId ? "Edit Book" : "Add New Book"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="isbn"
                value={newBook.isbn}
                onChange={handleChange}
                placeholder="ISBN"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="publishDate"
                value={newBook.publishDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="category"
                value={newBook.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="rating"
                value={newBook.rating}
                onChange={handleChange}
                min={0}
                max={5}
                step={0.1}
                placeholder="Rating (0-5)"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="available"
                  checked={newBook.available}
                  onChange={handleChange}
                />
                Available
              </label>

              {/* File inputs */}
              <label className="block text-sm font-medium mt-2">
                Cover Image:
                <input
                  type="file"
                  name="coverFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1"
                />
                {newBook.coverFile && (
                  <p className="text-xs mt-1 text-gray-600">
                    Selected file: {newBook.coverFile.name}
                  </p>
                )}
              </label>

              <label className="block text-sm font-medium mt-2">
                Book PDF:
                <input
                  type="file"
                  name="bookFile"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="mt-1"
                />
                {newBook.bookFile && (
                  <p className="text-xs mt-1 text-gray-600">
                    Selected file: {newBook.bookFile.name}
                  </p>
                )}
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBook}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {editingBookId ? "Update Book" : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
