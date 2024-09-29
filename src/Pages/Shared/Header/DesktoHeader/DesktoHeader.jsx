import React, { useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import HeaderMode from "../HeaderMode/HeaderMode";
import logo from "../../../../assets/logo/logo.png";
import { FaUser } from "react-icons/fa6";

const DesktoHeader = () => {
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
      <HeaderMode />
    </div>
  );

  return (
    <div className="flex  items-center justify-between">
      <div className="flex gap-2 items-center">
        <img className="logoImage" src={logo} alt="" />
        <h1 className="text-xl md:text-2xl font-bold birthday">Birthday</h1>
      </div>
      <div>{navItems}</div>
      <div>
        {databseUser ? (
          <div className="flex items-center">
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
          </div>
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
    </div>
  );
};

export default DesktoHeader;
