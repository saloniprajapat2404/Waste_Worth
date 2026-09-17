import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeroVideoBackground from '../components/HeroVideoBackground';
import { Search, Camera, ArrowRight, Recycle, DollarSign, Award, Leaf, HeartHandshake, MapPin, CheckCircle2, ChevronDown, Sparkles, Shield, Cpu, BookOpen, Shirt, Truck } from 'lucide-react';
import API from '../services/api';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    wasteDivertedKg: 42.5,
    valueGenerated: 1280,
    greenPoints: 540,
    impactScore: 82
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/admin/dashboard');
      if (res.data.success && res.data.data) {
        setStats({
          wasteDivertedKg: res.data.data.totalWasteDivertedKg || 42.5,
          valueGenerated: res.data.data.totalValueGenerated || 1280,
          greenPoints: res.data.data.totalGreenPoints || 540,
          impactScore: 82
        });
      }
    } catch (err) {
      console.log('Using default landing stats:', err);
    }
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/submit?query=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/submit');
    }
  };

  const scrollToWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-dark-bg min-h-screen">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroVideoBackground />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-xs sm:text-sm font-semibold text-emerald-300 shadow-glow animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Smart Waste-to-Value Platform
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
            Your Waste Has <br />
            <span className="text-gradient">More Value</span> Than You Think.
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Discover what your unwanted items are worth, find their best next destination, and see the positive impact you create.
          </p>

          {/* Value Prop Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Identify</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Value</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Recommend</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Recycle</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Track</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Reward</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link 
              to="/submit" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Find My Waste's Worth <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button 
              onClick={scrollToWorks} 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card hover:bg-emerald-950/60 text-slate-200 font-medium text-base border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2"
            >
              How Waste2Worth Works <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* FLOATING GLASSMORPHISM INTERACTIVE SEARCH CARD */}
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="glass-card p-4 sm:p-5 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-300">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Search className="w-4 h-4" /> What do you have?
                </span>
                <span className="text-slate-400 hidden sm:inline">Upload photo or search item name</span>
              </div>

              <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. old phone, books, clothes, newspaper..."
                    className="w-full bg-dark-input/80 border border-emerald-500/20 focus:border-emerald-400 text-white placeholder-slate-400 text-sm sm:text-base rounded-2xl px-4 py-3.5 pl-11 outline-none transition-all"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    type="button" 
                    onClick={() => navigate('/submit')} 
                    className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition-all"
                    title="Upload Photo"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-sm whitespace-nowrap shadow-glow transition-all"
                  >
                    Evaluate Worth
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* HERO TRUST / IMPACT STRIP */}
          <div className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 glass-card p-4 sm:p-6 rounded-2xl border border-emerald-500/20 max-w-4xl mx-auto">
              <div className="text-center space-y-1">
                <div className="text-xl sm:text-3xl font-extrabold text-emerald-400 flex items-center justify-center gap-1">
                  <Recycle className="w-5 h-5 text-eco-400" /> {stats.wasteDivertedKg} KG
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Waste Diverted</div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-xl sm:text-3xl font-extrabold text-emerald-300 flex items-center justify-center gap-1">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> ₹{stats.valueGenerated.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Value Generated</div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-xl sm:text-3xl font-extrabold text-amber-300 flex items-center justify-center gap-1">
                  <Award className="w-5 h-5 text-amber-400" /> {stats.greenPoints}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Green Points Earned</div>
              </div>

              <div className="text-center space-y-1">
                <div className="text-xl sm:text-3xl font-extrabold text-teal-300 flex items-center justify-center gap-1">
                  <Leaf className="w-5 h-5 text-teal-400" /> {stats.impactScore}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Impact Score</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: HOW WASTE2WORTH WORKS */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-eco-400 uppercase tracking-widest bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
            Systematic Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">How Waste2Worth Works</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Six simple steps to turn your unwanted items into ecological value, community impact, and rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              01
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Identify Your Waste</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload a photo or enter item details. Our modular classification engine auto-detects the category and condition.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              02
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discover Estimated Worth</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get instant category market price ranges (e.g. ₹350–₹500 for old phones, ₹10-15/kg paper) and reward point bounds.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              03
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Get Smart Recommendation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our 4-tier USP engine ranks the best eco-action: <strong className="text-emerald-300">Reuse → Donate → Recycle → Dispose</strong>.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              04
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pickup or Drop-off</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Request doorstep pickup or drop off at verified nearby recyclers, NGOs, and scrap collection hubs.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              05
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Track Waste Journey</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Watch your item transform step-by-step from pickup to verified destination and recorded impact.
            </p>
          </div>

          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-emerald-500/20 relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-black text-xl mb-6 shadow-glow">
              06
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Earn Green Points</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Earn Green Points, unlock badges, and redeem eco-friendly coupons, plant trees, or get certificates.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: ONE ITEM. MULTIPLE POSSIBILITIES. */}
      <section className="py-20 bg-dark-card/40 border-y border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
              Core Unique Value
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">One Item. Multiple Possibilities.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              The same item can create different impact depending on its condition and category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Clothes */}
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Old Clothes & Textiles</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 flex justify-between items-center">
                  <span><strong>Good Condition:</strong> Donate to NGO</span>
                  <span className="font-bold">+30 Pts</span>
                </div>
                <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/20 text-teal-300 flex justify-between items-center">
                  <span><strong>Wearable:</strong> Upcycle / Resell</span>
                  <span className="font-bold">+40 Pts</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 flex justify-between items-center">
                  <span><strong>Torn/Worn:</strong> Fiber Recycle</span>
                  <span className="font-bold">+20 Pts</span>
                </div>
              </div>
            </div>

            {/* Laptop */}
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Old Laptop & E-Waste</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 flex justify-between items-center">
                  <span><strong>Working:</strong> Donate for Education</span>
                  <span className="font-bold">+60 Pts</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/20 text-amber-300 flex justify-between items-center">
                  <span><strong>Damaged:</strong> Certified E-Recycler</span>
                  <span className="font-bold">₹350-500</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 flex justify-between items-center">
                  <span><strong>Parts:</strong> Component Extraction</span>
                  <span className="font-bold">+50 Pts</span>
                </div>
              </div>
            </div>

            {/* Books */}
            <div className="glass-card p-6 rounded-3xl border border-emerald-500/20 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Books & Newspapers</h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 flex justify-between items-center">
                  <span><strong>Textbooks:</strong> Community Library</span>
                  <span className="font-bold">+35 Pts</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-300 flex justify-between items-center">
                  <span><strong>Novels:</strong> Book Exchange</span>
                  <span className="font-bold">+40 Pts</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 flex justify-between items-center">
                  <span><strong>Newspapers:</strong> Paper Pulp Recycle</span>
                  <span className="font-bold">₹12/kg</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-24 max-w-5xl mx-auto px-4 text-center">
        <div className="glass-card p-10 sm:p-14 rounded-3xl border border-emerald-500/30 relative overflow-hidden bg-gradient-to-tr from-emerald-950/80 via-dark-card to-dark-bg">
          <div className="space-y-6 max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Don't Just Throw It Away. <br />
              <span className="text-gradient">Discover Its Worth.</span>
            </h2>
            <p className="text-slate-300 text-base">
              Join thousands of citizens who turn old items into monetary value, community donations, and verified eco-impact.
            </p>
            <Link 
              to="/submit" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-eco-600 hover:bg-eco-500 text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-1"
            >
              Start With My Waste →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
