import express from "express";
const router = express.Router();
import { loginAdmin } from "../controllers/admin.js";
import wrapAsync from "../wrapasync.js";

router.post("/admin/login", wrapAsync(loginAdmin));


export default router;