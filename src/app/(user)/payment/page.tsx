"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ArrowLeft } from "lucide-react";

const BookShelfPayment = () => {
  const [currentStep, setCurrentStep] = useState("pending");

  const bookData = {
    title: "Don't Make Me Think",
    author: "Steve Krug, 2000",
    genre: "Science fiction",
    usage: "3 Days",
    format: "Hard Copy",
    penalties: "₹0",
    charges: "₹100",
    image: "/api/placeholder/60/80",
  };

  const handlePayNow = () => {
    setCurrentStep("payment");
  };

  const handleProceedToPay = () => {
    setCurrentStep("success");
  };

  const handleBack = () => {
    setCurrentStep("pending");
  };

  const BookRow = () => (
    <div className="grid grid-cols-6 gap-4 p-4 items-center">
      <div className="flex items-center space-x-3">
        <Image
          src={bookData.image}
          alt={bookData.title}
          width={48}
          height={64}
          className="rounded object-cover"
        />
        <div>
          <div className="font-medium text-gray-800">{bookData.title}</div>
          <div className="text-sm text-gray-600">{bookData.author}</div>
          <div className="text-xs text-gray-500">{bookData.genre}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">{bookData.usage}</div>
      <div className="text-sm text-gray-600">{bookData.format}</div>
      <div className="text-sm text-gray-600">{bookData.penalties}</div>
      <div className="text-sm text-gray-600">{bookData.charges}</div>
      <div>
        <button
          onClick={handlePayNow}
          className="bg-orange-500 text-white px-4 py-2 rounded text-sm hover:bg-orange-600"
        >
          Pay Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <ArrowLeft
            size={20}
            className="text-gray-600 cursor-pointer"
            onClick={handleBack}
          />
          <span className="text-gray-600">Back</span>
        </div>

        <h1 className="text-2xl font-semibold mb-6">Pending Payments</h1>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div>Title</div>
            <div>Usage</div>
            <div>Book Format</div>
            <div>Penalties</div>
            <div>Charges</div>
            <div></div>
          </div>

          {currentStep === "pending" && <BookRow />}

          {currentStep === "payment" && (
            <>
              <BookRow />
              {/* Payment Modal */}
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96">
                  <h2 className="text-xl font-semibold mb-6 text-center">PAYMENT</h2>

                  <div className="mb-6">
                    <div className="bg-blue-600 text-white p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">VISA</span>
                        <span className="text-sm">5014</span>
                      </div>
                      <div className="text-lg tracking-widest mb-2">
                        •••• •••• •••• 5014
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">REGINALD KENSON</span>
                        <span className="text-sm">06/21</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        XXXX XXXX XXXX 5014
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Card number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        REGINALD KENSON
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        placeholder="Cardholder name"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          06/21
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          XXX
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                          placeholder="CVV"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">SAVE CARD TO PAYMENT</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">TOTAL: ₹100</span>
                    <button
                      onClick={handleProceedToPay}
                      className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                    >
                      PROCEED TO PAY
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === "success" && (
            <>
              <BookRow />
              {/* Success Modal */}
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-96 text-center">
                  <h2 className="text-xl font-semibold mb-6">PAYMENT COMPLETED</h2>
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-white" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You will be redirected to Main page
                  </p>
                  <button
                    onClick={handleBack}
                    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                  >
                    OK
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookShelfPayment;
