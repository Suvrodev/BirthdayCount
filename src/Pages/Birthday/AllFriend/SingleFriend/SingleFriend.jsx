import React from 'react';
import './SingleFriend.css'
import { FaTrash, FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';

const SingleFriend = ({friend,handleDelete}) => {
    // console.log(friend);
    const {_id,name,image,dob,phone,ratting}=friend
    return (
        <div className="mainCard bg-gray-500">
            <div className='cardImage'>
               <img className='' src={image} alt="" />
            </div>
            <div className='text-center midPortionCard'>
               <h1 className='font-bold text-green-500 italic'>{name}</h1>
               <h1 className='font-bold text-orange-400'>{dob}</h1>
               <div className='flex gap-5 font-bold'>
                <div>
                <Rating
                    style={{ maxWidth: 100 }}
                    value={ratting}
                    readOnly
                 />
                </div>
               </div>
               <p className='font-bold'>Phone: <span className='text-yellow-500'>{phone}</span></p>
            </div>

            <div className='rightPortionOfCard'>
                <button className='btn btn-group'> <Link to={`/birthday/${_id}`}><FaUser/></Link>  </button>
                <button className='btn btn-group bg-red-600 border-0' onClick={()=>handleDelete(_id)} > <FaTrash/> </button>
               
            </div>
        </div>
    );
};

export default SingleFriend;