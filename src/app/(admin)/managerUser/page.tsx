"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Lock,
  Unlock,
  Eye,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  username: string;
  email: string;
  regNo: string;
  role: string;
  status: "Active" | "Suspended";
  joinedDate: string;
  borrowedBooks: number;
  readingHistory: string[];
};

// Temporary static data (optional, can be empty)
const managerUser: User[] = [];

export default function ManageUsers() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>(managerUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  // ✅ Pull new user from localStorage (if redirected from /addUser)
  useEffect(() => {
    const storedNewUser = localStorage.getItem("newUser");
    if (storedNewUser) {
      const parsedUser: User = JSON.parse(storedNewUser);
      setUsers((prev) => {
        const exists = prev.some((u) => u.email === parsedUser.email);
        if (!exists) return [parsedUser, ...prev];
        return prev;
      });
      localStorage.removeItem("newUser");
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.regNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && user.status === "Active") ||
      (filter === "Suspended" && user.status === "Suspended") ||
      (filter === "Recently Joined" &&
        new Date(user.joinedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleBlockUnblock = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" }
          : user
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  const handleViewDetails = (user: User) => {
    alert(
      `User Details:\nUsername: ${user.username}\nEmail: ${user.email}\nBorrowed Books: ${user.borrowedBooks}\nReading History: ${user.readingHistory.join(", ")}`
    );
  };

  return (
    <div className="flex flex-col p-6 h-full text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <button
          onClick={() => router.push("/addUser")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow flex flex-col flex-1">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/3">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by username, email, or reg no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="relative w-48">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full pl-4 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Recently Joined">Recently Joined</option>
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto flex-1 min-h-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-sm font-semibold text-gray-700">Username</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Email</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Reg No.</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Role</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Joined</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Borrowed</th>
                <th className="p-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm">{user.username}</td>
                    <td className="p-3 text-sm">{user.email}</td>
                    <td className="p-3 text-sm">{user.regNo}</td>
                    <td className="p-3 text-sm capitalize">{user.role}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{user.joinedDate}</td>
                    <td className="p-3 text-sm">{user.borrowedBooks}</td>
                    <td className="p-3 text-sm flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="text-orange-500 hover:text-orange-600"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleBlockUnblock(user.id)}
                        className="text-gray-500 hover:text-gray-600"
                        title={user.status === "Active" ? "Block" : "Unblock"}
                      >
                        {user.status === "Active" ? <Lock size={18} /> : <Unlock size={18} />}
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
