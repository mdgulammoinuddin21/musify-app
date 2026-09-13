import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Play } from "lucide-react";
import { PlayerContext } from "../context/PlayerContext.jsx";

const DisplaySong = () => {
  const { id } = useParams();

  const {
    songsData,
    playWithId
  } = useContext(PlayerContext);

  const song = songsData?.find(
    (item) => item?._id === id
  );

  if (!song) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Song not found
      </div>
    );
  }

  return (
    <div className="mt-10">

      {/* Song Details */}
      <div className="flex flex-col md:flex-row md:items-end gap-8">

        <img
          src={song?.image}
          alt={song?.name || ""}
          className="w-48 h-48 object-cover rounded"
        />

        <div className="flex flex-col">

          <p className="text-sm text-gray-300">
            Song
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
            {song?.name}
          </h1>

          <p className="text-gray-300">
            {song?.desc}
          </p>

          <p className="text-sm text-gray-400 mt-3">
            MusiFy · {song?.duration}
          </p>

        </div>

      </div>

      {/* Play Button */}
      <div className="mt-8">

        <button
          style={{cursor:"pointer"}}
          onClick={() => playWithId(song?._id)}
          className="bg-green-500 hover:bg-green-400 text-black rounded-full p-4 flex items-center justify-center"
        >
          <Play
            className="w-6 h-6 fill-black"
          />
        </button>

      </div>

      {/* Song Information */}
      <div className="mt-10">

        <div className="grid grid-cols-2 sm:grid-cols-3 text-gray-400 text-sm border-b border-gray-700 pb-3">
          <p>Song</p>
          <p className="hidden sm:block">Album</p>
          <p>Duration</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 items-center py-4 text-white">

          <div className="flex items-center gap-3">
            <img
              src={song?.image}
              alt={song?.name || ""}
              className="w-12 h-12 object-cover rounded"
            />

            <p>{song?.name}</p>
          </div>

          <p className="hidden sm:block text-gray-400">
            {song?.album || "Unknown Album"}
          </p>

          <p className="text-gray-400">
            {song?.duration}
          </p>

        </div>

      </div>

    </div>
  );
};

export default DisplaySong;