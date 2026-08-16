import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { API_BASE_URL, useAuth } from "./AuthContext";

export const PlayerContext = createContext(null);


export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const { user, token, getAuthHeaders } = useAuth();

  
  const getSongsData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/songs`,
        getAuthHeaders()
      );

      console.log("Songs Response:", response.data);

      const songs = response.data?.songs || [];

      setSongsData(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongsData([]);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/albums`,
        getAuthHeaders()
      );

      console.log("Albums Response:", response.data);

      const albums = response.data?.albums || [];

      setAlbumsData(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
      setAlbumsData([]);
    }
  };

  useEffect(() => {
    if (user && token) {
      getSongsData();
      getAlbumsData();
    }
  }, [user, token]);

  const contextValue = {
    songsData,
    albumsData,

    getSongsData,
    getAlbumsData,
  };


  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

// CUSTOM HOOK
export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayer must be used within a PlayerContextProvider"
    );
  }

  return context;
};