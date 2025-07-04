"use client";

import { useState, useEffect } from "react";
import { Book, Users } from "lucide-react";
import Image from "next/image"; // ✅ Using next/image
import { books } from "@/data/books";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
  subcategory: string;
  rating: number;
  coverImage: string;
  availability: {
    hardCopy: boolean;
    eBook: boolean;
    audioBook: boolean;
  };
  status: string;
}

export default function AccountPage() {
  const [user, setUser] = useState({
    name: "Reinhard Kenson",
    email: "kenson@officialcollege.com",
    phone: "+91 9952566595",
    registerNumber: "6020026",
    bio: "I'm a Student",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  });

  const [favorites] = useState<Set<number>>(new Set([1, 2]));
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Account Setting");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getFavoriteBooks = () => {
    return books.filter((book) => favorites.has(book.id));
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    console.log("Profile updated:", user);
  };

  const handleReset = () => {
    setUser({
      name: "Reinhard Kenson",
      email: "kenson@officialcollege.com",
      phone: "+91 9952566595",
      registerNumber: "6020026",
      bio: "I'm a Student",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    });
    setIsEditing(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">My Account</h1>
          <div className="text-sm text-gray-600">
            {formatDate(currentTime)} — {formatTime(currentTime)}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-8 border-b border-gray-200">
            {["Account Setting", "Login & Security", "Notifications", "Interface"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-medium ${
                  activeTab === tab
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-label={`Switch to ${tab}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ACCOUNT SETTING TAB */}
        {activeTab === "Account Setting" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start space-x-8 flex-col md:flex-row">
              {/* Profile Image & Stats */}
              <div className="flex-shrink-0">
                <div className="text-sm text-gray-600 mb-4">Your Profile Picture</div>
                <div className="relative w-24 h-24">
                  <Image
                    src={user.profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="rounded-full object-cover border-4 border-gray-200"
                  />
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                    />
                  )}
                </div>

                <div className="text-center mt-2">
                  <div className="text-xs text-gray-500">Upload New Photo</div>
                </div>

                {/* Stats */}
                <div className="flex space-x-4 mt-6">
                  <div className="bg-orange-500 text-white rounded-lg p-4 text-center min-w-[80px]">
                    <div className="flex items-center justify-center mb-1">
                      <Book size={16} className="mr-1" />
                      <span className="text-lg font-bold">120</span>
                    </div>
                    <div className="text-xs">Readings</div>
                  </div>
                  <div className="bg-purple-500 text-white rounded-lg p-4 text-center min-w-[80px]">
                    <div className="flex items-center justify-center mb-1">
                      <Users size={16} className="mr-1" />
                      <span className="text-lg font-bold">10</span>
                    </div>
                    <div className="text-xs">Contribution</div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="flex-1 grid grid-cols-2 gap-6 mt-8 md:mt-0">
                {[
                  { label: "Full name", type: "text", value: user.name, field: "name" },
                  { label: "College Email ID", type: "email", value: user.email, field: "email" },
                  { label: "Register Number", type: "text", value: user.registerNumber, field: "registerNumber" },
                  { label: "Phone number", type: "tel", value: user.phone, field: "phone" },
                ].map(({ label, type, value, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50"
                    />
                  </div>
                ))}

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdateProfile}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
                  >
                    Reset
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* INTERFACE TAB */}
        {activeTab === "Interface" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Favorite Books</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {getFavoriteBooks().map((book) => (
                <div key={book.id} className="bg-gray-100 p-4 rounded-lg">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={120}
                    height={100}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <div className="text-sm font-medium">{book.title}</div>
                  <div className="text-xs text-gray-600">{book.author}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Login & Security" && (
          <div className="text-gray-600 text-sm">Login and security settings will go here...</div>
        )}

        {activeTab === "Notifications" && (
          <div className="text-gray-600 text-sm">Notification preferences coming soon...</div>
        )}
      </main>
    </div>
  );
}
