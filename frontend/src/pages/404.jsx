import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-1 fw-bold mb-3">404</h1>
      <h2 className="mb-3">Oops! Sorry, there is nothing here.</h2>
      <p className="mb-4 text-secondary">The page you are looking for does not exist or has been moved.</p>
      <button className="btn btn-primary px-4 py-2" onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default NotFound;
