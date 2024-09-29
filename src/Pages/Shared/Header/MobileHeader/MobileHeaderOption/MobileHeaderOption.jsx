import React, { useContext } from "react";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import HeaderMode from "../../HeaderMode/HeaderMode";

const MobileHeaderOption = ({ handleClick }) => {
  const { user, Logout_, successfullToast, baseUrl, databseUser } =
    useContext(AuthContext);

  console.log("database user: ", databseUser);
  const navItems = (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4">
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-extrabold" : ""
        }
        to="/home"
        onClick={() => handleClick(false)}
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
              onClick={() => handleClick(false)}
            >
              Birthday
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-extrabold" : ""
              }
              to="/addfriend"
              onClick={() => handleClick(false)}
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
        onClick={() => handleClick(false)}
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
    <div className="bg-slate-500 text-white flex flex-col gap-4 px-5 py-5">
      <div className="flex flex-col gap-4 font-bold w-full  ">{navItems}</div>
      <div className="w-full flex flex-col gap-4 ">
        {databseUser ? (
          <div>
            <h1 className="font-bold -mt-4 mb-2">{databseUser?.name}</h1>
            <div className="flex justify-start items-center gap-4">
              <img
                src={databseUser?.photo}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <button className="btn btn-primary text-white" onClick={Logout_}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button
              className=" btn btn-success bg-yellow-500 text-white "
              onClick={() => handleGoogle()}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileHeaderOption;
