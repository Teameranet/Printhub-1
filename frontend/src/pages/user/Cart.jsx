import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Cart.css';

/* ─── Icons ─────────────────────────────────────────────────── */
const Icons = {
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  FilePdf: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" x2="15" y1="13" y2="13" /><line x1="9" x2="15" y1="17" y2="17" />
    </svg>
  ),
  FileImage: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  ),
  FileDoc: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" x2="15" y1="13" y2="13" /><line x1="9" x2="12" y1="17" y2="17" />
    </svg>
  ),
  FilePpt: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <rect x="9" y="12" width="6" height="5" rx="1" />
    </svg>
  ),
  FileGeneric: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Checkout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Tag: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
  Info: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  Printer: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  ),
  Save: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  Warning: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  Palette: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  File: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Copy: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Book: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3c.132 5.813 4.45 10.131 10.263 10.263-5.813.132-10.131 4.45-10.263 10.263C11.868 17.713 7.55 13.395 1.737 13.263 7.55 13.131 11.868 8.813 12 3z" />
    </svg>
  ),
  Scroll: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </svg>
  ),
};

/* ─── Pricing (mirrors NormalPrint.jsx) ──────────────────────── */
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

/* ─── File helpers ───────────────────────────────────────────── */
function getFileIcon(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png'].includes(ext))
    return { Icon: Icons.FileImage, color: '#16A34A', bg: 'rgba(22,163,74,0.10)', label: ext.toUpperCase() };
  if (ext === 'pdf')
    return { Icon: Icons.FilePdf, color: '#DC2626', bg: 'rgba(220,38,38,0.10)', label: 'PDF' };
  if (['doc', 'docx'].includes(ext))
    return { Icon: Icons.FileDoc, color: '#2563EB', bg: 'rgba(37,99,235,0.10)', label: ext.toUpperCase() };
  if (['ppt', 'pptx'].includes(ext))
    return { Icon: Icons.FilePpt, color: '#C97A0B', bg: 'rgba(201,122,11,0.10)', label: ext.toUpperCase() };
  return { Icon: Icons.FileGeneric, color: '#7E57C2', bg: 'rgba(126,87,194,0.10)', label: ext.toUpperCase() };
}

function isPreviewable(name) {
  const ext = (name || '').split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'pdf'].includes(ext);
}

/* ─── Mock Cart Data ─────────────────────────────────────────── */
const MOCK_CART = [
  {
    id: 'ci-001',
    name: 'Thesis_Final_Chapter1.pdf',
    pages: 42,
    size: 2.1 * 1024 * 1024,
    previewUrl: null,
    addedAt: '2026-07-03T09:10:00',
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
    previewUrl: null,
    addedAt: '2026-07-03T09:12:00',
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
    previewUrl: null,
    addedAt: '2026-07-03T09:15:00',
    spec: {
      paperSize: 'A4', paperType: 'Bond', pageRange: 'all', orientation: 'Portrait',
      pagesPerSheet: 1, copies: 1, lamination: 'None', binding: 'Stapled', sides: 'single', color: 'bw',
    },
  },
];

