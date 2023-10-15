import React, { useContext, useState } from 'react';
import './Login.css'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const location=useLocation()
    // console.log("Login Location: ",location);
    const target=location?.state?.from || '/';
    // console.log("Target: ",target);

    const navigate=useNavigate()
    const {user,signInByGoogle,successfullToast,unSuccessfullToast,loginByEmailPassword,baseUrl}=useContext(AuthContext)

    const [showPassword,setShowPassword]=useState(false)
    const handlePassword=()=>{
        setShowPassword(!showPassword)
        console.log(showPassword);
    }

    const handleGoogleLogin=()=>{
        signInByGoogle()
        .then(result=>{
            const loggedUser=result.user;
            console.log("Google User: ",loggedUser);


            ////USer post operation start
            const thisUser={name:loggedUser?.displayName, emai:loggedUser?.email,photo:loggedUser?.photoURL,role:''}
            fetch(`${baseUrl}user`,{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(thisUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("Come data: ",data);
                if(data){
                    successfullToast("Signin Successfully");
                    navigate(target,true)
                }
            })
            ////USer post operation end
          
        })
        .catch(error=>{
            console.log("Google Error: ",error.message);
        })
    }

    const handleLogin=(event)=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;

        loginByEmailPassword(email,password)
        .then(result=>{
            const loggedUser=result.user;
            console.log("Login User: ",loggedUser);
            successfullToast("Login Successfuly")
            navigate(target)
        })
        .catch(error=>{
            unSuccessfullToast("Email or Password not Matched")
        })
    }
    return (
        <div className='bg-purple-300 border-black border-1 rounded-lg m-5 p-4'> 
        <Helmet>
                <title>Logim || Birthday</title>
        </Helmet> 
                <div className='hereForm  '>
                    
                   <form action="" onSubmit={handleLogin} className='w-[80%] mx-auto'>
                        <h1 className='text-black font-bold text-center'>Login Your Account</h1>
                        <p className='border w-[80%] mx-auto my-5'></p>
                        <p className='font-bold mb-4'>Email Address</p>
                        <input className='w-[100%] p-2 mx-auto text-white border-0 outline-none' type="email" name="email"  placeholder='Enter your email address' required/>
                        <p className='font-bold my-4'>Password</p>
                        <div className='relative'>
                            <input className='w-[100%] p-2 mx-auto text-white border-0 outline-none' type={showPassword? "text" : "password"} name="password"  placeholder='Enter your Password' required/>
                           <div  onClick={handlePassword}>
                              {
                                showPassword? <FaEyeSlash className='ICON'/> : <FaEye className='ICON'/>
                              }
                           </div>
                        </div>
                        <br />
                        <button className='btn bg-black text-white w-[100%] mt-5'>Login</button>
                        <p className='text-center mt-2'>Dont’t Have An Account ? <Link to={'/signup'} className='text-red-500 font-bold'>SignUp</Link></p>
                   </form>
                   <div className='w-[80%] mx-auto '>
                       <p className='text-center font-bold'>Login With</p>
                       <button onClick={handleGoogleLogin} className='btn btn-group block mx-auto mt-2 bg-yellow-500 text-white border-0 '> <FaGoogle/> </button>
                   </div>
                </div>
            </div>
    );
};

export default Login;