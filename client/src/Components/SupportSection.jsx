import React from "react";
import { FaPhoneAlt, FaClock } from "react-icons/fa";

export default function SupportSection() {
  return (
    <div className="py-16 px-4 flex justify-center">
      <div
        className="relative bg-cover bg-center border-2 border-blue-900 rounded-2xl shadow-sm w-full max-w-5xl text-center py-12 px-6"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        {/* Background Overlay for readability */}
        <div className="absolute inset-0 bg-blue-900/60 rounded-2xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold text-white mb-2">Need Help?</h2>
          <p className="text-gray-200 mb-8">
            Contact our 24/7 support team or check your vehicle status
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:18001234567"
              className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all"
            >
              <FaPhoneAlt className="text-lg" />
              Call Support: 1800-123-4567
            </a>

            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-blue-900 transition-all">
              <FaClock className="text-lg" />
              Check Tow Status
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
