"use client";

import { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { books } from '@/data/books'; // Import books from data/books.ts
import Image from "next/image";

interface Contribution {
  bookName: string;
  authorName: string;
  category: string;
  language: string;
  reason: string;
  availableFormats: {
    hardCopy: boolean;
    eBook: boolean;
    audioBook: boolean;
  };
}

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  coverImage: string;
}

export default function Contribute() {
  const [formData, setFormData] = useState<Contribution>({
    bookName: '',
    authorName: '',
    category: '',
    language: '',
    reason: '',
    availableFormats: {
      hardCopy: false,
      eBook: false,
      audioBook: false,
    },
  });

  const [message, setMessage] = useState<string>('');
  // Initialize contributions with books from data/books.ts
  const [contributions, setContributions] = useState<Book[]>(() => {
    // In a real app, you would combine books from data/books.ts with any saved contributions
    return books; // Use books from your data/books.ts file
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (field: keyof Omit<Contribution, 'availableFormats'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormatChange = (format: keyof Contribution['availableFormats']) => {
    setFormData(prev => ({
      ...prev,
      availableFormats: {
        ...prev.availableFormats,
        [format]: !prev.availableFormats[format],
      },
    }));
  };

  const handleSubmit = () => {
    if (!formData.bookName || !formData.authorName || !formData.category || !formData.language || !formData.reason) {
      setMessage('Please fill all required fields.');
      return;
    }

    const newBook: Book = {
      id: contributions.length > 0 ? Math.max(...contributions.map(b => b.id)) + 1 : 1,
      title: formData.bookName,
      author: formData.authorName,
      year: new Date().getFullYear(),
      coverImage: `https://via.placeholder.com/200x280/ff6b35/ffffff?text=${encodeURIComponent(formData.bookName.split(' ').map(word => word[0]).join('').slice(0, 3))}`,
    };

    setContributions(prev => {
      const updatedBooks = [...prev, newBook];
      // In a real app, you would save to localStorage here:
      // localStorage.setItem('bookContributions', JSON.stringify(updatedBooks));
      return updatedBooks;
    });
    setIsSubmitted(true);
  };

  const handleBackToForm = () => {
    setIsSubmitted(false);
    setFormData({
      bookName: '',
      authorName: '',
      category: '',
      language: '',
      reason: '',
      availableFormats: { hardCopy: false, eBook: false, audioBook: false },
    });
    setMessage('');
  };

  // Success Page View
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-gray-800">
                My <span className="text-orange-500">Book</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">Shelf</div>
            </div>
            <button 
              onClick={handleBackToForm}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Success Message */}
            <div className="flex flex-col justify-center items-center text-center space-y-8">
              <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={64} className="text-white" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  Thank you For your Submission
                </h1>
                <p className="text-lg text-gray-600">
                  You will be contacted shortly
                </p>
              </div>
            </div>

            {/* Right Column - Your Contributions */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Your <span className="text-orange-500">Contribution</span>
                </h1>
                <h2 className="text-2xl font-semibold text-gray-600">Helps Other to Learn</h2>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-6">Your Previous Contributions</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {contributions.map((book: Book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
                      {/* Book Cover */}
                      <div className="relative w-20 h-28 mx-auto mb-3">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          className="w-20 h-28 rounded object-cover shadow-md"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://via.placeholder.com/200x280/ff6b35/ffffff?text=${encodeURIComponent(book.title.split(' ').map(word => word[0]).join('').slice(0, 3))}`;
                          }}
                        />
                      </div>
                      
                      {/* Book Info */}
                      <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                        {book.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                      <p className="text-xs text-gray-500">{book.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-2xl font-bold text-gray-800">
            My <span className="text-orange-500">Book</span> Shelf
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Fill up Book Details</h2>
            
            {message && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {message}
              </div>
            )}

            <div className="space-y-4">
              {/* Book Name and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.bookName}
                    onChange={(e) => handleInputChange('bookName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Book name"
                    required
                  />
                </div>
                <div>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Biography">Biography</option>
                  </select>
                </div>
              </div>

              {/* Author Name and Language Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => handleInputChange('authorName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Author Name"
                    required
                  />
                </div>
                <div>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Lang</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Reason for Contribution */}
              <div>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Reason For Your Contribution"
                  rows={4}
                  required
                />
              </div>

              {/* Available Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Available Format</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availableFormats.hardCopy}
                      onChange={() => handleFormatChange('hardCopy')}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Hard Copy</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availableFormats.eBook}
                      onChange={() => handleFormatChange('eBook')}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">E - Book</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.availableFormats.audioBook}
                      onChange={() => handleFormatChange('audioBook')}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Audio book</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Right Column - Your Contribution Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your <span className="text-orange-500">Contribution</span>
              </h1>
              <h2 className="text-2xl font-semibold text-gray-600">Helps Other to Learn</h2>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Your Previous Contributions</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contributions.map((book: Book) => (
                  <div key={book.id} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                    {/* Book Cover */}
                    <div className="relative w-16 h-20 mx-auto mb-3">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        className="w-16 h-20 rounded object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/200x280/ff6b35/ffffff?text=${encodeURIComponent(book.title.split(' ').map(word => word[0]).join('').slice(0, 3))}`;
                        }}
                      />
                    </div>
                    
                    {/* Book Info */}
                    <h4 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                    <p className="text-xs text-gray-500">{book.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}