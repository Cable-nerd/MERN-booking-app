import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/Auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-hotels
// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
      body("featured").notEmpty().isBoolean().withMessage("Featured is required"),
  ],
  upload.array("imageFiles", 6),
  


  async (req: Request, res: Response) => {
    console.log("Files received:", req.files);
    try {
      const imageFiles = req.files as Express.Multer.File[];
      console.log("imageFiles: " + imageFiles);
      const newHotel: HotelType = req.body;
      
      // Wait for all images to be uploaded
      const imageUrls = await uploadImages(imageFiles);
     

     

      // Add URLs to new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // Save new hotel in the DB
      const hotel = new Hotel(newHotel);
      try {
        await hotel.save();
        res.status(201).send(hotel);
      } catch (dbError) {
        console.error("Error saving hotel to the database:", dbError);
        throw new Error("Failed to save hotel to the database");
      }

    } catch (error) {
      // Handle errors and log properly
      if (error instanceof Error) {
        console.error("Error creating hotel:", error.message);
        return res.status(500).json({ message: "Error creating hotel", error: error.message });
      } else {
        console.error("Unknown error:", error);
        return res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

 // Upload images to Cloudinary
 async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}


export default router;

