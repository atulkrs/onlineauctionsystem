import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        alert("Logged in successfully!");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-purple-900 to-gray-900 p-6 overflow-hidden'>
      {/* Animated Blobs */}
      <div className='absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-teal-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob'></div>
      <div className='absolute top-20 right-[-5rem] w-80 h-80 bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000'></div>
      <div className='absolute bottom-[-5rem] left-20 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000'></div>

      {/* Form Container */}
      <div className='relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10 w-full max-w-lg text-white animate-fade-in'>
        <div className='text-center mb-8 animate-slide-up'>
          <div className='w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl shadow-md'>
            ✨
          </div>
          <h1 className='text-4xl font-bold text-teal-400 mt-4'>
            Welcome Back
          </h1>
          <p className='text-white/70 text-sm mt-2'>
            Access your account securely
          </p>
        </div>

        <form onSubmit={handleLogin} className='space-y-6 animate-slide-up'>
          {/* Email */}
          <div className='relative'>
            <label className='block text-sm mb-1 text-teal-300'>
              Email Address
            </label>
            <span className='absolute left-4 top-10 text-teal-300'>
              <FaEnvelope />
            </span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@mail.com'
              className='w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <p className='text-red-400 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className='relative'>
            <label className='block text-sm mb-1 text-teal-300'>Password</label>
            <span className='absolute left-4 top-10 text-teal-300'>
              <FaLock />
            </span>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-600'
            />
            {errors.password && (
              <p className='text-red-400 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white font-semibold py-2 rounded-xl shadow-lg hover:scale-105 transition'
          >
            Log In
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-white/70'>
          Don’t have an account?{" "}
          <Link to='/signup' className='underline hover:text-teal-300'>
            Sign up
          </Link>
        </p>
        <p className='mt-4 text-center text-sm text-white/70'>
          Are you an admin?{" "}
          <button
            onClick={() => navigate("/admin-login")}
            className='underline text-teal-300 hover:text-white'
          >
            Login as Admin
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
