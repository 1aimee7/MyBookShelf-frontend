"use client";

import React from "react";

export default function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleLoginNow = () => {
    window.location.href = '/login';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with exact SVG from image */}
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

      {/* Registration Form */}
      <div className="bg-white p-8 rounded-xl  shadow-lg h-145 max-w-md z-10 w-90">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Registration
          <br />
          For Both Staff & Students
        </p>

        <div>
          <div className="mb-4">
            <label htmlFor="regno" className="block text-gray-700 text-sm mb-1">
              Reg No.
            </label>
            <input
              id="regno"
              type="text"
              placeholder="College Reg. No."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-1">
              College Email ID
            </label>
            <input
              id="email"
              type="email"
              placeholder="username@collegename.ac.in"
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
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="********"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </button>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>
              Already a User?{" "}
              <button onClick={handleLoginNow} className="text-blue-600 hover:underline">
                Login now
              </button>
            </span>
            <button className="text-blue-600 hover:underline">
              Use as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}