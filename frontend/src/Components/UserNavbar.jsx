import React from "react";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5"; // Icon for logout

export default function Navbar() {
  return (
    <div className='bg-blue-700 text-white shadow-md p-4 flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        {/* Brand Logo or App Name */}
        <span className='text-2xl font-semibold tracking-wide'>
          Welcome TO Auction
        </span>
      </div>

      <div className='flex items-center space-x-6'>
        <div className='relative'>
          <button className='flex items-center space-x-2 hover:bg-blue-800 rounded-md py-2 px-4 transition-all'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
          {/* Dropdown menu could go here */}
        </div>

        {/* Logout Button */}
        <Link
          to='/'
          className='bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2 transition-all'
        >
          <IoLogOut className='w-5 h-5' />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
