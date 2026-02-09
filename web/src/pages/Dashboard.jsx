    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { authAPI } from '../services/api';
    import { logout } from '../utils/auth';
    import './Dashboard.css';

    const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
        } catch (error) {
        console.error('Failed to fetch user data:', error);
        handleLogout();
        } finally {
        setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
        <aside className="sidebar">
            <div className="sidebar-header">
            <div className="logo">
                <span className="logo-text">MA</span>
            </div>
            <div>
                <h3 className="sidebar-title">Mini - App</h3>
                <p className="sidebar-subtitle">User Portal</p>
            </div>
            </div>

            <nav className="sidebar-nav">
            <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Dashboard
            </button>
            <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                View Profile
            </button>
            </nav>

            <button className="logout-btn" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
            </button>
        </aside>

        <main className="main-content">
            {activeTab === 'dashboard' && (
            <div className="content-section">
                <div className="section-header">
                <span className="section-label">OVERVIEW</span>
                <h1 className="section-title">Dashboard</h1>
                <p className="section-subtitle">Welcome back, {user?.username}.</p>
                </div>

                <div className="account-status">
                <h2 className="status-title">Account Status</h2>
                <div className="status-grid">
                    <div className="status-item">
                    <span className="status-label">Email</span>
                    <span className="status-value">{user?.email}</span>
                    </div>
                    <div className="status-item">
                    <span className="status-label">Username</span>
                    <span className="status-value">{user?.username}</span>
                    </div>
                    <div className="status-item">
                    <span className="status-label">Member Since</span>
                    <span className="status-value">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            )}

            {activeTab === 'profile' && (
            <div className="content-section">
                <div className="section-header">
                <span className="section-label">USER PROFILE</span>
                <h1 className="section-title">Profile Information</h1>
                </div>

                <div className="profile-card">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                    {user?.username?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="profile-info">
                    <h3 className="profile-name">{user?.username}</h3>
                    <p className="profile-email">{user?.email}</p>
                </div>
                <div className="profile-details">
                    <div className="detail-item">
                    <span className="detail-label">User ID</span>
                    <span className="detail-value">{user?.id}</span>
                    </div>
                    <div className="detail-item">
                    <span className="detail-label">Username</span>
                    <span className="detail-value">{user?.username}</span>
                    </div>
                    <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user?.email}</span>
                    </div>
                    <div className="detail-item">
                    <span className="detail-label">Account Created</span>
                    <span className="detail-value">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            )}
        </main>
        </div>
    );
    };

    export default Dashboard;
