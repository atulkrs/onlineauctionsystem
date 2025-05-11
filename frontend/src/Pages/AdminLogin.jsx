import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, user } = response.data;
      if (user.role != "admin") {
        alert("Access denied: only admins can login here.");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Admin logged in successfully!");
      navigate("/admin-home");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 px-4'>
      <div className='bg-slate-800 border border-slate-700 rounded-lg p-8 w-full max-w-md shadow-lg text-white'>
        <h2 className='text-3xl font-bold mb-6 text-center text-blue-400'>
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className='space-y-5'>
          {/* Email Field */}
          <div className='relative'>
            <label className='block text-sm mb-1'>Email Address</label>
            <div className='relative'>
              <span className='absolute left-3 top-3.5 text-blue-300'>
                <FaEnvelope />
              </span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='admin@example.com'
                className='w-full pl-10 pr-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            {errors.email && (
              <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className='relative'>
            <label className='block text-sm mb-1'>Password</label>
            <div className='relative'>
              <span className='absolute left-3 top-3.5 text-blue-300'>
                <FaLock />
              </span>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full pl-10 pr-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            {errors.password && (
              <p className='text-red-400 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 transition font-semibold py-2 rounded text-white'
          >
            Log In
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-slate-400'>
          Not an admin?{" "}
          <Link to='/login' className='underline text-blue-400'>
            User Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
