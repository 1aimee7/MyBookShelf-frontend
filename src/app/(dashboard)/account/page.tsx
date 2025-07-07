"use client";

import React, { useState } from "react";
import { Book, Users } from "lucide-react";
import Image from "next/image";

export default function LibraryAccountPage() {
  const initialUser = {
    name: "Reinhard Kenson",
    email: "kenson@officialcollege.com",
    phone: "+91 9952566595",
    registerNumber: "6020010",
    bio: "I'm a Student",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Account Setting");

  // Save profile changes
  const handleUpdateProfile = () => {
    setIsEditing(false);
    console.log("Profile updated:", user);
  };

  // Reset to initial values
  const handleReset = () => {
    setUser(initialUser);
    setIsEditing(false);
  };

  // Handle profile image upload & preview
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
    <main className="min-h-screen bg-gray-100 p-8">
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
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "Account Setting" && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-8">
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
              <div className="text-center mt-2 text-xs text-gray-500">Upload New Photo</div>

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
            <div className="flex-1 grid grid-cols-2 gap-6 mt-8 md:mt-0 w-full max-w-lg">
              {[
                { label: "Full name", value: user.name, field: "name" },
                { label: "College Email ID", value: user.email, field: "email" },
                { label: "Register Number", value: user.registerNumber, field: "registerNumber" },
                { label: "Phone number", value: user.phone, field: "phone" },
              ].map(({ label, value, field }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                  <input
                    type="text"
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

          {/* Action Buttons */}
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
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      )}

      {/* Other tabs */}
      {activeTab === "Login & Security" && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-gray-600 text-sm">
          Login and security settings will go here...
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-gray-600 text-sm">
          Notification preferences coming soon...
        </div>
      )}

      {activeTab === "Interface" && (
        <div className="bg-white rounded-lg shadow-sm p-6 text-gray-600 text-sm">
          Interface settings will go here...
        </div>
      )}
    </main>
  );
}
