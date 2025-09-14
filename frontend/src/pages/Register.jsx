import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { Mail, Lock, User } from "lucide-react";
import logo from "../assets/logo.jpg"; // same logo as login

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="CRMPro" className="h-12 w-12 rounded-lg mb-2" />
          <h1 className="text-xl font-semibold text-gray-900">CRMPro</h1>
          <p className="mt-1 text-gray-500 text-sm">Create your account</p>
          <p className="text-gray-400 text-xs">Sign up to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          {/* Sign Up button */}
          <button
            type="submit"
            className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-lg font-medium transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Terms */}
        <p className="text-xs text-center text-gray-400 mt-4">
          By signing up, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
