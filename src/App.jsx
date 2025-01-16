import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CustomNavbar from "./components/CustomNavbar";
import ArtworksList from "./components/ArtworksList";
import Artists from "./components/Artists";
import Museums from "./components/Museums";
import ArtBooks from "./components/ArtBooks";
import UserGallery from "./components/UserGallery";
import ArtworkDetails from "./components/ArtworkDetails";
import './App.css';

function App() {
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/artworks" element={<ArtworksList />} />
          <Route path="/artworks/:id" element={<ArtworkDetails />} />
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
