import { useMutation } from "react-query";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client"

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully", type: "SUCCESS" });
    },

    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });


  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };


  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};


export default AddHotel;

