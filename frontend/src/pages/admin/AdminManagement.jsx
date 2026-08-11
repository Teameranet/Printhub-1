import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminManagement.css';

/* ================================================================
   ICONS — inline SVG, matching the ad-* icon style
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
const PlusIcon = () => <Ic d="M12 5v14M5 12h14" />;
const EditIcon = () => <Ic d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />;
const TrashIcon = () => <Ic d={["M3 6h18", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"]} />;
const BanIcon = () => <Ic d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />;
const UnlockIcon = () => <Ic d={["M8 11V7a4 4 0 0 1 8 0", "M5 11h14v11H5z", "M12 16v2"]} />;
const CloseIcon = () => <Ic d={["M18 6 6 18", "M6 6l12 12"]} />;
const UserIcon = () => <Ic d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]} />;
const MailIcon = () => <Ic d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />;
const LockIcon = () => <Ic d={["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z", "M7 11V7a5 5 0 0 1 10 0v4"]} />;
const EyeIcon = () => <Ic d={["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"]} />;
const EyeOffIcon = () => <Ic d={["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94", "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19", "M1 1l22 22", "M14.12 14.12a3 3 0 1 1-4.24-4.24"]} />;
const ShieldIcon = () => <Ic d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
const UsersIcon = () => <Ic d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} />;
const CheckCircleIcon = () => <Ic d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"]} />;
const AlertTriIcon = () => <Ic d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />;
const ChevronLeftIcon = () => <Ic d="M15 18l-6-6 6-6" />;
const ChevronRightIc = () => <Ic d="M9 18l6-6-6-6" />;
const SortAscIcon = () => <Ic d={["M3 6h18", "M7 12h10", "M11 18h2"]} />;
const ClipboardIcon = () => <Ic d={["M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"]} />;
const KeyIcon = () => <Ic d={["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"]} />;
const InfoIcon = () => <Ic d={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 8v4", "M12 16h.01"]} />;

/* ================================================================
   CONSTANTS & HELPERS
   ================================================================ */

const ROLES = ['super_admin', 'admin'];
const STATUSES = ['active', 'inactive', 'suspended'];

/* Initial seed data — in production this comes from the API */
const SEED_ADMINS = [
  { id: 'admin_1', name: 'PrintHub', email: 'printhub@gmail.com', role: 'super_admin', status: 'active', createdAt: '2024-01-10T09:00:00Z', lastLogin: '2026-07-25T08:32:00Z', sessionActive: true },
  { id: 'admin_2', name: 'Riya Sharma', email: 'riya@printhub.in', role: 'admin', status: 'active', createdAt: '2024-03-15T11:20:00Z', lastLogin: '2026-07-24T14:10:00Z', sessionActive: true },
  { id: 'admin_3', name: 'Arjun Nair', email: 'arjun@printhub.in', role: 'admin', status: 'inactive', createdAt: '2024-05-02T08:00:00Z', lastLogin: '2026-06-30T10:05:00Z', sessionActive: false },
  { id: 'admin_4', name: 'Priya Menon', email: 'priya@printhub.in', role: 'admin', status: 'suspended', createdAt: '2024-07-20T14:45:00Z', lastLogin: '2026-07-01T09:00:00Z', sessionActive: false },
];

const SEED_AUDIT = [
  { id: 'a1', ts: '2026-07-25T08:32:00Z', action: 'update', desc: 'Updated role for <strong>Riya Sharma</strong> → admin', actor: 'admin_1' },
  { id: 'a2', ts: '2026-07-24T14:10:00Z', action: 'create', desc: 'Created admin account <strong>Vikram Singh</strong>', actor: 'admin_1' },
  { id: 'a3', ts: '2026-07-10T09:00:00Z', action: 'suspend', desc: 'Suspended account <strong>Anita Desai</strong> — policy violation', actor: 'admin_1' },
  { id: 'a4', ts: '2026-07-05T13:00:00Z', action: 'delete', desc: 'Deleted admin account <strong>Temp Admin</strong> — sessions revoked', actor: 'admin_1' },
  { id: 'a5', ts: '2026-06-30T10:05:00Z', action: 'restore', desc: 'Restored account <strong>Arjun Nair</strong> from suspended', actor: 'admin_1' },
];

/* Sanitize a string — strip leading/trailing whitespace, reject HTML injections */
const sanitize = (v = '') =>
  String(v).trim().replace(/<[^>]*>/g, '').replace(/['"`;]/g, '').slice(0, 200);

/* Validate email format */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/* Password strength scorer */
const pwStrength = (pw) => {
  if (!pw) return { score: 0, label: '', cls: '' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = ['', 'weak', 'fair', 'good', 'strong'];
  const lbl = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score: s, label: lbl[s], cls: map[s] };
};

/* Initials from name */
const initials = (name = '') =>
  name.trim().split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';

/* Format timestamp */
const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return '—'; }
};

