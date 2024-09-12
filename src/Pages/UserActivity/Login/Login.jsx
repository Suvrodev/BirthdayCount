import React, { useContext, useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

import loginImage from "../../../assets/LoginImage/LoginImage.jpg";
const Login = () => {
  const location = useLocation();
  // console.log("Login Location: ",location);
  const target = location?.state?.from || "/";
  // console.log("Target: ",target);

  const navigate = useNavigate();
  const {
    user,
    signInByGoogle,
    successfullToast,
    unSuccessfullToast,
    loginByEmailPassword,
    baseUrl,
    userDep,
    setUserDep,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  const handleGoogleLogin = () => {
    signInByGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log("Google User: ", loggedUser);

        ////USer post operation start
        const thisUser = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
          photo: loggedUser?.photoURL,
          role: "",
        };
        fetch(`${baseUrl}user`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(thisUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Come data: ", data);
            if (data) {
              successfullToast("Signin Successfully");
              setUserDep(!userDep);
              navigate(target, true);

              /***
               * Set Data in Ls
               */
              localStorage.setItem("brtd", loggedUser?.email);
              /***
               * Set Data in Ls
               */
            }
          });
        ////USer post operation end
      })
      .catch((error) => {
        console.log("Google Error: ", error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginByEmailPassword(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Login User: ", loggedUser);
        successfullToast("Login Successfuly");
        navigate(target);
      })
      .catch((error) => {
        unSuccessfullToast("Email or Password not Matched");
      });
  };
  return (
    <div className="bg-purple-300 border-black border-1 rounded-lg m-5 p-4">
      <Helmet>
        <title>Logim || Birthday</title>
      </Helmet>
      <div className="flex">
        <div className="w-full md:w-[75%]">
          <img src={loginImage} alt="" />
        </div>
        <div className="w-full md:w-[25%] flex items-center justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="btn  bg-[#4889F4] hover:bg-[#4889F4]"
          >
            <FaGoogle className="text-white" />{" "}
            <p className="tex-white text-white">Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
