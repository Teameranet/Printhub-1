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
const BarChartIcon = () => <Ic d={["M18 20V10", "M12 20V4", "M6 20v-6"]} />;
const SettingsIcon = () => <Ic d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"]} />;

const MODULE_ICONS = {
  orders: <ClipboardIcon />,
  products: <SlidersIcon />,
  users: <UsersIcon />,
  analytics: <BarChartIcon />,
  settings: <SettingsIcon />,
  admins: <ShieldIcon />,
};

/* ================================================================
   CONSTANTS & HELPERS
   ================================================================ */

const STATUSES = ['active', 'inactive', 'suspended'];

const PERMISSION_MODULES = [
  { id: 'orders', label: 'Orders & Refunds', desc: 'Process customer print orders, cancellations, and refunds' },
  { id: 'products', label: 'Catalog & Pricing', desc: 'Manage product catalog, paper types, pricing, and stock' },
  { id: 'users', label: 'Customer Users', desc: 'View customer accounts, profile details, and account status' },
  { id: 'analytics', label: 'Reports & Analytics', desc: 'Access revenue metrics, store usage stats, and data exports' },
  { id: 'settings', label: 'System & Store Settings', desc: 'Configure store defaults, branding, and notification templates' },
  { id: 'admins', label: 'Admin Governance', desc: 'Manage admin accounts, custom roles, privileges & audit logs' },
];

const ACTIONS = ['view', 'edit', 'delete'];

const INITIAL_ROLES = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    builtin: true,
    desc: 'Full unrestricted system governance, admin account management, and financial control.',
    permissions: {
      orders: ['view', 'edit', 'delete'],
      products: ['view', 'edit', 'delete'],
      users: ['view', 'edit', 'delete'],
      analytics: ['view', 'edit', 'delete'],
      settings: ['view', 'edit', 'delete'],
      admins: ['view', 'edit', 'delete'],
    },
  },
  {
    id: 'admin',
    name: 'Admin',
    builtin: false,
    desc: 'Standard operational privileges for day-to-day store and customer management.',
    permissions: {
      orders: ['view', 'edit'],
      products: ['view', 'edit'],
      users: ['view', 'edit'],
      analytics: ['view'],
      settings: ['view'],
      admins: [],
    },
  },

];

