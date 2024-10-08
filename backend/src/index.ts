import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary"
import myHotelRoutes from "./routes/my-hotels";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uri = process.env.MONGODB_CONNECTION_STRING as string;

mongoose.connect(uri)

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// serve static file, used when fropntend and backend both are to be used alltogether, it serves the frontend application files from the foler, when users hit your server
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

// serve upon conditional logic, if the api route does not work this will serve files since we have given it an absolute path
app.get("*", (req: Request, res: Response) => {
res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(7000, () => {
  console.log("server is running on localhost:7000");
});





