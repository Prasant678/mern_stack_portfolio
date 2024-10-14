import express from "express";
import {
    deleteTimeline,
    getAllTimelines,
    postTimeline,
    // updateTimeline,
} from "../Controller/timelineController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postTimeline);
router.delete("/delete/:id", isAuthenticated, deleteTimeline);
router.get("/getall", getAllTimelines);

export default router;