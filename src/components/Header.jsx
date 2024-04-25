import { Link } from 'react-router-dom';
import userIcon from "../assets/user.svg";
import arrowIcon from "../assets/arrow1.svg";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import { useAuth } from '../utils/AuthContext'


function Header() {
  const navigate = useNavigate()
  const {user,logoutUser} = useAuth()
  
  console.log(user);  

  

  return (
    <div className="Header flex justify-around my-4">
      <h1 className="text-2xl ml-4">Name</h1>
      <div className="flex items-center space-x-2 mr-4">
        <img src={userIcon} alt="User Icon" className="w-6 h-6" />
        <p>{user ? user.username : 'Guest'}</p>
        <img src={arrowIcon} alt="Dropdown Icon" className="w-4 h-4" />
      </div>

      <div className="links--wrapper">
        {user ? (
          <>
            <button onClick={logoutUser} className="inline-block cursor-pointer bg-black text-white px-4 py-2 transition-colors duration-300 border border-black no-underline hover:bg-white hover:text-black" to="/">Logout</button>
          </>
        ) : (
            <Link className="inline-block cursor-pointer bg-black text-white px-4 py-2 transition-colors duration-300 border border-black no-underline hover:bg-white hover:text-black" to="/">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Header;