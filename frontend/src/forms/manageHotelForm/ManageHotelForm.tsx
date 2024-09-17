import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  type: string;
  city: string;
  country: string;
  address: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageFiles: FileList;
  title: string;
  description: string;
  starRating: number;
  rooms: string[];
  pricePerNight: number;
  lastUpdated: Date;
  
};

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
  
    if (formDataJson.pricePerNight !== undefined) {
      formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    } else {
      console.error("pricePerNight is undefined");
    }
  
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
  
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
  
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });
  
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form action="" className="flex flex-col gap-10" onSubmit={onSubmit} encType="multipart/form-data">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />
        <span className="flex jusitfy-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
