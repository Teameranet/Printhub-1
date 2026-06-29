import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Sparkles, Zap } from 'lucide-react';
import './Home.css';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            The Future of <span className="highlight">Professional Printing</span>
          </h1>
          <p className="hero-subtitle">
            Experience lightning-fast orders, premium quality, and effortless management for all your print needs.
          </p>
          <div className="hero-actions">
            <Link to="/auth?mode=register">
              <Button size="lg" className="hero-btn">
                Start Printing <ArrowRight size={20} className="icon-ml" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-bg-glow"></div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Why Choose PrintHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Zap size={32} /></div>
            <h3>Lightning Fast</h3>
            <p>Get your prints delivered in record time with our optimized workflow.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Sparkles size={32} /></div>
            <h3>Premium Quality</h3>
            <p>State-of-the-art printers ensuring every detail is crisp and vibrant.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Printer size={32} /></div>
            <h3>Easy Management</h3>
            <p>Track orders, manage files, and reorder with just a few clicks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
