import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin control panel.</p>
    </div>
  );
};

export default AdminDashboard;
