import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      {/* Featured Charts */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Featured Charts
        </h1>

        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Today's biggest hits
        </h1>

        <div className="flex overflow-auto">
          {songsData.map((item) => (
            <AlbumItem
              key={item.id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;