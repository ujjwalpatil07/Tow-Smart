import Challan from "../models/ChallanSchema.js";
import Customer from "../models/CustomerSchema.js";

export const getChallans = async (req, res) => {
  try {
    const challans = await Challan.find({}).populate("vehicle owner");
    // console.log(challans)
    res.status(200).json({ challans });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching challans" });
  }
};

export const makeChallan = async (req, res) => {
  try {
    const { info, vehicleType } = req.body;
    // console.log(info)
    const vehicleNo = info.vehicleNo;

    const customer = await Customer.findOne({ vehicleNo });
    if (!vehicleType) {
      return res.status(400).json({ message: "vehicleType is required" });
    }

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const nashikLocations = [
      "Trimbakeshwar, Nashik",
      "Saptashrungi, Nashik",
      "Pandav Leni, Nashik",
      "Kalaram Sansthan Mandir, Nashik",
      "Sula Vineyards, Nashik",
      "Nashik Road, Nashik",
      "Anjneri Hill, Nashik",
      "Godavari River, Nashik",
      "Jain Mandir, Nashik",
      "Nashik Fort, Nashik",
      "Kapileswara Temple, Nashik",
      "Nashik City Centre Mall, Nashik",
      "Someshwar Waterfall, Nashik",
      "Harihar Fort, Nashik",
      "Ramanand Ashram, Nashik",
      "Vaitarna Dam, Nashik",
      "Ganga Ghat, Nashik",
      "Dudhsagar Falls, Nashik",
      "Shree Saptashrungi Gad, Nashik",
      "Bhakti Dham, Nashik",
    ];

    const getRandomLocation = () => {
      const randomIndex = Math.floor(Math.random() * nashikLocations.length);
      return nashikLocations[randomIndex];
    };
    const date = new Date().toDateString();

    const newChallan = new Challan({
      vehicle: info._id,
      owner: info.vehicleOwner._id,
      createdAt: new Date(),
      fineAmount: "500 Rs",
      reason: "Parking violation",
      message: `Dear ${info.vehicleOwner.fullName}, Your vehicle ${
        info.vehicleModel
      } (Reg. no [${vehicleNo}]) has been towed from ${getRandomLocation()} on ${date} due to parking violation.
Please contact the Traffic Control Room at 22154423 for recovery details and further assistance.
— Nashik Traffic Police`,
    });

    const savedChallan = await newChallan.save();

    // Update the customer's challans array
    await Customer.findByIdAndUpdate(
      customer._id,
      { $push: { challans: savedChallan._id } },
      { new: true }
    );

    // Populate owner and vehicle
    const populatedChallan = await Challan.findById(savedChallan._id)
      .populate("owner")
      .populate("vehicle");

    res.status(200).json({ success: true, newChallan: populatedChallan });
  } catch (error) {
    console.error("Error creating challan:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while creating challan" });
  }
};

export const deleteChallan = async (req, res) => {
  try {
    const challanId = req.params.id;

    const challan = await Challan.findById(challanId);
    if (!challan) {
      return res
        .status(404)
        .json({ success: false, message: "Challan not found" });
    }

    // Remove challan from customer's challan list
    await Customer.findByIdAndUpdate(challan.owner, {
      $pull: { challans: challanId },
    });

    // Delete the challan
    await Challan.findByIdAndDelete(challanId);

    res.json({ success: true, message: "Challan deleted successfully" });
  } catch (error) {
    console.error("Error deleting challan:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
