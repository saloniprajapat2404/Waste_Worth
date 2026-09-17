import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Recycle, HeartHandshake, RefreshCw, Trash2, DollarSign, Award, Leaf, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function WasteRecommendationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const submission = location.state?.submission;

  if (!submission) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No submission evaluated yet</h2>
        <p className="text-sm text-slate-400">Please submit a waste item to view its recommendation.</p>
        <Link to="/submit" className="inline-block px-6 py-3 rounded-xl bg-eco-600 text-white font-bold text-sm shadow-glow">
          Evaluate Waste Item →
        </Link>
      </div>
    );
  }

  const action = submission.recommendedAction || 'RECYCLE';

  const actionBadge = {
    REUSE: { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: RefreshCw, title: 'REUSE & UPCYCLE' },
    DONATE: { color: 'bg-teal-500/20 text-teal-300 border-teal-500/40', icon: HeartHandshake, title: 'DONATE TO NGO' },
    RECYCLE: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: Recycle, title: 'CERTIFIED RECYCLING' },
    DISPOSE: { color: 'bg-slate-700/40 text-slate-300 border-slate-600', icon: Trash2, title: 'RESPONSIBLE DISPOSAL' }
  }[action] || { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: Recycle, title: 'RECYCLE' };

  const ActionIcon = actionBadge.icon;

  const handleBookPickup = () => {
    navigate('/pickups', { state: { wasteSubmissionId: submission.id, itemTitle: submission.itemTitle } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20">
          Smart Recommendation Engine Result
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Best Options For Your <span className="text-gradient">{submission.itemTitle}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Evaluated based on condition ({submission.conditionState}), category, distance, and environmental impact factor.
        </p>
      </div>

      {/* Main Recommendation Card */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-emerald-500/30 space-y-8 relative overflow-hidden bg-gradient-to-b from-dark-card to-dark-bg">
        
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/15">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Recommended Action</span>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-extrabold shadow-glow ${actionBadge.color}`}>
              <ActionIcon className="w-5 h-5" /> {actionBadge.title}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 block">Confidence Score</span>
            <span className="text-lg font-bold text-emerald-400">{submission.recommendationConfidence || 96}% Match</span>
          </div>
        </div>

        {/* 4 Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Estimated Value */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Estimated Value Range
            </span>
            <div className="text-2xl font-black text-white">
              ₹{submission.estimatedValueMin} – ₹{submission.estimatedValueMax}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              *Estimated category value (not guaranteed market price)
            </p>
          </div>

          {/* Green Points Reward */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/20 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-400" /> Green Points Reward
            </span>
            <div className="text-2xl font-black text-amber-300">
              +{submission.greenPointsReward || 60} Pts
            </div>
            <p className="text-[11px] text-slate-400">Awarded upon verified collection</p>
          </div>

          {/* Environmental Impact */}
          <div className="p-5 rounded-2xl bg-teal-950/40 border border-teal-500/20 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Leaf className="w-4 h-4 text-teal-400" /> Impact Score
            </span>
            <div className="text-2xl font-black text-teal-300">
              +{submission.estimatedImpactScore || 78} Score
            </div>
            <p className="text-[11px] text-slate-400">High positive landfill diversion</p>
          </div>

        </div>

        {/* Nearby Recycler / NGO Match */}
        <div className="p-5 rounded-2xl bg-dark-input/80 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Recommended Nearby Partner</span>
              <h4 className="text-base font-bold text-white">{submission.nearbyCollectorName || 'GreenCycle Hub'}</h4>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 inline-block">
              {submission.nearbyCollectorDistanceKm || 2.4} km away
            </span>
          </div>
        </div>

        {/* Rationale Explanation */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recommended Because:</h4>
          <p className="text-sm text-slate-300 leading-relaxed p-4 rounded-2xl bg-dark-bg/60 border border-emerald-500/10">
            "{submission.rationale || 'This item contains valuable materials and should not be disposed of with regular household waste. Recycling or donating it prevents toxic landfill accumulation.'}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-emerald-500/15">
          <button
            onClick={handleBookPickup}
            className="w-full py-4 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-extrabold text-base shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
          >
            Request Doorstep Pickup Now <ArrowRight className="w-5 h-5" />
          </button>
          
          <Link
            to="/centers"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card hover:bg-emerald-950/60 text-slate-200 font-bold text-sm border border-emerald-500/20 text-center flex items-center justify-center whitespace-nowrap"
          >
            Find Nearby Drop-Off Centers
          </Link>
        </div>

      </div>

    </div>
  );
}
