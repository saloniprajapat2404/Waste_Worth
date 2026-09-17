import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import API from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark read:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <Bell className="w-7 h-7 text-eco-400" /> Notifications Feed
        </h1>
        <p className="text-xs text-slate-400">Updates regarding your pickups, Green Points, and unlocked badges</p>
      </div>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/20 space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-12">No notifications found.</p>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${n.isRead ? 'bg-dark-card/60 border-emerald-950/40 text-slate-400' : 'bg-emerald-950/40 border-emerald-500/30 text-slate-200 shadow-sm'}`}
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">{n.title}</h4>
                <p className="text-xs leading-relaxed">{n.message}</p>
                <span className="text-[10px] text-emerald-400/60 block pt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>

              {!n.isRead && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="px-3 py-1 rounded-xl bg-eco-600 text-white font-bold text-xs shadow-glow hover:bg-eco-500 shrink-0"
                >
                  Mark Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
