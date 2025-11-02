import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, length: { min: 13, max: 13 } },
  vehicleNo: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  challans: [{ type: mongoose.Types.ObjectId, ref: "Challan" }],
});

export default mongoose.model("Customer", CustomerSchema);
