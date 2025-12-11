
import React, { useState, useEffect } from 'react';
import { Platform } from '../types';
import { api } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircle2, Loader2, Instagram, TrendingUp, DollarSign, Users, Video, MessageCircle, Facebook, Upload, ShieldAlert, BadgeCheck, FileCheck, Ghost } from 'lucide-react';

export const BecomeInfluencer: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
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

  // Update simulator when form inputs change
  useEffect(() => {
    if (formData.platform === Platform.WHATSAPP) {
       setSimReach(formData.contacts || 2000);
    } else {
       setSimReach(formData.followers || 5000);
    }
  }, [formData.contacts, formData.followers, formData.platform]);

  const validateCompliance = () => {
    // STRICT COMPLIANCE LOGIC
    if (formData.platform === Platform.WHATSAPP) {
       if (formData.contacts < 2000) return t('inf.req_wa');
       if (formData.averageViews < 400) return t('inf.req_wa');
    } else {
       // Social Media Logic
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
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in relative z-20">
        <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 animate-pulse-slow shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase">{t('inf.success_title')}</h2>
        <p className="text-neutral-400 max-w-lg text-lg leading-relaxed font-light">
          {t('inf.success_desc')}
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-32 overflow-hidden">
      
      {/* Background Video (Fashion/Fame) */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-midnight-950/80 z-10"></div>
         <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay z-10"></div>
         <video 
           autoPlay loop muted playsInline 
           className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
         >
            {/* Fashion / Runway Video */}
            <source src="https://player.vimeo.com/external/366761066.sd.mp4?s=d1246c4f068755694c92b95c0c9e7a83707e42d7&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
         </video>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT: CONTENT & SIMULATOR */}
          <div className="animate-fade-in">
             <div className="mb-16">
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  {t('inf.join')}
               </div>
               <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-xl">
                 {t('inf.title').split(' ').slice(0, -1).join(' ')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-500">{t('inf.title').split(' ').slice(-1)}</span>
               </h1>
               <p className="text-xl text-neutral-300 leading-relaxed max-w-md drop-shadow-md">
                 {t('inf.desc')}
               </p>
             </div>

             {/* INCOME SIMULATOR */}
             <div className="bg-black/40 border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500 shadow-2xl backdrop-blur-xl">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <DollarSign size={150} className="text-white"/>
               </div>
               
               <h3 className="text-2xl font-bold text-white mb-10 flex items-center"><TrendingUp className="mr-3 text-cyan-500"/> {t('inf.sim_earnings')}</h3>
               
               <div className="mb-12">
                  <div className="flex justify-between text-sm mb-6">
                     <span className="text-neutral-400 font-bold uppercase tracking-wider text-xs">{t('inf.sim_reach')}</span>
                     <span className="text-white font-bold text-xl">{simReach.toLocaleString()} <span className="text-sm font-normal text-neutral-500">{formData.platform === Platform.WHATSAPP ? 'contacts' : 'followers'}</span></span>
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

               <div className="bg-black/50 rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center shadow-inner relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-gold-500"></div>
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2">{t('inf.sim_monthly')}</p>
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight drop-shadow-lg">{(estWeeklyEarnings * 4).toLocaleString()} <span className="text-lg text-white font-thin">XOF</span></p>
                  <p className="text-[10px] text-neutral-500 mt-4 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">*Based on ~3 campaigns per week</p>
               </div>
             </div>
          </div>

          {/* RIGHT: COMPLIANCE FORM */}
          <div className="bg-[#0a0a0a]/60 border border-white/10 rounded-[2.5rem] p-10 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative backdrop-blur-2xl animate-fade-in-up">
             {/* HUD Corners */}
             <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
             <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl"></div>
             
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight">{t('inf.apply')}</h2>
                <BadgeCheck className="text-gold-500 w-8 h-8 opacity-80"/>
             </div>

             <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.name')}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-colors font-medium placeholder-neutral-600 focus:bg-white/10"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.phone')}</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-colors font-medium placeholder-neutral-600 focus:bg-white/10"
                  placeholder="+229..."
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {/* VECTOR SELECTION */}
              <div className="space-y-3 group">
                  <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.platform')}</label>
                  <div className="grid grid-cols-2 gap-4">
                     {[Platform.WHATSAPP, Platform.FACEBOOK, Platform.TIKTOK, Platform.INSTAGRAM, Platform.SNAPCHAT].map(p => (
                        <div 
                           key={p} 
                           onClick={() => setFormData({...formData, platform: p})}
                           className={`cursor-pointer px-4 py-3 rounded-xl border flex items-center gap-3 transition-all ${
                              formData.platform === p 
                               ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                               : 'bg-white/5 border-white/10 text-neutral-500 hover:bg-white/10'
                           }`}
                        >
                           {p === Platform.WHATSAPP && <MessageCircle size={18}/>}
                           {p === Platform.FACEBOOK && <Facebook size={18}/>}
                           {p === Platform.TIKTOK && <Video size={18}/>}
                           {p === Platform.INSTAGRAM && <Instagram size={18}/>}
                           {p === Platform.SNAPCHAT && <Ghost size={18}/>}
                           <span className="text-xs font-bold uppercase">{p}</span>
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-colors font-medium focus:bg-white/10"
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
                   <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.views')}</label>
                   <input 
                    required
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-colors font-medium focus:bg-white/10"
                    value={formData.averageViews || ''}
                    onChange={e => setFormData({...formData, averageViews: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.link')}</label>
                <input 
                  required
                  type="url" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-cyan-500 outline-none transition-colors font-medium placeholder-neutral-600 focus:bg-white/10"
                  placeholder="https://..."
                  value={formData.profileLink}
                  onChange={e => setFormData({...formData, profileLink: e.target.value})}
                />
              </div>

              {/* PROOF UPLOAD */}
              <div className="space-y-3 group">
                 <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider group-focus-within:text-cyan-500 transition-colors">{t('inf.proof')}</label>
                 <div className="relative border border-dashed border-white/20 bg-black/20 p-6 text-center transition-all hover:border-cyan-500/50 group rounded-xl hover:bg-cyan-900/10 cursor-pointer">
                      <input 
                        type="file" 
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={(e) => setFormData({...formData, proofFile: e.target.files?.[0] || null})}
                      />
                      <div className="flex items-center justify-center gap-4">
                         <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-cyan-500 transition-colors">
                            {formData.proofFile ? <FileCheck className="text-green-500"/> : <Upload className="text-neutral-400 group-hover:text-cyan-500"/>}
                         </div>
                         <div className="text-left">
                            <p className="text-white font-bold text-sm tracking-wide">
                               {formData.proofFile ? formData.proofFile.name : t('inf.proof_desc')}
                            </p>
                            <p className="text-neutral-600 text-[10px] uppercase tracking-widest mt-1">Screenshots Only • Max 5MB</p>
                         </div>
                      </div>
                 </div>
              </div>

              {validationError && (
                 <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-4 animate-scale-in">
                    <ShieldAlert className="text-red-500 shrink-0" size={20}/>
                    <div>
                       <h4 className="text-red-500 font-bold text-xs uppercase tracking-wider mb-1">Access Denied</h4>
                       <p className="text-neutral-400 text-xs">{validationError}</p>
                    </div>
                 </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full font-bold py-5 rounded-xl flex items-center justify-center transition-all mt-6 text-sm uppercase tracking-widest shadow-lg ${
                   validationError 
                     ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5' 
                     : 'bg-white hover:bg-cyan-400 text-black hover:shadow-cyan-500/40 hover:scale-[1.02]'
                }`}
              >
                {loading ? <Loader2 className="animate-spin" /> : t('inf.submit')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
