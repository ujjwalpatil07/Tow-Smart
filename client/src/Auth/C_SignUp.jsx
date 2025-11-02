import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineLocalPolice } from "react-icons/md";
import { signupUser } from "../../services/authServices";

export default function C_SignUp() {
  const navigate = useNavigate();

  const handleVehicleInput = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    let formatted = "";

    // Extract required parts based on strict format
    const part1 = value.slice(0, 2).replace(/[^A-Z]/g, "");       // A-Z (2)
    const part2 = value.slice(2, 4).replace(/[^0-9]/g, "");       // 0-9 (2)
    const part3 = value.slice(4, 6).replace(/[^A-Z]/g, "");       // A-Z (2)
    const part4 = value.slice(6, 10).replace(/[^0-9]/g, "");      // 0-9 (4)

    // Combine with dashes
    if (part1 || part2 || part3 || part4) {
      formatted = `${part1}${part2 ? "-" + part2 : ""}${part3 ? "-" + part3 : ""}${part4 ? "-" + part4 : ""}`;
    }

    setFormData((prev) => ({
      ...prev,
      vehicleNo: formatted
    }));
  };


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "+91",
    vehicleNo: "",
    vehicleModel: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Remove "+91" if user manually types it or already present
      let digitsOnly = value.replace("+91", "").replace(/[^0-9]/g, "");

      // Limit to 10 digits max
      if (digitsOnly.length > 10) {
        toast.warning("Phone number can only be 10 digits after +91");
        digitsOnly = digitsOnly.slice(0, 10);
      }

      setFormData((prevData) => ({
        ...prevData,
        phone: "+91" + digitsOnly,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };


 const handleFormSumbit = async (e) => {
  e.preventDefault();
   const otp = generateOtp()

  const phoneDigits = formData.phone.replace("+91", "");
  if (phoneDigits.length !== 10) {
    toast.error("Phone number must be exactly 10 digits after +91");
    return;
  }

  try {
    const res = await signupUser(formData, otp)
    if (res?.success) {
      toast.success("Otp sent successfully.");
      navigate("/otp-verification", { state: { formData, otp } });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "+91",
        vehicleNo: "",
        vehicleModel: "",
      });
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Customer already exists");
  }

  setFormData({
    fullName: "",
    email: "",
    password: "",
    phone: "+91",
    vehicleNo: "",
    vehicleModel: "",
  });
};


  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('https://images.wallpaperscraft.com/image/single/road_marking_traffic_lights_167544_1280x800.jpg')`,
        backgroundColor: "#fdf6e3",
      }}
    >
      <div className="w-full max-w-2xl backdrop-blur-md rounded-xl border border-yellow-700 p-8 shadow-2xl">
        <form className="flex flex-col items-center" onSubmit={handleFormSumbit}>
          <div className="flex items-center gap-2 mb-6">
            <MdOutlineLocalPolice className="text-3xl text-yellow-700 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-800">Customer Sign Up</h1>
          </div>

          <div className="w-full flex flex-col gap-4">
            {/* Full Name and Phone Number in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                type="text"
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
              <TextField
                type="text"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </div>

            {/* Email */}
            <TextField
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />

            {/* Password */}
            <TextField
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />

            {/* Vehicle Number and Vehicle Model in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField
                type="text"
                label="Vehicle Number"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleVehicleInput}
                variant="outlined"
                required
              />
              <TextField
                type="text"
                label="Vehicle Model"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </div>
          </div>

          <Button
            variant="contained"
            color="warning"
            className="!mt-5 w-full"
            type="submit"
          >
            Sign Up
          </Button>

          <div className="mt-4 text-sm text-center">
            <b> Already have an account ? </b>{" "}
            <Link to="/c/login" className="text-orange-200 hover:underline">
              Login as Customer
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
