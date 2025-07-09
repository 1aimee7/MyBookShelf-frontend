"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password submitted", { email });

    // Mock API call for password reset
    const response = { success: true }; // Mock response

    if (response.success) {
      alert("A password reset link has been sent to " + email);
      router.push("/auth/login");
    } else {
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "white" }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1078"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="paint0_linear_7_126"
              x1="533.5"
              y1="-250.046"
              x2="930.38"
              y2="1569.83"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA7C54" />
              <stop offset="1" stopColor="#EC2C5A" />
            </linearGradient>
          </defs>
          <path
            d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z"
            fill="url(#paint0_linear_7_126)"
          />
        </svg>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg h-130 max-w-md z-10 w-85">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Forgot Your Password?
          <br />
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm mb-1"
            >
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

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Send Reset Link
          </button>

          <div className="mt-4 flex justify-between text-gray-600 text-xs">
            <span>
              Remembered your password?{" "}
              <a
                href="/auth/login"
                className="text-blue-600 hover:underline text-xs"
              >
                Log in
              </a>
            </span>
            <a
              href="/register"
              className="text-blue-600 hover:underline text-xs"
            >
              Register Here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
