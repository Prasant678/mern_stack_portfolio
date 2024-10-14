import express from "express"
import { getUser, login, logout, register, updatePassword, updateProfile, getUserForPortfolio } from "../Controller/userController.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);


export default router;