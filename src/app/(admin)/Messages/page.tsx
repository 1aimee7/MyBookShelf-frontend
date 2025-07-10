"use client";

import { useState } from "react";
import { Trash2, Eye } from "lucide-react";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  createdAt: string;
};

const sampleMessages: Message[] = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Book Request",
    content: "Can you add more pregnancy-related books?",
    createdAt: "2025-07-08",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    subject: "Issue with download",
    content: "The PDF is not downloading. Please help!",
    createdAt: "2025-07-09",
  },
];

const MessagePage = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">User Messages</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="min-w-full text-sm">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t hover:bg-orange-50">
                <td className="p-3">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.subject}</td>
                <td className="p-3">{msg.createdAt}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="text-blue-500 hover:text-blue-600"
                    title="View Message"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">{selectedMessage.subject}</h2>
            <p className="text-sm text-gray-600 mb-1">
              From: {selectedMessage.name} ({selectedMessage.email})
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Date: {selectedMessage.createdAt}
            </p>
            <p className="text-gray-800 whitespace-pre-wrap">
              {selectedMessage.content}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
