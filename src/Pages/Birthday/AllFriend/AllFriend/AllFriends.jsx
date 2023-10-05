import React, { useContext, useEffect, useState } from 'react';
import './AllFriends.css'
import SingleFriend from '../SingleFriend/SingleFriend';
import { AuthContext } from '../../../../Provider/AuthProvider';

const AllFriends = () => {

    const {successfullToast}=useContext(AuthContext)

    const [friends,setFriends]=useState([])
    const [check,setCheck]=useState(true)
    useEffect(()=>{
        fetch(`http://localhost:7000/bd`)
        .then(res=>res.json())
        .then(data=>setFriends(data))
    },[check])
    // console.log(friends);

    const handleDelete=(_id)=>{
        // console.log("Delete: ",_id);
        fetch(`http://localhost:7000/bd/${_id}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.deletedCount>0){
                successfullToast("Deleted Successfully")
                setCheck(!check)
           }
        })
    }

    return (
        <div className='bg-purple-500 w-[98%] mx-auto p-5 m-2 rounded-xl'>
        <h1 className='bg-orange-500 w-4/12 mx-auto text-center p-2 mb-5 rounded-lg font-bold'>Your All Friend: {friends.length}</h1>
        <div className='birthdayContainder'>
            <div className='birthdayContainderLeft'>
                {
                  friends.map(friend=><SingleFriend
                  key={friend._id}
                  friend={friend}
                  handleDelete={handleDelete}
                  ></SingleFriend>)
                }
            </div>
            <div className='birthdayContainderRight'>
               <h1>Right Side</h1> 
            </div>
        </div>
    </div>
    );
};

export default AllFriends;