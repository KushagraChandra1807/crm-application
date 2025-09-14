import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Customers from "./Customers";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