/* Initial seed data — in production this comes from the API */
const SEED_ADMINS = [
  { id: 'admin_1', name: 'PrintHub', email: 'printhub@gmail.com', password: 'Admin@Password123', role: 'super_admin', status: 'active', createdAt: '2024-01-10T09:00:00Z', lastLogin: '2026-07-25T08:32:00Z', sessionActive: true },
  { id: 'admin_2', name: 'Riya Sharma', email: 'riya@printhub.in', password: 'Riya@Password123', role: 'admin', status: 'active', createdAt: '2024-03-15T11:20:00Z', lastLogin: '2026-07-24T14:10:00Z', sessionActive: true },
  { id: 'admin_3', name: 'Arjun Nair', email: 'arjun@printhub.in', password: 'Arjun@Password123', role: 'admin', status: 'inactive', createdAt: '2024-05-02T08:00:00Z', lastLogin: '2026-06-30T10:05:00Z', sessionActive: false },
  { id: 'admin_4', name: 'Priya Menon', email: 'priya@printhub.in', password: 'Priya@Password123', role: 'admin', status: 'suspended', createdAt: '2024-07-20T14:45:00Z', lastLogin: '2026-07-01T09:00:00Z', sessionActive: false },
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
const RoleBadge = ({ role, roles = [] }) => {
  if (role === 'super_admin') {
    return (
      <span className="am-badge am-badge--super">
        <ShieldIcon /> Super Admin
      </span>
    );
  }
  if (role === 'admin') {
    return (
      <span className="am-badge am-badge--admin">
        <UserIcon /> Admin
      </span>
    );
  }
  const matched = roles.find(r => r.id === role);
  return (
    <span className="am-badge am-badge--custom">
      <ShieldIcon /> {matched ? matched.name : (role.startsWith('role_') ? role.replace('role_', '').replace(/_/g, ' ') : role)}
    </span>
  );
};

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

/* ── Inline spinner ─────────────────────────────────────────── */
const BtnSpinner = () => <span className="am-btn-spinner" aria-hidden="true" />;

/* ================================================================
   ADD / EDIT MODAL
   ================================================================ */
const AdminFormModal = ({ mode, target, onClose, onSave, isSaving, roles = [] }) => {
  const isEdit = mode === 'edit';
  const initialPassword = isEdit ? (target?.password || 'Admin@Password123') : '';
  const [form, setForm] = useState({
    name: isEdit ? target.name : '',
    email: isEdit ? target.email : '',
    role: isEdit ? target.role : (roles[1]?.id || 'admin'),
    status: isEdit ? target.status : 'active',
    password: initialPassword,
    confirmPw: '',
  });
  const [privilegeOverrides, setPrivilegeOverrides] = useState(() => (
    isEdit && target?.privilegeOverrides ? { ...target.privilegeOverrides } : {}
  ));
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const firstRef = useRef(null);

  const isPasswordChanged = form.password !== initialPassword;

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

  /* Toggle individual account override permission */
  const toggleOverridePerm = (modId, action) => {
    const baseRole = roles.find(r => r.id === form.role) || roles[1];
    const inheritedActions = baseRole?.permissions?.[modId] || [];

    setPrivilegeOverrides(prev => {
      const currentOverridden = prev[modId] !== undefined ? prev[modId] : [...inheritedActions];
      const updated = currentOverridden.includes(action)
        ? currentOverridden.filter(a => a !== action)
        : [...currentOverridden, action];
      return { ...prev, [modId]: updated };
    });
  };

  const setAllAccountPerms = (enable) => {
    const newOverrides = {};
    PERMISSION_MODULES.forEach(m => {
      newOverrides[m.id] = enable ? ['view', 'edit', 'delete'] : [];
    });
    setPrivilegeOverrides(newOverrides);
  };

  const handleResetAccountPerms = () => {
    setPrivilegeOverrides(target?.privilegeOverrides ? { ...target.privilegeOverrides } : {});
  };

  const setAllModuleAccountPerms = (modId, enable) => {
    setPrivilegeOverrides(prev => ({
      ...prev,
      [modId]: enable ? ['view', 'edit', 'delete'] : [],
    }));
  };

  const validate = () => {
    const e = {};
    const name = sanitize(form.name);
    if (!name || name.length < 2) e.name = 'Name must be at least 2 characters.';
    if (!isValidEmail(sanitize(form.email))) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    if (form.password && form.password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }
    if (isPasswordChanged) {
      if (!form.confirmPw) {
        e.confirmPw = 'Please confirm the new password.';
      } else if (form.password !== form.confirmPw) {
        e.confirmPw = 'Passwords do not match.';
      }
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
      password: form.password,
      ...(Object.keys(privilegeOverrides).length > 0 ? { privilegeOverrides } : {}),
    });
  };

  const currentRoleName = useMemo(() => {
    const r = roles.find(x => x.id === (form.role || target?.role));
    return r ? r.name : (form.role || target?.role || 'Admin');
  }, [roles, form.role, target?.role]);

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true"
      aria-label={isEdit ? `Edit ${target?.name || 'User'} account` : 'Add admin account'}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`am-modal${form.role ? ' am-modal--admin-edit' : ''}`}>
        <div className="am-modal-header">
          <div className={`am-modal-icon am-modal-icon--primary`}>
            {isEdit ? <EditIcon /> : <PlusIcon />}
          </div>
          <div>
            <p className="am-modal-title">{isEdit ? `Edit ${target?.name || 'User'} Account` : 'Add New Admin'}</p>
            <p className="am-modal-subtitle">
              {isEdit ? `Modifying ${currentRoleName}` : 'Create a new admin account'}
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
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.id === 'super_admin' ? `${r.name} (System Role)` : r.name}
                    </option>
                  ))}
                </select>
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
                Password <span>*</span>
              </label>
              <div className="am-input-wrap">
                <LockIcon />
                <input id="amf-pw" className={`am-input${errors.password ? ' am-input--error' : ''}`}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min 8 chars, include a number"
                  value={form.password} onChange={e => set('password', e.target.value)}
                  maxLength={100} autoComplete="new-password" />
                <button type="button" className="am-pw-toggle" onClick={() => setShowPw(p => !p)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && <span className="am-field-error"><AlertTriIcon />{errors.password}</span>}
            </div>

            {/* Confirm password — shown when user changes password */}
            {isPasswordChanged && (
              <div className="am-field">
                <label className="am-label" htmlFor="amf-cpw">Confirm Password <span>*</span></label>
                <div className="am-input-wrap">
                  <LockIcon />
                  <input id="amf-cpw" className={`am-input${errors.confirmPw ? ' am-input--error' : ''}`}
                    type={showCpw ? 'text' : 'password'} placeholder="Re-enter new password to confirm"
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

            {/* Custom Role Privilege Matrix after selecting role */}
            {form.role && (
              <div className="am-field" style={{ marginTop: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <label className="am-label" style={{ margin: 0 }}>Custom Role Privilege Matrix <span>*</span></label>
                  <div className="am-quick-perm-actions">
                    <button type="button" className="am-btn-text" onClick={() => setAllAccountPerms(true)}>
                      Grant All
                    </button>
                    <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                    <button type="button" className="am-btn-text" onClick={() => setAllAccountPerms(false)}>
                      Clear All
                    </button>
                    <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                    <button type="button" className="am-btn-text" onClick={handleResetAccountPerms}>
                      Reset to Saved
                    </button>
                  </div>
                </div>

                <div className="am-privilege-table-wrap">
                  <table className="am-privilege-table">
                    <thead>
                      <tr>
                        <th>Permission Module</th>
                        <th style={{ textTransform: 'uppercase' }}>View</th>
                        <th style={{ textTransform: 'uppercase' }}>Edit</th>
                        <th style={{ textTransform: 'uppercase' }}>Delete</th>
                        {/* <th>Privilege Status</th> */}
                        <th>Quick Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PERMISSION_MODULES.map(m => {
                        const baseRole = roles.find(r => r.id === form.role) || roles[1];
                        const inherited = baseRole?.permissions?.[m.id] || [];
                        const hasOverride = privilegeOverrides[m.id] !== undefined;
                        const activePerms = hasOverride ? privilegeOverrides[m.id] : inherited;
                        const allChecked = ACTIONS.every(a => activePerms.includes(a));
                        const IconComp = MODULE_ICONS[m.id] || <ShieldIcon />;

                        return (
                          <tr key={m.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="am-perm-module-icon">{IconComp}</span>
                                <div>
                                  <strong className="am-priv-mod-label">{m.label}</strong>
                                  <span className="am-priv-mod-desc">{m.desc}</span>
                                </div>
                              </div>
                            </td>
                            {ACTIONS.map(act => (
                              <td key={act} className="am-priv-cb-cell">
                                <label className="am-cb-label">
                                  <input
                                    type="checkbox"
                                    checked={activePerms.includes(act)}
                                    onChange={() => toggleOverridePerm(m.id, act)}
                                  />
                                </label>
                              </td>
                            ))}
                            {/* <td>
                              {hasOverride ? (
                                <span className="am-override-badge am-override-badge--custom">
                                  Custom Override
                                </span>
                              ) : (
                                <span className="am-override-badge am-override-badge--inherited">
                                  Inherited from Role
                                </span>
                              )}
                            </td> */}
                            <td>
                              <button
                                type="button"
                                className="am-btn-text"
                                onClick={() => setAllModuleAccountPerms(m.id, !allChecked)}>
                                {allChecked ? 'Clear' : 'Select All'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
   MANAGE ROLES & USER PRIVILEGES MODAL (Super Admin Only)
   ================================================================ */
const ManageRolesModal = ({ admins, roles, onClose, onCreateRole, onUpdateRole, onDeleteRole, isBusy }) => {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'create' | 'custom_role'

  /* Create role form state */
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRolePerms, setNewRolePerms] = useState({});
  const [createError, setCreateError] = useState('');

  /* Edit custom role state in Manage Role Privileges */
  const customRoles = useMemo(() => roles.filter(r => !r.builtin), [roles]);
  const [selectedEditRoleId, setSelectedEditRoleId] = useState(() => {
    const firstCustom = roles.find(r => !r.builtin);
    return firstCustom ? firstCustom.id : '';
  });
  const [editRoleName, setEditRoleName] = useState('');
  const [editRoleDesc, setEditRoleDesc] = useState('');
  const [editRolePerms, setEditRolePerms] = useState({});
  const [editRoleError, setEditRoleError] = useState('');

  const firstRef = useRef(null);

  useEffect(() => { firstRef.current?.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  /* Sync edit role fields when selected role or roles change */
  const loadRoleForEditing = useCallback((roleId) => {
    const targetRole = roles.find(r => r.id === roleId) || roles.find(r => !r.builtin);
    if (targetRole) {
      setSelectedEditRoleId(targetRole.id);
      setEditRoleName(targetRole.name);
      setEditRoleDesc(targetRole.desc || '');
      setEditRolePerms(targetRole.permissions ? JSON.parse(JSON.stringify(targetRole.permissions)) : {});
      setEditRoleError('');
    } else {
      setSelectedEditRoleId('');
      setEditRoleName('');
      setEditRoleDesc('');
      setEditRolePerms({});
    }
  }, [roles]);

  useEffect(() => {
    if (selectedEditRoleId) {
      const exists = roles.find(r => r.id === selectedEditRoleId);
      if (exists) {
        setEditRoleName(exists.name);
        setEditRoleDesc(exists.desc || '');
        setEditRolePerms(exists.permissions ? JSON.parse(JSON.stringify(exists.permissions)) : {});
      } else {
        loadRoleForEditing(customRoles[0]?.id || '');
      }
    } else if (customRoles.length > 0) {
      loadRoleForEditing(customRoles[0].id);
    }
  }, [roles, selectedEditRoleId, customRoles, loadRoleForEditing]);

  /* Toggle action in Create Role form */
  const toggleCreatePerm = (modId, action) => {
    setNewRolePerms(prev => {
      const current = prev[modId] || [];
      const updated = current.includes(action)
        ? current.filter(a => a !== action)
        : [...current, action];
      return { ...prev, [modId]: updated };
    });
  };

  const setAllModulePerms = (modId, enable) => {
    setNewRolePerms(prev => ({
      ...prev,
      [modId]: enable ? ['view', 'edit', 'delete'] : [],
    }));
  };

  const setAllCreatePerms = (enable) => {
    const newPerms = {};
    PERMISSION_MODULES.forEach(m => {
      newPerms[m.id] = enable ? ['view', 'edit', 'delete'] : [];
    });
    setNewRolePerms(newPerms);
  };

  const handleResetCreateRole = () => {
    setNewRolePerms({});
  };

  /* Toggle action in Edit Role form */
  const toggleEditRolePerm = (modId, action) => {
    setEditRolePerms(prev => {
      const current = prev[modId] || [];
      const updated = current.includes(action)
        ? current.filter(a => a !== action)
        : [...current, action];
      return { ...prev, [modId]: updated };
    });
  };

  const setAllEditModulePerms = (modId, enable) => {
    setEditRolePerms(prev => ({
      ...prev,
      [modId]: enable ? ['view', 'edit', 'delete'] : [],
    }));
  };

  const setAllEditPerms = (enable) => {
    const newPerms = {};
    PERMISSION_MODULES.forEach(m => {
      newPerms[m.id] = enable ? ['view', 'edit', 'delete'] : [];
    });
    setEditRolePerms(newPerms);
  };

  const handleResetEditRole = () => {
    const targetRole = roles.find(r => r.id === selectedEditRoleId);
    if (targetRole) {
      setEditRoleName(targetRole.name);
      setEditRoleDesc(targetRole.desc || '');
      setEditRolePerms(targetRole.permissions ? JSON.parse(JSON.stringify(targetRole.permissions)) : {});
      setEditRoleError('');
    }
  };

  /* Handle Create Role submit */
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const cleanName = sanitize(newRoleName);
    if (!cleanName || cleanName.length < 2) {
      setCreateError('Role name must be at least 2 characters.');
      return;
    }
    const roleId = `role_${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')}`;
    if (roles.some(r => r.id === roleId)) {
      setCreateError('A role with this name or ID already exists.');
      return;
    }
    setCreateError('');
    onCreateRole({
      id: roleId,
      name: cleanName,
      builtin: false,
      desc: sanitize(newRoleDesc) || 'Custom administrative privilege role.',
      permissions: newRolePerms,
    });
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRolePerms({});
    setActiveTab('matrix');
  };

  /* Handle Save Custom Role Changes */
  const handleSaveCustomRole = (e) => {
    e.preventDefault();
    if (!selectedEditRoleId) return;
    const cleanName = sanitize(editRoleName);
    if (!cleanName || cleanName.length < 2) {
      setEditRoleError('Role name must be at least 2 characters.');
      return;
    }
    const duplicate = roles.some(r => r.id !== selectedEditRoleId && r.name.toLowerCase() === cleanName.toLowerCase());
    if (duplicate) {
      setEditRoleError('Another role with this name already exists.');
      return;
    }
    setEditRoleError('');
    if (onUpdateRole) {
      onUpdateRole({
        id: selectedEditRoleId,
        name: cleanName,
        desc: sanitize(editRoleDesc) || 'Custom administrative privilege role.',
        permissions: editRolePerms,
      });
    }
    setActiveTab('matrix');
  };

  /* Switch directly to edit a role from Matrix */
  const handleStartEditRole = (roleId) => {
    loadRoleForEditing(roleId);
    setActiveTab('custom_role');
  };

  const selectedRoleObj = roles.find(r => r.id === selectedEditRoleId);
  const isEditingBuiltin = selectedRoleObj?.builtin;

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true"
      aria-label="User Privilege & Role Management"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="am-modal am-modal--roles">
        <div className="am-modal-header">
          <div className="am-modal-icon am-modal-icon--primary">
            <ShieldIcon />
          </div>
          <div>
            <p className="am-modal-title">Role & Privilege Governance</p>
            <p className="am-modal-subtitle">Configure custom role definitions, granular permission matrix grids, and access levels</p>
          </div>
          <button ref={firstRef} className="am-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <div className="am-modal-body">
          <div className="am-role-tabs">
            <button type="button" className={`am-role-tab${activeTab === 'matrix' ? ' am-role-tab--active' : ''}`}
              onClick={() => setActiveTab('matrix')}>
              <ShieldIcon /> Role Matrix ({roles.length})
            </button>
            <button type="button" className={`am-role-tab${activeTab === 'custom_role' ? ' am-role-tab--active' : ''}`}
              onClick={() => setActiveTab('custom_role')}>
              <ShieldIcon /> Manage Role Privileges ({customRoles.length})
            </button>
            <button type="button" className={`am-role-tab am-role-tab--create${activeTab === 'create' ? ' am-role-tab--create-active' : ''}`}
              onClick={() => setActiveTab('create')}>
              <PlusIcon /> Create Custom Role
            </button>
          </div>

          {/* TAB 1: ROLE MATRIX */}
          {activeTab === 'matrix' && (
            <div className="am-roles-grid">
              {roles.map(r => {
                const memberCount = admins.filter(a => a.role === r.id).length;
                const roleTypeClass = r.id.startsWith('super') ? 'super' : r.builtin ? 'system' : 'custom';

                return (
                  <div key={r.id} className={`am-role-card am-role-card--${roleTypeClass}`}>
                    <div className="am-role-card-header">
                      <div className="am-role-title-wrap">
                        <div className={`am-role-avatar-emblem am-role-avatar-emblem--${roleTypeClass}`}>
                          <ShieldIcon />
                        </div>
                        <div className="am-role-meta-block">
                          <h3 className="am-role-title">{r.name}</h3>
                          <div className="am-role-badge-row">
                            {r.builtin ? (
                              <span className="am-role-builtin-badge">System Role</span>
                            ) : (
                              <span className="am-role-custom-badge">Custom Role</span>
                            )}
                            <span className="am-role-count">{memberCount} member{memberCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      {!r.builtin && (
                        <div className="am-role-custom-actions">
                          <button
                            type="button"
                            className="am-icon-btn"
                            onClick={() => handleStartEditRole(r.id)}
                            disabled={isBusy}
                            title={`Edit ${r.name} custom role privileges & info`}
                            aria-label={`Edit ${r.name} custom role`}>
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            className="am-icon-btn am-icon-btn--danger"
                            onClick={() => onDeleteRole && onDeleteRole(r)}
                            disabled={isBusy}
                            title={`Delete ${r.name} custom role`}
                            aria-label={`Delete ${r.name} custom role`}>
                            <TrashIcon />
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="am-role-desc">{r.desc}</p>

                    {/* Mini Privilege Matrix Table */}
                    <div className="am-privilege-table-wrap">
                      <table className="am-privilege-table">
                        <thead>
                          <tr>
                            <th>Permission Module</th>
                            <th style={{ textTransform: 'uppercase', textAlign: 'center' }}>View</th>
                            <th style={{ textTransform: 'uppercase', textAlign: 'center' }}>Edit</th>
                            <th style={{ textTransform: 'uppercase', textAlign: 'center' }}>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PERMISSION_MODULES.map(m => {
                            const grantedActions = r.permissions?.[m.id] || [];
                            const IconComp = MODULE_ICONS[m.id] || <ShieldIcon />;
                            return (
                              <tr key={m.id}>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span className="am-perm-module-icon">{IconComp}</span>
                                    <span className="am-perm-module-name">{m.label}</span>
                                  </div>
                                </td>
                                {ACTIONS.map(act => (
                                  <td key={act} className="am-priv-cb-cell">
                                    <label className="am-cb-label" title={`${act.toUpperCase()} privilege for ${m.label}: ${grantedActions.includes(act) ? 'Granted' : 'Denied'}`}>
                                      <input
                                        type="checkbox"
                                        checked={grantedActions.includes(act)}
                                        disabled
                                        style={{ pointerEvents: 'none' }}
                                      />
                                    </label>
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: CREATE ROLE */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateSubmit} className="am-role-create-form">
              <p className="am-role-assign-intro">
                Define a new custom role model with granular module privileges. Once created, this role can be assigned when adding or editing admin team members.
              </p>

              {createError && (
                <div className="am-field-error" style={{ marginBottom: 14 }}>
                  <AlertTriIcon /> {createError}
                </div>
              )}

              <div className="am-field-row" style={{ marginBottom: 16 }}>
                <div className="am-field">
                  <label className="am-label" htmlFor="amf-role-name">Role Name <span>*</span></label>
                  <input id="amf-role-name" className="am-input am-input--no-icon"
                    type="text" placeholder="e.g. Marketing Lead"
                    value={newRoleName} onChange={e => setNewRoleName(e.target.value)} maxLength={50} />
                </div>

                <div className="am-field">
                  <label className="am-label" htmlFor="amf-role-desc">Role Description</label>
                  <input id="amf-role-desc" className="am-input am-input--no-icon"
                    type="text" placeholder="Brief summary of duties & access level"
                    value={newRoleDesc} onChange={e => setNewRoleDesc(e.target.value)} maxLength={150} />
                </div>
              </div>

              <div className="am-field" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <label className="am-label" style={{ margin: 0 }}>Custom Role Privilege Matrix <span>*</span></label>
                  <div className="am-quick-perm-actions">
                    <button type="button" className="am-btn-text" onClick={() => setAllCreatePerms(true)}>
                      Grant All
                    </button>
                    <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                    <button type="button" className="am-btn-text" onClick={() => setAllCreatePerms(false)}>
                      Clear All
                    </button>
                    <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                    <button type="button" className="am-btn-text" onClick={handleResetCreateRole}>
                      Reset to Saved
                    </button>
                  </div>
                </div>
                <div className="am-privilege-table-wrap">
                  <table className="am-privilege-table">
                    <thead>
                      <tr>
                        <th>Permission Module</th>
                        <th style={{ textTransform: 'uppercase' }}>View</th>
                        <th style={{ textTransform: 'uppercase' }}>Edit</th>
                        <th style={{ textTransform: 'uppercase' }}>Delete</th>
                        <th>Quick Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PERMISSION_MODULES.map(m => {
                        const cur = newRolePerms[m.id] || [];
                        const allChecked = ACTIONS.every(a => cur.includes(a));
                        const IconComp = MODULE_ICONS[m.id] || <ShieldIcon />;
                        return (
                          <tr key={m.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="am-perm-module-icon">{IconComp}</span>
                                <div>
                                  <strong className="am-priv-mod-label">{m.label}</strong>
                                  <span className="am-priv-mod-desc">{m.desc}</span>
                                </div>
                              </div>
                            </td>
                            {ACTIONS.map(act => (
                              <td key={act} className="am-priv-cb-cell">
                                <label className="am-cb-label">
                                  <input type="checkbox"
                                    checked={cur.includes(act)}
                                    onChange={() => toggleCreatePerm(m.id, act)} />
                                </label>
                              </td>
                            ))}
                            <td>
                              <button type="button" className="am-btn-text"
                                onClick={() => setAllModulePerms(m.id, !allChecked)}>
                                {allChecked ? 'Clear' : 'Select All'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
                <button type="button" className="am-btn am-btn--ghost" onClick={() => setActiveTab('matrix')} disabled={isBusy}>
                  Cancel
                </button>
                <button type="submit" className="am-btn am-btn--primary" disabled={isBusy}>
                  {isBusy && <BtnSpinner />}
                  {isBusy ? 'Saving Role…' : 'Create Role Model'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MANAGE CUSTOM ROLE PRIVILEGES & NAME/DESCRIPTION */}
          {activeTab === 'custom_role' && (
            <form onSubmit={handleSaveCustomRole} className="am-role-edit-form">
              {/* <p className="am-role-assign-intro">
                Select a custom role to update its name, description, and base privilege matrix. Changes will immediately apply to all admins currently assigned to this role.
              </p> */}

              {/* Role Selector */}
              <div className="am-field-row" style={{ marginBottom: 16 }}>
                <div className="am-field">
                  <label className="am-label" htmlFor="amf-edit-role-select">Select Custom Role to Edit <span>*</span></label>
                  {customRoles.length === 0 ? (
                    <div className="am-role-empty-notice">
                      <span>No custom roles found. Create one first.</span>
                      <button type="button" className="am-btn am-btn--primary" style={{ marginLeft: 12 }} onClick={() => setActiveTab('create')}>
                        <PlusIcon /> Create Custom Role
                      </button>
                    </div>
                  ) : (
                    <>
                      <select
                        id="amf-edit-role-select"
                        className="am-select"
                        value={selectedEditRoleId}
                        onChange={e => loadRoleForEditing(e.target.value)}>
                        {customRoles.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      {selectedEditRoleId && (
                        <span className="am-field-hint">
                          Assigned to {admins.filter(a => a.role === selectedEditRoleId).length} admin account(s)
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {selectedEditRoleId && selectedRoleObj && (
                <>
                  {editRoleError && (
                    <div className="am-field-error" style={{ marginBottom: 14 }}>
                      <AlertTriIcon /> {editRoleError}
                    </div>
                  )}

                  {/* Name and Description Inputs */}
                  <div className="am-field-row" style={{ marginBottom: 16 }}>
                    <div className="am-field">
                      <label className="am-label" htmlFor="amf-edit-name">Role Name <span>*</span></label>
                      <input
                        id="amf-edit-name"
                        className="am-input am-input--no-icon"
                        type="text"
                        placeholder="e.g. Content Manager"
                        value={editRoleName}
                        onChange={e => { setEditRoleName(e.target.value); setEditRoleError(''); }}
                        maxLength={50}
                        disabled={isEditingBuiltin}
                      />
                    </div>

                    <div className="am-field">
                      <label className="am-label" htmlFor="amf-edit-desc">Role Description</label>
                      <input
                        id="amf-edit-desc"
                        className="am-input am-input--no-icon"
                        type="text"
                        placeholder="Brief description of this role's permissions & duties"
                        value={editRoleDesc}
                        onChange={e => setEditRoleDesc(e.target.value)}
                        maxLength={150}
                      />
                    </div>
                  </div>

                  {/* Privilege Grid Checklist */}
                  <div className="am-field" style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                      <label className="am-label" style={{ margin: 0 }}>Custom Role Privilege Matrix <span>*</span></label>
                      <div className="am-quick-perm-actions">
                        <button type="button" className="am-btn-text" onClick={() => setAllEditPerms(true)}>
                          Grant All
                        </button>
                        <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                        <button type="button" className="am-btn-text" onClick={() => setAllEditPerms(false)}>
                          Clear All
                        </button>
                        <span style={{ color: 'var(--border-strong)', padding: '0 4px' }}>|</span>
                        <button type="button" className="am-btn-text" onClick={handleResetEditRole}>
                          Reset to Saved
                        </button>
                      </div>
                    </div>

                    <div className="am-privilege-table-wrap">
                      <table className="am-privilege-table">
                        <thead>
                          <tr>
                            <th>Permission Module</th>
                            <th style={{ textTransform: 'uppercase' }}>View</th>
                            <th style={{ textTransform: 'uppercase' }}>Edit</th>
                            <th style={{ textTransform: 'uppercase' }}>Delete</th>
                            <th>Quick Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PERMISSION_MODULES.map(m => {
                            const cur = editRolePerms[m.id] || [];
                            const allChecked = ACTIONS.every(a => cur.includes(a));
                            const IconComp = MODULE_ICONS[m.id] || <ShieldIcon />;
                            return (
                              <tr key={m.id}>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span className="am-perm-module-icon">{IconComp}</span>
                                    <div>
                                      <strong className="am-priv-mod-label">{m.label}</strong>
                                      <span className="am-priv-mod-desc">{m.desc}</span>
                                    </div>
                                  </div>
                                </td>
                                {ACTIONS.map(act => (
                                  <td key={act} className="am-priv-cb-cell">
                                    <label className="am-cb-label">
                                      <input type="checkbox"
                                        checked={cur.includes(act)}
                                        onChange={() => toggleEditRolePerm(m.id, act)} />
                                    </label>
                                  </td>
                                ))}
                                <td>
                                  <button type="button" className="am-btn-text"
                                    onClick={() => setAllEditModulePerms(m.id, !allChecked)}>
                                    {allChecked ? 'Clear' : 'Select All'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
                    <button type="button" className="am-btn am-btn--ghost" onClick={handleResetEditRole} disabled={isBusy}>
                      Reset Changes
                    </button>
                    <button type="submit" className="am-btn am-btn--primary" disabled={isBusy}>
                      {isBusy && <BtnSpinner />}
                      {isBusy ? 'Saving Role Changes…' : 'Save Role Changes'}
                    </button>
                  </div>
                </>
              )}
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
  const [roles, setRoles] = useState(INITIAL_ROLES);
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

  const handleCreateRole = useCallback((newRole) => {
    setIsBusy(true);
    setTimeout(() => {
      setRoles(p => [...p, newRole]);
      addAudit('create', `Created custom role model <strong>${newRole.name}</strong>`);
      showToast('success', `Role "${newRole.name}" created successfully.`);
      setIsBusy(false);
    }, 500);
  }, [addAudit, showToast]);

  const handleUpdateRole = useCallback((updatedRole) => {
    setIsBusy(true);
    setTimeout(() => {
      setRoles(prev => prev.map(r => r.id === updatedRole.id ? { ...r, ...updatedRole } : r));
      addAudit('update', `Updated custom role model <strong>${updatedRole.name}</strong> privileges and info`);
      showToast('success', `Custom role "${updatedRole.name}" updated successfully.`);
      setIsBusy(false);
    }, 500);
  }, [addAudit, showToast]);

  const handleDeleteRole = useCallback((roleToDelete) => {
    if (roleToDelete.builtin) return;
    setIsBusy(true);
    setTimeout(() => {
      setAdmins(prev => prev.map(a => a.role === roleToDelete.id ? { ...a, role: 'admin', sessionActive: false } : a));
      setRoles(prev => prev.filter(r => r.id !== roleToDelete.id));
      addAudit('delete', `Deleted custom role model <strong>${roleToDelete.name}</strong>`);
      showToast('warn', `Role "${roleToDelete.name}" deleted. Assigned users reverted to Admin.`);
      setIsBusy(false);
    }, 500);
  }, [addAudit, showToast]);

  const handleUpdatePrivileges = useCallback((target, assignedRole, privilegeOverrides) => {
    setIsBusy(true);
    setTimeout(() => {
      setAdmins(p => p.map(a =>
        a.id === target.id
          ? { ...a, role: assignedRole, privilegeOverrides, sessionActive: false }
          : a
      ));
      const rName = roles.find(r => r.id === assignedRole)?.name || assignedRole;
      addAudit('update', `Updated privileges & role for <strong>${target.name}</strong> → ${rName}`);
      showToast('success', `Privileges updated for "${target.name}". Active session revoked.`);
      setIsBusy(false);
      setModal(null);
    }, 600);
  }, [roles, addAudit, showToast]);

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
          Admin Management is only accessible to Super Admins.
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
                  <td data-label="Role"><RoleBadge role={a.role} roles={roles} /></td>

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
          roles={roles}
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
          roles={roles}
          onClose={() => setModal(null)}
          onCreateRole={handleCreateRole}
          onUpdateRole={handleUpdateRole}
          onDeleteRole={handleDeleteRole}
          onUpdatePrivileges={handleUpdatePrivileges}
          isBusy={isBusy}
        />
      )}
    </>
  );
};

export default AdminManagementSection;
