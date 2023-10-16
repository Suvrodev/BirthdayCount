import React from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import useCheckUser from '../Hook/useCheckUser';

const AdminRoute = ({children}) => {
    const {loading,user,baseUrl}=useContext(AuthContext)
    // const [checkAdmin]=useCheckUser()

    const [check,setCheck]=useState(true)
    const [checkAdmin,setCheckAdmin]=useState("")
    let EMAIL=user?.email;

    useEffect(()=>{
        if(EMAIL){
            fetch(`${baseUrl}allusers/${EMAIL}`)
            .then(res=>res.json())
            .then(data=>setCheckAdmin(data))
        }
    },[EMAIL,check])
    console.log("Check Admin in Admin Route: ",checkAdmin);
  

    if(loading){
        return <div>
            <span className="loading loading-spinner text-primary"></span>
            <span className="loading loading-spinner text-secondary"></span>
            <span className="loading loading-spinner text-accent"></span>
            <span className="loading loading-spinner text-neutral"></span>
            <span className="loading loading-spinner text-info"></span>
            <span className="loading loading-spinner text-success"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    if(user){
        setCheck(!check)
        console.log("Check Admin in user: ",checkAdmin);
    }

    return <Navigate to={'/'}></Navigate>

 
};

export default AdminRoute;