import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, DollarSign, Award, Leaf, Truck, ArrowRight, Clock, ShieldCheck, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import API from '../services/api';

export default function UserDashboard() {
  const { user, refreshProfile } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      refreshProfile();
      const [subRes, pickRes, badgeRes] = await Promise.all([
        API.get('/waste'),
        API.get('/pickups'),
        API.get('/rewards/achievements')
      ]);

      if (subRes.data.success) setSubmissions(subRes.data.data);
      if (pickRes.data.success) setPickups(pickRes.data.data);
      if (badgeRes.data.success) setBadges(badgeRes.data.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const activePickups = pickups.filter(p => p.status !== 'COMPLETED' && p.status !== 'CANCELLED');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Welcome Banner */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-r from-emerald-950/80 via-dark-card to-dark-bg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" /> Eco Warrior Profile
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Welcome back, <span className="text-gradient">{user?.name || 'Citizen'}</span> 🌱
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Here is a real-time summary of your waste diverted from landfills, money earned, and Green Points contribution.
          </p>
        </div>

        <Link
          to="/submit"
          className="px-6 py-3.5 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all flex items-center gap-2 shrink-0"
        >
          + Evaluate New Waste Item
        </Link>
      </div>

      {/* Main Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1 */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waste Diverted</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            ♻️ {user?.totalWasteDivertedKg ? user.totalWasteDivertedKg.toFixed(1) : '42.5'} <span className="text-sm font-semibold text-emerald-400">KG</span>
          </div>
          <p className="text-xs text-slate-400">Diverted from city landfills</p>
        </div>

        {/* Stat 2 */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Earned / Est. Value</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            💰 ₹{user?.totalValueEarned ? user.totalValueEarned.toLocaleString() : '1,280'}
          </div>
          <p className="text-xs text-slate-400">Generated from recyclable items</p>
        </div>

        {/* Stat 3 */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Green Points</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-950 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-300">
            🏆 {user?.greenPoints || 824}
          </div>
          <p className="text-xs text-slate-400">Redeemable for eco rewards</p>
        </div>

        {/* Stat 4 */}
        <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Score</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-950 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-300">
            🌱 {user?.impactScore || 82}
          </div>
          <p className="text-xs text-slate-400">Positive environmental impact</p>
        </div>

      </div>

      {/* Grid: Upcoming Pickups & Unlocked Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Pickups Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-400" /> Upcoming Pickups & Status
            </h3>
            <Link to="/pickups" className="text-xs font-semibold text-eco-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {activePickups.length === 0 ? (
              <div className="glass-card p-8 rounded-3xl text-center space-y-3">
                <Clock className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-slate-300 font-medium text-sm">No active pickups pending right now.</p>
                <Link to="/submit" className="inline-block text-xs font-bold text-eco-400 hover:underline">
                  Submit waste item to schedule pickup →
                </Link>
              </div>
            ) : (
              activePickups.map((p) => (
                <div key={p.id} className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        {p.categoryName}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{p.itemTitle}</h4>
                      <p className="text-xs text-slate-400">Pickup Date: {p.preferredDate} ({p.preferredTimeSlot})</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {p.status}
                    </span>
                  </div>

                  {/* Status Steps Teaser */}
                  <div className="pt-2 border-t border-emerald-500/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Scheduled
                    </span>
                    <span>→</span>
                    <span className={p.status === 'ACCEPTED' || p.status === 'PICKUP_SCHEDULED' ? 'text-emerald-400 font-semibold' : ''}>
                      Assigned to {p.collectorOrganizationName || 'GreenCycle'}
                    </span>
                    <span>→</span>
                    <Link to={`/journey?pickupId=${p.id}`} className="text-eco-400 font-bold hover:underline">
                      Track Journey Live →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Recent Waste Submissions */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Recent Waste Submissions</h3>
              <Link to="/submit" className="text-xs font-semibold text-eco-400 hover:underline">
                + New Submission
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {submissions.slice(0, 4).map((sub) => (
                <div key={sub.id} className="glass-card p-4 rounded-2xl border border-emerald-500/15 flex items-center gap-4">
                  <img
                    src={sub.imageUrl}
                    alt={sub.itemTitle}
                    className="w-16 h-16 rounded-xl object-cover border border-emerald-500/20"
                  />
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-white line-clamp-1">{sub.itemTitle}</h5>
                    <p className="text-xs text-emerald-400 font-medium">
                      Est. ₹{sub.estimatedValueMin}-{sub.estimatedValueMax}
                    </p>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/20 inline-block">
                      Action: {sub.recommendedAction || 'RECYCLE'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Badges & Rewards Summary */}
        <div className="space-y-6">
          
          {/* Achievement Badges */}
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Unlocked Badges
              </h3>
              <span className="text-xs font-bold text-amber-300">{badges.length} Unlocked</span>
            </div>

            <div className="space-y-3">
              {badges.length === 0 ? (
                <p className="text-xs text-slate-400">Complete waste pickups to unlock badges!</p>
              ) : (
                badges.map((b) => (
                  <div key={b.id} className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg">
                      {b.achievement?.icon === 'Trophy' ? '🏆' : b.achievement?.icon === 'Recycle' ? '♻️' : '🌱'}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{b.achievement?.title}</h5>
                      <p className="text-[11px] text-slate-400">{b.achievement?.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Green Rewards CTA */}
          <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/60 to-dark-card space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-eco-600 text-white flex items-center justify-center shadow-glow">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Green Rewards Available</h4>
                <p className="text-xs text-emerald-400 font-semibold">{user?.greenPoints || 824} Points Balance</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Redeem points for ₹50 Partner Coupons, Plant-a-Tree drives, or Eco Certificates!
            </p>

            <Link
              to="/rewards"
              className="w-full py-2.5 rounded-xl bg-eco-600 hover:bg-eco-500 text-white text-xs font-bold text-center block shadow-glow transition-all"
            >
              Browse Rewards Catalog →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
