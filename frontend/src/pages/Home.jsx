import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

/* ---------- ICONS ---------- */
const Icon = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  Upload: () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
  ),
  File: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  ),
  Plus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
  ),
  Minus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
  ),
  Arrow: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  ),
  Book: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  ),
  Image: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>
  ),
  Id: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="6" x2="14" y1="11" y2="11" /></svg>
  ),
  Bolt: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Leaf: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-3 1-9 7-9s7 6 7 9a7 7 0 0 1-7 7" /><path d="M2 22 11 13" /></svg>
  ),
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" /></svg>
  ),
  Question: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
  ),
  Truck: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>
  ),
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" /></svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  ),
  Instagram: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  ),
  LinkedIn: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
  ),
  Printer: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" /></svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
  ),
};

/* ---------- HERO ---------- */
const Hero = () => {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const placeholders = [
    "What would you like to print?",
    "तुम्हाला काय प्रिंट करायचे आहे?",
    "आप क्या प्रिंट करना चाहते हैं?"
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = placeholders[placeholderIndex];

    if (!isDeleting) {
      if (currentPlaceholder !== fullText) {
        timer = setTimeout(() => {
          setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (currentPlaceholder !== "") {
        timer = setTimeout(() => {
          setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentPlaceholder, isDeleting, placeholderIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/services?q=${encodeURIComponent(q.trim())}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
      </div>
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-dot" /> Online printing service · Open 24×7
        </div>
        <h1 id="hero-title" className="hero-title">
          Fast, easy online printing <br />
          {/* — */}
          <span className="hero-title-accent">upload, configure, order in minutes.</span>
        </h1>
        <p className="hero-sub">
          Drop your file, pick your specs, watch the price update in real time. We handle the rest — pickup, print, deliver.
        </p>
        <form className="hero-search" onSubmit={handleSubmit} role="search">
          <span className="hero-search-icon"><Icon.Search /></span>
          <input
            className="hero-search-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={currentPlaceholder}
            aria-label="Search print services"
          />
          <button type="submit" className="hero-search-btn">Search</button>
        </form>
        <div className="hero-examples" aria-label="Popular search examples">
          <span className="hero-examples-label">Try:</span>
          {['DOCX', 'Jumbo Print', 'Poster', 'Letterhead', 'Business cards', 'Photo paper'].map((t) => (
            <button
              key={t}
              type="button"
              className="hero-chip"
              onClick={() => navigate(`/services?q=${encodeURIComponent(t)}`)}
            >{t}</button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- NORMAL PRINTING ---------- */
const NormalPrinting = () => {
  const navigate = useNavigate();
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    if (incoming && incoming.length > 0) {
      navigate('/print/normal', { state: { files: Array.from(incoming) } });
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  return (
    <section className="config-section" id="print" aria-labelledby="config-title">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="section-eyebrow">
            <Icon.Printer /> Print · Configure · Pay
          </span>
          <h2 id="config-title" className="section-title">Normal Printing</h2>
          <p className="section-sub">
            Upload your files. Drag &amp; drop or browse — supports multiple files.
          </p>
        </div>

        <div className="config-card">
          <div className="config-card-head">
            <div>
              <h3 className="config-card-title">Upload your files</h3>
              <p className="config-card-sub">Drag &amp; drop or browse — supports multiple files.</p>
            </div>
          </div>

          <div
            className={`dropzone ${drag ? 'dropzone--active' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
          >
            <div className="dropzone-icon"><Icon.Upload /></div>
            <div className="dropzone-text">
              <strong>Drag files here</strong>
              <span> or <em>browse</em> from your device</span>
            </div>
            <div className="dropzone-meta">PDF, DOCX, JPG, PNG & PPT files are only allowed.</div>
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => e.target.files?.length && addFiles(e.target.files)}
            />
          </div>

          <div className="config-card-actions">
            <div className="dropzone-info-box">
              <Icon.Info />
              <span>Max total size: <strong>50 MB</strong> · Multiple files supported</span>
            </div>
            <Link to="/print/normal#np-dropzone" className="btn btn-primary">
              Start Normal Print <Icon.Arrow />
            </Link>
          </div>
        </div>

        <div className="upload-guidelines-box">
          <div className="upload-guidelines-field">
            <label>Processing Time</label>
            <p className="upload-guidelines-text">
              Standard orders ship within 24 hours. Same-day express printing is available for orders placed before 11 AM in select cities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- SERVICES ---------- */
const SERVICES = [
  {
    id: 'business-cards',
    title: 'Business cards',
    desc: 'Premium cards on 350 gsm matte or gloss stock with rounded corners.',
    price: 'from ₹149',
    tag: 'Best seller',
    tagType: 'accent',
    icon: <Icon.Id />,
    art: 'cards',
    turnaround: '24 hrs',
    minQty: '50 pcs',
  },
  {
    id: 'posters',
    title: 'Posters & prints',
    desc: 'Vibrant large-format prints on satin paper, from A3 up to A0.',
    price: 'from ₹89',
    tag: 'Fast',
    tagType: 'primary',
    icon: <Icon.Image />,
    art: 'poster',
    turnaround: '12 hrs',
    minQty: '1 pc',
  },
  {
    id: 'letterhead',
    title: 'Letterhead & stationery',
    desc: 'Crisp letterheads, envelopes and notepads with full-bleed color.',
    price: 'from ₹249',
    tag: null,
    icon: <Icon.File />,
    art: 'doc',
    turnaround: '24 hrs',
    minQty: '100 pcs',
  },
  {
    id: 'banners',
    title: 'Banners & signage',
    desc: 'Indoor and outdoor flex and vinyl banners with metal grommets.',
    price: 'from ₹399',
    tag: 'Eco',
    tagType: 'green',
    icon: <Icon.Bolt />,
    art: 'banner',
    turnaround: '48 hrs',
    minQty: '1 pc',
  },
];

const ServiceArt = ({ kind }) => {
  // simple generated art with brand palette
  if (kind === 'cards') {
    return (
      <div className="svc-art svc-art--cards">
        <div className="card-stack">
          <div className="svc-card-mock svc-card-mock--1" />
          <div className="svc-card-mock svc-card-mock--2" />
          <div className="svc-card-mock svc-card-mock--3" />
        </div>
      </div>
    );
  }
  if (kind === 'poster') {
    return (
      <div className="svc-art svc-art--poster">
        <div className="poster-frame">
          <div className="poster-block poster-block--1" />
          <div className="poster-block poster-block--2" />
          <div className="poster-block poster-block--3" />
        </div>
      </div>
    );
  }
  if (kind === 'doc') {
    return (
      <div className="svc-art svc-art--doc">
        <div className="doc-page">
          <div className="doc-line doc-line--w70" />
          <div className="doc-line" />
          <div className="doc-line doc-line--w90" />
          <div className="doc-line doc-line--w60" />
          <div className="doc-line doc-line--w80" />
          <div className="doc-line doc-line--w50" />
        </div>
      </div>
    );
  }
  return (
    <div className="svc-art svc-art--banner">
      <div className="banner-ribbon">
        <div className="banner-ribbon-text" />
      </div>
      <div className="banner-pole banner-pole--l" />
      <div className="banner-pole banner-pole--r" />
    </div>
  );
};

const Services = () => {
  return (
    <section className="services-section section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="section-eyebrow"><Icon.Star /> Popular services</span>
          <h2 id="services-title" className="section-title">Built for the things you print most</h2>
          <p className="section-sub">Pick a starting point — every service opens a tailored configurator with the right defaults.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <Link className="svc-card" key={s.title} to={`/services/${s.id}`} aria-label={`${s.title}, ${s.price}`}>
              <ServiceArt kind={s.art} />
              {s.tag && (
                <span className={`svc-tag svc-tag--${s.tagType}`}>{s.tag}</span>
              )}
              <div className="svc-body">
                <div className="svc-head">
                  <h3 className="svc-title">{s.title}</h3>
                </div>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-meta" style={{ margin: 'auto 0 10px', paddingTop: '10px' }}>
                  <div className="svc-meta-item">
                    <span className="svc-meta-label">Turnaround</span>
                    <span className="svc-meta-val">{s.turnaround}</span>
                  </div>
                  <div className="svc-meta-item">
                    <span className="svc-meta-label">Min. Qty</span>
                    <span className="svc-meta-val">{s.minQty}</span>
                  </div>
                </div>
                <div className="svc-foot">
                  <span className="svc-price">{s.price}</span>
                  <span className="svc-cta">View service <Icon.Arrow /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="how-cta">
          <Link to="/services" className="text-link">Browse all services <Icon.Arrow /></Link>
        </div>
      </div>
    </section>
  );
};

/* ---------- HOW IT WORKS + TRACK ---------- */
const STEPS = [
  { n: '01', t: 'Upload document', d: 'PDF, DOCX, JPG, PNG. Drag in many files at once.' },
  { n: '02', t: 'Configure specs & price', d: 'Pick paper, color, finish. Price updates as you go.' },
  { n: '03', t: 'Pay & order', d: 'Pay securely, choose pickup or delivery at checkout.' },
  { n: '04', t: 'Track delivery', d: 'Get a live status on every step, from press to door.' },
];

const StepArt = ({ idx }) => {
  if (idx === 0) return (
    <div className="step-art">
      <div className="step-doc">
        <div className="step-doc-bar" />
        <div className="step-doc-line" />
        <div className="step-doc-line" />
      </div>
      <div className="step-cloud"><Icon.Upload /></div>
    </div>
  );
  if (idx === 1) return (
    <div className="step-art">
      <div className="step-cfg">
        <div className="step-cfg-row"><span /><span /><span /></div>
        <div className="step-cfg-row"><span /><span /></div>
        <div className="step-cfg-row step-cfg-row--price">₹0.00</div>
      </div>
    </div>
  );
  if (idx === 2) return (
    <div className="step-art">
      <div className="step-card-step">
        <div className="step-card-row" />
        <div className="step-card-row step-card-row--short" />
        <div className="step-card-check"><span>✓</span></div>
      </div>
    </div>
  );
  return (
    <div className="step-art">
      <div className="step-truck"><Icon.Truck /></div>
      <div className="step-track">
        <span /><span /><span className="step-track-done" /><span className="step-track-done" />
      </div>
    </div>
  );
};

const HowItWorks = () => (
  <section className="how-section section" id="how" aria-labelledby="how-title">
    <div className="container">
      <div className="section-head section-head--center">
        <span className="section-eyebrow"><Icon.Bolt /> How it works</span>
        <h2 id="how-title" className="section-title">From file to finished print, in four steps</h2>
        <p className="section-sub">A predictable path from upload to delivery — no phone calls, no back-and-forth.</p>
      </div>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <li className="step" key={s.n}>
            <div className="step-num"><span>{s.n}</span></div>
            <div className="step-art-wrap">
              <StepArt idx={i} />
            </div>
            <h3 className="step-title">{s.t}</h3>
            <p className="step-desc">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="how-cta">
        <a href="#faq" className="text-link">Read the FAQ <Icon.Arrow /></a>
      </div>
    </div>
  </section>
);

const TrackStrip = () => {
  const [orderId, setOrderId] = useState('');
  return (
    <section className="track-strip" id="track" aria-label="Track order">
      <div className="container track-strip-inner">
        <div className="track-strip-l">
          <div className="track-strip-icon"><Icon.Truck /></div>
          <div>
            <h3 className="track-strip-title">Already placed an order?</h3>
            <p className="track-strip-sub">Enter your Order ID to see live status and expected delivery.</p>
          </div>
        </div>
        <form
          className="track-form"
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <span className="track-form-tag">Order ID</span>
          <input
            className="track-input"
            placeholder="e.g. PH-2026-04813"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            aria-label="Order ID"
          />
          <button className="hero-search-btn" type="submit">Track</button>
        </form>
      </div>
    </section>
  );
};

/* ---------- ABOUT + CONTACT ---------- */
const AboutContact = () => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section className="about-section section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about">
          <span className="section-eyebrow"><Icon.Book /> About us</span>
          <h2 id="about-title" className="section-title">A print shop that lives in your browser</h2>
          <p className="about-lead">
            PrintHub started in 2018 with a simple idea — making professional printing as easy as sending an email.
            From a single studio in Pune, we now serve over 80,000 small businesses, designers, and students across India.
          </p>
          <ul className="about-values">
            <li><span className="dot" /> <strong>Honest pricing.</strong> The price you see is the price you pay — no surprises at checkout.</li>
            <li><span className="dot" /> <strong>Real people.</strong> A real support team that picks up the phone, Monday to Saturday.</li>
            <li><span className="dot" /> <strong>Lower waste.</strong> Smarter batching and on-demand printing that cuts paper waste by 30%.</li>
          </ul>
          <div className="about-stats">
            <div><span className="stat-num">80k+</span><span className="stat-label">customers served</span></div>
            <div><span className="stat-num">12M+</span><span className="stat-label">pages printed</span></div>
            <div><span className="stat-num">4.8</span><span className="stat-label">average rating</span></div>
          </div>
        </div>

        <div className="contact-card" id="contact">
          <h2 className="contact-title">Send us a message</h2>
          <p className="contact-sub">We usually reply within 4 working hours.</p>
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="cname">Name</label>
                <input id="cname" required type="text" className="input" placeholder="Your full name" />
              </div>
              <div className="field">
                <label htmlFor="cemail">Email</label>
                <input id="cemail" required type="email" className="input" placeholder="you@company.com" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="csubj">Subject</label>
              <input id="csubj" type="text" className="input" placeholder="What's it about?" />
            </div>
            <div className="field">
              <label htmlFor="cmsg">Message</label>
              <textarea id="cmsg" required rows="4" className="input textarea" placeholder="Tell us about your project or question…" />
            </div>
            <div className="contact-form-actions">
              <button className="btn btn-primary" type="submit">
                {sent ? 'Message sent ✓' : 'Send message'} {!sent && <Icon.Arrow />}
              </button>
            </div>
          </form>

          <div className="socials">
            <span className="socials-label">Follow us for updates</span>
            <div className="socials-row">
              <a className="social-btn" href="#facebook" aria-label="Facebook"><Icon.Facebook /></a>
              <a className="social-btn" href="#twitter" aria-label="Twitter / X"><Icon.Twitter /></a>
              <a className="social-btn" href="#instagram" aria-label="Instagram"><Icon.Instagram /></a>
              <a className="social-btn" href="#linkedin" aria-label="LinkedIn"><Icon.LinkedIn /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ small list (referenced by how-cta) ---------- */
const FaqMini = () => {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'How fast is delivery?', a: 'Standard orders ship within 24 hours. Express same-day is available in Pune, Mumbai, and Bengaluru for orders placed before 11 AM.' },
    { q: 'What file types are supported?', a: 'PDF, DOCX, PPTX, JPG, PNG, TIFF, AI, and EPS. Files up to 50 MB per upload.' },
    { q: 'Can I reorder an old job?', a: 'Yes — every completed order lives in your Order History. Reorder with one click and tweak the spec.' },
    { q: 'Do you offer bulk discounts?', a: 'We apply automatic volume discounts at 100, 500, and 1000+ copies. For larger contracts, contact our team.' },
  ];
  return (
    <section className="faq-section section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div>
          <span className="section-eyebrow"><Icon.Question /> FAQ</span>
          <h2 id="faq-title" className="section-title">Quick answers</h2>
          <p className="section-sub">Don't see your question? Drop us a line on the contact form above.</p>
        </div>
        <ul className="faq-list">
          {items.map((it, i) => (
            <li key={it.q} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{it.q}</span>
                <span className="faq-icon">{open === i ? '–' : '+'}</span>
              </button>
              {open === i && <div className="faq-a">{it.a}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------- PAGE ---------- */
const Home = () => {
  // Lock body to top while the navbar uses a fixed layer
  useEffect(() => {
    document.body.style.paddingTop = '0';
  }, []);

  return (
    <div className="home">
      <Hero />
      <NormalPrinting />
      <Services />
      <HowItWorks />
      <TrackStrip />
      <AboutContact />
      <FaqMini />
    </div>
  );
};

export default Home;
