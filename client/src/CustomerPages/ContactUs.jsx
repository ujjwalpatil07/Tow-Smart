import React, { useState } from "react";
import { MdOutlineLocalPolice } from "react-icons/md";
import { sendContactEmail } from "../../services/sentOTP";
import { toast } from "react-toastify";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendContactEmail(formData?.name, formData?.email, formData?.message);

      if (res.success) {
        toast.success("Response sent successfully.")
      }

      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong with sending response.")
    } finally {
      setLoading(false)
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-orange-100 via-white to-green-100">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-xl border-2 border-amber-400 relative">
        {/* Badge icon at top center */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white rounded-full p-3 shadow-lg">
          <MdOutlineLocalPolice className="text-3xl" />
        </div>

        <h2 className="text-3xl font-bold text-center text-amber-600 mt-4 mb-6">
          Connect with Traffic Department
        </h2>

        <p className="text-center text-gray-600 mb-6">
          We’re here to help. Whether it's about towing complaints, queries, or feedback — feel free to reach out.
        </p>

        <form className="space-y-4" onSubmit={sendMessage}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition"
          >
            {loading ? "Sending..." : "🚨 Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
