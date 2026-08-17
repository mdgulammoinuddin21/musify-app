import { useContext } from "react";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  ListMusic,
  Mic,
  Speaker,
  Volume2,
  Minimize2,
  Maximize2,
} from "lucide-react";

import { PlayerContext } from "../context/PlayerContext.jsx";

export const Player = () => {
  const {
    track,
    audioRef,
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
    <audio ref={audioRef} preload="auto" />
      {/* Track information */}
      <div className="hidden lg:flex items-center gap-4">
        <img src={track?.image} alt="" className="w-12" />

        <div>
          <p>{track?.name}</p>
          <p>{track?.desc?.slice(0, 12)}</p>
        </div>
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <Shuffle className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

          <SkipBack
            onClick={previous}
            className="w-4 h-5 cursor-pointer text-white hover:text-green-500 transition-colors"
          />

          {playStatus ? (
            <Pause
              onClick={pause}
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
            />
          ) : (
            <Play
              onClick={play}
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
            />
          )}

          <SkipForward
            onClick={next}
            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
          />

          <Repeat className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        </div>

        {/* Seek bar */}
        <div className="flex items-center gap-5">
          <p>
            {time?.currentTime?.minute ?? 0}:
            {String(time?.currentTime?.second ?? 0).padStart(2, "0")}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>

          <p>{track?.duration ?? "0:00"}</p>
        </div>
      </div>

      {/* Right-side controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <ListMusic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

        <Mic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

        <Speaker className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

        <Volume2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

        <Minimize2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />

        <Maximize2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
      </div>
    </div>
  ) : null;
};

export default Player;
