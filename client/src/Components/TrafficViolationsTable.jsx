import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export default function TrafficViolationsTable() {
  const violations = [
    { violation: "No Parking Zone", fine: "₹500 - ₹1,000", severity: "Medium" },
    { violation: "Over Speeding", fine: "₹1,000 - ₹2,000", severity: "High" },
    { violation: "Signal Jump", fine: "₹1,000", severity: "High" },
    { violation: "Wrong Side Driving", fine: "₹5,000", severity: "Critical" },
    { violation: "No Seatbelt", fine: "₹1,000", severity: "Medium" },
    { violation: "Drunk Driving", fine: "₹10,000 + Arrest", severity: "Critical" },
  ];

  const getSeverityColor = (level) => {
    switch (level) {
      case "High":
        return "bg-yellow-500 text-white";
      case "Medium":
        return "bg-blue-900 text-white";
      case "Critical":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50  flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <FaExclamationCircle className="text-red-500" />
        Common Traffic Violations & Fines
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#1E3A8A] text-white">
            <tr>
              <th className="py-3 px-6 font-semibold text-sm md:text-base">Violation</th>
              <th className="py-3 px-6 font-semibold text-sm md:text-base">Fine Amount</th>
              <th className="py-3 px-6 font-semibold text-sm md:text-base">Severity</th>
            </tr>
          </thead>
          <tbody>
            {violations.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-6 text-gray-900">{item.violation}</td>
                <td className="py-3 px-6 text-gray-700">{item.fine}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
