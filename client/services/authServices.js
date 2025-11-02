import api from "./api";
import { sendOtpEmail } from "./sentOTP";

export const signupUser = async (formData, otp) => {
  const res = await api.post("/customer/signup", formData);
  if (res?.data?.success) {
    const response = await sendOtpEmail(formData?.email, otp);
    if (response?.success) {
      return res.data;
    } else {
      return response;
    }
  } else {
    return res?.data;
  }
};

export const forgetPass = async (email, otp) => {
  const res = await api.post("/customer/forget-password", { email, otp });
  if (res?.data?.success) {
    const response = await sendOtpEmail(email, otp);
    if (response?.success) {
      return res.data;
    } else {
      return response;
    }
  } else {
    return res?.data;
  }
};

export const resetPassword = async (email, password) => {
  const res = await api.post("/customer/reset-password", { email, password });
  return res?.data;
};

export const verifyUserOTP = async (formData) => {
  const res = await api.post("/customer/signup/otp-verification", formData);
  return res?.data;
};
