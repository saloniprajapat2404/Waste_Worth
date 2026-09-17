import React, { useState, useEffect } from 'react';
import { Trophy, Award, Medal, Crown, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import API from '../services/api';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await API.get('/leaderboard');
      if (res.data.success) {
        setLeaders(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3.5 py-1 rounded-full border border-amber-500/30">
          Monthly Green Leaders
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Community Eco Leaderboard 🏆
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Recognizing the top citizens diverting the highest quantity of waste and earning Green Points.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      {leaders.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          
          {/* Rank 2 (Silver) */}
          <div className="glass-card p-6 rounded-3xl border border-slate-400/30 text-center space-y-3 relative overflow-hidden transform sm:translate-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-300 text-dark-bg font-black text-xl flex items-center justify-center mx-auto shadow-glow">
              2
            </div>
            <h3 className="text-lg font-bold text-white">{leaders[1].name}</h3>
            <p className="text-xs text-slate-400">{leaders[1].city}</p>
            <div className="text-2xl font-black text-amber-300">{leaders[1].greenPoints} Pts</div>
            <span className="text-[11px] text-emerald-400 font-bold block">{leaders[1].wasteDivertedKg} KG Diverted</span>
          </div>

          {/* Rank 1 (Gold - Center) */}
          <div className="glass-card p-8 rounded-3xl border-2 border-amber-400/50 text-center space-y-4 relative overflow-hidden bg-gradient-to-b from-amber-950/40 via-dark-card to-dark-bg shadow-glow-lg transform sm:-translate-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-dark-bg font-black text-2xl flex items-center justify-center mx-auto shadow-glow">
              <Crown className="w-8 h-8 text-amber-950" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Monthly Champion</span>
              <h3 className="text-2xl font-black text-white mt-1">{leaders[0].name}</h3>
              <p className="text-xs text-slate-400">{leaders[0].city}</p>
            </div>
            <div className="text-3xl font-black text-amber-300">{leaders[0].greenPoints} Pts</div>
            <span className="text-xs text-emerald-400 font-bold block bg-emerald-950/60 py-1 rounded-full border border-emerald-500/30">
              ♻️ {leaders[0].wasteDivertedKg} KG Waste Diverted
            </span>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="glass-card p-6 rounded-3xl border border-amber-700/30 text-center space-y-3 relative overflow-hidden transform sm:translate-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-700 text-white font-black text-xl flex items-center justify-center mx-auto shadow-glow">
              3
            </div>
            <h3 className="text-lg font-bold text-white">{leaders[2].name}</h3>
            <p className="text-xs text-slate-400">{leaders[2].city}</p>
            <div className="text-2xl font-black text-amber-300">{leaders[2].greenPoints} Pts</div>
            <span className="text-[11px] text-emerald-400 font-bold block">{leaders[2].wasteDivertedKg} KG Diverted</span>
          </div>

        </div>
      )}

      {/* Leaderboard Table List */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/20 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> Top Eco Champions Table
        </h3>

        <div className="space-y-3">
          {leaders.map((entry) => (
            <div 
              key={entry.userId}
              className="p-4 rounded-2xl bg-dark-input/60 border border-emerald-500/15 flex items-center justify-between gap-4 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                  entry.rank === 1 ? 'bg-amber-400 text-dark-bg' :
                  entry.rank === 2 ? 'bg-slate-300 text-dark-bg' :
                  entry.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-emerald-950 text-emerald-400'
                }`}>
                  #{entry.rank}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {entry.name} {entry.rank <= 3 && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  </h4>
                  <span className="text-xs text-slate-400">{entry.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Diverted</span>
                  <span className="text-xs font-bold text-emerald-400">{entry.wasteDivertedKg} KG</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Green Points</span>
                  <span className="text-sm font-extrabold text-amber-300">{entry.greenPoints} Pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
