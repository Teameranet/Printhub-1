import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

/* ─── Icons ──────────────────────────────────────────────────── */
const Icons = {
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  Store: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  ),
  Truck: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10h1" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  XCircle: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  FilePdf: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" x2="15" y1="13" y2="13" /><line x1="9" x2="15" y1="17" y2="17" />
    </svg>
  ),
  FileImage: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  ),
  FileDoc: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="9" x2="15" y1="13" y2="13" /><line x1="9" x2="12" y1="17" y2="17" />
    </svg>
  ),
  FileGeneric: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Info: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  Printer: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" /><rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  ),
  Package: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Phone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  ),
  Confetti: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.8 11.3 2 22l10.7-3.79" /><path d="M4 3h.01" /><path d="M22 8h.01" /><path d="M15 2h.01" /><path d="M22 20h.01" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.6-.17 1.2-.17 1.81" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.6 4.91 9 4.97 8.38 4.97" />
      <path d="M4 20c.97-.24 1.93-.6 2.88-1.1" />
    </svg>
  ),
  Lock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Tag: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
};

/* ─── Pricing (mirrors Cart.jsx) ──────────────────────────────── */
const PRICING = {
  bw: { A4: 2, A3: 4, A5: 1.5, Letter: 2.5, Legal: 3 },
  color: { A4: 8, A3: 16, A5: 6, Letter: 9, Legal: 12 },
  paperType: { Bond: 0, Glossy: 3, Matte: 2, Cardstock: 5 },
  pagesPerSheet: { 1: 1, 2: 0.6, 4: 0.35 },
  lamination: { None: 0, 'Glossy Lamination': 25, 'Matte Lamination': 20 },
  binding: { None: 0, Spiral: 50, Stapled: 10 },
  doubleSideMulti: 0.8,
};

function parsePageRange(range, totalPages) {
  if (!range || range.trim().toLowerCase() === 'all') return totalPages;
  let count = 0;
  range.split(',').forEach((part) => {
    const t = part.trim();
    if (t.includes('-')) {
      const [a, b] = t.split('-').map(Number);
      if (!isNaN(a) && !isNaN(b) && b >= a) count += b - a + 1;
    } else {
      const n = Number(t);
      if (!isNaN(n) && n >= 1) count += 1;
    }
  });
  return Math.min(Math.max(count, 0), totalPages) || totalPages;
}

function calcCost(spec, totalPages) {
  const pages = parsePageRange(spec.pageRange, totalPages);
  const copies = Math.max(1, Number(spec.copies) || 1);
  const pps = Number(spec.pagesPerSheet) || 1;
  const basePerPage = (spec.color === 'color' ? PRICING.color : PRICING.bw)[spec.paperSize] ?? 2;
  const typeExtra = PRICING.paperType[spec.paperType] ?? 0;
  const ppsMulti = PRICING.pagesPerSheet[pps] ?? 1;
  const sideMulti = spec.sides === 'double' ? PRICING.doubleSideMulti : 1;
  const laminationCost = (PRICING.lamination[spec.lamination] ?? 0) * copies;
  const bindingCost = (PRICING.binding[spec.binding] ?? 0) * copies;
  const printCost = (basePerPage + typeExtra) * ppsMulti * sideMulti * pages * copies;
  const sheets = Math.ceil(pages / (spec.sides === 'double' ? 2 : 1) / pps) * copies;
  return {
    printCost: Math.max(0, printCost),
    laminationCost,
    bindingCost,
    total: Math.max(0, printCost + laminationCost + bindingCost),
    sheets,
    pages,
  };
}

/* ─── File Icon Helper ────────────────────────────────────────── */
function getFileIcon(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png'].includes(ext))
    return { Icon: Icons.FileImage, color: '#16A34A', bg: 'rgba(22,163,74,0.10)', label: ext };
  if (ext === 'pdf')
    return { Icon: Icons.FilePdf, color: '#DC2626', bg: 'rgba(220,38,38,0.10)', label: ext };
  if (['doc', 'docx'].includes(ext))
    return { Icon: Icons.FileDoc, color: '#2563EB', bg: 'rgba(37,99,235,0.10)', label: ext };
  return { Icon: Icons.FileGeneric, color: '#7E57C2', bg: 'rgba(126,87,194,0.10)', label: ext };
}

