import React from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaGavel,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // Icons for navigation

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", to: "/admin-dashboard", icon: <FaTachometerAlt /> },
    { name: "Auctions", to: "/auction", icon: <FaGavel /> },
    { name: "Settings", to: "/settings", icon: <FaCog /> },
    { name: "Logout", to: "/", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className='bg-gray-800 text-white w-64 min-h-screen p-5 shadow-lg'>
      <div className='space-y-6'>
        <div className='text-xl font-semibold text-gray-300 mb-8'>
          STAR AUCTION
        </div>

        <ul className='space-y-4'>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-all 
              ${
                location.pathname === item.to
                  ? "bg-blue-700"
                  : "hover:bg-blue-600"
              }`}
            >
              <div className='text-xl'>{item.icon}</div>
              <Link to={item.to} className='text-lg'>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
