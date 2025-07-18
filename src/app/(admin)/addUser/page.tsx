"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const storedToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (!storedToken) {
      setError("Authentication error. Please log in again.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const formData = {
      email,
      password,
      confirmPassword,
      userName: username,
      role,
    };

    try {
      const response = await axios.post(
        "https://mybooklibrary-5awp.onrender.com/api/auth/admin/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.log("User created:", response.data);
      alert("User created successfully!");
      router.push("/admin-dashboard/manage-users");
    } catch (err: unknown) {
      const errorMsg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to create user.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Input change handlers with correct types
  const handleInputChange =
    (setter: (val: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setter(e.target.value);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-black">
      <h1 className="text-xl font-bold mb-4">Add New User</h1>

      <form onSubmit={handleAddUser} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleInputChange(setUsername)}
          required
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
          required
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange(setPassword)}
          required
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleInputChange(setConfirmPassword)}
          required
          className="w-full p-2 border rounded-md"
          disabled={loading}
        />

        <select
          value={role}
          onChange={handleInputChange(setRole)}
          required
          className="w-full p-2 border rounded-md"
          disabled={loading}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add User"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
