import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import './Auth.css';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const isRegister = searchParams.get('mode') === 'register';
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication - check specific admin credentials
    let role = 'user';
    if (formData.email === 'admin@example.com' && formData.password === '123456') {
      role = 'admin';
    }
    
    login({ id: 1, name: formData.name || (role === 'admin' ? 'Admin' : 'User'), email: formData.email, role }, 'fake-token-123');
    
    // Redirect based on role
    navigate(role === 'admin' ? '/adminuser/dashboard' : '/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="auth-subtitle">
          {isRegister ? 'Sign up to get started with PrintHub.' : 'Enter your details to access your account.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          
          <Button type="submit" className="auth-submit-btn">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-switch">
          {isRegister ? (
            <p>Already have an account? <span onClick={() => navigate('/auth')} className="switch-link">Sign In</span></p>
          ) : (
            <p>Don't have an account? <span onClick={() => navigate('/auth?mode=register')} className="switch-link">Sign Up</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
