import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response?.data?.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold text-gray-800'>All Users</h2>
        <button
          onClick={() => navigate("/create-users")}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'
        >
          + Create User
        </button>
      </div>

      {error ? (
        <p className='text-red-600 text-center font-medium'>{error}</p>
      ) : users.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {users.map((user) => (
            <div
              key={user._id}
              className='bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow'
            >
              <h3 className='text-xl font-semibold text-blue-600 mb-2'>
                {user.name}
              </h3>
              <p className='text-gray-700 mb-1'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
              <p className='text-gray-700 mb-1'>
                <span className='font-medium'>Phone:</span>{" "}
                {user.phone || "N/A"}
              </p>
              <p className='text-gray-700 mb-1'>
                <span className='font-medium'>Role:</span> {user.role}
              </p>
              <p className='text-gray-700'>
                <span className='font-medium'>Verified:</span>{" "}
                {user.isVerified ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;
