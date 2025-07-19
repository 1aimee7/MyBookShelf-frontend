"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;            // user email or ID
  role: "ADMIN" | "USER"; // role from backend
  exp: number;
  iat: number;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://mybooklibrary-5awp.onrender.com/api/auth/login",
        { email, password }
      );

      // This robustly handles the token whether it's direct or in an object.
      const token = response.data.token || response.data;

      if (typeof token !== "string") {
        throw new Error("Login failed: Invalid token format.");
      }

      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded JWT:", decoded);

      // This is the correct implementation for "Remember Me".
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("authToken", token);
      storage.setItem("email", decoded.sub); // Use email from token
      storage.setItem("role", decoded.role);   // Store role for easy access

      // Redirect logic is correct.
      if (decoded.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      // Error handling is clean and prioritizes backend messages.
      let errorMsg = "Login failed. Please try again.";
      if (axios.isAxiosError(err)) {
        errorMsg = err.response?.data?.message || errorMsg;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Welcome Back! <br /> Sign in to your Digital Library
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
          )}

          <div className="mb-6 flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                className="mr-2 accent-orange-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              Remember me
            </label>
            <a href="/auth/forgotPassword" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            } text-white font-semibold py-2 px-4 rounded transition-colors`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 flex justify-between text-gray-600 text-xs">
            <span>
              New User?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Register Here
              </a>
            </span>
            <a href="/guest" className="text-blue-600 hover:underline">
              Use as Guest
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}