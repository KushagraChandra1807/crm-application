import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import Customers from "./Customers";
import "../styles/App.css";

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* 🔹 Header */}
      <header className="app-header">
        <h1 className="app-logo">Mini CRM</h1>
        <nav className="app-nav">
          {user ? (
            <>
              <span className="app-welcome">👋 {user.name}</span>
              <button onClick={logout} className="app-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="app-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="app-btn register-btn">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* 🔹 Main Content */}
      <main className="app-main">
        {user ? (
          <Customers />
        ) : (
          <div className="landing-page">
            <h2 className="landing-title">
              Welcome to <span className="highlight">Mini CRM</span>
            </h2>
            <p className="landing-subtitle">
              Manage your customers, track interactions, and grow your business
              with ease 🚀
            </p>

            {/* Feature Boxes */}
            <div className="feature-grid">
              <div className="feature-box">
                <h3>📋 Customer Management</h3>
                <p>Organize all your customer data in one place.</p>
              </div>
              <div className="feature-box">
                <h3>📈 Analytics</h3>
                <p>Track customer growth and engagement over time.</p>
              </div>
              <div className="feature-box">
                <h3>🤝 Collaboration</h3>
                <p>Share customer insights with your team instantly.</p>
              </div>
              <div className="feature-box">
                <h3>🔒 Secure & Reliable</h3>
                <p>Your data is encrypted and safe with us.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
