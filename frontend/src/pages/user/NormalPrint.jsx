import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './NormalPrint.css';

/* ─── Icons ───────────────────────────────────────────────────── */
const Icons = {
  Upload: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  ),
  FilePdf: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" x2="15" y1="13" y2="13" />
      <line x1="9" x2="15" y1="17" y2="17" />
    </svg>
  ),
  FileImage: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  ),
  FileDoc: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" x2="15" y1="13" y2="13" />
      <line x1="9" x2="12" y1="17" y2="17" />
    </svg>
  ),
  FilePpt: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <rect x="9" y="12" width="6" height="5" rx="1" />
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Print: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  ShoppingCart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  Info: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  Warning: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  FileGeneric: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
};

/* ─── Pricing configuration (INR) ────────────────────────────── */
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
  range.split(',').forEach(part => {
    const t = part.trim();
    if (t.includes('-')) {
      const [a, b] = t.split('-').map(Number);
      if (!isNaN(a) && !isNaN(b) && b >= a) count += (b - a + 1);
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
    laminationCost: laminationCost,
    bindingCost: bindingCost,
    total: Math.max(0, printCost + laminationCost + bindingCost),
    sheets,
    pages,
  };
}

/* ─── File helpers ───────────────────────────────────────────── */
function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
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

const SUPPORTED_EXTS = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'ppt', 'pptx'];
const MAX_TOTAL_MB = 500;

function isPreviewable(name) {
  const ext = name.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'pdf'].includes(ext);
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function estimatePages(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png'].includes(ext)) return 1;
  return Math.max(1, Math.round(file.size / 75000));
}

const DEFAULT_SPEC = {
  paperSize: 'A4',
  paperType: 'Bond',
  pageRange: 'all',
  orientation: 'Portrait',
  pagesPerSheet: 1,
  copies: 1,
  lamination: 'None',
  binding: 'None',
  sides: 'single',
  color: 'bw',
};

