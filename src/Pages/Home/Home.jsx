import React from 'react';
import img1 from '../../assets/Gallery/1.png'

const Home = () => {
    return (
        <div className=' bg-slate-500 overflow-auto flex flex-col items-center justify-center'>
            <div>
                <h1 className='bg-green-600 p-5 m-5 w-[90%] md:w-4/12 text-white text-4xl text-center rounded-lg mx-auto'>WelCome To Birthday Count</h1>
                <div className='flex justify-center items-center'>
                    <img className='w-[90%] mx-auto' src={img1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Home;