import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
        message: "Already subsribed"
    }
});

export const Email = mongoose.model("Email", emailSchema);