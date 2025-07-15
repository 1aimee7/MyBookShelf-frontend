"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("aimeishimwe25@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://mybooklibrary-5awp.onrender.com/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            // Don't add Authorization here for login request, backend will authenticate user by email/password
          },
        }
      );

      // Assuming the response data is the token string itself (from your curl)
      const token = response.data;
      console.log("Login successful, token:", token);

      // Save token (e.g. localStorage or cookies)
      localStorage.setItem("authToken", token);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error(err);

      interface AxiosErrorLike {
        response?: {
          data?: {
            message?: string;
          };
        };
      }

      if (err instanceof Error) {
        setError(err.message || "Login failed. Please check your credentials.");
      } else if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as AxiosErrorLike).response?.data?.message === "string"
      ) {
        setError(
          (err as AxiosErrorLike).response?.data?.message ??
            "Login failed. Please check your credentials."
        );
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background SVG omitted for brevity */}
      <div className="bg-white p-8 rounded-xl shadow-lg h-130 max-w-md z-10 w-85">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Welcome Back!
          <br />
          Sign in to your Digital Library
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@collegename.ac.za"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 mb-4 text-sm font-semibold">{error}</p>
          )}

          <div className="mb-6 flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2 accent-orange-500" /> Remember me
            </label>
            <a href="/auth/forgotPassword" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
            } text-white font-semibold py-2 px-4 rounded`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 flex justify-between text-gray-600 text-xs">
            <span>
              New User?{" "}
              <a href="/register" className="text-blue-600 hover:underline text-xs">
                Register Here
              </a>
            </span>
            <a href="#" className="text-blue-600 hover:underline text-xs">
              Use as Guest
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
