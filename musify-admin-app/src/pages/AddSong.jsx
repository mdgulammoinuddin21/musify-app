import { Check, Music, Image } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { albumsAPI } from "../services/apiService";

const AddSong = () => {
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = (e) => {};

  const loadAlbumData = async () => {
    try {
      const response = await albumsAPI.list();

      console.log("Album response:", response.data);

      setAlbumData(response.data.albums);
    } catch (error) {
      console.error("Failed to load albums:", error);
      toast.error("Failed to load albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return (
    <DashboardLayout activeMenu="Add Song">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5 px-4 sm:px-6"
        >
          <div className="flex gap-8">
            {/* Upload Song */}
            <div className="flex flex-col gap-4">
              <p>Upload Song</p>

              <input
                type="file"
                accept="audio/*"
                id="song"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSong(e.target.files[0]);
                  }
                }}
              />

              <label
                htmlFor="song"
                className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
              >
                {song ? (
                  <Check className="w-8 h-8 text-green-500" />
                ) : (
                  <Music className="w-8 h-8 text-gray-500" />
                )}
              </label>
            </div>

            {/* Upload Image */}
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
          </div>

          {/* Song Name */}
          <div className="flex flex-col gap-2 w-full">
            <p>Song Name</p>

            <input
              type="text"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full max-w-[400px] rounded"
            />
          </div>

          {/* Song Description */}
          <div className="flex flex-col gap-2 w-full">
            <p>Song Description</p>

            <input
              type="text"
              placeholder="Type here"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-full max-w-[400px] rounded"
            />
          </div>

            {/* Album dropdown */}
          <div className="flex flex-col gap-2.5">
            <p>Album</p>

            <select
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
            >
              <option value="none">None</option>

              {albumData.map((albumItem, index) => (
                <option value={albumItem.name} key={index}>
                  {albumItem.name}
                </option>
              ))}
            </select>
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

export default AddSong;
