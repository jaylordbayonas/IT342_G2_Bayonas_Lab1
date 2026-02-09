    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { authAPI } from '../services/api';
    import './Auth.css';

    const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
        await authAPI.register(formData);
        navigate('/login');
        } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-card">
            <h2>Register</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            </form>
            <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
        </div>
    );
    };

    export default Register;
