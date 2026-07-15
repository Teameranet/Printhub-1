import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
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
import ServicesPage from './pages/user/Services';
import ServiceDetail from './pages/user/ServiceDetail';

/* Admin pages */
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';

import './App.css';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

/* ── Layout wrapper — hides Navbar/Footer on admin routes ── */
const AppLayout = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/adminuser');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? '' : 'main-content'}>
        <Suspense fallback={<Spinner fullScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* User Routes */}
            <Route path="/dashboard"    element={<Dashboard />} />
            <Route path="/print/normal" element={<NormalPrint />} />
            <Route path="/profile"      element={<Profile />} />
            <Route path="/orders"       element={<Orders />} />
            <Route path="/settings"     element={<Settings />} />
            <Route path="/cart"         element={<Cart />} />
            <Route path="/checkout"     element={<Checkout />} />
            <Route path="/services"     element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />

            {/* Admin Routes — no shared Navbar/Footer */}
            <Route path="/adminuser/login"     element={<AdminLogin />} />
            <Route path="/adminuser/dashboard" element={<AdminDashboard />} />
            <Route path="/adminuser/dashboard/:section" element={<AdminDashboard />} />

            {/* Legacy admin routes kept for backwards compatibility */}
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users"    element={<AdminUsers />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <Router>
          <AppLayout />
        </Router>
      </AuthProvider>
    </AdminAuthProvider>
  );
}

export default App;
