import { useState, useEffect } from "react";

export default function AdminHome() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  return (
    <div className='min-h-screen p-6 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='p-4 bg-white rounded shadow'>
          <h2 className='text-xl font-semibold'>Total Users</h2>
          <p className='text-2xl mt-2'>{stats.totalUsers}</p>
        </div>

        <div className='p-4 bg-white rounded shadow'>
          <h2 className='text-xl font-semibold'>Total Auctions</h2>
          <p className='text-2xl mt-2'>{stats.totalAuctions}</p>
        </div>

        <div className='p-4 bg-white rounded shadow'>
          <h2 className='text-xl font-semibold'>Total Revenue</h2>
          <p className='text-2xl mt-2'>₹{stats.totalRevenue}</p>
        </div>
      </div>

      {/* Add more sections for managing auctions, users, etc. */}
    </div>
  );
}
