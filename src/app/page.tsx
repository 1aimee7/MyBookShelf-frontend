"use client";

import React from "react";

export default function Home() {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mt-10">
        <span className="text-orange-500">My Book</span>{' '}
        <span className="text-gray-500">Shelf</span>
      </h1>
      <p className="mt-4 text-gray-600 text-center max-w-md">
        Welcome to your virtual bookshelf! Discover, organize, and enjoy your favorite books.
      </p>
      <div className="mt-6 space-x-4">
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}