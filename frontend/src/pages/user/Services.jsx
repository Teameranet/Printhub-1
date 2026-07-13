import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Services.css';

/* ─── ICONS ────────────────────────────────────────────────────────────── */
const Icon = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Arrow: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Grid: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  List: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" />
    </svg>
  ),
  Printer: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
    </svg>
  ),
  SortDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Bolt: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Sort: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 18-3 3-3-3" /><path d="M12 3v18" /><path d="m9 6 3-3 3 3" />
    </svg>
  ),
};

/* ─── SERVICE DATA ───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'business-cards',
    title: 'Business Cards',
    category: 'Marketing',
    desc: 'Premium cards on 350 gsm matte or gloss stock with optional rounded corners. Perfect for networking.',
    price: 'from ₹149',
    priceNum: 149,
    tag: 'Best Seller',
    tagType: 'accent',
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: true,
    art: 'cards',
    features: ['350 gsm premium stock', 'Matte / Gloss / Soft-touch', 'Rounded corners option', 'Same-day express available'],
  },
  {
    id: 'letterhead',
    title: 'Letterhead',
    category: 'Stationery',
    desc: 'Crisp, full-bleed branded letterheads on 90–120 gsm bond paper. Available in A4 and Letter size.',
    price: 'from ₹249',
    priceNum: 249,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '100 pcs',
    popular: false,
    art: 'doc',
    features: ['90–120 gsm bond paper', 'Full bleed color printing', 'A4 & Letter sizes', 'Bulk discounts available'],
  },
  {
    id: 'jumbo-print',
    title: 'Jumbo Print',
    category: 'Large Format',
    desc: 'Extra-large format prints for trade shows, exhibitions, and wall displays. Up to 60×90 inches.',
    price: 'from ₹899',
    priceNum: 899,
    tag: 'New',
    tagType: 'primary',
    turnaround: '48 hrs',
    minQty: '1 pc',
    popular: true,
    art: 'jumbo',
    features: ['Up to 60×90 inches', 'Satin / Gloss / Canvas media', 'UV-resistant inks', 'Mounting options available'],
  },
  {
    id: 'posters',
    title: 'Posters & Prints',
    category: 'Marketing',
    desc: 'Vibrant large-format prints on satin paper. Sizes from A3 up to A0 — ideal for events and retail.',
    price: 'from ₹89',
    priceNum: 89,
    tag: 'Fast',
    tagType: 'primary',
    turnaround: '12 hrs',
    minQty: '1 pc',
    popular: true,
    art: 'poster',
    features: ['A3 to A0 sizes', 'Satin & matte finishes', 'Weather-resistant option', 'Same-day express available'],
  },
  {
    id: 'banners',
    title: 'Banners & Signage',
    category: 'Large Format',
    desc: 'Indoor and outdoor flex and vinyl banners with metal grommets. Custom sizes available.',
    price: 'from ₹399',
    priceNum: 399,
    tag: 'Eco',
    tagType: 'green',
    turnaround: '48 hrs',
    minQty: '1 pc',
    popular: false,
    art: 'banner',
    features: ['Heavy-duty flex & vinyl', 'Metal grommets included', 'Custom sizes', 'UV-resistant & weatherproof'],
  },
  {
    id: 'brochures',
    title: 'Brochures & Flyers',
    category: 'Marketing',
    desc: 'Tri-fold, bi-fold and Z-fold brochures on 130–170 gsm coated stock. Great for promotions.',
    price: 'from ₹199',
    priceNum: 199,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: false,
    art: 'brochure',
    features: ['Tri-fold / Bi-fold / Z-fold', '130–170 gsm coated stock', 'Both sides printing', 'Bulk pricing available'],
  },
  {
    id: 'notebooks',
    title: 'Notebooks & Notepads',
    category: 'Stationery',
    desc: 'Custom-branded notebooks and notepads with glued or staple binding. Great corporate gifts.',
    price: 'from ₹349',
    priceNum: 349,
    tag: null,
    tagType: null,
    turnaround: '48 hrs',
    minQty: '25 pcs',
    popular: false,
    art: 'notebook',
    features: ['Custom cover design', 'Glued or staple binding', 'A4, A5, or B5 sizes', 'Corporate gifting packs'],
  },
  {
    id: 'envelopes',
    title: 'Envelopes',
    category: 'Stationery',
    desc: 'Custom-printed envelopes in DL, C4 and C5 sizes. Ideal for mailers and formal correspondence.',
    price: 'from ₹189',
    priceNum: 189,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '100 pcs',
    popular: false,
    art: 'envelope',
    features: ['DL, C4, C5 sizes', 'Full-color printing', 'Self-seal & peel-seal options', 'Window envelopes available'],
  },
  {
    id: 'stickers',
    title: 'Stickers & Labels',
    category: 'Marketing',
    desc: 'Die-cut vinyl stickers and product labels in any shape or size. Waterproof and long-lasting.',
    price: 'from ₹99',
    priceNum: 99,
    tag: 'Popular',
    tagType: 'accent',
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: true,
    art: 'sticker',
    features: ['Die-cut to any shape', 'Waterproof vinyl', 'Matte, gloss or holographic', 'Roll or sheet format'],
  },
];

const CATEGORIES = ['All', 'Marketing', 'Stationery', 'Large Format'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

/* ─── CAT COLORS ─────────────────────────────────────────────────────────── */
const catColor = (category) => ({
  Marketing:      { bg: 'var(--primary)',   light: 'rgba(126,87,194,0.12)' },
  Stationery:     { bg: 'var(--accent)',    light: 'rgba(201,122,11,0.12)' },
  'Large Format': { bg: '#0D9488',          light: 'rgba(13,148,136,0.12)' },
}[category] || { bg: 'var(--primary)', light: 'rgba(126,87,194,0.12)' });

