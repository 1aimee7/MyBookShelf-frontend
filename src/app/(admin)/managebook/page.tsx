"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import axios from "axios"; // Using Axios for all API calls

// This type represents a book as it is stored in and fetched from your database.
type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  category: string;
  rating: number;
  available: boolean;
  coverUrl?: string;
  bookUrl?: string;
};

// This type represents the state of the form, which can include local File objects before upload.
type BookFormState = Book & {
  coverFile?: File | null;
  bookFile?: File | null;
};

// --- API Configuration ---
const API_BASE_URL = "https://mybooklibrary-5awp.onrender.com/api";

// --- Helper function to upload a file to your backend ---
// This function is now perfectly matched to your backend's requirements.
const uploadFileToBackend = async (file: File): Promise<string> => {
  const formData = new FormData();

  // FIX #1: The curl command revealed the field name must be "files" (plural).
  formData.append("files", file);

  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token not found.");

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  // FIX #2: The curl command revealed the response is an array. We get the URL from the first object.
  if (!response.data || !Array.isArray(response.data) || response.data.length === 0 || !response.data[0].url) {
    throw new Error("File upload response is not in the expected format: [{\"url\": \"...\"}]");
  }
  return response.data[0].url;
};


const ManageBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<number | null>(null);

  const [newBook, setNewBook] = useState<BookFormState>({
    id: 0, title: "", author: "", isbn: "", publishDate: "", category: "",
    rating: 0, available: true, coverFile: null, bookFile: null,
    coverUrl: "", bookUrl: "",
  });

  // --- 1. FETCH ALL BOOKS (READ) ---
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      alert("Could not load books from the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // Runs once when the component mounts

  // --- FORM INPUT HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : value;
    setNewBook((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setNewBook((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const openAddModal = () => {
    setNewBook({ id: 0, title: "", author: "", isbn: "", publishDate: "", category: "", rating: 0, available: true, coverFile: null, bookFile: null, coverUrl: "", bookUrl: "" });
    setEditingBookId(null);
    setIsModalOpen(true);
  };

  // --- 2. SAVE BOOK (CREATE & UPDATE) ---
  const handleSaveBook = async () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }

    try {
      let coverUrl = newBook.coverUrl || "";
      let bookUrl = newBook.bookUrl || "";

      // Step 1: Upload files if new ones have been selected
      if (newBook.coverFile) {
        coverUrl = await uploadFileToBackend(newBook.coverFile);
      }
      if (newBook.bookFile) {
        bookUrl = await uploadFileToBackend(newBook.bookFile);
      }

      // Step 2: Prepare the final data object for the API
      const bookDataForApi = {
        title: newBook.title, author: newBook.author, isbn: newBook.isbn,
        publishDate: newBook.publishDate, category: newBook.category,
        rating: parseFloat(String(newBook.rating)), // Ensure rating is a number
        available: newBook.available,
        coverUrl, bookUrl,
      };

      // Step 3: Call the correct API endpoint (CREATE or UPDATE)
      if (editingBookId !== null) {
        await axios.put(`${API_BASE_URL}/books/${editingBookId}`, bookDataForApi, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API_BASE_URL}/books`, bookDataForApi, { headers: { Authorization: `Bearer ${token}` } });
      }

      // Step 4: Refresh the list to show the changes and close the modal
      fetchBooks();
      setIsModalOpen(false);

    } catch (error) {
      console.error("Save failed", error);
      alert("Upload or save failed. Check the console for details.");
    }
  };

  // --- 3. DELETE BOOK ---
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_BASE_URL}/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        // For instant UI feedback, remove the book from the local state
        setBooks((prev) => prev.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Failed to delete book:", error);
        alert("Failed to delete book.");
      }
    }
  };
  
  // --- EDIT BOOK ---
  const handleEdit = (book: Book) => {
    setNewBook({ ...book, coverFile: null, bookFile: null });
    setEditingBookId(book.id);
    setIsModalOpen(true);
  };

  // --- JSX (RENDERING) ---
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Books</h1>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
          <Plus size={18} /> Add New Book
        </button>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <p className="text-center p-8 text-gray-500">Loading books...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-orange-100 text-left text-sm text-gray-700">
              <tr>
                <th className="p-3">Cover</th>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">ISBN</th>
                <th className="p-3">Published</th>
                <th className="p-3">Category</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Available</th>
                <th className="p-3">PDF</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr><td colSpan={10} className="p-4 text-center text-gray-500">No books found. Add one to get started!</td></tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="border-t text-sm">
                    <td className="p-3">
                      {book.coverUrl ? (<Image src={book.coverUrl} alt={`${book.title} cover`} width={48} height={64} className="object-cover rounded" priority={true} />) : <div className="w-12 h-16 bg-gray-200 rounded text-xs flex items-center justify-center text-gray-500">No cover</div>}
                    </td>
                    <td className="p-3 font-medium text-gray-800">{book.title}</td>
                    <td className="p-3 text-gray-600">{book.author}</td>
                    <td className="p-3 text-gray-600">{book.isbn}</td>
                    <td className="p-3 text-gray-600">{book.publishDate}</td>
                    <td className="p-3 text-gray-600">{book.category}</td>
                    <td className="p-3 text-gray-600">{book.rating}</td>
                    <td className="p-3 text-gray-600">{book.available ? "Yes" : "No"}</td>
                    <td className="p-3">
                      {book.bookUrl ? (<a href={book.bookUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF</a>) : "No PDF"}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => handleEdit(book)} className="text-blue-500 hover:text-blue-600" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(book.id)} className="text-red-500 hover:text-red-600" title="Delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL JSX */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{editingBookId ? "Edit Book" : "Add New Book"}</h2>
            <div className="space-y-3">
              <input type="text" name="title" value={newBook.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="author" value={newBook.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="isbn" value={newBook.isbn} onChange={handleChange} placeholder="ISBN" className="w-full p-2 border border-gray-300 rounded" />
              <input type="date" name="publishDate" value={newBook.publishDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              <input type="text" name="category" value={newBook.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border border-gray-300 rounded" />
              <input type="number" name="rating" value={newBook.rating} onChange={handleChange} min={0} max={5} step={0.1} placeholder="Rating (0-5)" className="w-full p-2 border border-gray-300 rounded" />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="available" checked={newBook.available} onChange={handleChange} />Available</label>
              <label className="block text-sm font-medium mt-2">Cover Image:
                <input type="file" name="coverFile" accept="image/*" onChange={handleFileChange} className="mt-1" />
                {newBook.coverFile && (<p className="text-xs mt-1 text-gray-600">Selected file: {newBook.coverFile.name}</p>)}
              </label>
              <label className="block text-sm font-medium mt-2">Book PDF:
                <input type="file" name="bookFile" accept="application/pdf" onChange={handleFileChange} className="mt-1" />
                {newBook.bookFile && (<p className="text-xs mt-1 text-gray-600">Selected file: {newBook.bookFile.name}</p>)}
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSaveBook} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">{editingBookId ? "Update Book" : "Add Book"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;