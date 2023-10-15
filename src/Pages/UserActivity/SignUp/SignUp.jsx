import React, { useContext, useState } from "react";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const imageHosting_Token = import.meta.env.VITE_IMAGE_TOKEN;
const SignUp = () => {
  // console.log("Token: ",imageHosting_Token);
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHosting_Token}`;
  // console.log("URL: ",imageHostingUrl);

  const navigate = useNavigate();

  const { registerByEmailPassword, successfullToast, unSuccessfullToast,baseUrl } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accept, setAccept] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleAccept = () => {
    setAccept(!accept);
    console.log(accept);
  };

  const updateUser = (user, name, photo) => {
    console.log("Heat in Update");
    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then((result) => {
        console.log("Update Result:", result);

        ////USer post operation start
        const thisUser={name,email:user.email,photo,role:''}
        fetch(`${baseUrl}user`,{
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body:JSON.stringify(thisUser)
        })
        .then(res=>res.json())
        .then(data=>{
          console.log("Come Data: ");
           if(data.insertedId){
              successfullToast("SinUp Successfully");
              navigate("/home");
           }
        })
        ////USer post operation end
       
      })
      .catch((error) => {
        console.log("Error in Update: ", error.message);
        unSuccessfullToast("Something Going Wrong");
      });
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const Form = event.target;
    const name = Form.name.value;
    const photo = Form.photo.files[0];
    const email = Form.email.value;
    const password = Form.password.value;
    const ConfirmPassword = Form.Cpassword.value;
    let image;

    if (password.length < 6) {
      unSuccessfullToast("Password Should be more than 5");
      return;
    }
    if (password !== ConfirmPassword) {
      unSuccessfullToast("Password and Confirm Password Doesn't match");
      return;
    }

    // console.log(name,email,password,ConfirmPassword,photo);
    if (photo) {
      const formData = new FormData();
      formData.append("image", photo);

      fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imageResponse) => {
          image = imageResponse.data.display_url;
          console.log("Image Link Okay: ", image);

          /////Mail Registration start
          registerByEmailPassword(email, password)
            .then((result) => {
              const loggedUser = result.user;
              console.log("Email and password okay");
              updateUser(loggedUser, name, image);
            })
            .catch((error) => {
              console.log("Error in Mail: ", error.message);
              unSuccessfullToast("Something Going Wrong");
            });
          /////Mail Registration End
        });
    }
  };
  return (
    <div className="bg-purple-300 border-black border-1 rounded-lg m-5 p-4">
      <Helmet>
        <title>Registration || Birthday</title>
      </Helmet>
      <div className="hereForm  ">
        <form
          action=""
          onSubmit={handleRegistration}
          className="w-[80%] mx-auto"
        >
          <h1 className="text-black font-bold text-center">
            Registration Your Account
          </h1>
          <p className="border w-[80%] mx-auto my-5"></p>
          <p className="font-bold my-4">Name</p>
          <input
            className="w-[100%] p-2 mx-auto text-orange-500 border-0 outline-none"
            type="text"
            name="name"
            placeholder="Enter your Name"
            required
          />
          <p className="font-bold my-4">Upload Photo </p>
          {/* <input className='w-[100%] p-2 mx-auto text-white border-0 outline-none' type="file" name="photo"  placeholder='Enter your Photo url' required/> */}
          <input
            type="file"
            className="file-input file-input-bordered w-full "
            name="photo"
            required
          />

          <p className="font-bold my-4">Email Address</p>
          <input
            className="w-[100%] p-2 mx-auto text-orange-500 border-0 outline-none"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
          <p className="font-bold my-4">Password</p>
          <div className="relative">
            <input
              className="w-[100%] p-2 mx-auto text-orange-500 border-0 outline-none"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              required
            />
            <div onClick={handlePassword}>
              {showPassword ? (
                <FaEyeSlash className="ICON" />
              ) : (
                <FaEye className="ICON" />
              )}
            </div>
          </div>
          <p className="font-bold my-4">Re-Type Password</p>
          <div className="relative">
            <input
              className="w-[100%] p-2 mx-auto text-orange-500 border-0 outline-none"
              type={showConfirmPassword ? "text" : "password"}
              name="Cpassword"
              placeholder="Retype Password"
              required
            />
            <div onClick={handleConfirmPassword}>
              {showConfirmPassword ? (
                <FaEyeSlash className="ICON" />
              ) : (
                <FaEye className="ICON" />
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <input onClick={handleAccept} type="checkbox" name="" />
            <p>Accept our therm and condition</p>
          </div>
          <br />
          <button
            disabled={!accept}
            className="btn bg-black text-white w-[100%] mt-5"
          >
            Registration
          </button>
          <p className="text-center mt-2">
            Already Have An Account ?{" "}
            <Link to={"/login"} className="text-red-500 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
