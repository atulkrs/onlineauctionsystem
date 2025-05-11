import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhoneAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Enter a valid email";
    if (!phone) newErrors.phone = "Enter a valid 10-digit phone number";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password, phone,
      });

      if (response.data) {
        alert("Registration successful! OTP sent to your email.");
        navigate("/verify-email", { state: { email } });
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-800 via-purple-900 to-gray-900 p-6 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10rem] left-[-10rem] w-96 h-96 bg-teal-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
      <div className="absolute top-20 right-[-5rem] w-80 h-80 bg-purple-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-5rem] left-20 w-96 h-96 bg-blue-600 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-10 w-full max-w-lg text-white animate-fade-in">
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center text-3xl shadow-md">✨</div>
          <h1 className="text-4xl font-bold text-teal-400 mt-4">Create Account</h1>
          <p className="text-white/70 text-sm mt-2">Join us and start your journey</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6 animate-slide-up">
          {/* Name */}
          <div className="relative">
            <label className="block text-sm mb-1 text-teal-300">Full Name</label>
            <span className="absolute left-4 top-10 text-teal-300"><FaUser /></span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm mb-1 text-teal-300">Email Address</label>
            <span className="absolute left-4 top-10 text-teal-300"><FaEnvelope /></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm mb-1 text-teal-300">Phone Number</label>
            <span className="absolute left-4 top-10 text-teal-300"><FaPhoneAlt /></span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="1234567890"
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm mb-1 text-teal-300">Password</label>
            <span className="absolute left-4 top-10 text-teal-300"><FaLock /></span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-teal-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white font-semibold py-2 rounded-xl hover:scale-105 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link to="/" className="underline hover:text-teal-300">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
