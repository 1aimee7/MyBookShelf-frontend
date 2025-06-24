"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Verified() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard"); // Redirect to Home page
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
            <linearGradient id="paint0_linear_7_126" x1="533.5" y1="-250.046" x2="930.38" y2="1569.83" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FA7C54"/>
              <stop offset="1" stopColor="#EC2C5A"/>
            </linearGradient>
          </defs>
          <path d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z" fill="url(#paint0_linear_7_126)"/>
        </svg>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md z-10 text-center">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Verification
        </p>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Thank you</p>
          <p className="text-gray-800 text-lg mb-4">You are Verified</p>
          <div className="flex justify-center mb-4">
            <span className="inline-block w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">✔</span>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}