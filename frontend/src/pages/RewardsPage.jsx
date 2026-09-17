import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Gift, Award, CheckCircle2, AlertCircle, Copy, Sparkles, ShoppingBag } from 'lucide-react';
import API from '../services/api';

export default function RewardsPage() {
  const { user, refreshProfile } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [myRedemptions, setMyRedemptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRewardsData();
  }, []);

  const fetchRewardsData = async () => {
    try {
      refreshProfile();
      const [rewardRes, walletRes] = await Promise.all([
        API.get('/rewards'),
        API.get('/rewards/my-redemptions')
      ]);

      if (rewardRes.data.success) setRewards(rewardRes.data.data);
      if (walletRes.data.success) setMyRedemptions(walletRes.data.data);
    } catch (err) {
      console.error('Failed to load rewards data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    setMessage('');
    setError('');
    setRedeemingId(rewardId);

    try {
      const res = await API.post(`/rewards/${rewardId}/redeem`);
      if (res.data.success) {
        setMessage(`Success! Redeemed reward. Code: ${res.data.data.redemptionCode}`);
        fetchRewardsData();
      } else {
        setError(res.data.message || 'Redemption failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Insufficient Green Points or error redeeming');
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-amber-950/40 via-dark-card to-dark-bg">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
            Eco Rewards Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Redeem Your Green Points
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Convert your earned Green Points into partner shopping vouchers, tree plantation drives, and eco certificates.
          </p>
        </div>

        {/* Balance Card */}
        <div className="glass-card p-6 rounded-2xl border border-amber-500/30 text-center shrink-0 space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Balance</span>
          <div className="text-3xl font-black text-amber-300 flex items-center justify-center gap-1">
            <Award className="w-7 h-7 text-amber-400" /> {user?.greenPoints || 824} Pts
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Gift className="w-6 h-6 text-eco-400" /> Available Rewards Catalog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((r) => {
            const canAfford = (user?.greenPoints || 0) >= r.pointsRequired;

            return (
              <div key={r.id} className="glass-card rounded-3xl border border-emerald-500/20 overflow-hidden flex flex-col justify-between group glass-card-hover">
                <div>
                  <img
                    src={r.imageUrl}
                    alt={r.title}
                    className="w-full h-40 object-cover border-b border-emerald-500/20 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded-md">
                      {r.rewardType}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">{r.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-emerald-500/10">
                    <span className="text-slate-400">Required:</span>
                    <span className="text-amber-300 text-sm">{r.pointsRequired} Points</span>
                  </div>

                  <button
                    onClick={() => handleRedeem(r.id)}
                    disabled={!canAfford || redeemingId === r.id}
                    className={`w-full py-3 rounded-xl font-bold text-xs shadow-glow transition-all ${
                      canAfford
                        ? 'bg-eco-600 hover:bg-eco-500 text-white'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {redeemingId === r.id ? 'Redeeming...' : canAfford ? 'Redeem Voucher' : 'Need More Points'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* My Redeemed Vouchers Wallet */}
      <div className="pt-8 border-t border-emerald-500/15 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-emerald-400" /> Your Redeemed Vouchers & Codes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myRedemptions.length === 0 ? (
            <p className="text-xs text-slate-400 col-span-full">No redeemed vouchers yet in your wallet.</p>
          ) : (
            myRedemptions.map((red) => (
              <div key={red.id} className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white">{red.reward?.title}</h4>
                  <span className="text-[10px] bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    {red.status}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-dark-bg border border-emerald-500/20 text-center font-mono font-bold text-emerald-300 text-sm flex items-center justify-between">
                  <span>{red.redemptionCode}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(red.redemptionCode)}
                    className="text-slate-400 hover:text-white text-xs"
                    title="Copy Code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 block text-right">
                  Redeemed on {new Date(red.redeemedAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
