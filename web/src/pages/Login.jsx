    import { useState } from 'react'
    import { useNavigate, Link } from 'react-router-dom'

    const Login = ({ onLogin }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
        }

        if (!formData.password) {
        newErrors.password = 'Password is required'
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

        // Simulate successful login (no backend yet)
        const userData = {
        userId: 1,
        username: 'johndoe',
        email: formData.email,
        role: 'USER',
        createdAt: new Date().toISOString(),
        }

        setMessage('Login successful! Redirecting to dashboard...')
        
        // Wait a bit to show success message, then redirect
        setTimeout(() => {
        onLogin(userData)
        navigate('/dashboard')
        }, 1000)
    }

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h2>Welcome Back</h2>
            
            {message && <div className="success-message">{message}</div>}
            
            <form onSubmit={handleSubmit}>
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
                Login
            </button>
            </form>

            <div className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
        </div>
    )
    }

    export default Login
