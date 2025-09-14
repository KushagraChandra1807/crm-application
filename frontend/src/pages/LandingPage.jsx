// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import landingPageImage from "../assets/landingpage.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-12 py-6 shadow-sm bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-blue-900"></div>
          <h1 className="text-xl font-bold text-gray-900">CRMPro</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="#">Features</Link>
          <Link to="#">Pricing</Link>
          <Link to="#">Testimonials</Link>
          <Link to="#">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-700 hover:text-gray-900">
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-12 py-20">
        <div className="max-w-lg space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Transform Your Business with Smart CRM
          </h2>
          <p className="text-gray-600 text-lg">
            Streamline your customer relationships, boost sales, and grow
            your business with our all-in-one CRM solution. Trusted by over
            10,000 companies worldwide.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition">
              Start Free Trial
            </button>
            <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Watch Demo
            </button>
          </div>

          <div className="flex gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              14-day free trial
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              No credit card required
            </span>
          </div>
        </div>

        <div className="mt-12 md:mt-0 md:ml-12">
          <img
            src={landingPageImage}
            alt="CRM dashboard preview"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
