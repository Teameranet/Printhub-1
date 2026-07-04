import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Orders.css';

/* ─── SVG Icons ────────────────────────────────────────────── */
const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
  </svg>
);
const PrinterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
  </svg>
);
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);
const RepeatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m17 2 4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
/* FilterIcon removed */
const SlidersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" />
  </svg>
);
const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-3 3-3-3" /><path d="m9 6 3-3 3 3" /><path d="M12 3v18" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M16 3h5v5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 21H3v-5" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

/* ─── Mock Order Data ───────────────────────────────────────── */
const MOCK_ORDERS = [
  {
    id: 'ORD-2026-001',
    date: '2026-06-28T10:30:00',
    status: 'delivered',
    type: 'Normal Print',
    files: ['thesis_chapter1.pdf', 'thesis_chapter2.pdf'],
    pages: 42,
    copies: 1,
    color: false,
    binding: 'Spiral',
    amount: 126,
    eta: null,
  },
  {
    id: 'ORD-2026-002',
    date: '2026-07-01T14:00:00',
    status: 'processing',
    type: 'Normal Print',
    files: ['presentation_deck.pdf'],
    pages: 18,
    copies: 3,
    color: true,
    binding: 'None',
    amount: 162,
    eta: '~45 min',
  },
  {
    id: 'ORD-2026-003',
    date: '2026-07-02T09:15:00',
    status: 'ready',
    type: 'Normal Print',
    files: ['assignment_cs101.pdf'],
    pages: 7,
    copies: 1,
    color: false,
    binding: 'None',
    amount: 21,
    eta: 'Ready now',
  },
  {
    id: 'ORD-2026-004',
    date: '2026-06-20T11:00:00',
    status: 'cancelled',
    type: 'Normal Print',
    files: ['report_draft.docx'],
    pages: 12,
    copies: 2,
    color: false,
    binding: 'Staple',
    amount: 48,
    eta: null,
  },
  {
    id: 'ORD-2026-005',
    date: '2026-06-15T16:30:00',
    status: 'delivered',
    type: 'Normal Print',
    files: ['notes_sem4.pdf'],
    pages: 88,
    copies: 1,
    color: false,
    binding: 'Glue',
    amount: 264,
    eta: null,
  },
];

