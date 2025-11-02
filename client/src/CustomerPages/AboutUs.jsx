import React from "react";
import { FaTruckPickup } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-amber-200 px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl text-center bg-white shadow-xl rounded-lg p-10 md:p-16 border-t-8 border-amber-500 animate-fade-in">
        <div className="flex justify-center mb-6">
          <FaTruckPickup className="text-amber-500 text-5xl" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
          About <span className="text-amber-500">Tow-Smart</span>
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong className="text-amber-600">Tow-Smart</strong> is a smart towing solution designed
          to streamline the vehicle towing process. Whether you're a traffic officer or a vehicle
          owner, our platform ensures transparency, real-time alerts, and efficient communication.
        </p>
        <p className="text-gray-700 text-lg mt-5 leading-relaxed">
          With instant SMS notifications and an intuitive user interface, we aim to reduce chaos,
          increase accountability, and promote smarter urban mobility. Let's build a more disciplined
          and digitally enabled future—one tow at a time!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
