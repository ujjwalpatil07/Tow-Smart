import React from "react";
import { FaParking, FaCarCrash, FaExclamationTriangle, FaTools } from "react-icons/fa";

export default function SafetyGuidelines() {
  const guidelines = [
    {
      icon: <FaParking className="text-3xl text-white" />,
      title: "Parking Safety",
      color: "bg-[#1E3A8A]", // navy blue
      points: [
        "Always park in designated parking zones only",
        "Never block fire exits, driveways, or emergency routes",
        "Ensure your vehicle doesn't obstruct traffic flow",
        "Use handbrake and first gear when parking on slopes",
      ],
    },
    {
      icon: <FaCarCrash className="text-3xl text-white" />,
      title: "Road Safety",
      color: "bg-[#D69E2E]", // golden yellow
      points: [
        "Always wear seatbelt - front and back passengers",
        "Maintain safe distance from vehicle ahead",
        "Use indicators before changing lanes",
        "Avoid using mobile phones while driving",
      ],
    },
    {
      icon: <FaExclamationTriangle className="text-3xl text-white" />,
      title: "Traffic Rules",
      color: "bg-[#DC2626]", // red
      points: [
        "Follow speed limits strictly in all zones",
        "Stop completely at red lights and stop signs",
        "Give way to emergency vehicles immediately",
        "Never drink and drive - zero tolerance",
      ],
    },
    {
      icon: <FaTools className="text-3xl text-white" />,
      title: "Vehicle Maintenance",
      color: "bg-[#4B5563]", // gray
      points: [
        "Check tire pressure and tread depth regularly",
        "Ensure all lights and indicators are working",
        "Keep valid insurance and registration documents",
        "Service your vehicle as per manufacturer schedule",
      ],
    },
  ];

  return (
    <div className=" bg-gray-50 flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Essential Safety Guidelines
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {guidelines.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-transform hover:scale-[1.01]"
          >
            <div className={`${section.color} flex items-center gap-3 px-5 py-3`}>
              {section.icon}
              <h2 className="text-lg md:text-xl font-semibold text-white">{section.title}</h2>
            </div>
            <ul className="p-5 space-y-2 text-gray-700 text-sm md:text-base">
              {section.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 bg-blue-900 rounded-full"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
