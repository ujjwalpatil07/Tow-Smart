import Admin from "../models/AdminSchema.js"
import bcryptjs from "bcryptjs";

export const loginAdmin = async (req, res) => {
  let { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  console.log()

  const isMatched = bcryptjs.compare(password, admin.password);
  if (!admin || !isMatched) {
    res.status(400).json({ message: "Invalid Username or Password" });
  } else {
    res.status(201).json({
      message: "Login Successfull",
      admin,
    });
  }
};
