import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import SubmitWastePage from './pages/SubmitWastePage';
import WasteRecommendationPage from './pages/WasteRecommendationPage';
import PickupPage from './pages/PickupPage';
import WasteJourneyPage from './pages/WasteJourneyPage';
import NearbyCentersPage from './pages/NearbyCentersPage';
import GreenProfilePage from './pages/GreenProfilePage';
import RewardsPage from './pages/RewardsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotificationsPage from './pages/NotificationsPage';
import CollectorDashboardPage from './pages/CollectorDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div className="p-20 text-center text-slate-400">Loading Waste2Worth...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roleRequired && user?.role !== roleRequired && user?.role !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-eco-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/submit" element={<SubmitWastePage />} />
              <Route path="/recommendation" element={<WasteRecommendationPage />} />
              <Route path="/centers" element={<NearbyCentersPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />

              <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/pickups" element={<ProtectedRoute><PickupPage /></ProtectedRoute>} />
              <Route path="/journey" element={<ProtectedRoute><WasteJourneyPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><GreenProfilePage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

              <Route path="/collector-dashboard" element={<ProtectedRoute roleRequired="ROLE_COLLECTOR"><CollectorDashboardPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roleRequired="ROLE_ADMIN"><AdminDashboardPage /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
