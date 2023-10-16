import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';

const useCheckUser = () => {
    const {user,baseUrl}=useContext(AuthContext)
    const [checkAdmin,setCheckAdmin]=useState("")
    let EMAIL=user?.email;

    useEffect(()=>{
        if(EMAIL){
            fetch(`${baseUrl}allusers/${EMAIL}`)
            .then(res=>res.json())
            .then(data=>setCheckAdmin(data))
        }
    },[EMAIL])
    console.log("Check Admin in hook: ",checkAdmin);
    return [checkAdmin]
};

export default useCheckUser;