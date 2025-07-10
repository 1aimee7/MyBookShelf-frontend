"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Form submitted", {
      username,
      regNo,
      email,
      role,
      password,
    });

    // Simulate successful response
    const response = { success: true };

    if (response.success) {
      router.push("/auth/OTP");
    } else {
      alert("Registration failed");
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

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md z-10 w-85">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span> Shelf
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm leading-tight">
          Welcome!
          <br />
          Create your Digital Library account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reg No.
            </label>
            <input
              type="text"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="College Reg. No."
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@gmail.com"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="user">User</option>
             
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </button>

          <div className="mt-4 flex justify-between text-gray-600 text-xs">
            <span>
              Back to{" "}
              <a
                href="/auth/login"
                className="text-blue-600 hover:underline text-xs"
              >
                Login
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
