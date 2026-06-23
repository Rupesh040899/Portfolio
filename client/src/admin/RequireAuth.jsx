import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';
import Loader from '../components/Loader.jsx';

/** Guards admin routes — redirects to login if not authenticated. */
export default function RequireAuth({ children }) {
  const { isAuthed, loading } = useAdminAuth();
  if (loading) return <Loader />;
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return children;
}
