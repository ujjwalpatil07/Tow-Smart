import React from "react";
import { Link } from "react-router-dom";
import { useAdminAuth, useCustomerAuth } from "../Context/AuthProvider";

const Footer = () => {

  const [authAdmin] = useAdminAuth();
  const [authCustomer] = useCustomerAuth();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-amber-400 mb-3">Tow-Smart</h3>
          <p className="text-sm text-gray-300">
            Helping traffic officers easily notify vehicle owners. Real-time towing updates with just one click.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">

            <li><Link to="/landing" className="hover:text-amber-400">Explore us</Link></li>
            {authAdmin ? <li><Link to="/history" className="hover:text-amber-400">Towing History</Link></li> : <li><Link to="/c/challans" className="hover:text-amber-400">Check your challans</Link></li>}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="font-semibold mb-3">About</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
            <li><a href="#" className="hover:text-amber-400">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-300">📍 Mumbai, India</p>
          <p className="text-sm text-gray-300">📞 +91-9876543210</p>
          <p className="text-sm text-gray-300">✉ support@tow-smart.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 border-t border-gray-700 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Tow-Smart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
