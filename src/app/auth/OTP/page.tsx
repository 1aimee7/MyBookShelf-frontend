"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", otp.join(''));
    // Simulate API call to verify OTP
    const response = { success: true }; // Mock response
    if (response.success) {
      router.push("/verified"); // Redirect to Verified page
    } else {
      alert("Verification failed");
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
            <linearGradient id="paint0_linear_7_126" x1="533.5" y1="-250.046" x2="930.38" y2="1569.83" gradientUnits="userSpaceOnUse">
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

      <div className="bg-white p-8 rounded-xl shadow-lg h-145 max-w-md z-10 w-90">
        <h1 className="text-center text-3xl font-semibold mb-1">
          My <span className="text-orange-500 font-bold">Book</span>
        </h1>
        <h2 className="text-center text-3xl font-light text-gray-700 mb-6">Shelf</h2>

        <div className="text-center mt-6 mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Verification</h3>
          <p className="text-sm text-gray-500">Check your E-mail for OTP</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-4">
            Enter your OTP Here
          </label>

          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-b-2 border-gray-400 focus:border-orange-500 focus:outline-none bg-transparent"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-15"
        >
          Verify
        </button>

        <div className="flex justify-between items-center mt-6">
          <span className="text-gray-600 text-xs">
            Not yet received?{" "}
            <button className="text-blue-600 hover:underline text-xs">
              Resend
            </button>
          </span>
          <button className="text-blue-600 hover:underline text-xs">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}