import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import './OrderManagement.css';

/* ================================================================
   ICONS — inline SVG, matching the om-* icon style
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
const CloseIcon = ({ size = 18 }) => <Ic d={["M18 6 6 18", "M6 6l12 12"]} size={size} />;
const PackageIcon = () => <Ic d={["M16.5 9.4 7.55 4.24", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z", "M3.3 7l8.7 5 8.7-5", "M12 22V12"]} />;
const UserIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ClockIcon = () => <Ic d={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M12 6v6l4 2"]} />;
const CheckCircleIcon = () => <Ic d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4 12 14.01l-3-3"]} />;
const AlertTriIcon = () => <Ic d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"]} />;
const ChevronLeftIcon = () => <Ic d="M15 18l-6-6 6-6" />;
const ChevronRightIc = () => <Ic d="M9 18l6-6-6-6" />;
const SortAscIcon = () => <Ic d={["M3 6h18", "M7 12h10", "M11 18h2"]} />;
const TagIcon = () => <Ic d={["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", "M7 7h.01"]} />;
const CalendarIcon = () => <Ic d={["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"]} />;
const ShoppingBagIcon = () => <Ic d={["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"]} />;
const PrinterIcon = () => <Ic d={["M6 9V2h12v7", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 14h12v8H6z"]} />;
const RefreshIcon = ({ size = 14 }) => <Ic d={["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M16 3h5v5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 21H3v-5"]} size={size} />;
const XCircleIcon = ({ size = 14 }) => <Ic d={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M15 9l-6 6", "M9 9l6 6"]} size={size} />;
const TruckIcon = ({ size = 14 }) => <Ic d={["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", "M15 18H9", "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M8 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0z", "M20 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"]} size={size} />;
const CreditCardIcon = ({ size = 14 }) => <Ic d={["M3 6h18v12H3z", "M3 10h18", "M7 15h.01", "M11 15h2"]} size={size} />;
const WalletIcon = ({ size = 14 }) => <Ic d={["M21 12V7H5a2 2 0 0 1 0-4h14v4", "M3 5v14a2 2 0 0 0 2 2h16v-5", "M18 12a2 2 0 0 0 0 4h4v-4z"]} size={size} />;
const DownloadIcon = ({ size = 14 }) => <Ic d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} size={size} />;
const MailIcon = ({ size = 14 }) => <Ic d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} size={size} />;
const PhoneIcon = ({ size = 14 }) => <Ic d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" size={size} />;

/* ================================================================
   CONSTANTS & HELPERS
   ================================================================ */

