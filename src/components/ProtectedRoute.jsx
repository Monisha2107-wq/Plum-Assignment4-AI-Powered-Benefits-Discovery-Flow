import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children, requiredState }) => {
  const context = useContext(AppContext);

  if (!context[requiredState]) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
