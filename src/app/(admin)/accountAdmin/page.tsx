"use client";

import React, { useState } from "react";
import { Edit3, Users, Shield } from "lucide-react";
import Image from "next/image";

interface AdminFormData {
  adminName: string;
  adminEmail: string;
  adminId: string;
  department: string;
  permissions: string;
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

  const tabs = [
    "Account Setting",
    "Login & Security",
    "Notifications",
    "Interface",
  ];

  const handleInputChange = (
    field: keyof AdminFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = () => {
    console.log("Profile updated:", formData);
  };

  const handleReset = () => {
    setFormData({
      adminName: "",
      adminEmail: "",
      adminId: "",
      department: "",
      permissions: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      {/* Tab Navigation */}
      <div className="flex space-x-8 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === tab
                ? "border-orange-500 text-orange-500 font-medium"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "Account Setting" && (
        <div className="flex gap-12">
          {/* Left - Profile Info */}
          <div className="flex-shrink-0">
            <div className="text-center">
              <h3 className="text-gray-700 font-medium mb-4">
                Admin Profile Picture
              </h3>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4 relative">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Admin Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <button className="text-blue-600 hover:text-blue-800 underline text-sm">
                Upload New photo
              </button>
            </div>

            {/* Admin Stats Cards */}
            <div className="mt-8 space-y-4">
              <div className="bg-orange-500 text-white rounded-lg p-4 w-40">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">245</span>
                </div>
                <div className="text-sm opacity-90">Users Managed</div>
              </div>

              <div className="bg-purple-600 text-white rounded-lg p-4 w-40">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-5 h-5" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="text-sm opacity-90">Admin Actions</div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <Edit3 className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) =>
                      handleInputChange("adminName", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={formData.adminEmail}
                    onChange={(e) =>
                      handleInputChange("adminEmail", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin email"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Admin ID
                  </label>
                  <input
                    type="text"
                    value={formData.adminId}
                    onChange={(e) =>
                      handleInputChange("adminId", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin ID"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select department</option>
                    <option value="IT">IT Department</option>
                    <option value="HR">HR Department</option>
                    <option value="Finance">Finance Department</option>
                    <option value="Academic">Academic Department</option>
                    <option value="Operations">Operations Department</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Admin Permissions
                </label>
                <textarea
                  value={formData.permissions}
                  onChange={(e) =>
                    handleInputChange("permissions", e.target.value)
                  }
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe admin permissions and access levels..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdateProfile}
                  className="px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Update Admin Profile
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Tabs Content */}
      {activeTab === "Login & Security" && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">
            Admin security settings and access controls
          </h3>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">
            Admin notification preferences for system alerts
          </h3>
        </div>
      )}

      {activeTab === "Interface" && (
        <div className="text-center py-20">
          <h3 className="text-xl text-gray-600">
            Admin dashboard interface customization
          </h3>
        </div>
      )}
    </div>
  );
};

export default SimpleAccountSettings;