const SEED_ORDERS = [
  {
    id: 'ORD-2026-001',
    customerName: 'Arjun Kumar',
    customerMobile: '9876543210',
    type: 'Normal Print',
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    totalFiles: 2,
    totalPages: 42,
    amount: 126,
    documents: [
      { name: 'thesis_chapter1.pdf', pages: 28, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Spiral', lamination: 'None', pageRange: 'All', price: 84 },
      { name: 'thesis_chapter2.pdf', pages: 14, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Spiral', lamination: 'None', pageRange: 'All', price: 42 },
    ],
    createdAt: '2026-06-28T10:30:00Z',
    completedAt: '2026-06-28T16:45:00Z',
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-002',
    customerName: 'Priya Menon',
    customerMobile: '9123456780',
    type: 'Normal Print',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    totalFiles: 1,
    totalPages: 18,
    amount: 162,
    documents: [
      { name: 'presentation_deck.pdf', pages: 18, copies: 3, color: true, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 162 },
    ],
    createdAt: '2026-07-01T14:00:00Z',
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-003',
    customerName: 'Rahul Sharma',
    customerMobile: '9988776655',
    type: 'Normal Print',
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    totalFiles: 1,
    totalPages: 7,
    amount: 41,
    documents: [
      { name: 'assignment_cs101.pdf', pages: 7, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'None', lamination: 'Matte', pageRange: 'All', price: 41 },
    ],
    createdAt: '2026-07-02T09:15:00Z',
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-004',
    customerName: 'Anjali Nair',
    customerMobile: '9876123450',
    type: 'Normal Print',
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'UPI',
    totalFiles: 3,
    totalPages: 17,
    amount: 48,
    documents: [
      { name: 'report_draft.docx', pages: 12, copies: 2, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Staple', lamination: 'None', pageRange: 'All', price: 24 },
      { name: 'appendix_data.ppt', pages: 4, copies: 2, color: false, paperSize: 'A4', sides: 'Single-Sided', binding: 'Staple', lamination: 'None', pageRange: 'All', price: 16 },
      { name: 'cover_letter.docx', pages: 1, copies: 2, color: false, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 8 },
    ],
    createdAt: '2026-06-20T11:00:00Z',
    completedAt: null,
    cancelledAt: '2026-06-20T12:30:00Z',
    cancellationReason: 'uploaded wrong files',
  },
  {
    id: 'ORD-2026-005',
    customerName: 'Vikram Singh',
    customerMobile: '9345678901',
    type: 'Normal Print',
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'COD',
    totalFiles: 1,
    totalPages: 88,
    amount: 264,
    documents: [
      { name: 'notes_sem4.pdf', pages: 88, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Glue', lamination: 'None', pageRange: 'All', price: 264 },
    ],
    createdAt: '2026-06-15T16:30:00Z',
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-006',
    customerName: 'Deepa Reddy',
    customerMobile: '9123987654',
    type: 'Normal Print',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    totalFiles: 4,
    totalPages: 52,
    amount: 310,
    documents: [
      { name: 'lecture_notes_1.pdf', pages: 15, copies: 1, color: true, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 90 },
      { name: 'lecture_notes_2.pdf', pages: 20, copies: 1, color: true, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 120 },
      { name: 'practice_questions.pdf', pages: 12, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Staple', lamination: 'None', pageRange: 'All', price: 50 },
      { name: 'syllabus.pdf', pages: 5, copies: 1, color: true, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 50 },
    ],
    createdAt: '2026-07-03T08:20:00Z',
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-007',
    customerName: 'Karthik Iyer',
    customerMobile: '9876009876',
    type: 'Normal Print',
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    totalFiles: 2,
    totalPages: 24,
    amount: 72,
    documents: [
      { name: 'resume.pdf', pages: 2, copies: 10, color: false, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 40 },
      { name: 'cover_letter.pdf', pages: 1, copies: 10, color: false, paperSize: 'A4', sides: 'Single-Sided', binding: 'None', lamination: 'None', pageRange: 'All', price: 32 },
    ],
    createdAt: '2026-06-25T13:10:00Z',
    completedAt: '2026-06-25T18:30:00Z',
    cancelledAt: null,
    cancellationReason: null,
  },
  {
    id: 'ORD-2026-008',
    customerName: 'Meera Patel',
    customerMobile: '9998887776',
    type: 'Normal Print',
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    totalFiles: 1,
    totalPages: 12,
    amount: 36,
    documents: [
      { name: 'business_proposal.pdf', pages: 12, copies: 1, color: false, paperSize: 'A4', sides: 'Double-Sided', binding: 'Staple', lamination: 'None', pageRange: 'All', price: 36 },
    ],
    createdAt: '2026-07-04T10:45:00Z',
    completedAt: null,
    cancelledAt: null,
    cancellationReason: null,
  },
];

const sanitize = (v = '') =>
  String(v).trim().replace(/<[^>]*>/g, '').replace(/['"`;\\/]/g, '').slice(0, 200);

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';

const fmtDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return '—'; }
};

const fmtINR = (n) =>
  n != null ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

const nowIso = () => new Date().toISOString();

const STATUS_CONFIG = {
  pending: { label: 'Pending', cls: 'om-badge--pending', icon: <ClockIcon /> },
  processing: { label: 'Processing', cls: 'om-badge--processing', icon: <RefreshIcon /> },
  ready: { label: 'Ready for Pickup', cls: 'om-badge--ready', icon: <PackageIcon /> },
  delivered: { label: 'Delivered', cls: 'om-badge--delivered', icon: <TruckIcon /> },
  cancelled: { label: 'Cancelled', cls: 'om-badge--cancelled', icon: <XCircleIcon /> },
};

const PAYMENT_STATUS_CONFIG = {
  pending: { label: 'Pending', cls: 'om-payment--pending', icon: <ClockIcon /> },
  paid: { label: 'Paid', cls: 'om-payment--paid', icon: <CheckCircleIcon /> },
  refunded: { label: 'Refunded', cls: 'om-payment--refunded', icon: <RefreshIcon /> },
  failed: { label: 'Failed', cls: 'om-payment--failed', icon: <XCircleIcon /> },
};

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */

/* ── Stats Row ─────────────────────────────────────────────── */
const StatsRow = ({ orders }) => {
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'pending').length;
  const completed = orders.filter(o => o.status === 'delivered').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + o.amount, 0);

  const stats = [
    { label: 'Total Orders', value: total, color: 'var(--primary)', bg: 'var(--primary-soft)', border: 'var(--primary-border)', icon: <PackageIcon /> },
    { label: 'Pending Orders', value: pending, color: '#c97a0b', bg: 'rgba(201, 122, 11, 0.10)', border: 'rgba(201, 122, 11, 0.25)', icon: <ClockIcon /> },
    { label: 'Completed Orders', value: completed, color: '#16a34a', bg: 'rgba(22, 163, 74, 0.10)', border: 'rgba(22, 163, 74, 0.25)', icon: <CheckCircleIcon /> },
    { label: 'Total Revenue', value: fmtINR(totalRevenue), color: '#2563eb', bg: 'rgba(37, 99, 235, 0.10)', border: 'rgba(37, 99, 235, 0.25)', icon: <WalletIcon /> },
  ];

  return (
    <div className="om-stats-row" role="region" aria-label="Order statistics">
      {stats.map((s, i) => (
        <div key={i} className="om-stat">
          <div className="om-stat-icon" style={{
            background: s.bg,
            border: `1px solid ${s.border}`,
            color: s.color,
          }}>
            {s.icon}
          </div>
          <div className="om-stat-value">{s.value}</div>
          <div className="om-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

/* ── Status Badge ───────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`om-badge ${cfg.cls}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

/* ── Payment Status Badge ──────────────────────────────────── */
const PaymentBadge = ({ status }) => {
  const cfg = PAYMENT_STATUS_CONFIG[status] || PAYMENT_STATUS_CONFIG.pending;
  return (
    <span className={`om-badge om-payment ${cfg.cls}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

/* ── Inline spinner ─────────────────────────────────────────── */
const BtnSpinner = () => <span className="om-btn-spinner" aria-hidden="true" />;





/* ================================================================
   CONFIRM / DANGER MODALS (Delete & Cancel)
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
      icon: <TrashIcon size={20} />, iconCls: 'om-modal-icon--danger',
      title: 'Delete Order',
      subtitle: 'This action is irreversible and permanent.',
      btnCls: 'om-btn--danger', btnLabel: 'Delete Order',
      warning: 'All records, attached file configurations, and invoice data for this order will be permanently removed.',
    },
    cancel: {
      icon: <XCircleIcon size={20} />, iconCls: 'om-modal-icon--warn',
      title: 'Cancel Order',
      subtitle: 'The order processing will be halted immediately.',
      btnCls: 'om-btn--warn', btnLabel: 'Cancel Order',
      warning: target?.paymentStatus === 'paid'
        ? 'Since payment is completed, cancelling this order will automatically issue a full refund.'
        : 'The customer will be notified of the cancellation.',
    },
  };

  const c = cfg[type] || cfg.delete;

  return (
    <div className="om-modal-overlay" role="dialog" aria-modal="true"
      aria-label={c.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="om-modal om-modal--confirm">
        <div className="om-modal-header">
          <div className={`om-modal-icon ${c.iconCls}`}>{c.icon}</div>
          <div>
            <p className="om-modal-title">{c.title}</p>
            <p className="om-modal-subtitle">{c.subtitle}</p>
          </div>
          <button className="om-modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </button>
        </div>

        <div className="om-modal-body">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>
            You are about to <strong style={{ color: 'var(--text)' }}>{type}</strong> the following order:
          </p>
          <div className="om-confirm-details">
            <div className="om-confirm-detail-row">
              <PackageIcon size={16} />
              <strong>{target.id}</strong>
              <span className="om-badge om-badge--type" style={{ marginLeft: 'auto' }}>{target.type}</span>
            </div>
            <div className="om-confirm-detail-row">
              <UserIcon size={16} />
              <span>{target.customerName}</span>
              {target.customerMobile && <span style={{ color: 'var(--text-dim)', fontSize: 12.5 }}>({target.customerMobile})</span>}
            </div>
            <div className="om-confirm-detail-row">
              <CreditCardIcon size={16} />
              <span>Amount: <strong>{fmtINR(target.amount)}</strong></span>
              <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-dim)' }}>{target.totalFiles} files · {target.totalPages} pages</span>
            </div>
          </div>
          {c.warning && (
            <div className="om-confirm-warning">
              <AlertTriIcon />
              <span>{c.warning}</span>
            </div>
          )}
        </div>

        <div className="om-modal-footer">
          <button ref={firstRef} className="om-btn om-btn--ghost" onClick={onClose} disabled={isBusy}>
            Cancel
          </button>
          <button className={`om-btn ${c.btnCls}`} onClick={onConfirm} disabled={isBusy}>
            {isBusy && <BtnSpinner />}
            {isBusy ? 'Processing…' : c.btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};





/* ================================================================
   MAIN ORDER MANAGEMENT SECTION
   ================================================================ */
const OrderManagementSection = () => {
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAdvFilter, setShowAdvFilter] = useState(false);
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [modal, setModal] = useState(null);
  const [isBusy, setIsBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const activeAdvFiltersCount = statusFilter !== 'all' ? 1 : 0;

  const showToast = useCallback((type, msg, title) => {
    clearTimeout(toastTimer.current);
    setToast({ type, msg, title });
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return orders
      .filter(o => {
        const matchQ = !q ||
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          (o.customerMobile && o.customerMobile.toLowerCase().includes(q)) ||
          (o.customerId && o.customerId.toLowerCase().includes(q));
        const matchS = statusFilter === 'all' || o.status === statusFilter;
        return matchQ && matchS;
      })
      .sort((a, b) => {
        let av = a[sortKey] ?? '', bv = b[sortKey] ?? '';
        if (typeof av === 'string') av = av.toLowerCase();
        if (typeof bv === 'string') bv = bv.toLowerCase();
        if (av < bv) return sortDir === 'asc' ? -1 : 1;
        if (av > bv) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [orders, search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  useEffect(() => { setPage(1); }, [search, statusFilter, sortKey, sortDir, perPage]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const handleDelete = useCallback(() => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      setOrders(p => p.filter(o => o.id !== t.id));
      showToast('success', `Order "${t.id}" permanently deleted.`, 'Order Deleted Successfully');
      setIsBusy(false);
      setModal(null);
    }, 700);
  }, [modal, showToast]);

  const handleCancel = useCallback((data) => {
    setIsBusy(true);
    setTimeout(() => {
      const t = modal.target;
      const willRefund = t.paymentStatus === 'paid';
      setOrders(p => p.map(o => o.id === t.id ? {
        ...o,
        status: 'cancelled',
        cancelledAt: nowIso(),
        cancellationReason: data.cancellationReason,
        paymentStatus: willRefund ? 'refunded' : o.paymentStatus,
      } : o));
      showToast('success', `Order "${t.id}" cancelled${willRefund ? ' and refunded' : ''}.`, 'Order Cancelled');
      setIsBusy(false);
      setModal(null);
    }, 1000);
  }, [modal, showToast]);

  const Th = ({ label, sortable, field, style }) => (
    <th style={style}>
      {sortable ? (
        <span className="om-table-th-sort" onClick={() => toggleSort(field)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && toggleSort(field)}
          aria-sort={sortKey === field ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
          style={style?.textAlign ? {
            justifyContent: style.textAlign === 'center' ? 'center' : (style.textAlign === 'right' ? 'flex-end' : 'flex-start'),
            width: '100%',
          } : undefined}>
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
      <div className="om-header">
        <span className="section-eyebrow">
          <PackageIcon />
          Admin · Order Management
        </span>
      </div>

      {/* Toast Notification (NP Page Success Toast Style) */}
      {toast && (
        <div className={`om-toast om-toast--${toast.type}`} role="alert" aria-live="polite">
          <div className="om-toast-icon">
            {toast.type === 'success' && <CheckCircleIcon />}
            {(toast.type === 'error' || toast.type === 'warn') && <AlertTriIcon />}
          </div>
          <div className="om-toast-body">
            <strong>{toast.title || (toast.type === 'success' ? 'Success' : toast.type === 'warn' ? 'Notice' : 'Error')}</strong>
            <span>{toast.msg}</span>
          </div>
          <button className="om-toast-x" onClick={() => setToast(null)} aria-label="Dismiss">
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Stats */}
      <StatsRow orders={orders} />

      {/* Toolbar */}
      <div className="om-toolbar">
        <div className="om-search-row">
          <div className="om-search-box">
            <span className="om-search-icon"><SearchIcon /></span>
            <input type="text" className="om-search"
              placeholder="Search by order ID, customer name, or ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              aria-label="Search orders" />
            {search && (
              <button type="button" className="om-clear-search"
                onClick={() => setSearch('')} aria-label="Clear search">
                <CloseIcon />
              </button>
            )}
          </div>

          <button type="button"
            className={`om-adv-filter-btn${showAdvFilter || activeAdvFiltersCount > 0 ? ' om-adv-filter-btn--active' : ''}`}
            onClick={() => setShowAdvFilter(!showAdvFilter)}
            aria-expanded={showAdvFilter} aria-label="Filter">
            <SlidersIcon />
            <span>Filter</span>
            {activeAdvFiltersCount > 0 && <span className="om-filter-badge">{activeAdvFiltersCount}</span>}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className={`om-adv-panel${showAdvFilter ? ' om-adv-panel--open' : ''}`}>
        <div className="om-adv-grid">
          <div className="om-adv-group">
            <label className="om-adv-label">Filter by Status</label>
            <div className="om-adv-chips">
              {[
                { val: 'all', label: 'All Orders' },
                { val: 'pending', label: 'Pending' },
                { val: 'processing', label: 'Processing' },
                { val: 'ready', label: 'Ready' },
                { val: 'delivered', label: 'Delivered' },
                { val: 'cancelled', label: 'Cancelled' },
              ].map(s => (
                <button key={s.val} type="button"
                  className={`om-adv-chip${statusFilter === s.val ? ' om-adv-chip--active' : ''}`}
                  onClick={() => setStatusFilter(s.val)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {activeAdvFiltersCount > 0 && (
            <div className="om-adv-group">
              <label className="om-adv-label">&nbsp;</label>
              <button type="button" className="om-adv-clear-btn"
                onClick={() => setStatusFilter('all')}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="om-table-card">
        <div className="om-table-wrap">
          <table className="om-table" aria-label="Orders table">
            <thead>
              <tr>
                <Th label="Customer" sortable field="customerName" style={{ minWidth: 200 }} />
                <Th label="Order ID" sortable field="id" style={{ minWidth: 140 }} />
                <Th label="Type" style={{ minWidth: 130 }} />
                <Th label="Files" sortable field="totalFiles" style={{ minWidth: 80, textAlign: 'center' }} />
                <Th label="Pages" sortable field="totalPages" style={{ minWidth: 80, textAlign: 'center' }} />
                <Th label="Amount" sortable field="amount" style={{ minWidth: 110, textAlign: 'center' }} />
                <Th label="Created" sortable field="createdAt" style={{ minWidth: 170 }} />
                <Th label="Status" sortable field="status" style={{ minWidth: 130 }} />
                <Th label="Actions" style={{ minWidth: 140, textAlign: 'right' }} />
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="om-empty">
                      <div className="om-empty-icon"><PackageIcon size={32} /></div>
                      <p className="om-empty-title">No orders found</p>
                      <p className="om-empty-sub">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : paged.map(o => (
                <tr key={o.id}>
                  <td>
                    <div className="om-identity">
                      <div className="om-avatar" aria-hidden="true">
                        {initials(o.customerName)}
                      </div>
                      <div>
                        <div className="om-identity-name">{o.customerName}</div>
                        <div className="om-identity-email">{o.customerMobile || o.customerEmail || o.customerId}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Order ID" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {o.id}
                  </td>
                  <td data-label="Type">
                    <span className="om-badge om-badge--type">{o.type}</span>
                  </td>
                  <td data-label="Files" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                    {o.totalFiles}
                  </td>
                  <td data-label="Pages" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                    {o.totalPages}
                  </td>
                  <td data-label="Amount" style={{ textAlign: 'center', color: 'var(--primary)' }}>
                    {fmtINR(o.amount)}
                  </td>
                  <td data-label="Created" style={{ fontSize: 12.5, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {fmtDate(o.createdAt)}
                  </td>
                  <td data-label="Status"><StatusBadge status={o.status} /></td>
                  <td data-label="Actions">
                    <div className="om-row-actions" style={{ justifyContent: 'flex-end' }}>
                      <button className="om-icon-btn"
                        onClick={() => setModal({ type: 'invoice', target: o })}
                        title="Download invoice" aria-label={`Invoice ${o.id}`}>
                        <DownloadIcon />
                      </button>
                      {o.status !== 'cancelled' && o.status !== 'delivered' && (
                        <button className="om-icon-btn"
                          onClick={() => setModal({ type: 'edit_status', target: o })}
                          title="Update status" aria-label={`Update ${o.id}`}>
                          <EditIcon />
                        </button>
                      )}
                      {o.status === 'pending' && (
                        <button className="om-icon-btn om-icon-btn--danger"
                          onClick={() => setModal({ type: 'cancel', target: o })}
                          title="Cancel order" aria-label={`Cancel ${o.id}`}>
                          <XCircleIcon />
                        </button>
                      )}
                      <button className="om-icon-btn om-icon-btn--danger"
                        onClick={() => setModal({ type: 'delete', target: o })}
                        title="Delete order" aria-label={`Delete ${o.id}`}>
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
        <div className="om-pagination">
          <div className="om-pagination-info">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * perPage + 1}–{Math.min(safePage * perPage, filtered.length)} of {filtered.length} orders
          </div>
          <div className="om-pagination-controls" role="navigation" aria-label="Pagination">
            <button className="om-page-btn" onClick={() => setPage(1)} disabled={safePage === 1} aria-label="First page">«</button>
            <button className="om-page-btn" onClick={() => setPage(p => p - 1)} disabled={safePage === 1} aria-label="Previous page">
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
                  : <button key={p} className={`om-page-btn${p === safePage ? ' om-page-btn--active' : ''}`}
                    onClick={() => setPage(p)} aria-label={`Page ${p}`} aria-current={p === safePage ? 'page' : undefined}>
                    {p}
                  </button>
              )
            }
            <button className="om-page-btn" onClick={() => setPage(p => p + 1)} disabled={safePage === totalPages} aria-label="Next page">
              <ChevronRightIc />
            </button>
            <button className="om-page-btn" onClick={() => setPage(totalPages)} disabled={safePage === totalPages} aria-label="Last page">»</button>
          </div>
          <div className="om-per-page">
            <span>Per page</span>
            <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} aria-label="Results per page">
              {[5, 8, 10, 20].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal?.type === 'delete' && (
        <ConfirmModal type="delete" target={modal.target}
          onClose={() => setModal(null)} onConfirm={handleDelete} isBusy={isBusy} />
      )}
      {modal?.type === 'cancel' && (
        <ConfirmModal type="cancel" target={modal.target}
          onClose={() => setModal(null)} onConfirm={() => handleCancel({ cancellationReason: 'Cancelled by Admin' })} isBusy={isBusy} />
      )}
    </>
  );
};

export default OrderManagementSection;