/* Generate ID */
const genId = () => `admin_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/* Generate timestamp */
const nowIso = () => new Date().toISOString();

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

/* ── Stats Row ─────────────────────────────────────────────── */
const StatsRow = ({ admins }) => {
  const total = admins.length;
  const active = admins.filter(a => a.status === 'active').length;
  const superAdms = admins.filter(a => a.role === 'super_admin').length;
  const sessions = admins.filter(a => a.sessionActive).length;

  const stats = [
    { label: 'Total Admins', value: total, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.25)', icon: <UsersIcon /> },
    { label: 'Active Accounts', value: active, color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)', border: 'rgba(22, 163, 74, 0.25)', icon: <CheckCircleIcon /> },
    { label: 'Super Admins', value: superAdms, color: '#c97a0b', bg: 'rgba(201, 122, 11, 0.1)', border: 'rgba(201, 122, 11, 0.25)', icon: <ShieldIcon /> },
    { label: 'Live Sessions', value: sessions, color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', border: 'rgba(37, 99, 235, 0.25)', icon: <KeyIcon /> },
  ];

  return (
    <div className="am-stats-row" role="region" aria-label="Admin statistics">
      {stats.map((s, i) => (
        <div key={i} className="am-stat">
          <div className="am-stat-icon" style={{
            background: s.bg,
            border: `1px solid ${s.border}`,
            color: s.color,
          }}>
            {s.icon}
          </div>
          <div className="am-stat-value">{s.value}</div>
          <div className="am-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ── Role Badge ─────────────────────────────────────────────── */
const RoleBadge = ({ role }) => (
  <span className={`am-badge ${role === 'super_admin' ? 'am-badge--super' : 'am-badge--admin'}`}>
    {role === 'super_admin' ? <ShieldIcon /> : <UserIcon />}
    {role === 'super_admin' ? 'Super Admin' : 'Admin'}
  </span>
);

/* ── Status Badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const map = {
    active: 'am-badge--active',
    inactive: 'am-badge--inactive',
    suspended: 'am-badge--suspended',
  };
  return (
    <span className={`am-badge ${map[status] || ''}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

/* ── Password Strength Meter ────────────────────────────────── */
const PwStrengthMeter = ({ password }) => {
  const { score, label, cls } = pwStrength(password);
  if (!password) return null;
  return (
    <div className="am-pw-strength" aria-live="polite">
      <div className="am-pw-bars">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`am-pw-bar${i <= score ? ` am-pw-bar--filled-${cls}` : ''}`} />
        ))}
      </div>
      {label && <span className={`am-pw-label am-pw-label--${cls}`}>{label} password</span>}
    </div>
  );
};

/* ── Inline spinner ─────────────────────────────────────────── */
const BtnSpinner = () => <span className="am-btn-spinner" aria-hidden="true" />;

/* ================================================================
   ADD / EDIT MODAL
   ================================================================ */
