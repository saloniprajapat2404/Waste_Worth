import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Route, CheckCircle2, Clock, Truck, ShieldCheck, Recycle, HeartHandshake, Leaf, ArrowLeft } from 'lucide-react';
import API from '../services/api';

export default function WasteJourneyPage() {
  const [searchParams] = useSearchParams();
  const pickupId = searchParams.get('pickupId');

  const [pickup, setPickup] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pickupId) {
      fetchJourneyData(pickupId);
    } else {
      fetchLatestJourney();
    }
  }, [pickupId]);

  const fetchLatestJourney = async () => {
    try {
      const res = await API.get('/pickups');
      if (res.data.success && res.data.data.length > 0) {
        const latest = res.data.data[0];
        setPickup(latest);
        fetchHistory(latest.id);
      }
    } catch (err) {
      console.error('Failed to load pickups:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJourneyData = async (id) => {
    try {
      const res = await API.get(`/pickups/${id}`);
      if (res.data.success) {
        setPickup(res.data.data);
        fetchHistory(id);
      }
    } catch (err) {
      console.error('Failed to load pickup details:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (id) => {
    try {
      const res = await API.get(`/pickups/${id}/history`);
      if (res.data.success) {
        setHistory(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const stages = [
    { key: 'REQUESTED', label: 'Waste Submitted', desc: 'Item submitted and evaluated by Recommendation Engine' },
    { key: 'ASSIGNED', label: 'Collector Assigned', desc: 'Assigned to verified recovery partner center' },
    { key: 'ACCEPTED', label: 'Pickup Accepted', desc: 'Collector accepted pickup order and dispatched agent' },
    { key: 'PICKUP_SCHEDULED', label: 'Pickup Scheduled', desc: 'Doorstep pickup confirmed for preferred slot' },
    { key: 'COLLECTED', label: 'Waste Collected', desc: 'Agent collected item and recorded proof image' },
    { key: 'VERIFIED', label: 'Destination Verified', desc: 'Recycling plant verified material weight & quality' },
    { key: 'COMPLETED', label: 'Impact Recorded', desc: 'Item transformed: Green Points awarded & landfill saved' }
  ];

  const getStageStatus = (stageKey) => {
    if (!pickup) return 'pending';
    const statusOrder = ['REQUESTED', 'ASSIGNED', 'ACCEPTED', 'PICKUP_SCHEDULED', 'COLLECTED', 'VERIFIED', 'COMPLETED'];
    const currentIndex = statusOrder.indexOf(pickup.status);
    const stageIndex = statusOrder.indexOf(stageKey);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="space-y-4">
        <Link to="/pickups" className="inline-flex items-center gap-1 text-xs text-eco-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to My Pickups
        </Link>

        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20">
            Lifecycle Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Waste Journey Tracking
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Know exactly what happens to your item step-by-step from submission to certified recycling or donation.
          </p>
        </div>
      </div>

      {pickup && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-8">
          
          {/* Summary Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/15">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                {pickup.categoryName}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{pickup.itemTitle}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Partner: {pickup.collectorOrganizationName || 'GreenCycle Hub'}</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400 block">Current Lifecycle Stage</span>
              <span className="text-sm font-extrabold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-500/30 inline-block">
                {pickup.status}
              </span>
            </div>
          </div>

          {/* VISUAL STEP-BY-STEP TIMELINE */}
          <div className="relative pl-6 sm:pl-10 space-y-8 border-l-2 border-emerald-500/20">
            {stages.map((st, index) => {
              const state = getStageStatus(st.key);
              
              return (
                <div key={st.key} className="relative group">
                  
                  {/* Circle Indicator */}
                  <div className={`absolute -left-[31px] sm:-left-[47px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    state === 'completed' ? 'bg-eco-600 text-white shadow-glow' :
                    state === 'current' ? 'bg-amber-500 text-dark-bg ring-4 ring-amber-500/20 shadow-glow' :
                    'bg-dark-card border border-emerald-500/20 text-slate-500'
                  }`}>
                    {state === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>

                  <div className={`p-4 rounded-2xl border transition-all ${
                    state === 'current' ? 'bg-emerald-950/50 border-emerald-500/40 shadow-glow' :
                    state === 'completed' ? 'bg-dark-card/80 border-emerald-500/20' :
                    'bg-dark-bg/40 border-slate-800 opacity-60'
                  }`}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-white">{st.label}</h4>
                      <span className="text-[10px] text-emerald-400/80 font-medium">Stage {index + 1} of 7</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{st.desc}</p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Audit History Log */}
          {history.length > 0 && (
            <div className="pt-6 border-t border-emerald-500/15 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Timestamped Status Audit Trail:</h4>
              <div className="space-y-2 text-xs">
                {history.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl bg-dark-input/60 border border-emerald-500/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-300">[{h.status}]</span>{' '}
                      <span className="text-slate-300">{h.comments}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
