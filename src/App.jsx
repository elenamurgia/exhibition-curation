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
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100vw",  
    overflowX: "hidden",  
  }}>
    <Header />
    <div style={{ 
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch", 
      width: "100%", 
      padding: "20px",
    }}> 
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/artworks" element={<ArtworksList />} />
        <Route path="/artworks/:source/:id" element={<ArtworkDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;
