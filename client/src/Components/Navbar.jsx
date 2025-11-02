import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegIdBadge } from "react-icons/fa6";
import { toast } from "react-toastify";
import { MdOutlineLocalPolice } from "react-icons/md";
import { MdPersonOutline } from "react-icons/md";
import { useAdminAuth, useCustomerAuth } from "../Context/AuthProvider"

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  const toggleMenu = () => setNavOpen(!navOpen);

  const [authAdmin] = useAdminAuth();
  const [authCustomer] = useCustomerAuth();

  const adminDetails = {
    name: authAdmin?.name,
    email: authAdmin?.email,
    lastLogin: "April 20, 2025 - 10:30 AM",
    role: "Towing Admin",
    station: "Mumbai East Zone",
  };

  const customerDetails = {
    name: authCustomer?.fullName,
    email: authCustomer?.email,
    vehicleModel: authCustomer?.vehicleModel,
    vehicleNo: authCustomer?.vehicleNo,
    phone: authCustomer?.phone,
    activeChallans: authCustomer?.challans,
    lastLogin: "April 22, 2025 - 08:45 PM",
    type: "Vehicle Owner",
  };

  const handleLogOut = () => {
    localStorage.removeItem("Admin");
    localStorage.removeItem("Customer");
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  };

  const navItemsAdmin = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/" },
    { name: "Towing History", path: "/history" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const navItemsCustomer = [
    { name: "Explore Us", path: "/" },
    { name: "Check Your Challans", path: "/c/challans" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const navItemsCommon = [
    { name: "Explore Us", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]


  // Choose appropriate nav items
  // Choose appropriate nav items
  const activeNavItems = authAdmin
    ? navItemsAdmin
    : authCustomer
      ? navItemsCustomer
      : navItemsCommon;


  return (
    <>
      <nav className="bg-gradient-to-r from-yellow-100 via-white to-yellow-100 shadow-lg sticky top-0 z-50 border-b border-amber-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-amber-600">
            <MdOutlineLocalPolice className="text-2xl sm:text-3xl text-amber-500 animate-pulse" />
            Tow-Smart
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 text-gray-800 font-medium text-md tracking-wide">
              {activeNavItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-amber-500 transition">{item.name}</Link>
                </li>
              ))}
              {!authAdmin && !authCustomer ? (
                <li><Link to="/c/login" className="hover:text-amber-500 transition">Login</Link></li>
              ) : (
                <li><Link onClick={handleLogOut} className="hover:text-red-600 transition">Logout</Link></li>
              )}
            </ul>

            {/* Admin or Customer Icon */}
            {authAdmin && (
              <div className="relative">
                <div
                  className="h-10 w-10 border-2 border-amber-500 rounded-full bg-amber-100 flex justify-center items-center cursor-pointer shadow-inner"
                  onClick={() => setShowAdminModal(!showAdminModal)}
                >
                  <FaRegIdBadge className="text-amber-600 text-xl" />
                </div>
                {showAdminModal && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-amber-200 shadow-lg rounded-lg z-50 p-4">
                    <h3 className="text-md font-bold text-amber-600 mb-2 flex items-center gap-1">
                      <FaRegIdBadge /> Admin Details
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><b>Name:</b> {adminDetails.name}</li>
                      <li><b>Email:</b> {adminDetails.email}</li>
                      <li><b>Role:</b> {adminDetails.role}</li>
                      <li><b>Station:</b> {adminDetails.station}</li>
                      <li><b>Last Login:</b> {adminDetails.lastLogin}</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {authCustomer && (
              <div className="relative">
                <div
                  className="h-10 w-10 border-2 border-amber-500 rounded-full bg-yellow-50 flex justify-center items-center cursor-pointer shadow-inner"
                  onClick={() => setShowCustomerModal(!showCustomerModal)}
                >
                  <MdPersonOutline className="text-amber-600 text-xl" />
                </div>
                {showCustomerModal && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-amber-200 shadow-lg rounded-lg z-50 p-4">
                    <h3 className="text-md font-bold text-amber-600 mb-2 flex items-center gap-1">
                      <MdPersonOutline /> Customer Details
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><b>Name:</b> {customerDetails.name}</li>
                      <li><b>Email:</b> {customerDetails.email}</li>
                      <li><b>Type:</b> {customerDetails.type}</li>
                      <li><b>vehicle Model:</b>{customerDetails.vehicleModel}</li>
                      <li><b>vehicle No:</b>{customerDetails.vehicleNo}</li>
                      {/* <li><b>Active Challans: </b>{customerDetails.activeChallans.length}</li> */}
                      <li><b>Last Login:</b> {customerDetails.lastLogin}</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={toggleMenu}
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {navOpen && (
          <ul className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-white text-gray-800 font-medium border-t border-amber-200 shadow-sm">
            {activeNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={toggleMenu}
                  className="block py-2 hover:text-amber-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!authAdmin && !authCustomer ? (
              <li><Link to="/c/login" onClick={toggleMenu} className="block py-2 hover:text-amber-500 transition">Login</Link></li>
            ) : (
              <li><Link onClick={handleLogOut} className="block py-2 hover:text-red-500 transition">Logout</Link></li>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
