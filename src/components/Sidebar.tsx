'use client';

import { Home, Search, BarChart3, Gift } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-4 flex-1">
        <div className="border border-gray-300 rounded p-3 mb-8">
          <h2 className="text-lg font-bold text-gray-800">
            My <span className="text-orange-500">Book</span>
          </h2>
          <h2 className="text-lg font-bold text-gray-800">Shelf</h2>
        </div>

        <nav className="space-y-3">
          <a
            href="/dashboard"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <Home size={16} />
            <span>Home</span>
          </a>
          <a
            href="/search"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
          >
            <Search size={16} />
            <span>Search</span>
          </a>
          <a
            href="/myshelf"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <BarChart3 size={16} />
            <span>My Shelf</span>
          </a>
          <a
            href="/contribute"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <Gift size={16} />
            <span>Contribute</span>
          </a>
        </nav>
      </div>

      {/* Footer */}
      <div className="p-10 border-t border-gray-200 ml-0">
        <div className="space-y-2 text-gray-500 text-xs">
          <p className="cursor-pointer hover:text-gray-700 transition-colors">About</p>
          <p className="cursor-pointer hover:text-gray-700 transition-colors">Support</p>
          <p className="cursor-pointer hover:text-gray-700 transition-colors">
            Terms & Condition
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
