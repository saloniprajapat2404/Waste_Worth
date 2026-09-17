import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, Clock, MapPin, AlertCircle, Upload, ShieldCheck, Star } from 'lucide-react';
import API from '../services/api';

export default function CollectorDashboardPage() {
  const [pickups, setPickups] = useState([]);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const [status, setStatus] = useState('COLLECTED');
  const [actualQuantityKg, setActualQuantityKg] = useState(5.0);
  const [verifiedValue, setVerifiedValue] = useState(100.0);
  const [comments, setComments] = useState('');
  const [proofImageUrl, setProofImageUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollectorPickups();
  }, []);

  const fetchCollectorPickups = async () => {
    try {
      const res = await API.get('/pickups/collector');
      if (res.data.success) {
        setPickups(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load collector pickups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedPickup) return;

    setMessage('');
    setError('');

    try {
      const payload = {
        status,
        actualQuantityKg: parseFloat(actualQuantityKg),
        verifiedValue: parseFloat(verifiedValue),
        comments: comments || `Status updated to ${status}`,
        proofImageUrl: proofImageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=60'
      };

      const res = await API.put(`/pickups/${selectedPickup.id}/status`, payload);
      if (res.data.success) {
        setMessage(`Pickup #${selectedPickup.id} updated to ${status} successfully!`);
        setSelectedPickup(null);
        fetchCollectorPickups();
      } else {
        setError(res.data.message || 'Update failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating pickup status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-teal-950/60 via-dark-card to-dark-bg">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-teal-300 uppercase tracking-widest bg-teal-950/80 px-3.5 py-1 rounded-full border border-teal-500/30 inline-block">
            Verified Partner Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Collector & Recycler Dashboard 🚚
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Accept pickup requests, schedule agent visits, verify actual collected weight, and update customer status.
          </p>
        </div>

        <div className="flex items-center gap-4 text-center shrink-0">
          <div className="p-4 rounded-2xl bg-dark-bg border border-teal-500/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Partner Rating</span>
            <div className="text-xl font-black text-amber-300 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> 4.9 / 5.0
            </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Pickups List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-teal-400" /> Assigned Pickup Requests
          </h3>

          <div className="space-y-4">
            {pickups.length === 0 ? (
              <div className="glass-card p-10 rounded-3xl text-center text-xs text-slate-400">
                No active pickups assigned to your center.
              </div>
            ) : (
              pickups.map((p) => (
                <div key={p.id} className="glass-card p-6 rounded-3xl border border-teal-500/20 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-teal-300 uppercase bg-teal-950 px-2 py-0.5 rounded-md border border-teal-500/30">
                        {p.categoryName}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">{p.itemTitle}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Citizen: {p.userName} ({p.userPhone})</p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {p.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-dark-input/60 p-3 rounded-xl space-y-1">
                    <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-teal-400" /> Address: {p.pickupAddress}, {p.city}</p>
                    <p><Clock className="w-3.5 h-3.5 text-slate-400 inline" /> Preferred Slot: {p.preferredDate} ({p.preferredTimeSlot})</p>
                    {p.notes && <p className="italic text-slate-400">Notes: "{p.notes}"</p>}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setSelectedPickup(p)}
                      className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-glow transition-all"
                    >
                      Update Status & Verify Weight →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Update Status Modal / Form */}
        <div>
          {selectedPickup ? (
            <form onSubmit={handleUpdateStatus} className="glass-card p-6 rounded-3xl border border-teal-500/30 space-y-4 sticky top-24">
              <h3 className="text-lg font-bold text-white">Update Pickup #{selectedPickup.id}</h3>
              <p className="text-xs text-slate-400">Item: {selectedPickup.itemTitle}</p>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Target Lifecycle Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-sm rounded-xl px-3 py-2.5 outline-none"
                >
                  <option value="ACCEPTED">ACCEPTED (Collector Confirmed)</option>
                  <option value="PICKUP_SCHEDULED">PICKUP_SCHEDULED (Agent Dispatched)</option>
                  <option value="COLLECTED">COLLECTED (Weight Recorded)</option>
                  <option value="VERIFIED">VERIFIED (Plant Inspection Completed)</option>
                  <option value="COMPLETED">COMPLETED (Award Green Points)</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Actual Collected Weight (KG)</label>
                <input
                  type="number"
                  step="0.5"
                  value={actualQuantityKg}
                  onChange={(e) => setActualQuantityKg(e.target.value)}
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-sm rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Verified Payout / Value (₹)</label>
                <input
                  type="number"
                  value={verifiedValue}
                  onChange={(e) => setVerifiedValue(e.target.value)}
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-sm rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Collection Proof Image URL</label>
                <input
                  type="text"
                  value={proofImageUrl}
                  onChange={(e) => setProofImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-300">Status Comment</label>
                <textarea
                  rows="2"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="e.g. Material verified clean at recycling hub..."
                  className="w-full bg-dark-input border border-teal-500/20 text-white text-xs rounded-xl p-3 outline-none resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPickup(null)}
                  className="w-full py-2.5 rounded-xl glass-card text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-glow"
                >
                  Save Status
                </button>
              </div>
            </form>
          ) : (
            <div className="glass-card p-8 rounded-3xl border border-teal-500/20 text-center space-y-2 text-xs text-slate-400">
              <Truck className="w-8 h-8 text-teal-400 mx-auto" />
              <p>Select a pickup from the left list to update lifecycle status and input collection weight.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
