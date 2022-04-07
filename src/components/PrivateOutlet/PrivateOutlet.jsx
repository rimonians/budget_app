import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateOutlet = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  return Object.keys(user).length === 0 ? (
    <Navigate to="/signin" />
  ) : (
    <Outlet />
  );
};

export default PrivateOutlet;
