import express from "express";
import wrapAsync from "../wrapAsync.js";
import { forgotPassword, getMyChallans, loginCustomer, resetPassword, signUpCustomer, verifyOtp } from "../controllers/customer.js";
import { deleteChallan } from "../controllers/challan.js";
const router = express.Router();

router.post("/customer/signup", wrapAsync(signUpCustomer));
router.post("/customer/signup/otp-verification", wrapAsync(verifyOtp))
router.post("/customer/forget-password", wrapAsync(forgotPassword));
router.post("/customer/reset-password", wrapAsync(resetPassword))
router.post("/customer/login", wrapAsync(loginCustomer));
router.post("/c/get-challans", wrapAsync(getMyChallans));
router.delete("/c/delete-challan/:id", wrapAsync(deleteChallan))

export default router;
