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
    <div className="p-6 md:p-8 space-y-10 text-gray-800">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          icon={<Book className="text-white" size={28} />}
          label="Total Books"
          value={summary.books}
          bgColor="bg-orange-500"
        />
        <Card
          icon={<Users className="text-white" size={28} />}
          label="Total Users"
          value={summary.users}
          bgColor="bg-orange-400"
        />
        <Card
          icon={<CalendarCheck className="text-white" size={28} />}
          label="Borrowed Today"
          value={summary.borrowedToday}
          bgColor="bg-orange-300"
        />
        <Card
          icon={<Clock className="text-white" size={28} />}
          label="Overdue"
          value={summary.overdue}
          bgColor="bg-orange-600"
        />
      </div>

      {/* Chart & Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Borrowing Trend Chart */}
        <div className="col-span-2 bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">
              Borrowing Trend
            </h2>
          </div>
          <Chart />
        </div>

        {/* Activity Log */}
        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-4 text-sm text-gray-600">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <span>{activity.action}</span>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

// Reusable Summary Card Component
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
  <div
    className={`flex items-center p-5 rounded-xl text-white shadow-md transition-transform hover:scale-[1.02] duration-200 ${bgColor}`}
  >
    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

