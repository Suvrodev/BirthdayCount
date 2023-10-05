import React, { useContext } from 'react';
import './Header.css'
import { Link, NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import logo from '../../../assets/logo/logo.png'
import { AuthContext } from '../../../Provider/AuthProvider';

const Header = () => {
    const {user,Logout_,successfullToast}=useContext(AuthContext)

    const navItems=<div className='lg:flex items-center justify-center'>
    <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'text-white'}  to='/home'>Home</NavLink ></li>
    {
      user && 
      <>
          <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'text-white'}  to='/birthday'>Birthday</NavLink ></li>
          <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'text-white'}  to='/addfriend'>Add Friend</NavLink ></li>
      </>
    }
    <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'text-white'}  to='/about'>About</NavLink ></li>
    <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'text-white'}  to='/feedback'>Feedback</NavLink ></li>
    </div>
    return (
        <div className="navbar  h-28 mb-4 text-black ">

        {/* Logo And Webpage Div Start */}
        <div className="navbar-start ">

            {/* Bar Icon Box Start */}
          <div className="dropdown">

                {/* Bar Icon Start */}
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                {/* Bar Icon End */}

                {/* For Mobile Page start */}
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-white z-10  ">
                    {
                        navItems
                    }
                </ul>
                {/* For Mobile Page End */}

          </div>
           {/* Bar Icon Box End */}

           {/* Logo and Website Name Start */}
            <img className='logoImage' src={logo} alt="" />
            <h1 className='text-xl md:text-2xl font-bold text-white'>Birthday</h1>
            {/* Logo and Website Name End */}

        </div>
        {/* Logo And Webpage Div End */}



        {/* For Computer Page Start */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
             {navItems}
          </ul>
        </div>
        {/* For Computer Page End */}

        {/* Right side of navbar Start */}
        <div className="navbar-end">
          {
            user?
            <>
                {
                  user.photoURL &&
                 <img className='w-[35px] rounded-full mr-4' src={user?.photoURL} alt="" />
                }
                <button onClick={Logout_} className='btn btn-neutral text-white '> <Link to={'/'}> Logout </Link> </button>

            </>
            :
            <div className='flex items-center '>
                <p className='w-[35px] rounded-full '><FaUser className='' /></p>
                <button className='btn btn-neutral text-white '> <Link to={'/login'}> Login </Link> </button>
            </div>
          }
        </div>
        {/* Right side of navbar End */}

      </div>
    );
};

export default Header;