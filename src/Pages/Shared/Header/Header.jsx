import React, { useContext } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import logo from "../../../assets/logo/logo.png";
import { AuthContext } from "../../../Provider/AuthProvider";
import HeaderMode from "./HeaderMode/HeaderMode";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const { user, Logout_, successfullToast, baseUrl, databseUser } =
    useContext(AuthContext);

  const navItems = (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4">
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-extrabold" : ""
        }
        to="/home"
      >
        Home
      </NavLink>

      <div className="flex flex-col">
        {databseUser && (
          <div className="flex flex-col md:flex-row gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-extrabold" : ""
              }
              to="/birthday"
            >
              Birthday
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-extrabold" : ""
              }
              to="/addfriend"
            >
              Add Friend
            </NavLink>
          </div>
        )}
      </div>

      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-extrabold" : ""
        }
        to="/feedback"
      >
        Feedback
      </NavLink>

      {databseUser && (
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-extrabold" : ""
          }
          to={`/dashboard/allusers`}
        >
          <span className=" ">Dashboard</span>
        </NavLink>
      )}
      <HeaderMode></HeaderMode>
    </div>
  );
  return (
    <div className="navbar  h-28 mb-4 text-black ">
      {/* Logo And Webpage Div Start */}
      <div className="navbar-start ">
        {/* Bar Icon Box Start */}
        <div className="dropdown">
          {/* Bar Icon Start */}
          <label tabIndex={0} className={`btn btn-ghost lg:hidden`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {/* Bar Icon End */}

          {/* For Mobile Page start */}
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-white z-10  "
          >
            {navItems}
          </ul>
          {/* For Mobile Page End */}
        </div>
        {/* Bar Icon Box End */}

        {/* Logo and Website Name Start */}
        <img className="logoImage" src={logo} alt="" />
        <h1 className="text-xl md:text-2xl font-bold birthday">Birthday</h1>
        {/* Logo and Website Name End */}
      </div>
      {/* Logo And Webpage Div End */}

      {/* For Computer Page Start */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      {/* For Computer Page End */}

      {/* Right side of navbar Start */}
      <div className="navbar-end">
        {databseUser ? (
          <>
            {databseUser.photo && (
              <img
                className="w-[35px] h-[35px] rounded-full mr-4"
                src={databseUser?.photo}
                alt=""
              />
            )}
            {/* <button onClick={Logout_} className='btn btn-neutral text-white '> <Link to={'/'}> Logout </Link> </button> */}
            <Link to={"/login"}>
              {" "}
              <button onClick={Logout_} className="btn btn-neutral text-white ">
                Logout
              </button>{" "}
            </Link>
            {/* <button onClick={Logout_} className='btn btn-neutral text-white '> <Link > Logout </Link> </button> */}
          </>
        ) : (
          <div className="flex items-center ">
            <p className="w-[35px] rounded-full ">
              <FaUser className="" />
            </p>
            <Link to={"/login"}>
              {" "}
              <button className="btn btn-neutral text-white ">
                {" "}
                Login{" "}
              </button>{" "}
            </Link>
          </div>
        )}
      </div>
      {/* Right side of navbar End */}
    </div>
  );
};

export default Header;
