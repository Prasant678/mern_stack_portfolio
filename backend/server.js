import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import ConnectDB from "./db.js";
import cloudinary from "cloudinary";
import { errorMiddleware } from "./middleware/Error.js";
import messageRouter from "./routes/messageRoutes.js"
import userRouter from "./routes/userRoutes.js"
import timelineRouter from "./routes/timelineRoutes.js"
import applicationRouter from "./routes/SARoutes.js"
import skillRouter from "./routes/skillRoutes.js"
import projectRouter from "./routes/projectRoutes.js"
import emailRoutes from "./routes/emailRoutes.js"

const app = express();
dotenv.config({ path: "config.env" })

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/softwareapplication", applicationRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/email", emailRoutes);

ConnectDB();

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`server listenimg at ${process.env.PORT}`);
})