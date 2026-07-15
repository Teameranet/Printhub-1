import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminDashboard.css';

/* ─── Icons ──────────────────────────────────────────────────── */
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const GridIcon       = () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />;
const UsersIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ShoppingBagIcon= () => <Icon d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z","M3 6h18","M16 10a4 4 0 0 1-8 0"]} />;
const PrinterIcon    = () => <Icon d={["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"]} />;
const LayersIcon     = () => <Icon d={["M12 2 2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"]} />;
const TagIcon        = () => <Icon d={["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z","M7 7h.01"]} />;
const PaperSizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M8 14h8"/><path d="M8 12v4"/><path d="M16 12v4"/>
  </svg>
);
const PaperTypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const BindingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M2 7h4"/><path d="M2 12h4"/><path d="M2 17h4"/>
  </svg>
);
const LaminationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M11.5 13 L12.5 15.5 L15 16.5 L12.5 17.5 L11.5 20 L10.5 17.5 L8 16.5 L10.5 15.5 Z" />
  </svg>
);
const LogOutIcon     = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="20" y1="6"  y2="6"/>
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
const TrendingDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);
const DollarSignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const ServiceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);
const PriceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13l8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
);

/* ─── Nav items ──────────────────────────────────────────────── */
const NAV_GROUPS = [
  {
    title: 'General',
    items: [
      { id: 'overview',     label: 'Dashboard',               Icon: GridIcon },
      { id: 'users',        label: 'User Management',         Icon: UsersIcon },
      { id: 'orders',       label: 'Order Management',        Icon: ShoppingBagIcon },
    ]
  },
  {
    title: 'Service Controls',
    items: [
      { id: 'services',     label: 'Service Management',      Icon: ServiceIcon },
      { id: 'prices',       label: 'Price Management',        Icon: PriceIcon },
      { id: 'normal-print', label: 'Normal Print Management', Icon: PrinterIcon },
    ]
  },
  {
    title: 'Print Settings',
    items: [
      { id: 'paper-sizes',  label: 'Paper Size',              Icon: PaperSizeIcon },
      { id: 'paper-types',  label: 'Paper Type',              Icon: PaperTypeIcon },
      { id: 'binding',      label: 'Binding',                 Icon: BindingIcon },
      { id: 'lamination',   label: 'Lamination',              Icon: LaminationIcon },
    ]
  }
];

const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);

