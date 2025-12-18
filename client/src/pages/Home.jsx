import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const fetchTodos = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        try {
            const res = await axios.get('http://localhost:3000/todos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(res.data);
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) navigate('/login');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:3000/todos', {
                task, status, priority, dueDate, notes
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTask('');
            setNotes('');
            setDueDate('');
            setStatus('Pending');
            setPriority('Medium');
            fetchTodos();
        } catch (err) {
            alert('Error adding task');
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await axios.delete(`http://localhost:3000/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTodos();
        } catch (err) {
            console.error(err);
            alert('Error deleting task');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <nav className="flex justify-between items-center mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Task Manager</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Admin Dashboard
                    </button>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Task Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add New Task
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                                    <input
                                        type="text"
                                        placeholder="What needs to be done?"
                                        value={task}
                                        onChange={e => setTask(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={status}
                                            onChange={e => setStatus(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Done</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                        <select
                                            value={priority}
                                            onChange={e => setPriority(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
                                        >
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea
                                        placeholder="Additional details..."
                                        value={notes}
                                        onChange={e => setNotes(e.target.value)}
                                        rows="3"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Add Task
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-800">My Tasks</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{todos.length} Tasks</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Task</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {todos.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                                                    No tasks found. Add one to get started!
                                                </td>
                                            </tr>
                                        ) : (
                                            todos.map(todo => (
                                                <tr key={todo._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{todo.task}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                                            ${todo.status === 'Done' ? 'bg-green-100 text-green-800' :
                                                                todo.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'}`}>
                                                            {todo.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-sm font-medium
                                                            ${todo.priority === 'High' ? 'text-red-600' :
                                                                todo.priority === 'Medium' ? 'text-yellow-600' :
                                                                    'text-green-600'}`}>
                                                            {todo.priority}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                        {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{todo.notes || '-'}</td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => handleDelete(todo._id)}
                                                            className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                                            title="Delete Task"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;