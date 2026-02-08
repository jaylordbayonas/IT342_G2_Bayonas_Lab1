        import { useNavigate } from 'react-router-dom'
        import { useState } from 'react'

        const Dashboard = ({ user, onLogout }) => {
        const navigate = useNavigate()
        const [activeView, setActiveView] = useState('dashboard')

        const handleLogout = () => {
            onLogout()
            navigate('/login')
        }

        // Default user data if none provided
        const displayUser = user || {
            userId: 1,
            username: 'johndoe',
            email: 'john@example.com',
            role: 'USER',
            createdAt: new Date().toISOString(),
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        })
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        })
    }

    return (
        <div className="dashboard-layout">
        {/* Sidebar Navigation */}
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
            <h2>MiniApp</h2>
            </div>
            
            <nav className="sidebar-nav">
            <button 
                className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveView('dashboard')}
            >
                <span className="nav-text">Dashboard</span>
            </button>
            
            <button 
                className={`nav-item ${activeView === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveView('profile')}
            >
                <span className="nav-text">Profile</span>
            </button>
            </nav>
            
            <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
                <span className="nav-text">Logout</span>
            </button>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
        {activeView === 'dashboard' && (
            <div className="dashboard-content">
            {/* Header Section */}
            <div className="dashboard-header">
                <h1>Welcome back, {displayUser.username}!</h1>
            </div>
            </div>
        )}

        {activeView === 'profile' && (
            <div className="profile-content">
            {/* Profile Header */}
            <div className="dashboard-header">
                <h1>Profile Settings</h1>
                <p className="dashboard-subtitle">Manage your account information</p>
            </div>

            {/* Profile Information */}
            <div className="profile-card">
            <h2>Profile Information</h2>
            
            <div className="profile-grid">
            <div className="profile-info">
                <label>User ID</label>
                <div className="value">{displayUser.userId}</div>
            </div>

            <div className="profile-info">
                <label>Username</label>
                <div className="value">{displayUser.username}</div>
            </div>

            <div className="profile-info">
                <label>Email Address</label>
                <div className="value">{displayUser.email}</div>
            </div>

            <div className="profile-info">
                <label>Account Role</label>
                <div className="value">{displayUser.role}</div>
            </div>

            <div className="profile-info">
                <label>Account Created</label>
                <div className="value">{formatDateTime(displayUser.createdAt)}</div>
            </div>

            <div className="profile-info">
                <label>Last Updated</label>
                <div className="value">{formatDateTime(displayUser.createdAt)}</div>
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
