
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp
      });

      if (res.data.success) {
        alert("Email verified successfully!");
        navigate("/home");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-400 mb-4">Verify Your Email</h2>
        <p className="text-sm text-center text-gray-300 mb-6">
          Enter the 6-digit OTP sent to <span className="text-white font-semibold">{email}</span>
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-teal-500 focus:outline-none mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button
          onClick={handleVerifyOtp}
          className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:scale-105 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
