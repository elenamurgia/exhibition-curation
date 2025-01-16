import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CustomNavbar from "./components/CustomNavbar";
import Artworks from "./components/Artworks";
import Artists from "./components/Artists";
import Museums from "./components/Museums";
import ArtBooks from "./components/ArtBooks";
import UserGallery from "./components/UserGallery";
import './App.css';

function App() {
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/art-books" element={<ArtBooks />} />
          <Route path="/my-gallery" element={<UserGallery />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
