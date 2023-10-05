import React from 'react';
import { FaHouseMedical } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/Image/Error.jpg'

const ErrorElement = () => {
    return (
        <div className='bg-red-400 overflow-auto'>
            <h1 className='bg-red-700 m-5 p-5 rounded-md font-bold text-2xl text-center'>Invalid URL</h1>
            <Link to={'/'}><button className='btn btn-warning text-white block mx-auto m-5 flex items-center justify-center'> <FaHouseMedical/> Go To Home</button></Link>
            <img className='w-[95%] mx-auto rounded-md' src={ErrorImage} alt="" />
        </div>
    );
};

export default ErrorElement;