import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Settings.css';

/* ─── SVG Icons ────────────────────────────────────────────── */
const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.73l.15.1a2 2 0 0 1 0 2l-.08.15a2 2 0 0 0 0 2l.15.08a2 2 0 0 1 .73 2.73l-.1.15a2 2 0 0 0 2.73 2.73l.1-.15a2 2 0 0 1 2.73-.73l.15.08a2 2 0 0 0 2 0l.43-.25a2 2 0 0 1 1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.73l-.15-.1a2 2 0 0 1 0-2l.08-.15a2 2 0 0 0 0-2l-.15-.08a2 2 0 0 1-.73-2.73l.1-.15a2 2 0 0 0-2.73-2.73l-.1.15a2 2 0 0 1-2.73.73l-.15-.08a2 2 0 0 0-2 0l-.43.25a2 2 0 0 1-1 1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
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
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);
const KeyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);
const LayoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Settings Section component ──────────────────────────── */
const SettingsSection = ({ icon, iconCls, title, sub, children }) => (
  <div className="settings-section ph-card">
    <div className="ph-card-head">
      <div className={`ph-card-icon ${iconCls}`}>{icon}</div>
      <div>
        <div className="ph-card-title">{title}</div>
        <div className="ph-card-sub">{sub}</div>
      </div>
    </div>
    <div className="settings-section-body">
      {children}
    </div>
  </div>
);

/* ─── Toggle Row component ─────────────────────────────────── */
const ToggleRow = ({ id, label, sub, checked, onChange }) => (
  <div className="settings-toggle-row">
    <div className="settings-toggle-info">
      <label className="settings-toggle-label" htmlFor={id}>{label}</label>
      {sub && <div className="settings-toggle-sub">{sub}</div>}
    </div>
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`settings-toggle${checked ? ' settings-toggle--on' : ''}`}
    >
      <span className="settings-toggle-thumb" />
    </button>
  </div>
);

