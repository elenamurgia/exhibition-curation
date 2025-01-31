import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import ArtworksList from "./components/ArtworksList";
import ArtworkDetails from "./components/ArtworkDetails";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";


const App = () => (
  <div className="row justify-content-center align-items-center" style={{ width: "100vw", height: "auto" }}>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/artworks" element={<ArtworksList />} />
        <Route path="/artworks/:source/:id" element={<ArtworkDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
  </div>
);

export default App;
