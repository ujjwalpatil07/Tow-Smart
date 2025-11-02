import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import twilio from "twilio";
import emailjs from "@emailjs/browser";

import vehicle from "./models/VehicleSchema.js";

import AdminAuthRoute from "./routes/AdminAuthRoute.mjs";
import CustomerAuthRoute from "./routes/CustomerAuthRoute.mjs";
import ChallanRoute from "./routes/ChallanRoute.mjs";

app.use(cors());
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 4000;
const dbUrl = process.env.TOWSMART_DB_URL;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.EMAILJS_SERVICE_ID;
const templateId = process.env.EMAILJS_TEMPLATE_ID;
const publicKey = process.env.EMAILJS_PUBLIC_KEY;

mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.use("/", AdminAuthRoute);
app.use("/", CustomerAuthRoute);
app.use("/", ChallanRoute);

app.post("/home", async (req, res) => {
  let { vehicleNo } = req.body;

  try {
    const vehicleDetails = await vehicle
      .findOne({ vehicleNo: vehicleNo })
      .populate("vehicleOwner");
    // console.log(vehicleDetails)

    if (!vehicleDetails) {
      return res
        .status(404)
        .json({ success: false, message: "vehicle Not Registerded" });
    }

    res.status(200).json({
      success: true,
      message: "vehicle Found",
      vehicleDetails: vehicleDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const client = twilio(accountSid, authToken);


app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
