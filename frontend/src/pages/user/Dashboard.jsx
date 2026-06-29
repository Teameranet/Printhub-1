import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: products, loading, error } = useFetch('http://localhost:5000/api/products');

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Manage your print orders and explore products.</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Available Products</h2>
          {loading && <p className="loading-text">Loading products...</p>}
          {error && <p className="error-text">Failed to load products.</p>}
          {products && (
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button className="btn btn-secondary btn-sm mt-2">Order Now</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
