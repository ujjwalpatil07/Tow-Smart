import React from "react";
import { FaUserAlt, FaClock, FaLightbulb } from "react-icons/fa";

export default function ResponsibleCitizen() {
  return (
    <div className="bg-blue-900 text-white text-center py-20 px-6 flex flex-col items-center">
      {/* Icon */}
      <FaUserAlt className="text-5xl mb-6" />

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Be a Responsible Citizen
      </h1>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-10">
        Following traffic rules saves lives. Your safety and the safety of others
        depends on responsible driving.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* Check Challans Button */}
        <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
          <FaClock className="text-lg" />
          Check Your Challans
        </button>

        {/* Report Issues Button */}
        <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-blue-900 transition-all">
          <FaLightbulb className="text-lg" />
          Report Traffic Issues
        </button>
      </div>
    </div>
  );
}
