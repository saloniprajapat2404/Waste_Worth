import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Truck, Calendar, Clock, MapPin, CheckCircle2, AlertCircle, ArrowRight, Route } from 'lucide-react';
import API from '../services/api';

export default function PickupPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [wasteSubmissionId, setWasteSubmissionId] = useState(location.state?.wasteSubmissionId || '');
  const [submissions, setSubmissions] = useState([]);
  const [pickups, setPickups] = useState([]);

  const [pickupAddress, setPickupAddress] = useState('Flat 402, Green Park');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState('110016');
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning Slot (10 AM - 1 PM)');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subRes, pickRes] = await Promise.all([
        API.get('/waste'),
        API.get('/pickups')
      ]);

      if (subRes.data.success) {
        setSubmissions(subRes.data.data);
        if (!wasteSubmissionId && subRes.data.data.length > 0) {
          setWasteSubmissionId(subRes.data.data[0].id);
        }
      }
      if (pickRes.data.success) {
        setPickups(pickRes.data.data);
      }
    } catch (err) {
      console.error('Failed to load pickups data:', err);
    }
  };

  const handleSchedulePickup = async (e) => {
    e.preventDefault();
    if (!wasteSubmissionId) {
      setError('Please select a waste submission to pick up');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const payload = {
        wasteSubmissionId: parseInt(wasteSubmissionId),
        pickupAddress,
        city,
        pincode,
        preferredDate,
        preferredTimeSlot,
        notes
      };

      const res = await API.post('/pickups', payload);
      if (res.data.success) {
        setSuccessMsg('Doorstep pickup scheduled successfully!');
        loadData();
      } else {
        setError(res.data.message || 'Failed to schedule pickup');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error scheduling pickup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/20">
          Doorstep Waste Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Schedule & Manage Pickups
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Verified collectors and NGO partners collect your evaluated waste directly from your home address.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Form: Schedule Pickup */}
        <div className="lg:col-span-1 glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-400" /> Schedule New Pickup
          </h3>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSchedulePickup} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Select Waste Submission</label>
              <select
                value={wasteSubmissionId}
                onChange={(e) => setWasteSubmissionId(e.target.value)}
                className="w-full bg-dark-input border border-emerald-500/20 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none"
              >
                {submissions.length === 0 ? (
                  <option value="">No submissions found (Submit item first)</option>
                ) : (
                  submissions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.itemTitle} (Est. ₹{s.estimatedValueMin}-{s.estimatedValueMax})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Pickup Address</label>
              <input
                type="text"
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                className="w-full bg-dark-input border border-emerald-500/20 text-white text-sm rounded-xl px-3.5 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-dark-input border border-emerald-500/20 text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-dark-input border border-emerald-500/20 text-white text-xs rounded-xl px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Preferred Date</label>
              <select
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-dark-input border border-emerald-500/20 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="In 2 Days">In 2 Days</option>
                <option value="Weekend Slot">Weekend Slot</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Preferred Time Slot</label>
              <select
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                className="w-full bg-dark-input border border-emerald-500/20 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
              >
                <option value="Morning Slot (09 AM - 12 PM)">Morning Slot (09 AM - 12 PM)</option>
                <option value="Afternoon Slot (12 PM - 04 PM)">Afternoon Slot (12 PM - 04 PM)</option>
                <option value="Evening Slot (04 PM - 07 PM)">Evening Slot (04 PM - 07 PM)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Notes for Collector Agent</label>
              <textarea
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gate number, call before coming..."
                className="w-full bg-dark-input border border-emerald-500/20 text-white text-xs rounded-xl p-3 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Scheduling...' : <>Confirm Pickup Schedule <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        {/* Right Section: My Pickups List & Journey Teaser */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Your Scheduled Pickups</h3>
            <span className="text-xs text-slate-400 font-medium">{pickups.length} Pickups Total</span>
          </div>

          <div className="space-y-4">
            {pickups.length === 0 ? (
              <div className="glass-card p-12 rounded-3xl text-center space-y-3">
                <Truck className="w-12 h-12 text-slate-500 mx-auto" />
                <h4 className="text-lg font-bold text-white">No pickups scheduled yet</h4>
                <p className="text-xs text-slate-400">Fill out the schedule form to request doorstep collection.</p>
              </div>
            ) : (
              pickups.map((p) => (
                <div key={p.id} className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-500/10">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md">
                        {p.categoryName}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">{p.itemTitle}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {p.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block font-medium">Pickup Address:</span>
                      <span className="text-white">{p.pickupAddress}, {p.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Collector Partner:</span>
                      <span className="text-emerald-300 font-semibold">{p.collectorOrganizationName || 'GreenCycle Waste Hub'}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Scheduled: {p.preferredDate} ({p.preferredTimeSlot})</span>
                    <Link
                      to={`/journey?pickupId=${p.id}`}
                      className="px-4 py-2 rounded-xl bg-eco-600/20 text-eco-300 border border-eco-500/30 hover:bg-eco-600/30 font-bold transition-all flex items-center gap-1.5"
                    >
                      <Route className="w-4 h-4" /> View Full Journey →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