const AdminFormModal = ({ mode, target, onClose, onSave, isSaving }) => {
  const isEdit = mode === 'edit';
  const [form, setForm] = useState({
    name: isEdit ? target.name : '',
    email: isEdit ? target.email : '',
    role: isEdit ? target.role : 'admin',
    status: isEdit ? target.status : 'active',
    password: '',
    confirmPw: '',
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);

  /* Close on Escape */
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
    const name = sanitize(form.name);
    if (!name || name.length < 2) e.name = 'Name must be at least 2 characters.';
    if (!isValidEmail(sanitize(form.email))) e.email = 'Enter a valid email address.';
    if (!isEdit && !form.password) e.password = 'Password is required.';
    if (form.password) {
      const { score } = pwStrength(form.password);
      if (score < 2) e.password = 'Password is too weak. Use at least 8 characters with a number.';
      if (form.password !== form.confirmPw) e.confirmPw = 'Passwords do not match.';
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSave({
      name: sanitize(form.name),
      email: sanitize(form.email).toLowerCase(),
      role: form.role,
      status: form.status,
      ...(form.password ? { password: form.password } : {}),
    });
  };

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true"
      aria-label={isEdit ? 'Edit admin account' : 'Add admin account'}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal">
        <div className="am-modal-header">
          <div className={`am-modal-icon am-modal-icon--primary`}>
            {isEdit ? <EditIcon /> : <PlusIcon />}
          </div>
          <div>
            <p className="am-modal-title">{isEdit ? 'Edit Admin Account' : 'Add New Admin'}</p>
            <p className="am-modal-subtitle">
              {isEdit ? `Modifying ${target.name}` : 'Create a new administrator account'}
            </p>
          </div>
          <button className="am-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <form className="am-modal-body" onSubmit={handleSubmit} noValidate>
          <div className="am-form">
            {/* Name & Email */}
            <div className="am-field-row">
              <div className="am-field">
                <label className="am-label" htmlFor="amf-name">Full Name <span>*</span></label>
                <div className="am-input-wrap">
                  <UserIcon />
                  <input id="amf-name" ref={firstRef} className={`am-input${errors.name ? ' am-input--error' : ''}`}
                    type="text" placeholder="e.g. Riya Sharma" autoComplete="off"
                    value={form.name} onChange={e => set('name', e.target.value)} maxLength={80} />
                </div>
                {errors.name && <span className="am-field-error"><AlertTriIcon />{errors.name}</span>}
              </div>

              <div className="am-field">
                <label className="am-label" htmlFor="amf-email">Email <span>*</span></label>
                <div className="am-input-wrap">
                  <MailIcon />
                  <input id="amf-email" className={`am-input${errors.email ? ' am-input--error' : ''}`}
                    type="email" placeholder="admin@printhub.in" autoComplete="off"
                    value={form.email} onChange={e => set('email', e.target.value)} maxLength={120}
                    disabled={isEdit} />
                </div>
                {errors.email && <span className="am-field-error"><AlertTriIcon />{errors.email}</span>}
                {isEdit && <span className="am-field-hint">Email cannot be changed after creation.</span>}
              </div>
            </div>

            {/* Role & Status */}
            <div className="am-field-row">
              <div className="am-field">
                <label className="am-label" htmlFor="amf-role">Role <span>*</span></label>
                <select id="amf-role" className="am-select"
                  value={form.role} onChange={e => set('role', e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
                <span className="am-field-hint">Super Admins can manage other admins.</span>
              </div>

              <div className="am-field">
                <label className="am-label" htmlFor="amf-status">Status <span>*</span></label>
                <select id="amf-status" className="am-select"
                  value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="am-field">
              <label className="am-label" htmlFor="amf-pw">
                {isEdit ? 'New Password' : 'Password'} {!isEdit && <span>*</span>}
              </label>
              <div className="am-input-wrap">
                <LockIcon />
                <input id="amf-pw" className={`am-input${errors.password ? ' am-input--error' : ''}`}
                  type={showPw ? 'text' : 'password'}
                  placeholder={isEdit ? 'Leave blank to keep current password' : 'Min 8 chars, include a number'}
                  value={form.password} onChange={e => set('password', e.target.value)}
                  maxLength={100} autoComplete="new-password" />
                <button type="button" className="am-pw-toggle" onClick={() => setShowPw(p => !p)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="am-field-error"><AlertTriIcon />{errors.password}</span>}
              <PwStrengthMeter password={form.password} />
            </div>

            {/* Confirm password */}
            {form.password && (
              <div className="am-field">
                <label className="am-label" htmlFor="amf-cpw">Confirm Password <span>*</span></label>
                <div className="am-input-wrap">
                  <LockIcon />
                  <input id="amf-cpw" className={`am-input${errors.confirmPw ? ' am-input--error' : ''}`}
                    type={showCpw ? 'text' : 'password'} placeholder="Re-enter password"
                    value={form.confirmPw} onChange={e => set('confirmPw', e.target.value)}
                    maxLength={100} autoComplete="new-password" />
                  <button type="button" className="am-pw-toggle" onClick={() => setShowCpw(p => !p)}
                    aria-label={showCpw ? 'Hide confirm password' : 'Show confirm password'}>
                    {showCpw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmPw && <span className="am-field-error"><AlertTriIcon />{errors.confirmPw}</span>}
              </div>
            )}
          </div>

          {/* Footer lives inside form so submit works */}
          <div className="am-modal-footer" style={{ marginTop: 24, paddingInline: 0 }}>
            <button type="button" className="am-btn am-btn--ghost" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="am-btn am-btn--primary" disabled={isSaving}>
              {isSaving && <BtnSpinner />}
              {isSaving ? 'Saving…' : (isEdit ? 'Save Changes' : 'Create Admin')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ================================================================
   MANAGE ROLES MODAL (Super Admin Only)
   ================================================================ */
const ManageRolesModal = ({ admins, onClose, onRoleChange, isBusy }) => {
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [newRole, setNewRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'assign'
  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const roles = [
    {
      id: 'super_admin',
      title: 'Super Administrator',
      count: admins.filter(a => a.role === 'super_admin').length,
      desc: 'Complete full-system authority. Can manage admins, roles, security settings, and audit logs.',
      permissions: [
        { label: 'Admin & Role Management', granted: true },
        { label: 'Full System Audit Trail', granted: true },
        { label: 'User Account Management', granted: true },
        { label: 'Order & Refund Processing', granted: true },
        { label: 'Service & Price Management', granted: true },
        { label: 'Print & Asset Settings', granted: true },
      ],
    },
    {
      id: 'admin',
      title: 'Administrator',
      count: admins.filter(a => a.role === 'admin').length,
      desc: 'Standard operational privileges for day-to-day store and customer management.',
      permissions: [
        { label: 'Admin & Role Management', granted: false },
        { label: 'Full System Audit Trail', granted: false },
        { label: 'User Account Management', granted: true },
        { label: 'Order & Refund Processing', granted: true },
        { label: 'Service & Price Management', granted: true },
        { label: 'Print & Asset Settings', granted: true },
      ],
    },
  ];

  const handleAssignRole = (e) => {
    e.preventDefault();
    if (!selectedAdminId) return;
    const target = admins.find(a => a.id === selectedAdminId);
    if (!target) return;
    if (target.role === newRole) return;
    onRoleChange(target, newRole);
  };

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true"
      aria-label="Manage Roles & Permissions"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal am-modal--roles">
        <div className="am-modal-header">
          <div className="am-modal-icon am-modal-icon--primary">
            <ShieldIcon />
          </div>
          <div>
            <p className="am-modal-title">Role Management & Permissions</p>
            <p className="am-modal-subtitle">Configure system roles, access privileges, and assignments</p>
          </div>
          <button ref={firstRef} className="am-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <div className="am-modal-body">
          <div className="am-role-tabs">
            <button type="button" className={`am-role-tab${activeTab === 'matrix' ? ' am-role-tab--active' : ''}`}
              onClick={() => setActiveTab('matrix')}>
              <ShieldIcon /> Role Matrix
            </button>
            <button type="button" className={`am-role-tab${activeTab === 'assign' ? ' am-role-tab--active' : ''}`}
              onClick={() => setActiveTab('assign')}>
              <UsersIcon /> Assign Roles ({admins.length})
            </button>
          </div>

          {activeTab === 'matrix' ? (
            <div className="am-roles-grid">
              {roles.map(r => (
                <div key={r.id} className="am-role-card">
                  <div className="am-role-card-header">
                    <div className="am-role-title-wrap">
                      <RoleBadge role={r.id} />
                      <span className="am-role-count">{r.count} {r.count === 1 ? 'Account' : 'Accounts'}</span>
                    </div>
                  </div>
                  <p className="am-role-desc">{r.desc}</p>

                  <div className="am-perm-header">Privileges & Permissions</div>
                  <ul className="am-perm-list">
                    {r.permissions.map((p, i) => (
                      <li key={i} className={`am-perm-item${p.granted ? ' am-perm-item--granted' : ' am-perm-item--denied'}`}>
                        {p.granted ? <CheckCircleIcon /> : <CloseIcon />}
                        <span>{p.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleAssignRole} className="am-role-assign-form">
              <p className="am-role-assign-intro">
                Select an administrator to modify their role privileges. Super Admins hold governance over all admin management functions.
              </p>

              <div className="am-field" style={{ marginBottom: 16 }}>
                <label className="am-label" htmlFor="amf-assign-admin">Select Admin Account <span>*</span></label>
                <select id="amf-assign-admin" className="am-select" value={selectedAdminId}
                  onChange={e => {
                    const id = e.target.value;
                    setSelectedAdminId(id);
                    const found = admins.find(a => a.id === id);
                    if (found) setNewRole(found.role);
                  }}>
                  <option value="">-- Choose Admin Account --</option>
                  {admins.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.email}) — Currently: {a.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </option>
                  ))}
                </select>
              </div>

              {selectedAdminId && (
                <div className="am-field" style={{ marginBottom: 20 }}>
                  <label className="am-label" htmlFor="amf-assign-role">Assign New Role <span>*</span></label>
                  <select id="amf-assign-role" className="am-select" value={newRole} onChange={e => setNewRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
                <button type="button" className="am-btn am-btn--ghost" onClick={onClose} disabled={isBusy}>
                  Close
                </button>
                {selectedAdminId && (
                  <button type="submit" className="am-btn am-btn--primary" disabled={isBusy}>
                    {isBusy && <BtnSpinner />}
                    {isBusy ? 'Updating…' : 'Update Role'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {activeTab === 'matrix' && (
          <div className="am-modal-footer">
            <button className="am-btn am-btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        )}
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
      icon: <TrashIcon />, iconCls: 'am-modal-icon--danger',
      title: 'Delete Admin Account',
      subtitle: 'This action cannot be undone.',
      btnCls: 'am-btn--danger', btnLabel: 'Delete Account',
      warning: '⚠ All active sessions will be revoked immediately. The admin will lose all access.',
    },
    suspend: {
      icon: <BanIcon />, iconCls: 'am-modal-icon--warn',
      title: 'Suspend Admin Account',
      subtitle: 'The admin will be locked out.',
      btnCls: 'am-btn--warn', btnLabel: 'Suspend Account',
      warning: '⚠ Any active sessions for this account will be terminated upon suspension.',
    },
    restore: {
      icon: <UnlockIcon />, iconCls: 'am-modal-icon--primary',
      title: 'Restore Admin Account',
      subtitle: 'The admin will regain access.',
      btnCls: 'am-btn--primary', btnLabel: 'Restore Account',
      warning: null,
    },
  };

  const c = cfg[type];

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true"
      aria-label={c.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal am-modal--confirm">
        <div className="am-modal-header">
          <div className={`am-modal-icon ${c.iconCls}`}>{c.icon}</div>
          <div>
            <p className="am-modal-title">{c.title}</p>
            <p className="am-modal-subtitle">{c.subtitle}</p>
          </div>
          <button className="am-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <div className="am-modal-body">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>
            You are about to <strong style={{ color: 'var(--text)' }}>{type}</strong> the following admin account:
          </p>
          <div className="am-confirm-details">
            <div className="am-confirm-detail-row">
              <UserIcon />
              <strong>{target.name}</strong>
            </div>
            <div className="am-confirm-detail-row">
              <MailIcon />
              <span>{target.email}</span>
            </div>
            <div className="am-confirm-detail-row">
              <ShieldIcon />
              <RoleBadge role={target.role} />
            </div>
            {target.sessionActive && (
              <div className="am-confirm-detail-row">
                <KeyIcon />
                <span style={{ color: '#16a34a', fontWeight: 600 }}>Session currently active</span>
              </div>
            )}
          </div>
          {c.warning && (
            <div className="am-confirm-warning">
              <AlertTriIcon />
              <span>{c.warning}</span>
            </div>
          )}
        </div>

        <div className="am-modal-footer">
          <button ref={firstRef} className="am-btn am-btn--ghost" onClick={onClose} disabled={isBusy}>
            Cancel
          </button>
          <button className={`am-btn ${c.btnCls}`} onClick={onConfirm} disabled={isBusy}>
            {isBusy && <BtnSpinner />}
            {isBusy ? 'Processing…' : c.btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};



/* ================================================================
   MAIN ADMIN MANAGEMENT SECTION
   ================================================================ */
const AdminManagementSection = () => {
  const { admin: currentAdmin } = useAdminAuth();

  /* ── State ────────────────────────────────────────────── */
  const [admins, setAdmins] = useState(SEED_ADMINS);
  const [auditLog, setAuditLog] = useState(SEED_AUDIT);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stFilter, setStFilter] = useState('all');
  const [showAdvFilter, setShowAdvFilter] = useState(false);
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const activeAdvFiltersCount = (roleFilter !== 'all' ? 1 : 0) + (stFilter !== 'all' ? 1 : 0);
  const [perPage, setPerPage] = useState(8);
  const [modal, setModal] = useState(null); // null | { type:'add'|'edit'|'delete'|'suspend'|'restore', target? }
  const [isBusy, setIsBusy] = useState(false);
  const [toast, setToast] = useState(null); // { type:'success'|'error'|'warn', msg }
  const toastTimer = useRef(null);

  /* ── Access guard: only super_admin may use this section ── */
  const isSuperAdmin = currentAdmin?.role === 'super_admin';

  /* ── Toast helper ─────────────────────────────────────── */
  const showToast = useCallback((type, msg) => {
    clearTimeout(toastTimer.current);
    setToast({ type, msg });
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  /* ── Audit helper ─────────────────────────────────────── */
  const addAudit = useCallback((action, desc) => {
    setAuditLog(prev => [{
      id: genId(),
      ts: nowIso(),
      action,
      desc,
      actor: currentAdmin?.id || 'unknown',
    }, ...prev]);
  }, [currentAdmin]);

  /* ── Filtered + sorted + paginated list ───────────────── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return admins
      .filter(a => {
        const matchQ = !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
        const matchR = roleFilter === 'all' || a.role === roleFilter;
        const matchS = stFilter === 'all' || a.status === stFilter;
        return matchQ && matchR && matchS;
      })
      .sort((a, b) => {
        if (a.role === 'super_admin' && b.role !== 'super_admin') return -1;
        if (a.role !== 'super_admin' && b.role === 'super_admin') return 1;

        let av = a[sortKey] ?? '', bv = b[sortKey] ?? '';
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [admins, search, roleFilter, stFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  /* Reset to page 1 when filters change */
  useEffect(() => { setPage(1); }, [search, roleFilter, stFilter, sortKey, sortDir, perPage]);

  /* ── Sort toggle ──────────────────────────────────────── */
  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  /* ── CRUD handlers ────────────────────────────────────── */
  const handleSave = useCallback((data) => {
    setIsBusy(true);
    /* Simulate async API call */
    setTimeout(() => {
      if (modal.type === 'add') {
        const newAdmin = {
          id: genId(),
          ...data,
          createdAt: nowIso(),
          lastLogin: null,
          sessionActive: false,
        };
        setAdmins(p => [newAdmin, ...p]);
        addAudit('create', `Created admin account <strong>${data.name}</strong>`);
        showToast('success', `Admin "${data.name}" created successfully.`);
      } else {
        setAdmins(p => p.map(a => a.id === modal.target.id ? { ...a, ...data } : a));
        addAudit('update', `Updated account <strong>${data.name}</strong> — role: ${data.role}, status: ${data.status}`);
        showToast('success', `Admin "${data.name}" updated successfully.`);
      }
      setIsBusy(false);
      setModal(null);
    }, 700);
  }, [modal, addAudit, showToast]);

  const handleDelete = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      /* Revoke session flag */
      setAdmins(p => p.filter(a => a.id !== t.id));
      addAudit('delete',
        `Deleted admin account <strong>${t.name}</strong>${t.sessionActive ? ' — active session revoked' : ''}`);
      showToast('success', `Admin "${t.name}" deleted. ${t.sessionActive ? 'Session revoked.' : ''}`);
      setIsBusy(false);
      setModal(null);
    }, 700);
  }, [modal, addAudit, showToast]);

  const handleSuspend = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setAdmins(p => p.map(a =>
        a.id === t.id ? { ...a, status: 'suspended', sessionActive: false } : a
      ));
      addAudit('suspend',
        `Suspended account <strong>${t.name}</strong>${t.sessionActive ? ' — active session terminated' : ''}`);
      showToast('warn', `Admin "${t.name}" suspended. ${t.sessionActive ? 'Session terminated.' : ''}`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [modal, addAudit, showToast]);

  const handleRestore = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setAdmins(p => p.map(a =>
        a.id === t.id ? { ...a, status: 'active' } : a
      ));
      addAudit('restore', `Restored account <strong>${t.name}</strong> → active`);
      showToast('success', `Admin "${t.name}" restored to active.`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [modal, addAudit, showToast]);

  const handleRoleChange = useCallback((target, newRole) => {
    setIsBusy(true);
    setTimeout(() => {
      setAdmins(p => p.map(a => a.id === target.id ? { ...a, role: newRole } : a));
      addAudit('update', `Updated role for <strong>${target.name}</strong> → ${newRole === 'super_admin' ? 'Super Admin' : 'Admin'}`);
      showToast('success', `Role for "${target.name}" updated to ${newRole === 'super_admin' ? 'Super Admin' : 'Admin'}.`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [addAudit, showToast]);

  /* ── Can current admin act on target? ─────────────────── */
  const canAct = (target) => {
    /* Super admin can't delete or suspend themselves */
    if (target.id === currentAdmin?.id) return false;
    /* Regular admin can't act on super_admin accounts */
    if (!isSuperAdmin && target.role === 'super_admin') return false;
    return true;
  };

  /* ── Render table header cell ─────────────────────────── */
  const Th = ({ label, sortable, field, style }) => (
    <th style={style}>
      {sortable ? (
        <span className="am-table-th-sort" onClick={() => toggleSort(field)}
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

  /* ── Access denied ────────────────────────────────────── */
  if (!isSuperAdmin) {
    return (
      <div className="am-access-denied" role="alert">
        <div className="am-access-denied-icon"><ShieldIcon /></div>
        <h2 className="am-access-denied-title">Access Restricted</h2>
        <p className="am-access-denied-desc">
          Admin Management is only accessible to Super Administrators.
          Contact your Super Admin to request elevated access.
        </p>
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────── */
  return (
    <>
      {/* Page Header */}
      <div className="am-header">
        <span className="section-eyebrow">
          <ShieldIcon />
          Super Admin · Admin Management
        </span>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`am-toast am-toast--${toast.type}`} role="status" aria-live="polite">
          {toast.type === 'success' && <CheckCircleIcon />}
          {toast.type === 'error' && <AlertTriIcon />}
          {toast.type === 'warn' && <AlertTriIcon />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Stats */}
      <StatsRow admins={admins} />

      {/* Toolbar */}
      <div className="am-toolbar">
        {/* Search & Filter Row */}
        <div className="am-search-row">
          <div className="am-search-box">
            <span className="am-search-icon"><SearchIcon /></span>
            <input
              type="text"
              className="am-search"
              placeholder="Search by name or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search admins"
            />
            {search && (
              <button
                type="button"
                className="am-clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {/*  Filter button */}
          <button
            type="button"
            className={`am-adv-filter-btn${showAdvFilter || activeAdvFiltersCount > 0 ? ' am-adv-filter-btn--active' : ''}`}
            onClick={() => setShowAdvFilter(!showAdvFilter)}
            aria-expanded={showAdvFilter}
            aria-label=" Filter"
          >
            <SlidersIcon />
            <span> Filter</span>
            {activeAdvFiltersCount > 0 && (
              <span className="am-filter-badge">{activeAdvFiltersCount}</span>
            )}
          </button>
        </div>

        {/* Actions group for Add Admin & Manage Role */}
        <div className="am-actions-group">
          {/* Add button */}
          <button className="am-add-btn" onClick={() => setModal({ type: 'add' })}>
            <PlusIcon />
            <span>Add Admin</span>
          </button>

          {/* Manage Role button — side of Add Admin button, visible ONLY for Super Admin */}
          {isSuperAdmin && (
            <button className="am-role-btn" onClick={() => setModal({ type: 'manage_roles' })}>
              <ShieldIcon />
              <span>Manage Role</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters Panel (Collapsible) */}
      <div className={`am-adv-panel${showAdvFilter ? ' am-adv-panel--open' : ''}`}>
        <div className="am-adv-grid">
          {/* Role Filter Group */}
          <div className="am-adv-group">
            <label className="am-adv-label">Filter by Role</label>
            <div className="am-adv-chips">
              {[
                { val: 'all', label: 'All Roles' },
                { val: 'super_admin', label: 'Super Admin' },
                { val: 'admin', label: 'Admin' }
              ].map(r => (
                <button
                  key={r.val}
                  type="button"
                  className={`am-adv-chip${roleFilter === r.val ? ' am-adv-chip--active' : ''}`}
                  onClick={() => setRoleFilter(r.val)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter Group */}
          <div className="am-adv-group">
            <label className="am-adv-label">Filter by Status</label>
            <div className="am-adv-chips">
              {[
                { val: 'all', label: 'All Status' },
                { val: 'active', label: 'Active' },
                { val: 'inactive', label: 'Inactive' },
                { val: 'suspended', label: 'Suspended' }
              ].map(s => (
                <button
                  key={s.val}
                  type="button"
                  className={`am-adv-chip${stFilter === s.val ? ' am-adv-chip--active' : ''}`}
                  onClick={() => setStFilter(s.val)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters Wrap */}
          {activeAdvFiltersCount > 0 && (
            <div className="am-adv-group am-adv-group--clear">
              <label className="am-adv-label">&nbsp;</label>
              <button
                type="button"
                className="am-adv-clear-btn"
                onClick={() => { setRoleFilter('all'); setStFilter('all'); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="am-table-card">
        <div className="am-table-wrap">
          <table className="am-table" aria-label="Admin accounts table">
            <thead>
              <tr>
                <Th label="Admin" sortable field="name" style={{ minWidth: 220 }} />
                <Th label="Role" sortable field="role" style={{ minWidth: 130 }} />
                <Th label="Last Login" sortable field="lastLogin" style={{ minWidth: 160 }} />
                <Th label="Created" sortable field="createdAt" style={{ minWidth: 160 }} />
                <Th label="Status" sortable field="status" style={{ minWidth: 130 }} />
                <Th label="Actions" style={{ minWidth: 120, textAlign: 'right' }} />
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="am-empty">
                      <div className="am-empty-icon"><UsersIcon /></div>
                      <p className="am-empty-title">No admins found</p>
                      <p className="am-empty-sub">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : paged.map(a => (
                <tr key={a.id}>
                  {/* Identity */}
                  <td>
                    <div className="am-identity">
                      <div className={`am-avatar${a.role === 'super_admin' ? ' am-avatar--super' : ''}`}
                        aria-hidden="true">
                        {initials(a.name)}
                      </div>
                      <div>
                        <div className="am-identity-name">
                          {a.name}
                          {a.id === currentAdmin?.id && (
                            <span style={{
                              marginLeft: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
                              color: 'var(--primary-ink)', background: 'var(--primary-soft)',
                              padding: '2px 7px', borderRadius: 'var(--r-full)',
                              border: '1px solid var(--primary-border)',
                            }}>you</span>
                          )}
                        </div>
                        <div className="am-identity-email">{a.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td data-label="Role"><RoleBadge role={a.role} /></td>

                  {/* Last Login */}
                  <td data-label="Last Login" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {a.lastLogin ? fmtDate(a.lastLogin) : '—'}
                  </td>

                  {/* Created */}
                  <td data-label="Created" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {fmtDate(a.createdAt)}
                  </td>

                  {/* Status */}
                  <td data-label="Status"><StatusBadge status={a.status} /></td>

                  {/* Actions */}
                  <td data-label="Actions">
                    <div className="am-row-actions" style={{ justifyContent: 'flex-end' }}>
                      {/* Edit */}
                      <button className="am-icon-btn"
                        onClick={() => setModal({ type: 'edit', target: a })}
                        disabled={!canAct(a) && a.id !== currentAdmin?.id}
                        title="Edit account" aria-label={`Edit ${a.name}`}>
                        <EditIcon />
                      </button>

                      {/* Suspend / Restore */}
                      {canAct(a) && a.status !== 'suspended' && (
                        <button className="am-icon-btn am-icon-btn--warn"
                          onClick={() => setModal({ type: 'suspend', target: a })}
                          title="Suspend account" aria-label={`Suspend ${a.name}`}>
                          <BanIcon />
                        </button>
                      )}
                      {canAct(a) && a.status === 'suspended' && (
                        <button className="am-icon-btn"
                          onClick={() => setModal({ type: 'restore', target: a })}
                          title="Restore account" aria-label={`Restore ${a.name}`}>
                          <UnlockIcon />
                        </button>
                      )}

                      {/* Delete */}
                      {canAct(a) && (
                        <button className="am-icon-btn am-icon-btn--danger"
                          onClick={() => setModal({ type: 'delete', target: a })}
                          title="Delete account" aria-label={`Delete ${a.name}`}>
                          <TrashIcon />
                        </button>
                      )}

                      {/* Self-edit note */}
                      {!canAct(a) && a.id !== currentAdmin?.id && (
                        <span title="Cannot modify this account" style={{ color: 'var(--text-dim)', fontSize: 12 }}>
                          <InfoIcon />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="am-pagination">
          <div className="am-pagination-info">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length} admins
          </div>

          <div className="am-pagination-controls" role="navigation" aria-label="Pagination">
            <button className="am-page-btn" onClick={() => setPage(1)}
              disabled={safePage === 1} aria-label="First page">«</button>
            <button className="am-page-btn" onClick={() => setPage(p => p - 1)}
              disabled={safePage === 1} aria-label="Previous page">
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
                  ? <span key={`ellipsis-${i}`} style={{ padding: '0 6px', color: 'var(--text-dim)' }}>…</span>
                  : <button key={p} className={`am-page-btn${p === safePage ? ' am-page-btn--active' : ''}`}
                    onClick={() => setPage(p)} aria-label={`Page ${p}`} aria-current={p === safePage ? 'page' : undefined}>
                    {p}
                  </button>
              )
            }

            <button className="am-page-btn" onClick={() => setPage(p => p + 1)}
              disabled={safePage === totalPages} aria-label="Next page">
              <ChevronRightIc />
            </button>
            <button className="am-page-btn" onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages} aria-label="Last page">»</button>
          </div>

          <div className="am-per-page">
            <span>Per page</span>
            <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}
              aria-label="Results per page">
              {[5, 8, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>



      {/* ── Modals ── */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminFormModal
          mode={modal.type === 'edit' ? 'edit' : 'add'}
          target={modal.target}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isSaving={isBusy}
        />
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

      {modal?.type === 'manage_roles' && (
        <ManageRolesModal
          admins={admins}
          onClose={() => setModal(null)}
          onRoleChange={handleRoleChange}
          isBusy={isBusy}
        />
      )}
    </>
  );
};

export default AdminManagementSection;
