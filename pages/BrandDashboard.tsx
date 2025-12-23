import React, { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, TrendingUp, Download, Eye, Layers, BarChart3, Target, Zap, ArrowUpRight, Sparkles, Activity } from 'lucide-react';
import { CampaignStatus } from '../types';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlowEffect } from '../components/GlowEffect';

export const BrandDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    api.getBrandStats()
      .then(data => {
        if (isMounted.current) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Failed to load brand stats:", err);
        if (isMounted.current) {
          setLoading(false);
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-midnight-950">
        <div className="text-center">
          <Loader2 className="animate-spin text-gold-500 w-16 h-16 mx-auto mb-4" />
          <p className="text-neutral-400 text-sm uppercase tracking-widest">Loading Dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!stats) return <div className="text-center text-white mt-10">Unable to load dashboard data.</div>;

  const metrics = [
    {
      icon: <Layers size={32} className="text-cyan-400" />,
      label: 'Active Campaigns',
      value: stats.activeCampaigns,
      color: 'cyan',
      trend: '+12%',
      bgGradient: 'from-cyan-500/10 to-cyan-900/5'
    },
    {
      icon: <Eye size={32} className="text-purple-500" />,
      label: 'Total Impressions',
      value: stats.totalViews,
      color: 'purple',
      trend: '+34%',
      bgGradient: 'from-purple-500/10 to-purple-900/5'
    },
    {
      icon: <TrendingUp size={32} className="text-gold-500" />,
      label: 'Total Investment',
      value: stats.totalSpend,
      color: 'gold',
      trend: '+8%',
      bgGradient: 'from-gold-500/10 to-gold-900/5',
      suffix: ' XOF'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-[1400px] mx-auto relative">
      
      {/* Animated Background */}
      <AnimatedBackground type="particles" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 bg-midnight-950/80 z-10"></div>
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-20 mix-blend-color-dodge"
        >
          <source src="https://player.vimeo.com/external/517090025.sd.mp4?s=1d577a76059952002779f678201a43a0d33e9b88&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8 backdrop-blur-sm animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <Sparkles className="text-cyan-400" size={20} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-cyan-400">{user?.name}</span>
              </h1>
            </div>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-mono">Brand Command Center</p>
          </div>
          <GlowEffect color="gold" intensity="medium">
            <button className="mt-6 md:mt-0 px-6 py-3 border border-gold-500/30 hover:border-gold-500/50 bg-gold-500/10 hover:bg-gold-500/20 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all backdrop-blur-md rounded-lg">
              <Download size={14}/> Export Reports
            </button>
          </GlowEffect>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-panel border border-white/10 p-8 relative overflow-hidden group hover:border-${metric.color}-500/50 transition-all duration-500 rounded-2xl shadow-xl hover:scale-[1.02] hover:shadow-2xl`}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            >
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Large Icon Background */}
              <div className={`absolute top-0 right-0 p-6 opacity-5 text-${metric.color}-500 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500`}>
                {React.cloneElement(metric.icon, { size: 80 })}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 glass rounded-xl border border-${metric.color}-500/20 group-hover:border-${metric.color}-500/50 transition-colors`}>
                    {metric.icon}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                    <ArrowUpRight size={14} />
                    <span>{metric.trend}</span>
                  </div>
                </div>
                
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">
                  {metric.label}
                </p>
                
                <p className={`text-5xl md:text-6xl font-black text-${metric.color}-400 mb-2 tracking-tighter`}>
                  {metric.suffix ? (
                    <>
                      <AnimatedCounter value={metric.value} duration={2000} />
                      <span className="text-sm text-neutral-500 ml-2">{metric.suffix}</span>
                    </>
                  ) : (
                    <AnimatedCounter value={metric.value} duration={2000} />
                  )}
                </p>
              </div>

              {/* Hover Glow Effect */}
              {hoveredCard === i && (
                <div className={`absolute inset-0 bg-${metric.color}-500/5 rounded-2xl animate-pulse`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Campaign Velocity Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-gold-500 to-cyan-500"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Activity className="text-cyan-400" size={28} />
              Campaign Velocity
            </h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {stats.campaigns.map((camp: any, i: number) => (
            <div 
              key={camp.id} 
              className="glass-panel border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-all group rounded-xl shadow-lg hover:border-cyan-500/30 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                <div className={`relative w-4 h-4 rounded-full ${camp.status === 'LAUNCHED' ? 'bg-green-500' : 'bg-neutral-500'}`}>
                  {camp.status === 'LAUNCHED' && (
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  )}
                  <div className={`absolute inset-0 rounded-full ${camp.status === 'LAUNCHED' ? 'bg-green-500' : 'bg-neutral-500'} shadow-[0_0_10px_${camp.status === 'LAUNCHED' ? '#22c55e' : '#6b7280'}]`}></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-500 transition-colors">
                    {camp.description.substring(0, 40)}...
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-mono">
                      {camp.platform}
                    </p>
                    <span className="text-neutral-700">•</span>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider font-mono">
                      {camp.packageType}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center md:text-right">
                  <p className="text-[10px] text-neutral-500 uppercase mb-1">Status</p>
                  <p className={`text-sm font-bold ${
                    camp.status === 'LAUNCHED' ? 'text-green-400' : 
                    camp.status === 'PAID' ? 'text-cyan-400' : 
                    'text-neutral-400'
                  }`}>
                    {camp.status}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] text-neutral-500 uppercase mb-1">Impact</p>
                  <p className="text-sm font-bold text-white flex items-center gap-1">
                    <Target size={12} className="text-purple-400" />
                    {camp.influencersReached} Agents
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] text-neutral-500 uppercase mb-1">Date</p>
                  <p className="text-sm font-bold text-white">
                    {new Date(camp.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <GlowEffect color="cyan" intensity="low">
                  <button className="p-3 hover:bg-white/10 rounded-lg transition-colors text-neutral-400 hover:text-cyan-400 border border-transparent hover:border-cyan-500/30">
                    <Download size={16}/>
                  </button>
                </GlowEffect>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Bar */}
        <div className="mt-16 glass-panel border border-white/10 p-6 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-cyan-400 mb-1">
                <AnimatedCounter value={stats.activeCampaigns} duration={1500} />
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Active Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400 mb-1">
                <AnimatedCounter value={Math.floor(stats.totalViews / 1000)} duration={1500} suffix="K" />
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gold-500 mb-1">
                <AnimatedCounter value={Math.floor(stats.totalSpend / 1000)} duration={1500} suffix="K" />
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Invested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400 mb-1">
                98<span className="text-lg">%</span>
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-widest">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
