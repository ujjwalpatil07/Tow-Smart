import React from "react";
import { Link } from "react-router-dom";
import { useAdminAuth, useCustomerAuth } from "../Context/AuthProvider";
import SafetyGuidelines from "../Components/SafetyGuidelines";
import TrafficViolationsTable from "../Components/TrafficViolationsTable";
import EmergencyContacts from "../Components/EmergencyContacts";
import SupportSection from "../Components/SupportSection";
import ResponsibleCitizen from "../Components/ResponsibleCitizen";

const LandingPage = () => {
  const [authCustomer] = useCustomerAuth();
  const [authAdmin] = useAdminAuth();

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative bg-gray-900 text-white min-h-[93vh] flex items-center">
        {/* Background Image */}
        <img
          src="https://th-i.thgim.com/public/incoming/kisl3g/article66886587.ece/alternates/LANDSCAPE_1200/Violations01.jpg"
          alt="tow truck"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* Animated Top Banner */}
        <div className="absolute top-0 left-0 right-0 bg-red-500 py-2 text-white text-center text-sm font-semibold animate-pulse z-10">
          🚨 Park Responsibly | Follow Traffic Rules | Be a Responsible Citizen 🚓
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-amber-400">Tow-Smart</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Making towing notifications simple, smart, and efficient for everyone.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">

            {authCustomer ? (
              // if customer logged in
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                Welcome {authCustomer?.fullName}
              </button>
            ) : authAdmin ? (
              // if admin logged in
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                Welcome Admin
              </button>
            ) : (
              // no one logged in
              <Link
                to="/c/login"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Get Started
              </Link>
            )}

            <Link
              to="/about"
              className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>

        </div>
      </section>

      {/* ---------------- TRAFFIC AWARENESS ---------------- */}
      <section className="bg-gray-50 py-16 px-6 sm:px-10 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-800">
          🛑 Traffic Awareness Tips
        </h3>

        <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "🪖",
              title: "Wear Helmets",
              desc: "Ensure safety by always wearing helmets while riding.",
            },
            {
              icon: "🚧",
              title: "No Wrong Parking",
              desc: "Avoid fines and towing by parking in designated spots.",
            },
            {
              icon: "🚦",
              title: "Respect Signals",
              desc: "Follow traffic lights to prevent accidents.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- IMAGE BANNER ---------------- */}
      <section className="relative">
        <img
          src="https://images.jdmagicbox.com/rep/b2b/towing-truck/towing-truck-2.jpg"
          alt="towing"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-3xl sm:text-5xl font-bold text-center px-4">
            Fast, Efficient, and Transparent Towing System
          </h2>
        </div>
      </section>

      {/* ---------------- MAIN COMPONENTS ---------------- */}
      <div >
        <SafetyGuidelines />
        <EmergencyContacts />
        <TrafficViolationsTable />
        <SupportSection />
        <ResponsibleCitizen />
      </div>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="py-20 px-6 bg-white max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-gray-800">
          Why Choose Tow-Smart?
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: "🚓",
              title: "Real-time Updates",
              desc: "Send SMS alerts instantly when a vehicle is towed.",
            },
            {
              icon: "📱",
              title: "Easy to Use",
              desc: "Simple and clean UI for traffic officers and admins.",
            },
            {
              icon: "🛡️",
              title: "Secure & Reliable",
              desc: "Built with modern tools for safe data handling.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 shadow-md rounded-xl border hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="py-16 bg-amber-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to Simplify Towing Updates?
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Start using Tow-Smart today!
        </p>
        <Link
          to="/"
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm">
        © {new Date().getFullYear()} Tow-Smart. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
