import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const dashboardRes = await axios.get('http://localhost:3000/dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage(dashboardRes.data.message);

                const usersRes = await axios.get('http://localhost:3000/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(usersRes.data);
            } catch (err) {
                console.error("Error details:", err.response || err);
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Admin Dashboard</h1>
                <div>
                    <button onClick={() => navigate('/home')} style={{ marginRight: '10px', padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>My Tasks</button>
                    <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
                </div>
            </nav>
            <h3>{message}</h3>

            <h2 style={{ marginTop: '20px' }}>User List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ background: '#5983d7ff' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id || user._id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.id || user._id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard; 