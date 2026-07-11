import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

/* ─────────────────────────────────────────────────────────────────────────
   Icons (inline, currentColor, line-style to match the rest of printHub)
   ───────────────────────────────────────────────────────────────────────── */
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" x2="5" y1="12" y2="12" /><polyline points="12 19 5 12 12 5" />
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

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="14" height="20" x="5" y="2" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.93l3.66-2.83z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const StudentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="22" x2="9" y2="18" />
    <line x1="15" y1="22" x2="15" y2="18" />
    <line x1="8" y1="6" x2="10" y2="6" />
    <line x1="14" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const USER_TYPES = [
  { id: 'regular',   label: 'Regular',   sub: 'Personal printing',   Icon: UserIcon },
  { id: 'student',   label: 'Student',   sub: 'Discounted rates',    Icon: StudentIcon },
  { id: 'institute', label: 'Institute', sub: 'Bulk & billing',      Icon: BuildingIcon },
];

const BENEFITS = [
  'Upload, configure and pay in one flow',
  'Real-time price ticker — no surprises',
  'Live order tracking from queue to delivery',
];

/* ─────────────────────────────────────────────────────────────────────────
   Tiny input + field helpers
   ───────────────────────────────────────────────────────────────────────── */
const Field = ({ id, label, hint, error, children }) => (
  <div className={`auth-field${error ? ' auth-field--error' : ''}`}>
    <label htmlFor={id} className="auth-label">{label}</label>
    {children}
    {hint && !error && <span className="auth-hint">{hint}</span>}
    {error && <span className="auth-error" role="alert">{error}</span>}
  </div>
);

