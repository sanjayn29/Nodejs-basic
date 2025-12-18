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
            // Reset form
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
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>My Tasks</h2>
                <button onClick={() => navigate('/dashboard')} style={{ padding: '8px', cursor: 'pointer' }}>Admin Dashboard</button>
            </div>

            <form onSubmit={handleSubmit} style={{
                marginBottom: '30px',
                background: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                display: 'grid',
                gap: '15px',
                maxWidth: '500px'
            }}>
                <input style={{ padding: '8px' }} type="text" placeholder="Task Name" value={task} onChange={e => setTask(e.target.value)} required />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <select style={{ padding: '8px', flex: 1 }} value={status} onChange={e => setStatus(e.target.value)}>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>
                    <select style={{ padding: '8px', flex: 1 }} value={priority} onChange={e => setPriority(e.target.value)}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                <input style={{ padding: '8px' }} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                <textarea style={{ padding: '8px' }} placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />

                <button style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }} type="submit">Add Task</button>
            </form>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Task</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Priority</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Due Date</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Notes</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{todo.task}</td>
                            <td style={{ padding: '10px' }}>{todo.status}</td>
                            <td style={{ padding: '10px' }}>{todo.priority}</td>
                            <td style={{ padding: '10px' }}>{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '-'}</td>
                            <td style={{ padding: '10px' }}>{todo.notes}</td>
                            <td style={{ padding: '10px' }}>
                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    style={{
                                        padding: '5px 10px',
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;