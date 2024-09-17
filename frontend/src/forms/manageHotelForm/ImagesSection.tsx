import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex lfex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {

            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              console.log("Total images:", totalLength);
              if (totalLength === 0) {
                console.log("Returning error: At least one image should be added");
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                console.log("Returning error: Total number of images cannot be more 6");
                return "Total number of images cannot be more 6";
              }
              console.log("Validation successful");
            },


          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection





