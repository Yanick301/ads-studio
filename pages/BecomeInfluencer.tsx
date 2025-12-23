import React, { useState, useEffect } from 'react';
import { Platform } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  CheckCircle2, Loader2, Instagram, TrendingUp, DollarSign, Users, Video, 
  MessageCircle, Facebook, Upload, ShieldAlert, BadgeCheck, FileCheck, Ghost,
  Sparkles, Zap, Rocket, Award, Star, Crown, Coins, ArrowRight
} from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlowEffect } from '../components/GlowEffect';

export const BecomeInfluencer: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    platform: Platform.WHATSAPP,
    profileLink: '',
    followers: 0,
    contacts: 0,
    averageViews: 0,
    proofFile: null as File | null
  });
  
  // Simulator State
  const [simReach, setSimReach] = useState(2000);
  const ratePerView = 5; // 5 XOF per view avg
  const estWeeklyEarnings = simReach * 0.4 * ratePerView * 3; // 40% engagement, 3 posts/week

  useEffect(() => {
    if (formData.platform === Platform.WHATSAPP) {
       setSimReach(formData.contacts || 2000);
    } else {
       setSimReach(formData.followers || 5000);
    }
  }, [formData.contacts, formData.followers, formData.platform]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateCompliance = () => {
    if (formData.platform === Platform.WHATSAPP) {
       if (formData.contacts < 2000) return t('inf.req_wa');
       if (formData.averageViews < 400) return t('inf.req_wa');
    } else {
       if (formData.followers < 1000) return t('inf.req_social');
    }
    if (!formData.proofFile) return "Proof of Authority (Screenshot) is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    const error = validateCompliance();
    if (error) {
       setValidationError(error);
       return;
    }

    setLoading(true);
    try {
      await api.registerInfluencer(formData);
      setSubmitted(true);
      window.scrollTo(0,0);
    } catch (err) {
      alert('Error registering');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
        <AnimatedBackground type="particles" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-cyan-500/10 to-purple-500/10"></div>
        
        <div className="relative z-10 animate-scale-in">
          <GlowEffect color="green" intensity="high">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center mb-8 mx-auto animate-pulse-slow">
              <CheckCircle2 size={64} strokeWidth={3} />
            </div>
          </GlowEffect>
          
          <h2 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase">
            {t('inf.success_title')}
          </h2>
          <p className="text-neutral-300 max-w-2xl text-xl leading-relaxed font-light mb-8">
            {t('inf.success_desc')}
          </p>
          
          <div className="flex items-center justify-center gap-4 text-cyan-400">
            <Sparkles size={20} className="animate-pulse" />
            <span className="text-sm uppercase tracking-widest font-mono">Welcome to the Elite</span>
            <Sparkles size={20} className="animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const benefits = [
    { icon: <Coins className="text-gold-500" size={24} />, text: 'Earn up to 500K XOF/month' },
    { icon: <Rocket className="text-cyan-500" size={24} />, text: 'Fast Payouts (24h)' },
    { icon: <Award className="text-purple-500" size={24} />, text: 'Elite Badges & Rewards' },
    { icon: <Star className="text-yellow-500" size={24} />, text: 'Priority Campaign Access' },
  ];

  return (
    <div className="relative min-h-screen py-24 overflow-hidden">
      
      {/* Animated Background */}
      <AnimatedBackground type="video" videoUrl="https://player.vimeo.com/external/366761066.sd.mp4?s=d1246c4f068755694c92b95c0c9e7a83707e42d7&profile_id=164&oauth2_token_id=57447761" />
      <div className="absolute inset-0 bg-midnight-950/80 z-10"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay z-10"></div>
      
      {/* Parallax Glow */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: CONTENT & SIMULATOR */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse-slow">
              <Crown className="mr-2" size={14} />
              {t('inf.join')}
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-2xl">
              {t('inf.title').split(' ').slice(0, -1).join(' ')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-cyan-400 to-purple-500 animate-shimmer bg-[length:200%_auto]">
                {t('inf.title').split(' ').slice(-1)}
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 leading-relaxed max-w-md mb-12 drop-shadow-md">
              {t('inf.desc')}
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="glass p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <p className="text-sm text-neutral-300 group-hover:text-white transition-colors font-medium">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* INCOME SIMULATOR */}
            <GlowEffect color="cyan" intensity="medium">
              <div className="glass-panel border border-cyan-500/30 p-10 rounded-3xl relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <DollarSign size={150} className="text-white"/>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
                    <TrendingUp className="mr-3 text-cyan-400 animate-pulse" size={28}/> 
                    {t('inf.sim_earnings')}
                  </h3>
                  
                  <div className="mb-12">
                    <div className="flex justify-between text-sm mb-6">
                      <span className="text-neutral-400 font-bold uppercase tracking-wider text-xs">
                        {t('inf.sim_reach')}
                      </span>
                      <span className="text-white font-bold text-2xl">
                        <AnimatedCounter value={simReach} duration={1000} />
                        <span className="text-sm font-normal text-neutral-500 ml-2">
                          {formData.platform === Platform.WHATSAPP ? 'contacts' : 'followers'}
                        </span>
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min={formData.platform === Platform.WHATSAPP ? "2000" : "1000"} 
                      max="50000" 
                      step="500" 
                      value={simReach}
                      onChange={(e) => setSimReach(parseInt(e.target.value))}
                      className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
                    />
                  </div>

                  <div className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-gold-500/10 rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center shadow-inner relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-gold-500"></div>
                    <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2">
                      {t('inf.sim_monthly')}
                    </p>
                    <p className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-gold-400 tracking-tight drop-shadow-lg">
                      <AnimatedCounter value={estWeeklyEarnings * 4} duration={1500} />
                      <span className="text-2xl text-white font-thin ml-2">XOF</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-4 bg-white/5 px-4 py-2 rounded-full uppercase tracking-widest">
                      *Based on ~3 campaigns per week
                    </p>
                  </div>
                </div>
              </div>
            </GlowEffect>
          </div>

          {/* RIGHT: COMPLIANCE FORM */}
          <div className="glass-panel border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl relative backdrop-blur-2xl animate-fade-in-up">
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {t('inf.apply')}
              </h2>
              <BadgeCheck className="text-gold-500 w-10 h-10 opacity-80 animate-pulse-slow"/>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors flex items-center gap-2">
                  <Users size={12} />
                  {t('inf.name')}
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full glass border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all font-medium placeholder-neutral-600 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors flex items-center gap-2">
                  <MessageCircle size={12} />
                  {t('inf.phone')}
                </label>
                <input 
                  required
                  type="tel" 
                  className="w-full glass border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all font-medium placeholder-neutral-600 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  placeholder="+229..."
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* VECTOR SELECTION */}
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">
                  {t('inf.platform')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: Platform.WHATSAPP, icon: <MessageCircle size={18}/>, color: 'green' },
                    { id: Platform.FACEBOOK, icon: <Facebook size={18}/>, color: 'blue' },
                    { id: Platform.TIKTOK, icon: <Video size={18}/>, color: 'pink' },
                    { id: Platform.INSTAGRAM, icon: <Instagram size={18}/>, color: 'purple' },
                    { id: Platform.SNAPCHAT, icon: <Ghost size={18}/>, color: 'yellow' },
                  ].map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => setFormData({...formData, platform: p.id})}
                      className={`cursor-pointer px-4 py-3 rounded-xl border flex items-center gap-3 transition-all ${
                        formData.platform === p.id 
                         ? `glass border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105` 
                         : 'glass border-white/10 text-neutral-500 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {p.icon}
                      <span className="text-xs font-bold uppercase">{p.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC METRICS */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3 group">
                  <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">
                    {formData.platform === Platform.WHATSAPP ? t('inf.contacts') : t('inf.followers')}
                  </label>
                  <input 
                    required
                    type="number" 
                    className="w-full glass border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all font-medium focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    value={formData.platform === Platform.WHATSAPP ? (formData.contacts || '') : (formData.followers || '')}
                    onChange={e => {
                      const val = parseInt(e.target.value);
                      if (formData.platform === Platform.WHATSAPP) {
                        setFormData({...formData, contacts: val});
                      } else {
                        setFormData({...formData, followers: val});
                      }
                    }}
                  />
                </div>
                <div className="space-y-3 group">
                  <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">
                    {t('inf.views')}
                  </label>
                  <input 
                    required
                    type="number" 
                    className="w-full glass border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all font-medium focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    value={formData.averageViews || ''}
                    onChange={e => setFormData({...formData, averageViews: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors flex items-center gap-2">
                  <Zap size={12} />
                  {t('inf.link')}
                </label>
                <input 
                  required
                  type="url" 
                  className="w-full glass border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-all font-medium placeholder-neutral-600 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  placeholder="https://..."
                  value={formData.profileLink}
                  onChange={e => setFormData({...formData, profileLink: e.target.value})}
                />
              </div>

              {/* PROOF UPLOAD */}
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">
                  {t('inf.proof')}
                </label>
                <div className="relative border-2 border-dashed border-white/20 glass p-6 text-center transition-all hover:border-cyan-500/50 group rounded-xl hover:bg-cyan-900/10 cursor-pointer">
                  <input 
                    type="file" 
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={(e) => setFormData({...formData, proofFile: e.target.files?.[0] || null})}
                  />
                  <div className="flex items-center justify-center gap-4">
                    <div className="p-4 rounded-full glass border border-white/10 group-hover:border-cyan-500 transition-all group-hover:scale-110">
                      {formData.proofFile ? (
                        <FileCheck className="text-green-500" size={24}/>
                      ) : (
                        <Upload className="text-neutral-400 group-hover:text-cyan-500 transition-colors" size={24}/>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm tracking-wide">
                        {formData.proofFile ? formData.proofFile.name : t('inf.proof_desc')}
                      </p>
                      <p className="text-neutral-600 text-xs uppercase tracking-widest mt-1">
                        Screenshots Only • Max 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {validationError && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-4 animate-scale-in">
                  <ShieldAlert className="text-red-500 shrink-0" size={20}/>
                  <div>
                    <h4 className="text-red-500 font-bold text-xs uppercase tracking-wider mb-1">
                      Access Denied
                    </h4>
                    <p className="text-neutral-400 text-xs">{validationError}</p>
                  </div>
                </div>
              )}

              <GlowEffect color="gold" intensity="medium">
                <button 
                  type="submit" 
                  disabled={loading || !!validationError}
                  className={`w-full font-black py-5 rounded-xl flex items-center justify-center transition-all text-sm uppercase tracking-widest shadow-lg ${
                    validationError || loading
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5' 
                      : 'bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-[1.02]'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      {t('inf.submit')} <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
              </GlowEffect>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
