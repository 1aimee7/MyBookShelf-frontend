"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Edit3, ShieldAlert, CheckCircle } from "lucide-react";

interface AdminFormData {
  adminName: string;
  adminEmail: string;
  adminId: string;
  department: string;
  permissions: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

const SimpleAccountSettings = () => {
  const [activeTab, setActiveTab] = useState<string>("Account Setting");
  const [formData, setFormData] = useState<AdminFormData>({
    adminName: "",
    adminEmail: "",
    adminId: "",
    department: "",
    permissions: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = ["Account Setting", "Login & Security", "Notifications"];

  useEffect(() => {
    const loadInitialData = () => {
      const storedData = localStorage.getItem("currentAdminUser");
      if (storedData) {
        const adminData = JSON.parse(storedData);
        setFormData(adminData.formData);
        setProfileImage(adminData.profileImage);
      } else {
        setFormData({
          adminName: 'Default Admin',
          adminEmail: 'admin@example.com',
          adminId: 'ADM-DEFAULT',
          department: 'IT',
          permissions: 'Default permissions.'
        });
      }
    };
    loadInitialData();
  }, []);

  const handleInputChange = (field: keyof AdminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(objectUrl);
    }
  };

  const handleUpdateProfile = () => {
    setIsSaving(true);
    setNotification(null);

    setTimeout(() => {
      const updatedAdminData = {
        formData,
        profileImage,
      };
      localStorage.setItem("currentAdminUser", JSON.stringify(updatedAdminData));

      setIsSaving(false);
      setNotification({ type: "success", message: "Profile updated successfully!" });

      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  const handleReset = () => {
    const storedData = localStorage.getItem("currentAdminUser");
    if (storedData) {
      const adminData = JSON.parse(storedData);
      setFormData(adminData.formData);
      setProfileImage(adminData.profileImage);
    }
  };

  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "A");

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen text-gray-800">
      <div className="flex space-x-8 mb-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 border-b-2 transition-colors duration-200 text-sm sm:text-base ${
              activeTab === tab
                ? "border-orange-500 text-orange-500 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Account Setting" && (
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/4">
            <h3 className="text-gray-700 font-medium mb-4 text-center">Admin Profile</h3>
            <div className="w-32 h-32 rounded-full mx-auto mb-4 relative bg-gray-200 text-orange-500 flex items-center justify-center">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Admin Profile"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold">{getInitial(formData.adminName)}</span>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={handleImageUploadClick}
                className="text-orange-600 hover:text-orange-800 underline text-sm font-medium"
              >
                Upload New Photo
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-2">Allowed formats: JPG, GIF or PNG.</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
              <Edit3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => handleInputChange("adminName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin ID</label>
                  <input
                    type="text"
                    value={formData.adminId}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select department</option>
                    <option value="IT">IT Department</option>
                    <option value="Academic">Academic Department</option>
                    <option value="Operations">Operations Department</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Permissions</label>
                <textarea
                  value={formData.permissions}
                  onChange={(e) => handleInputChange("permissions", e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {notification && (
                <div className={`flex items-center p-3 rounded-lg text-sm ${
                    notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {notification.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <ShieldAlert className="w-5 h-5 mr-2" />}
                  {notification.message}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t mt-8">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-wait"
                >
                  {isSaving ? "Updating..." : "Update Profile"}
                </button>
                <button
                  onClick={handleReset}
                  disabled={isSaving}
                  className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "Account Setting" && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">Content for {activeTab} goes here.</h3>
        </div>
      )}
    </div>
  );
};

export default SimpleAccountSettings;
