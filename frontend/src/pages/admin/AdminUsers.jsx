import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminUsers = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="admin-page">
      <h1>Manage Users</h1>
      <p>View and manage registered users.</p>
    </div>
  );
};

export default AdminUsers;
