import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component to check if the user is logged in
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected component
  return element;
};

export default ProtectedRoute;
