import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext("");
const AuthProvider = ({ children }) => {
  const [userDep, setUserDep] = useState(true);
  const [databseUser, setDatabaseUser] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  let baseUrl = "http://localhost:7000/";
  // let baseUrl = "https://birthday-count-server-green.vercel.app/";

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Sign in By Google Start
  const signInByGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // Sign in By Google End

  ///Sign Out Start
  const Logout_ = () => [
    signOut(auth)
      .then(() => {
        console.log("SignOut Successfully");
        localStorage.removeItem("brtd");
        setUserDep(!userDep);
        setLoading(false);
      })
      .then((error) => {
        // console.log("SignOut Error: ",error.message);
      }),
  ];
  ///Sign Out End

  // Check User start
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     console.log("Current User: ", currentUser);
  //     setLoading(false);
  //     setUser(currentUser);
  //   });
  //   return () => unSubscribe();
  // }, []);
  // Check User End

  ///Check Database user start
  useEffect(() => {
    const email = localStorage.getItem("brtd");
    if (email) {
      fetch(`${baseUrl}allusers/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setDatabaseUser(data);
        });
    } else {
      setLoading(false);
      setDatabaseUser(null);
    }
  }, [userDep]);
  console.log("Database User: ", databseUser);
  console.log("UserDep: ", userDep);

  ///SuccessFully Toast Start
  const successfullToast = (write) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: write,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  ///UnSuccessfull Toast Start
  const unSuccessfullToast = (write) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: write,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  };

  const authInfo = {
    user,
    databseUser,
    userDep,
    setUserDep,
    signInByGoogle,
    Logout_,
    successfullToast,
    unSuccessfullToast,
    loading,
    baseUrl,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
