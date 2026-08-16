import React from "react";
import { useNavigate } from "react-router-dom";

const SongItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  const handleAlbumClick = () => {
    navigate(`/album/${id}`);
  };

  return (
    <div
      onClick={handleAlbumClick}
      className="min-w-[180px] max-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
    >
      <img
        src={image}
        alt={name}
        className="w-[160px] h-[160px] object-cover rounded bg-[#181818]"
      />

      <p className="font-bold mt-2 mb-1 truncate">
        {name}
      </p>

      <p className="text-slate-400 text-sm truncate">
        {desc}
      </p>
    </div>
  );
};

export default SongItem;