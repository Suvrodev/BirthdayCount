import React from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useCheckUser from "../Hook/useCheckUser";

const AdminRoute = ({ children }) => {
  const { loading, user, databseUser } = useContext(AuthContext);

  // console.log("User in Private Route: ", databseUser);
  const location = useLocation();
  const path = location.pathname;
  // console.log("Path Private:",path);
  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (databseUser && databseUser?.role == "admin") {
    return children;
  }

  return <Navigate to={"/dashboard"}></Navigate>;
};

export default AdminRoute;
