import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

/* ─── SVG Icons ────────────────────────────────────────────── */
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" />
  </svg>
);
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
  </svg>
);
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const PrinterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
  </svg>
);
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const USER_TYPE_LABELS = {
  regular: 'Regular User',
  student: 'Student',
  institute: 'Institute',
};
const USER_TYPE_COLORS = {
  regular: 'badge--primary',
  student: 'badge--accent',
  institute: 'badge--info',
};

/* ─── Profile Page ──────────────────────────────────────────── */
const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    mobile: user?.mobile || user?.identifier || '',
  });
  const [saved, setSaved] = useState(false);

  if (!user) return <Navigate to="/auth" />;

  const displayName = user.username || user.name || user.identifier || 'User';
  const initials = displayName
    .split(/[\s.]+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'N/A';

  const handleSave = () => {
    // Mock save
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-page">
      <div className="profile-wrap-page">

        {/* ── Page Header Eyebrow ── */}
        <div className="profile-page-eyebrow fade-up">
          <UserIcon />
          <span>My Profile</span>
        </div>

        {/* ── Hero Card ── */}
        <div className="profile-hero-card fade-up">
          <div className="profile-hero-bg" aria-hidden="true" />

          <div className="profile-hero-content">
            {/* Avatar */}
            <div className="profile-hero-avatar">
              <span>{initials}</span>
              <div className="profile-hero-avatar-ring" aria-hidden="true" />
            </div>

            {/* Info */}
            <div className="profile-hero-info">
              <div className="profile-hero-name">{displayName}</div>
              <div className="profile-hero-meta">
                <span className={`ph-badge ${USER_TYPE_COLORS[user.userType] || 'badge--primary'}`}>
                  <BadgeIcon />
                  {USER_TYPE_LABELS[user.userType] || 'Member'}
                </span>
                <span className="ph-badge badge--muted">
                  <CalendarIcon />
                  Joined {joinDate}
                </span>
              </div>

            </div>

            {/* Edit toggle */}
            <div className="profile-hero-actions">
              {!editing ? (
                <button className="ph-btn ph-btn--ghost" onClick={() => setEditing(true)}>
                  <EditIcon /> Edit Profile
                </button>
              ) : (
                <div className="ph-btn-group">
                  <button className="ph-btn ph-btn--primary" onClick={handleSave}>
                    <SaveIcon /> Save
                  </button>
                  <button className="ph-btn ph-btn--ghost" onClick={() => setEditing(false)}>
                    <XIcon /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Save toast ── */}
        {saved && (
          <div className="ph-toast ph-toast--success" role="status">
            <BadgeIcon />
            Profile saved successfully!
          </div>
        )}

        {/* ── Details Grid ── */}
        <div className="profile-grid">

          {/* Personal Info card */}
          <div className="ph-card fade-up">
            <div className="ph-card-head">
              <div className="ph-card-icon ph-card-icon--primary"><UserIcon /></div>
              <div>
                <div className="ph-card-title">Personal Information</div>
                <div className="ph-card-sub">Your account details</div>
              </div>
            </div>
            <div className="ph-card-body">
              <div className="ph-field-group">
                <label className="ph-label" htmlFor="profile-username">Display Name</label>
                {editing ? (
                  <input
                    id="profile-username"
                    className="ph-input"
                    value={form.username}
                    onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="Your display name"
                  />
                ) : (
                  <div className="ph-field-value">{form.username || <span className="ph-field-empty">Not set</span>}</div>
                )}
              </div>

              <div className="ph-field-group">
                <label className="ph-label" htmlFor="profile-mobile">Mobile Number</label>
                {editing ? (
                  <div className="ph-input-wrap">
                    <PhoneIcon />
                    <input
                      id="profile-mobile"
                      className="ph-input ph-input--icon"
                      value={form.mobile}
                      onChange={(e) => setForm(f => ({ ...f, mobile: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                ) : (
                  <div className="ph-field-value">
                    <PhoneIcon />
                    {form.mobile || <span className="ph-field-empty">Not set</span>}
                  </div>
                )}
              </div>

              <div className="ph-field-group">
                <label className="ph-label">Account ID</label>
                <div className="ph-field-value ph-field-value--mono">{user.id || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Account Details card */}
          <div className="ph-card fade-up">
            <div className="ph-card-head">
              <div className="ph-card-icon ph-card-icon--accent"><ShieldIcon /></div>
              <div>
                <div className="ph-card-title">Account Details</div>
                <div className="ph-card-sub">Membership & security</div>
              </div>
            </div>
            <div className="ph-card-body">
              <div className="ph-field-group">
                <label className="ph-label">Account Type</label>
                <div className="ph-field-value">
                  <span className={`ph-badge ${USER_TYPE_COLORS[user.userType] || 'badge--primary'}`}>
                    {USER_TYPE_LABELS[user.userType] || 'Member'}
                  </span>
                </div>
              </div>

              <div className="ph-field-group">
                <label className="ph-label">Auth Provider</label>
                <div className="ph-field-value">
                  {user.provider === 'google' ? (
                    <span className="ph-badge badge--muted">Google</span>
                  ) : (
                    <span className="ph-badge badge--muted">Email / Mobile</span>
                  )}
                </div>
              </div>

              <div className="ph-field-group">
                <label className="ph-label">Member Since</label>
                <div className="ph-field-value">
                  <CalendarIcon />
                  {joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Snapshot */}
          <div className="ph-card ph-card--wide fade-up">
            <div className="ph-card-head">
              <div className="ph-card-icon ph-card-icon--success"><PrinterIcon /></div>
              <div>
                <div className="ph-card-title">Print Activity</div>
                <div className="ph-card-sub">Your printing summary this month</div>
              </div>
            </div>
            <div className="ph-card-body ph-activity-grid">
              {[
                { label: 'Total Orders', value: '12', unit: 'orders', color: 'var(--primary)' },
                { label: 'Pages Printed', value: '347', unit: 'pages', color: 'var(--success)' },
                { label: 'Money Saved', value: '₹480', unit: 'vs retail', color: 'var(--accent)' },
                { label: 'Avg. Turn-around', value: '~2h', unit: 'per order', color: 'var(--info)' },
              ].map((item) => (
                <div className="ph-activity-item" key={item.label}>
                  <div className="ph-activity-value" style={{ color: item.color }}>{item.value}</div>
                  <div className="ph-activity-label">{item.label}</div>
                  <div className="ph-activity-unit">{item.unit}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
