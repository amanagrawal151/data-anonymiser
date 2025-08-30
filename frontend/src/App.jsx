import "./App.css";
import "@sg-bootstrap/icons/dist/index.css";
import '@sg-bootstrap/core/dist/css/sg-bootstrap-standard.min.css';
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Auth from "./pages/Authentication";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";


import React, { useState } from "react";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Router>
      <Navbar setShow={setShowSidebar} />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

