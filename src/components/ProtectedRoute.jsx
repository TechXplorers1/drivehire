import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, userRole, loading } = useAuth();

    if (loading) {
        return <LoadingScreen fullScreen={true} message="Authenticating" />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Role is fetching or user doesn't have one assigned yet
    // If we have a user but no role yet, it might be a race condition during signup.
    // Show loading instead of redirecting to prevent premature rejection.
    if (user && userRole === null) {
        return <LoadingScreen fullScreen={true} message="Verifying Access" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Role not authorized, redirect to home or unauthorized page
        return <Navigate to="/" />;
    }

    return children;
}
