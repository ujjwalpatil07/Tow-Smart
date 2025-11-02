import wrapAsync from "../wrapAsync.js";
import express from "express"
import { makeChallan, deleteChallan, getChallans } from "../controllers/challan.js";

const router = express.Router();

router.post("/get-challans", wrapAsync(getChallans))
router.post("/make-challan", wrapAsync(makeChallan))
router.post("/delete-challan", wrapAsync(deleteChallan))

export default router;