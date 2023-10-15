import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';
import Swal from 'sweetalert2';


export const AuthContext=createContext("")
const AuthProvider = ({children}) => {
    const [user,setUser]=useState("")
    const [loading,setLoading]=useState(true)
    let baseUrl='http://localhost:7000/'

    const auth = getAuth(app);
    const googleProvider= new GoogleAuthProvider();

    // Sign in By Google Start
    const signInByGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    // Sign in By Google End

    // /Register by Email and password start
    const registerByEmailPassword=(email,passowrd)=>{
        return createUserWithEmailAndPassword(auth,email,passowrd)
    }
    // /Register by Email and password end

    // /Login By Email And Password Start
    const loginByEmailPassword=(email,passowrd)=>{
        return signInWithEmailAndPassword(auth,email,passowrd)
    }
    // /Login By Email And Password End


    ///Sign Out Start
    const Logout_=()=>[
        signOut(auth)
        .then(()=>{
            console.log("SignOut Successfully");
        })
        .then(error=>{
            // console.log("SignOut Error: ",error.message);
        }) 
    ]
    ///Sign Out End


     // Check User start
     useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
            console.log("Current User: ",currentUser);
            setLoading(false)
            setUser(currentUser)
        })
        return ()=> unSubscribe()
    },[])
    // Check User End



     ///SuccessFully Toast Start
     const successfullToast=(write)=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: write,
            showConfirmButton: false,
            timer: 1500
          })
    }

    ///UnSuccessfull Toast Start
    const unSuccessfullToast=(write)=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: write,
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }



    const authInfo={
        user,
        signInByGoogle,
        registerByEmailPassword,
        loginByEmailPassword,
        Logout_,
        successfullToast,
        unSuccessfullToast,
        loading,
        baseUrl,


    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;