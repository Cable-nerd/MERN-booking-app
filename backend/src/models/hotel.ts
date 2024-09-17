import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  type: string;
  city: string;
  country: string;
  
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageUrls: string[];
  description: string;
  starRating: number;
  rooms: string[];
  pricePerNight: number;
  lastUpdated: Date;
 
};

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  
  type: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: { type: [String], required: true },
  imageUrls: { type: [String], required: true },
  
  description: { type: String, required: true },
  starRating: { type: Number, required: true, min:1, max:5 },
  rooms: { type: [String], required: true },
  pricePerNight: { type: Number, required: true },
  lastUpdated: { type: Date, required: true },

});


const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema)
export default Hotel;