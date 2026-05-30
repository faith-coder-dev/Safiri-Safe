import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/Dashboard.css'; // Importing the CSS file

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get('/api/auth/profile')
            .then(res => setUser(res.data))
            .catch(err => console.error("Could not fetch profile", err));
    }, []);

    const handleStartTrip = async () => {
        try {
            const response = await api.post('/api/trips/initialize', {
                start_point: "Current Location",
                destination: "Destination Name"
            });
            alert(`Trip Started! Token: ${response.data.tracking_token}`);
        } catch (err) {
            alert("Failed to start trip");
        }
    };

    return (
        <div className="dashboard-container">
            <h1>SafiriSafe Dashboard</h1>
            {user ? (
                <div className="profile-card">
                    <p>Welcome, {user.email}</p>
                    <p>Account Tier: {user.account_tier}</p>
                    <button className="start-btn" onClick={handleStartTrip}>
                        Start New Trip
                    </button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Dashboard;