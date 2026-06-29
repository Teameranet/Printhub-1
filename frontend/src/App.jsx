import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/user/Dashboard';
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
              <Route path="/auth" element={<Auth />} />
              
              {/* User Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Admin Routes */}
              <Route path="/adminuser/login" element={<Auth />} />
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