/* ─── Segmented Control ──────────────────────────────────────── */
function Seg({ options, value, onChange, name }) {
  return (
    <div className="np-seg" role="group" aria-label={name}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`np-seg-btn${value === opt.value ? ' np-seg-btn--on' : ''}`}
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
function PreviewModal({ file, onClose }) {
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!file) return null;
  const isImg = ['jpg', 'jpeg', 'png'].includes(file.name.split('.').pop().toLowerCase());
  const isPdf = file.name.split('.').pop().toLowerCase() === 'pdf';

  return (
    <div className="np-overlay" onClick={onClose} role="dialog" aria-modal aria-label="File preview">
      <div className="np-modal" onClick={e => e.stopPropagation()}>
        <div className="np-modal-hd">
          <div>
            <div className="np-modal-fname">{file.name}</div>
            <div className="np-modal-fmeta">{fmtSize(file.fileObj?.size || 0)} · {file.pages} page{file.pages !== 1 ? 's' : ''}</div>
          </div>
          <button className="np-modal-close" onClick={onClose} aria-label="Close preview"><Icons.Close /></button>
        </div>
        <div className="np-modal-body">
          {isImg && file.previewUrl && (
            <img src={file.previewUrl} alt={`Preview of ${file.name}`} className="np-prev-img" />
          )}
          {isPdf && file.previewUrl && (
            <iframe src={file.previewUrl} title={`PDF: ${file.name}`} className="np-prev-pdf" />
          )}
          {!isImg && !isPdf && (
            <div className="np-prev-unavail">
              {(() => { const { Icon, color } = getFileIcon(file.name); return <span style={{ color, fontSize: 48 }}><Icon /></span>; })()}
              <p>Live preview is not available for this file type.</p>
              <span>The file will be printed as uploaded.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── File Spec Card ─────────────────────────────────────────── */
function FileSpecCard({ file, onChange, onRemove, onPreview, index }) {
  const spec = file.spec;
  const cost = calcCost(spec, file.pages);
  const { Icon, color, bg, label } = getFileIcon(file.name);
  const set = (k, v) => onChange(file.id, { ...spec, [k]: v });

  return (
    <article
      className="np-card fade-up"
      style={{ animationDelay: `${Math.min(index * 0.07, 0.42)}s` }}
      aria-label={`Print configuration for ${file.name}`}
    >
      {/* Card header */}
      <div className="np-card-hd">
        <div className="np-card-icon" style={{ color, background: bg }}>
          <Icon />
          <span className="np-card-ext" style={{ background: color }}>{label}</span>
        </div>
        <div className="np-card-info">
          <div className="np-card-fname" title={file.name}>{file.name}</div>
          <div className="np-card-fmeta">
            <span>{fmtSize(file.fileObj?.size || 0)}</span>
            <span className="np-dot">·</span>
            <span>{file.pages} page{file.pages !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="np-card-acts">
          {isPreviewable(file.name) && (
            <button className="np-act-btn np-act-btn--view" onClick={() => onPreview(file)} title="Preview" aria-label={`Preview ${file.name}`}>
              <Icons.Eye /> Preview
            </button>
          )}
          <button className="np-act-btn np-act-btn--del" onClick={() => onRemove(file.id)} title="Remove" aria-label={`Remove ${file.name}`}>
            <Icons.Trash />
          </button>
        </div>
      </div>

      {/* Segmented controls row */}
      <div className="np-seg-row">
        <div className="np-seg-group">
          <span className="np-seg-lbl">Printing Side</span>
          <Seg name="sides" value={spec.sides} onChange={v => set('sides', v)} options={[
            { value: 'single', label: 'Single-Sided' },
            { value: 'double', label: 'Double-Sided' },
          ]} />
        </div>
        <div className="np-seg-group">
          <span className="np-seg-lbl">Color Mode</span>
          <Seg name="color" value={spec.color} onChange={v => set('color', v)} options={[
            { value: 'bw', label: 'Black & White' },
            { value: 'color', label: 'Color' },
          ]} />
        </div>
      </div>

      {/* Specs grid — 4 columns on wide, 2 on tablet, 1 on mobile */}
      <div className="np-spec-grid">
        <div className="np-field">
          <label htmlFor={`size-${file.id}`}>Paper Size</label>
          <select id={`size-${file.id}`} className="np-select" value={spec.paperSize} onChange={e => set('paperSize', e.target.value)}>
            {['A4', 'A3', 'A5', 'Letter', 'Legal'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="np-field">
          <label htmlFor={`type-${file.id}`}>Paper Type</label>
          <select id={`type-${file.id}`} className="np-select" value={spec.paperType} onChange={e => set('paperType', e.target.value)}>
            {['Bond', 'Glossy', 'Matte', 'Cardstock'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="np-field">
          <label htmlFor={`range-${file.id}`}>
            Page Range
            <span className="np-field-tip" title='e.g. "all", "1-5", "1,3,7-9"'><Icons.Info /></span>
          </label>
          <input
            id={`range-${file.id}`}
            type="text"
            className="np-input"
            value={spec.pageRange}
            onChange={e => set('pageRange', e.target.value)}
            placeholder='all · 1-5 · 1,3,7'
          />
        </div>

        <div className="np-field">
          <label htmlFor={`orient-${file.id}`}>
            Orientation
            <span className="np-optional">Optional</span>
          </label>
          <select id={`orient-${file.id}`} className="np-select" value={spec.orientation} onChange={e => set('orientation', e.target.value)}>
            {['Portrait', 'Landscape', 'Auto'].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>



        <div className="np-field">
          <label htmlFor={`copies-${file.id}`}>Number of Copies</label>
          <div className="np-stepper">
            <button type="button" className="np-step-btn" onClick={() => set('copies', Math.max(1, (spec.copies || 1) - 1))} aria-label="Decrease">−</button>
            <input
              id={`copies-${file.id}`}
              type="number"
              className="np-step-input"
              value={spec.copies}
              min={1} max={9999}
              onChange={e => {
                const val = e.target.value;
                if (val === '') {
                  set('copies', '');
                } else {
                  const num = parseInt(val, 10);
                  if (!isNaN(num)) {
                    set('copies', num);
                  }
                }
              }}
              onBlur={e => {
                const num = parseInt(e.target.value, 10);
                if (isNaN(num) || num < 1) {
                  set('copies', 1);
                } else {
                  set('copies', Math.min(9999, num));
                }
              }}
            />
            <button type="button" className="np-step-btn" onClick={() => set('copies', Math.min(9999, (spec.copies || 1) + 1))} aria-label="Increase">+</button>
          </div>
        </div>

        <div className="np-field">
          <label htmlFor={`lam-${file.id}`}>Lamination</label>
          <select id={`lam-${file.id}`} className="np-select" value={spec.lamination} onChange={e => set('lamination', e.target.value)}>
            {['None', 'Glossy Lamination', 'Matte Lamination'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="np-field">
          <label htmlFor={`bind-${file.id}`}>Binding Type</label>
          <select id={`bind-${file.id}`} className="np-select" value={spec.binding} onChange={e => set('binding', e.target.value)}>
            {['None', 'Spiral', 'Stapled'].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* Cost footer */}
      <div className="np-card-cost">
        <div className="np-cost-items">
          <span className="np-ci">
            <span className="np-ci-label">Print</span>
            <span className="np-ci-val">₹{cost.printCost.toFixed(2)}</span>
          </span>
          {cost.laminationCost > 0 && (
            <span className="np-ci">
              <span className="np-ci-label">Lamination</span>
              <span className="np-ci-val">₹{cost.laminationCost.toFixed(2)}</span>
            </span>
          )}
          {cost.bindingCost > 0 && (
            <span className="np-ci">
              <span className="np-ci-label">Binding</span>
              <span className="np-ci-val">₹{cost.bindingCost.toFixed(2)}</span>
            </span>
          )}
          <span className="np-ci np-ci--dim">
            <span className="np-ci-label">{cost.sheets} sheet{cost.sheets !== 1 ? 's' : ''}</span>
            <span className="np-ci-val">{cost.pages} pg</span>
          </span>
        </div>
        <div className="np-cost-total">
          <span>Estimated Cost</span>
          <span className="np-cost-amt">₹{cost.total.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── Success Toast ──────────────────────────────────────────── */
function SuccessToast({ onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 6000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="np-toast" role="alert" aria-live="polite">
      <div className="np-toast-check"><Icons.Check /></div>
      <div className="np-toast-body">
        <strong>Order Placed Successfully!</strong>
        <span>Your print job is being processed. You'll receive a confirmation shortly.</span>
      </div>
      <button className="np-toast-x" onClick={onClose} aria-label="Dismiss"><Icons.Close /></button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function NormalPrint() {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [placing, setPlacing] = useState(false);
  const inputRef = useRef(null);
  const idCounter = useRef(1);

  const totalMB = files.reduce((s, f) => s + (f.fileObj?.size || 0) / (1024 * 1024), 0);

  const addFiles = useCallback((incoming) => {
    const errs = [];
    const valid = [];
    let running = totalMB;

    Array.from(incoming).forEach(f => {
      const ext = f.name.split('.').pop().toLowerCase();
      const sizeMB = f.size / (1024 * 1024);
      if (!SUPPORTED_EXTS.includes(ext)) { errs.push(`"${f.name}" — unsupported file type.`); return; }
      if (running + sizeMB > MAX_TOTAL_MB) { errs.push(`"${f.name}" exceeds the 500 MB total limit.`); return; }
      running += sizeMB;
      valid.push({
        id: idCounter.current++,
        name: f.name,
        pages: estimatePages(f),
        fileObj: f,
        previewUrl: isPreviewable(f.name) ? URL.createObjectURL(f) : null,
        spec: { ...DEFAULT_SPEC },
      });
    });

    if (errs.length) setErrors(errs);
    if (valid.length) setFiles(prev => [...prev, ...valid]);
  }, [totalMB]);

  const location = useLocation();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (location.state?.files && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      addFiles(location.state.files);
    }
  }, [location.state, addFiles]);

  const onDrop = useCallback(e => { e.preventDefault(); setDrag(false); if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files); }, [addFiles]);
  const onDragOver = useCallback(e => { e.preventDefault(); setDrag(true); }, []);
  const onDragLeave = useCallback(() => setDrag(false), []);

  const removeFile = useCallback(id => {
    setFiles(prev => {
      const f = prev.find(x => x.id === id);
      if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
      return prev.filter(x => x.id !== id);
    });
  }, []);

  const updateSpec = useCallback((id, spec) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, spec } : f));
  }, []);

  const grandTotal = files.reduce((s, f) => s + calcCost(f.spec, f.pages).total, 0);
  const totalSheets = files.reduce((s, f) => s + calcCost(f.spec, f.pages).sheets, 0);

  const placeOrder = async () => {
    if (!files.length) return;
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800));
    setPlacing(false);
    setSuccess(true);
    // revoke all blob URLs
    files.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
    setFiles([]);
  };

  const prevFilesLength = useRef(0);

  useEffect(() => {
    if (files.length > 0 && prevFilesLength.current === 0) {
      setTimeout(() => {
        const el = document.getElementById('np-specs-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    prevFilesLength.current = files.length;
  }, [files.length]);

  useEffect(() => {
    if (location.hash === '#np-dropzone') {
      setTimeout(() => {
        const el = document.getElementById('np-dropzone');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [location]);

  // cleanup on unmount
  useEffect(() => () => files.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); }), []);

  return (
    <div className="np-page">
      {success && <SuccessToast onClose={() => setSuccess(false)} />}
      {previewFile && <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}

      <div className="np-wrap">

        {/* ── Page header ───────────────────────────── */}
        <header className="np-header fade-up">
          <div className="np-header-eyebrow">
            <Icons.Print />
            Normal Print
          </div>
          <h1 className="np-header-title">Document Upload &amp; Print Specifications</h1>
          <p className="np-header-sub">
            Upload your documents, configure individual print settings, and get real-time pricing — then place your order in one click.
          </p>
        </header>

        {/* ── Drop zone ─────────────────────────────── */}
        <section aria-label="Upload documents">
          <div
            id="np-dropzone"
            className={`np-drop${drag ? ' np-drop--active' : ''}${files.length ? ' np-drop--compact' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload files area — click or drag and drop"
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          >
            <div className={`np-drop-icon${drag ? ' np-drop-icon--bounce' : ''}`}><Icons.Upload /></div>
            <div className="np-drop-text">
              <strong>{drag ? 'Release to upload' : 'Drag & drop your files here'}</strong>
              <span>or <em onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>click to browse</em> from your device</span>
            </div>
            <div className="np-drop-chips">
              {['PDF', 'DOCX', 'DOC', 'PPT', 'PPTX', 'JPG', 'JPEG', 'PNG'].map(t => (
                <span key={t} className="np-drop-chip">{t}</span>
              ))}
            </div>
            <div className="np-drop-limit">
              <Icons.Info />
              Max total size: <strong>50 MB</strong>&ensp;·&ensp;Multiple files supported
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple hidden
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.ppt,.pptx"
              onChange={e => e.target.files?.length && addFiles(e.target.files)}
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="np-error-box" role="alert">
              {errors.map((e, i) => (
                <div key={i} className="np-error-row"><Icons.Warning /><span>{e}</span></div>
              ))}
              <button className="np-error-dismiss" onClick={() => setErrors([])}>Dismiss all</button>
            </div>
          )}
        </section>

        {/* ── File spec cards ───────────────────────── */}
        {files.length > 0 && (
          <section id="np-specs-section" aria-label="Print specifications" className="np-specs-section">
            <div className="np-specs-hd">
              <h2 className="np-specs-title">
                Print Specifications
                <span className="np-count-badge">{files.length} file{files.length !== 1 ? 's' : ''}</span>
              </h2>
              <p className="np-specs-sub">Configure print settings for each document individually. Pricing updates live as you adjust.</p>
            </div>
            <div className="np-cards-list">
              {files.map((f, i) => (
                <FileSpecCard
                  key={f.id}
                  file={f}
                  index={i}
                  onChange={updateSpec}
                  onRemove={removeFile}
                  onPreview={setPreviewFile}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Empty state ───────────────────────────── */}
        {files.length === 0 && !success && (
          <div className="np-empty fade-up">
            <div className="np-empty-art">
              <div className="np-empty-doc np-empty-doc--1" />
              <div className="np-empty-doc np-empty-doc--2" />
              <div className="np-empty-doc np-empty-doc--3" />
            </div>
            <h3 className="np-empty-title">No documents uploaded yet</h3>
            <p className="np-empty-sub">
              Upload your files above to configure print settings and get instant pricing.
            </p>
            <ul className="np-tips">
              {[
                'Supports PDF, DOCX, DOC, PPT, PPTX, JPG, JPEG, PNG',
                'Upload multiple files simultaneously',
                'Live preview for images and PDFs',
                'Real-time INR pricing per file as you configure',
                'Per-file settings: paper, color, copies, binding & more',
              ].map(tip => (
                <li key={tip} className="np-tip">
                  <span className="np-tip-icon"><Icons.Check /></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── Sticky order bar ──────────────────────── */}
      {files.length > 0 && (
        <div className="np-order-bar" role="complementary" aria-label="Order summary">
          <div className="np-order-bar-inner">
            <div className="np-order-stats">
              <div className="np-ostat">
                <span className="np-ostat-label">Total Files</span>
                <span className="np-ostat-val">{files.length}</span>
              </div>
              <div className="np-ostat-div" />
              <div className="np-ostat">
                <span className="np-ostat-label">Total Sheets</span>
                <span className="np-ostat-val">{totalSheets}</span>
              </div>
              <div className="np-ostat-div" />
              <div className="np-ostat">
                <span className="np-ostat-label">Grand Total</span>
                <span className="np-ostat-val np-ostat-val--price">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="np-order-actions">
              <p className="np-order-note">Prices as per configured rates · GST applicable at checkout</p>
              <button
                className="np-order-btn"
                onClick={placeOrder}
                disabled={placing}
                aria-busy={placing}
              >
                {placing ? (
                  <><span className="np-spin" />Processing…</>
                ) : (
                  <><Icons.ShoppingCart />Place Order · ₹{grandTotal.toFixed(2)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
