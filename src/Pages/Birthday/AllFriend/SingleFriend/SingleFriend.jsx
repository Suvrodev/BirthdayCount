import React from 'react';
import './SingleFriend.css'
import { FaTrash, FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SingleFriend = ({friend,handleDelete}) => {
    // console.log(friend);
    const {_id,name,image,dob,phone,ratting}=friend
    return (
        <div className="mainCard ">
            <div className='cardImage'>
               <img className='' src={image} alt="" />
            </div>
            <div className='text-center midPortionCard'>
               <h1 className='font-bold'>{name}</h1>
               <h1 className='font-bold'>{dob}</h1>
               <div className='flex gap-5 font-bold'>
                 <p>Ratting: {ratting} </p>
                 <p>Remaining Day: {} </p>
               </div>
               <p>Phone: {phone}</p>
            </div>

            <div className='rightPortionOfCard'>
                <button> <Link to={`/birthday/${_id}`}><FaUser/></Link>  </button>
                <button onClick={()=>handleDelete(_id)} className=''> <FaTrash/> </button>
               
            </div>
        </div>
    );
};

export default SingleFriend;