/* ─── Mock Cart Data ──────────────────────────────────────────── */
const MOCK_CART = [
  {
    id: 'ci-001',
    name: 'Thesis_Final_Chapter1.pdf',
    pages: 42,
    size: 2.1 * 1024 * 1024,
    spec: {
      paperSize: 'A4', paperType: 'Bond', pageRange: 'all', orientation: 'Portrait',
      pagesPerSheet: 1, copies: 2, lamination: 'None', binding: 'Spiral', sides: 'double', color: 'bw',
    },
  },
  {
    id: 'ci-002',
    name: 'Presentation_Deck_v3.pdf',
    pages: 18,
    size: 4.5 * 1024 * 1024,
    spec: {
      paperSize: 'A4', paperType: 'Glossy', pageRange: 'all', orientation: 'Landscape',
      pagesPerSheet: 2, copies: 3, lamination: 'Glossy Lamination', binding: 'None', sides: 'single', color: 'color',
    },
  },
  {
    id: 'ci-003',
    name: 'Assignment_CS101.docx',
    pages: 7,
    size: 0.8 * 1024 * 1024,
    spec: {
      paperSize: 'A4', paperType: 'Bond', pageRange: 'all', orientation: 'Portrait',
      pagesPerSheet: 1, copies: 1, lamination: 'None', binding: 'Stapled', sides: 'single', color: 'bw',
    },
  },
];

/* ─── Store Locations ─────────────────────────────────────────── */
const STORE_LOCATIONS = [
  {
    id: 'store-001',
    name: 'Print Hub Alandi-Moshi Road ',
    address: 'Alandi Devachi, Near MIT ACMS College, Opp. Gajanan Maharaj Mandir, Alandi, Dehu Phata',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412105',
    phone: '+91 98765 43210',
    hours: 'Mon–Sat: 9 AM – 9 PM',
    distance: '2.5 km',
  },
];

/* ─── Time Slots ──────────────────────────────────────────────── */
const TIME_SLOTS = [
  '🌅 Morning (09:00 AM – 12:00 PM)',
  '☀️ Afternoon (12:00 PM – 04:00 PM)',
  '🌆 Evening (04:00 PM – 07:00 PM)',
];

/* ─── Get min date string (today) ────────────────────────────── */
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getMaxDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/* ─── Delivery Method Toggle ─────────────────────────────────── */
function DeliveryMethodToggle({ method, onChange }) {
  return (
    <div className="co-method-toggle" role="group" aria-label="Select delivery method">
      <button
        id="co-method-pickup"
        type="button"
        className={`co-method-card${method === 'pickup' ? ' co-method-card--active' : ''}`}
        onClick={() => onChange('pickup')}
        aria-pressed={method === 'pickup'}
      >
        <span className="co-method-icon">
          <Icons.Store />
        </span>
        <span className="co-method-label">
          <span className="co-method-title">Pick Up from Store</span>
          <span className="co-method-desc">Collect at your nearest PrintHub</span>
        </span>
        <span className="co-method-radio">
          {method === 'pickup' && <Icons.Check />}
        </span>
      </button>

      <button
        id="co-method-delivery"
        type="button"
        className={`co-method-card${method === 'delivery' ? ' co-method-card--active' : ''}`}
        onClick={() => onChange('delivery')}
        aria-pressed={method === 'delivery'}
      >
        <span className="co-method-icon">
          <Icons.Truck />
        </span>
        <span className="co-method-label">
          <span className="co-method-title">Home Delivery</span>
          <span className="co-method-desc">Delivered to your doorstep</span>
        </span>
        <span className="co-method-radio">
          {method === 'delivery' && <Icons.Check />}
        </span>
      </button>
    </div>
  );
}

