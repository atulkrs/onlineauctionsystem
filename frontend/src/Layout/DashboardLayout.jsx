import React from "react";
import UserNavbar from "../Components/UserNavbar";
import UserSidebar from "../Components/UserSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      <aside className='hidden md:flex md:flex-shrink-0'>
        <UserSidebar />
      </aside>

      <div className='flex flex-col flex-1'>
        <header className='w-full'>
          <UserNavbar />
        </header>

        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
}
