import Customer from "../models/CustomerSchema.js";
import bcryptjs from "bcryptjs";
import vehicle from "../models/VehicleSchema.js";

export const signUpCustomer = async (req, res) => {
  try {
    let { fullName, email, password, phone, vehicleNo, vehicleModel } =
      req.body;

    if (
      !email ||
      !password ||
      !fullName ||
      !phone ||
      !vehicleModel ||
      !vehicleNo
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ success: false, message: "Customer already exists" });
    }

    res.status(201).json({
      success: true,
      message: "User info is Correct",
    });
  } catch (error) {
    console.error("Error in signUpCustomer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  let { fullName, email, password, phone, vehicleNo, vehicleModel } = req.body;
  // Hash the password

  if (
    !email ||
    !password ||
    !fullName ||
    !phone ||
    !vehicleModel ||
    !vehicleNo
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const hashedPass = await bcryptjs.hash(password, 10);

  //Create and save customer
  const newCustomer = new Customer({
    email,
    password: hashedPass,
    fullName,
    phone,
    vehicleModel,
    vehicleNo,
  });

  const savedCustomer = await newCustomer.save();

  // Create and save vehicle, linked to the customer
  const newVehicle = new vehicle({
    vehicleNo,
    vehicleModel,
    vehicleOwner: savedCustomer?._id,
  });

  await newVehicle.save();

  res.status(201).json({
    success: true,
    message: "Customer and Vehicle Created Successfully",
    customer: savedCustomer,
  });
};

export const forgotPassword = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is requried" });
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    return res.status(400).json({ message: "Customer is not registered." });
  }

  res
    .status(200)
    .json({ success: true, message: "Customer found successfully", customer });
};

export const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    // 1️⃣ Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // 2️⃣ Find user
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Customer not found or not registered.",
        });
    }

    // 3️⃣ Hash new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // 4️⃣ Update user record
    customer.password = hashedPassword;
    await customer.save();

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
};



export const loginCustomer = async (req, res) => {
  let { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  const isMatched = await bcryptjs.compare(password, customer.password);
  if (!customer || !isMatched) {
    res.status(400).json({ message: "Invalid Email or Password" });
  } else {
    res.status(201).json({
      message: "Login Successfull as customer",
      customer,
    });
  }
};

export const getMyChallans = async (req, res) => {
  const { customerId } = req.body;

  try {
    const customer = await Customer.findById(customerId).populate({
      path: "challans",
      populate: {
        path: "vehicle",
        model: "vehicle",
      },
    });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.status(200).json({ success: true, challans: customer.challans });
  } catch (err) {
    console.error("Error fetching challans:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching challans",
    });
  }
};
