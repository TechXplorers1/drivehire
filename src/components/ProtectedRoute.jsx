import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, userRole, loading } = useAuth();

    if (loading) {
        return <div className="p-4 flex justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Role not authorized, redirect to home or unauthorized page
        return <Navigate to="/" />;
    }

    return children;
}
