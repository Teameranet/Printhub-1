import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to MyApp</h1>
        <p>Build amazing things with React and Node.js</p>
        <div className="hero-buttons">
          <Link to="/auth">
            <Button variant="primary">Get Started</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary">Learn More</Button>
          </Link>
        </div>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>Fast & Modern</h3>
          <p>Built with the latest React and Vite technologies</p>
        </div>
        <div className="feature-card">
          <h3>Secure Backend</h3>
          <p>Node.js API with authentication and authorization</p>
        </div>
        <div className="feature-card">
          <h3>Easy to Scale</h3>
          <p>Modular architecture for growing applications</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
