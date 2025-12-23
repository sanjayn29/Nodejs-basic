import React, { useState, useEffect } from 'react';

const Show = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllTodos = async () => {
            try {
                // Fetch all todos with user details (assumes new backend endpoint /all-todos)
                const response = await fetch('http://localhost:3000/all-todos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTodos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllTodos();
    }, []);

    if (loading) {
        return <div className="text-center py-5">Loading todos feed...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-5">Error: {error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Todos Feed</h2>
            {todos.length === 0 ? (
                <p className="text-gray-500 text-center">No todos found. Be the first to create one!</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {todos.map((todo) => (
                        <div key={todo._id} className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex flex-col">
                                    <h4 className="font-semibold text-gray-900">@{todo.user?.username || 'Unknown User'}</h4>
                                    <span className="text-sm text-gray-500">{todo.user?.name || 'Anonymous'}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                    {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'Recent'}
                                </span>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{todo.task}</h3>
                                <div className="flex gap-2 flex-wrap mb-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${todo.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        todo.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {todo.status}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${todo.priority === 'Low' ? 'bg-pink-100 text-pink-800' :
                                        todo.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {todo.priority}
                                    </span>
                                    {todo.dueDate && (
                                        <span className="text-sm text-gray-600">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                    )}
                                </div>
                                {todo.notes && <p className="text-gray-600 italic text-sm">{todo.notes}</p>}
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="bg-none border-none text-lg cursor-pointer hover:text-red-500">❤️</button>
                                <span className="text-sm text-gray-500">0 likes</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Show;