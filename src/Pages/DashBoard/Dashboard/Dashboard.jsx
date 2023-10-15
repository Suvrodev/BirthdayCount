import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open bg-white">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-5">
          {/* Page content here */}
          <div className=''>
               <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><FaBars/></label>
          </div>
          <Outlet/>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" ></label> 
          <ul className="menu p-4 w-80 min-h-full bg-green-500 text-base-content">
            {/* Sidebar content here */}
                <li><NavLink className={({isActive})=> isActive? 'underline text-blue-600 font-extrabold':'font-bold'}  to='/'> <FaHome/> Home </NavLink ></li>
                <li><NavLink className={({isActive})=> isActive? 'underline text-blue-600 font-extrabold':'font-bold'}  to='/dashboard/allusers'>All User</NavLink ></li>
                <li><NavLink className={({isActive})=> isActive? 'text-blue-500 font-extrabold':'font-bold'}  to='/dashboard/allpeople'>All People</NavLink ></li>
          </ul>
        
        </div>
      </div>
    );
};

export default Dashboard;