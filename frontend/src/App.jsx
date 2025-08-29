import "./App.css";
import "@sg-bootstrap/icons/dist/index.css";
import '@sg-bootstrap/core/dist/css/sg-bootstrap-standard.min.css';
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Auth from "./pages/Authentication";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        {/* Add more routes here as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

