// src/Routes/PrivateRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth, useCustomerAuth } from "./AuthProvider";

export const AdminPrivateRoute = ({ children }) => {
  const [authAdmin] = useAdminAuth();
  return authAdmin ? children : <Navigate to="/login" />;
};

export const CustomerPrivateRoute = ({ children }) => {
  const [authCustomer] = useCustomerAuth();
  return authCustomer ? children : <Navigate to="/c/login" />;
};
