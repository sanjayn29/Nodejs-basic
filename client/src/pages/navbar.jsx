

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('isAdmin');
		navigate('/login');
	};
	return (
		<nav className="backdrop-blur-lg bg-white/70 shadow-lg py-4 px-8 flex justify-between items-center mb-8 border-b border-blue-100/60 sticky top-0 z-30">
			<div className="flex items-center gap-3 select-none">
				<span className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md">T</span>
				<span className="text-2xl font-extrabold text-gray-800 tracking-tight">TooDoo</span>
			</div>
			<div className="flex gap-6 items-center">
				<NavLink to="/home" className={({ isActive }) => isActive ? "text-blue-600 font-bold underline underline-offset-8" : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"}>Home</NavLink>
				<NavLink to="/show" className={({ isActive }) => isActive ? "text-blue-600 font-bold underline underline-offset-8" : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"}>Show</NavLink>
				<NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-bold underline underline-offset-8" : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"}>About</NavLink>
				<NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-bold underline underline-offset-8" : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"}>Contact</NavLink>
				<NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-bold underline underline-offset-8" : "text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"}>Admin Dashboard</NavLink>
				<button
					onClick={handleLogout}
					className="ml-4 bg-gradient-to-tr from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg shadow transition-all duration-200 text-sm font-semibold"
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
