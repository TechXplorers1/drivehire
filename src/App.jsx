import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layouts/Layout';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import Fleet from './pages/Fleet';
import Business from './pages/Business';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import DriverDashboard from './pages/DriverDashboard';

// Placeholders for other pages
import DrivingSchool from './pages/DrivingSchool';
import SchoolBookingWizard from './pages/SchoolBookingWizard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/city-to-city" element={<ServiceDetail type="city-to-city" />} />
            <Route path="/services/hourly" element={<ServiceDetail type="hourly" />} />
            <Route path="/services/one-way" element={<ServiceDetail type="one-way" />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/business" element={<Business />} />
            <Route path="/school" element={<DrivingSchool />} />
            <Route path="/school/book" element={<SchoolBookingWizard />} />

            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver"
              element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
