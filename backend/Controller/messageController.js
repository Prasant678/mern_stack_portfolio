import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/Error.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { Name, subject, message } = req.body;
  if (!Name || !subject || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const data = await Message.create({ Name, subject, message });
  res.status(201).json({
    success: true,
    message: "Sent Message Successfully",
    data,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    return next(new ErrorHandler("Message Already Deleted!", 400));
  }
  await message.deleteOne();
  res.status(201).json({
    success: true,
    message: "Message Deleted Successfully",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(201).json({
    success: true,
    messages,
  });
});
