import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext.jsx";

import AddSong from "./pages/AddSong.jsx";
import ListSong from "./pages/ListSong.jsx";
import AddAlbum from "./pages/AddAlbum.jsx";
import ListAlbum from "./pages/ListAlbum.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
          <Route path="/add-song" element={
            <ProtectedRoute requireAdmin={true}>
              <AddSong></AddSong>
            </ProtectedRoute>
          } />

          <Route path="/list-songs" element={
            <ProtectedRoute requireAdmin={true}>
              <ListSong></ListSong>
            </ProtectedRoute>
          } />

          {/* Albums */}
          <Route path="/add-album" element={
            <ProtectedRoute requireAdmin={true}>
              <AddAlbum></AddAlbum>
            </ProtectedRoute>
          } />

          <Route path="/list-albums" element={
            <ProtectedRoute requireAdmin={true}>
              <ListAlbum></ListAlbum>
            </ProtectedRoute>
          } />

          {/* Default route */}
          <Route path="/" element={<Login />} />

          {/* Unknown route */}
          <Route path="*" element={
            <ProtectedRoute requireAdmin={true}>
              <AddSong></AddSong>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
