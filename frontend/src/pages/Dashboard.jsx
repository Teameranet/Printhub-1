import React from 'react';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: products, loading, error } = useFetch('http://localhost:5000/api/products');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to your Dashboard</h1>
        <p>Hello, {user?.username || user?.email || 'User'}!</p>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Your Stats</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-value">24</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">128</span>
              <span className="stat-label">Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">95%</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Products</h3>
          {loading && <p>Loading products...</p>}
          {error && <p className="error">Error: {error}</p>}
          {products && (
            <ul className="product-list">
              {products.map(product => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
