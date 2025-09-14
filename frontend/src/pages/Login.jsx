import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { motion } from 'framer-motion';
import "../styles/Auth.css"; // 👈 new CSS file (shared for login/register)

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="auth-title">Welcome Back</h2>

        <form onSubmit={submit} className="auth-form">
          <motion.input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="auth-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="auth-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate('/register')}
            className="auth-link"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}
