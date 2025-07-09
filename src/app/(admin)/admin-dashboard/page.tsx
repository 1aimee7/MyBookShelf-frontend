"use client";

import {
  Book,
  Users,
  CalendarCheck,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Chart to avoid SSR issues
const Chart = dynamic(() => import("@/components/Chart"), { ssr: false });

const AdminDashboardPage = () => {
  const [summary] = useState({
    books: 210,
    users: 87,
    borrowedToday: 14,
    overdue: 3,
  });

  const recentActivities = [
    { id: 1, action: "John borrowed 'Atomic Habits'", time: "2 mins ago" },
    { id: 2, action: "Emily returned 'Deep Work'", time: "10 mins ago" },
    { id: 3, action: "New user registered: Mike", time: "30 mins ago" },
    { id: 4, action: "Anna borrowed 'Digital Fortress'", time: "1 hr ago" },
  ];

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 bg-gray-50">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card icon={<Book className="text-white" size={28} />} label="Total Books" value={summary.books} bgColor="bg-orange-500" />
          <Card icon={<Users className="text-white" size={28} />} label="Total Users" value={summary.users} bgColor="bg-orange-400" />
          <Card icon={<CalendarCheck className="text-white" size={28} />} label="Borrowed Today" value={summary.borrowedToday} bgColor="bg-orange-300" />
          <Card icon={<Clock className="text-white" size={28} />} label="Overdue" value={summary.overdue} bgColor="bg-orange-600" />
        </div>

        {/* Chart & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="col-span-2 bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <TrendingUp className="text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Borrowing Trend</h2>
            </div>
            <Chart />
            <p className="text-sm text-gray-500 mt-2">Monthly Borrowing Statistics</p>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>■ Books Borrowed</span>
              <span>Last Updated: 01:28 PM, 09-Jul-2025</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
            <ul className="space-y-4 text-sm text-gray-600">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <span>{activity.action}</span>
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-400">Updated: 01:28 PM, 09-Jul-2025</div>
            <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
              View All
            </button>
          </div>
        </div>

        {/* More Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card icon={<Users className="text-white" size={28} />} label="New Users Today" value={5} bgColor="bg-orange-200" />
          <Card icon={<TrendingUp className="text-white" size={28} />} label="Total Fines Collected" value={150} bgColor="bg-orange-700" />
        </div>

        {/* Section Headers */}
        <div className="bg-gradient-to-r from-orange-100 to-white p-4 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 animate-pulse">Library Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Last refreshed: 01:28 PM CAT, 09-Jul-2025</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Add New Book
            </button>
            <button className="bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors">
              View User Details
            </button>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Performers</h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
              <Users size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="font-medium">Top Librarian: Jane Doe</p>
              <p className="text-sm text-gray-500">Processed 50 returns this week</p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ 3 overdue books need attention. Check Borrowed Books section.
          </p>
        </div>

        {/* Weather */}
        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Weather in Kigali</h2>
          <div className="flex items-center space-x-4">
            <span className="text-3xl">24°C</span>
            <span className="text-sm text-gray-500">Sunny, 15% chance of rain</span>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 text-center">
          System Uptime: 99.9% | Session Active: 2h 15m
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

// Card component
const Card = ({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
}) => (
  <div className={`flex items-center p-5 rounded-xl text-white shadow-md transition-transform hover:scale-[1.02] duration-200 ${bgColor}`}>
    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
