import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminLogin.css';

/* ── Icons ─────────────────────────────────────────────────── */
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
        <line x1="1" x2="23" y1="1" y2="23" />
      </>
    )}
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

/* ── Component ─────────────────────────────────────────────── */
const AdminLogin = () => {
  const { admin, adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  /* If already logged in, redirect to dashboard */
  useEffect(() => {
    if (admin) {
      navigate('/adminuser/dashboard', { replace: true });
    }
  }, [admin, navigate]);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    // Simulate a brief network delay for UX polish
    await new Promise((r) => setTimeout(r, 600));
    const result = adminLogin({ email: email.trim(), password });
    setLoading(false);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    setSuccessMsg('Login successful! Redirecting to dashboard…');
    setTimeout(() => {
      const from = location.state?.from?.pathname || '/adminuser/dashboard';
      navigate(from, { replace: true });
    }, 1200);
  };

  return (
    <div className="al-page">
      {/* Background grid decoration */}
      <div className="al-bg-grid" aria-hidden="true" />

      <div className="al-card">
        {/* Brand header */}
        <div className="al-header">
          <img src="/Printhub_logo.png" alt="PrintHub" className="al-logo" />
          <div className="al-shield-wrap" aria-hidden="true">
            <ShieldIcon />
          </div>
          <h1 className="al-title">Admin Portal</h1>
          <p className="al-subtitle">Sign in to access the PrintHub control panel</p>
        </div>

        {/* Success banner */}
        {successMsg && (
          <div className="al-success" role="status" aria-live="polite">
            <CheckCircleIcon />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form error */}
        {errors.form && (
          <div className="al-form-error" role="alert">
            {errors.form}
          </div>
        )}

        <form className="al-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className={`al-field${errors.email ? ' al-field--error' : ''}`}>
            <label htmlFor="al-email" className="al-label">Email Address</label>
            <div className="al-input-wrap">
              <span className="al-input-icon"><MailIcon /></span>
              <input
                id="al-email"
                type="email"
                className="al-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                autoFocus
                disabled={loading || !!successMsg}
              />
            </div>
            {errors.email && <span className="al-error" role="alert">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`al-field${errors.password ? ' al-field--error' : ''}`}>
            <label htmlFor="al-password" className="al-label">Password</label>
            <div className="al-input-wrap">
              <span className="al-input-icon"><LockIcon /></span>
              <input
                id="al-password"
                type={showPassword ? 'text' : 'password'}
                className="al-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading || !!successMsg}
              />
              <button
                type="button"
                className="al-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && <span className="al-error" role="alert">{errors.password}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="al-submit"
            disabled={loading || !!successMsg}
          >
            {loading ? (
              <><span className="al-spinner" aria-hidden="true" />Signing in…</>
            ) : (
              <><LockIcon /><span>Sign In to Dashboard</span></>
            )}
          </button>
        </form>

        <p className="al-back-link">
          <a href="/">← Back to PrintHub</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
