import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, Users, Recycle, DollarSign, Award, Truck, CheckCircle2, XCircle, Sliders, Search } from 'lucide-react';
import API from '../services/api';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, pricing, verification

  const [searchUser, setSearchUser] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [statsRes, userRes, collRes, catRes] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/admin/users'),
        API.get('/admin/collectors'),
        API.get('/waste/categories')
      ]);

      if (statsRes.data.success) setStats(statsRes.data.data);
      if (userRes.data.success) setUsers(userRes.data.data);
      if (collRes.data.success) setCollectors(collRes.data.data);
      if (catRes.data.success) setCategories(catRes.data.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUser = async (userId) => {
    try {
      const res = await API.put(`/admin/users/${userId}/toggle-status`);
      if (res.data.success) {
        setUsers(prev => prev.map(u => u.id === userId ? res.data.data : u));
      }
    } catch (err) {
      console.error('Failed to toggle user:', err);
    }
  };

  const handleVerifyCollector = async (collectorId, status) => {
    try {
      const res = await API.put(`/admin/collectors/${collectorId}/verify?status=${status}`);
      if (res.data.success) {
        setCollectors(prev => prev.map(c => c.id === collectorId ? res.data.data : c));
      }
    } catch (err) {
      console.error('Failed to verify collector:', err);
    }
  };

  const handleSaveCategoryPricing = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const res = await API.put(`/admin/categories/${editingCategory.id}`, editingCategory);
      if (res.data.success) {
        setCategories(prev => prev.map(c => c.id === editingCategory.id ? res.data.data : c));
        setEditingCategory(null);
      }
    } catch (err) {
      console.error('Failed to update category:', err);
    }
  };

  // Sample chart data
  const chartData = [
    { category: 'E-Waste', kg: 14.5, value: 520 },
    { category: 'Paper', kg: 18.2, value: 220 },
    { category: 'Plastics', kg: 9.8, value: 180 },
    { category: 'Clothes', kg: 12.0, value: 360 },
    { category: 'Metal', kg: 6.5, value: 260 }
  ];

  const COLORS = ['#22c55e', '#0d9488', '#eab308', '#ec4899', '#8b5cf6'];

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-amber-950/60 via-dark-card to-dark-bg">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/30 inline-block">
            System Administration
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Admin Control Panel 🛡️
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Platform analytics, user status controls, waste category pricing, and recycler/NGO verification.
          </p>
        </div>
      </div>

      {/* Admin Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 glass-card rounded-2xl border border-amber-500/20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          Analytics & Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'users' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          User Management ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'pricing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          Waste Categories & Pricing
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'verification' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          Collector Verification ({collectors.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Admin Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-amber-500/20 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Platform Users</span>
              <div className="text-2xl font-black text-white">{stats?.totalUsers || users.length}</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-amber-500/20 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Waste Diverted</span>
              <div className="text-2xl font-black text-emerald-400">{stats?.totalWasteDivertedKg || 42.5} KG</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-amber-500/20 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Value Generated</span>
              <div className="text-2xl font-black text-amber-300">₹{stats?.totalValueGenerated || 1280}</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-amber-500/20 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active Pickups</span>
              <div className="text-2xl font-black text-teal-300">{stats?.activePickups || 1}</div>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Bar Chart */}
            <div className="glass-card p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <h3 className="text-base font-bold text-white">Waste Volume & Value by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#121a15', borderColor: '#22c55e', borderRadius: '12px', color: '#fff' }} />
                    <Bar dataKey="kg" fill="#22c55e" radius={[6, 6, 0, 0]} name="Volume (KG)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="glass-card p-6 rounded-3xl border border-amber-500/20 space-y-4">
              <h3 className="text-base font-bold text-white">Category Value Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#121a15', borderColor: '#22c55e', borderRadius: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white">User Accounts & Roles</h3>
            
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search user email or name..."
                className="w-full bg-dark-input border border-amber-500/20 text-white text-xs rounded-xl px-3 py-2 pl-9 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-dark-input text-amber-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Green Points</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-emerald-950/20">
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 font-semibold text-emerald-400">{u.role}</td>
                    <td className="p-3 font-bold text-amber-300">{u.greenPoints} Pts</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                        {u.active ? 'ACTIVE' : 'BLOCKED'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleUser(u.id)}
                        className={`px-3 py-1 rounded-lg font-bold text-[10px] ${u.active ? 'bg-red-950 text-red-300 border border-red-500/30' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'}`}
                      >
                        {u.active ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WASTE CATEGORIES & PRICING */}
      {activeTab === 'pricing' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <h3 className="text-xl font-bold text-white">Configurable Waste Pricing & Impact Factors</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-dark-input/60 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{cat.name} ({cat.code})</h4>
                    <p className="text-xs text-emerald-400 font-semibold">
                      Range: ₹{cat.minPricePerKg} - ₹{cat.maxPricePerKg}/kg • Reward: {cat.rewardPointsPerKg} Pts/kg
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs"
                  >
                    Edit Pricing
                  </button>
                </div>
              ))}
            </div>

            {/* Edit Pricing Form */}
            <div>
              {editingCategory ? (
                <form onSubmit={handleSaveCategoryPricing} className="p-6 rounded-2xl bg-dark-card border border-amber-500/30 space-y-4">
                  <h4 className="text-base font-bold text-white">Edit Pricing for {editingCategory.name}</h4>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Min Price (₹/kg)</label>
                      <input
                        type="number"
                        value={editingCategory.minPricePerKg}
                        onChange={(e) => setEditingCategory({ ...editingCategory, minPricePerKg: parseFloat(e.target.value) })}
                        className="w-full bg-dark-input border border-emerald-500/20 text-white rounded-xl p-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Max Price (₹/kg)</label>
                      <input
                        type="number"
                        value={editingCategory.maxPricePerKg}
                        onChange={(e) => setEditingCategory({ ...editingCategory, maxPricePerKg: parseFloat(e.target.value) })}
                        className="w-full bg-dark-input border border-emerald-500/20 text-white rounded-xl p-2 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">Reward Points / KG</label>
                      <input
                        type="number"
                        value={editingCategory.rewardPointsPerKg}
                        onChange={(e) => setEditingCategory({ ...editingCategory, rewardPointsPerKg: parseInt(e.target.value) })}
                        className="w-full bg-dark-input border border-emerald-500/20 text-white rounded-xl p-2 outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-300 block mb-1">CO2 Saved Factor</label>
                      <input
                        type="number"
                        step="0.1"
                        value={editingCategory.co2SavedFactor}
                        onChange={(e) => setEditingCategory({ ...editingCategory, co2SavedFactor: parseFloat(e.target.value) })}
                        className="w-full bg-dark-input border border-emerald-500/20 text-white rounded-xl p-2 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setEditingCategory(null)} className="w-full py-2 rounded-xl glass-card text-xs text-slate-300 font-bold">
                      Cancel
                    </button>
                    <button type="submit" className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-glow">
                      Save Category Rules
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 rounded-2xl bg-dark-input/40 border border-emerald-500/10 text-center text-xs text-slate-400">
                  Select a category from the left list to modify price bounds and Green Points factors.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COLLECTOR VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/20 space-y-6">
          <h3 className="text-xl font-bold text-white">Collector & NGO Partner Verifications</h3>

          <div className="space-y-4">
            {collectors.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-dark-input/60 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950 px-2 py-0.5 rounded-md">
                    {c.collectorType}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{c.organizationName}</h4>
                  <p className="text-xs text-slate-400">{c.address}, {c.city}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.verificationStatus === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                    {c.verificationStatus}
                  </span>

                  <button
                    onClick={() => handleVerifyCollector(c.id, 'VERIFIED')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-glow"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleVerifyCollector(c.id, 'REJECTED')}
                    className="px-3 py-1.5 rounded-xl bg-red-950 text-red-300 border border-red-500/30 font-bold text-xs"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
