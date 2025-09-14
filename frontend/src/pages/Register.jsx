import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { motion } from 'framer-motion';
import "../styles/Register.css";


 // 👈 import CSS

export default function Register() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => { 
    e.preventDefault(); 
    try {
      await API.post('/auth/register', { name, email, password });
      alert('Registered. Please login.');
      navigate('/login');
    } catch (err) { 
      alert(err.response?.data?.message || 'Register failed'); 
    } 
  };

  return (
    <div className="register-page">
      <motion.div 
        className="register-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="register-title">Create Account</h2>
        
        <form onSubmit={submit} className="register-form">
          <motion.input
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Name"
            className="register-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email"
            className="register-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password"
            className="register-input"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="register-button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Register
          </motion.button>
        </form>

        <p className="register-footer">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')}
            className="register-link"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
