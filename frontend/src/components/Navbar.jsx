import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

/* ─── SVG Icons ─────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
  </svg>
);

const PackageIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-7" /><path d="M12 22V12" />
  </svg>
);

const CartIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const ChevronDown = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const LogInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" x2="3" y1="12" y2="12" />
  </svg>
);

const UserPlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 1 0 0-2.73 2.73l.15.1a2 2 0 0 1 0 2l-.08.15a2 2 0 0 0 0 2l.15.08a2 2 0 0 1 .73 2.73l-.1.15a2 2 1 0 0 2.73 2.73l.1-.15a2 2 0 0 1 2.73-.73l.15.08a2 2 0 0 0 2 0l.43-.25a2 2 0 0 1 1-1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 1 0 0 2.73-2.73l-.15-.1a2 2 0 0 1 0-2l.08-.15a2 2 0 0 0 0-2l-.15-.08a2 2 0 0 1-.73-2.73l.1-.15a2 2 1 0 0-2.73-2.73l-.1.15a2 2 0 0 1-2.73.73l-.15-.08a2 2 0 0 0-2 0l-.43.25a2 2 0 0 1-1 1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

/* ─── Component ──────────────────────────────────────────────────────────── */
const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const [cartCount] = useState(2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  const displayName = user?.username || user?.name || user?.identifier || 'Account';
  const initials = displayName !== 'Account'
    ? displayName.split(/[\s.]+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase()
    : 'PH';

  return (
    <>
      {/* ── Top Utility Bar ── */}
      <div className={`topbar${scrolled ? ' topbar--hidden' : ''}`} role="complementary" aria-label="Contact and quick actions">
        <div className="topbar-inner">
          <div className="topbar-contact">
            <a href="tel:+18005557768" className="topbar-link">
              <PhoneIcon />
              <span>+1 (800) 555-PRNT</span>
            </a>
            <span className="topbar-dot" aria-hidden="true" />
            <a href="mailto:support@printhub.com" className="topbar-link">
              <MailIcon />
              <span>support@printhub.com</span>
            </a>
          </div>

          <nav className="topbar-actions" aria-label="Quick links">
            <a href="#contact" className="topbar-action">
              <MapPinIcon />
              <span>Store Locator</span>
            </a>
            <span className="topbar-sep" aria-hidden="true" />
            <a href="#faq" className="topbar-action">
              <QuestionIcon />
              <span>FAQ</span>
            </a>
            <span className="topbar-sep" aria-hidden="true" />
            <a href="#track" className="topbar-action">
              <PackageIcon />
              <span>Track Order</span>
            </a>
          </nav>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
        <div className="navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-brand" aria-label="PrintHub — go to homepage">
            <img src="/Printhub_logo.png" alt="PrintHub" className="navbar-logo" />
          </Link>

          {/* Primary nav — desktop/tablet */}
          <nav className="navbar-nav" aria-label="Primary navigation">
            <Link to="/print/normal" className={`nav-link${location.pathname === '/print/normal' ? ' nav-link--active' : ''}`}>Normal Print</Link>
            <a href="#about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Right-side actions */}
          <div className="navbar-actions">

            {user ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="icon-btn cart-btn" aria-label={`Cart — ${cartCount} items`}>
                  <CartIcon />
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>

                {/* Profile */}
                <div className="profile-wrap" ref={profileRef}>
                  <button
                    className="profile-trigger"
                    onClick={() => setProfileOpen(v => !v)}
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    aria-label="Open account menu"
                  >
                    <span className="profile-avatar">{initials}</span>
                    <span className="profile-name-short">{displayName.split(' ')[0]}</span>
                    <span className={`chevron${profileOpen ? ' chevron--up' : ''}`}><ChevronDown /></span>
                  </button>

                  {profileOpen && (
                    <div className="profile-menu" role="menu" aria-label="Account menu">
                      <div className="profile-menu-header">
                        <div className="profile-avatar profile-avatar--lg">{initials}</div>
                        <div>
                          <div className="profile-full-name">{displayName}</div>
                          <div className="profile-email">{user.email || user.mobile || ''}</div>
                        </div>
                      </div>
                      <div className="profile-menu-body">
                        <a href="#profile" className="profile-item" role="menuitem"><UserIcon />    Profile</a>
                        <a href="#orders" className="profile-item" role="menuitem"><PackageIcon /> Orders</a>
                        <a href="#settings" className="profile-item" role="menuitem"><SettingsIcon />Settings</a>
                      </div>
                      <div className="profile-menu-footer">
                        <button className="profile-item profile-item--danger" onClick={logout} role="menuitem">
                          <SignOutIcon /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Auth button — always visible on ALL screen sizes */
              <div className="auth-btns">
                <button
                  type="button"
                  className="btn-primary"
                  id="nav-auth-btn"
                  onClick={() => setAuthOpen(true)}
                >
                  <UserIcon />
                  <span>SignUp/In</span>
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className={`hamburger${mobileOpen ? ' hamburger--active' : ''}`}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
              <span className="hamburger-bar" />
            </button>
          </div>
        </div>

      </header>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        className={`mobile-menu${mobileOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu-inner">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#about" className="mobile-link" onClick={() => setMobileOpen(false)}>About Us</a>
            <a href="#services" className="mobile-link" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="#contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Contact</a>
          </nav>

          {user && (
            <>
              <div className="mobile-menu-divider" role="separator" />
              <div className="mobile-profile-section">
                <div className="mobile-profile-info">
                  <div className="profile-avatar profile-avatar--md">{initials}</div>
                  <div>
                    <div className="mobile-profile-name">{user.name || 'Account'}</div>
                    <div className="mobile-profile-email">{user.email || ''}</div>
                  </div>
                </div>
                <button className="mobile-signout" onClick={() => { logout(); setMobileOpen(false); }}>
                  <SignOutIcon /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Auth modal ── */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;