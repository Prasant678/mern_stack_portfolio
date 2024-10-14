import express from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Email } from "../models/emailSchema.js";
import ErrorHandler from "../middleware/Error.js";

const router = express.Router();

router.post("/send", catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new ErrorHandler("Invalid Email Format", 400));
    }
    const data = await Email.create({ email });
    res.status(201).json({
        success: true,
        message: "Email Sent!",
        data,
    });
})
)

router.delete("/delete/:id", catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const email = await Email.findById(id);
    if (!email) {
        return next(new ErrorHandler("Email Already Deleted!", 400));
    }
    await email.deleteOne();
    res.status(201).json({
        success: true,
        message: "Email Deleted Successfully",
    });
}))

router.get("/getall", catchAsyncErrors(async (req, res, next) => {
    const emails = await Email.find();
    res.status(201).json({
        success: true,
        emails,
    });
})
)

export default router;