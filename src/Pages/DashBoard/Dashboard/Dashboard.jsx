import React from "react";
import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, Logout_, successfullToast, baseUrl, databseUser } =
    useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (databseUser?.role == "admin") {
      setIsAdmin(true);
    }
  }, [databseUser]);

  ////Check Admin or not End

  return (
    <div className="drawer lg:drawer-open bg-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-5">
        {/* Page content here */}
        <div className="">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <FaBars />
          </label>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-green-500 text-base-content">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <p className="text-center font-bold bg-orange-500 text-white p-2 m-2 rounded-md">
                Admin Pannel
              </p>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline text-blue-600 font-extrabold"
                      : "font-bold"
                  }
                  to="/"
                >
                  {" "}
                  <FaHome /> Home{" "}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline text-blue-600 font-extrabold"
                      : "font-bold"
                  }
                  to="/dashboard/allusers"
                >
                  All User
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-extrabold" : "font-bold"
                  }
                  to="/dashboard/allpeople"
                >
                  All People
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <p className="text-center font-bold bg-white text-black p-2 m-2 rounded-md">
                User Pannel
              </p>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "underline text-blue-600 font-extrabold"
                      : "font-bold"
                  }
                  to="/"
                >
                  {" "}
                  <FaHome /> Home{" "}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
