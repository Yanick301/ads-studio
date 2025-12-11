
import React, { useEffect, useState, useRef } from 'react';
import { api } from '../services/api';
import { DashboardStats, CampaignStatus, Platform } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Loader2, DollarSign, Users, Megaphone, TrendingUp, Activity, Terminal, LayoutGrid, CheckCircle2, XCircle, Search, Filter, Download, Bell, Power, Eye, Shield, Cpu, Zap, BrainCircuit, Network, X, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Mock Data Generators for detailed tables
const generateMockCampaigns = (count: number) => Array.from({ length: count }).map((_, i) => ({
  id: `CMP-${202400 + i}`,
  client: ['Burger King', 'Canal+', 'MTN Bénin', 'Fashion Nova', 'Glow Spa', 'Soneb'][i % 6],
  platform: [Platform.WHATSAPP, Platform.TIKTOK, Platform.INSTAGRAM][i % 3],
  status: [CampaignStatus.LAUNCHED, CampaignStatus.PAID, CampaignStatus.COMPLETED, CampaignStatus.PENDING_PAYMENT][i % 4],
  budget: [15000, 35000, 75000][i % 3],
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  reach: Math.floor(Math.random() * 50000)
}));

const generateMockInfluencers = (count: number) => Array.from({ length: count }).map((_, i) => ({
  id: `INF-${8000 + i}`,
  name: ['Jean K.', 'Awa D.', 'Marc Z.', 'Sophie T.', 'Paul B.'][i % 5],
  platform: [Platform.WHATSAPP, Platform.TIKTOK][i % 2],
  followers: 500 + Math.floor(Math.random() * 10000),
  earnings: Math.floor(Math.random() * 200000),
  status: i % 5 === 0 ? 'PENDING' : 'ACTIVE',
  trust: 85 + Math.floor(Math.random() * 15),
  profileLink: 'https://instagram.com/user',
  metrics: { avgViews: 500 + i * 20 }
}));

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'CAMPAIGNS' | 'INFLUENCERS' | 'FINANCE'>('OVERVIEW');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [campaignsList] = useState(generateMockCampaigns(15));
  const [influencersList, setInfluencersList] = useState(generateMockInfluencers(12));
  
  // Interaction State
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const loadStats = async () => {
      try {
        const data = await api.getDashboardStats();
        if (isMounted.current) {
          setStats(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load admin stats:", err);
        if (isMounted.current) setLoading(false);
      }
    };
    loadStats();
    return () => { isMounted.current = false; };
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
     setToggleLoading(id);
     try {
        const newStatus = await api.toggleInfluencerStatus(id, currentStatus);
        setInfluencersList(prev => prev.map(inf => inf.id === id ? {...inf, active: newStatus, status: newStatus ? 'ACTIVE' : 'SUSPENDED'} : inf));
     } catch (e) {
        console.error("Failed to toggle status", e);
     } finally {
        setToggleLoading(null);
     }
  };

  const handleViewProfile = (influencer: any) => {
     setSelectedInfluencer(influencer);
  };

  const runNetworkOptimization = () => {
     setIsOptimizing(true);
     setTimeout(() => {
        setIsOptimizing(false);
        setOptimizationComplete(true);
        setTimeout(() => setOptimizationComplete(false), 3000);
     }, 2500);
  }

  if (loading) return <div className="h-screen flex items-center justify-center bg-transparent"><Loader2 className="animate-spin text-cyan-500 h-12 w-12" /></div>;

  // Chart Data
  const revenueData = [
    { name: 'Mon', revenue: 120000, reach: 45000 },
    { name: 'Tue', revenue: 180000, reach: 52000 },
    { name: 'Wed', revenue: 150000, reach: 49000 },
    { name: 'Thu', revenue: 250000, reach: 62000 },
    { name: 'Fri', revenue: 320000, reach: 81000 },
    { name: 'Sat', revenue: 450000, reach: 95000 },
    { name: 'Sun', revenue: 380000, reach: 88000 },
  ];

  const renderKPI = (label: string, value: string | number, icon: any, color: string, sub: string) => (
    <div className={`bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-${color.split('-')[1]}-500/30 transition-all duration-300`}>
       <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color} scale-150`}>{icon}</div>
       <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-white/5 ${color} border border-white/5 group-hover:scale-110 transition-transform`}>{icon}</div>
          <span className="text-[10px] font-mono text-white bg-white/5 px-2 py-1 rounded border border-white/10 flex items-center gap-1">
             <TrendingUp size={10} /> {sub}
          </span>
       </div>
       <div className="text-3xl font-black text-white mb-1 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">{value}</div>
       <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent flex pt-20 lg:pt-24 font-sans text-white relative overflow-hidden">
      
      {/* --- BACKGROUND VIDEO: DATA CENTER / HUD --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-midnight-950/85 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 z-10 mix-blend-overlay"></div>
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        >
          <source src="https://player.vimeo.com/external/451837014.sd.mp4?s=5481d9f8546114a905862363102436d64923e51a&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      {/* --- MOBILE MENU BUTTON --- */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-24 left-4 z-40 p-2 bg-midnight-900 border border-white/10 rounded-lg lg:hidden shadow-lg"
      >
         <Menu size={24} className="text-white"/>
      </button>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className={`fixed top-0 left-0 h-full w-64 border-r border-white/5 bg-black/90 backdrop-blur-3xl z-[60] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto lg:bg-black/80 lg:z-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         
         <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden absolute top-4 right-4 text-white"><X size={24}/></button>

         <div className="p-6 border-b border-white/5 mt-10 lg:mt-24">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">DeOS Admin</div>
            <div className="text-xl font-black text-white tracking-tighter">NEXUS <span className="text-cyan-500">V2</span></div>
         </div>
         
         <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'OVERVIEW', label: 'Overview', icon: <LayoutGrid size={18}/> },
              { id: 'CAMPAIGNS', label: 'Campaigns', icon: <Megaphone size={18}/> },
              { id: 'INFLUENCERS', label: 'Influencers', icon: <Users size={18}/> },
              { id: 'FINANCE', label: 'Financials', icon: <DollarSign size={18}/> },
            ].map((item) => (
               <button 
                 key={item.id}
                 onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                 className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                   activeTab === item.id 
                     ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                     : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'
                 }`}
               >
                  {item.icon}
                  <span>{item.label}</span>
                  {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>}
               </button>
            ))}
         </nav>

         <div className="p-6 border-t border-white/5">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-500 to-amber-700 border border-white/20"></div>
               <div>
                  <div className="text-xs font-bold text-white">Administrator</div>
                  <div className="text-[10px] text-green-500 flex items-center gap-1"><div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div> Online</div>
               </div>
            </div>
         </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-6 lg:p-12 relative z-10 overflow-y-auto h-[calc(100vh-6rem)] pb-24">
         
         {/* Top Bar */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 pl-12 lg:pl-0">
            <div>
               <h1 className="text-2xl md:text-3xl lg:text-4xl font-thin tracking-tighter text-white mb-2">
                  {activeTab === 'OVERVIEW' && 'System Overview'}
                  {activeTab === 'CAMPAIGNS' && 'Mission Control'}
                  {activeTab === 'INFLUENCERS' && 'Agent Network'}
                  {activeTab === 'FINANCE' && 'Treasury'}
               </h1>
               <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={12}/> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
               </p>
            </div>
            <div className="flex gap-4 self-end md:self-auto">
               <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors relative">
                  <Bell size={18}/>
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
               </button>
               <button className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all flex items-center gap-2">
                  <Download size={14}/> <span className="hidden md:inline">Export Data</span>
               </button>
            </div>
         </div>

         {/* --- VIEW: OVERVIEW --- */}
         {activeTab === 'OVERVIEW' && (
           <div className="space-y-8 animate-fade-in-up">
              {/* AI OPTIMIZATION WIDGET (NEW) */}
              <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden group gap-6">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                 <div className="relative z-10">
                    <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2"><BrainCircuit className="text-purple-400"/> {t('admin.ai.opt')}</h3>
                    <p className="text-neutral-400 text-xs max-w-md">{isOptimizing ? t('admin.ai.optimizing') : t('admin.ai.analysis')}</p>
                 </div>
                 <button 
                   onClick={runNetworkOptimization}
                   disabled={isOptimizing || optimizationComplete}
                   className={`w-full md:w-auto px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all relative z-10 border ${
                      isOptimizing ? 'bg-white/5 border-white/5 text-neutral-500 cursor-wait' :
                      optimizationComplete ? 'bg-green-500/10 border-green-500 text-green-500' :
                      'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                   }`}
                 >
                    {isOptimizing ? <Loader2 className="animate-spin" size={16}/> : optimizationComplete ? <span className="flex items-center gap-2 justify-center"><CheckCircle2 size={16}/> {t('admin.ai.opt_done')}</span> : t('admin.ai.opt_btn')}
                 </button>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                 {renderKPI('Total Revenue', `${stats?.totalRevenue.toLocaleString()} XOF`, <DollarSign size={24}/>, 'text-gold-500', '+12.5%')}
                 {renderKPI('Active Campaigns', stats?.totalCampaigns || 0, <Megaphone size={24}/>, 'text-cyan-400', '+3 Today')}
                 {renderKPI('Active Influencers', stats?.activeInfluencers || 0, <Users size={24}/>, 'text-purple-400', '+15 Pending')}
                 {renderKPI('System Load', '98%', <Activity size={24}/>, 'text-green-500', 'Optimal')}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Revenue Chart */}
                 <div className="lg:col-span-2 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-lg font-bold text-white tracking-wide">Revenue Velocity</h3>
                       <div className="flex gap-2">
                          {['1H', '24H', '7D', '30D'].map(t => (
                             <button key={t} className={`text-[10px] font-bold px-3 py-1 rounded border ${t === '7D' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-transparent text-neutral-500 border-transparent hover:bg-white/5'}`}>{t}</button>
                          ))}
                       </div>
                    </div>
                    <div className="h-64 md:h-80 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={revenueData}>
                             <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                             <XAxis dataKey="name" stroke="#555" tick={{fontSize: 10}} axisLine={false} tickLine={false} dy={10} />
                             <YAxis stroke="#555" tick={{fontSize: 10}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`} />
                             <Tooltip contentStyle={{ backgroundColor: '#020410', border: '1px solid #333', borderRadius: '8px' }} />
                             <Area type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 {/* Recent Activity Log */}
                 <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col h-[450px]">
                    <h3 className="text-lg font-bold text-white mb-6">Live Feed</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
                       {stats?.recentActivity?.map((act, i) => (
                          <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                             <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${act.status === 'LAUNCHED' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-neutral-600'}`}></div>
                             <div>
                                <p className="text-sm font-bold text-white">{act.businessName}</p>
                                <p className="text-xs text-neutral-500 mb-1">{act.description.substring(0,30)}...</p>
                                <div className="flex gap-2">
                                   <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">{act.platform}</span>
                                   <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">{act.status}</span>
                                </div>
                             </div>
                          </div>
                       ))}
                       {!stats?.recentActivity?.length && <p className="text-neutral-500 text-sm">No activity detected.</p>}
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* --- VIEW: CAMPAIGNS & INFLUENCERS (DATA TABLES) --- */}
         {(activeTab === 'CAMPAIGNS' || activeTab === 'INFLUENCERS') && (
            <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden animate-fade-in-up shadow-2xl">
               {/* Table Toolbar */}
               <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full md:w-auto">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16}/>
                     <input type="text" placeholder="Search database..." className="bg-black/30 border border-white/10 rounded-lg pl-12 pr-4 py-2 text-sm text-white focus:border-cyan-500 outline-none w-full md:w-64 transition-colors placeholder-neutral-700"/>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
                        <Filter size={14}/> Filter
                     </button>
                  </div>
               </div>

               {/* TABLE */}
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                     <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                           {activeTab === 'CAMPAIGNS' ? (
                              <>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">ID</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Client</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Platform</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Status</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono text-right">Budget</th>
                              </>
                           ) : (
                              <>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">ID</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Agent Name</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Platform</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Trust Score</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Status</th>
                                 <th className="p-6 text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Actions</th>
                              </>
                           )}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {activeTab === 'CAMPAIGNS' ? campaignsList.map((row) => (
                           <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                              <td className="p-6 font-mono text-xs text-neutral-500 group-hover:text-cyan-400 transition-colors">{row.id}</td>
                              <td className="p-6 font-bold text-white">{row.client}</td>
                              <td className="p-6 text-xs text-neutral-400">{row.platform}</td>
                              <td className="p-6">
                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                    row.status === CampaignStatus.LAUNCHED ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    row.status === CampaignStatus.PAID ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                    'bg-neutral-800 text-neutral-500 border-neutral-700'
                                 }`}>{row.status}</span>
                              </td>
                              <td className="p-6 text-right font-mono text-gold-500">{row.budget.toLocaleString()} XOF</td>
                           </tr>
                        )) : influencersList.map((row) => (
                           <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                              <td className="p-6 font-mono text-xs text-neutral-500 group-hover:text-purple-400 transition-colors">{row.id}</td>
                              <td className="p-6 font-bold text-white flex items-center gap-3">
                                 <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10"></div>
                                 {row.name}
                              </td>
                              <td className="p-6 text-xs text-neutral-400">{row.platform}</td>
                              <td className="p-6">
                                 <div className="w-full bg-neutral-800 rounded-full h-1.5 max-w-[100px]">
                                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{width: `${row.trust}%`}}></div>
                                 </div>
                              </td>
                              <td className="p-6">
                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                    row.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                 }`}>
                                    {row.status || 'ACTIVE'}
                                 </span>
                              </td>
                              <td className="p-6 flex items-center gap-2">
                                 <button 
                                    onClick={() => handleToggleStatus(row.id, row.active)}
                                    disabled={toggleLoading === row.id}
                                    className={`p-2 rounded transition-colors ${
                                       row.active ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-green-500/10 text-green-400'
                                    }`}
                                    title={row.active ? t('admin.actions.suspend') : t('admin.actions.activate')}
                                 >
                                    {toggleLoading === row.id ? <Loader2 size={16} className="animate-spin"/> : <Power size={16}/>}
                                 </button>
                                 <button 
                                    onClick={() => handleViewProfile(row)}
                                    className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded transition-colors"
                                    title={t('admin.actions.view')}
                                 >
                                    <Eye size={16}/>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         )}
         
         {/* --- VIEW: FINANCE --- */}
         {activeTab === 'FINANCE' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
               <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-8">Cash Flow Analysis</h3>
                  <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                           <XAxis dataKey="name" stroke="#555" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                           <YAxis stroke="#555" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                           <Tooltip cursor={{fill: 'white', opacity: 0.05}} contentStyle={{ backgroundColor: '#020410', border: '1px solid #333' }} />
                           <Bar dataKey="revenue" fill="#EAB308" radius={[4, 4, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               
               <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-white/5 flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 border-4 border-gold-500 border-t-transparent rounded-full animate-spin-slow"></div>
                     <DollarSign size={40} className="text-gold-500"/>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tight">4.5M XOF</h3>
                  <p className="text-neutral-500 uppercase tracking-widest text-xs mb-8">Net Revenue (This Month)</p>
                  <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all w-full max-w-xs">
                     Download Financial Report
                  </button>
               </div>
            </div>
         )}

         {/* --- MODAL: AI PROFILE ANALYZER --- */}
         {selectedInfluencer && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
               <div className="bg-midnight-950 border border-cyan-500/30 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
                  {/* Decorative Scanner Lines */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  <button 
                     onClick={() => setSelectedInfluencer(null)}
                     className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-20"
                  >
                     <X size={24}/>
                  </button>

                  <div className="p-8">
                     <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-white/10 flex items-center justify-center relative shrink-0">
                           <Users size={32} className="text-neutral-500"/>
                           <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-midnight-950 rounded-full"></div>
                        </div>
                        <div>
                           <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{selectedInfluencer.name}</h2>
                           <div className="flex gap-3">
                              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">{selectedInfluencer.id}</span>
                              <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2 py-1 rounded">{selectedInfluencer.platform}</span>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                           <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">{t('admin.ai.analysis')}</div>
                           <div className="h-32 flex items-center justify-center relative">
                              <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
                              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin-slow" style={{borderRightColor: 'transparent'}}></div>
                              <div className="text-center">
                                 <div className="text-3xl font-black text-white">{selectedInfluencer.trust}%</div>
                                 <div className="text-[10px] text-cyan-400 uppercase font-bold">{t('admin.ai.trust')}</div>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <div className="flex justify-between mb-2">
                                 <span className="text-xs text-neutral-400 uppercase tracking-wide">{t('admin.ai.sentiment')}</span>
                                 <span className="text-xs text-green-400 font-bold">Positive</span>
                              </div>
                              <div className="w-full bg-neutral-800 rounded-full h-1.5">
                                 <div className="bg-green-500 h-1.5 rounded-full w-[85%]"></div>
                              </div>
                           </div>
                           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                              <div className="flex justify-between mb-2">
                                 <span className="text-xs text-neutral-400 uppercase tracking-wide">{t('admin.ai.projection')}</span>
                                 <span className="text-xs text-purple-400 font-bold">~12k Reach</span>
                              </div>
                              <div className="w-full bg-neutral-800 rounded-full h-1.5">
                                 <div className="bg-purple-500 h-1.5 rounded-full w-[65%]"></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-2">
                           <Shield size={12}/> Verified by DeOS AI Guard
                        </div>
                        <div className="flex gap-4">
                           <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded transition-colors border border-red-500/30">
                              Flag Account
                           </button>
                           <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-lg shadow-cyan-500/20">
                              Full Report
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

      </main>
    </div>
  );
};
