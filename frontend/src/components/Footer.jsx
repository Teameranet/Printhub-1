import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Facebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z"/></svg>
);
const Twitter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const Instagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const LinkedIn = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const AppStore = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const PlayStore = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.61 1.81c-.39.4-.61.99-.61 1.76v16.86c0 .77.22 1.36.6 1.76L3.6 22.2l9.6-9.6v-.2L3.6 2.8l.01-.99zm12.4 9.99-2.81-2.81 3.04-3.04 4.41 2.51c1.07.6 1.07 1.59 0 2.19l-4.64 2.62v-1.47zM3.6 2.8l9.6 9.6-2.81 2.81L3.6 22.2c.39.4.99.4 1.69-.07l11.4-6.51-2.84-2.84L3.6 2.8z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('INR');

  const onSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 — brand */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo" aria-label="PrintHub home">
              <img src="/Printhub_logo.png" alt="PrintHub" />
            </Link>
            <p className="footer-blurb">
              Fast, easy online printing. Upload, configure, and order in minutes — with real-time pricing on every job.
            </p>
            <div className="footer-contact">
              <span>hello@printhub.in</span>
              <span>+91 80808 80808</span>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#track">Track Order</a></li>
              <li><Link to="/adminuser/login">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 3 — Support */}
          <div className="footer-col">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-list">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#terms">Terms &amp; Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#refund">Refund Policy</a></li>
              <li><a href="#status">System Status</a></li>
            </ul>
          </div>

          {/* Col 4 — Apps, socials, newsletter */}
          <div className="footer-col">
            <h4 className="footer-title">Get the app</h4>
            <div className="footer-badges">
              <a href="#appstore" className="store-badge" aria-label="Download on the App Store">
                <AppStore />
                <span>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a href="#playstore" className="store-badge" aria-label="Get it on Google Play">
                <PlayStore />
                <span>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>

            <h4 className="footer-title footer-title--mt">Stay in the loop</h4>
            <form className="newsletter" onSubmit={onSubscribe}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                required
              />
              <button type="submit" className="newsletter-btn">
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </form>

            <div className="footer-socials" aria-label="Social media">
              <a className="footer-social" href="#facebook" aria-label="Facebook"><Facebook /></a>
              <a className="footer-social" href="#twitter" aria-label="Twitter / X"><Twitter /></a>
              <a className="footer-social" href="#instagram" aria-label="Instagram"><Instagram /></a>
              <a className="footer-social" href="#linkedin" aria-label="LinkedIn"><LinkedIn /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} PrintHub Technologies Pvt. Ltd. — All rights reserved.
          </div>
          <div className="footer-controls">
            <label className="footer-select">
              <span className="visually-hidden">Language</span>
              <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
                <option>EN</option>
                <option>हिन्दी</option>
                <option>मराठी</option>
                <option>தமிழ்</option>
              </select>
            </label>
            <label className="footer-select">
              <span className="visually-hidden">Currency</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Currency">
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
