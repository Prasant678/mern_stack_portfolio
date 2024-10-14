import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  Name: {
    type: String,
    minLength: [2, "Must Contain At Least 2 Characters!"],
  },
  subject: {
    type: String,
    minLength: [10, "Must Contain At Least 10 Characters!"],
  },
  message: {
    type: String,
    minLength: [15, "Must Contain At Least 15 Characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);
