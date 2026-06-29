import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="admin-page">
      <h1>Manage Products</h1>
      <p>Add, edit, or delete products here.</p>
    </div>
  );
};

export default AdminProducts;