const STATUS_CONFIG = {
  delivered: { label: 'Delivered', cls: 'status--success' },
  processing: { label: 'Processing', cls: 'status--info' },
  ready: { label: 'Ready for Pickup', cls: 'status--accent' },
  cancelled: { label: 'Cancelled', cls: 'status--danger' },
  pending: { label: 'Pending', cls: 'status--muted' },
};
/* FILTERS removed */
/* ─── Orders Page ────────────────────────────────────────────── */
const Orders = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    color: 'all',
    binding: 'all',
    dateRange: 'all',
    priceRange: 'all',
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [expanded, setExpanded] = useState(null);

  if (!user) return <Navigate to="/auth" />;

  const activeFiltersCount = Object.keys(filters).reduce((count, key) => {
    return filters[key] !== 'all' ? count + 1 : count;
  }, 0);

  const resetFilters = () => {
    setFilters({
      status: 'all',
      color: 'all',
      binding: 'all',
      dateRange: 'all',
      priceRange: 'all',
    });
    setSearchQuery('');
  };

  /* ─── Filtering Logic ────────────────────────────────────── */
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchFile = order.files.some((f) => f.toLowerCase().includes(q));
      if (!matchId && !matchFile) return false;
    }
    if (filters.status !== 'all' && order.status !== filters.status) {
      return false;
    }
    if (filters.color !== 'all') {
      const isColor = filters.color === 'color';
      if (order.color !== isColor) return false;
    }
    if (filters.binding !== 'all' && order.binding.toLowerCase() !== filters.binding.toLowerCase()) {
      return false;
    }
    if (filters.dateRange !== 'all') {
      const orderTime = new Date(order.date).getTime();
      const now = Date.now();
      if (filters.dateRange === '7days' && orderTime < now - 7 * 24 * 3600 * 1000) return false;
      if (filters.dateRange === '30days' && orderTime < now - 30 * 24 * 3600 * 1000) return false;
      if (filters.dateRange === '90days' && orderTime < now - 90 * 24 * 3600 * 1000) return false;
    }
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'under100' && order.amount >= 100) return false;
      if (filters.priceRange === '100to250' && (order.amount < 100 || order.amount > 250)) return false;
      if (filters.priceRange === 'over250' && order.amount <= 250) return false;
    }
    return true;
  });

  /* ─── Sorting Logic ──────────────────────────────────────── */
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'id-asc':
        return a.id.localeCompare(b.id);
      case 'id-desc':
        return b.id.localeCompare(a.id);
      case 'amount-asc':
        return a.amount - b.amount;
      case 'amount-desc':
        return b.amount - a.amount;
      case 'files-desc':
        return b.files.length - a.files.length;
      case 'files-asc':
        return a.files.length - b.files.length;
      default:
        return 0;
    }
  });

  const totalSpent = MOCK_ORDERS.reduce((s, o) => s + (o.status !== 'cancelled' ? o.amount : 0), 0);
  const activeCount = MOCK_ORDERS.filter((o) => ['processing', 'ready'].includes(o.status)).length;
  const deliveredCount = MOCK_ORDERS.filter((o) => o.status === 'delivered').length;

  return (
    <div className="orders-page">
      <div className="orders-wrap">

        {/* ── Eyebrow ── */}
        <div className="orders-eyebrow fade-up">
          <PackageIcon />
          <span>My Orders</span>
        </div>

        {/* ── Stats Row ── */}
        <div className="orders-stats-row fade-up">
          {[
            { label: 'Total Orders', value: MOCK_ORDERS.length, color: 'var(--primary)' },
            { label: 'Active', value: activeCount, color: 'var(--info)' },
            { label: 'Delivered', value: deliveredCount, color: 'var(--success)' },
            { label: 'Total Spent', value: `₹${totalSpent}`, color: 'var(--accent)' },
          ].map((s) => (
            <div className="orders-stat" key={s.label}>
              <div className="orders-stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="orders-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="orders-controls-row fade-up">
          <div className="orders-search-box">
            <span className="orders-search-icon"><SearchIcon /></span>
            <input
              type="text"
              className="orders-search-input"
              placeholder="Search by order ID or filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search orders"
            />
            {searchQuery && (
              <button
                className="orders-clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          <div className="orders-actions-group">
            <button
              className={`orders-filter-toggle${showFilters || activeFiltersCount > 0 ? ' orders-filter-toggle--active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
            >
              <SlidersIcon />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="orders-filter-badge">{activeFiltersCount}</span>
              )}
            </button>

            <div className="orders-sort-box">
              <span className="orders-sort-icon"><SortIcon /></span>
              <select
                className="orders-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort orders"
              >
                <option value="date-desc">Date: Newest</option>
                <option value="date-asc">Date: Oldest</option>
                <option value="id-asc">Order ID: A-Z</option>
                <option value="id-desc">Order ID: Z-A</option>
                <option value="amount-desc">Price: High to Low</option>
                <option value="amount-asc">Price: Low to High</option>
                <option value="files-desc">Files: Most</option>
                <option value="files-asc">Files: Least</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Advanced Filters Panel (Collapsible) ── */}
        <div className={`orders-filters-panel${showFilters ? ' orders-filters-panel--open' : ''}`}>
          <div className="orders-filters-grid">
            {/* Filter Group: Status */}
            <div className="orders-filter-group">
              <label>Order Status</label>
              <div className="orders-filter-chips">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'processing', label: 'Processing' },
                  { value: 'ready', label: 'Ready' },
                  { value: 'delivered', label: 'Delivered' },
                  { value: 'cancelled', label: 'Cancelled' }
                ].map((chip) => (
                  <button
                    key={chip.value}
                    type="button"
                    className={`orders-chip${filters.status === chip.value ? ' orders-chip--active' : ''}`}
                    onClick={() => setFilters(f => ({ ...f, status: chip.value }))}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Color Mode */}
            <div className="orders-filter-group">
              <label htmlFor="filter-color">Color Mode</label>
              <select
                id="filter-color"
                className="orders-select"
                value={filters.color}
                onChange={(e) => setFilters(f => ({ ...f, color: e.target.value }))}
              >
                <option value="all">All Modes</option>
                <option value="bw">Black & White</option>
                <option value="color">Color</option>
              </select>
            </div>

            {/* Filter Group: Binding */}
            <div className="orders-filter-group">
              <label htmlFor="filter-binding">Binding Type</label>
              <select
                id="filter-binding"
                className="orders-select"
                value={filters.binding}
                onChange={(e) => setFilters(f => ({ ...f, binding: e.target.value }))}
              >
                <option value="all">All Binding</option>
                <option value="None">None</option>
                <option value="Spiral">Spiral</option>
                <option value="Staple">Staple</option>
                <option value="Glue">Glue</option>
              </select>
            </div>

            {/* Filter Group: Date Range */}
            <div className="orders-filter-group">
              <label htmlFor="filter-date">Date Range</label>
              <select
                id="filter-date"
                className="orders-select"
                value={filters.dateRange}
                onChange={(e) => setFilters(f => ({ ...f, dateRange: e.target.value }))}
              >
                <option value="all">All Time</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            {/* Filter Group: Price Range */}
            <div className="orders-filter-group">
              <label htmlFor="filter-price">Order Value</label>
              <select
                id="filter-price"
                className="orders-select"
                value={filters.priceRange}
                onChange={(e) => setFilters(f => ({ ...f, priceRange: e.target.value }))}
              >
                <option value="all">All Values</option>
                <option value="under100">Under ₹100</option>
                <option value="100to250">₹100 - ₹250</option>
                <option value="over250">Over ₹250</option>
              </select>
            </div>
          </div>

          {(activeFiltersCount > 0 || searchQuery) && (
            <div className="orders-filters-foot">
              <span className="orders-filters-summary-text">
                Found {sortedOrders.length} matching order{sortedOrders.length !== 1 ? 's' : ''}
              </span>
              <button
                type="button"
                className="orders-filter-reset-btn"
                onClick={resetFilters}
              >
                <RefreshIcon /> Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* ── Orders List ── */}
        {sortedOrders.length === 0 ? (
          <div className="orders-empty fade-up">
            <div className="orders-empty-icon">
              {searchQuery || activeFiltersCount > 0 ? <SearchIcon /> : <PackageIcon />}
            </div>
            <div className="orders-empty-title">
              {searchQuery || activeFiltersCount > 0 ? 'No matching orders found' : 'No orders found'}
            </div>
            <div className="orders-empty-sub">
              {searchQuery || activeFiltersCount > 0 
                ? 'Try adjusting your search query or filters.' 
                : 'Place your first print order!'}
            </div>
            {(searchQuery || activeFiltersCount > 0) ? (
              <button type="button" className="orders-reset-all-btn" onClick={resetFilters}>
                <RefreshIcon /> Clear Search & Filters
              </button>
            ) : (
              <Link to="/print/normal" className="ph-btn ph-btn--primary">
                <PrinterIcon /> Start Printing
              </Link>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {sortedOrders.map((order) => {
              const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const isExpanded = expanded === order.id;
              const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
              });
              const orderTime = new Date(order.date).toLocaleTimeString('en-IN', {
                hour: '2-digit', minute: '2-digit',
              });

              return (
                <div
                  key={order.id}
                  className={`order-card fade-up${isExpanded ? ' order-card--expanded' : ''}`}
                >
                  {/* Card head — always visible */}
                  <button
                    className="order-card-header"
                    onClick={() => setExpanded(isExpanded ? null : order.id)}
                    aria-expanded={isExpanded}
                  >
                    {/* Left: Icon + ID */}
                    <div className="order-card-left">
                      <div className="order-icon">
                        <PrinterIcon />
                      </div>
                      <div className="order-meta">
                        <div className="order-id">{order.id}</div>
                        <div className="order-date-row">
                          <ClockIcon />
                          <span>{orderDate} · {orderTime}</span>
                        </div>
                      </div>
                      {order.eta && (
                        <span className="order-eta order-eta--mobile">
                          <ClockIcon />
                          {order.eta}
                        </span>
                      )}
                    </div>

                    {/* Center: files preview */}
                    <div className="order-files-preview">
                      {order.files.slice(0, 2).map((f) => (
                        <span className="order-file-chip" key={f}>
                          <FileIcon />{f.length > 22 ? f.slice(0, 20) + '…' : f}
                        </span>
                      ))}
                      {order.files.length > 2 && (
                        <span className="order-file-chip order-file-chip--more">+{order.files.length - 2}</span>
                      )}
                    </div>

                    {/* Right: amount + status */}
                    <div className="order-card-right">
                      {order.eta && (
                        <span className="order-eta order-eta--desktop">
                          <ClockIcon />
                          {order.eta}
                        </span>
                      )}
                      <div className="order-amount">₹{order.amount}</div>
                      <span className={`order-status ${statusConf.cls}`}>{statusConf.label}</span>
                      <span className={`order-chevron${isExpanded ? ' order-chevron--open' : ''}`}>
                        <ChevronRightIcon />
                      </span>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="order-card-body">
                      <div className="order-detail-grid">
                        <div className="order-detail-item">
                          <span className="order-detail-label">Pages</span>
                          <span className="order-detail-value">{order.pages}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Copies</span>
                          <span className="order-detail-value">{order.copies}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Color Mode</span>
                          <span className="order-detail-value">
                            {order.color ? (
                              <span className="ph-badge badge--accent">Color</span>
                            ) : (
                              <span className="ph-badge badge--muted">B&amp;W</span>
                            )}
                          </span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Binding</span>
                          <span className="order-detail-value">{order.binding}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Type</span>
                          <span className="order-detail-value">{order.type}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Total</span>
                          <span className="order-detail-value order-detail-value--price">₹{order.amount}</span>
                        </div>
                      </div>

                      <div className="order-files-full">
                        <div className="order-detail-label" style={{ marginBottom: '10px' }}>Files</div>
                        {order.files.map((f) => (
                          <div className="order-file-row" key={f}>
                            <div className="order-file-info">
                              <FileIcon />
                              <span>{f}</span>
                            </div>
                            <button
                              className="ph-btn ph-btn--ghost ph-btn--sm"
                              title="View File"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`/uploads/${f}`, '_blank');
                              }}
                            >
                              <EyeIcon /> View
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-actions">
                        <button className="ph-btn ph-btn--ghost ph-btn--sm">
                          <DownloadIcon /> Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button className="ph-btn ph-btn--primary ph-btn--sm">
                            <RepeatIcon /> Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
