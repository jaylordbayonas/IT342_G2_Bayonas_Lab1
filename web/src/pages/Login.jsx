    import { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { authAPI } from '../services/api';
    import { setToken, setUser } from '../utils/auth';
    import './Auth.css';

    const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        // Validate confirm password for registration
        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        try {
        if (isLogin) {
            const response = await authAPI.login({
            username: formData.username,
            password: formData.password,
            });
            
            setToken(response.data.token);
            setUser({
            username: response.data.username,
            email: response.data.email,
            });
            navigate('/dashboard');
        } else {
            await authAPI.register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            });
            
            // Auto-login after registration
            const loginResponse = await authAPI.login({
            username: formData.username,
            password: formData.password,
            });
            
            setToken(loginResponse.data.token);
            setUser({
            username: loginResponse.data.username,
            email: loginResponse.data.email,
            });
            navigate('/dashboard');
        }
        } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-container">
        <div className="auth-left">
            <div className="auth-branding">
            <div className="logo">
                <span className="logo-text">MA</span>
            </div>
            <h1 className="brand-name">Mini - App</h1>
            </div>
            <div className="auth-content">
            <h2 className="auth-title animate-slide-up">{isLogin ? 'Welcome Back!' : 'Join Us Today!'}</h2>
            <p className="auth-subtitle animate-slide-up-delay">
              {isLogin 
                ? 'Sign in to access your account and continue your journey.' 
                : 'Create your account and start your amazing journey with us.'}
            </p>
            </div>
            <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>
        </div>

        <div className="auth-right">
            <div className="auth-form-container">
            <div className="auth-tabs">
                <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
                >
                Login
                </button>
                <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
                >
                Register
                </button>
            </div>

            <div className="auth-form-content">
                <h3 className="form-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
                <p className="form-subtitle">
                  {isLogin ? "Let's get started with your account." : "Fill in your details to get started."}
                </p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    </div>
                )}

                <div className="form-group">
                    <label>{isLogin ? 'Username' : 'Email'}</label>
                    <input
                    type={isLogin ? 'text' : 'email'}
                    name={isLogin ? 'username' : 'email'}
                    placeholder={isLogin ? 'name@company.com' : 'name@company.com'}
                    value={isLogin ? formData.username : formData.email}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Login;
