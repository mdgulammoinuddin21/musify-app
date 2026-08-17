import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { PlayerContext, PlayerContextProvider } from "./context/PlayerContext.jsx";
import Player from "./components/Player.jsx";

const App = () => {

  const {audioRef, track} = useContext(PlayerContext);

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

      <AuthWrapper>
        <PlayerContextProvider>
          <div className="h-screen bg-black">
            <div className="h-[90%] flex">
              <Sidebar />
              <Display />
            </div>

            {/* Player component */}
            <Player/>
            <audio 
             ref={audioRef}
             src={track?.file}
             preload="auto" 
            ></audio>
          </div>
        </PlayerContextProvider>
      </AuthWrapper>
    </>
  );
};

export default App;