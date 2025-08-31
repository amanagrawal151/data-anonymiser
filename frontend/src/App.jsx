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
import Notification from "./pages/Notification";
import Guide from "./pages/Guide";
import About from "./pages/About";

import Privacy from "./pages/Privacy";
import NotFound from "./pages/404";


import React, { useState } from "react";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(true); 
  return (
    <Router>
      <Navbar setShow={setShowSidebar} />
      <Sidebar show={showSidebar} setShow={setShowSidebar} />
      <Routes>
        <Route path="/" element={<Home welcomeMessage={welcomeMessage} />} />
        <Route path="/home" element={<Home welcomeMessage={welcomeMessage} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

