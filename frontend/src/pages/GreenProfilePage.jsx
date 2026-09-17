import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Award, Recycle, DollarSign, HeartHandshake, RefreshCw, Trophy, ShieldCheck } from 'lucide-react';
import API from '../services/api';

export default function GreenProfilePage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await API.get('/rewards/achievements');
      if (res.data.success) {
        setAchievements(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load achievements:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Profile Header */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/30 space-y-6 relative overflow-hidden bg-gradient-to-r from-emerald-950/80 via-dark-card to-dark-bg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-eco-400 p-1 shadow-glow shrink-0">
            <div className="w-full h-full bg-dark-bg rounded-[22px] flex items-center justify-center font-black text-3xl text-eco-400">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-3xl font-extrabold text-white">{user?.name || "Saloni's Green Profile"}</h1>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Eco Warrior
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">{user?.email} • {user?.city || 'New Delhi'}</p>
            <p className="text-xs text-slate-400">Member since August 2026</p>
          </div>
        </div>

        {/* 4 Primary Profile Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/15">
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Green Score</span>
            <div className="text-2xl font-black text-amber-300">🏆 {user?.greenPoints || 824}</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Waste Diverted</span>
            <div className="text-2xl font-black text-emerald-400">♻️ {user?.totalWasteDivertedKg ? user.totalWasteDivertedKg.toFixed(1) : '48.5'} KG</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Value Generated</span>
            <div className="text-2xl font-black text-white">💰 ₹{user?.totalValueEarned ? user.totalValueEarned.toLocaleString() : '1,280'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Impact Score</span>
            <div className="text-2xl font-black text-teal-300">🌱 {user?.impactScore || 82}</div>
          </div>
        </div>
      </div>

      {/* Item Action Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div className="text-3xl font-extrabold text-white">{user?.itemsReusedCount || 12}</div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Items Reused / Upcycled</h4>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-950 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div className="text-3xl font-extrabold text-white">{user?.itemsDonatedCount || 17}</div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Items Donated to NGOs</h4>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Recycle className="w-6 h-6" />
          </div>
          <div className="text-3xl font-extrabold text-white">{user?.itemsRecycledCount || 24}</div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Items Certified Recycled</h4>
        </div>

      </div>

      {/* Unlocked Achievements & Badges */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" /> Achievement Badges & Milestones
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center text-xl font-bold">
                🏆
              </div>
              <div className="space-y-0.5">
                <h5 className="text-sm font-bold text-white">{item.achievement?.title}</h5>
                <p className="text-xs text-slate-400">{item.achievement?.description}</p>
                <span className="text-[10px] text-eco-400 font-bold">Unlocked on {new Date(item.unlockedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
