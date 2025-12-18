import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const ADMIN_USERNAME = 'sanjayn29';
const ADMIN_PASSWORD = 'N.Sanjay@2005';

const AdminProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });
  const [showPrompt, setShowPrompt] = useState(!auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setAuth(true);
      setShowPrompt(false);
    } else {
      setError('Invalid credentials');
    }
  };

  if (!auth && showPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">Login</button>
        </form>
      </div>
    );
  }

  if (!auth) return <Navigate to="/login" replace />;
  return children;
};

export default AdminProtectedRoute;
