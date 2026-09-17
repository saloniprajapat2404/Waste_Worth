import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, ShieldCheck, Recycle, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/20 bg-dark-bg/95 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-eco-400 flex items-center justify-center shadow-glow">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Waste<span className="text-gradient">2Worth</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Turning everyday household waste into valuable resources through smart identification, recommended action, verified recycling, and green rewards.
            </p>
            <div className="flex items-center gap-2 text-xs text-eco-400">
              <ShieldCheck className="w-4 h-4" /> 100% Certified Eco-Impact Platform
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Platform Features</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/submit" className="hover:text-eco-400 transition-colors">Find Waste Worth</Link></li>
              <li><Link to="/submit" className="hover:text-eco-400 transition-colors">Smart Recommendation Engine</Link></li>
              <li><Link to="/pickups" className="hover:text-eco-400 transition-colors">Doorstep Waste Pickup</Link></li>
              <li><Link to="/journey" className="hover:text-eco-400 transition-colors">Waste Journey Tracker</Link></li>
              <li><Link to="/centers" className="hover:text-eco-400 transition-colors">Nearby Recyclers & NGOs</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Rewards & Community</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/rewards" className="hover:text-eco-400 transition-colors">Green Points Catalog</Link></li>
              <li><Link to="/leaderboard" className="hover:text-eco-400 transition-colors">Monthly Green Champions</Link></li>
              <li><Link to="/profile" className="hover:text-eco-400 transition-colors">Personal Green Profile</Link></li>
              <li><Link to="/register" className="hover:text-eco-400 transition-colors">Join as Collector/NGO</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Core USP Promise</h4>
            <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 text-xs text-slate-300 space-y-2">
              <p className="font-bold text-emerald-400">4 Key Waste Questions Solved:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-400">
                <li>What is this waste item?</li>
                <li>What is it worth?</li>
                <li>What is the best action for it?</li>
                <li>What positive impact was created?</li>
              </ol>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Waste2Worth — Smart Waste-to-Resource Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for a Greener Future</span>
            <Heart className="w-3.5 h-3.5 text-eco-400 fill-eco-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
