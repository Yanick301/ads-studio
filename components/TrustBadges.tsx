import React from 'react';
import { Shield, Lock, Award, CheckCircle2, Users, TrendingUp } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { icon: <Shield size={20} className="text-cyan-400" />, text: '256-Bit SSL Encrypted' },
    { icon: <Lock size={20} className="text-green-500" />, text: 'GDPR Compliant' },
    { icon: <Award size={20} className="text-gold-500" />, text: 'ISO 27001 Certified' },
    { icon: <CheckCircle2 size={20} className="text-purple-500" />, text: 'Verified Platform' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8 border-t border-b border-white/10">
      {badges.map((badge, i) => (
        <div key={i} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
          <div className="group-hover:scale-110 transition-transform">
            {badge.icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider">{badge.text}</span>
        </div>
      ))}
    </div>
  );
};

export const SocialProof: React.FC = () => {
  const stats = [
    { icon: <Users size={24} className="text-cyan-400" />, value: '5,247+', label: 'Active Users' },
    { icon: <TrendingUp size={24} className="text-gold-500" />, value: '98.2%', label: 'Satisfaction' },
    { icon: <Award size={24} className="text-purple-500" />, value: '850+', label: 'Brands Trust Us' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center glass p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
          <div className="flex justify-center mb-4">
            {stat.icon}
          </div>
          <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
          <div className="text-xs text-neutral-500 uppercase tracking-widest">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

