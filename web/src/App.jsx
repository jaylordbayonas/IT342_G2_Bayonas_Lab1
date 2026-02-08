    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
    import { useState } from 'react'
    import Register from './pages/Register'
    import Login from './pages/Login'
    import Dashboard from './pages/Dashboard'

    function App() {
    // Simple state to track if user is logged in (just for UI demo)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const handleLogin = (userData) => {
        setIsLoggedIn(true)
        setCurrentUser(userData)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setCurrentUser(null)
    }

    return (
        <Router>
        <Routes>
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
            path="/dashboard" 
            element={
                isLoggedIn ? (
                <Dashboard user={currentUser} onLogout={handleLogout} />
                ) : (
                <Navigate to="/login" />
                )
            } 
            />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        </Router>
    )
    }

    export default App
