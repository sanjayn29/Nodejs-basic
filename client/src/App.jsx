
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Contact from './pages/contact';
import About from './pages/About';
import Navbar from './pages/navbar';
import Show from './pages/show';
import AdminProtectedRoute from './pages/AdminProtectedRoute';
import './App.css';

// Simple Admin page placeholder
const Admin = () => <div className="p-8 text-2xl">Admin Page (placeholder)</div>;


function AppLayout() {
  const location = useLocation();
  // Hide navbar on login and signup
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <AdminProtectedRoute>
            <Dashboard />
          </AdminProtectedRoute>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/show" element={<Show />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
