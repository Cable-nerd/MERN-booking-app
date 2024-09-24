import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData) {
    return <div>No Hotels Found</div>;
  }
  console.log(hotelData);

  return (
    <div className="space-y-5">
      {/* Header with Add Hotel button */}
      <span className="flex justify-between">
        <h1 className="text-3xl">My Hotels</h1>
        <Link to="/add-hotel">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded">
            Add Hotel
          </button>
        </Link>
      </span>

      {/* Hotel List */}
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="border border-slate-300 rounded-lg p-8 space-y-4">
            {/* Hotel Name */}
            <h2 className="text-2xl font-bold">{hotel.name}</h2>

            {/* Hotel Description */}
            <div className="whitespace-pre-line text-sm text-gray-600">
              {hotel.description ? hotel.description : "No description"}
            </div>

            {/* Hotel Info Section */}
            <div className="flex flex-wrap gap-4 mt-4">
              {/* City and Country */}
              <div className="flex items-center border border-slate-300 rounded-sm p-3 w-full sm:w-auto">
                <BsMap />
                <span className="ml-2">
                  {hotel.city}, {hotel.country}
                </span>
              </div>

              {/* Hotel Type */}
              <div className="flex items-center border border-slate-300 rounded-sm p-3 w-full sm:w-auto">
                <BsBuilding />
                <span className="ml-2">{hotel.type}</span>
              </div>

              {/* Price Per Night */}
              <div className="flex items-center border border-slate-300 rounded-sm p-3 w-full sm:w-auto">
                <BiMoney />
                <span className="ml-2">${hotel.pricePerNight} per night</span>
              </div>

              {/* Number of Adults and Children */}
              <div className="flex items-center border border-slate-300 rounded-sm p-3 w-full sm:w-auto">
                <BiHotel />
                <span className="ml-2">
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center border border-slate-300 rounded-sm p-3 w-full sm:w-auto">
                <BiStar />
                <span className="ml-2">{hotel.starRating} Star Rating</span>
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 rounded"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
