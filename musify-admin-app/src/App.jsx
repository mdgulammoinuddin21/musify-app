import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./Login.jsx";
import AddSong from "./AddSong.jsx";
import ListSong from "./ListSong.jsx";
import AddAlbum from "./AddAlbum.jsx";
import ListAlbum from "./ListAlbum.jsx";

export const API_BASE_URL = "http://localhost:8080";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" />

        <Routes>
          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Songs */}
          <Route path="/add-song" element={<AddSong />} />

          <Route path="/list-songs" element={<ListSong />} />

          {/* Albums */}
          <Route path="/add-album" element={<AddAlbum />} />

          <Route path="/list-albums" element={<ListAlbum />} />

          {/* Default route */}
          <Route path="/" element={<Login />} />

          {/* Unknown route */}
          <Route path="*" element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
