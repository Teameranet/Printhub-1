import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import Button from './Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">PrintHub</span>
        </Link>
        <div className="navbar-links">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/adminuser/dashboard" className="nav-link">Admin Dashboard</Link>
                  <Link to="/admin/products" className="nav-link">Products</Link>
                  <Link to="/admin/users" className="nav-link">Users</Link>
                </>
              ) : (
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              )}
              <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/auth" className="nav-link">Sign In</Link>
              <Link to="/auth?mode=register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
