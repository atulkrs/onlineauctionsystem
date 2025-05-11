import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../Components/role";
import axios from "axios";

const CreateUser = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ROLES.USER,
  });
  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = newUser;

    if (!name || !email || !phone || !password) {
      return alert("All fields are required.");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return alert("You must be logged in as an admin to create a user.");
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/create-users",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201)
        alert(`User "${newUser.name}" with role "${newUser.role}" created.`);
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-6'>Create User</h2>
      <form onSubmit={handleCreateUser}>
        {/* Name Field */}
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Name</label>
          <input
            type='text'
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder='Enter user name'
          />
        </div>

        {/* Email Field */}
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Email</label>
          <input
            type='email'
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder='Enter email address'
          />
        </div>

        {/* Phone Field */}
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Phone</label>
          <input
            type='tel'
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            placeholder='Enter phone number'
          />
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>
            Password
          </label>
          <input
            type='password'
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            placeholder='Enter password'
          />
        </div>

        {/* Role Field */}
        <div className='mb-6'>
          <label className='block text-gray-700 font-medium mb-2'>Role</label>
          <select
            className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500'
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.ADMIN}>Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
        >
          Save User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