const PasswordInput = ({ id, value, onChange, placeholder, autoComplete }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-input-wrap">
      <span className="auth-input-icon"><LockIcon /></span>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        className="auth-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="auth-eye"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────────────────── */
const AuthModal = ({ open, onClose, defaultMode = 'signin' }) => {
  const { signup, login, loginWithGoogle, setMobile, resetPassword } = useAuth();

  /* Mode: 'signin' | 'signup' | 'forgot' | 'otp' | 'reset' | 'reset-done' */
  const [mode, setMode] = useState(defaultMode);

  /* Shared state */
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [userType, setUserType] = useState('regular');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  /* OTP / reset */
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef([]);

  /* Scrollable form region — used to reset scroll on mode change. */
  const formScrollRef = useRef(null);

  /* Post-signup add-mobile overlay */
  const [showAddMobile, setShowAddMobile] = useState(false);
  const [mobileValue, setMobileValue] = useState('');
  const [mobileError, setMobileError] = useState('');

  /* Reset on open/close */
  useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setIdentifier(''); setUsername(''); setPassword(''); setConfirm('');
      setUserType('regular'); setRemember(true); setTypeDropdownOpen(false);
      setErrors({}); setSubmitting(false);
      setGeneratedOtp(''); setOtpDigits(['', '', '', '', '', '']);
      setShowAddMobile(false); setMobileValue(''); setMobileError('');
    }
  }, [open, defaultMode]);

  /* Reset the form scroll position on mode change so the new view is
     never partly hidden below the fold. Defer to the next frame so the
     new content has been laid out before we read its scrollHeight. */
  useEffect(() => {
    if (!open) return;
    const el = formScrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
    return () => cancelAnimationFrame(id);
  }, [mode, open, showAddMobile]);

  /* Lock body scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  /* Esc to close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  /* ── validators ── */
  const validateIdentifier = (v) => {
    if (!v.trim()) return 'Mobile number is required.';
    if (/^\d+$/.test(v) && v.length !== 10) return 'Mobile number must be 10 digits.';
    return null;
  };
  const validateUsername = (v) => {
    if (!v.trim()) return 'Username is required.';
    if (v.length < 3) return 'Use at least 3 characters.';
    return null;
  };
  const validatePassword = (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 6) return 'Use at least 6 characters.';
    return null;
  };

  /* ── handlers ── */
  const handleSignin = async (e) => {
    e.preventDefault();
    const next = {};
    const idErr = validateIdentifier(identifier);
    const pwErr = validatePassword(password);
    if (idErr) next.identifier = idErr;
    if (pwErr) next.password = pwErr;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const res = login({ identifier: identifier.trim(), password });
    setSubmitting(false);

    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    onClose();
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const next = {};
    const idErr = validateIdentifier(identifier);
    const userErr = validateUsername(username);
    const pwErr = validatePassword(password);
    if (idErr) next.identifier = idErr;
    if (userErr) next.username = userErr;
    if (pwErr) next.password = pwErr;
    if (confirm !== password) next.confirm = 'Passwords do not match.';
    if (!userType) next.userType = 'Choose how you’ll use printHub.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const res = signup({ identifier: identifier.trim(), username: username.trim(), password, userType });
    setSubmitting(false);

    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    /* Auto-login */
    login({ identifier: identifier.trim(), password });
    onClose();
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    const idErr = validateIdentifier(identifier);
    if (idErr) { setErrors({ identifier: idErr }); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    // eslint-disable-next-line no-console
    console.info(`[printHub mock OTP] Use ${otp} to continue.`);
    setSubmitting(false);
    setMode('otp');
    setTimeout(() => otpRefs.current[0]?.focus(), 60);
  };

  const handleOtpChange = (idx, val) => {
    const v = val.replace(/\D/g, '').slice(0, 1);
    setOtpDigits((arr) => arr.map((d, i) => (i === idx ? v : d)));
    if (v && idx < 5) otpRefs.current[idx + 1]?.focus();
  };
  const handleOtpKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };
  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = ['', '', '', '', '', ''];
    text.split('').forEach((c, i) => (next[i] = c));
    setOtpDigits(next);
    otpRefs.current[Math.min(text.length, 5)]?.focus();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otpDigits.join('');
    if (code.length !== 6) { setErrors({ otp: 'Enter the 6-digit code.' }); return; }
    if (code !== generatedOtp) { setErrors({ otp: 'That code doesn’t match. Try again.' }); return; }
    setErrors({});
    setMode('reset');
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const next = {};
    const pwErr = validatePassword(password);
    if (pwErr) next.password = pwErr;
    if (confirm !== password) next.confirm = 'Passwords do not match.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    const res = resetPassword({ identifier: identifier.trim(), newPassword: password });
    setSubmitting(false);

    if (!res.ok) { setErrors({ form: res.error }); return; }
    setMode('reset-done');
  };

  const handleAddMobile = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobileValue)) {
      setMobileError('Enter a valid 10-digit mobile number.');
      return;
    }
    setMobileError('');
    setMobile(mobileValue);
    setShowAddMobile(false);
    onClose();
  };

  const handleGoogle = useCallback(async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));
    loginWithGoogle();
    setSubmitting(false);
    if (mode === 'signup') {
      setShowAddMobile(true);
    } else {
      onClose();
    }
  }, [loginWithGoogle, onClose, mode]);

  /* ─────────────────────────────────────────────────────────────────────
     Render
     ───────────────────────────────────────────────────────────────────── */
  if (!open) return null;

  const heading = {
    signin:      { eyebrow: 'Step 01 · Sign in',     title: 'Welcome back to printHub' },
    signup:      { eyebrow: 'Step 01 · Sign up',     title: 'Create your printHub ID' },
    forgot:      { eyebrow: 'Step 01 · Recover',     title: 'Reset your password' },
    otp:         { eyebrow: 'Step 02 · Verify',      title: 'Enter the 6-digit code' },
    reset:       { eyebrow: 'Step 03 · Set new',     title: 'Choose a new password' },
    'reset-done':{ eyebrow: 'All set',               title: 'Password updated' },
  }[mode];

  return (
    <div
      className="auth-overlay"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div className="auth-modal" data-mode={mode}>
        {/* ── Brand pane ── */}
        <aside className="auth-brand" aria-hidden="true">
          <div className="auth-brand-grid" />
          <div className="auth-brand-inner">
            <div className="auth-brand-head">
              <img src="/Printhub_logo.png" alt="printHub" className="auth-brand-logo" />

            </div>

            <div className="auth-brand-body">
              <span className="auth-eyebrow auth-eyebrow--ink">Your print desk</span>
              <h2 className="auth-brand-title">
                From upload<br />to your door,<br />
                <span className="auth-brand-accent">in one ticket.</span>
              </h2>
              <ul className="auth-brand-list">
                {BENEFITS.map((b) => (
                  <li key={b}>
                    <span className="auth-brand-check"><CheckIcon /></span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {mode === 'signup' && (
              <div className="auth-brand-foot">
                <span className="auth-eyebrow auth-eyebrow--ink">Choose your role</span>
                <div className="auth-stamp-row">
                  {USER_TYPES.map(({ id, label, Icon }) => (
                    <span
                      key={id}
                      className={`auth-stamp${userType === id ? ' auth-stamp--on' : ''}`}
                      aria-hidden="true"
                    >
                      <Icon />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vertical perforation — the signature element */}
          <div className="auth-perforation" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className="auth-perforation-dot" />
            ))}
          </div>
        </aside>

        {/* ── Form pane ── */}
        <section className="auth-form-pane">
          <header className="auth-form-head">
            <button
              className="auth-iconbtn"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <CloseIcon />
            </button>
            <div className="auth-form-eyebrow">{heading.eyebrow}</div>
            <h3 id="auth-title" className="auth-form-title">{heading.title}</h3>
          </header>

          <div className="auth-form-scroll" ref={formScrollRef}>
            {/* ── Tabs (signin / signup) ── */}
            {(mode === 'signin' || mode === 'signup') && (
              <>
                <div className="auth-tabs" role="tablist">
                  <button
                    role="tab"
                    aria-selected={mode === 'signin'}
                    className={`auth-tab${mode === 'signin' ? ' auth-tab--on' : ''}`}
                    onClick={() => { setMode('signin'); setErrors({}); }}
                    type="button"
                  >
                    Sign in
                  </button>
                  <button
                    role="tab"
                    aria-selected={mode === 'signup'}
                    className={`auth-tab${mode === 'signup' ? ' auth-tab--on' : ''}`}
                    onClick={() => { setMode('signup'); setErrors({}); }}
                    type="button"
                  >
                    Sign up
                  </button>
                  <span
                    className="auth-tab-rail"
                    style={{ transform: `translateX(${mode === 'signin' ? 0 : 100}%)` }}
                    aria-hidden="true"
                  />
                </div>

                <form
                  className="auth-form"
                  onSubmit={mode === 'signin' ? handleSignin : handleSignup}
                  noValidate
                >
                  {mode === 'signup' && (
                    <Field id="auth-username" label="Username" error={errors.username}>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">
                          <UserIcon />
                        </span>
                        <input
                          id="auth-username"
                          type="text"
                          className="auth-input"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g. aditi.r"
                          autoComplete="username"
                          autoCapitalize="none"
                          spellCheck={false}
                        />
                      </div>
                    </Field>
                  )}

                  {mode === 'signup' && (() => {
                    const selectedTypeObj = USER_TYPES.find((t) => t.id === userType) || USER_TYPES[0];
                    const SIcon = selectedTypeObj.Icon;
                    return (
                    <div className="auth-fieldset">
                      <span className="auth-eyebrow">I am a</span>
                      
                      <div className="auth-type-dropdown-wrap">
                        <button
                          type="button"
                          className={`auth-type-dropdown-head ${typeDropdownOpen ? 'open' : ''}`}
                          onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                        >
                          <span className="auth-type-icon"><SIcon /></span>
                          <span className="auth-type-text">
                            <span className="auth-type-label">{selectedTypeObj.label}</span>
                            <span className="auth-type-sub">{selectedTypeObj.sub}</span>
                          </span>
                          <span className="auth-type-chevron"><ChevronDownIcon /></span>
                        </button>

                        <div className={`auth-types ${typeDropdownOpen ? 'auth-types--open' : ''}`} role="radiogroup" aria-label="User type">
                          {USER_TYPES.map(({ id, label, sub, Icon }) => (
                            <button
                              type="button"
                              key={id}
                              role="radio"
                              aria-checked={userType === id}
                              className={`auth-type${userType === id ? ' auth-type--on' : ''}`}
                              onClick={() => {
                                setUserType(id);
                                setTypeDropdownOpen(false);
                              }}
                            >
                              <span className="auth-type-icon"><Icon /></span>
                              <span className="auth-type-text">
                                <span className="auth-type-label">{label}</span>
                                <span className="auth-type-sub">{sub}</span>
                              </span>
                              {userType === id && (
                                <span className="auth-type-tick" aria-hidden="true"><CheckIcon /></span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {errors.userType && <span className="auth-error" role="alert">{errors.userType}</span>}
                    </div>
                  );})()}

                  <Field id="auth-id" label="Mobile number" error={errors.identifier}>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        {/^\d+$/.test(identifier) ? <PhoneIcon /> : <UserIcon />}
                      </span>
                      <input
                        id="auth-id"
                        type="text"
                        className="auth-input"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="e.g. 9876543210"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                      />
                    </div>
                  </Field>

                  <Field id="auth-pw" label="Password" error={errors.password}>
                    <PasswordInput
                      id="auth-pw"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    />
                  </Field>

                  {mode === 'signup' && (
                    <Field id="auth-pw2" label="Confirm password" error={errors.confirm}>
                      <PasswordInput
                        id="auth-pw2"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                      />
                    </Field>
                  )}

                  {mode === 'signin' && (
                    <div className="auth-row">
                      <label className="auth-check">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        <span className="auth-check-box" aria-hidden="true">
                          {remember && <CheckIcon />}
                        </span>
                        <span>Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="auth-textlink"
                        onClick={() => { setErrors({}); setMode('forgot'); }}
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {errors.form && <div className="auth-form-error" role="alert">{errors.form}</div>}

                  <button
                    type="submit"
                    className="auth-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="auth-spinner" aria-hidden="true" />
                    ) : (
                      <>
                        <BoltIcon />
                        <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
                      </>
                    )}
                  </button>

                  <div className="auth-divider">
                    <span>or continue with</span>
                  </div>

                  <button
                    type="button"
                    className="auth-google"
                    onClick={handleGoogle}
                    disabled={submitting}
                  >
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </button>


                </form>
              </>
            )}

            {/* ── Forgot password ── */}
            {mode === 'forgot' && (
              <form className="auth-form" onSubmit={handleForgot} noValidate>
                <p className="auth-form-sub">
                  Enter the mobile number on your account. We’ll send a one-time code
                  to verify it’s really you.
                </p>
                <Field id="auth-recover" label="Mobile number" error={errors.identifier}>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      {/^\d+$/.test(identifier) ? <PhoneIcon /> : <UserIcon />}
                    </span>
                    <input
                      id="auth-recover"
                      type="text"
                      className="auth-input"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. 9876543210"
                      autoCapitalize="none"
                      spellCheck={false}
                    />
                  </div>
                </Field>
                {errors.form && <div className="auth-form-error" role="alert">{errors.form}</div>}
                <button type="submit" className="auth-submit" disabled={submitting}>
                  {submitting
                    ? <span className="auth-spinner" aria-hidden="true" />
                    : <><ShieldIcon /><span>Send reset code</span></>}
                </button>
                <button
                  type="button"
                  className="auth-textlink auth-textlink--back"
                  onClick={() => { setErrors({}); setMode('signin'); }}
                >
                  <ArrowLeftIcon /> Back to sign in
                </button>
              </form>
            )}

            {/* ── OTP ── */}
            {mode === 'otp' && (
              <form className="auth-form" onSubmit={handleOtpSubmit} noValidate>
                <p className="auth-form-sub">
                  A 6-digit code was generated for <strong>{identifier}</strong>. For this mock
                  build, check the browser console — the code is printed there.
                </p>
                <div className="auth-otp" onPaste={handleOtpPaste}>
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="auth-otp-cell"
                      value={d}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>
                {errors.otp && <div className="auth-form-error" role="alert">{errors.otp}</div>}
                <button type="submit" className="auth-submit" disabled={submitting}>
                  {submitting
                    ? <span className="auth-spinner" aria-hidden="true" />
                    : <span>Verify code</span>}
                </button>
                <button
                  type="button"
                  className="auth-textlink auth-textlink--back"
                  onClick={() => { setOtpDigits(['','','','','','']); setMode('forgot'); }}
                >
                  <ArrowLeftIcon /> Use a different number
                </button>
              </form>
            )}

            {/* ── Reset password ── */}
            {mode === 'reset' && (
              <form className="auth-form" onSubmit={handleReset} noValidate>
                <p className="auth-form-sub">
                  Pick a new password for <strong>{identifier}</strong>. Use at least 6 characters.
                </p>
                <Field id="auth-new-pw" label="New password" error={errors.password}>
                  <PasswordInput
                    id="auth-new-pw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                  />
                </Field>
                <Field id="auth-new-pw2" label="Confirm new password" error={errors.confirm}>
                  <PasswordInput
                    id="auth-new-pw2"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                </Field>
                {errors.form && <div className="auth-form-error" role="alert">{errors.form}</div>}
                <button type="submit" className="auth-submit" disabled={submitting}>
                  {submitting
                    ? <span className="auth-spinner" aria-hidden="true" />
                    : <span>Reset password</span>}
                </button>
              </form>
            )}

            {/* ── Reset done ── */}
            {mode === 'reset-done' && (
              <div className="auth-done">
                <span className="auth-done-mark" aria-hidden="true"><CheckIcon /></span>
                <h4 className="auth-done-title">Your password is updated</h4>
                <p className="auth-done-sub">You can now sign in with your new password.</p>
                <button
                  type="button"
                  className="auth-submit"
                  onClick={() => { setErrors({}); setMode('signin'); }}
                >
                  Go to sign in
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Add-mobile overlay (post-signup) ── */}
      {showAddMobile && (
        <div className="auth-pop" role="dialog" aria-modal="true" aria-labelledby="pop-title">
          <div className="auth-pop-card">
            <div className="auth-pop-head">
              <span className="auth-eyebrow">One last thing</span>
              <h4 id="pop-title" className="auth-pop-title">Add a mobile number</h4>
              <p className="auth-pop-sub">
                We’ll use it for order updates and quick re-verification. You can skip and add it
                later from your profile.
              </p>
            </div>
            <form className="auth-pop-form" onSubmit={handleAddMobile}>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><PhoneIcon /></span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="auth-input"
                  placeholder="10-digit mobile number"
                  value={mobileValue}
                  onChange={(e) => setMobileValue(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              {mobileError && <div className="auth-form-error" role="alert">{mobileError}</div>}
              <div className="auth-pop-actions">
                <button
                  type="button"
                  className="auth-textlink"
                  onClick={() => { setShowAddMobile(false); onClose(); }}
                >
                  Skip for now
                </button>
                <button type="submit" className="auth-submit auth-submit--pop">
                  Save and continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
