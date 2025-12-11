
import React, { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, TrendingUp, Download, Eye, Layers } from 'lucide-react';
import { CampaignStatus } from '../types';

export const BrandDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-gold-500" /></div>;
  if (!stats) return <div className="text-center text-white mt-10">Unable to load dashboard data.</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-[1400px] mx-auto relative">
      
      {/* --- BACKGROUND VIDEO: ABSTRACT FLOW --- */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 bg-midnight-950/80 z-10"></div>
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-25 mix-blend-color-dodge"
        >
          {/* Elegant Particles / Flow */}
          <source src="https://player.vimeo.com/external/517090025.sd.mp4?s=1d577a76059952002779f678201a43a0d33e9b88&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
           <div>
              <h1 className="text-4xl font-thin text-white tracking-tighter mb-2">Welcome back, <span className="font-bold text-gold-500">{user?.name}</span></h1>
              <p className="text-neutral-500 uppercase tracking-widest text-xs">Brand Command Center</p>
           </div>
           <button className="mt-6 md:mt-0 px-6 py-3 border border-white/10 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all backdrop-blur-md">
              <Download size={14}/> Export Reports
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           {/* Metric 1 */}
           <div className="bg-black/20 backdrop-blur-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-gold-500/30 transition-colors rounded-2xl shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-gold-500 group-hover:scale-110 transition-transform"><Layers size={60}/></div>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">Active Campaigns</p>
              <p className="text-5xl font-thin text-white">{stats.activeCampaigns}</p>
           </div>
           {/* Metric 2 */}
           <div className="bg-black/20 backdrop-blur-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-gold-500/30 transition-colors rounded-2xl shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-gold-500 group-hover:scale-110 transition-transform"><Eye size={60}/></div>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">Total Impressions</p>
              <p className="text-5xl font-thin text-white">{stats.totalViews.toLocaleString()}</p>
           </div>
           {/* Metric 3 */}
           <div className="bg-black/20 backdrop-blur-2xl border border-white/10 p-8 relative overflow-hidden group hover:border-gold-500/30 transition-colors rounded-2xl shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-gold-500 group-hover:scale-110 transition-transform"><TrendingUp size={60}/></div>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">Total Investment</p>
              <p className="text-5xl font-thin text-gold-500">{stats.totalSpend.toLocaleString()} <span className="text-sm text-neutral-500">XOF</span></p>
           </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-8 border-l-2 border-gold-500 pl-4">Campaign Velocity</h2>
        
        <div className="space-y-4">
           {stats.campaigns.map((camp: any) => (
              <div key={camp.id} className="bg-black/20 backdrop-blur-2xl border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-colors group rounded-xl shadow-lg">
                 <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                    <div className={`w-3 h-3 rounded-full ${camp.status === 'LAUNCHED' ? 'bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]' : 'bg-neutral-500'}`}></div>
                    <div>
                       <h3 className="text-lg font-bold text-white group-hover:text-gold-500 transition-colors">{camp.description.substring(0, 40)}...</h3>
                       <p className="text-xs text-neutral-500 uppercase tracking-wider">{camp.platform} • {camp.packageType}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-center md:text-right">
                       <p className="text-[10px] text-neutral-500 uppercase">Status</p>
                       <p className="text-sm font-bold text-white">{camp.status}</p>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-[10px] text-neutral-500 uppercase">Impact</p>
                       <p className="text-sm font-bold text-white">{camp.influencersReached} Agents</p>
                    </div>
                    <div className="text-center md:text-right">
                       <p className="text-[10px] text-neutral-500 uppercase">Date</p>
                       <p className="text-sm font-bold text-white">{new Date(camp.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white">
                       <Download size={16}/>
                    </button>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
