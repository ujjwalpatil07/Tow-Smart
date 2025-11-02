import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authServices";
// import { resetUserPassword } from "../../services/authServices";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // email passed from OTP verification page
  const email = location?.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forget-pass")
    }
  }, [email, navigate])

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(email, password);
      if (res?.success) {
        toast.success("Password reset successfully! Please login again.");
        navigate("/c/login");
      } else {
        toast.error(res?.message || "Failed to reset password.");
      }


    } catch (err) {
      console.log(err)
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1584697964403-81f4a849a2d4?auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/70 rounded-2xl shadow-2xl p-8 border border-yellow-700 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center cursor-pointer hover:text-yellow-600 transition"
        >
          <i className="fa-solid fa-arrow-left me-3"></i>Back
        </button>

        <h1 className="text-3xl font-semibold mt-6 text-yellow-800 dark:text-yellow-300 text-center">
          Reset Password
        </h1>
        <p className="text-sm mt-3 text-center text-yellow-900 dark:text-yellow-200">
          Enter a new password for <b>{email || "your account"}</b>
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-yellow-900 dark:text-yellow-200 font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-2 w-full border border-yellow-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700 dark:bg-gray-700 dark:text-yellow-100"
            />
          </div>

          <div>
            <label className="text-sm text-yellow-900 dark:text-yellow-200 font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="mt-2 w-full border border-yellow-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700 dark:bg-gray-700 dark:text-yellow-100"
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              id="showPassword"
            />
            <label
              htmlFor="showPassword"
              className="text-sm text-yellow-900 dark:text-yellow-200 cursor-pointer"
            >
              Show Password
            </label>
          </div>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            className="!mt-6 w-full font-semibold !bg-yellow-700 hover:!bg-yellow-800 transition"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>
        </div>
      </div>
    </div>
  );
}
