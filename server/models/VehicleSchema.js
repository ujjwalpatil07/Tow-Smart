import mongoose from "mongoose";
import { type } from "os";

const VehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleOwner: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },
});

export default mongoose.model("vehicle", VehicleSchema);
