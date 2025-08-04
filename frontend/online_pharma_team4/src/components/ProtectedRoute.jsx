import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const role = localStorage.getItem("role");

  // If no role stored, user not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    // User logged in but not authorized for this route
    if (role === "USER") {
      return <Navigate to="/user" replace />;
    }
    // For any other unexpected roles, send back to login
    return <Navigate to="/login" replace />;
  }

  // Role matches – allow access
  return <Outlet />;
};

export default ProtectedRoute;