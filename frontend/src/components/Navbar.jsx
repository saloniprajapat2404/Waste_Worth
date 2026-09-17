import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import { Leaf, LogOut, Menu, X, Shield, Truck } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, isCollector, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-dark-bg/80 backdrop-blur-md border-b border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo & Subtitle */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-eco-500 to-teal-400 p-0.5 shadow-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-eco-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white font-sans leading-none">
                Waste<span className="text-gradient">2Worth</span>
              </span>
              <span className="text-[9px] tracking-widest text-emerald-400/90 uppercase font-bold mt-1">
                SMART RESOURCE PLATFORM
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            <Link 
              to="/submit" 
              className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive('/submit') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-glow' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              Find Worth 🌱
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive('/dashboard') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/pickups" 
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive('/pickups') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
                  }`}
                >
                  Pickups
                </Link>
                <Link 
                  to="/journey" 
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive('/journey') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
                  }`}
                >
                  Waste Journey
                </Link>
              </>
            )}

            <Link 
              to="/centers" 
              className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                isActive('/centers') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              Nearby Centers
            </Link>

            <Link 
              to="/rewards" 
              className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                isActive('/rewards') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              Rewards 🎁
            </Link>

            <Link 
              to="/leaderboard" 
              className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                isActive('/leaderboard') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              Leaderboard 🏆
            </Link>

            {isCollector && (
              <Link 
                to="/collector-dashboard" 
                className="px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 transition-all flex items-center gap-1.5"
              >
                <Truck className="w-4 h-4" /> Collector Portal
              </Link>
            )}

            {isAdmin && (
              <Link 
                to="/admin" 
                className="px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <Shield className="w-4 h-4" /> Admin Portal
              </Link>
            )}
          </div>

          {/* RIGHT: Auth Controls & Profile */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                
                <Link to="/profile" className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all group">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-eco-600 to-emerald-400 text-white flex items-center justify-center font-bold text-xs shadow-glow">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{user?.name}</span>
                    <span className="block text-[10px] text-eco-400 font-extrabold">{user?.greenPoints || 0} Green Pts</span>
                  </div>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-500/20 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-5 w-px bg-emerald-500/20" />
                <Link to="/login" className="px-3.5 py-2 text-xs xl:text-sm font-semibold text-slate-200 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-xl text-xs xl:text-sm font-bold bg-eco-600 hover:bg-eco-500 text-white shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-1">
                  Get Started →
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && <NotificationDropdown />}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:bg-emerald-950/60 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card border-b border-emerald-500/20 px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top duration-200">
          <Link to="/submit" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-300 bg-emerald-950/50">
            Find Waste Worth 🌱
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
                Dashboard
              </Link>
              <Link to="/pickups" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
                Pickups
              </Link>
              <Link to="/journey" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
                Waste Journey
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
                My Profile ({user?.greenPoints || 0} Pts)
              </Link>
            </>
          )}
          <Link to="/centers" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
            Nearby Recyclers / NGOs
          </Link>
          <Link to="/rewards" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
            Rewards Catalog
          </Link>
          <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-emerald-950/40">
            Leaderboard
          </Link>
          
          {isCollector && (
            <Link to="/collector-dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-teal-300 bg-teal-950/40">
              Collector Portal
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-amber-300 bg-amber-950/40">
              Admin Portal
            </Link>
          )}

          {isAuthenticated ? (
            <button 
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/30"
            >
              Sign Out
            </button>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-dark-card border border-emerald-500/20 text-slate-200">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-eco-600 text-white">
                Register Account
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
