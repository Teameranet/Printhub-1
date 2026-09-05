import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import './UserManagement.css';

/* ================================================================
   ICONS — inline SVG, matching the um-* icon style
   ================================================================ */
const Ic = ({ d, size = 18, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" {...rest}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const SearchIcon = () => <Ic d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const SlidersIcon = () => <Ic d={["M4 21v-7", "M4 10V3", "M12 21v-9", "M12 8V3", "M20 21v-5", "M20 12V3", "M1 14h6", "M9 8h6", "M17 16h6"]} />;
const EditIcon = ({ size = 14 }) => <Ic d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} size={size} />;
const TrashIcon = ({ size = 14 }) => <Ic d={["M3 6h18", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} size={size} />;
const BanIcon = ({ size = 14 }) => <Ic d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} size={size} />;
const UnlockIcon = ({ size = 14 }) => <Ic d={["M8 11V7a4 4 0 0 1 8 0", "M5 11h14v11H5z", "M12 16v2"]} size={size} />;
const CloseIcon = () => <Ic d={["M18 6 6 18", "M6 6l12 12"]} />;
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => <Ic d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />;
const LockIcon = () => <Ic d={["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"]} />;
const PhoneIcon = () => <Ic d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
const UsersIcon = ({ size = 18 }) => <Ic d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} size={size} />;
const CheckCircleIcon = () => <Ic d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"]} />;
const AlertTriIcon = () => <Ic d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />;
const ChevronLeftIcon = () => <Ic d="M15 18l-6-6 6-6" />;
const ChevronRightIc = () => <Ic d="M9 18l6-6-6-6" />;
const SortAscIcon = () => <Ic d={["M3 6h18", "M7 12h10", "M11 18h2"]} />;
const InfoIcon = () => <Ic d={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 8v4", "M12 16h.01"]} />;
const ShoppingBagIcon = () => <Ic d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"]} />;
const CalendarIcon = () => <Ic d={["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"]} />;
const EyeIcon = () => <Ic d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"]} />;
const EyeOffIcon = () => <Ic d={["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94", "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19", "M1 1l22 22", "M14.12 14.12a3 3 0 1 1-4.24-4.24"]} />;
const TagIcon = () => <Ic d={["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", "M7 7h.01"]} />;
const PlusIcon = () => <Ic d="M12 5v14M5 12h14" />;

const StudentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

/* ================================================================
   CONSTANTS & HELPERS
   ================================================================ */

const SEED_USERS = [
  { id: 'u_001', username: 'arjun_k', identifier: '9876543210', mobile: '9876543210', email: 'arjun.k@gmail.com', userType: 'regular', status: 'active', createdAt: '2024-02-10T09:00:00Z', lastLogin: '2026-08-30T08:32:00Z', totalOrders: 14, totalSpent: 3240 },
  { id: 'u_002', username: 'priya_m', identifier: '9123456780', mobile: '9123456780', email: 'priya.m@students.edu', userType: 'student', status: 'active', createdAt: '2024-04-15T11:20:00Z', lastLogin: '2026-08-28T14:10:00Z', totalOrders: 8, totalSpent: 1620 },
  { id: 'u_003', username: 'techcorp', identifier: '9988776655', mobile: '9988776655', email: 'prints@techcorp.in', userType: 'institute', status: 'active', createdAt: '2024-01-05T08:00:00Z', lastLogin: '2026-08-31T10:05:00Z', totalOrders: 56, totalSpent: 18450 },
];

const sanitize = (v = '') =>
  String(v).trim().replace(/<[^>]*>/g, '').replace(/['"`;\\/]/g, '').slice(0, 200);

const isValidEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

const initials = (name = '') =>
  name.trim().split(/[\s_-]/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return '—'; }
};

const fmtINR = (n) =>
  n != null ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

const genId = () => `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const nowIso = () => new Date().toISOString();

const TYPE_META = {
  regular: { label: 'Regular', Icon: UserIcon },
  student: { label: 'Student', Icon: StudentIcon },
  institute: { label: 'Institute', Icon: BuildingIcon },
};

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

/* ── Stats Row ─────────────────────────────────────────────── */
const StatsRow = ({ users }) => {
  const total = users.length;
  const active = users.filter(u => u.status === 'active').length;
  const suspended = users.filter(u => u.status === 'suspended').length;
  const institutes = users.filter(u => u.userType === 'institute').length;

  const stats = [
    { label: 'Total Users', value: total, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', icon: <UsersIcon /> },
    { label: 'Active Accounts', value: active, color: '#16a34a', bg: 'rgba(22,163,74,0.1)', border: 'rgba(22,163,74,0.25)', icon: <CheckCircleIcon /> },
    { label: 'Suspended', value: suspended, color: '#dc2626', bg: 'rgba(220,38,38,0.09)', border: 'rgba(220,38,38,0.22)', icon: <BanIcon /> },
    { label: 'Institutes', value: institutes, color: '#c97a0b', bg: 'rgba(201,122,11,0.10)', border: 'rgba(201,122,11,0.25)', icon: <TagIcon /> },
  ];

  return (
    <div className="um-stats-row" role="region" aria-label="User statistics">
      {stats.map((s, i) => (
        <div key={i} className="um-stat">
          <div className="um-stat-icon" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
            {s.icon}
          </div>
          <div className="um-stat-value">{s.value}</div>
          <div className="um-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ── Type Badge ─────────────────────────────────────────────── */
const TypeBadge = ({ userType }) => {
  const meta = TYPE_META[userType] || { label: userType, Icon: UserIcon };
  const IconComponent = meta.Icon || UserIcon;
  return (
    <span className="um-badge um-badge--type">
      <IconComponent /> {meta.label}
    </span>
  );
};

/* ── Status Badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = { active: 'um-badge--active', suspended: 'um-badge--suspended' };
  return (
    <span className={`um-badge ${map[status] || ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

/* ── Inline spinner ─────────────────────────────────────────── */
const BtnSpinner = () => <span className="um-btn-spinner" aria-hidden="true" />;

/* ================================================================
   VIEW PROFILE MODAL
   ================================================================ */
const ViewModal = ({ target, onClose, onEdit }) => {
  const firstRef = useRef(null);
  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="um-modal-overlay" role="dialog" aria-modal="true"
      aria-label={`Profile: ${target.username}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="um-modal um-modal--view">
        <div className="um-modal-header">
          <div className="um-modal-icon um-modal-icon--primary"><EyeIcon /></div>
          <div>
            <p className="um-modal-title">User Profile</p>
            <p className="um-modal-subtitle">Detailed account information</p>
          </div>
          <button ref={firstRef} className="um-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <div className="um-modal-body">
          {/* Avatar + Identity */}
          <div className="um-view-identity">
            <div className="um-view-avatar">
              {initials(target.username)}
            </div>
            <div className="um-view-id-block">
              <div className="um-view-name">{target.username}</div>
              <div className="um-view-id">ID: {target.id}</div>
              <div className="um-view-badges">
                <TypeBadge userType={target.userType} />
                <StatusBadge status={target.status} />
              </div>
            </div>
          </div>

          {/* Detail rows */}
          <div className="um-view-details">
            {[
              { icon: <MailIcon />, label: 'Email', val: target.email || '—' },
              { icon: <PhoneIcon />, label: 'Mobile', val: target.mobile || '—' },
              { icon: <CalendarIcon />, label: 'Joined', val: fmtDate(target.createdAt) },
              { icon: <CalendarIcon />, label: 'Last Login', val: fmtDate(target.lastLogin) },
              { icon: <ShoppingBagIcon />, label: 'Total Orders', val: target.totalOrders ?? '—' },
              { icon: <TagIcon />, label: 'Total Spent', val: fmtINR(target.totalSpent) },
            ].map(({ icon, label, val }) => (
              <div key={label} className="um-view-row">
                <span className="um-view-row-icon">{icon}</span>
                <span className="um-view-row-label">{label}</span>
                <span className="um-view-row-val">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="um-modal-footer">
          <button className="um-btn um-btn--ghost" onClick={onClose}>Close</button>
          <button className="um-btn um-btn--primary" onClick={() => { onClose(); onEdit(target); }}>
            <EditIcon /> Edit Account
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   ADD / EDIT MODAL
   ================================================================ */
const UserFormModal = ({ mode, target, onClose, onSave, isSaving }) => {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({
    username: isEdit ? target.username : '',
    email: isEdit ? (target.email || '') : '',
    mobile: isEdit ? (target.mobile || '') : '',
    userType: isEdit ? target.userType : 'regular',
    status: isEdit ? target.status : 'active',
    password: '',
    confirmPw: '',
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    const un = sanitize(form.username);
    if (!un || un.length < 2) e.username = 'Username must be at least 2 characters.';
    if (form.email && !isValidEmail(form.email)) e.email = 'Enter a valid email address.';
    const mob = sanitize(form.mobile);
    if (!isEdit && !mob) e.mobile = 'Mobile number is required.';
    if (mob && !/^\d{10}$/.test(mob)) e.mobile = 'Enter a valid 10-digit mobile number.';
    if (!isEdit) {
      if (!form.password) e.password = 'Password is required.';
      if (form.password && form.password.length < 8) e.password = 'Password must be at least 8 characters.';
      if (form.password && !form.confirmPw) e.confirmPw = 'Please confirm the password.';
      if (form.password && form.confirmPw && form.password !== form.confirmPw) e.confirmPw = 'Passwords do not match.';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSave({
      username: sanitize(form.username),
      email: sanitize(form.email).toLowerCase(),
      mobile: sanitize(form.mobile),
      userType: form.userType,
      status: form.status,
      ...(form.password ? { password: form.password } : {}),
    });
  };

  return (
    <div className="um-modal-overlay" role="dialog" aria-modal="true"
      aria-label={isEdit ? `Edit ${target?.username}` : 'Add user account'}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="um-modal">
        <div className="um-modal-header">
          <div className="um-modal-icon um-modal-icon--primary">
            {isEdit ? <EditIcon /> : <PlusIcon />}
          </div>
          <div>
            <p className="um-modal-title">{isEdit ? `Edit ${target?.username}` : 'Add New User'}</p>
            <p className="um-modal-subtitle">{isEdit ? 'Update account details' : 'Create a new customer account'}</p>
          </div>
          <button className="um-modal-close" onClick={onClose} aria-label="Close modal"><CloseIcon /></button>
        </div>

        <form className="um-modal-body" onSubmit={handleSubmit} noValidate>
          <div className="um-form">
            {/* Username & Mobile */}
            <div className="um-field-row">
              <div className="um-field">
                <label className="um-label" htmlFor="umf-username">Username <span>*</span></label>
                <div className="um-input-wrap">
                  <UserIcon />
                  <input id="umf-username" ref={firstRef}
                    className={`um-input${errors.username ? ' um-input--error' : ''}`}
                    type="text" placeholder="e.g. arjun_k" autoComplete="off"
                    value={form.username} onChange={e => set('username', e.target.value)} maxLength={50} />
                </div>
                {errors.username && <span className="um-field-error"><AlertTriIcon />{errors.username}</span>}
              </div>

              <div className="um-field">
                <label className="um-label" htmlFor="umf-mobile">Mobile {!isEdit && <span>*</span>}</label>
                <div className="um-input-wrap">
                  <PhoneIcon />
                  <input id="umf-mobile"
                    className={`um-input${errors.mobile ? ' um-input--error' : ''}`}
                    type="tel" placeholder="10-digit mobile" autoComplete="off"
                    value={form.mobile} onChange={e => set('mobile', e.target.value)} maxLength={10}
                    disabled={isEdit} />
                </div>
                {errors.mobile && <span className="um-field-error"><AlertTriIcon />{errors.mobile}</span>}
                {isEdit && <span className="um-field-hint">Mobile (identifier) cannot be changed.</span>}
              </div>
            </div>

            {/* Email */}
            <div className="um-field">
              <label className="um-label" htmlFor="umf-email">Email</label>
              <div className="um-input-wrap">
                <MailIcon />
                <input id="umf-email"
                  className={`um-input${errors.email ? ' um-input--error' : ''}`}
                  type="email" placeholder="user@example.com" autoComplete="off"
                  value={form.email} onChange={e => set('email', e.target.value)} maxLength={120} />
              </div>
              {errors.email && <span className="um-field-error"><AlertTriIcon />{errors.email}</span>}
            </div>

            {/* User Type & Status */}
            <div className="um-field-row">
              <div className="um-field">
                <label className="um-label" htmlFor="umf-type">User Type <span>*</span></label>
                <select id="umf-type" className="um-select"
                  value={form.userType} onChange={e => set('userType', e.target.value)}>
                  <option value="regular">Regular</option>
                  <option value="student">Student</option>
                  <option value="institute">Institute</option>
                </select>
              </div>

              <div className="um-field">
                <label className="um-label" htmlFor="umf-status">Status <span>*</span></label>
                <select id="umf-status" className="um-select"
                  value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Password — only for new users */}
            {!isEdit && (
              <>
                <div className="um-field">
                  <label className="um-label" htmlFor="umf-pw">Password <span>*</span></label>
                  <div className="um-input-wrap">
                    <LockIcon />
                    <input id="umf-pw"
                      className={`um-input${errors.password ? ' um-input--error' : ''}`}
                      type={showPw ? 'text' : 'password'}
                      placeholder="Min 8 characters"
                      value={form.password} onChange={e => set('password', e.target.value)}
                      maxLength={100} autoComplete="new-password" />
                    <button type="button" className="um-pw-toggle"
                      onClick={() => setShowPw(p => !p)}
                      aria-label={showPw ? 'Hide password' : 'Show password'}>
                      {showPw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.password && <span className="um-field-error"><AlertTriIcon />{errors.password}</span>}
                </div>

                <div className="um-field">
                  <label className="um-label" htmlFor="umf-cpw">Confirm Password <span>*</span></label>
                  <div className="um-input-wrap">
                    <LockIcon />
                    <input id="umf-cpw"
                      className={`um-input${errors.confirmPw ? ' um-input--error' : ''}`}
                      type={showCpw ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={form.confirmPw} onChange={e => set('confirmPw', e.target.value)}
                      maxLength={100} autoComplete="new-password" />
                    <button type="button" className="um-pw-toggle"
                      onClick={() => setShowCpw(p => !p)}
                      aria-label={showCpw ? 'Hide confirm password' : 'Show confirm password'}>
                      {showCpw ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.confirmPw && <span className="um-field-error"><AlertTriIcon />{errors.confirmPw}</span>}
                </div>
              </>
            )}
          </div>

          <div className="um-modal-footer" style={{ marginTop: 24, paddingInline: 0 }}>
            <button type="button" className="um-btn um-btn--ghost" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="um-btn um-btn--primary" disabled={isSaving}>
              {isSaving && <BtnSpinner />}
              {isSaving ? 'Saving…' : (isEdit ? 'Save Changes' : 'Create User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ================================================================
   CONFIRM / DANGER MODALS
   ================================================================ */
const ConfirmModal = ({ type, target, onClose, onConfirm, isBusy }) => {
  const firstRef = useRef(null);
  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const cfg = {
    delete: {
      icon: <TrashIcon />, iconCls: 'um-modal-icon--danger',
      title: 'Delete User Account', subtitle: 'This action cannot be undone.',
      btnCls: 'um-btn--danger', btnLabel: 'Delete Account',
      warning: '⚠ All account data, order history, and session tokens will be permanently removed.',
    },
    suspend: {
      icon: <BanIcon />, iconCls: 'um-modal-icon--warn',
      title: 'Suspend User Account', subtitle: 'The user will be locked out immediately.',
      btnCls: 'um-btn--warn', btnLabel: 'Suspend Account',
      warning: '⚠ The user will be unable to sign in or place new orders.',
    },
    restore: {
      icon: <UnlockIcon />, iconCls: 'um-modal-icon--primary',
      title: 'Restore User Account', subtitle: 'The user will regain access.',
      btnCls: 'um-btn--primary', btnLabel: 'Restore Account',
      warning: null,
    },
  };

  const c = cfg[type];

  return (
    <div className="um-modal-overlay" role="dialog" aria-modal="true"
      aria-label={c.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="um-modal um-modal--confirm">
        <div className="um-modal-header">
          <div className={`um-modal-icon ${c.iconCls}`}>{c.icon}</div>
          <div>
            <p className="um-modal-title">{c.title}</p>
            <p className="um-modal-subtitle">{c.subtitle}</p>
          </div>
          <button className="um-modal-close" onClick={onClose} aria-label="Close modal"><CloseIcon /></button>
        </div>

        <div className="um-modal-body">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>
            You are about to <strong style={{ color: 'var(--text)' }}>{type}</strong> the following user:
          </p>
          <div className="um-confirm-details">
            <div className="um-confirm-detail-row"><UserIcon /><strong>{target.username}</strong></div>
            {target.mobile && <div className="um-confirm-detail-row"><PhoneIcon /><span>{target.mobile}</span></div>}
            {target.email && <div className="um-confirm-detail-row"><MailIcon /><span>{target.email}</span></div>}
            <div className="um-confirm-detail-row"><TagIcon /><TypeBadge userType={target.userType} /></div>
          </div>
          {c.warning && (
            <div className="um-confirm-warning">
              <AlertTriIcon /><span>{c.warning}</span>
            </div>
          )}
        </div>

        <div className="um-modal-footer">
          <button ref={firstRef} className="um-btn um-btn--ghost" onClick={onClose} disabled={isBusy}>Cancel</button>
          <button className={`um-btn ${c.btnCls}`} onClick={onConfirm} disabled={isBusy}>
            {isBusy && <BtnSpinner />}
            {isBusy ? 'Processing…' : c.btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};



/* ================================================================
   MAIN USER MANAGEMENT SECTION
   ================================================================ */
const UserManagementSection = () => {
  const [users, setUsers] = useState(SEED_USERS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stFilter, setStFilter] = useState('all');
  const [showAdvFilter, setShowAdvFilter] = useState(false);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [modal, setModal] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const activeAdvFiltersCount = (typeFilter !== 'all' ? 1 : 0) + (stFilter !== 'all' ? 1 : 0);

  const showToast = useCallback((type, msg) => {
    clearTimeout(toastTimer.current);
    setToast({ type, msg });
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return users
      .filter(u => {
        const matchQ = !q ||
          u.username.toLowerCase().includes(q) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.mobile && u.mobile.includes(q));
        const matchT = typeFilter === 'all' || u.userType === typeFilter;
        const matchS = stFilter === 'all' || u.status === stFilter;
        return matchQ && matchT && matchS;
      })
      .sort((a, b) => {
        let av = a[sortKey] ?? '', bv = b[sortKey] ?? '';
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, search, typeFilter, stFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  useEffect(() => { setPage(1); }, [search, typeFilter, stFilter, sortKey, sortDir, perPage]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const handleSave = useCallback((data) => {
    setIsBusy(true);
    setTimeout(() => {
      if (modal.type === 'add') {
        const newUser = {
          id: genId(), identifier: data.mobile,
          ...data, createdAt: nowIso(),
          lastLogin: null, totalOrders: 0, totalSpent: 0,
        };
        setUsers(p => [newUser, ...p]);
        showToast('success', `User "${data.username}" created successfully.`);
      } else {
        setUsers(p => p.map(u => u.id === modal.target.id ? { ...u, ...data } : u));
        showToast('success', `User "${data.username}" updated.`);
      }
      setIsBusy(false);
      setModal(null);
    }, 700);
  }, [modal, showToast]);

  const handleDelete = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setUsers(p => p.filter(u => u.id !== t.id));
      showToast('success', `User "${t.username}" permanently deleted.`);
      setIsBusy(false);
      setModal(null);
    }, 700);
  }, [modal, showToast]);

  const handleSuspend = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setUsers(p => p.map(u => u.id === t.id ? { ...u, status: 'suspended' } : u));
      showToast('warn', `User "${t.username}" suspended.`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [modal, showToast]);

  const handleRestore = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setUsers(p => p.map(u => u.id === t.id ? { ...u, status: 'active' } : u));
      showToast('success', `User "${t.username}" restored to active.`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [modal, showToast]);

  const Th = ({ label, sortable, field, style }) => (
    <th style={style}>
      {sortable ? (
        <span className="um-table-th-sort" onClick={() => toggleSort(field)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && toggleSort(field)}
          aria-sort={sortKey === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
          {label}
          {sortKey === field && (
            <span aria-hidden="true" style={{ color: 'var(--primary)', opacity: 0.7 }}>
              {sortDir === 'asc' ? ' ↑' : ' ↓'}
            </span>
          )}
          {sortKey !== field && <span style={{ opacity: 0.3 }}><SortAscIcon /></span>}
        </span>
      ) : label}
    </th>
  );

  return (
    <>
      {/* Page Header */}
      <div className="um-header">
        <span className="section-eyebrow">
          <UsersIcon />
          Admin · User Management
        </span>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`um-toast um-toast--${toast.type}`} role="status" aria-live="polite">
          {toast.type === 'success' && <CheckCircleIcon />}
          {(toast.type === 'error' || toast.type === 'warn') && <AlertTriIcon />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Stats */}
      <StatsRow users={users} />

      {/* Toolbar */}
      <div className="um-toolbar">
        <div className="um-search-row">
          <div className="um-search-box">
            <span className="um-search-icon"><SearchIcon /></span>
            <input type="text" className="um-search"
              placeholder="Search by username, email, or mobile…"
              value={search} onChange={e => setSearch(e.target.value)}
              aria-label="Search users" />
            {search && (
              <button type="button" className="um-clear-search"
                onClick={() => setSearch('')} aria-label="Clear search">
                <CloseIcon />
              </button>
            )}
          </div>

          <button type="button"
            className={`um-adv-filter-btn${showAdvFilter || activeAdvFiltersCount > 0 ? ' um-adv-filter-btn--active' : ''}`}
            onClick={() => setShowAdvFilter(!showAdvFilter)}
            aria-expanded={showAdvFilter} aria-label="Filter">
            <SlidersIcon />
            <span>Filter</span>
            {activeAdvFiltersCount > 0 && <span className="um-filter-badge">{activeAdvFiltersCount}</span>}
          </button>
        </div>

        <div className="um-actions-group">
          <button className="um-add-btn" onClick={() => setModal({ type: 'add' })}>
            <PlusIcon /><span>Add User</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={`um-adv-panel${showAdvFilter ? ' um-adv-panel--open' : ''}`}>
        <div className="um-adv-grid">
          <div className="um-adv-group">
            <label className="um-adv-label">Filter by Type</label>
            <div className="um-adv-chips">
              {[
                { val: 'all', label: 'All Types' },
                { val: 'regular', label: 'Regular' },
                { val: 'student', label: 'Student' },
                { val: 'institute', label: 'Institute' },
              ].map(t => (
                <button key={t.val} type="button"
                  className={`um-adv-chip${typeFilter === t.val ? ' um-adv-chip--active' : ''}`}
                  onClick={() => setTypeFilter(t.val)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="um-adv-group">
            <label className="um-adv-label">Filter by Status</label>
            <div className="um-adv-chips">
              {[
                { val: 'all', label: 'All Status' },
                { val: 'active', label: 'Active' },
                { val: 'suspended', label: 'Suspended' },
              ].map(s => (
                <button key={s.val} type="button"
                  className={`um-adv-chip${stFilter === s.val ? ' um-adv-chip--active' : ''}`}
                  onClick={() => setStFilter(s.val)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {activeAdvFiltersCount > 0 && (
            <div className="um-adv-group">
              <label className="um-adv-label">&nbsp;</label>
              <button type="button" className="um-adv-clear-btn"
                onClick={() => { setTypeFilter('all'); setStFilter('all'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="um-table-card">
        <div className="um-table-wrap">
          <table className="um-table" aria-label="User accounts table">
            <thead>
              <tr>
                <Th label="User" sortable field="username" style={{ minWidth: 220 }} />
                <Th label="Type" sortable field="userType" style={{ minWidth: 120 }} />
                <Th label="Mobile" style={{ minWidth: 130 }} />
                <Th label="Orders" sortable field="totalOrders" style={{ minWidth: 90, textAlign: 'center' }} />
                <Th label="Spent" sortable field="totalSpent" style={{ minWidth: 110, textAlign: 'right' }} />
                <Th label="Created" sortable field="createdAt" style={{ minWidth: 160 }} />
                <Th label="Status" sortable field="status" style={{ minWidth: 110 }} />
                <Th label="Actions" style={{ minWidth: 140, textAlign: 'right' }} />
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="um-empty">
                      <div className="um-empty-icon"><UsersIcon size={32} /></div>
                      <p className="um-empty-title">No users found</p>
                      <p className="um-empty-sub">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : paged.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="um-identity">
                      <div className="um-avatar" aria-hidden="true">
                        {initials(u.username)}
                      </div>
                      <div>
                        <div className="um-identity-name">{u.username}</div>
                        <div className="um-identity-email">{u.email || u.identifier}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Type"><TypeBadge userType={u.userType} /></td>
                  <td data-label="Mobile" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {u.mobile || '—'}
                  </td>
                  <td data-label="Orders" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                    {u.totalOrders ?? '—'}
                  </td>
                  <td data-label="Spent" style={{ textAlign: 'center', color: 'var(--primary)' }}>
                    {fmtINR(u.totalSpent)}
                  </td>
                  <td data-label="Created On" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {u.createdAt ? fmtDate(u.createdAt) : '—'}
                  </td>
                  <td data-label="Status"><StatusBadge status={u.status} /></td>
                  <td data-label="Actions">
                    <div className="um-row-actions" style={{ justifyContent: 'flex-end' }}>
                      <button className="um-icon-btn"
                        onClick={() => setModal({ type: 'view', target: u })}
                        title="View profile" aria-label={`View ${u.username}`}>
                        <EyeIcon />
                      </button>
                      <button className="um-icon-btn"
                        onClick={() => setModal({ type: 'edit', target: u })}
                        title="Edit account" aria-label={`Edit ${u.username}`}>
                        <EditIcon />
                      </button>
                      {u.status !== 'suspended' ? (
                        <button className="um-icon-btn um-icon-btn--warn"
                          onClick={() => setModal({ type: 'suspend', target: u })}
                          title="Suspend account" aria-label={`Suspend ${u.username}`}>
                          <BanIcon />
                        </button>
                      ) : (
                        <button className="um-icon-btn"
                          onClick={() => setModal({ type: 'restore', target: u })}
                          title="Restore account" aria-label={`Restore ${u.username}`}>
                          <UnlockIcon />
                        </button>
                      )}
                      <button className="um-icon-btn um-icon-btn--danger"
                        onClick={() => setModal({ type: 'delete', target: u })}
                        title="Delete account" aria-label={`Delete ${u.username}`}>
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="um-pagination">
          <div className="um-pagination-info">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length} users
          </div>
          <div className="um-pagination-controls" role="navigation" aria-label="Pagination">
            <button className="um-page-btn" onClick={() => setPage(1)} disabled={safePage === 1} aria-label="First page">«</button>
            <button className="um-page-btn" onClick={() => setPage(p => p - 1)} disabled={safePage === 1} aria-label="Previous page">
              <ChevronLeftIcon />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '…'
                  ? <span key={`el-${i}`} style={{ padding: '0 6px', color: 'var(--text-dim)' }}>…</span>
                  : <button key={p} className={`um-page-btn${p === safePage ? ' um-page-btn--active' : ''}`}
                    onClick={() => setPage(p)} aria-label={`Page ${p}`} aria-current={p === safePage ? 'page' : undefined}>
                    {p}
                  </button>
              )
            }
            <button className="um-page-btn" onClick={() => setPage(p => p + 1)} disabled={safePage === totalPages} aria-label="Next page">
              <ChevronRightIc />
            </button>
            <button className="um-page-btn" onClick={() => setPage(totalPages)} disabled={safePage === totalPages} aria-label="Last page">»</button>
          </div>
          <div className="um-per-page">
            <span>Per page</span>
            <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} aria-label="Results per page">
              {[5, 8, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === 'view' && (
        <ViewModal target={modal.target} onClose={() => setModal(null)}
          onEdit={(u) => setModal({ type: 'edit', target: u })} />
      )}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <UserFormModal mode={modal.type === 'edit' ? 'edit' : 'add'}
          target={modal.target} onClose={() => setModal(null)}
          onSave={handleSave} isSaving={isBusy} />
      )}
      {modal?.type === 'delete' && (
        <ConfirmModal type="delete" target={modal.target}
          onClose={() => setModal(null)} onConfirm={handleDelete} isBusy={isBusy} />
      )}
      {modal?.type === 'suspend' && (
        <ConfirmModal type="suspend" target={modal.target}
          onClose={() => setModal(null)} onConfirm={handleSuspend} isBusy={isBusy} />
      )}
      {modal?.type === 'restore' && (
        <ConfirmModal type="restore" target={modal.target}
          onClose={() => setModal(null)} onConfirm={handleRestore} isBusy={isBusy} />
      )}
    </>
  );
};

export default UserManagementSection;
