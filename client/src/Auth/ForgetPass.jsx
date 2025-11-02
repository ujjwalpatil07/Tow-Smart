import React, { useState, useRef, useEffect } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgetPass } from "../../services/authServices";
// import { sendOtpEmail } from "../../services/sentOTP"; // you already have this

export default function ForgetPass() {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120);
  const inputRefs = useRef([]);

  let sentOtp = useRef(""); // store sent otp value locally

  // Countdown Timer for resend button
  useEffect(() => {
    let timer;
    if (otpSent && resendDisabled && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    if (timeLeft === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [otpSent, resendDisabled, timeLeft]);

  useEffect(() => {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

  // Generate random OTP
  const generateOtp = () => Math.floor(10000 + Math.random() * 90000).toString();

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);
      const otp = generateOtp();

      const res = await forgetPass(email, otp);
      console.log(res);
    
      toast.success("OTP sent successfully to your email!");
      sentOtp.current = otp;
      setOtpSent(true);
      setTimeLeft(120);
      setResendDisabled(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP change
  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const otp = generateOtp();
      // await sendOtpEmail(email, otp);
      toast.success("OTP resent successfully");
      sentOtp.current = otp;
      setTimeLeft(120);
      setResendDisabled(true);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  // Verify OTP
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP");
      return;
    }
    if (enteredOtp !== sentOtp.current) {
      toast.error("Incorrect OTP. Please try again.");
      return;
    }

    toast.success("OTP verified successfully!");
    navigate("/reset-password", { state: { email } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url('https://images.wallpaperscraft.com/image/single/road_marking_traffic_lights_167544_1280x800.jpg')`,
        backgroundColor: "#fdf6e3",
      }}
    >
      <div className="w-full md:w-[40%] max-w-md backdrop-blur-md rounded-xl border border-yellow-700 p-8 shadow-2xl bg-white/70 dark:bg-gray-800/50 transition">
        <button
          className="text-sm text-yellow-800 dark:text-yellow-300 flex items-center cursor-pointer hover:text-yellow-600 transition"
          onClick={() => navigate("/c/login")}
        >
          <i className="fa-solid fa-arrow-left me-3"></i>Back to Login
        </button>

        <h1 className="text-3xl font-semibold mt-6 text-yellow-800 dark:text-yellow-300">
          Forgot Password
        </h1>
        <p className="text-sm mt-4 text-yellow-900 dark:text-yellow-200">
          Enter your registered email address to receive a verification code.
        </p>

        {/* Email Input */}
        <div className="mt-6">
          <TextField
            type="email"
            label="Registered Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
            required
          />
          <Button
            variant="contained"
            onClick={handleSendOtp}
            disabled={loading || otpSent}
            className="w-full !mt-4 font-semibold !bg-yellow-700 hover:!bg-yellow-800 transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </div>

        {/* OTP Section (only shown after sending OTP) */}
        {otpSent && (
          <>
            <div className="mt-6 text-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-300/10 dark:text-yellow-300 px-4 py-2 rounded-md text-sm font-medium">
              ⚠️ Please do not refresh the page. Your OTP session might get interrupted.
            </div>

            <div id="otp-input" className="flex justify-between mt-8 space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={`h-14 w-12 border border-yellow-700 dark:border-yellow-500 bg-white/70 dark:bg-gray-700 dark:text-yellow-100 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-yellow-700 transition`}
                />
              ))}
            </div>

            <div className="mt-5 text-sm flex justify-center text-yellow-900 dark:text-yellow-200">
              {resendDisabled ? (
                <p>
                  Resend OTP in{" "}
                  <span className="text-yellow-700 font-semibold">
                    {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <>
                  <p>Didn't receive OTP?&nbsp;</p>
                  <button
                    onClick={handleResend}
                    className="text-yellow-700 font-semibold hover:underline hover:text-yellow-800"
                  >
                    Resend OTP
                  </button>
                </>
              )}
            </div>

            <Button
              variant="contained"
              onClick={handleVerify}
              disabled={loading}
              className="w-full !mt-6 font-semibold !bg-yellow-700 hover:!bg-yellow-800 transition"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
