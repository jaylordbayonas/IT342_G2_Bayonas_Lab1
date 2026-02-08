    import { useState } from 'react'
    import { useNavigate, Link } from 'react-router-dom'

    const Register = ({ onRegister }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
        // Clear error for this field when user starts typing
        if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: '' })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.username.trim()) {
        newErrors.username = 'Username is required'
        } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters'
        }

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
        newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')

        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
        }

        // Simulate successful registration (no backend yet)
        const userData = {
        userId: 1,
        username: formData.username,
        email: formData.email,
        role: 'USER',
        createdAt: new Date().toISOString(),
        }

        setMessage('Registration successful! Redirecting to dashboard...')
        
        // Wait a bit to show success message, then redirect
        setTimeout(() => {
        onRegister(userData)
        navigate('/dashboard')
        }, 1000)
    }

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h2>Create Account</h2>
            
            {message && <div className="success-message">{message}</div>}
            
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'input-error' : ''}
                placeholder="Enter your username"
                />
                {errors.username && <div className="error-text">{errors.username}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                placeholder="Enter your email"
                />
                {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
                placeholder="Enter your password"
                />
                {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
                Register
            </button>
            </form>

            <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
        </div>
    )
    }

    export default Register