/* ─── Settings Page ──────────────────────────────────────────── */
const Settings = () => {
  const { user, logout, resetPassword } = useAuth();

  /* ── Notifications prefs ── */
  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    readyForPickup: true,
    promos: false,
    newsletters: false,
    sms: true,
  });

  /* ── Print defaults ── */
  const [printDefaults, setPrintDefaults] = useState({
    color: 'bw',          // 'bw' | 'color'
    sides: 'single',      // 'single' | 'double'
    orientation: 'portrait', // 'portrait' | 'landscape'
    paperSize: 'A4',
    binding: 'none',
    copies: 1,
  });

  /* ── Security ── */
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  /* ── Privacy ── */
  const [privacy, setPrivacy] = useState({
    analytics: true,
    saveHistory: true,
  });

  /* ── Appearance ── */
  const [appearance, setAppearance] = useState({
    theme: 'system',  // 'light' | 'dark' | 'system'
    density: 'comfortable', // 'comfortable' | 'compact'
  });

  /* ── Saved toast ── */
  const [toast, setToast] = useState(null);

  if (!user) return <Navigate to="/auth" />;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveNotifs = () => showToast('Notification preferences saved.');
  const handleSavePrint = () => showToast('Default print settings saved.');
  const handleSaveAppearance = () => showToast('Appearance settings saved.');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!pwForm.current) { setPwError('Enter your current password.'); return; }
    if (pwForm.next.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return; }
    const result = resetPassword({ identifier: user.identifier, newPassword: pwForm.next });
    if (result.ok) {
      setPwSuccess(true);
      setPwError('');
      setPwForm({ current: '', next: '', confirm: '' });
      showToast('Password updated successfully.');
      setTimeout(() => setPwSuccess(false), 3000);
    } else {
      setPwError(result.error || 'Failed to update password.');
    }
  };

  const PAPER_SIZES = ['A4', 'A3', 'Letter', 'Legal'];
  const BINDING_OPTIONS = ['None', 'Staple', 'Spiral', 'Glue'];
  const THEME_OPTIONS = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  return (
    <div className="settings-page">
      <div className="settings-wrap">

        {/* ── Eyebrow ── */}
        <div className="settings-eyebrow fade-up">
          <SettingsIcon />
          <span>Settings</span>
        </div>

        {/* ── Toast ── */}
        {toast && (
          <div className={`ph-toast ph-toast--${toast.type} fade-up`} role="status">
            <CheckIcon />
            {toast.msg}
          </div>
        )}

        <div className="settings-grid">

          {/* ── Notifications ── */}
          <SettingsSection icon={<BellIcon />} iconCls="ph-card-icon--primary" title="Notifications" sub="Control how PrintHub keeps you informed">
            <ToggleRow id="notif-order"    label="Order Updates"       sub="Status changes for your orders"           checked={notifs.orderUpdates}  onChange={(v) => setNotifs(n => ({ ...n, orderUpdates: v }))} />
            <ToggleRow id="notif-pickup"   label="Ready for Pickup"    sub="Alert when your order is ready"           checked={notifs.readyForPickup} onChange={(v) => setNotifs(n => ({ ...n, readyForPickup: v }))} />
            <ToggleRow id="notif-sms"      label="SMS Notifications"   sub="Receive messages on your mobile"          checked={notifs.sms}           onChange={(v) => setNotifs(n => ({ ...n, sms: v }))} />
            <ToggleRow id="notif-promos"   label="Promotions & Offers" sub="Deals and special discounts"              checked={notifs.promos}        onChange={(v) => setNotifs(n => ({ ...n, promos: v }))} />
            <ToggleRow id="notif-news"     label="Newsletter"          sub="Monthly tips and product updates"         checked={notifs.newsletters}   onChange={(v) => setNotifs(n => ({ ...n, newsletters: v }))} />
            <div className="settings-section-footer">
              <button className="ph-btn ph-btn--primary ph-btn--sm" onClick={handleSaveNotifs}>
                <SaveIcon /> Save Preferences
              </button>
            </div>
          </SettingsSection>

          {/* ── Print Defaults ── */}
          <SettingsSection icon={<PrinterIcon />} iconCls="ph-card-icon--accent" title="Print Defaults" sub="Pre-fill settings when placing new orders">
            {/* Color Mode */}
            <div className="settings-field-row">
              <div className="settings-field-info">
                <div className="settings-field-label">Color Mode</div>
                <div className="settings-field-sub">Default print color preference</div>
              </div>
              <div className="settings-pill-group">
                {[{ v: 'bw', l: 'B&W' }, { v: 'color', l: 'Color' }].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`settings-pill${printDefaults.color === v ? ' settings-pill--active' : ''}`}
                    onClick={() => setPrintDefaults(p => ({ ...p, color: v }))}
                  >{l}</button>
                ))}
              </div>
            </div>

            {/* Sides */}
            <div className="settings-field-row">
              <div className="settings-field-info">
                <div className="settings-field-label">Sides</div>
                <div className="settings-field-sub">Single or double-sided printing</div>
              </div>
              <div className="settings-pill-group">
                {[{ v: 'single', l: 'Single' }, { v: 'double', l: 'Double' }].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`settings-pill${printDefaults.sides === v ? ' settings-pill--active' : ''}`}
                    onClick={() => setPrintDefaults(p => ({ ...p, sides: v }))}
                  >{l}</button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="settings-field-row">
              <div className="settings-field-info">
                <div className="settings-field-label">Orientation</div>
                <div className="settings-field-sub">Page orientation</div>
              </div>
              <div className="settings-pill-group">
                {[{ v: 'portrait', l: 'Portrait' }, { v: 'landscape', l: 'Landscape' }].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`settings-pill${printDefaults.orientation === v ? ' settings-pill--active' : ''}`}
                    onClick={() => setPrintDefaults(p => ({ ...p, orientation: v }))}
                  >{l}</button>
                ))}
              </div>
            </div>

            {/* Paper size + Binding */}
            <div className="settings-inline-grid">
              <div className="settings-field-col">
                <label className="settings-field-label" htmlFor="paper-size">Paper Size</label>
                <select
                  id="paper-size"
                  className="settings-select"
                  value={printDefaults.paperSize}
                  onChange={(e) => setPrintDefaults(p => ({ ...p, paperSize: e.target.value }))}
                >
                  {PAPER_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="settings-field-col">
                <label className="settings-field-label" htmlFor="binding-type">Binding</label>
                <select
                  id="binding-type"
                  className="settings-select"
                  value={printDefaults.binding}
                  onChange={(e) => setPrintDefaults(p => ({ ...p, binding: e.target.value }))}
                >
                  {BINDING_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="settings-field-col">
                <label className="settings-field-label" htmlFor="default-copies">Default Copies</label>
                <input
                  id="default-copies"
                  type="number"
                  min={1}
                  max={99}
                  className="settings-input"
                  value={printDefaults.copies}
                  onChange={(e) => setPrintDefaults(p => ({ ...p, copies: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="settings-section-footer">
              <button className="ph-btn ph-btn--primary ph-btn--sm" onClick={handleSavePrint}>
                <SaveIcon /> Save Defaults
              </button>
            </div>
          </SettingsSection>

          {/* ── Appearance ── */}
          <SettingsSection icon={<LayoutIcon />} iconCls="ph-card-icon--info" title="Appearance" sub="Customize the look and feel of PrintHub">
            {/* Theme */}
            <div className="settings-field-row">
              <div className="settings-field-info">
                <div className="settings-field-label">Theme</div>
                <div className="settings-field-sub">Light, dark, or follow system</div>
              </div>
              <div className="settings-theme-group">
                {THEME_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    className={`settings-theme-btn${appearance.theme === value ? ' settings-theme-btn--active' : ''}`}
                    onClick={() => setAppearance(a => ({ ...a, theme: value }))}
                  >
                    <span className={`settings-theme-swatch settings-theme-swatch--${value}`} />
                    {label}
                    {appearance.theme === value && <CheckIcon />}
                  </button>
                ))}
              </div>
            </div>

            {/* Density */}
            <div className="settings-field-row">
              <div className="settings-field-info">
                <div className="settings-field-label">Density</div>
                <div className="settings-field-sub">Adjust spacing across the app</div>
              </div>
              <div className="settings-pill-group">
                {[{ v: 'comfortable', l: 'Comfortable' }, { v: 'compact', l: 'Compact' }].map(({ v, l }) => (
                  <button
                    key={v}
                    className={`settings-pill${appearance.density === v ? ' settings-pill--active' : ''}`}
                    onClick={() => setAppearance(a => ({ ...a, density: v }))}
                  >{l}</button>
                ))}
              </div>
            </div>

            <div className="settings-section-footer">
              <button className="ph-btn ph-btn--primary ph-btn--sm" onClick={handleSaveAppearance}>
                <SaveIcon /> Save Appearance
              </button>
            </div>
          </SettingsSection>

          {/* ── Security ── */}
          <SettingsSection icon={<KeyIcon />} iconCls="ph-card-icon--success" title="Security" sub="Manage your password and account security">
            <form className="settings-pw-form" onSubmit={handlePasswordChange} noValidate>
              <div className="settings-pw-field">
                <label className="settings-field-label" htmlFor="pw-current">Current Password</label>
                <input
                  id="pw-current"
                  type="password"
                  className="settings-input"
                  placeholder="••••••••"
                  value={pwForm.current}
                  onChange={(e) => setPwForm(f => ({ ...f, current: e.target.value }))}
                  autoComplete="current-password"
                />
              </div>
              <div className="settings-pw-row">
                <div className="settings-pw-field">
                  <label className="settings-field-label" htmlFor="pw-new">New Password</label>
                  <input
                    id="pw-new"
                    type="password"
                    className="settings-input"
                    placeholder="Min. 6 characters"
                    value={pwForm.next}
                    onChange={(e) => setPwForm(f => ({ ...f, next: e.target.value }))}
                    autoComplete="new-password"
                  />
                </div>
                <div className="settings-pw-field">
                  <label className="settings-field-label" htmlFor="pw-confirm">Confirm Password</label>
                  <input
                    id="pw-confirm"
                    type="password"
                    className="settings-input"
                    placeholder="Repeat new password"
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              {pwError && <div className="settings-error">{pwError}</div>}
              {pwSuccess && <div className="settings-success"><CheckIcon /> Password updated.</div>}
              <div className="settings-section-footer">
                <button type="submit" className="ph-btn ph-btn--primary ph-btn--sm">
                  <ShieldIcon /> Update Password
                </button>
              </div>
            </form>
          </SettingsSection>

          {/* ── Privacy ── */}
          <SettingsSection icon={<ShieldIcon />} iconCls="ph-card-icon--muted" title="Privacy" sub="Manage your data and history">
            <ToggleRow id="priv-analytics" label="Usage Analytics"  sub="Help improve PrintHub by sharing anonymous data"    checked={privacy.analytics}    onChange={(v) => setPrivacy(p => ({ ...p, analytics: v }))} />
            <ToggleRow id="priv-history"   label="Save Print History" sub="Store order history for quick reordering"        checked={privacy.saveHistory}  onChange={(v) => setPrivacy(p => ({ ...p, saveHistory: v }))} />
            <div className="settings-section-footer">
              <button className="ph-btn ph-btn--ghost ph-btn--sm" onClick={() => showToast('Privacy settings saved.')}>
                <SaveIcon /> Save Privacy
              </button>
            </div>
          </SettingsSection>

          {/* ── Danger Zone ── */}
          <div className="settings-section settings-danger-zone ph-card">
            <div className="ph-card-head">
              <div className="ph-card-icon ph-card-icon--danger"><TrashIcon /></div>
              <div>
                <div className="ph-card-title settings-danger-title">Danger Zone</div>
                <div className="ph-card-sub">Irreversible actions for your account</div>
              </div>
            </div>
            <div className="settings-section-body">
              <div className="settings-danger-row">
                <div>
                  <div className="settings-field-label">Sign Out of All Devices</div>
                  <div className="settings-field-sub">This will end all active sessions immediately.</div>
                </div>
                <button className="ph-btn ph-btn--danger-outline ph-btn--sm" onClick={logout}>
                  Sign Out Everywhere
                </button>
              </div>
              <div className="settings-danger-row">
                <div>
                  <div className="settings-field-label">Delete Account</div>
                  <div className="settings-field-sub">Permanently delete your account and all data. This cannot be undone.</div>
                </div>
                <button className="ph-btn ph-btn--danger ph-btn--sm" onClick={() => showToast('Contact support to delete your account.', 'warn')}>
                  <TrashIcon /> Delete Account
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
