import { Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyUserOTP } from "../../services/authServices";
import { sendOtpEmail } from "../../services/sentOTP";
// import { sendOtpEmail } from "../../../services/sentOTP";

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location?.state?.formData;
  let sentOtp = location?.state?.otp;

  // console.log(formData, sentOtp)

  const generateOtp = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  useEffect(() => {
    if (!formData) {
      navigate("/u/signup");
    }
  }, [formData, navigate]);


  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    let timer;

    if (resendDisabled && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0) {
      setResendDisabled(false);
    }

    return () => clearTimeout(timer);
  }, [resendDisabled, timeLeft]);

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

  const resendOtp = async (email, otp) => {
    try {
      const res = await sendOtpEmail(email, otp);
      if (res?.success) {
        toast.success("OTP resent successfully");
        sentOtp = res?.otp;

        setTimeLeft(120);
        setResendDisabled(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to resend OTP");
    }
  };
  
  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP");
      return;
    } else if (enteredOtp !== sentOtp) {
      toast.error("Please enter a correct otp.")
      return;
    }

    setLoading(true);
    try {
      const data = await verifyUserOTP(formData);

      if (data?.success) {

        localStorage.setItem("Customer", JSON.stringify(data?.customer));

        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "User already exists or server error.");
    } finally {
      setLoading(false);
    }
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
          onClick={() => navigate("/signup")}
        >
          <i className="fa-solid fa-arrow-left me-3"></i>Back to Signup Page
        </button>

        <h1 className="text-3xl font-semibold mt-6 text-yellow-800 dark:text-yellow-300">
          Verify OTP
        </h1>
        <p className="text-sm mt-4 text-yellow-900 dark:text-yellow-200">
          An authentication code has been sent to {formData?.email} email. Enter the 5-digit OTP below to verify.
        </p>

        <div className="mt-4 text-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-300/10 dark:text-yellow-300 px-4 py-2 rounded-md text-sm font-medium">
          ⚠️ Please do not refresh the page or go back. Your OTP session might get interrupted.
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
              className={`${loading ? "cursor-not-allowed" : "cursor-text"
                } h-14 w-12 border border-yellow-700 dark:border-yellow-500 bg-white/70 dark:bg-gray-700 dark:text-yellow-100 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-yellow-700 transition`}
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
                onClick={() => resendOtp(formData?.email, generateOtp())}
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
          {loading ? "Veryfying" : "Verify OTP"}
        </Button>
      </div>
    </div>


  );
}
