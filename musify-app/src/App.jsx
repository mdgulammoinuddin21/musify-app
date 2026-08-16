import React from "react";
import { Toaster } from "react-hot-toast";

import Display from "./components/Display.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { PlayerContextProvider } from "./context/PlayerContext.jsx";

const App = () => {
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
          </div>
        </PlayerContextProvider>
      </AuthWrapper>
    </>
  );
};

export default App;