/* ─── Placeholder section components ────────────────────────── */
const StatCard = ({ label, value, trendText, trendUp, color, icon: IconComponent }) => (
  <div className="ad-stat-card" style={{ '--stat-color': color }}>
    <div className="ad-stat-bg-icon" aria-hidden="true" style={{ color: color }}>
      <IconComponent />
    </div>
    <div className="ad-stat-header">
      <div className="ad-stat-label">{label}</div>
    </div>
    <div className="ad-stat-value">{value}</div>
    <div className={`ad-stat-trend ${trendUp ? 'ad-stat-trend--up' : 'ad-stat-trend--down'}`}>
      <span className="ad-stat-trend-arrow">
         {trendUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
      </span>
      <span className="ad-stat-trend-text">{trendText}</span>
      <span className="ad-stat-trend-vs">vs last period</span>
    </div>
  </div>
);

const PlaceholderSection = ({ title, description }) => (
  <div className="ad-section-placeholder">
    <div className="ad-section-placeholder-icon" aria-hidden="true">
      <LayersIcon />
    </div>
    <h2 className="ad-section-placeholder-title">{title}</h2>
    <p className="ad-section-placeholder-desc">{description}</p>
    <div className="ad-section-placeholder-badge">Coming Soon</div>
  </div>
);

const OverviewSection = ({ admin }) => {
  const dateStr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  
  return (
  <div className="ad-overview">
    <div className="ad-welcome-banner">
      <div className="ad-welcome-content">
        <div className="ad-welcome-eyebrow">WELCOME BACK</div>
        <h2 className="ad-welcome-title">{admin.name}</h2>
        <p className="ad-welcome-sub">{dateStr} · Signed in at {timeStr}</p>
      </div>

      <div className="ad-welcome-badge">
        <ShieldIcon />
        <span>Administrator</span>
      </div>
    </div>

    <div className="ad-stats-grid">
      <StatCard label="Total Users" value="1,284" trendText="+12%" trendUp={true} color="var(--primary)" icon={UsersIcon} />
      <StatCard label="Active Orders" value="47" trendText="+5" trendUp={true} color="#16a34a" icon={PackageIcon} />
      <StatCard label="Revenue (Month)" value="₹82,400" trendText="+8.3%" trendUp={true} color="#c97a0b" icon={DollarSignIcon} />
      <StatCard label="Print Jobs Today" value="213" trendText="-3%" trendUp={false} color="#2563eb" icon={PrinterIcon} />
    </div>

    <div className="ad-info-card">
      <h3 className="ad-info-title">Quick Access</h3>
      <p className="ad-info-sub">Use the sidebar to navigate between management sections.</p>
      <div className="ad-quick-links">
        {NAV_ITEMS.filter(n => n.id !== 'overview').map(item => (
          <Link
            key={item.id}
            to={`/adminuser/dashboard/${item.id}`}
            className="ad-quick-link"
          >
            <item.Icon />
            <span>{item.label}</span>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

const SECTION_MAP = {
  'overview':     (admin) => <OverviewSection admin={admin} />,
  'users':        () => <PlaceholderSection title="User Management"          description="View, edit and manage all registered users." />,
  'orders':       () => <PlaceholderSection title="Order Management"         description="Track and process customer print orders." />,
  'normal-print': () => <PlaceholderSection title="Normal Print Management"  description="Configure and manage normal print jobs." />,
  'services':     () => <PlaceholderSection title="Service Management"       description="Add, edit and remove printing services." />,
  'prices':       () => <PlaceholderSection title="Service Price Management" description="Set and update pricing for all services." />,
  'paper-sizes':  () => <PlaceholderSection title="Paper Size Management"    description="Define available paper sizes for print jobs." />,
  'paper-types':  () => <PlaceholderSection title="Paper Type Management"    description="Manage paper stock types and descriptions." />,
  'binding':      () => <PlaceholderSection title="Binding Type Management"  description="Configure binding options for print orders." />,
  'lamination':   () => <PlaceholderSection title="Lamination Management"    description="Manage lamination options and pricing." />,
};

/* ─── Main Dashboard Component ──────────────────────────────── */
const AdminDashboard = () => {
  const { admin, adminLogout } = useAdminAuth();
  const navigate  = useNavigate();
  const { section = 'overview' } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading,     setLoading]     = useState(true);
  const [logoutMsg,   setLogoutMsg]   = useState('');
  const sidebarRef = useRef(null);

  /* Guard — redirect to login if not authenticated */
  useEffect(() => {
    if (!admin) {
      navigate('/adminuser/login', { replace: true });
    } else {
      // Simulate page load
      const t = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(t);
    }
  }, [admin, navigate]);

  /* Close sidebar on outside click (mobile) */
  useEffect(() => {
    const handler = (e) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sidebarOpen]);

  /* Close sidebar on section change (mobile) */
  useEffect(() => {
    setSidebarOpen(false);
  }, [section]);

  const handleLogout = () => {
    setLogoutMsg('Logged out successfully. Redirecting…');
    setTimeout(() => {
      adminLogout();
      navigate('/adminuser/login', { replace: true });
    }, 1200);
  };

  if (!admin) return null;

  if (loading) {
    return (
      <div className="ad-loading-screen" role="status" aria-live="polite">
        <div className="ad-loading-spinner" aria-hidden="true" />
        <p>Loading dashboard…</p>
      </div>
    );
  }

  const activeNav = NAV_ITEMS.find(n => n.id === section) || NAV_ITEMS[0];
  const renderSection = SECTION_MAP[section] || SECTION_MAP['overview'];

  return (
    <div className="ad-root">

      {/* ── Sidebar ── */}
      <aside
        className={`ad-sidebar${sidebarOpen ? ' ad-sidebar--open' : ''}`}
        ref={sidebarRef}
        aria-label="Admin navigation"
      >
        {/* Sidebar header */}
        <div className="ad-sidebar-header">
          <Link to="/" className="ad-sidebar-logo" aria-label="Go to PrintHub homepage">
            <img src="/Printhub_logo.png" alt="PrintHub" />
          </Link>
          <button
            className="ad-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Admin info */}
        <div className="ad-sidebar-profile">
          <div className="ad-sidebar-avatar" aria-hidden="true">{admin.avatar}</div>
          <div className="ad-sidebar-info">
            <div className="ad-sidebar-name">{admin.name}</div>
            <div className="ad-sidebar-role">Administrator</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="ad-sidebar-nav" aria-label="Sidebar navigation">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx} className="ad-nav-group">
              {group.title !== 'Main' && (
                <div className="ad-nav-group-title">{group.title}</div>
              )}
              {group.items.map(({ id, label, Icon: NavIcon }) => (
                <Link
                  key={id}
                  to={`/adminuser/dashboard/${id}`}
                  className={`ad-nav-item${section === id || (id === 'overview' && section === 'overview') ? ' ad-nav-item--active' : ''}`}
                  aria-current={section === id ? 'page' : undefined}
                >
                  <NavIcon />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="ad-sidebar-footer">
          <button className="ad-logout-btn" onClick={handleLogout}>
            <LogOutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="ad-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main area ── */}
      <div className="ad-main">

        <button
          className="ad-mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>



        {/* Logout success toast */}
        {logoutMsg && (
          <div className="ad-toast ad-toast--success" role="status" aria-live="polite">
            <CheckCircleIcon />
            <span>{logoutMsg}</span>
          </div>
        )}



        {/* Page content */}
        <div className="ad-content">
          {renderSection(admin)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
