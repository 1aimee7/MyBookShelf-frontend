"use client";

import React, { useState, FC, useRef } from "react";
import {
  PlusSquare,
  BookOpen,
  Pencil,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, value, label, color }) => (
  <div
    className={`flex-grow ${color} text-white rounded-lg p-4 flex flex-col items-center justify-center shadow-md`}
  >
    <div className="flex items-center space-x-2">
      <Icon size={20} />
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <span className="text-sm mt-1">{label}</span>
  </div>
);

export default function LibraryAccountPage() {
  const initialUser = {
    name: "Reinhard Kenson",
    email: "kensoncs.official@college.com",
    phone: "+91 9952508995",
    registerNumber: "6022020",
    bio: "I'm a Student",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Account Setting");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateProfile = () => {
    setIsEditing(false);
    console.log("Profile updated:", user);
  };

  const handleReset = () => {
    setUser(initialUser);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  };

  const tabs = ["Account Setting", "Login & Security", "Notifications", "Interface"];

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-screen-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Main Content Only (Header & Sidebar Removed) */}
        <main className="flex-1 p-6 bg-slate-50">
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-base font-medium transition-colors ${
                  activeTab === tab
                    ? "text-[#fd7e5a] border-b-2 border-[#fd7e5a]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Account Settings Content */}
          {activeTab === "Account Setting" && (
            <div className="mt-8">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Side: Profile & Stats */}
                <div className="flex-shrink-0 w-full lg:w-60 text-center lg:text-left">
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    Your Profile Picture
                  </label>
                  <div className="relative w-28 h-28 mx-auto lg:mx-0">
                    <Image
                      src={user.profileImage}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-slate-500 underline mt-2 block hover:text-[#fd7e5a]"
                  >
                    Upload New photo
                  </button>

                  <div className="flex space-x-4 mt-8">
                    <StatCard
                      icon={BookOpen}
                      value="120"
                      label="Readings"
                      color="bg-[#fd7e5a]"
                    />
                    <StatCard
                      icon={PlusSquare}
                      value="10"
                      label="Contribution"
                      color="bg-[#7c5dff]"
                    />
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex-1 relative">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute -top-4 right-0 p-2 text-slate-500 hover:text-[#fd7e5a] hover:bg-orange-50 rounded-full transition-colors"
                    title="Edit Profile"
                    aria-label="Toggle Edit Profile Mode"
                  >
                    <Pencil size={18} />
                  </button>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateProfile();
                    }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      {[
                        { label: "Full name", field: "name", type: "text" },
                        { label: "Email Address", field: "email", type: "email" },
                      ].map(({ label, field, type }) => (
                        <div key={field}>
                          <label className="block text-sm font-medium text-slate-600 mb-1">
                            {label}
                          </label>
                          <input
                            type={type}
                            value={user[field as keyof typeof user]}
                            onChange={(e) =>
                              setUser({ ...user, [field]: e.target.value })
                            }
                            disabled={!isEditing}
                            autoComplete="off"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#fd7e5a] focus:border-[#fd7e5a]"
                          />
                        </div>
                      ))}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={3}
                          value={user.bio}
                          onChange={(e) => setUser({ ...user, bio: e.target.value })}
                          disabled={!isEditing}
                          autoComplete="off"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#fd7e5a] focus:border-[#fd7e5a] resize-none"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex items-center space-x-4">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#fd7e5a] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium disabled:bg-opacity-50 disabled:cursor-not-allowed"
                        disabled={!isEditing}
                      >
                        Update Profile
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 text-slate-600 hover:text-[#fd7e5a] text-sm font-medium"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab === "Login & Security" && (
            <div className="mt-8 text-gray-600 text-sm">
              Login and security settings will go here...
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="mt-8 text-gray-600 text-sm">
              Notification preferences coming soon...
            </div>
          )}

          {activeTab === "Interface" && (
            <div className="mt-8 text-gray-600 text-sm">
              Interface settings will go here...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
