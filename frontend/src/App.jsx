import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/user/Dashboard';
import NormalPrint from './pages/user/NormalPrint';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Settings from './pages/user/Settings';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import './App.css';

import { Suspense } from 'react';
import Spinner from './components/Spinner';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<Spinner fullScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              {/* User Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/print/normal" element={<NormalPrint />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Admin Routes */}
              <Route path="/adminuser/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
