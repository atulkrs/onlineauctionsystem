// src/layouts/DashboardLayout.jsx
import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='hidden md:flex md:flex-shrink-0'>
        <Sidebar />
      </aside>

      <div className='flex flex-col flex-1'>
        <header className='w-full'>
          <Navbar />
        </header>

        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
}
