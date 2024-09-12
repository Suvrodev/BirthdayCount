import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user, databseUser } = useContext(AuthContext);

  console.log("User in Private Route: ", databseUser);
  console.log("Loading in Private Route: ", loading);
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

  if (databseUser) {
    return children;
  }
  return <Navigate state={{ from: path }} to={"/login"}></Navigate>;
};

export default PrivateRoute;
