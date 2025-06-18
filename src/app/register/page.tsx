"use client";

import React from "react";

export default function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., form validation or API call)
    console.log("Form submitted");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient and Wave */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1078"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          {/* Semi-transparent wave path */}
          <path
            d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z"
            fill="url(#grad)"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      {/* Registration Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md z-10">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Registration
          <br />
          For Both Staff & Students
        </p>

        <form onSubmit={handleSubmit}>
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </button>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>
              Already a User?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Login now
              </a>
            </span>
            <a href="#" className="text-blue-600 hover:underline">
              Use as Guest
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
