import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogIn, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import API from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.data);
        if (res.data.data.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else if (res.data.data.role === 'ROLE_COLLECTOR') {
          navigate('/collector-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const setDemoUser = (userEmail, userPass) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-bg relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/20 relative z-10 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-eco-400 p-0.5 mx-auto shadow-glow">
            <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
              <Leaf className="w-7 h-7 text-eco-400" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to track your waste, Green Points, and pickup requests</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-4 py-3 pl-10 outline-none transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link simulated! You can use default passwords: user123, collector123, or admin123'); }} className="text-eco-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-4 py-3 pl-10 outline-none transition-all"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Demo Quick Fill Buttons */}
        <div className="pt-4 border-t border-emerald-500/10 space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">Quick Demo Login</span>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button 
              type="button" 
              onClick={() => setDemoUser('saloni@waste2worth.com', 'user123')}
              className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/60"
            >
              Citizen
            </button>
            <button 
              type="button" 
              onClick={() => setDemoUser('collector@greencycle.com', 'collector123')}
              className="p-2 rounded-xl bg-teal-950/60 border border-teal-500/20 text-teal-300 hover:bg-teal-900/60"
            >
              Collector
            </button>
            <button 
              type="button" 
              onClick={() => setDemoUser('admin@waste2worth.com', 'admin123')}
              className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/20 text-amber-300 hover:bg-amber-900/60"
            >
              Admin
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-eco-400 font-semibold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
