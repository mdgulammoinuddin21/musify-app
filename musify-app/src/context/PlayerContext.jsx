import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { API_BASE_URL, useAuth } from "./AuthContext";

export const PlayerContext = createContext(null);

export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const { user, token, getAuthHeaders } = useAuth();

  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const getSongsData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/songs`,
        getAuthHeaders(),
      );

      console.log("Songs Response:", response.data);

      const songs = response.data?.songs || [];

      setSongsData(songs);
      if (songs.length > 0) {
        setTrack(songs[0]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongsData([]);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/albums`,
        getAuthHeaders(),
      );

      console.log("Albums Response:", response.data);

      const albums = response.data?.albums || [];

      setAlbumsData(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
      setAlbumsData([]);
    }
  };

  // Play
  const play = async () => {
    if (!audioRef.current || !track) return;

    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  // Pause
  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Play song by ID
  const playWithId = async (id) => {
    const selectedTrack = songsData?.find((item) => item?._id === id);

    if (!selectedTrack) return;

    setTrack(selectedTrack);
    setPlayStatus(true);
  };

  // Previous song
  const previous = async () => {
    if (!track || !songsData?.length) return;

    const currentIndex = songsData.findIndex(
      (item) => item?._id === track?._id,
    );

    if (currentIndex > 0) {
      const previousTrack = songsData[currentIndex - 1];

      setTrack(previousTrack);
      setPlayStatus(true);
    }
  };

  // Next song
  const next = async () => {
    if (!track || !songsData?.length) return;

    const currentIndex = songsData.findIndex(
      (item) => item?._id === track?._id,
    );

    if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
      const nextTrack = songsData[currentIndex + 1];

      setTrack(nextTrack);
      setPlayStatus(true);
    }
  };

  // Seek song
  const seekSong = async (e) => {
    if (!audioRef.current || !seekBg.current || !audioRef.current.duration) {
      return;
    }

    const width = seekBg.current.offsetWidth;

    if (!width) return;

    const newTime = (e.nativeEvent.offsetX / width) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
  };

  // Fetch songs and albums
  useEffect(() => {
    if (!user || !token) return;

    getSongsData();
    getAlbumsData();
  }, [user, token]);

  // Load selected track
  useEffect(() => {
    if (!track || !audioRef.current) return;

    const audio = audioRef.current;

    console.log("track", track);
    

    audio.src = track?.file ?? "";
    audio.load();

    if (playStatus) {
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.error("Error playing selected track:", error);
        }
      };

      playAudio();
    }
  }, [track]);

  // Update seek bar and time
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !track) return;

    const updateSeekBar = () => {
      if (seekBar.current && audio.duration && !isNaN(audio.duration)) {
        seekBar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      }

      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60) || 0,
          minute: Math.floor(audio.duration / 60) || 0,
        },
      });
    };

    const handleLoadedMetadata = () => {
      if (seekBar.current) {
        seekBar.current.style.width = "0%";
      }

      setTime({
        currentTime: {
          second: 0,
          minute: 0,
        },
        totalTime: {
          second: Math.floor(audio.duration % 60) || 0,
          minute: Math.floor(audio.duration / 60) || 0,
        },
      });
    };

    const handleEnded = () => {
      setPlayStatus(false);
    };

    audio.addEventListener("timeupdate", updateSeekBar);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateSeekBar);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [track]);

  useEffect(() => {
    if (user && token) {
      getSongsData();
      getAlbumsData();
    }
  }, [user, token]);

  const contextValue = {
    getSongsData,
    getAlbumsData,
    songsData,
    albumsData,

    audioRef,
    seekBar,
    seekBg,

    track,
    setTrack,

    playStatus,
    setPlayStatus,

    time,
    setTime,

    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
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
    throw new Error("usePlayer must be used within a PlayerContextProvider");
  }

  return context;
};
