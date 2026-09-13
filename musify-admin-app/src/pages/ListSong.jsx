import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Music,
  FileText,
  Clock,
  Trash2,
} from "lucide-react";

import { songsAPI } from "../services/apiService.js";
import DashboardLayout from "../layout/DashboardLayout.jsx";

const ListSong = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch songs
  const fetchSongs = async () => {
    setLoading(true);

    try {
      const response = await songsAPI.list();

      console.log("Song response:", response.data);

      setData(response.data.songs || []);
    } catch (error) {
      console.error("Failed to load songs:", error);
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  // Delete song
  const removeSong = async (id) => {
    try {
        const response = await songsAPI.remove(id);

        if (response.status === 204) {
        toast.success("Song deleted");
        await fetchSongs();
        }
    } catch (e) {
        toast.error("Failed to delete song");
    }
    };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <DashboardLayout activeMenu="List Songs">
      <div className="p-6">

        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Songs Library
          </h1>

          <p className="text-gray-600">
            Manage your music collection
          </p>
        </div>

        {/* Table container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

          {/* Table header */}
          <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">

              {/* Cover */}
              <div className="col-span-2 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Cover</span>
              </div>

              {/* Song title */}
              <div className="col-span-3">
                Song Title
              </div>

              {/* Album */}
              <div className="col-span-3 flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Album</span>
              </div>

              {/* Duration */}
              <div className="col-span-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </div>

              {/* Actions */}
              <div className="col-span-2 text-center">
                Actions
              </div>

            </div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-gray-100">

            {loading ? (
              <div className="px-6 py-12 text-center">
                <div className="w-10 h-10 mx-auto border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>

                <p className="mt-4 text-gray-500">
                  Loading songs...
                </p>
              </div>
            ) : data.length === 0 ? (

              /* Empty state */
              <div className="px-6 py-12 text-center">
                <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />

                <p className="text-gray-500 text-lg">
                  No songs found
                </p>

                <p className="text-gray-400 text-sm">
                  Add some songs to get started
                </p>
              </div>

            ) : (

              /* Songs */
              data.map((song, index) => (
                <div
                  key={song._id || index}
                  className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                >

                  {/* Song image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg shadow-md overflow-hidden">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Song name */}
                  <div className="col-span-3">
                    <p className="font-medium text-gray-900 truncate">
                      {song.name}
                    </p>
                  </div>

                  {/* Album */}
                  <div className="col-span-3">
                    <p className="text-gray-600 truncate">
                      {song.album || "No album"}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {song.duration || "N/A"}
                    </span>
                  </div>

                  {/* Delete button */}
                  <div className="col-span-2 flex justify-center">
                    <button
                      type="button"
                      title="Delete Song"
                      onClick={() => removeSong(song._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 group"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>

                </div>
              ))

            )}

          </div>
        </div>

        {/* Footer stats */}
        {data.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600">

              <span>
                Total Songs:{" "}
                <span className="font-semibold text-gray-900">
                  {data.length}
                </span>
              </span>

              <span>
                Last updated:{" "}
                <span className="font-semibold text-gray-900">
                  Just Now
                </span>
              </span>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ListSong;