
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-8">
			<div className="text-2xl font-bold text-gray-800">TooDoo</div>
			<div className="flex gap-6">
				<NavLink to="/home" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Home</NavLink>
				<NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>About</NavLink>
				<NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Contact</NavLink>
				<NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"}>Admin Dashboard</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