/* ─── Pickup Form ─────────────────────────────────────────────── */
function PickupForm({ pickupData, onChange, errors }) {
  const today = getTodayString();
  const maxDate = getMaxDateString();

  return (
    <div className="co-form-section fade-up">
      {/* Store Location */}
      <div className="co-form-block">
        <div className="co-form-block-hd">
          <span className="co-form-block-icon"><Icons.MapPin /></span>
          <div>
            <div className="co-form-block-title">Store Location</div>
            <div className="co-form-block-sub">Choose your preferred PrintHub store</div>
          </div>
        </div>
        <div className="co-store-list" role="list">
          {STORE_LOCATIONS.map((store) => (
            <button
              key={store.id}
              type="button"
              role="listitem"
              className={`co-store-card${pickupData.storeId === store.id ? ' co-store-card--active' : ''}`}
              onClick={() => onChange('storeId', store.id)}
              aria-pressed={pickupData.storeId === store.id}
            >
              <div className="co-store-sel">
                <div className={`co-store-radio${pickupData.storeId === store.id ? ' co-store-radio--active' : ''}`}>
                  {pickupData.storeId === store.id && <span className="co-store-radio-dot" />}
                </div>
              </div>
              <div className="co-store-info">
                <div className="co-store-name">{store.name}</div>
                <div className="co-store-addr">{store.address}, {store.city} – {store.pincode}</div>
                <div className="co-store-meta">
                  <span><Icons.Clock /> {store.hours}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
        {errors.storeId && <p className="co-field-error">{errors.storeId}</p>}
      </div>

      {/* Date & Time Selection */}
      <div className="co-form-block">
        <div className="co-form-block-hd">
          <span className="co-form-block-icon"><Icons.Clock /></span>
          <div>
            <div className="co-form-block-title">Pickup Schedule</div>
            <div className="co-form-block-sub">Select when you'd like to collect your order</div>
          </div>
        </div>
        <div className="co-pickup-grid">
          <div className="co-field">
            <label className="co-label" htmlFor="co-pickup-date">
              <Icons.Calendar /> Pickup Date
            </label>
            <input
              id="co-pickup-date"
              type="date"
              className={`co-input${errors.pickupDate ? ' co-input--error' : ''}`}
              value={pickupData.pickupDate}
              min={today}
              max={maxDate}
              onChange={(e) => onChange('pickupDate', e.target.value)}
            />
            {errors.pickupDate && <p className="co-field-error">{errors.pickupDate}</p>}
          </div>
          <div className="co-field">
            <label className="co-label" htmlFor="co-time-slot">
              Time Slot <span className="co-optional-badge">Optional</span>
            </label>
            <select
              id="co-time-slot"
              className="co-input co-select"
              value={pickupData.timeSlot}
              onChange={(e) => onChange('timeSlot', e.target.value)}
            >
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Delivery Form ───────────────────────────────────────────── */
function DeliveryForm({ deliveryData, onChange, errors }) {
  return (
    <div className="co-form-section fade-up">
      <div className="co-form-block">
        <div className="co-form-block-hd">
          <span className="co-form-block-icon"><Icons.Home /></span>
          <div>
            <div className="co-form-block-title">Delivery Address</div>
            <div className="co-form-block-sub">Enter the address where you'd like your order delivered</div>
          </div>
        </div>

        <div className="co-fields-grid">
          {/* Full Name */}
          <div className="co-field co-field--full">
            <label className="co-label" htmlFor="co-del-name">
              <Icons.User /> Full Name
            </label>
            <input
              id="co-del-name"
              type="text"
              className={`co-input${errors.name ? ' co-input--error' : ''}`}
              placeholder="e.g. Arjun Sharma"
              value={deliveryData.name}
              onChange={(e) => onChange('name', e.target.value)}
              autoComplete="name"
            />
            {errors.name && <p className="co-field-error">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="co-field co-field--half">
            <label className="co-label" htmlFor="co-del-phone">
              <Icons.Phone /> Phone Number
            </label>
            <input
              id="co-del-phone"
              type="tel"
              className={`co-input${errors.phone ? ' co-input--error' : ''}`}
              placeholder="+91 98765 43210"
              value={deliveryData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              autoComplete="tel"
            />
            {errors.phone && <p className="co-field-error">{errors.phone}</p>}
          </div>

          {/* Email (optional) */}
          <div className="co-field co-field--half">
            <label className="co-label" htmlFor="co-del-email">
              Email <span className="co-optional-badge">Optional</span>
            </label>
            <input
              id="co-del-email"
              type="email"
              className="co-input"
              placeholder="you@example.com"
              value={deliveryData.email}
              onChange={(e) => onChange('email', e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Address Line 1 */}
          <div className="co-field co-field--full">
            <label className="co-label" htmlFor="co-del-addr1">
              <Icons.MapPin /> Address Line 1
            </label>
            <input
              id="co-del-addr1"
              type="text"
              className={`co-input${errors.address1 ? ' co-input--error' : ''}`}
              placeholder="House / Flat No., Building, Street"
              value={deliveryData.address1}
              onChange={(e) => onChange('address1', e.target.value)}
              autoComplete="address-line1"
            />
            {errors.address1 && <p className="co-field-error">{errors.address1}</p>}
          </div>

          {/* Address Line 2 */}
          <div className="co-field co-field--full">
            <label className="co-label" htmlFor="co-del-addr2">
              Address Line 2 <span className="co-optional-badge">Optional</span>
            </label>
            <input
              id="co-del-addr2"
              type="text"
              className="co-input"
              placeholder="Area, Locality, Landmark"
              value={deliveryData.address2}
              onChange={(e) => onChange('address2', e.target.value)}
              autoComplete="address-line2"
            />
          </div>

          {/* City */}
          <div className="co-field co-field--third">
            <label className="co-label" htmlFor="co-del-city">City</label>
            <input
              id="co-del-city"
              type="text"
              className="co-input"
              value={deliveryData.city}
              disabled
              readOnly
            />
          </div>

          {/* State */}
          <div className="co-field co-field--third">
            <label className="co-label" htmlFor="co-del-state">State</label>
            <select
              id="co-del-state"
              className="co-input co-select"
              value={deliveryData.state}
              disabled
            >
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          {/* Pincode */}
          <div className="co-field co-field--third">
            <label className="co-label" htmlFor="co-del-zip">PIN Code</label>
            <input
              id="co-del-zip"
              type="text"
              className={`co-input${errors.pincode ? ' co-input--error' : ''}`}
              placeholder="560 001"
              value={deliveryData.pincode}
              onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
            />
            {errors.pincode && <p className="co-field-error">{errors.pincode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Order Summary Sidebar ───────────────────────────────────── */
function OrderSidebar({ items, method, pickupData, deliveryData }) {
  const subtotal = items.reduce((s, item) => s + calcCost(item.spec, item.pages).total, 0);
  const gstRate = 0.18;
  const gst = subtotal * gstRate;
  const deliveryFee = method === 'delivery' ? 49 : 0;
  const grandTotal = subtotal + gst + deliveryFee;
  const totalSheets = items.reduce((s, item) => s + calcCost(item.spec, item.pages).sheets, 0);

  const selectedStore = STORE_LOCATIONS.find((s) => s.id === pickupData.storeId);

  return (
    <aside className="co-sidebar" aria-label="Order summary">
      <div className="co-sidebar-head">
        <span className="co-sidebar-title">Order Summary</span>
        <Link to="/cart" className="co-sidebar-edit-link" aria-label="Edit cart">
          Edit Cart
        </Link>
      </div>

      <div className="co-sidebar-items">
        {items.map((item) => {
          const cost = calcCost(item.spec, item.pages);
          const { Icon, color, bg, label } = getFileIcon(item.name);
          return (
            <div key={item.id} className="co-sidebar-item">
              <div className="co-sidebar-item-icon" style={{ color, background: bg }}>
                <Icon />
                <span className="co-sidebar-item-ext" style={{ background: color }}>{label}</span>
              </div>
              <div className="co-sidebar-item-info">
                <div className="co-sidebar-item-name" title={item.name}>{item.name}</div>
                <div className="co-sidebar-item-meta">
                  {item.spec.copies} copy · {item.spec.paperSize} · {item.spec.color === 'color' ? 'Color' : 'B&W'}
                </div>
              </div>
              <div className="co-sidebar-item-price">₹{cost.total.toFixed(2)}</div>
            </div>
          );
        })}
        <div className="co-price-line co-price-line--sheets" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--divider)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons.Printer /> Total Sheets
          </span>
          <span>{totalSheets}</span>
        </div>
      </div>

      <div className="co-sidebar-divider" />

      {/* Coupon Placeholder (UI Structure restored from Copy) */}
      <div className="co-coupon-wrap">
        <div className="co-coupon-label"><Icons.Tag /> Promo Code</div>
        <div className="co-coupon-row">
          <input
            id="co-coupon-input"
            type="text"
            className="co-coupon-input"
            placeholder="e.g. PRINT20"
            aria-label="Coupon code"
          />
          <button className="co-coupon-btn" type="button">
            Apply
          </button>
        </div>
      </div>

      <div className="co-sidebar-divider" />

      <div className="co-price-lines">
        <div className="co-price-line">
          <span>Subtotal <span className="co-price-line-meta">({items.length} {items.length === 1 ? 'item' : 'items'})</span></span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="co-price-line co-price-line--gst">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        {method === 'delivery' && (
          <div className="co-price-line">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
        )}
        {method === 'pickup' && (
          <div className="co-price-line co-price-line--discount">
            <span>Delivery Fee</span>
            <span>FREE</span>
          </div>
        )}
      </div>

      <div className="co-sidebar-divider" />

      <div className="co-price-total">
        <span>Grand Total</span>
        <span className="co-price-total-amt">₹{grandTotal.toFixed(2)}</span>
      </div>

      <div className="co-sidebar-divider" />

      {/* Method summary */}
      {method === 'pickup' && selectedStore && (
        <div className="co-sidebar-method-info">
          <div className="co-sidebar-method-label">
            <Icons.Store /> Pickup at
          </div>
          <div className="co-sidebar-method-val">{selectedStore.name}</div>
          {pickupData.pickupDate && (
            <div className="co-sidebar-method-sub">
              {new Date(pickupData.pickupDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              {pickupData.timeSlot && ` · ${pickupData.timeSlot}`}
            </div>
          )}
        </div>
      )}
      {method === 'delivery' && deliveryData.name && (
        <div className="co-sidebar-method-info">
          <div className="co-sidebar-method-label">
            <Icons.Truck /> Deliver to
          </div>
          <div className="co-sidebar-method-val">{deliveryData.name}</div>
          {deliveryData.address1 && (
            <div className="co-sidebar-method-sub">
              {deliveryData.address1}{deliveryData.city ? `, ${deliveryData.city}` : ''}
            </div>
          )}
        </div>
      )}

      <div className="co-sidebar-divider" />

      <p className="cart-summary-note" style={{ marginTop: 0, marginBottom: '16px' }}>
        <Icons.Info /> Prices include 18% GST. Final amount confirmed at checkout.
      </p>


      {/* <div className="co-sidebar-secure">
        <Icons.Lock /> Secured by 256-bit SSL encryption
      </div> */}
    </aside>
  );
}
/* ─── Success Screen ──────────────────────────────────────────── */
function SuccessScreen({ orderDetails, onGoHome, onGoOrders }) {
  const { method, items, grandTotal, orderId } = orderDetails;

  return (
    <div className="co-success fade-up">
      <div className="co-success-card">
        {/* Confetti decoration */}
        <div className="co-success-confetti" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="co-confetti-dot" style={{
              '--i': i,
              background: ['#7E57C2', '#C97A0B', '#16A34A', '#2563EB', '#DC2626'][i % 5]
            }} />
          ))}
        </div>

        {/* Icon */}
        <div className="co-success-icon" aria-label="Order placed successfully">
          <Icons.CheckCircle />
        </div>

        <h1 className="co-success-title">Order Placed!</h1>
        <p className="co-success-sub">
          Your print order has been successfully placed. We'll notify you when it's ready.
        </p>

        {/* Order ID */}
        <div className="co-success-order-id">
          <span className="co-success-order-label">Order ID</span>
          <span className="co-success-order-val">#{orderId}</span>
        </div>

        {/* Details */}
        <div className="co-success-details">
          <div className="co-success-detail-item">
            <span className="co-success-detail-label">
              {method === 'pickup' ? <><Icons.Store /> Pickup Store</> : <><Icons.Truck /> Delivery To</>}
            </span>
            <span className="co-success-detail-val">
              {method === 'pickup'
                ? orderDetails.storeName
                : orderDetails.deliveryName
              }
            </span>
          </div>
          {method === 'pickup' && orderDetails.pickupDate && (
            <div className="co-success-detail-item">
              <span className="co-success-detail-label"><Icons.Calendar /> Pickup Date</span>
              <span className="co-success-detail-val">
                {new Date(orderDetails.pickupDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                {orderDetails.timeSlot && ` · ${orderDetails.timeSlot}`}
              </span>
            </div>
          )}
          <div className="co-success-detail-item">
            <span className="co-success-detail-label"><Icons.Printer /> Items</span>
            <span className="co-success-detail-val">{items} document{items !== 1 ? 's' : ''}</span>
          </div>
          <div className="co-success-detail-item co-success-detail-item--total">
            <span className="co-success-detail-label">Amount Paid</span>
            <span className="co-success-detail-val co-success-amount">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="co-success-actions">
          <button
            id="co-success-go-orders"
            className="co-success-btn co-success-btn--primary"
            onClick={onGoOrders}
          >
            <Icons.Package /> View My Orders
          </button>
          <button
            id="co-success-go-home"
            className="co-success-btn co-success-btn--secondary"
            onClick={onGoHome}
          >
            <Icons.Home /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Unsuccess Screen ────────────────────────────────────────── */
function UnsuccessScreen({ onRetry, onGoCart }) {
  return (
    <div className="co-success fade-up">
      <div className="co-success-card co-unsuccess-card">
        {/* Icon */}
        <div className="co-success-icon co-unsuccess-icon" aria-label="Payment failed">
          <Icons.XCircle />
        </div>

        <h1 className="co-success-title">Payment Failed!</h1>
        <p className="co-success-sub">
          Unfortunately, your payment could not be processed. Your files have been safely saved to your cart. Please try again or use a different payment method.
        </p>

        {/* Actions */}
        <div className="co-success-actions">
          <button
            id="co-unsuccess-retry"
            className="co-success-btn co-success-btn--primary"
            onClick={onRetry}
          >
            Try Again
          </button>
          <button
            id="co-unsuccess-go-cart"
            className="co-success-btn co-success-btn--secondary"
            onClick={onGoCart}
          >
            <Icons.Cart /> Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Step Indicator ──────────────────────────────────────────── */
function StepIndicator({ currentStep, method }) {
  const steps = [
    { id: 1, label: method === 'pickup' ? 'Pickup Details' : 'Delivery Address' },
    { id: 2, label: 'Confirm Order' },
  ];

  return (
    <div className="co-stepper" aria-label="Checkout progress">
      {steps.map((step, i) => (
        <div key={step.id} className="co-step-item">
          <div className={`co-step-node${currentStep > step.id ? ' co-step-node--done' : currentStep === step.id ? ' co-step-node--active' : ''}`}>
            {currentStep > step.id ? <Icons.Check /> : step.id}
          </div>
          <div className={`co-step-label${currentStep === step.id ? ' co-step-label--active' : ''}`}>
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <div className={`co-step-line${currentStep > step.id ? ' co-step-line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Checkout Page ──────────────────────────────────────── */
export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Single step checkout
  const [method, setMethod] = useState('pickup');
  const [isPlacing, setIsPlacing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [pickupData, setPickupData] = useState({
    storeId: STORE_LOCATIONS[0]?.id || '',
    pickupDate: getTodayString(),
    timeSlot: '',
  });

  const [deliveryData, setDeliveryData] = useState({
    name: user?.name || user?.username || '',
    phone: user?.mobile || (user?.identifier && /^\d{10}$/.test(user.identifier) ? user.identifier : '') || '',
    email: user?.email || (user?.identifier && user?.identifier.includes('@') ? user.identifier : '') || '',
    address1: '',
    address2: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const items = location.state?.files?.length > 0 ? location.state.files : MOCK_CART;

  const subtotal = items.reduce((s, item) => s + calcCost(item.spec, item.pages).total, 0);
  const gst = subtotal * 0.18;
  const deliveryFee = method === 'delivery' ? 49 : 0;
  const grandTotal = subtotal + gst + deliveryFee;

  const onPickupChange = (key, val) => {
    setPickupData((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onDeliveryChange = (key, val) => {
    setDeliveryData((d) => ({ ...d, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (method === 'pickup') {
      if (!pickupData.storeId) errs.storeId = 'Please select a store location.';
      if (!pickupData.pickupDate) errs.pickupDate = 'Please select a pickup date.';
    } else {
      if (!deliveryData.name.trim()) errs.name = 'Full name is required.';
      if (!deliveryData.phone.trim()) errs.phone = 'Phone number is required.';
      else if (!/^[6-9]\d{9}$/.test(deliveryData.phone.replace(/\s/g, '')))
        errs.phone = 'Enter a valid 10-digit Indian mobile number.';
      if (!deliveryData.address1.trim()) errs.address1 = 'Address is required.';
      if (!deliveryData.city.trim()) errs.city = 'City is required.';
      if (!deliveryData.state) errs.state = 'State is required.';
      if (!deliveryData.pincode || deliveryData.pincode.length < 6) errs.pincode = 'Enter a valid 6-digit PIN code.';
    }
    return errs;
  };

  const handlePlaceOrder = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowPaymentModal(true);
  };

  const processOrder = (success) => {
    setShowPaymentModal(false);
    setIsPlacing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPlacing(false);
      if (success) {
        const orderId = `PH${Date.now().toString().slice(-8)}`;
        const selectedStore = STORE_LOCATIONS.find((s) => s.id === pickupData.storeId);
        setOrderDetails({
          orderId,
          method,
          items: items.length,
          grandTotal,
          storeName: selectedStore?.name || '',
          deliveryName: deliveryData.name,
          pickupDate: pickupData.pickupDate,
          timeSlot: pickupData.timeSlot,
        });
        setIsSuccess(true);
      } else {
        setIsFailed(true);
      }
      window.scrollTo(0, 0);
    }, 1800);
  };

  if (isSuccess && orderDetails) {
    return (
      <div className="co-page">
        <div className="co-wrap">
          <SuccessScreen
            orderDetails={orderDetails}
            onGoHome={() => navigate('/')}
            onGoOrders={() => navigate('/orders')}
          />
        </div>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="co-page">
        <div className="co-wrap">
          <UnsuccessScreen
            onRetry={() => setIsFailed(false)}
            onGoCart={() => navigate('/cart')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="co-page">
      {/* Payment Simulation Modal */}
      {showPaymentModal && (
        <div className="co-modal-overlay">
          <div className="co-modal-card fade-up">
            <button className="co-modal-close" onClick={() => setShowPaymentModal(false)} aria-label="Close">
              <Icons.X />
            </button>
            <h3 className="co-modal-title">Payment Simulation</h3>
            <p className="co-modal-sub">Choose the outcome of the payment for testing.</p>
            <div className="co-modal-actions">
              <button
                className="co-btn co-btn--primary"
                onClick={() => processOrder(true)}
              >
                Payment successfully
              </button>
              <button
                className="co-btn co-btn--ghost"
                onClick={() => processOrder(false)}
              >
                Unsuccess
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="co-wrap">

        {/* ── Page Header ── */}
        <header className="co-header fade-up">
          <div className="co-eyebrow">
            <Icons.Cart />
            <span>Checkout</span>
          </div>
          <h1 className="co-title">Complete Your Order</h1>
          <p className="co-subtitle">
            Review your cart and choose how you'd like to receive your prints.
          </p>
        </header>

        {/* ── Two-Column Layout ── */}
        <div className="co-layout">

          {/* ── Left: Main content ── */}
          <main className="co-main">
            <div className="co-step-content fade-up">
              {/* Delivery Method Selection */}
              <div className="co-block-head">
                <h2 className="co-block-title">Delivery Method</h2>
                <p className="co-block-sub">Choose how you'd like to receive your order.</p>
              </div>
              <DeliveryMethodToggle method={method} onChange={setMethod} />

              {method === 'pickup' ? (
                <div className="co-form-section" style={{ marginTop: '32px' }}>
                  <div className="co-block-head">
                    <h2 className="co-block-title">Pickup Details</h2>
                    <p className="co-block-sub">Select your store, date, and preferred time slot.</p>
                  </div>
                  <PickupForm pickupData={pickupData} onChange={onPickupChange} errors={errors} />
                </div>
              ) : (
                <div className="co-form-section" style={{ marginTop: '32px' }}>
                  <div className="co-block-head">
                    <h2 className="co-block-title">Delivery Address</h2>
                    <p className="co-block-sub">We'll deliver your printed documents to this address.</p>
                  </div>
                  <DeliveryForm deliveryData={deliveryData} onChange={onDeliveryChange} errors={errors} />
                </div>
              )}
            </div>



            {/* ── Navigation Buttons ── */}
            <div className="co-nav-btns">
              <Link to="/cart" className="co-btn co-btn--ghost" id="co-btn-back-to-cart">
                <Icons.ChevronLeft /> Back to Cart
              </Link>
              <button
                id="co-btn-place-order"
                type="button"
                className={`co-btn co-btn--place${isPlacing ? ' co-btn--loading' : ''}`}
                onClick={handlePlaceOrder}
                disabled={isPlacing}
              >
                {isPlacing ? (
                  <><span className="co-spinner" aria-hidden="true" /> Placing Order…</>
                ) : (
                  <><Icons.Check /> Place Order · ₹{grandTotal.toFixed(2)}</>
                )}
              </button>
            </div>
          </main>

          {/* ── Right: Sidebar ── */}
          <OrderSidebar
            items={items}
            method={method}
            pickupData={pickupData}
            deliveryData={deliveryData}
          />
        </div>

        {/* ── Mobile Sticky Bar (matches Cart Page) ── */}
        <div className="co-mobile-bar">
          <div className="co-mobile-bar-inner">

            <div className="co-mobile-actions">
              <Link to="/cart" className="co-btn co-btn--ghost co-mobile-btn" id="co-btn-back-to-cart-mobile">
                <Icons.ChevronLeft /> Back to Cart
              </Link>
              <button
                type="button"
                className={`co-btn co-btn--place co-mobile-btn${isPlacing ? ' co-btn--loading' : ''}`}
                onClick={handlePlaceOrder}
                disabled={isPlacing}
              >
                {isPlacing ? (
                  <><span className="co-spinner" aria-hidden="true" /> Placing…</>
                ) : (
                  <><Icons.Check /> Place Order · ₹{grandTotal.toFixed(2)}</>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
