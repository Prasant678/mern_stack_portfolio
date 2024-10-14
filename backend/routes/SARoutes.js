import express from "express";
import {
    addNewApplication,
    deleteApplication,
    getAllApplications,
} from "../Controller/SAController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/getall", getAllApplications);

export default router;
