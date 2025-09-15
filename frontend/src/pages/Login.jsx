// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { Mail, Lock } from "lucide-react";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/customers");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="CRMPro" className="h-12 w-12 rounded-lg mb-2" />
          {/* Removed the CRMPro <h1> tag here */}
          <p className="mt-1 text-gray-800 text-lg font-medium">WELCOME BACK</p>
          <p className="text-gray-400 text-xs">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
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
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
            />
          </div>

          {/* Remember + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <button type="button" className="text-indigo-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-3 rounded-lg font-medium transition"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social login */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <span className="text-gray-700 font-medium">G</span> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <span className="text-blue-600 font-medium">f</span> Facebook
            </button>
          </div>
        </form>

        {/* Sign up */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign up for free
          </Link>
        </p>

        {/* Terms */}
        <p className="text-xs text-center text-gray-400 mt-4">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}