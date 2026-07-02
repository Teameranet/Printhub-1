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
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

/* ─── Mock Order Data ───────────────────────────────────────── */
const MOCK_ORDERS = [
  {
    id: 'ORD-2024-001',
    date: '2024-06-28T10:30:00',
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
    id: 'ORD-2024-002',
    date: '2024-07-01T14:00:00',
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
    id: 'ORD-2024-003',
    date: '2024-07-02T09:15:00',
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
    id: 'ORD-2024-004',
    date: '2024-06-20T11:00:00',
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
    id: 'ORD-2024-005',
    date: '2024-06-15T16:30:00',
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

const FILTERS = ['All', 'Processing', 'Ready', 'Delivered', 'Cancelled'];

/* ─── Orders Page ────────────────────────────────────────────── */
const Orders = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  if (!user) return <Navigate to="/auth" />;

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    const matchFilter = filter === 'All' || o.status === filter.toLowerCase().replace(/ /g, '_');
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.files.some((f) => f.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
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

        {/* ── Toolbar ── */}
        <div className="orders-toolbar fade-up">
          {/* Search */}
          <div className="orders-search-wrap">
            <SearchIcon />
            <input
              className="orders-search"
              type="search"
              placeholder="Search by order ID or filename…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search orders"
            />
          </div>

          {/* Filter pills */}
          <div className="orders-filters" role="group" aria-label="Filter orders">
            <FilterIcon />
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`orders-filter-pill${filter === f ? ' orders-filter-pill--active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ── Orders List ── */}
        {filteredOrders.length === 0 ? (
          <div className="orders-empty fade-up">
            <div className="orders-empty-icon"><PackageIcon /></div>
            <div className="orders-empty-title">No orders found</div>
            <div className="orders-empty-sub">
              {search ? 'Try a different search term.' : 'Place your first print order!'}
            </div>
            <Link to="/print/normal" className="ph-btn ph-btn--primary">
              <PrinterIcon /> Start Printing
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => {
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
                        <span className="order-eta">
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
                            <FileIcon />
                            <span>{f}</span>
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
