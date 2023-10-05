import React, { useContext, useEffect, useState } from 'react';
import './AllFriends.css'
import SingleFriend from '../SingleFriend/SingleFriend';
import { AuthContext } from '../../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllFriends = () => {

    const {user,successfullToast}=useContext(AuthContext)
    // console.log("Mail: ",user?.email);

    const [friends,setFriends]=useState([])
    const [check,setCheck]=useState(true)
    useEffect(()=>{
        fetch(`http://localhost:7000/bd?email=${user?.email}`)
        .then(res=>res.json())
        .then(data=>setFriends(data))
    },[check])
    // console.log(friends);

    const handleDelete=(_id)=>{
        // console.log("Delete: ",_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              ///Delete Start
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
              //Delete End
            }
          })

       
    }

    return (
        <div className='bg-purple-500 w-[98%] mx-auto p-5 m-2 rounded-xl'>
        <h1 className='bg-orange-500 w-4/12 mx-auto text-center p-2 mb-5 rounded-lg font-bold'>Your All Friend: {friends.length}</h1>
        {
            friends.length==0?
            <>
              <h1 className='bg-red-600 rounded-lg p-2 font-bold text-white text-center w-4/12 mx-auto'>You have not added Any Friend</h1>
              <Link to={'/addfriend'}> <button className='btn btn-warning text-white block mx-auto my-4'>Add Friend</button> </Link>
            </>
            :
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

        }
    </div>
    );
};

export default AllFriends;