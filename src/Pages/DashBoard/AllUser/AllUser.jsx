import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';

const AllUser = () => {
    const {user,successfullToast,unSuccessfullToast,baseUrl}=useContext(AuthContext)

    const [alluser,setAllUser]=useState([])
    useEffect(()=>{
        fetch(`${baseUrl}alluser`)
        .then(res=>res.json())
        .then(data=>setAllUser(data))
    },[]) 

    console.log(alluser);
    return (
        <div className='w-full'>
        <h3 className='text-3xl font-semibold my-4'>Total users: {alluser.length} </h3>
        <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
            {/* head */}
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                alluser.map((user,index)=>  <tr key={user._id}>
                    <th>{index+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td> {user.role == 'admin'? 'admin': <button onClick={()=>{handleMakeAdmin(user)}} className="btn btn-ghost btn-lg bg-orange-600"> <FaUserShield/> </button>} </td>
                    <td><button onClick={()=>{handleDelete(user._id)}} className="btn btn-ghost btn-lg bg-red-600"> <FaTrashAlt/> </button></td>
                </tr>)
            }
            
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default AllUser;