    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { isAuthenticated, getUserData, logout as authLogout } from './utils/auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true)
      const userData = getUserData()
      setCurrentUser(userData)
    }
  }, [])

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    authLogout() // Clear localStorage
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
