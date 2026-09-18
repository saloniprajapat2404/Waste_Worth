import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const SubmitWastePage = lazy(() => import('./pages/SubmitWastePage'));
const WasteRecommendationPage = lazy(() => import('./pages/WasteRecommendationPage'));
const PickupPage = lazy(() => import('./pages/PickupPage'));
const WasteJourneyPage = lazy(() => import('./pages/WasteJourneyPage'));
const NearbyCentersPage = lazy(() => import('./pages/NearbyCentersPage'));
const GreenProfilePage = lazy(() => import('./pages/GreenProfilePage'));
const RewardsPage = lazy(() => import('./pages/RewardsPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const CollectorDashboardPage = lazy(() => import('./pages/CollectorDashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return <div className="p-20 text-center text-slate-400">Loading Waste2Worth...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roleRequired && user?.role !== roleRequired && user?.role !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const pageFallback = (
  <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
    Loading page...
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-dark-bg text-slate-100 font-sans selection:bg-eco-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={pageFallback}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
