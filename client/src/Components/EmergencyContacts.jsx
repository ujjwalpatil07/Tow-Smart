import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function EmergencyContacts() {
  const contacts = [
    { title: "Police Control Room", number: "100" },
    { title: "Traffic Police", number: "103" },
    { title: "Ambulance", number: "108" },
    { title: "TowSmart Helpline", number: "1800-123-4567" },
  ];

  return (
    <div className="bg-white  flex flex-col items-center py-10 px-6">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <FaPhoneAlt className="text-red-500" />
        Emergency Contacts
      </h1>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {contact.title}
            </h2>
            <p className="text-3xl font-bold text-blue-900 tracking-wide">
              {contact.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
