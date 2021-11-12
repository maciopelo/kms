import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../store/contexts/AuthContext";

const PrivateRoute = () => {
  const {
    authState: { user },
  } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