/* ─── Segmented Control ──────────────────────────────────────── */
function Seg({ options, value, onChange, name }) {
  return (
    <div className="cart-seg" role="group" aria-label={name}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`cart-seg-btn${value === opt.value ? ' cart-seg-btn--on' : ''}`}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Preview Modal ──────────────────────────────────────────── */
function PreviewModal({ item, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!item) return null;
  const isImg = ['jpg', 'jpeg', 'png'].includes((item.name || '').split('.').pop().toLowerCase());
  const isPdf = (item.name || '').split('.').pop().toLowerCase() === 'pdf';

  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal aria-label="File preview">
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-hd">
          <div>
            <div className="cart-modal-fname">{item.name}</div>
            <div className="cart-modal-fmeta">
              {item.pages} page{item.pages !== 1 ? 's' : ''} · {(item.size / (1024 * 1024)).toFixed(2)} MB
            </div>
          </div>
          <button className="cart-modal-close" onClick={onClose} aria-label="Close preview">
            <Icons.Close />
          </button>
        </div>
        <div className="cart-modal-body">
          {isImg && item.previewUrl && (
            <img src={item.previewUrl} alt={`Preview of ${item.name}`} className="cart-prev-img" />
          )}
          {isPdf && item.previewUrl && (
            <iframe src={item.previewUrl} title={`PDF: ${item.name}`} className="cart-prev-pdf" />
          )}
          {(!isImg || !item.previewUrl) && (!isPdf || !item.previewUrl) && (
            <div className="cart-prev-unavail">
              {(() => {
                const { Icon, color } = getFileIcon(item.name);
                return <span style={{ color }}><Icon /></span>;
              })()}
              <p>Live preview requires the original file.</p>
              <span>The file will be printed as originally uploaded.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Edit Spec Modal ────────────────────────────────────────── */
function EditSpecModal({ item, onSave, onClose }) {
  const [spec, setSpec] = useState({ ...item.spec });
  const cost = calcCost(spec, item.pages);
  const set = (k, v) => setSpec((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal aria-label="Edit specifications">
      <div className="cart-modal cart-modal--edit" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-hd">
          <div>
            <div className="cart-modal-fname">Edit Specifications</div>
            <div className="cart-modal-fmeta">{item.name}</div>
          </div>
          <button className="cart-modal-close" onClick={onClose} aria-label="Close">
            <Icons.Close />
          </button>
        </div>
        <div className="cart-modal-body cart-edit-body">

          {/* Segmented controls */}
          <div className="cart-edit-segs">
            <div className="cart-edit-seg-group">
              <span className="cart-edit-seg-lbl">Printing Side</span>
              <Seg name="sides" value={spec.sides} onChange={(v) => set('sides', v)} options={[
                { value: 'single', label: 'Single-Sided' },
                { value: 'double', label: 'Double-Sided' },
              ]} />
            </div>
            <div className="cart-edit-seg-group">
              <span className="cart-edit-seg-lbl">Color Mode</span>
              <Seg name="color" value={spec.color} onChange={(v) => set('color', v)} options={[
                { value: 'bw', label: 'Black & White' },
                { value: 'color', label: 'Color' },
              ]} />
            </div>
          </div>

          {/* Spec fields */}
          <div className="cart-edit-grid">
            <div className="cart-edit-field">
              <label htmlFor={`edit-size-${item.id}`}>Paper Size</label>
              <select id={`edit-size-${item.id}`} className="cart-select" value={spec.paperSize} onChange={(e) => set('paperSize', e.target.value)}>
                {['A4', 'A3', 'A5', 'Letter', 'Legal'].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="cart-edit-field">
              <label htmlFor={`edit-type-${item.id}`}>Paper Type</label>
              <select id={`edit-type-${item.id}`} className="cart-select" value={spec.paperType} onChange={(e) => set('paperType', e.target.value)}>
                {['Bond', 'Glossy', 'Matte', 'Cardstock'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="cart-edit-field">
              <label htmlFor={`edit-range-${item.id}`}>Page Range</label>
              <input
                id={`edit-range-${item.id}`}
                type="text"
                className="cart-input"
                value={spec.pageRange}
                onChange={(e) => set('pageRange', e.target.value)}
                placeholder='all · 1-5 · 1,3,7'
              />
            </div>
            <div className="cart-edit-field">
              <label htmlFor={`edit-orient-${item.id}`}>Orientation</label>
              <select id={`edit-orient-${item.id}`} className="cart-select" value={spec.orientation} onChange={(e) => set('orientation', e.target.value)}>
                {['Portrait', 'Landscape', 'Auto'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="cart-edit-field">
              <label htmlFor={`edit-copies-${item.id}`}>Copies</label>
              <div className="cart-stepper">
                <button type="button" className="cart-step-btn" onClick={() => set('copies', Math.max(1, (spec.copies || 1) - 1))} aria-label="Decrease">−</button>
                <input
                  id={`edit-copies-${item.id}`}
                  type="number"
                  className="cart-step-input"
                  value={spec.copies}
                  min={1} max={9999}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') set('copies', '');
                    else { const n = parseInt(val, 10); if (!isNaN(n)) set('copies', n); }
                  }}
                  onBlur={(e) => {
                    const n = parseInt(e.target.value, 10);
                    set('copies', isNaN(n) || n < 1 ? 1 : Math.min(9999, n));
                  }}
                />
                <button type="button" className="cart-step-btn" onClick={() => set('copies', Math.min(9999, (spec.copies || 1) + 1))} aria-label="Increase">+</button>
              </div>
            </div>
            <div className="cart-edit-field">
              <label htmlFor={`edit-lam-${item.id}`}>Lamination</label>
              <select id={`edit-lam-${item.id}`} className="cart-select" value={spec.lamination} onChange={(e) => set('lamination', e.target.value)}>
                {['None', 'Glossy Lamination', 'Matte Lamination'].map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="cart-edit-field">
              <label htmlFor={`edit-bind-${item.id}`}>Binding</label>
              <select id={`edit-bind-${item.id}`} className="cart-select" value={spec.binding} onChange={(e) => set('binding', e.target.value)}>
                {['None', 'Spiral', 'Stapled'].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Live cost preview */}
          <div className="cart-edit-cost">
            <div className="cart-edit-cost-items">
              <span className="cart-edit-ci">
                <span className="cart-edit-ci-label">Print</span>
                <span className="cart-edit-ci-val">₹{cost.printCost.toFixed(2)}</span>
              </span>
              {cost.laminationCost > 0 && (
                <span className="cart-edit-ci">
                  <span className="cart-edit-ci-label">Lamination</span>
                  <span className="cart-edit-ci-val">₹{cost.laminationCost.toFixed(2)}</span>
                </span>
              )}
              {cost.bindingCost > 0 && (
                <span className="cart-edit-ci">
                  <span className="cart-edit-ci-label">Binding</span>
                  <span className="cart-edit-ci-val">₹{cost.bindingCost.toFixed(2)}</span>
                </span>
              )}
              <span className="cart-edit-ci cart-edit-ci--dim">
                <span className="cart-edit-ci-label">{cost.sheets} sheet{cost.sheets !== 1 ? 's' : ''}</span>
                <span className="cart-edit-ci-val">{cost.pages} pg</span>
              </span>
            </div>
            <div className="cart-edit-total">
              <span>Est. Cost</span>
              <span className="cart-edit-total-amt">₹{cost.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="cart-modal-foot">
          <button className="cart-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="cart-modal-save" onClick={() => onSave(item.id, spec)}>
            <Icons.Save /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Remove Confirm Modal ───────────────────────────────────── */
function RemoveConfirm({ item, onConfirm, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!item) return null;
  return (
    <div className="cart-overlay" onClick={onClose} role="dialog" aria-modal aria-label="Confirm remove">
      <div className="cart-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-confirm-icon">
          <Icons.Trash />
        </div>
        <h3 className="cart-confirm-title">Remove Item?</h3>
        <p className="cart-confirm-sub">
          <strong>{item.name}</strong> will be removed from your cart. This cannot be undone.
        </p>
        <div className="cart-confirm-actions">
          <button className="cart-modal-cancel" onClick={onClose}>Keep Item</button>
          <button className="cart-confirm-remove" onClick={() => onConfirm(item.id)}>
            <Icons.Trash /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Cart Item Card ─────────────────────────────────────────── */
function CartItemCard({ item, index, onUpdateCopies, onUpdateSpec, onRemove, onPreview, onEdit }) {
  const { Icon, color, bg, label } = getFileIcon(item.name);
  const cost = calcCost(item.spec, item.pages);
  const spec = item.spec;

  const specTags = [
    { label: spec.color === 'color' ? 'Color' : 'B&W', Icon: Icons.Palette },
    { label: spec.paperSize, Icon: Icons.File },
    { label: spec.paperType, Icon: Icons.Scroll },
    { label: spec.sides === 'double' ? 'Double-sided' : 'Single-sided', Icon: Icons.Copy },
    spec.lamination !== 'None' ? { label: spec.lamination, Icon: Icons.Sparkles } : null,
    spec.binding !== 'None' ? { label: spec.binding, Icon: Icons.Book } : null,
  ].filter(Boolean);

  return (
    <article
      className="cart-item fade-up"
      style={{ animationDelay: `${Math.min(index * 0.08, 0.4)}s` }}
      aria-label={`Cart item: ${item.name}`}
    >
      {/* ── Header ── */}
      <div className="cart-item-hd">
        <div className="cart-item-icon" style={{ color, background: bg }}>
          <Icon />
          <span className="cart-item-ext" style={{ background: color }}>{label}</span>
        </div>
        <div className="cart-item-info">
          <div className="cart-item-fname" title={item.name}>{item.name}</div>
          <div className="cart-item-fmeta">
            <span>{item.pages} page{item.pages !== 1 ? 's' : ''}</span>
            <span className="cart-dot">·</span>
            <span>{(item.size / (1024 * 1024)).toFixed(2)} MB</span>
            <span className="cart-dot">·</span>
            <span>Added {new Date(item.addedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        <div className="cart-item-actions">
          {isPreviewable(item.name) && (
            <button className="cart-act-btn cart-act-btn--view" onClick={() => onPreview(item)} title="View File" aria-label={`View ${item.name}`}>
              <Icons.Eye /> View
            </button>
          )}
          <button className="cart-act-btn cart-act-btn--edit" onClick={() => onEdit(item)} title="Edit Specifications" aria-label={`Edit specs for ${item.name}`}>
            <Icons.Edit /> Edit
          </button>
          <button className="cart-act-btn cart-act-btn--del" onClick={() => onRemove(item)} title="Remove" aria-label={`Remove ${item.name}`}>
            <Icons.Trash />
          </button>
        </div>
      </div>

      {/* ── Spec Tags ── */}
      <div className="cart-item-tags">
        {specTags.map((tag) => {
          const TagIcon = tag.Icon || Icons.Tag;
          return (
            <span key={tag.label} className="cart-tag">
              <TagIcon /> {tag.label}
            </span>
          );
        })}
        <span className="cart-tag cart-tag--pages">
          <Icons.Info />
          {spec.pageRange?.toLowerCase() === 'all' || !spec.pageRange ? 'All pages' : `Pages: ${spec.pageRange}`}
        </span>
      </div>

      {/* ── Quantity & Cost Row ── */}
      <div className="cart-item-foot">
        <div className="cart-item-qty">
          <span className="cart-qty-label">Copies</span>
          <div className="cart-stepper">
            <button
              type="button"
              className="cart-step-btn"
              onClick={() => onUpdateCopies(item.id, Math.max(1, (spec.copies || 1) - 1))}
              aria-label="Decrease copies"
            >−</button>
            <input
              type="number"
              className="cart-step-input"
              value={spec.copies}
              min={1} max={9999}
              aria-label="Number of copies"
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') onUpdateCopies(item.id, '');
                else { const n = parseInt(val, 10); if (!isNaN(n)) onUpdateCopies(item.id, n); }
              }}
              onBlur={(e) => {
                const n = parseInt(e.target.value, 10);
                onUpdateCopies(item.id, isNaN(n) || n < 1 ? 1 : Math.min(9999, n));
              }}
            />
            <button
              type="button"
              className="cart-step-btn"
              onClick={() => onUpdateCopies(item.id, Math.min(9999, (spec.copies || 1) + 1))}
              aria-label="Increase copies"
            >+</button>
          </div>
        </div>

        <div className="cart-item-cost-breakdown">
          <span className="cart-cost-ci">
            <span className="cart-cost-label">Print</span>
            <span className="cart-cost-val">₹{cost.printCost.toFixed(2)}</span>
          </span>
          {cost.laminationCost > 0 && (
            <span className="cart-cost-ci">
              <span className="cart-cost-label">Lamination</span>
              <span className="cart-cost-val">₹{cost.laminationCost.toFixed(2)}</span>
            </span>
          )}
          {cost.bindingCost > 0 && (
            <span className="cart-cost-ci">
              <span className="cart-cost-label">Binding</span>
              <span className="cart-cost-val">₹{cost.bindingCost.toFixed(2)}</span>
            </span>
          )}
          <span className="cart-cost-ci cart-cost-ci--dim">
            <span className="cart-cost-label">{cost.sheets} sheet{cost.sheets !== 1 ? 's' : ''}</span>
          </span>
        </div>

        <div className="cart-item-total">
          <span className="cart-item-total-label">Item Total</span>
          <span className="cart-item-total-amt">₹{cost.total.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── Order Summary Panel ────────────────────────────────────── */
function OrderSummaryPanel({ items, onCheckout }) {
  const subtotal = items.reduce((s, item) => s + calcCost(item.spec, item.pages).total, 0);
  const gstRate = 0.18;
  const gst = subtotal * gstRate;
  const grandTotal = subtotal + gst;
  const totalSheets = items.reduce((s, item) => s + calcCost(item.spec, item.pages).sheets, 0);
  const totalFiles = items.length;

  return (
    <aside className="cart-summary" aria-label="Order summary">
      <div className="cart-summary-head">
        <div className="cart-summary-title">Order Summary</div>
        <div className="cart-summary-count">{totalFiles} item{totalFiles !== 1 ? 's' : ''}</div>
      </div>

      <div className="cart-summary-stats">
        <div className="cart-sstat">
          <span className="cart-sstat-label">Total Files</span>
          <span className="cart-sstat-val">{totalFiles}</span>
        </div>
        <div className="cart-sstat">
          <span className="cart-sstat-label">Total Sheets</span>
          <span className="cart-sstat-val">{totalSheets}</span>
        </div>
      </div>

      <div className="cart-summary-divider" />

      <div className="cart-summary-lines">
        <div className="cart-summary-line">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-line cart-summary-line--gst">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-summary-divider" />

      <div className="cart-summary-total">
        <span>Grand Total</span>
        <span className="cart-summary-total-amt">₹{grandTotal.toFixed(2)}</span>
      </div>

      <button
        id="cart-checkout-btn"
        className="cart-checkout-btn"
        onClick={onCheckout}
        disabled={items.length === 0}
        aria-label="Proceed to checkout"
      >
        <Icons.Checkout /> Proceed to Checkout
      </button>

      <p className="cart-summary-note">
        <Icons.Info /> Prices are estimated. Final amount confirmed at checkout.
      </p>
    </aside>
  );
}

/* ─── Empty State ────────────────────────────────────────────── */
function CartEmpty() {
  return (
    <div className="cart-empty fade-up">
      <div className="cart-empty-art">
        <div className="cart-empty-circle">
          <Icons.Cart />
        </div>
      </div>
      <h2 className="cart-empty-title">Your cart is empty</h2>
      <p className="cart-empty-sub">
        Upload and configure your documents to add them here. Your print specifications will be saved automatically.
      </p>
      <div className="cart-empty-actions">
        <Link to="/print/normal" id="cart-start-printing-link" className="cart-empty-btn">
          <Icons.Printer /> Start Printing
        </Link>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState(MOCK_CART);
  const [previewItem, setPreviewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [removed, setRemoved] = useState(null);

  const updateCopies = useCallback((id, copies) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, spec: { ...item.spec, copies } } : item
      )
    );
  }, []);

  const updateSpec = useCallback((id, spec) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, spec } : item))
    );
    setEditItem(null);
  }, []);

  const confirmRemove = useCallback((id) => {
    const target = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setRemoveTarget(null);
    if (target) {
      setRemoved(target.name);
      setTimeout(() => setRemoved(null), 4000);
    }
  }, [items]);

  const handleCheckout = () => {
    // Navigate to checkout page (not built yet — placeholder)
    navigate('/checkout');
  };

  const grandTotal = items.reduce((s, item) => s + calcCost(item.spec, item.pages).total, 0);
  const gst = grandTotal * 0.18;
  const totalSheets = items.reduce((s, item) => s + calcCost(item.spec, item.pages).sheets, 0);

  return (
    <div className="cart-page">
      {/* ── Modals ── */}
      {previewItem && <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
      {editItem && (
        <EditSpecModal
          item={editItem}
          onSave={updateSpec}
          onClose={() => setEditItem(null)}
        />
      )}
      {removeTarget && (
        <RemoveConfirm
          item={removeTarget}
          onConfirm={confirmRemove}
          onClose={() => setRemoveTarget(null)}
        />
      )}

      {/* ── Removal Toast ── */}
      {removed && (
        <div className="cart-toast" role="status" aria-live="polite">
          <span className="cart-toast-check"><Icons.Check /></span>
          <span><strong>{removed}</strong> removed from cart.</span>
        </div>
      )}

      <div className="cart-wrap">

        {/* ── Page Header ── */}
        <header className="cart-header fade-up">
          {/* <nav className="cart-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="cart-breadcrumb-sep">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
            <span className="cart-breadcrumb-current">Shopping Cart</span>
          </nav> */}
          <div className="cart-eyebrow">
            <Icons.Cart />
            <span>Your Cart</span>
          </div>
          <h1 className="cart-title">Print Cart</h1>
          <p className="cart-subtitle">
            Review your documents, adjust specifications, and proceed to checkout.
          </p>
        </header>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="cart-layout">

            {/* ── Left: Item List ── */}
            <section className="cart-items-section" aria-label="Cart items">
              <div className="cart-items-hd">
                <h2 className="cart-items-title">
                  Documents
                  <span className="cart-count-badge">{items.length} file{items.length !== 1 ? 's' : ''}</span>
                </h2>
                <p className="cart-items-sub">
                  Adjust copies inline or tap <strong>Edit</strong> to change full specifications.
                </p>
              </div>

              <div className="cart-items-list">
                {items.map((item, i) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    index={i}
                    onUpdateCopies={updateCopies}
                    onUpdateSpec={updateSpec}
                    onRemove={setRemoveTarget}
                    onPreview={setPreviewItem}
                    onEdit={setEditItem}
                  />
                ))}
              </div>
            </section>

            {/* ── Right: Summary ── */}
            <OrderSummaryPanel items={items} onCheckout={handleCheckout} />
          </div>
        )}

        {/* ── Sticky Mobile Checkout Bar ── */}
        {items.length > 0 && (
          <div className="cart-mobile-bar" role="complementary" aria-label="Order summary">
            <div className="cart-mobile-bar-inner">
              <div className="cart-mobile-stats">
                <div className="cart-mobile-stat">
                  <span className="cart-mobile-stat-label">Total Files</span>
                  <span className="cart-mobile-stat-val">{items.length}</span>
                </div>
                <div className="cart-mobile-stat-div" />
                <div className="cart-mobile-stat">
                  <span className="cart-mobile-stat-label">Total Sheets</span>
                  <span className="cart-mobile-stat-val">{totalSheets}</span>
                </div>
                <div className="cart-mobile-stat-div" />
                <div className="cart-mobile-stat">
                  <span className="cart-mobile-stat-label">Grand Total</span>
                  <span className="cart-mobile-stat-val cart-mobile-stat-val--price">₹{(grandTotal + gst).toFixed(2)}</span>
                </div>
              </div>
              <div className="cart-mobile-actions">
                <p className="cart-mobile-note">Includes 18% GST</p>
                <button
                  className="cart-checkout-btn cart-checkout-btn--mobile"
                  onClick={handleCheckout}
                >
                  <Icons.Checkout /> Checkout · ₹{(grandTotal + gst).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
