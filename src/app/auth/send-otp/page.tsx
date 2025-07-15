"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SendOtpPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Auto-fill email from localStorage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authorization token not found. Please log in.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://mybooklibrary-5awp.onrender.com/api/auth/otp/send",
        { email: email.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      setMessage(res.data || "OTP sent successfully.");

      // ✅ Redirect to OTP input page
      router.push("/auth/OTP");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (typeof error.response?.data === "string") {
          setMessage(`Error: ${error.response.data}`);
        } else {
          setMessage("Failed to send OTP.");
        }
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
          Send OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email address to receive an OTP.
        </p>

        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-sm font-medium text-center ${
              message.toLowerCase().includes("error") ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
