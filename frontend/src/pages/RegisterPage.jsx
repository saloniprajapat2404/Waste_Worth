import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, UserPlus, Mail, Lock, User, Phone, MapPin, Building, AlertCircle, ArrowRight } from 'lucide-react';
import API from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: 'New Delhi',
    pincode: '110001',
    role: 'ROLE_USER',
    organizationName: '',
    collectorType: 'RECYCLER',
    acceptedMaterials: 'Paper, Plastic, E-Waste'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/register', formData);
      if (res.data.success) {
        login(res.data.data);
        if (formData.role === 'ROLE_COLLECTOR') {
          navigate('/collector-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-bg relative">
      <div className="max-w-xl w-full space-y-8 glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/20 relative z-10 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-eco-400 p-0.5 mx-auto shadow-glow">
            <div className="w-full h-full bg-dark-bg rounded-[14px] flex items-center justify-center">
              <Leaf className="w-7 h-7 text-eco-400" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="text-xs text-slate-400">Join Waste2Worth to evaluate waste, request pickups, and earn rewards</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-dark-input rounded-2xl border border-emerald-500/20">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'ROLE_USER' })}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${formData.role === 'ROLE_USER' ? 'bg-eco-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
          >
            🌱 Citizen / User
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'ROLE_COLLECTOR' })}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all ${formData.role === 'ROLE_COLLECTOR' ? 'bg-teal-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
          >
            🚚 Recycler / NGO
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Saloni Sharma"
                  className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 pl-9 outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 pl-9 outline-none"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 pl-9 outline-none"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 pl-9 outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Address</label>
            <div className="relative">
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Flat 402, Green Park"
                className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 pl-9 outline-none"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full bg-dark-input border border-emerald-500/20 focus:border-emerald-400 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>
          </div>

          {/* Collector Specific Extra Fields */}
          {formData.role === 'ROLE_COLLECTOR' && (
            <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 space-y-3">
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">Collector / Organization Details</h4>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Organization / Center Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="e.g. EcoCycle Recovery Center"
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-sm rounded-xl px-3.5 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Category Type</label>
                  <select
                    name="collectorType"
                    value={formData.collectorType}
                    onChange={handleChange}
                    className="w-full bg-dark-input border border-teal-500/20 text-white text-xs rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="RECYCLER">Recycler</option>
                    <option value="NGO">NGO / Donation</option>
                    <option value="DONATION_CENTER">Donation Center</option>
                    <option value="SCRAP_COLLECTOR">Scrap Collector</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Accepted Materials</label>
                  <input
                    type="text"
                    name="acceptedMaterials"
                    value={formData.acceptedMaterials}
                    onChange={handleChange}
                    className="w-full bg-dark-input border border-teal-500/20 text-white text-xs rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Creating Account...' : <>Complete Sign Up <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-eco-400 font-semibold hover:underline">
            Sign in here
          </Link>
        </div>

      </div>
    </div>
  );
}
