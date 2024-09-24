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