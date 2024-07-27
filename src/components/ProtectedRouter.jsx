import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children }) => {
  return localStorage.getItem("login") ? <>{children}</> : <Navigate to="/" />;
};
