"use client";

import React, { useState, FC, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PlusSquare,
  BookOpen,
  Pencil,
  LucideIcon,
  CheckCircle,
  UserX,
} from "lucide-react";

// The data structure for the user's profile
interface UserData {
  name: string;
  email: string;
  bio: string;
}

// Stat card component (unchanged)
interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label:string;
  color: string;
}

const StatCard: FC<StatCardProps> = ({ icon: Icon, value, label, color }) => (
  <div className={`flex-grow ${color} text-white rounded-lg p-4 flex flex-col items-center justify-center shadow-md`}>
    <div className="flex items-center space-x-2">
      <Icon size={20} />
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <span className="text-sm mt-1">{label}</span>
  </div>
);

export default function LibraryAccountPage() {
  const [user, setUser] = useState<UserData>({ name: "", email: "", bio: "" });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Account Setting");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Function to load data only for a logged-in user
  const loadUserData = () => {
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      try {
        const { user: savedUser, profileImage: savedImage } = JSON.parse(storedData);
        setUser(savedUser);
        setProfileImage(savedImage);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setUser({ name: "", email: "", bio: "" }); // Clear state on error
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleUpdateProfile = () => {
    setIsSaving(true);
    setNotification(null);
    setTimeout(() => {
      const updatedData = { user, profileImage };
      localStorage.setItem("currentUser", JSON.stringify(updatedData));
      setIsSaving(false);
      setIsEditing(false);
      setNotification("Profile updated successfully!");
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  const handleReset = () => {
    loadUserData();
    setIsEditing(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "");

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/auth/login");
  };

  const tabs = ["Account Setting", "Login & Security", "Notifications"];
  const isUserLoaded = user && user.name !== "";

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center font-sans bg-slate-100">
      <div className="w-full max-w-screen-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <main className="flex-1 p-6">
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

          {activeTab === "Account Setting" && (
            <div className="mt-8">
              {!isUserLoaded ? (
                <div className="text-center py-20">
                  <UserX size={48} className="mx-auto text-slate-400 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700">No User Found</h3>
                  <p className="text-slate-500 mt-2">Please log in to view and edit your profile.</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="flex-shrink-0 w-full lg:w-60 text-center lg:text-left">
                    <label className="text-sm font-medium text-slate-600 mb-2 block">Your Profile Picture</label>
                    <div className="relative w-28 h-28 mx-auto lg:mx-0 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 overflow-hidden">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile"
                          fill
                          sizes="112px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span className="text-5xl font-bold">{getInitial(user.name)}</span>
                      )}
                    </div>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-slate-500 underline mt-2 block mx-auto lg:mx-0 hover:text-[#fd7e5a]">
                      Upload New Photo
                    </button>
                    <div className="flex space-x-4 mt-8">
                      <StatCard icon={BookOpen} value="120" label="Readings" color="bg-[#fd7e5a]" />
                      <StatCard icon={PlusSquare} value="10" label="Contributions" color="bg-[#7c5dff]" />
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <button onClick={() => setIsEditing(!isEditing)} className="absolute -top-4 right-0 p-2 text-slate-500 hover:text-[#fd7e5a] hover:bg-orange-50 rounded-full transition-colors" title="Edit Profile">
                      <Pencil size={18} />
                    </button>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        {[{ label: "Full Name", field: "name", type: "text" }, { label: "Email Address", field: "email", type: "email" }].map(({ label, field, type }) => (
                          <div key={field}>
                            <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                            <input type={type} value={user[field as keyof UserData]} onChange={(e) => setUser({ ...user, [field]: e.target.value })} disabled={!isEditing || isSaving} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#fd7e5a]" />
                          </div>
                        ))}
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-sm font-medium text-slate-600 mb-1">Bio</label>
                          <textarea rows={3} value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} disabled={!isEditing || isSaving} className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm bg-white disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#fd7e5a] resize-none" />
                        </div>
                      </div>
                      {notification && (
                        <div className="mt-6 flex items-center p-3 rounded-md bg-green-100 text-green-700 text-sm">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          {notification}
                        </div>
                      )}
                      <div className="mt-8 flex items-center space-x-4">
                        <button type="submit" className="px-6 py-2.5 bg-[#fd7e5a] text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium disabled:bg-opacity-50 disabled:cursor-wait" disabled={!isEditing || isSaving}>
                          {isSaving ? "Saving..." : "Update Profile"}
                        </button>
                        <button type="button" onClick={handleReset} disabled={!isEditing || isSaving} className="px-6 py-2.5 text-slate-600 hover:text-[#fd7e5a] text-sm font-medium disabled:opacity-50">
                          Reset
                        </button>
                        <button type="button" onClick={handleLogout} className="ml-auto px-6 py-2.5 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition-colors text-sm">
                          Logout
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab !== "Account Setting" && <div className="mt-8 text-gray-600 text-sm">Content for {activeTab} goes here...</div>}
        </main>
      </div>
    </div>
  );
}