import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "lucide-react";
import toast from "react-hot-toast";
import { albumsAPI } from "../services/apiService";

import DashboardLayout from "../layout/DashboardLayout";

const AddAlbum = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#3be477");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter album name");
      return;
    }

    if (!desc.trim()) {
      toast.error("Please enter album description");
      return;
    }

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      const request = {
        name,
        desc,
        bgColor: colour,
      };

      formData.append("request", JSON.stringify(request));
      formData.append("file", image);

      const response = await albumsAPI.add(formData);

      console.log("Album response:", response.data);

      if (response.status === 201 || response.status === 200) {
        toast.success("Album added!");

        setName("");
        setDesc("");
        setColour("");
        setImage(null);
      } else {
        toast.error("Something went wrong while adding album");
      }
    } catch (err) {
      console.error("Error adding album:", err);
      toast.error("Error adding album. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5 px-4 sm:px-6"
        >
          {/* Album Image */}
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>

            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />

            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="w-8 h-8 text-gray-500" />
              )}
            </label>
          </div>

          {/* Album Name */}
          <div className="flex flex-col gap-2 w-full">
            <p>Album Name</p>

            <input
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full max-w-[400px] rounded"
            />
          </div>

          {/* Album Description */}
          <div className="flex flex-col gap-2 w-full">
            <p>Album Description</p>

            <input
              type="text"
              placeholder="Type here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full max-w-[400px] rounded"
            />
          </div>

          {/* Background Colour */}
          <div className="flex flex-col gap-3">
            <p>Background colour</p>

            <input
              type="color"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="w-16 h-10 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="text-base bg-[#3be477] text-white py-2.5 px-14 rounded cursor-pointer hover:bg-[#2fc968] transition-colors disabled:opacity-50"
          >
            ADD
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddAlbum;
