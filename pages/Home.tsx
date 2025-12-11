
import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe2, Users, LayoutDashboard, Utensils, Music, ShoppingBag, Building2, Smartphone, Rocket, MousePointerClick, ScanFace, Quote, Star, Plus, Minus, Activity, Martini, Music2, Mic2, Gem, Briefcase, CheckCircle2, Target, Zap, Shield, Server, Database, XCircle, Eye, Calculator, FileText, Lock, Fingerprint, Link as LinkIcon, GraduationCap } from 'lucide-react';
import { PACKAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonialBg, setActiveTestimonialBg] = useState(0);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  
  // NEW STATES
  const [roiBudget, setRoiBudget] = useState(50000);
  const [activeCase, setActiveCase] = useState(0);

  // HERO VIDEO SLIDER SOURCES
  const heroVideos = [
    "https://player.vimeo.com/external/371836154.sd.mp4?s=d01777207125712f84b64e05b38f8306306059d0&profile_id=165&oauth2_token_id=57447761", 
    "https://player.vimeo.com/external/517090025.sd.mp4?s=1d577a76059952002779f678201a43a0d33e9b88&profile_id=164&oauth2_token_id=57447761", 
    "https://player.vimeo.com/external/451837014.sd.mp4?s=5481d9f8546114a905862363102436d64923e51a&profile_id=164&oauth2_token_id=57447761"  
  ];

  // Testimonial Backgrounds
  const testimonialBgs = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Testimonial Slider
    const testimonialInterval = setInterval(() => {
      setActiveTestimonialBg((prev) => (prev + 1) % testimonialBgs.length);
    }, 5000);

    // Hero Video Slider
    const heroInterval = setInterval(() => {
      setActiveHeroVideo((prev) => (prev + 1) % heroVideos.length);
    }, 8000); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(testimonialInterval);
      clearInterval(heroInterval);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const partners = [
    { name: "MTN", url: "https://www.mtn.bj" },
    { name: "MOOV AFRICA", url: "https://www.moov-africa.bj" },
    { name: "WAVE", url: "https://www.wave.com/en/benin/" },
    { name: "CANAL+", url: "https://www.canalplus-afrique.com/bj" },
    { name: "JUMIA", url: "https://www.jumia.bj" },
    { name: "ENGIE", url: "https://www.engie-energyaccess.com" },
    { name: "BOA", url: "https://www.boagroup.com" },
    { name: "ORABANK", url: "https://www.orabank.net/fr/filiale/benin" }
  ];

  const marqueeContent = [...partners, ...partners, ...partners];

  // Holographic Icon Card Component
  const HoloCard = ({ icon, title, desc, onClick, className, colorClass, iconClass }: any) => {
    return (
      <div 
        onClick={onClick}
        className={`relative overflow-hidden group cursor-pointer ${className} bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:border-white/20 min-h-[300px]`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${colorClass}`}></div>
        
        <div className="relative z-20 h-full flex flex-col justify-end">
           <div className={`absolute top-8 right-8 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 opacity-10 group-hover:opacity-20 ${iconClass}`}>
             {icon}
           </div>
           
           <div className="relative z-10 border-t border-white/5 pt-8 backdrop-blur-sm mt-auto">
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all flex items-center gap-4`}>
                 {title} 
                 <div className={`opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 ${iconClass}`}>
                   {React.cloneElement(icon, { size: 24 })}
                 </div>
              </h3>
              <p className="text-neutral-400 mb-8 max-w-sm text-sm font-light leading-relaxed group-hover:text-neutral-200 transition-colors">{desc}</p>
              
              <div className="flex items-center text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform text-white/50 group-hover:text-white">
                 <span className="border-b border-current pb-1">Deploy Campaign</span> <ArrowRight size={14} className="ml-2"/>
              </div>
           </div>
        </div>
      </div>
    );
  };

  // ROI Calcs
  const estReach = Math.floor(roiBudget / 5);
  const estConv = Math.floor(estReach * 0.015);
  const estRev = estConv * 15000; // Avg basket 15k

  return (
    <div className="animate-fade-in text-white overflow-hidden bg-transparent">
      
      {/* --- HERO SECTION WITH VIDEO SLIDER --- */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden">
        
        {/* Video Carousel */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-midnight-950">
          {heroVideos.map((video, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-[120%] transition-opacity duration-[2000ms] ease-in-out ${index === activeHeroVideo ? 'opacity-80' : 'opacity-0'}`}
              style={{ transform: `translate3d(0, ${scrollY * 0.4}px, 0)` }}
            >
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          ))}

          {/* Overlays */}
          <div className="absolute inset-0 bg-midnight-950/60 z-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/40 z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 text-center mt-20 md:mt-0">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-xl mb-8 md:mb-12 bg-cyan-900/20 animate-fade-in-up shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
            <span className="text-cyan-200 text-[10px] font-bold uppercase tracking-[0.2em]">{t('hero.new')}</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.85] animate-scale-in drop-shadow-2xl">
            {t('hero.title_start')} <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-white to-cyan-400 animate-shimmer bg-[length:200%_auto]">
              {t('hero.title_end')}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 mb-12 md:mb-16 font-light leading-relaxed tracking-wide animate-fade-in-up drop-shadow-lg px-4" style={{animationDelay: '0.2s'}}>
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fade-in-up px-4 max-w-lg mx-auto sm:max-w-none" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => onNavigate('create')}
              className="group relative px-8 md:px-12 py-5 bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] overflow-hidden rounded-sm w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center">{t('hero.cta_start')} <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
            </button>
            <button 
              onClick={() => onNavigate('influencer')}
              className="px-8 md:px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-widest transition-all border border-white/20 hover:border-cyan-400/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-sm hover:text-cyan-400 w-full sm:w-auto"
            >
              {t('hero.cta_influencer')}
            </button>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-midnight-950/60 backdrop-blur-xl z-30 py-4 md:py-6">
           <div className="flex animate-marquee whitespace-nowrap items-center">
              {marqueeContent.map((p, i) => (
                 <a 
                   key={i} 
                   href={p.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="mx-8 md:mx-16 text-xs md:text-sm font-bold text-neutral-500 hover:text-cyan-400 transition-all cursor-pointer uppercase tracking-[0.2em] hover:scale-110 opacity-60 hover:opacity-100 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                 >
                    {p.name}
                 </a>
              ))}
           </div>
        </div>
      </section>

      {/* --- LIVE ACTIVITY MAP --- */}
      <section className="bg-midnight-950/80 border-b border-white/5 py-8 md:py-12 relative overflow-hidden backdrop-blur-md">
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
            <div className="flex items-center gap-6 w-full md:w-auto justify-center md:justify-start">
               <div className="relative p-3 bg-white/5 rounded-full border border-white/10">
                 <Activity className="text-cyan-400" size={24}/>
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></span>
               </div>
               <div>
                  <h3 className="text-white font-bold text-xl tracking-tight">Live Network Activity</h3>
                  <div className="flex items-center gap-2 overflow-hidden h-4 mt-1">
                     <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                     <p className="text-cyan-500/70 text-xs uppercase tracking-widest font-mono animate-pulse">Burger King Launched Campaign #4291</p>
                  </div>
               </div>
            </div>
            
            <div className="flex-1 max-w-2xl h-16 relative mx-8 hidden lg:block">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-900 to-transparent"></div>
               <div className="absolute top-1/2 left-[10%] w-2 h-2 bg-gold-500 rounded-full -translate-y-1/2 animate-ping" style={{animationDuration: '2s'}}></div>
               <div className="absolute top-[30%] left-[45%] w-2 h-2 bg-cyan-500 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
            </div>

            <div className="flex gap-4 md:gap-12 text-center w-full md:w-auto justify-center">
               <div className="bg-white/5 px-6 py-3 rounded-lg border border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors flex-1 md:flex-none">
                  <div className="text-xl md:text-3xl font-mono text-white tracking-tighter">42</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Active Now</div>
               </div>
               <div className="bg-white/5 px-6 py-3 rounded-lg border border-white/5 backdrop-blur-sm hover:border-white/20 transition-colors flex-1 md:flex-none">
                  <div className="text-xl md:text-3xl font-mono text-cyan-400 tracking-tighter">12m</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Avg Response</div>
               </div>
            </div>
         </div>
      </section>

      {/* --- ROI SIMULATOR (NEW) --- */}
      <section className="py-20 md:py-32 relative bg-black/40 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl md:text-6xl font-thin tracking-tighter mb-6 text-white">{t('roi.title')}</h2>
                 <p className="text-neutral-400 text-lg mb-12">{t('roi.subtitle')}</p>
                 
                 <div className="mb-10">
                    <div className="flex justify-between mb-4">
                       <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">{t('roi.budget')}</span>
                       <span className="text-white font-mono font-bold text-xl">{roiBudget.toLocaleString()} XOF</span>
                    </div>
                    <input 
                       type="range" min="15000" max="1000000" step="5000" 
                       value={roiBudget} onChange={(e) => setRoiBudget(parseInt(e.target.value))}
                       className="w-full h-2 bg-white/10 rounded-full appearance-none accent-gold-500 cursor-pointer"
                    />
                 </div>

                 <button onClick={() => onNavigate('create')} className="bg-gold-500 text-black px-8 py-4 font-bold uppercase tracking-widest rounded hover:bg-gold-400 transition-colors w-full md:w-auto">
                    {t('pricing.choose')}
                 </button>
              </div>

              <div className="bg-midnight-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative shadow-2xl mt-8 lg:mt-0">
                 <div className="absolute top-4 right-4 text-cyan-500/20"><Calculator size={100}/></div>
                 
                 <div className="space-y-8 relative z-10">
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                       <p className="text-neutral-500 uppercase tracking-widest text-[10px] mb-2">{t('roi.est_reach')}</p>
                       <p className="text-4xl font-black text-cyan-400">{estReach.toLocaleString()} <span className="text-lg text-white font-thin">Views</span></p>
                    </div>
                    <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                       <p className="text-neutral-500 uppercase tracking-widest text-[10px] mb-2">{t('roi.est_conv')}</p>
                       <p className="text-4xl font-black text-purple-400">~{estConv.toLocaleString()} <span className="text-lg text-white font-thin">Sales</span></p>
                    </div>
                    <div className="bg-gradient-to-r from-gold-500/20 to-transparent p-6 rounded-2xl border border-gold-500/30">
                       <p className="text-gold-500 uppercase tracking-widest text-[10px] mb-2">{t('roi.est_rev')}</p>
                       <p className="text-5xl font-black text-white">{estRev.toLocaleString()} <span className="text-lg text-neutral-400 font-thin">XOF</span></p>
                    </div>
                 </div>
                 <p className="text-[10px] text-neutral-600 mt-6 text-center">{t('roi.disclaimer')}</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- CASE STUDIES (NEW) --- */}
      <section className="py-20 md:py-32 bg-midnight-950/50">
         <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">{t('cases.title')}</h2>
               <p className="text-neutral-500 font-mono text-sm">{t('cases.subtitle')}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
               <div className="flex md:flex-col gap-4 overflow-x-auto pb-4 md:pb-0 md:w-1/4 no-scrollbar">
                  {['Burger King', 'Canal+', 'MTN'].map((brand, i) => (
                     <button 
                        key={i}
                        onClick={() => setActiveCase(i)}
                        className={`px-6 py-4 rounded-xl text-left border transition-all whitespace-nowrap ${
                           activeCase === i ? 'bg-white/10 border-cyan-500 text-white' : 'border-white/5 text-neutral-500 hover:bg-white/5'
                        }`}
                     >
                        <span className="font-bold">{brand}</span>
                     </button>
                  ))}
               </div>

               <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 relative min-h-[400px] flex items-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  {activeCase === 0 && (
                     <div className="animate-fade-in w-full">
                        <div className="text-gold-500 font-mono text-xs uppercase mb-4">CONFIDENTIAL REPORT #BK-229</div>
                        <h3 className="text-4xl font-black text-white mb-6">{t('cases.bk_title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-cyan-400 mb-2">340%</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">Sales Uplift</div>
                           </div>
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-purple-400 mb-2">12k</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">Shared Stories</div>
                           </div>
                        </div>
                        <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">{t('cases.bk_res')}</p>
                        <button className="flex items-center text-cyan-400 hover:text-white uppercase text-xs font-bold tracking-widest gap-2">
                           {t('cases.btn_read')} <ArrowRight size={14}/>
                        </button>
                     </div>
                  )}
                  {activeCase === 1 && (
                     <div className="animate-fade-in w-full">
                        <div className="text-gold-500 font-mono text-xs uppercase mb-4">CONFIDENTIAL REPORT #CP-229</div>
                        <h3 className="text-4xl font-black text-white mb-6">{t('cases.c_title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-green-400 mb-2">1.5k</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">New Subs</div>
                           </div>
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-white mb-2">48h</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">Campaign Duration</div>
                           </div>
                        </div>
                        <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">{t('cases.c_res')}</p>
                     </div>
                  )}
                  {activeCase === 2 && (
                     <div className="animate-fade-in w-full">
                        <div className="text-gold-500 font-mono text-xs uppercase mb-4">CONFIDENTIAL REPORT #MTN-229</div>
                        <h3 className="text-4xl font-black text-white mb-6">{t('cases.mtn_title')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-yellow-400 mb-2">12k+</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">App Installs</div>
                           </div>
                           <div>
                              <div className="text-5xl md:text-6xl font-thin text-cyan-400 mb-2">0.05$</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-widest">CPI (Cost Per Install)</div>
                           </div>
                        </div>
                        <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">{t('cases.mtn_res')}</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </section>

      {/* --- TRUST PROTOCOL (NEW) --- */}
      <section className="py-24 bg-black relative">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-thin text-white mb-16 tracking-tighter uppercase">{t('trust.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block z-0"></div>
               
               {[
                  { icon: <ScanFace size={32}/>, title: t('trust.s1'), desc: t('trust.s1_d'), color: 'text-cyan-400' },
                  { icon: <Fingerprint size={32}/>, title: t('trust.s2'), desc: t('trust.s2_d'), color: 'text-purple-400' },
                  { icon: <Lock size={32}/>, title: t('trust.s3'), desc: t('trust.s3_d'), color: 'text-gold-500' },
               ].map((step, i) => (
                  <div key={i} className="relative z-10 bg-midnight-950 border border-white/10 p-8 rounded-2xl flex flex-col items-center hover:border-white/30 transition-colors">
                     <div className={`p-4 rounded-full bg-white/5 mb-6 ${step.color} shadow-lg shadow-white/5`}>{step.icon}</div>
                     <h3 className="text-lg font-bold text-white mb-2 uppercase">{step.title}</h3>
                     <p className="text-neutral-500 text-xs">{step.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- VS SECTION --- */}
      <section className="py-16 md:py-32 relative bg-midnight-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">The Paradigm <span className="text-gold-500">Shift</span></h2>
              <p className="text-neutral-400 text-sm md:text-base">Stop burning cash on algorithms. Start investing in people.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
              {/* OLD WAY */}
              <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                 <h3 className="text-xl font-bold text-neutral-500 mb-8 uppercase tracking-widest flex items-center gap-3"><XCircle className="text-red-500"/> Old Marketing</h3>
                 <ul className="space-y-6">
                    <li className="flex items-start gap-4 text-neutral-400"><Minus className="text-red-500 mt-1" size={16}/> Unpredictable Algorithm Changes</li>
                    <li className="flex items-start gap-4 text-neutral-400"><Minus className="text-red-500 mt-1" size={16}/> Bot Traffic & Fake Clicks</li>
                    <li className="flex items-start gap-4 text-neutral-400"><Minus className="text-red-500 mt-1" size={16}/> Passive Scrolling (Banner Blindness)</li>
                    <li className="flex items-start gap-4 text-neutral-400"><Minus className="text-red-500 mt-1" size={16}/> Low Trust Factor</li>
                 </ul>
              </div>

              {/* KWIK WAY */}
              <div className="p-8 md:p-10 rounded-3xl border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500 transition-colors shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                 <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-3"><CheckCircle2 className="text-cyan-400"/> KwikAds System</h3>
                 <ul className="space-y-6 relative z-10">
                    <li className="flex items-start gap-4 text-white font-medium"><Zap className="text-cyan-400 mt-1" size={16}/> Direct Push Notification Delivery</li>
                    <li className="flex items-start gap-4 text-white font-medium"><Shield className="text-cyan-400 mt-1" size={16}/> 100% Verified Human Audience</li>
                    <li className="flex items-start gap-4 text-white font-medium"><Eye className="text-cyan-400 mt-1" size={16}/> Active Engagement (Status Views)</li>
                    <li className="flex items-start gap-4 text-white font-medium"><Users className="text-cyan-400 mt-1" size={16}/> High Trust (Friend Recommendation)</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 md:py-32 relative bg-black/20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: t('stats.reach'), value: '1.2M+', icon: <Globe2 size={24} className="text-cyan-400" />, color: 'border-cyan-500/30' },
              { label: t('stats.influencers'), value: '5K+', icon: <Users size={24} className="text-purple-500" />, color: 'border-purple-500/30' },
              { label: t('stats.brands'), value: '850+', icon: <LayoutDashboard size={24} className="text-gold-500" />, color: 'border-gold-500/30' },
              { label: t('stats.satisfaction'), value: '98%', icon: <Target size={24} className="text-green-500" />, color: 'border-green-500/30' },
            ].map((stat, i) => (
               <div key={i} className={`p-6 md:p-8 bg-white/[0.02] border ${stat.color} rounded-xl backdrop-blur-md hover:bg-white/[0.05] transition-all group relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="p-2 md:p-3 bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform shadow-lg">{stat.icon}</div>
                    <Activity className="text-neutral-700 group-hover:text-white transition-colors" size={16}/>
                  </div>
                  <p className="text-3xl md:text-4xl lg:text-6xl font-thin text-white mb-2 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">{stat.value}</p>
                  <p className="text-neutral-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">{stat.label}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ECOSYSTEM (NEW) --- */}
      <section className="py-24 border-y border-white/5 bg-midnight-950 relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
         <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10 text-center md:text-left">
            <div>
               <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{t('eco.title')}</h3>
               <p className="text-neutral-500 text-sm max-w-md mx-auto md:mx-0">{t('eco.subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex flex-col items-center gap-2"><Server size={32} className="text-white"/><span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">API</span></div>
               <div className="flex flex-col items-center gap-2"><Database size={32} className="text-green-500"/><span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">CRM</span></div>
               <div className="flex flex-col items-center gap-2"><LinkIcon size={32} className="text-blue-500"/><span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Zapier</span></div>
               <div className="flex flex-col items-center gap-2"><Zap size={32} className="text-gold-500"/><span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Pixel</span></div>
            </div>
         </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-16 md:py-40 bg-black/20 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-16 md:mb-32 flex flex-col md:flex-row items-start md:items-end justify-between">
            <div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">The <span className="text-gold-500">System</span></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-cyan-500"></div>
            </div>
            <p className="mt-6 md:mt-0 text-neutral-500 max-w-sm text-left md:text-right font-light">
              Engineered for maximum velocity. <br/>From concept to viral in 3 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <ScanFace size={40}/>, title: t('steps.s1_title'), desc: t('steps.s1_desc'), step: '01', color: 'text-cyan-400', border: 'hover:border-cyan-500/50', shadow: 'hover:shadow-cyan-500/20', bgHover: 'group-hover:bg-cyan-900/10' },
                { icon: <MousePointerClick size={40}/>, title: t('steps.s2_title'), desc: t('steps.s2_desc'), step: '02', color: 'text-purple-400', border: 'hover:border-purple-500/50', shadow: 'hover:shadow-purple-500/20', bgHover: 'group-hover:bg-purple-900/10' },
                { icon: <Rocket size={40}/>, title: t('steps.s3_title'), desc: t('steps.s3_desc'), step: '03', color: 'text-gold-500', border: 'hover:border-gold-500/50', shadow: 'hover:shadow-gold-500/20', bgHover: 'group-hover:bg-gold-900/10' },
              ].map((step, i) => (
                <div key={i} className={`group p-8 md:p-12 relative bg-white/[0.02] border border-white/10 ${step.border} transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${step.bgHover} hover:shadow-2xl ${step.shadow} rounded-2xl overflow-hidden backdrop-blur-md`}>
                  <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10 font-black text-6xl md:text-8xl text-white select-none transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-20 animate-float">
                    {step.step}
                  </div>
                  <div className="relative z-10">
                     <div className={`mb-8 p-5 inline-block rounded-2xl bg-white/5 border border-white/10 ${step.color} shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out group-hover:bg-white/10 group-hover:shadow-[0_0_30px_currentColor] animate-float`}>
                        {step.icon}
                     </div>
                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                     <p className="text-neutral-400 leading-relaxed font-light text-sm group-hover:text-white transition-colors duration-300">{step.desc}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${step.color} shadow-[0_-5px_15px_currentColor]`}></div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* --- AUDIENCE BENTO GRID --- */}
      <section className="py-16 md:py-40 bg-midnight-950/30 relative">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
               <div>
                  <h2 className="text-4xl md:text-6xl font-thin tracking-tighter mb-4 text-white">Target <span className="font-bold text-cyan-400">Audience</span></h2>
                  <p className="text-neutral-400 max-w-md">{t('audience.subtitle')}</p>
               </div>
               <button onClick={() => onNavigate('create')} className="text-cyan-400 hover:text-white uppercase tracking-widest text-xs font-bold border-b border-cyan-500 pb-1 mt-8 md:mt-0 transition-colors shadow-[0_4px_20px_rgba(6,182,212,0.2)]">{t('audience.explore')}</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-auto md:h-[700px]">
               <HoloCard 
                 onClick={() => onNavigate('create')}
                 className="col-span-1 md:col-span-2 md:row-span-2 p-8 md:p-12 border border-white/10 hover:border-gold-500/50 rounded-2xl"
                 icon={<Martini size={240} strokeWidth={0.5} />}
                 iconClass="text-gold-500"
                 colorClass="bg-gold-500"
                 title={t('audience.rest')}
                 desc={t('audience.rest_desc')}
               />
               <HoloCard 
                 onClick={() => onNavigate('create')} 
                 className="col-span-1 md:col-span-2 border border-white/10 hover:border-purple-500/50 p-8 md:p-10 rounded-2xl"
                 icon={<Music2 size={180} strokeWidth={0.5} />}
                 iconClass="text-purple-500"
                 colorClass="bg-purple-500"
                 title={t('audience.events')}
                 desc={t('audience.events_desc')}
               />
               <HoloCard 
                  onClick={() => onNavigate('create')} 
                  className="col-span-1 border border-white/10 hover:border-pink-500/50 p-8 md:p-10 rounded-2xl"
                  icon={<ShoppingBag size={140} strokeWidth={0.5} />}
                  iconClass="text-pink-500"
                  colorClass="bg-pink-500"
                  title={t('audience.fashion')}
                  desc={t('audience.fashion_desc')}
               />
               <HoloCard 
                  onClick={() => onNavigate('create')} 
                  className="col-span-1 border border-white/10 hover:border-cyan-500/50 p-8 md:p-10 rounded-2xl"
                  icon={<Briefcase size={140} strokeWidth={0.5} />}
                  iconClass="text-cyan-400"
                  colorClass="bg-cyan-500"
                  title={t('audience.services')}
                  desc={t('audience.services_desc')}
               />
            </div>
         </div>
      </section>

      {/* --- PRICING --- */}
      <section className="py-16 md:py-40 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-4xl md:text-7xl font-thin text-white mb-6 tracking-tighter uppercase">{t('pricing.title')}</h2>
            <p className="text-neutral-400 font-mono text-sm">{t('pricing.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(PACKAGES).map((pkg) => (
              <div key={pkg.name} className={`p-8 md:p-10 rounded-3xl border transition-all duration-500 group relative flex flex-col backdrop-blur-xl ${
                 pkg.name === 'Growth' 
                  ? 'bg-gradient-to-b from-neutral-900/80 to-black/80 border-gold-500 shadow-[0_0_40px_rgba(234,179,8,0.1)] order-first md:order-none scale-105 md:scale-100' 
                  : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/50'
              }`}>
                {pkg.name === 'Growth' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    {t('pricing.most_popular')}
                  </div>
                )}
                
                <h3 className={`text-3xl font-black mb-4 tracking-tight uppercase ${pkg.name === 'Growth' ? 'text-gold-500' : 'text-white'}`}>{pkg.name}</h3>
                
                <div className="flex items-baseline mb-8 pb-8 border-b border-white/10">
                  <span className="text-4xl md:text-5xl font-thin text-white tracking-tighter">{pkg.price.toLocaleString()}</span>
                  <span className="text-neutral-500 ml-2 text-xs font-bold uppercase">XOF</span>
                </div>
                
                <p className="text-neutral-400 text-sm mb-8 h-auto md:h-12 leading-relaxed">{pkg.description}</p>
                
                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs font-bold text-neutral-300 uppercase tracking-wide">
                      <CheckCircle2 className={`w-4 h-4 mr-3 shrink-0 ${pkg.name === 'Growth' ? 'text-gold-500' : 'text-cyan-500'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => onNavigate('create')}
                  className={`w-full py-5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-xl ${
                    pkg.name === 'Growth' 
                      ? 'bg-gold-500 text-black hover:bg-gold-400 hover:shadow-[0_0_20px_#eab308]' 
                      : 'bg-white/5 text-white hover:bg-cyan-500 hover:text-black border border-white/10 hover:border-cyan-500'
                  }`}
                >
                  {t('pricing.choose')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ACADEMY (NEW) --- */}
      <section className="py-24 bg-midnight-950/60 relative">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <GraduationCap size={48} className="mx-auto text-purple-500 mb-6"/>
            <h2 className="text-4xl font-thin text-white mb-8 tracking-tighter uppercase">{t('academy.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { t: t('academy.c1'), c: 'bg-purple-500/10' },
                  { t: t('academy.c2'), c: 'bg-cyan-500/10' },
                  { t: t('academy.c3'), c: 'bg-gold-500/10' },
               ].map((c, i) => (
                  <div key={i} className={`${c.c} border border-white/5 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer`}>
                     <h4 className="text-white font-bold text-sm uppercase">{c.t}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="relative py-16 md:py-40 overflow-hidden">
        {testimonialBgs.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === activeTestimonialBg ? 'opacity-20' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/90 to-midnight-950"></div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <Quote size={48} className="mx-auto text-gold-500 mb-6 opacity-50"/>
            <h2 className="text-4xl md:text-6xl font-thin text-white tracking-tighter uppercase mb-4">{t('testimonials.title')}</h2>
            <p className="text-neutral-400">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { q: t('testimonials.t1_quote'), a: t('testimonials.t1_author'), r: t('testimonials.t1_role'), img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" },
              { q: t('testimonials.t2_quote'), a: t('testimonials.t2_author'), r: t('testimonials.t2_role'), img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop" },
              { q: t('testimonials.t3_quote'), a: t('testimonials.t3_author'), r: t('testimonials.t3_role'), img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" },
            ].map((tItem, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-2xl backdrop-blur-xl hover:border-gold-500/30 transition-colors group">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-gold-500 fill-gold-500"/>)}
                </div>
                <p className="text-lg text-neutral-300 mb-8 font-light italic leading-relaxed">"{tItem.q}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={tItem.img} alt={tItem.a} className="w-12 h-12 rounded-full border border-white/20 object-cover group-hover:border-gold-500 transition-colors"/>
                  <div>
                    <div className="text-white font-bold">{tItem.a}</div>
                    <div className="text-cyan-500 text-xs uppercase tracking-wider">{tItem.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 max-w-3xl mx-auto px-6">
         <h2 className="text-4xl font-thin mb-12 text-center tracking-tighter uppercase">{t('faq.title')}</h2>
         <div className="space-y-4">
            {[
              { q: t('faq.q1'), a: t('faq.a1') },
              { q: t('faq.q2'), a: t('faq.a2') },
              { q: t('faq.q3'), a: t('faq.a3') },
              { q: t('faq.q4'), a: t('faq.a4') },
            ].map((item, i) => (
               <div key={i} className="group bg-white/[0.02] border border-white/5 rounded-xl px-6 md:px-8 transition-all hover:border-cyan-500/30 backdrop-blur-md">
                  <button 
                     onClick={() => toggleFaq(i)}
                     className="w-full flex items-center justify-between py-6 text-left group-hover:text-cyan-400 transition-colors"
                  >
                     <span className="font-bold text-base md:text-lg">{item.q}</span>
                     {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                     <p className="text-neutral-400 leading-relaxed font-light text-sm">{item.a}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-16 md:py-40 relative overflow-hidden flex items-center justify-center text-center px-6 bg-gradient-to-r from-gold-600 to-amber-700">
         <div className="absolute inset-0 bg-black/10"></div>
         <div className="relative z-10">
            <h2 className="text-5xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">Global Scale.<br/>Local Roots.</h2>
            <button 
               onClick={() => onNavigate('create')}
               className="px-12 md:px-20 py-6 md:py-8 bg-black text-white text-sm font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl border border-white/20 hover:border-gold-500 w-full md:w-auto"
            >
              {t('hero.cta_start')}
            </button>
         </div>
      </section>
    </div>
  );
};
