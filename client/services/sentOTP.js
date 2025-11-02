import emailjs from "@emailjs/browser";

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateIdOtp = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OTP;
const templateIdNotification = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_NOTIFICATION;

const publicKeyTowSmart = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_TOWSMART;
const serviceIdTowSmart = import.meta.env.VITE_EMAILJS_SERVICE_ID_TOWSMART;
const templateIdContact = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACTUS;


export const sendOtpEmail = async (email, otp) => {
  try {
    const response = await emailjs.send(
      serviceId,
      templateIdOtp,
      {
        otp: otp,
        email: email,
      },
      publicKey
    );
    return { success: true, otp: otp, response };
  } catch (error) {
    return { success: false, error };
  }
};

export const sendTowEmail = async (email, info, location, time) => {
  try {
    const res = await emailjs.send(
      serviceId,
      templateIdNotification,
      {
        email: email,
        vehicleOwner: info?.vehicleOwner?.fullName,
        vehicleModel: info?.vehicleModel,
        vehicleNumber: info?.vehicleNo,
        location: location,
        time: time,
      },
      publicKey
    );
    return res
  } catch (error) {
    return { success: false, error };
  }
}

export const sendContactEmail = async (name, email, message) => {
  try {
    const res = await emailjs.send(
      serviceIdTowSmart,
      templateIdContact,
      {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString(),
      },
      publicKeyTowSmart
    );

    return { success: true, res };
  } catch (error) {
    return { success: false, error };
  }
};
