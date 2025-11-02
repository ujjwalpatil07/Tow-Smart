import express from "express";
const router = express.Router();
import wrapAsync from "../wrapAsync.js";
import { loginAdmin } from "../controllers/admin.js";

router.post("/admin/login", wrapAsync(loginAdmin));


export default router;