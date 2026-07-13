import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ServiceDetail.css';

/* ═══════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════ */
const Icon = {
  Arrow: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </svg>
  ),
  Check: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Printer: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect width="12" height="8" x="6" y="14" />
    </svg>
  ),
  Bolt: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Package: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
    </svg>
  ),
  Upload: () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  ),
  CloudUpload: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" />
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
  Cart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  Info: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
  ),
  Warning: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9A1 1 0 0 0 21.4 6.08Z" />
      <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    </svg>
  ),
  Ruler: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" /><path d="m11.5 9.5 2-2" /><path d="m8.5 6.5 2-2" /><path d="m17.5 15.5 2-2" />
    </svg>
  ),
  Tag: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  ),
  IndianRupee: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12" /><path d="M6 8h12" /><path d="m6 13 8.5 8" /><path d="M6 13h3" /><path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════
   SERVICE DATA
═══════════════════════════════════════════════════════════ */
const SERVICES = [
  {
    id: 'business-cards',
    title: 'Business Cards',
    category: 'Marketing',
    desc: 'Make a lasting impression with our premium business cards. Available in matte, gloss, or soft-touch lamination on 350 gsm premium stock.',
    price: 'from ₹149',
    priceNum: 149,
    tag: 'Best Seller',
    tagType: 'accent',
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: true,
    art: 'cards',
    features: ['350 gsm premium stock', 'Matte / Gloss / Soft-touch lamination', 'Rounded corners option', 'Same-day express available', 'Spot UV coating available', 'Bulk pricing for 500+ pcs'],
    sizes: ['Standard 85×55mm', 'Square 55×55mm', 'Slim 85×40mm'],
    materials: ['350 gsm Matte', '350 gsm Gloss', '350 gsm Soft-touch'],
    finishes: ['Matte Lamination', 'Gloss Lamination', 'Spot UV', 'Foil Stamping'],
    pricing: [
      { qty: '50 pcs', bw: '₹149', color: '₹249' },
      { qty: '100 pcs', bw: '₹249', color: '₹399' },
      { qty: '250 pcs', bw: '₹499', color: '₹799' },
      { qty: '500 pcs', bw: '₹849', color: '₹1,299' },
    ],
  },
  {
    id: 'letterhead',
    title: 'Letterhead',
    category: 'Stationery',
    desc: 'Elevate your professional correspondence with custom letterheads that reinforce your brand identity. Printed on high-quality bond paper.',
    price: 'from ₹249',
    priceNum: 249,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '100 pcs',
    popular: false,
    art: 'doc',
    features: ['90–120 gsm bond paper', 'Full bleed color printing', 'A4 & Letter sizes', 'Bulk discounts available', 'Single or double-sided', 'Pantone color matching'],
    sizes: ['A4 (210×297mm)', 'Letter (216×279mm)', 'A5 (148×210mm)'],
    materials: ['90 gsm Bond', '100 gsm Bond', '120 gsm Premium Bond'],
    finishes: ['Standard Offset', 'Digital Print', 'Silk Coated'],
    pricing: [
      { qty: '100 pcs', bw: '₹249', color: '₹399' },
      { qty: '250 pcs', bw: '₹499', color: '₹799' },
      { qty: '500 pcs', bw: '₹849', color: '₹1,399' },
      { qty: '1000 pcs', bw: '₹1,499', color: '₹2,499' },
    ],
  },
  {
    id: 'jumbo-print',
    title: 'Jumbo Print',
    category: 'Large Format',
    desc: 'Command attention with extra-large format prints. Ideal for trade shows, exhibitions, retail environments, and large wall displays.',
    price: 'from ₹899',
    priceNum: 899,
    tag: 'New',
    tagType: 'primary',
    turnaround: '48 hrs',
    minQty: '1 pc',
    popular: true,
    art: 'jumbo',
    features: ['Up to 60×90 inches', 'Satin / Gloss / Canvas media', 'UV-resistant inks', 'Mounting options available', 'Indoor & outdoor options', 'Frame & standee available'],
    sizes: ['A1 (594×841mm)', 'A0 (841×1189mm)', '48×72 inches', 'Custom sizes'],
    materials: ['Satin Photo Paper', 'Gloss Photo Paper', 'Canvas', 'Backlit Film'],
    finishes: ['No lamination', 'Matte Lamination', 'Gloss Lamination', 'Mounted on foam board'],
    pricing: [
      { qty: '1 pc (A1)', bw: '₹899', color: '₹1,499' },
      { qty: '1 pc (A0)', bw: '₹1,499', color: '₹2,499' },
      { qty: '5 pcs (A1)', bw: '₹3,999', color: '₹6,499' },
      { qty: '5 pcs (A0)', bw: '₹6,499', color: '₹10,999' },
    ],
  },
  {
    id: 'posters',
    title: 'Posters & Prints',
    category: 'Marketing',
    desc: 'Stand out with vibrant poster prints produced on high-quality satin stock with sharp, accurate color reproduction.',
    price: 'from ₹89',
    priceNum: 89,
    tag: 'Fast',
    tagType: 'primary',
    turnaround: '12 hrs',
    minQty: '1 pc',
    popular: true,
    art: 'poster',
    features: ['A3 to A0 sizes', 'Satin & matte finishes', 'Weather-resistant option', 'Same-day express available', 'Bulk discounts', 'Pantone color matching'],
    sizes: ['A3 (297×420mm)', 'A2 (420×594mm)', 'A1 (594×841mm)', 'A0 (841×1189mm)'],
    materials: ['150 gsm Satin', '200 gsm Satin', '200 gsm Matte', 'Weatherproof Vinyl'],
    finishes: ['No lamination', 'Gloss Lamination', 'Matte Lamination'],
    pricing: [
      { qty: '1 pc (A3)', bw: '₹89', color: '₹149' },
      { qty: '1 pc (A2)', bw: '₹149', color: '₹249' },
      { qty: '10 pcs (A3)', bw: '₹749', color: '₹1,299' },
      { qty: '10 pcs (A2)', bw: '₹1,299', color: '₹2,199' },
    ],
  },
  {
    id: 'banners',
    title: 'Banners & Signage',
    category: 'Large Format',
    desc: 'Durable and vibrant banners for indoor and outdoor use. Printed on heavy-duty flex/vinyl with UV-resistant inks.',
    price: 'from ₹399',
    priceNum: 399,
    tag: 'Eco',
    tagType: 'green',
    turnaround: '48 hrs',
    minQty: '1 pc',
    popular: false,
    art: 'banner',
    features: ['Heavy-duty flex & vinyl', 'Metal grommets included', 'Custom sizes', 'UV-resistant & weatherproof', 'Double-sided printing', 'Hemmed edges'],
    sizes: ['2×4 ft', '3×6 ft', '4×8 ft', 'Custom'],
    materials: ['440 gsm Flex', '500 gsm Vinyl', 'Mesh Vinyl', 'Backlit Vinyl'],
    finishes: ['Standard', 'With grommets', 'Pole pocket', 'Hemmed & grommeted'],
    pricing: [
      { qty: '1 pc (2×4 ft)', bw: '₹399', color: '₹649' },
      { qty: '1 pc (3×6 ft)', bw: '₹649', color: '₹999' },
      { qty: '5 pcs (2×4 ft)', bw: '₹1,799', color: '₹2,799' },
      { qty: '5 pcs (3×6 ft)', bw: '₹2,799', color: '₹4,499' },
    ],
  },
  {
    id: 'brochures',
    title: 'Brochures & Flyers',
    category: 'Marketing',
    desc: 'Showcase your brand with professionally printed brochures. Multiple fold options on premium coated stock.',
    price: 'from ₹199',
    priceNum: 199,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: false,
    art: 'brochure',
    features: ['Tri-fold / Bi-fold / Z-fold', '130–170 gsm coated stock', 'Both sides printing', 'Bulk pricing available', 'High-gloss or matte finish', 'Pantone color matching'],
    sizes: ['A4 (folded)', 'A5 (folded)', 'DL (folded)', 'Square'],
    materials: ['130 gsm Gloss Coated', '150 gsm Silk Coated', '170 gsm Gloss Coated'],
    finishes: ['Gloss Lamination', 'Matte Lamination', 'Soft-touch Lamination', 'Spot UV'],
    pricing: [
      { qty: '50 pcs', bw: '₹199', color: '₹349' },
      { qty: '100 pcs', bw: '₹349', color: '₹599' },
      { qty: '500 pcs', bw: '₹1,299', color: '₹2,199' },
      { qty: '1000 pcs', bw: '₹2,199', color: '₹3,799' },
    ],
  },
  {
    id: 'notebooks',
    title: 'Notebooks & Notepads',
    category: 'Stationery',
    desc: 'Custom notebooks and notepads with your branding on the cover and every page. Perfect for corporate gifting.',
    price: 'from ₹349',
    priceNum: 349,
    tag: null,
    tagType: null,
    turnaround: '48 hrs',
    minQty: '25 pcs',
    popular: false,
    art: 'notebook',
    features: ['Custom cover design', 'Glued or staple binding', 'A4, A5, or B5 sizes', 'Corporate gifting packs', '50–200 pages per book', 'Custom inner page headers'],
    sizes: ['A4 (210×297mm)', 'A5 (148×210mm)', 'B5 (176×250mm)'],
    materials: ['70 gsm Ruled Pages', '80 gsm Plain Pages', 'Recycled Paper Pages'],
    finishes: ['Soft cover', 'Hard cover', 'Spiral bound', 'Case bound'],
    pricing: [
      { qty: '25 pcs', bw: '₹349', color: '₹549' },
      { qty: '50 pcs', bw: '₹599', color: '₹949' },
      { qty: '100 pcs', bw: '₹1,099', color: '₹1,749' },
      { qty: '250 pcs', bw: '₹2,499', color: '₹3,999' },
    ],
  },
  {
    id: 'envelopes',
    title: 'Envelopes',
    category: 'Stationery',
    desc: 'Branded envelopes to complete your stationery suite. Printed with full-color logos and return addresses.',
    price: 'from ₹189',
    priceNum: 189,
    tag: null,
    tagType: null,
    turnaround: '24 hrs',
    minQty: '100 pcs',
    popular: false,
    art: 'envelope',
    features: ['DL, C4, C5 sizes', 'Full-color printing', 'Self-seal & peel-seal options', 'Window envelopes available', 'High-quality 90 gsm stock', 'Bulk discounts'],
    sizes: ['DL (110×220mm)', 'C5 (162×229mm)', 'C4 (229×324mm)'],
    materials: ['90 gsm White Wove', '100 gsm Cream Laid', 'Peel & Seal Variety'],
    finishes: ['Standard', 'Self-seal', 'Peel & seal', 'Window cutout'],
    pricing: [
      { qty: '100 pcs', bw: '₹189', color: '₹299' },
      { qty: '250 pcs', bw: '₹399', color: '₹649' },
      { qty: '500 pcs', bw: '₹699', color: '₹1,099' },
      { qty: '1000 pcs', bw: '₹1,199', color: '₹1,899' },
    ],
  },
  {
    id: 'stickers',
    title: 'Stickers & Labels',
    category: 'Marketing',
    desc: 'Custom stickers and labels for branding, packaging, promotions, and events. Any shape, any size.',
    price: 'from ₹99',
    priceNum: 99,
    tag: 'Popular',
    tagType: 'accent',
    turnaround: '24 hrs',
    minQty: '50 pcs',
    popular: true,
    art: 'sticker',
    features: ['Die-cut to any shape', 'Waterproof vinyl', 'Matte, gloss or holographic', 'Roll or sheet format', 'Dishwasher-safe option', 'Outdoor UV-resistant'],
    sizes: ['Custom die-cut', 'Circle (25–100mm)', 'Rectangle (50×30mm–200×100mm)', 'Square'],
    materials: ['White Gloss Vinyl', 'Matte Vinyl', 'Transparent Vinyl', 'Holographic Vinyl'],
    finishes: ['Gloss', 'Matte', 'Holographic', 'Soft-touch'],
    pricing: [
      { qty: '50 pcs', bw: '₹99', color: '₹149' },
      { qty: '100 pcs', bw: '₹179', color: '₹259' },
      { qty: '500 pcs', bw: '₹699', color: '₹999' },
      { qty: '1000 pcs', bw: '₹1,199', color: '₹1,699' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   CATEGORY COLORS
═══════════════════════════════════════════════════════════ */
const catColor = (category) => ({
  Marketing:      { bg: 'var(--primary)',  light: 'rgba(126,87,194,0.10)' },
  Stationery:     { bg: 'var(--accent)',   light: 'rgba(201,122,11,0.10)' },
  'Large Format': { bg: '#0D9488',         light: 'rgba(13,148,136,0.10)' },
}[category] || { bg: 'var(--primary)', light: 'rgba(126,87,194,0.10)' });

/* ═══════════════════════════════════════════════════════════
   FILE HELPERS
═══════════════════════════════════════════════════════════ */
const SUPPORTED_EXTS = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'cdr', 'ai', 'ps'];
const MAX_TOTAL_MB = 500;

const FILE_TYPE_COLORS = {
  jpg:  { color: '#16A34A', bg: 'rgba(22,163,74,0.10)' },
  jpeg: { color: '#16A34A', bg: 'rgba(22,163,74,0.10)' },
  png:  { color: '#16A34A', bg: 'rgba(22,163,74,0.10)' },
  pdf:  { color: '#DC2626', bg: 'rgba(220,38,38,0.10)' },
  doc:  { color: '#2563EB', bg: 'rgba(37,99,235,0.10)' },
  docx: { color: '#2563EB', bg: 'rgba(37,99,235,0.10)' },
  ppt:  { color: '#C97A0B', bg: 'rgba(201,122,11,0.10)' },
  pptx: { color: '#C97A0B', bg: 'rgba(201,122,11,0.10)' },
  cdr:  { color: '#7E57C2', bg: 'rgba(126,87,194,0.10)' },
  ai:   { color: '#FF6B35', bg: 'rgba(255,107,53,0.10)' },
  ps:   { color: '#7E57C2', bg: 'rgba(126,87,194,0.10)' },
};

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase();
  const colors = FILE_TYPE_COLORS[ext] || { color: '#7E57C2', bg: 'rgba(126,87,194,0.10)' };
  if (['jpg', 'jpeg', 'png'].includes(ext))
    return { Icon: Icon.FileImage, ...colors, label: ext.toUpperCase() };
  if (ext === 'pdf')
    return { Icon: Icon.FilePdf, ...colors, label: 'PDF' };
  if (['doc', 'docx'].includes(ext))
    return { Icon: Icon.FileDoc, ...colors, label: ext.toUpperCase() };
  if (['ppt', 'pptx'].includes(ext))
    return { Icon: Icon.FilePpt, ...colors, label: ext.toUpperCase() };
  return { Icon: Icon.FileGeneric, ...colors, label: ext.toUpperCase() };
}

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

/* ═══════════════════════════════════════════════════════════
   PRICING ENGINE
═══════════════════════════════════════════════════════════ */
const PRICING = {
  bw:   { A4: 2, A3: 4, A5: 1.5, Letter: 2.5, Legal: 3, Standard: 3, Square: 3, Slim: 2.5, default: 2 },
  color:{ A4: 8, A3: 16, A5: 6, Letter: 9, Legal: 12, Standard: 12, Square: 12, Slim: 9, default: 8 },
  paperType: { Bond: 0, Glossy: 3, Matte: 2, Cardstock: 5, Satin: 2, Canvas: 8, Vinyl: 4, Flex: 3 },
  pagesPerSheet: { 1: 1, 2: 0.6, 4: 0.35 },
  lamination: { None: 0, 'Glossy Lamination': 25, 'Matte Lamination': 20 },
  binding: { None: 0, Spiral: 50, Stapled: 10 },
  doubleSideMulti: 0.8,
};

function calcCost(spec, totalPages) {
  const pages = Math.max(1, totalPages);
  const copies = Math.max(1, Number(spec.copies) || 1);
  const pps = Number(spec.pagesPerSheet) || 1;
  const sizeKey = (spec.paperSize || '').split(' ')[0];
  const basePerPage = (spec.color === 'color' ? PRICING.color : PRICING.bw)[sizeKey] ?? (spec.color === 'color' ? 8 : 2);
  const typeExtra = PRICING.paperType[spec.paperType?.split(' ')[0]] ?? 0;
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

/* ═══════════════════════════════════════════════════════════
   SEGMENTED CONTROL
═══════════════════════════════════════════════════════════ */
function Seg({ options, value, onChange, name }) {
  return (
    <div className="sdet-seg" role="group" aria-label={name}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`sdet-seg-btn${value === opt.value ? ' sdet-seg-btn--on' : ''}`}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{opt.icon}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PREVIEW MODAL
═══════════════════════════════════════════════════════════ */
function PreviewModal({ file, onClose }) {
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  if (!file) return null;
  const ext = file.name.split('.').pop().toLowerCase();
  const isImg = ['jpg', 'jpeg', 'png'].includes(ext);
  const isPdf = ext === 'pdf';
  const { Icon: FIcon, color } = getFileIcon(file.name);

  return (
    <div className="sdet-overlay" onClick={onClose} role="dialog" aria-modal aria-label="File preview">
      <div className="sdet-modal" onClick={e => e.stopPropagation()}>
        <div className="sdet-modal-hd">
          <div>
            <div className="sdet-modal-fname">{file.name}</div>
            <div className="sdet-modal-fmeta">
              {fmtSize(file.fileObj?.size || 0)} &nbsp;·&nbsp; {file.pages} page{file.pages !== 1 ? 's' : ''} &nbsp;·&nbsp; {ext.toUpperCase()}
            </div>
          </div>
          <button className="sdet-modal-close" onClick={onClose} aria-label="Close preview">
            <Icon.Close />
          </button>
        </div>
        <div className="sdet-modal-body">
          {isImg && file.previewUrl && (
            <img src={file.previewUrl} alt={`Preview of ${file.name}`} className="sdet-prev-img" />
          )}
          {isPdf && file.previewUrl && (
            <iframe src={file.previewUrl} title={`PDF: ${file.name}`} className="sdet-prev-pdf" />
          )}
          {!isImg && !isPdf && (
            <div className="sdet-prev-unavail">
              <span style={{ color, fontSize: 48, display: 'inline-flex' }}><FIcon /></span>
              <p>Live preview is not available for <strong>.{ext}</strong> files.</p>
              <span>The file will be printed exactly as uploaded.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FILE SPEC CARD
═══════════════════════════════════════════════════════════ */
function FileSpecCard({ file, service, onChange, onRemove, onPreview, index }) {
  const spec = file.spec;
  const cost = calcCost(spec, file.pages);
  const { Icon: FIcon, color, bg, label } = getFileIcon(file.name);
  const set = (k, v) => onChange(file.id, { ...spec, [k]: v });

  return (
    <article
      className="sdet-fcard fade-up"
      style={{ animationDelay: `${Math.min(index * 0.07, 0.42)}s` }}
      aria-label={`Print configuration for ${file.name}`}
    >
      {/* ── Card header */}
      <div className="sdet-fcard-hd">
        <div className="sdet-fcard-icon" style={{ color, background: bg }}>
          <FIcon />
          <span className="sdet-fcard-ext" style={{ background: color }}>{label}</span>
        </div>
        <div className="sdet-fcard-info">
          <div className="sdet-fcard-fname" title={file.name}>{file.name}</div>
          <div className="sdet-fcard-meta">
            <span>{fmtSize(file.fileObj?.size || 0)}</span>
            <span className="sdet-dot">·</span>
            <span>{file.pages} page{file.pages !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="sdet-fcard-acts">
          {isPreviewable(file.name) && (
            <button
              className="sdet-act-btn sdet-act-btn--view"
              onClick={() => onPreview(file)}
              title="Preview"
              aria-label={`Preview ${file.name}`}
            >
              <Icon.Eye /> <span>Preview</span>
            </button>
          )}
          <button
            className="sdet-act-btn sdet-act-btn--del"
            onClick={() => onRemove(file.id)}
            title="Remove file"
            aria-label={`Remove ${file.name}`}
          >
            <Icon.Trash />
          </button>
        </div>
      </div>

      {/* ── Segmented controls */}
      <div className="sdet-seg-row">
        <div className="sdet-seg-group">
          <span className="sdet-seg-lbl">Printing Side</span>
          <Seg name="sides" value={spec.sides} onChange={v => set('sides', v)} options={[
            { value: 'single', label: 'Single-Sided' },
            { value: 'double', label: 'Double-Sided' },
          ]} />
        </div>
        <div className="sdet-seg-group">
          <span className="sdet-seg-lbl">Color Mode</span>
          <Seg name="color" value={spec.color} onChange={v => set('color', v)} options={[
            { value: 'bw', label: 'Black & White' },
            { value: 'color', label: 'Color' },
          ]} />
        </div>
      </div>

      {/* ── Spec grid */}
      <div className="sdet-spec-grid">
        {/* Paper Size */}
        <div className="sdet-field">
          <label htmlFor={`fsize-${file.id}`}>Paper Size</label>
          <select
            id={`fsize-${file.id}`}
            className="sdet-select"
            value={spec.paperSize}
            onChange={e => set('paperSize', e.target.value)}
          >
            {(service.sizes.length > 0 ? service.sizes : ['A4', 'A3', 'A5', 'Letter', 'Legal']).map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Paper Type */}
        <div className="sdet-field">
          <label htmlFor={`ftype-${file.id}`}>Paper Type</label>
          <select
            id={`ftype-${file.id}`}
            className="sdet-select"
            value={spec.paperType}
            onChange={e => set('paperType', e.target.value)}
          >
            {(service.materials.length > 0 ? service.materials : ['Bond', 'Glossy', 'Matte', 'Cardstock']).map(m => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Pages Per Sheet */}
        <div className="sdet-field">
          <label htmlFor={`fpps-${file.id}`}>Pages Per Sheet</label>
          <select
            id={`fpps-${file.id}`}
            className="sdet-select"
            value={spec.pagesPerSheet}
            onChange={e => set('pagesPerSheet', Number(e.target.value))}
          >
            {[1, 2, 4].map(n => <option key={n} value={n}>{n} page{n > 1 ? 's' : ''} / sheet</option>)}
          </select>
        </div>

        {/* Number of Copies */}
        <div className="sdet-field">
          <label htmlFor={`fcopies-${file.id}`}>Number of Copies</label>
          <div className="sdet-stepper">
            <button
              type="button"
              className="sdet-step-btn"
              onClick={() => set('copies', Math.max(1, (spec.copies || 1) - 1))}
              aria-label="Decrease copies"
            >−</button>
            <input
              id={`fcopies-${file.id}`}
              type="number"
              className="sdet-step-input"
              value={spec.copies}
              min={1} max={9999}
              onChange={e => {
                const val = e.target.value;
                if (val === '') { set('copies', ''); }
                else { const n = parseInt(val, 10); if (!isNaN(n)) set('copies', n); }
              }}
              onBlur={e => {
                const n = parseInt(e.target.value, 10);
                set('copies', isNaN(n) || n < 1 ? 1 : Math.min(9999, n));
              }}
            />
            <button
              type="button"
              className="sdet-step-btn"
              onClick={() => set('copies', Math.min(9999, (spec.copies || 1) + 1))}
              aria-label="Increase copies"
            >+</button>
          </div>
        </div>

        {/* Lamination */}
        <div className="sdet-field">
          <label htmlFor={`flam-${file.id}`}>Lamination</label>
          <select
            id={`flam-${file.id}`}
            className="sdet-select"
            value={spec.lamination}
            onChange={e => set('lamination', e.target.value)}
          >
            {['None', 'Glossy Lamination', 'Matte Lamination'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Binding Type */}
        <div className="sdet-field">
          <label htmlFor={`fbind-${file.id}`}>Binding Type</label>
          <select
            id={`fbind-${file.id}`}
            className="sdet-select"
            value={spec.binding}
            onChange={e => set('binding', e.target.value)}
          >
            {['None', 'Spiral', 'Stapled'].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* ── Cost footer */}
      <div className="sdet-fcard-cost">
        <div className="sdet-cost-items">
          <span className="sdet-ci">
            <span className="sdet-ci-label">Print Cost</span>
            <span className="sdet-ci-val">₹{cost.printCost.toFixed(2)}</span>
          </span>
          {cost.laminationCost > 0 && (
            <span className="sdet-ci">
              <span className="sdet-ci-label">Lamination</span>
              <span className="sdet-ci-val">₹{cost.laminationCost.toFixed(2)}</span>
            </span>
          )}
          {cost.bindingCost > 0 && (
            <span className="sdet-ci">
              <span className="sdet-ci-label">Binding</span>
              <span className="sdet-ci-val">₹{cost.bindingCost.toFixed(2)}</span>
            </span>
          )}
          <span className="sdet-ci sdet-ci--dim">
            <span className="sdet-ci-label">{cost.sheets} sheet{cost.sheets !== 1 ? 's' : ''}</span>
            <span className="sdet-ci-val">{cost.pages} pg</span>
          </span>
        </div>
        <div className="sdet-cost-total">
          <span>Estimated</span>
          <span className="sdet-cost-amt">₹{cost.total.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════
   NOT FOUND
═══════════════════════════════════════════════════════════ */
const NotFound = () => (
  <div className="sdet-notfound">
    <div className="sdet-notfound-icon"><Icon.Printer /></div>
    <h2>Service not found</h2>
    <p>We couldn't find the service you were looking for.</p>
    <Link to="/services" className="btn btn-primary btn-md">
      <Icon.ArrowLeft /> Browse all services
    </Link>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN — SERVICE DETAIL
═══════════════════════════════════════════════════════════ */
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);
  const c = service ? catColor(service.category) : {};

  /* Upload state */
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState('papers');
  const inputRef = useRef(null);
  const idCounter = useRef(1);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  /* Reset files when service changes */
  useEffect(() => {
    return () => {
      setFiles(prev => {
        prev.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
        return [];
      });
    };
  }, [id]);

  const totalMB = files.reduce((s, f) => s + (f.fileObj?.size || 0) / (1024 * 1024), 0);
  const usedPct = Math.min(100, (totalMB / MAX_TOTAL_MB) * 100);

  const makeDefaultSpec = useCallback(() => ({
    paperSize: service?.sizes?.[0] || 'A4',
    paperType: service?.materials?.[0] || 'Bond',
    pagesPerSheet: 1,
    copies: 1,
    lamination: 'None',
    binding: 'None',
    sides: 'single',
    color: 'bw',
  }), [service]);

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
        spec: makeDefaultSpec(),
      });
    });
    if (errs.length) setErrors(errs);
    if (valid.length) setFiles(prev => [...prev, ...valid]);
  }, [totalMB, makeDefaultSpec]);

  const onDrop = useCallback(e => {
    e.preventDefault(); setDrag(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const onDragOver = useCallback(e => { e.preventDefault(); setDrag(true); }, []);
  const onDragLeave = useCallback(() => setDrag(false), []);

  const removeFile = useCallback(fid => {
    setFiles(prev => {
      const f = prev.find(x => x.id === fid);
      if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
      return prev.filter(x => x.id !== fid);
    });
  }, []);

  const updateSpec = useCallback((fid, spec) => {
    setFiles(prev => prev.map(f => f.id === fid ? { ...f, spec } : f));
  }, []);

  const grandTotal = files.reduce((s, f) => s + calcCost(f.spec, f.pages).total, 0);
  const totalSheets = files.reduce((s, f) => s + calcCost(f.spec, f.pages).sheets, 0);

  /* Scroll to spec section when first file added */
  const prevCount = useRef(0);
  useEffect(() => {
    if (files.length > 0 && prevCount.current === 0) {
      setTimeout(() => {
        const el = document.getElementById('sdet-specs-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 180);
    }
    prevCount.current = files.length;
  }, [files.length]);

  /* Cleanup on unmount */
  useEffect(() => () => files.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); }), []);

  if (!service) return (
    <div className="sdet-page"><NotFound /></div>
  );

  const related = SERVICES.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);

  const handleAddToCart = () => {
    navigate('/cart', {
      state: {
        serviceId: service.id,
        serviceTitle: service.title,
        files: files.map(f => ({
          name: f.name,
          pages: f.pages,
          size: f.fileObj?.size || 0,
          spec: f.spec,
          cost: calcCost(f.spec, f.pages),
        })),
        grandTotal,
      }
    });
  };

  const TABS = [
    { key: 'papers', label: 'Paper Types', icon: <Icon.Layers /> },
    { key: 'sizes',  label: 'Document Sizes', icon: <Icon.Ruler /> },
    { key: 'pricing',label: 'Pricing Overview', icon: <Icon.Tag /> },
  ];

  const FILE_TYPES = ['JPG', 'JPEG', 'PNG', 'PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'CDR', 'AI', 'PS'];

  return (
    <div className="sdet-page">
      {previewFile && <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="sdet-hero" aria-labelledby="sdet-title" style={{ '--cat-bg': c.bg, '--cat-light': c.light }}>
        <div className="sdet-hero-bg" aria-hidden="true">
          <div className="sdet-hero-grid" />
          <div className="sdet-hero-orb" />
        </div>
        <div className="container sdet-hero-inner">
          {/* Breadcrumb */}
          <nav className="sdet-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <div className="sdet-hero-content">
            <div className="sdet-hero-text">
              {service.tag && (
                <span className={`svcp-badge svcp-badge--${service.tagType}`} style={{ position: 'static', marginBottom: '12px', display: 'inline-block' }}>
                  {service.tag}
                </span>
              )}
              <span className="sdet-cat-label" style={{ background: c.light, color: c.bg }}>
                {service.category}
              </span>
              <h1 id="sdet-title" className="sdet-hero-title">{service.title}</h1>
              <p className="sdet-hero-desc">{service.desc}</p>

              {/* Specs strip */}
              <div className="sdet-specs">
                <div className="sdet-spec">
                  <span className="sdet-spec-label">Starting price</span>
                  <span className="sdet-spec-val sdet-spec-val--price">{service.price}</span>
                </div>
                <div className="sdet-spec-divider" />
                <div className="sdet-spec">
                  <span className="sdet-spec-label">Turnaround</span>
                  <span className="sdet-spec-val"><Icon.Clock /> {service.turnaround}</span>
                </div>
                <div className="sdet-spec-divider" />
                <div className="sdet-spec">
                  <span className="sdet-spec-label">Min. Qty</span>
                  <span className="sdet-spec-val"><Icon.Package /> {service.minQty}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="sdet-actions">
                <a
                  href="#sdet-upload"
                  id={`sdet-order-btn-${service.id}`}
                  className="btn btn-primary btn-lg"
                  onClick={e => {
                    e.preventDefault();
                    document.getElementById('sdet-upload')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Upload & Order <Icon.Arrow />
                </a>
                <Link to="/services" className="btn btn-secondary btn-lg">
                  <Icon.ArrowLeft /> All Services
                </Link>
              </div>
            </div>

            {/* Art panel */}
            <div className="sdet-hero-art" style={{ background: c.light, borderColor: `${c.bg}30` }} aria-hidden="true">
              <div className="sdet-art-bg-orb" style={{ background: c.light }} />
              <ArtLarge kind={service.art} c={c} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE INFO SECTION ──────────────────────────────────────── */}
      <section className="sdet-info-section">
        <div className="container sdet-info-grid">
          {/* What's included */}
          <div className="sdet-features-card">
            <h2 className="sdet-card-title">
              <span className="sdet-card-title-icon" style={{ background: c.light, color: c.bg }}>
                <Icon.Check />
              </span>
              What's Included
            </h2>
            <ul className="sdet-features-list">
              {service.features.map(f => (
                <li key={f}>
                  <span className="sdet-feature-icon" style={{ background: c.light, color: c.bg }}>
                    <Icon.Check />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tabbed info panel */}
          <div className="sdet-info-panel">
            <div className="sdet-tabs" role="tablist" aria-label="Service details">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  role="tab"
                  id={`sdet-tab-${tab.key}`}
                  aria-selected={activeTab === tab.key}
                  aria-controls={`sdet-tabpanel-${tab.key}`}
                  className={`sdet-tab${activeTab === tab.key ? ' sdet-tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  style={activeTab === tab.key ? { '--tab-color': c.bg, '--tab-bg': c.light } : {}}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* ── Paper Types tab */}
            <div
              id="sdet-tabpanel-papers"
              role="tabpanel"
              aria-labelledby="sdet-tab-papers"
              className={`sdet-tabpanel${activeTab === 'papers' ? ' sdet-tabpanel--active' : ''}`}
            >
              <p className="sdet-tabpanel-intro">
                Choose from our range of premium paper stocks and finishes crafted for professional results.
              </p>
              <div className="sdet-mat-grid">
                {service.materials.map((m, i) => (
                  <div key={m} className="sdet-mat-card" style={{ '--mat-color': c.bg, '--mat-bg': c.light, animationDelay: `${i * 0.06}s` }}>
                    <div className="sdet-mat-icon" style={{ background: c.light, color: c.bg }}>
                      <Icon.Layers />
                    </div>
                    <div className="sdet-mat-name">{m}</div>
                  </div>
                ))}
              </div>
              <div className="sdet-finish-row">
                <span className="sdet-finish-label">Finishing options</span>
                <div className="sdet-tag-grid">
                  {service.finishes.map(f => (
                    <span key={f} className="sdet-option-tag" style={{ '--tag-hover-color': c.bg, '--tag-hover-bg': c.light }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sizes tab */}
            <div
              id="sdet-tabpanel-sizes"
              role="tabpanel"
              aria-labelledby="sdet-tab-sizes"
              className={`sdet-tabpanel${activeTab === 'sizes' ? ' sdet-tabpanel--active' : ''}`}
            >
              <p className="sdet-tabpanel-intro">
                Available document sizes for this service. All sizes available in portrait or landscape orientation.
              </p>
              <div className="sdet-size-grid">
                {service.sizes.map((s, i) => (
                  <div key={s} className="sdet-size-card" style={{ '--size-color': c.bg, '--size-bg': c.light, animationDelay: `${i * 0.06}s` }}>
                    <div className="sdet-size-icon" style={{ background: c.light, color: c.bg }}>
                      <Icon.Ruler />
                    </div>
                    <div className="sdet-size-name">{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Pricing tab */}
            <div
              id="sdet-tabpanel-pricing"
              role="tabpanel"
              aria-labelledby="sdet-tab-pricing"
              className={`sdet-tabpanel${activeTab === 'pricing' ? ' sdet-tabpanel--active' : ''}`}
            >
              <p className="sdet-tabpanel-intro">
                Starting prices — your final cost is calculated live based on paper type, color mode, copies, lamination &amp; binding.
              </p>
              <div className="sdet-pricing-table-wrap">
                <table className="sdet-pricing-table" aria-label="Pricing overview">
                  <thead>
                    <tr>
                      <th>Quantity</th>
                      <th>Black &amp; White</th>
                      <th style={{ color: c.bg }}>Full Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.pricing.map((row, i) => (
                      <tr key={i}>
                        <td className="sdet-pricing-qty">{row.qty}</td>
                        <td className="sdet-pricing-price">{row.bw}</td>
                        <td className="sdet-pricing-price sdet-pricing-price--color" style={{ color: c.bg }}>{row.color}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sdet-pricing-note">
                <Icon.Info /> GST &amp; delivery charges applicable. Prices may vary based on paper type, lamination, and binding selections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPLOAD SECTION ────────────────────────────────────────────── */}
      <section id="sdet-upload" className="sdet-upload-section" aria-labelledby="sdet-upload-title">
        <div className="container">
          <div className="sdet-upload-head">
            <span className="section-eyebrow" style={{ background: c.light, borderColor: `${c.bg}44`, color: c.bg }}>
              <Icon.CloudUpload /> Document Upload
            </span>
            <h2 id="sdet-upload-title" className="sdet-upload-title">Upload Your Files</h2>
            <p className="sdet-upload-sub">
              Upload one or more documents, configure per-file print specifications, and get real-time pricing before adding to cart.
            </p>
          </div>

          {/* Drop zone */}
          <div
            id="sdet-dropzone"
            className={`sdet-drop${drag ? ' sdet-drop--active' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload files — click or drag and drop"
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
            style={{ '--drop-color': c.bg, '--drop-bg': c.light, '--drop-border': `${c.bg}44` }}
          >
            <div className={`sdet-drop-icon${drag ? ' sdet-drop-icon--bounce' : ''}`} style={{ color: c.bg }}>
              <Icon.Upload />
            </div>
            <div className="sdet-drop-text">
              <strong>{drag ? 'Release to upload' : 'Drag & drop your files here'}</strong>
              <span>or <em onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>click to browse</em> from your device</span>
            </div>
            <div className="sdet-drop-types" aria-label="Accepted file types">
              {FILE_TYPES.map(t => (
                <span key={t} className="sdet-drop-type">{t}</span>
              ))}
            </div>
            <div className="sdet-drop-limit">
              <Icon.Info />
              Max total: <strong>500 MB</strong>&ensp;·&ensp;Multiple files supported
              {totalMB > 0 && (
                <span className="sdet-drop-used">&ensp;· Used: {totalMB.toFixed(1)} / 500 MB</span>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              multiple
              hidden
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.ppt,.pptx,.cdr,.ai,.ps"
              onChange={e => e.target.files?.length && addFiles(e.target.files)}
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="sdet-error-box" role="alert">
              {errors.map((e, i) => (
                <div key={i} className="sdet-error-row"><Icon.Warning /><span>{e}</span></div>
              ))}
              <button className="sdet-error-dismiss" onClick={() => setErrors([])}>Dismiss all</button>
            </div>
          )}
        </div>
      </section>

      {/* ── FILE SPEC CARDS ───────────────────────────────────────────── */}
      {files.length > 0 && (
        <section id="sdet-specs-section" className="sdet-specs-section" aria-label="Print specifications">
          <div className="container">
            <div className="sdet-specs-hd">
              <h2 className="sdet-specs-title">
                Print Specifications
                <span className="sdet-count-badge">{files.length} file{files.length !== 1 ? 's' : ''}</span>
              </h2>
              <p className="sdet-specs-sub">Configure print settings for each document. Pricing updates live as you adjust specifications.</p>
            </div>
            <div className="sdet-cards-list">
              {files.map((f, i) => (
                <FileSpecCard
                  key={f.id}
                  file={f}
                  service={service}
                  index={i}
                  onChange={updateSpec}
                  onRemove={removeFile}
                  onPreview={setPreviewFile}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EMPTY STATE ───────────────────────────────────────────────── */}
      {files.length === 0 && (
        <div className="sdet-empty fade-up">
          <div className="sdet-empty-art">
            <div className="sdet-empty-doc sdet-empty-doc--1" style={{ background: c.light, borderColor: `${c.bg}44` }} />
            <div className="sdet-empty-doc sdet-empty-doc--2" />
            <div className="sdet-empty-doc sdet-empty-doc--3" style={{ background: c.light }} />
          </div>
          <h3 className="sdet-empty-title">No documents uploaded yet</h3>
          <p className="sdet-empty-sub">Upload your files above to configure print settings and get instant pricing.</p>
          <ul className="sdet-tips">
            {[
              'Supports JPG, JPEG, PNG, PDF, DOC, DOCX, PPT, PPTX, CDR, AI & PS',
              'Upload multiple files simultaneously',
              'Live preview for image and PDF files',
              'Real-time INR pricing updated as you configure',
              'Per-file settings: paper, color mode, copies, binding & more',
            ].map(tip => (
              <li key={tip} className="sdet-tip">
                <span className="sdet-tip-icon" style={{ background: c.light, color: c.bg }}><Icon.Check /></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── RELATED SERVICES ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="sdet-related" aria-labelledby="sdet-related-title">
          <div className="container">
            <div className="section-head section-head--center">
              <span className="section-eyebrow"><Icon.Printer /> Related services</span>
              <h2 id="sdet-related-title" className="section-title">You might also need</h2>
            </div>
            <div className="sdet-related-grid">
              {related.map(s => {
                const rc = catColor(s.category);
                return (
                  <Link key={s.id} to={`/services/${s.id}`} className="sdet-related-card" aria-label={`${s.title} — ${s.price}`}>
                    <div className="sdet-related-art" style={{ background: rc.light }}>
                      {s.tag && (
                        <span className={`svcp-badge svcp-badge--${s.tagType}`}>{s.tag}</span>
                      )}
                    </div>
                    <div className="sdet-related-body">
                      <span className="svcp-cat-pill svcp-cat-pill--sm">{s.category}</span>
                      <h3 className="svcp-title">{s.title}</h3>
                      <div className="svcp-foot" style={{ paddingTop: '10px', borderTop: '1px solid var(--divider)' }}>
                        <span className="svcp-price">{s.price}</span>
                        <span className="svcp-cta">View <Icon.Arrow /></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY ADD-TO-CART BAR ────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="sdet-cart-bar" role="complementary" aria-label="Order summary">
          <div className="sdet-cart-bar-inner">
            <div className="sdet-cart-stats">
              <div className="sdet-cstat">
                <span className="sdet-cstat-label">Files</span>
                <span className="sdet-cstat-val">{files.length}</span>
              </div>
              <div className="sdet-cstat-div" />
              <div className="sdet-cstat">
                <span className="sdet-cstat-label">Total Sheets</span>
                <span className="sdet-cstat-val">{totalSheets}</span>
              </div>
              <div className="sdet-cstat-div" />
              <div className="sdet-cstat">
                <span className="sdet-cstat-label">Grand Total</span>
                <span className="sdet-cstat-val sdet-cstat-val--price">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="sdet-cart-actions">
              <p className="sdet-cart-note">Per configured specs · GST applicable at checkout</p>
              <button
                id={`sdet-add-to-cart-${service.id}`}
                className="sdet-cart-btn"
                onClick={handleAddToCart}
                aria-label={`Add to cart — ₹${grandTotal.toFixed(2)}`}
              >
                <Icon.Cart />
                Add to Cart · ₹{grandTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   LARGE ART ILLUSTRATIONS
═══════════════════════════════════════════════════════════ */
const ArtLarge = ({ kind, c }) => {
  const artStyle = { '--art-bg': c.bg, '--art-light': c.light };

  if (kind === 'cards') return (
    <div className="slart slart--cards" style={artStyle}>
      <div className="slart-stack">
        <div className="slart-card slart-card--back" style={{ background: c.bg, opacity: 0.55 }} />
        <div className="slart-card slart-card--mid" />
        <div className="slart-card slart-card--front" style={{ background: c.bg, opacity: 0.85 }} />
      </div>
    </div>
  );

  if (kind === 'doc') return (
    <div className="slart slart--doc" style={artStyle}>
      <div className="slart-page">
        <div className="slart-page-header" style={{ background: c.bg }} />
        {[100, 88, 92, 70, 80, 65, 90, 60].map((w, i) => (
          <div key={i} className="slart-line" style={{ width: `${w}%`, opacity: i > 4 ? 0.6 : 1 }} />
        ))}
      </div>
    </div>
  );

  if (kind === 'poster') return (
    <div className="slart slart--poster" style={artStyle}>
      <div className="slart-poster">
        <div style={{ flex: 2, background: c.bg }} />
        <div style={{ flex: 0.8, background: 'var(--bg-elev-3)' }} />
        <div style={{ flex: 1.2, background: c.bg, opacity: 0.5 }} />
      </div>
    </div>
  );

  if (kind === 'banner') return (
    <div className="slart slart--banner" style={artStyle}>
      <div className="slart-banner" style={{ background: `linear-gradient(90deg, ${c.bg}, ${c.bg}99)` }}>
        <div className="slart-banner-line" />
        <div className="slart-banner-line" style={{ width: '55%', opacity: 0.5, top: '56%' }} />
      </div>
    </div>
  );

  if (kind === 'jumbo') return (
    <div className="slart slart--jumbo" style={artStyle}>
      <div className="slart-jumbo">
        <div style={{ flex: 3, background: `linear-gradient(135deg, ${c.bg}, ${c.bg}70)` }} />
        <div style={{ flex: 0.7, background: 'var(--bg-elev-3)' }} />
      </div>
    </div>
  );

  if (kind === 'brochure') return (
    <div className="slart slart--brochure" style={artStyle}>
      {[0, 1, 2].map(i => (
        <div key={i} className="slart-panel" style={i === 1 ? { background: c.light, borderColor: c.bg } : {}}>
          <div style={{ height: 14, borderRadius: 3, background: i === 1 ? c.bg : 'var(--bg-elev-3)', marginBottom: 6 }} />
          {[90, 75, 85].map((w, j) => (
            <div key={j} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: 'rgba(26,20,38,0.12)', marginBottom: 4 }} />
          ))}
        </div>
      ))}
    </div>
  );

  if (kind === 'notebook') return (
    <div className="slart slart--notebook" style={artStyle}>
      <div style={{ width: 18, height: 140, background: c.bg, borderRadius: '4px 0 0 4px' }} />
      <div style={{ flex: 1, background: 'var(--bg-elev-1)', border: `2px solid ${c.bg}`, borderLeft: 'none', borderRadius: '0 6px 6px 0', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ width: 48, height: 14, borderRadius: 3, background: c.bg, marginBottom: 8 }} />
        {[90, 75, 85, 65, 80].map((w, i) => (
          <div key={i} style={{ height: 3, width: `${w}%`, borderRadius: 2, background: 'rgba(26,20,38,0.14)' }} />
        ))}
      </div>
    </div>
  );

  if (kind === 'envelope') return (
    <div className="slart slart--envelope" style={artStyle}>
      <div style={{ width: 190, height: 132, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 0, borderLeft: '95px solid transparent', borderRight: '95px solid transparent', borderBottom: `64px solid ${c.bg}`, opacity: 0.7, zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: '30px 0 0', background: 'var(--bg-elev-1)', border: '1.5px solid var(--border)', borderRadius: '0 0 6px 6px', padding: '20px 14px 12px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ width: 80, height: 5, background: 'rgba(26,20,38,0.14)', borderRadius: 3 }} />
          <div style={{ width: 28, height: 34, background: c.bg, borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );

  if (kind === 'sticker') return (
    <div className="slart slart--sticker" style={artStyle}>
      <div style={{ width: 116, height: 116, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 32px ${c.bg}44`, zIndex: 2 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
      </div>
      <div style={{ position: 'absolute', width: 64, height: 64, borderRadius: '50%', background: c.bg, opacity: 0.5, top: 8, right: 18, zIndex: 1 }} />
      <div style={{ position: 'absolute', width: 46, height: 46, borderRadius: '50%', background: c.light, border: `2px solid ${c.bg}`, bottom: 10, left: 18, zIndex: 1 }} />
    </div>
  );

  return <div style={{ width: 160, height: 120, background: c.light, borderRadius: 12 }} />;
};

export default ServiceDetail;
