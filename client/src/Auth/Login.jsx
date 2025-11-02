import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineLocalPolice } from "react-icons/md";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://tow-smart.onrender.com/admin/login", formData);
      if (res.data) {
        localStorage.setItem("Admin", JSON.stringify(res.data.admin));
        toast.success("Login Successfully as Admin");
        navigate("/")
        window.location.reload(); // <-- this 1 line solves everything
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }

    setLoading(false);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end pe-20 px-4"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/92/90/56/360_F_292905667_yFUJNJPngYeRNlrRL4hApHWxuYyRY4kN.jpg')`,
        backgroundColor: "#fdf6e3",
      }}
    >
      <div className="w-full max-w-xl bg-opacity-80 backdrop-blur-md rounded-xl border border-yellow-700 p-8 shadow-2xl">
        <form className="flex flex-col items-center" onSubmit={handleFormSumbit}>
          <div className="flex items-center gap-2 mb-6">
            <MdOutlineLocalPolice className="text-3xl text-yellow-700 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-800">Admin Login</h1>
          </div>

          <div className="w-full flex flex-col gap-4">
            <TextField
              id="email"
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your email"
              className="w-full"
              required
              disabled={loading}
            />

            <TextField
              type="password"
              id="password"
              label="Password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your password"
              className="w-full"
              required
              disabled={loading}
            />
          </div>

          <Link
            to="/forget"
            className="mt-2 self-end text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>

          <div className="mt-6 w-full">
            <Button
              variant="contained"
              color="warning"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center text-center gap-1">
            <p className="text-sm font-medium">Are you a customer?</p>
            <Link to="/c/login" className="text-gray-500 hover:underline text-sm">
              Login as Customer
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
