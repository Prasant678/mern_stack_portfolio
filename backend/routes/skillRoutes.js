import express from "express";
import {
  addNewSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "../Controller/skillController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.get("/getall", getAllSkills);

export default router;