/* ─── SERVICE ART ────────────────────────────────────────────────────────── */
const ServiceArt = ({ kind, category }) => {
  const c = catColor(category);

  if (kind === 'cards') return (
    <div className="sart sart--cards">
      <div className="sart-stack">
        <div className="sart-card" style={{ background: c.bg, transform: 'rotate(-9deg) translate(-22px,8px)', opacity: 0.7 }} />
        <div className="sart-card sart-card--mid" />
        <div className="sart-card" style={{ background: c.bg, opacity: 0.45, transform: 'rotate(7deg) translate(22px,-8px)' }} />
      </div>
    </div>
  );

  if (kind === 'doc') return (
    <div className="sart sart--doc">
      <div className="sart-page">
        <div className="sart-page-header" style={{ background: c.bg }} />
        {[90,100,75,85,60,80].map((w,i) => (
          <div key={i} className="sart-line" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );

  if (kind === 'poster') return (
    <div className="sart sart--poster">
      <div className="sart-poster">
        <div className="sart-poster-top" style={{ background: c.bg }} />
        <div className="sart-poster-mid" />
        <div className="sart-poster-bot" style={{ background: c.bg, opacity: 0.4 }} />
      </div>
    </div>
  );

  if (kind === 'banner') return (
    <div className="sart sart--banner">
      <div className="sart-banner" style={{ background: `linear-gradient(90deg, ${c.bg}, ${c.bg}99)` }}>
        <div className="sart-banner-stripe" />
        <div className="sart-banner-stripe sart-banner-stripe--2" />
      </div>
      <div className="sart-banner-pole sart-banner-pole--l" />
      <div className="sart-banner-pole sart-banner-pole--r" />
    </div>
  );

  if (kind === 'jumbo') return (
    <div className="sart sart--jumbo">
      <div className="sart-jumbo-frame">
        <div className="sart-jumbo-img" style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.bg}70)` }} />
        <div className="sart-jumbo-bar" />
        <div className="sart-jumbo-dot sart-jumbo-dot--l" style={{ background: c.bg }} />
        <div className="sart-jumbo-dot sart-jumbo-dot--r" style={{ background: c.bg }} />
      </div>
    </div>
  );

  if (kind === 'brochure') return (
    <div className="sart sart--brochure">
      {[0,1,2].map(i => (
        <div key={i} className="sart-panel" style={i===1 ? { background: c.light, borderColor: c.bg } : {}}>
          <div className="sart-panel-bar" style={i===1 ? { background: c.bg } : {}} />
          <div className="sart-panel-line" />
          <div className="sart-panel-line sart-panel-line--short" />
        </div>
      ))}
    </div>
  );

  if (kind === 'notebook') return (
    <div className="sart sart--notebook">
      <div className="sart-notebook">
        <div className="sart-notebook-spine" style={{ background: c.bg }} />
        <div className="sart-notebook-cover" style={{ borderColor: c.bg }}>
          <div className="sart-notebook-logo" style={{ background: c.bg }} />
          {[80,60,70].map((w,i) => (
            <div key={i} className="sart-notebook-line" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );

  if (kind === 'envelope') return (
    <div className="sart sart--envelope">
      <div className="sart-envelope">
        <div className="sart-envelope-flap" style={{ borderBottomColor: c.bg }} />
        <div className="sart-envelope-body">
          <div className="sart-envelope-address" />
          <div className="sart-envelope-stamp" style={{ background: c.bg }} />
        </div>
      </div>
    </div>
  );

  if (kind === 'sticker') return (
    <div className="sart sart--sticker">
      <div className="sart-sticker-main" style={{ background: c.bg }}>
        <div className="sart-sticker-inner" />
      </div>
      <div className="sart-sticker-sm" style={{ background: c.bg, opacity: 0.55 }} />
      <div className="sart-sticker-sm sart-sticker-sm--2" style={{ background: c.light, border: `2px solid ${c.bg}` }} />
    </div>
  );

  return <div className="sart" style={{ background: c.light }} />;
};

/* ─── SERVICE CARD (grid) ────────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => (
  <Link
    to={`/services/${service.id}`}
    className="svcp-card"
    style={{ animationDelay: `${index * 55}ms` }}
    aria-label={`${service.title} — ${service.price}`}
  >
    <div className="svcp-art">
      <ServiceArt kind={service.art} category={service.category} />
      {service.tag && (
        <span className={`svcp-badge svcp-badge--${service.tagType}`}>{service.tag}</span>
      )}
      <span className="svcp-cat-pill">{service.category}</span>
    </div>

    <div className="svcp-body">
      <h3 className="svcp-title">{service.title}</h3>
      <p className="svcp-desc">{service.desc}</p>

      <div className="svcp-meta">
        <div className="svcp-meta-item">
          <span className="svcp-meta-label">Turnaround</span>
          <span className="svcp-meta-val">{service.turnaround}</span>
        </div>
        <div className="svcp-meta-item">
          <span className="svcp-meta-label">Min. Qty</span>
          <span className="svcp-meta-val">{service.minQty}</span>
        </div>
      </div>

      <div className="svcp-foot">
        <span className="svcp-price">{service.price}</span>
        <span className="svcp-cta">View service <Icon.Arrow /></span>
      </div>
    </div>
  </Link>
);

/* ─── SERVICE ROW (list) ─────────────────────────────────────────────────── */
const ServiceRow = ({ service, index }) => (
  <Link
    to={`/services/${service.id}`}
    className="svcp-row"
    style={{ animationDelay: `${index * 45}ms` }}
    aria-label={`${service.title} — ${service.price}`}
  >
    <div className="svcp-row-art">
      <ServiceArt kind={service.art} category={service.category} />
    </div>
    <div className="svcp-row-body">
      <div className="svcp-row-top">
        <div className="svcp-row-titles">
          <span className="svcp-cat-pill svcp-cat-pill--sm">{service.category}</span>
          <h3 className="svcp-title">{service.title}</h3>
        </div>
        {service.tag && (
          <span className={`svcp-badge svcp-badge--${service.tagType}`}>{service.tag}</span>
        )}
      </div>
      <p className="svcp-desc">{service.desc}</p>
      <div className="svcp-row-foot">
        <div className="svcp-row-metas">
          <span className="svcp-meta-tag"><Icon.Bolt /> {service.turnaround}</span>
          <span className="svcp-meta-tag">{service.minQty} min</span>
        </div>
        <div className="svcp-row-right">
          <span className="svcp-price">{service.price}</span>
          <span className="svcp-cta">View <Icon.Arrow /></span>
        </div>
      </div>
    </div>
  </Link>
);

/* ─── EMPTY STATE ────────────────────────────────────────────────────────── */
const EmptyState = ({ query, onClear }) => (
  <div className="svcp-empty" role="status">
    <div className="svcp-empty-icon">
      <Icon.Search />
    </div>
    <h3 className="svcp-empty-title">No services found</h3>
    <p className="svcp-empty-sub">
      {query
        ? <>We couldn't find any services matching <strong>"{query}"</strong>. Try a different keyword or clear the search.</>
        : <>No services match the current filters.</>
      }
    </p>
    <button className="btn btn-outline btn-md" onClick={onClear} id="svcp-empty-clear-btn">
      Clear filters
    </button>
  </div>
);

/* ─── HERO ───────────────────────────────────────────────────────────────── */
const ServicesHero = ({ query, setQuery, inputRef }) => {
  const chips = ['Business cards', 'Letterhead', 'Jumbo Print', 'Posters', 'Banners', 'Stickers'];

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

  return (
    <section className="svcp-hero" aria-labelledby="svcp-hero-title">
      <div className="svcp-hero-bg" aria-hidden="true">
        <div className="svcp-hero-grid" />
        <div className="svcp-hero-orb svcp-hero-orb--1" />
        <div className="svcp-hero-orb svcp-hero-orb--2" />
      </div>
      <div className="container svcp-hero-inner">
        <span className="section-eyebrow">
          <Icon.Printer /> Print Services
        </span>
        <h1 id="svcp-hero-title" className="svcp-hero-title">
          Everything you need to
          <br />
          <span className="svcp-hero-accent">print, publish &amp; promote.</span>
        </h1>
        <p className="svcp-hero-sub">
          From business cards to jumbo prints — every service has tailored specs,
          instant pricing, and fast delivery across India.
        </p>

        <form
          className="svcp-search"
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Search print services"
        >
          <span className="svcp-search-icon"><Icon.Search /></span>
          <input
            ref={inputRef}
            id="svcp-search-input"
            className="svcp-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={currentPlaceholder}
            aria-label="Search services"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              id="svcp-search-clear-btn"
              className="svcp-search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <Icon.X />
            </button>
          )}
          <button type="submit" id="svcp-search-submit-btn" className="hero-search-btn">
            Search
          </button>
        </form>

        <div className="svcp-chips" aria-label="Quick search suggestions">
          <span className="svcp-chips-label">Try:</span>
          {chips.map((s) => (
            <button
              key={s}
              type="button"
              className={`hero-chip${query === s ? ' hero-chip--active' : ''}`}
              onClick={() => setQuery(s)}
              aria-pressed={query === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All');
  const [sort,     setSort]     = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const inputRef                = useRef(null);

  // Sync state if URL query param changes
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Handler to update query state & URL query params in real-time
  const handleQueryChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const filtered = useMemo(() => {
    let list = [...SERVICES];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tag && s.tag.toLowerCase().includes(q))
      );
    }

    if (category !== 'All') {
      list = list.filter(s => s.category === category);
    }

    switch (sort) {
      case 'price-asc':  list = list.sort((a, b) => a.priceNum - b.priceNum);              break;
      case 'price-desc': list = list.sort((a, b) => b.priceNum - a.priceNum);              break;
      case 'name':       list = list.sort((a, b) => a.title.localeCompare(b.title));       break;
      default:           list = list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)); break;
    }

    return list;
  }, [query, category, sort]);

  const clearAll = () => { handleQueryChange(''); setCategory('All'); };

  return (
    <div className="svcp-page">
      <ServicesHero query={query} setQuery={handleQueryChange} inputRef={inputRef} />

      {/* ── Toolbar ── */}
      <div className="svcp-toolbar-wrap">
        <div className="container svcp-toolbar">
          <div className="svcp-results-bar" style={{ padding: 0 }}>
            <span className="svcp-results-count">
              {filtered.length} {filtered.length === 1 ? 'service' : 'services'}
              {query && <> matching <em>"{query}"</em></>}
            </span>
            {(query || category !== 'All') && (
              <button
                type="button"
                id="svcp-clear-all-btn"
                className="svcp-clear-all"
                onClick={clearAll}
              >
                Clear all <Icon.X />
              </button>
            )}
          </div>


          {/* Controls */}
          <div className="svcp-controls">
            <div className="svcp-sort-wrap">
              <span className="svcp-sort-left-icon" aria-hidden="true"><Icon.Sort /></span>
              <select
                id="svcp-sort"
                className="svcp-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort services"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="svcp-sort-icon" aria-hidden="true"><Icon.SortDown /></span>
            </div>

            <div className="svcp-view-toggle" role="group" aria-label="View mode">
              <button
                type="button"
                id="svcp-view-grid-btn"
                className={`svcp-view-btn${viewMode === 'grid' ? ' svcp-view-btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Grid view"
              >
                <Icon.Grid />
              </button>
              <button
                type="button"
                id="svcp-view-list-btn"
                className={`svcp-view-btn${viewMode === 'list' ? ' svcp-view-btn--active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                aria-label="List view"
              >
                <Icon.List />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid / List ── */}
      <section className="svcp-content-section" aria-label="Services listing">
        <div className="container">
          {filtered.length === 0 ? (
            <EmptyState query={query} onClear={clearAll} />
          ) : viewMode === 'grid' ? (
            <div className="svcp-grid" key={`grid-${query}-${category}-${sort}`}>
              {filtered.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          ) : (
            <div className="svcp-list" key={`list-${query}-${category}-${sort}`}>
              {filtered.map((s, i) => (
                <ServiceRow key={s.id} service={s} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="svcp-banner" aria-label="Custom printing enquiry">
        <div className="container svcp-banner-inner">
          <div className="svcp-banner-text">
            <span className="section-eyebrow"><Icon.Star /> Custom Orders</span>
            <h2 className="svcp-banner-title">Need something specific?</h2>
            <p className="svcp-banner-sub">
              Can't find what you're looking for? Our team handles custom sizes,
              specialty substrates, and enterprise bulk orders.
            </p>
          </div>
          <div className="svcp-banner-actions">
            <Link to="/#contact" id="svcp-custom-quote-btn" className="btn btn-primary btn-lg">
              Get a custom quote <Icon.Arrow />
            </Link>
            <Link to="/print/normal" id="svcp-normal-print-btn" className="btn btn-secondary btn-lg">
              Normal Print
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
