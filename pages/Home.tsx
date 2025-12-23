import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Globe2, Users, LayoutDashboard, Utensils, Music, ShoppingBag, 
  Building2, Smartphone, Rocket, MousePointerClick, ScanFace, Quote, Star, 
  Plus, Minus, Activity, Martini, Music2, Mic2, Gem, Briefcase, CheckCircle2, 
  Target, Zap, Shield, Server, Database, XCircle, Eye, Calculator, FileText, 
  Lock, Fingerprint, Link as LinkIcon, GraduationCap, TrendingUp, Award,
  BarChart3, DollarSign, Clock, Sparkles, Play, Image as ImageIcon, 
  MessageSquare, Bell, BarChart, TrendingDown, ArrowUpRight, Award as AwardIcon,
  Coins, Timer, CheckCircle, XCircle as XCircleIcon, AlertCircle
} from 'lucide-react';
import { PACKAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { HeroSection } from '../components/HeroSection';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { FloatingElements } from '../components/FloatingElements';
import { TrustBadges, SocialProof } from '../components/TrustBadges';
import { CTAButton, FeatureList, TestimonialCard, StatCard } from '../components/ConversionElements';
import { FeatureShowcase } from '../components/FeatureShowcase';
import { ComparisonTable } from '../components/ComparisonTable';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { SuccessMetrics } from '../components/SuccessMetrics';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { GlowEffect } from '../components/GlowEffect';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [roiBudget, setRoiBudget] = useState(50000);
  const [activeCase, setActiveCase] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  const testimonialBgs = [
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(testimonialInterval);
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const partners = [
    { name: "MTN", url: "https://www.mtn.bj", logo: "https://logos-world.net/wp-content/uploads/2021/02/MTN-Logo.png" },
    { name: "MOOV AFRICA", url: "https://www.moov-africa.bj", logo: "https://www.moov-africa.bj/wp-content/uploads/2021/05/logo-moov.png" },
    { name: "WAVE", url: "https://www.wave.com/en/benin/", logo: "https://wave.com/wp-content/uploads/2021/06/wave-logo.png" },
    { name: "CANAL+", url: "https://www.canalplus-afrique.com/bj", logo: "https://www.canalplus-afrique.com/wp-content/uploads/2020/06/logo-canal-plus.png" },
    { name: "JUMIA", url: "https://www.jumia.bj", logo: "https://logos-world.net/wp-content/uploads/2020/11/Jumia-Logo.png" },
    { name: "ENGIE", url: "https://www.engie-energyaccess.com", logo: "https://www.engie.com/wp-content/uploads/2020/01/engie-logo.png" },
    { name: "BOA", url: "https://www.boagroup.com", logo: "https://www.boagroup.com/wp-content/uploads/2021/05/boa-logo.png" },
    { name: "ORABANK", url: "https://www.orabank.net/fr/filiale/benin", logo: "https://www.orabank.net/wp-content/uploads/2021/05/orabank-logo.png" }
  ];

  const marqueeContent = [...partners, ...partners, ...partners];

  const estReach = Math.floor(roiBudget / 5);
  const estConv = Math.floor(estReach * 0.015);
  const estRev = estConv * 15000;

  const HoloCard = ({ icon, title, desc, onClick, className, colorClass, iconClass }: any) => {
    return (
      <div 
        onClick={onClick}
        className={`relative overflow-hidden group cursor-pointer ${className} glass border border-white/10 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] hover:border-white/20 min-h-[300px] rounded-2xl`}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${colorClass}`}></div>
        
        <div className="relative z-20 h-full flex flex-col justify-end p-8">
           <div className={`absolute top-8 right-8 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 opacity-10 group-hover:opacity-20 ${iconClass}`}>
             {icon}
           </div>
           
           <div className="relative z-10 border-t border-white/5 pt-8 mt-auto">
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

  const extendedFaq = [
    { 
      q: 'How quickly can I launch a campaign?', 
      a: 'You can launch a campaign in under 2 minutes. Simply upload your creative, choose your package, and make payment. Our AI automatically matches you with the best influencers and deploys your campaign instantly via WhatsApp.' 
    },
    { 
      q: 'How do you verify influencers?', 
      a: 'Every influencer goes through a strict verification process. We check their follower count, engagement rates, and require proof of their audience. We also use AI to detect fake followers and bots. Only verified influencers with real engagement are approved.' 
    },
    { 
      q: 'What payment methods do you accept?', 
      a: 'We accept MTN Mobile Money, Moov Money, Wave, PayTech, and credit cards. All payments are processed securely with 256-bit SSL encryption. Your payment information is never stored on our servers.' 
    },
    { 
      q: 'How do influencers get paid?', 
      a: 'Influencers receive payment within 24 hours after campaign completion. Payments are made directly to their Mobile Money account (MTN, Moov, or Wave). The process is fully automated - no manual intervention needed.' 
    },
    { 
      q: 'Can I track campaign performance in real-time?', 
      a: 'Yes! Our dashboard provides real-time analytics including views, engagement, clicks, and conversions. You can see exactly how your campaign is performing as it happens, with detailed reports available for download.' 
    },
    { 
      q: 'What happens if an influencer doesn\'t post?', 
      a: 'We have a 100% completion guarantee. If an influencer fails to post, we automatically assign a replacement influencer at no extra cost. Our system tracks all posts and verifies completion before payment.' 
    },
    { 
      q: 'Can I target specific locations?', 
      a: 'Yes! You can target by city, neighborhood, or even specific areas. Our platform allows you to select influencers based on their location to ensure your message reaches the right audience.' 
    },
    { 
      q: 'What\'s the minimum budget?', 
      a: 'Our Starter package starts at just 15,000 XOF. This includes 5 verified influencers and is perfect for small businesses or testing the platform. No hidden fees, no contracts required.' 
    },
    { 
      q: 'Do you offer refunds?', 
      a: 'We offer a 100% satisfaction guarantee. If you\'re not happy with your campaign results, contact us within 7 days and we\'ll work with you to make it right or provide a full refund.' 
    },
    { 
      q: 'How do I know my campaign is working?', 
      a: 'You\'ll receive real-time notifications when influencers post your content. Our dashboard shows live metrics including reach, engagement, and conversions. You can also request detailed reports at any time.' 
    },
  ];

  return (
    <div className="text-white overflow-hidden bg-transparent relative">
      {/* Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Live Activity Section */}
      <section 
        className="glass-panel border-b border-white/5 py-12 relative overflow-hidden backdrop-blur-md"
        data-animate
        id="activity"
      >
        <AnimatedBackground type="grid" />
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
          <div className="flex items-center gap-6">
            <div className="relative p-4 bg-cyan-500/10 rounded-full border border-cyan-500/30 animate-pulse">
              <Activity className="text-cyan-400" size={28}/>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></span>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl tracking-tight">Live Network Activity</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-cyan-500/70 text-sm uppercase tracking-widest font-mono">
                  Burger King Launched Campaign #4291
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-8 text-center">
            <StatCard value={<AnimatedCounter value={42} />} label="Active Now" icon={<Activity className="text-cyan-400" size={24} />} color="cyan" />
            <StatCard value="12m" label="Avg Response" icon={<Clock className="text-gold-500" size={24} />} color="gold" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* ROI Simulator */}
      <section 
        className="py-24 relative bg-black/40 border-b border-white/5"
        data-animate
        id="roi"
      >
        <AnimatedBackground type="gradient" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-thin tracking-tighter mb-6 text-white">
                {t('roi.title')}
              </h2>
              <p className="text-neutral-400 text-lg mb-4">{t('roi.subtitle')}</p>
              <p className="text-neutral-500 text-sm mb-12">
                Calculate your potential return on investment. Based on real campaign data from 850+ brands.
              </p>
              
              <div className="mb-10">
                <div className="flex justify-between mb-4">
                  <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">
                    {t('roi.budget')}
                  </span>
                  <span className="text-white font-mono font-bold text-xl">
                    {roiBudget.toLocaleString()} XOF
                  </span>
                </div>
                <input 
                  type="range" 
                  min="15000" 
                  max="1000000" 
                  step="5000" 
                  value={roiBudget} 
                  onChange={(e) => setRoiBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none accent-gold-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-neutral-600 mt-2">
                  <span>15K XOF</span>
                  <span>1M XOF</span>
                </div>
              </div>

              <CTAButton onClick={() => onNavigate('create')} variant="primary">
                Start Your Campaign
              </CTAButton>
            </div>

            <div className="glass-panel border border-white/10 rounded-3xl p-8 relative shadow-2xl">
              <div className="absolute top-4 right-4 text-cyan-500/20">
                <Calculator size={100}/>
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="glass p-6 rounded-2xl border border-white/5">
                  <p className="text-neutral-500 uppercase tracking-widest text-xs mb-2">
                    {t('roi.est_reach')}
                  </p>
                  <p className="text-4xl font-black text-cyan-400">
                    <AnimatedCounter value={estReach} duration={1500} /> <span className="text-lg text-white font-thin">Views</span>
                  </p>
                  <p className="text-xs text-neutral-600 mt-2">Based on average engagement rates</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-white/5">
                  <p className="text-neutral-500 uppercase tracking-widest text-xs mb-2">
                    {t('roi.est_conv')}
                  </p>
                  <p className="text-4xl font-black text-purple-400">
                    ~<AnimatedCounter value={estConv} duration={1500} /> <span className="text-lg text-white font-thin">Sales</span>
                  </p>
                  <p className="text-xs text-neutral-600 mt-2">1.5% average conversion rate</p>
                </div>
                <div className="bg-gradient-to-r from-gold-500/20 to-transparent p-6 rounded-2xl border border-gold-500/30">
                  <p className="text-gold-500 uppercase tracking-widest text-xs mb-2">
                    {t('roi.est_rev')}
                  </p>
                  <p className="text-5xl font-black text-white">
                    <AnimatedCounter value={estRev} duration={2000} /> <span className="text-lg text-neutral-400 font-thin">XOF</span>
                  </p>
                  <p className="text-xs text-neutral-600 mt-2">Based on 15,000 XOF average basket</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 mt-6 text-center">
                {t('roi.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Success Metrics */}
      <SuccessMetrics />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Case Studies */}
      <section 
        className="py-24 bg-midnight-950/50 relative"
        data-animate
        id="cases"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
              {t('cases.title')}
            </h2>
            <p className="text-neutral-500 font-mono text-sm">{t('cases.subtitle')}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex md:flex-col gap-4 overflow-x-auto pb-4 md:pb-0 md:w-1/4 no-scrollbar">
              {['Burger King', 'Canal+', 'MTN'].map((brand, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveCase(i)}
                  className={`px-6 py-4 rounded-xl text-left border transition-all whitespace-nowrap ${
                    activeCase === i 
                      ? 'glass border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                      : 'border-white/5 text-neutral-500 hover:bg-white/5'
                  }`}
                >
                  <span className="font-bold">{brand}</span>
                </button>
              ))}
            </div>

            <div className="flex-1 glass-panel border border-white/10 rounded-2xl p-8 md:p-12 relative min-h-[400px] flex items-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              {activeCase === 0 && (
                <div className="animate-fade-in w-full">
                  <div className="text-gold-500 font-mono text-xs uppercase mb-4">
                    CONFIDENTIAL REPORT #BK-229
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">{t('cases.bk_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-6xl font-thin text-cyan-400 mb-2">340%</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">Sales Uplift</div>
                    </div>
                    <div>
                      <div className="text-6xl font-thin text-purple-400 mb-2">12k</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">Shared Stories</div>
                    </div>
                  </div>
                  <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">
                    {t('cases.bk_res')}
                  </p>
                  <button className="flex items-center text-cyan-400 hover:text-white uppercase text-xs font-bold tracking-widest gap-2">
                    {t('cases.btn_read')} <ArrowRight size={14}/>
                  </button>
                </div>
              )}
              {activeCase === 1 && (
                <div className="animate-fade-in w-full">
                  <div className="text-gold-500 font-mono text-xs uppercase mb-4">
                    CONFIDENTIAL REPORT #CP-229
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">{t('cases.c_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-6xl font-thin text-green-400 mb-2">1.5k</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">New Subs</div>
                    </div>
                    <div>
                      <div className="text-6xl font-thin text-white mb-2">48h</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">Campaign Duration</div>
                    </div>
                  </div>
                  <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">
                    {t('cases.c_res')}
                  </p>
                </div>
              )}
              {activeCase === 2 && (
                <div className="animate-fade-in w-full">
                  <div className="text-gold-500 font-mono text-xs uppercase mb-4">
                    CONFIDENTIAL REPORT #MTN-229
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">{t('cases.mtn_title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-6xl font-thin text-yellow-400 mb-2">12k+</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">App Installs</div>
                    </div>
                    <div>
                      <div className="text-6xl font-thin text-cyan-400 mb-2">0.05$</div>
                      <div className="text-xs text-neutral-500 uppercase tracking-widest">CPI (Cost Per Install)</div>
                    </div>
                  </div>
                  <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">
                    {t('cases.mtn_res')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Trust Protocol */}
      <section 
        className="py-24 bg-black relative"
        data-animate
        id="trust"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 tracking-tighter uppercase">
            {t('trust.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block z-0"></div>
            
            {[
              { icon: <ScanFace size={32}/>, title: t('trust.s1'), desc: t('trust.s1_d'), color: 'text-cyan-400' },
              { icon: <Fingerprint size={32}/>, title: t('trust.s2'), desc: t('trust.s2_d'), color: 'text-purple-400' },
              { icon: <Lock size={32}/>, title: t('trust.s3'), desc: t('trust.s3_d'), color: 'text-gold-500' },
            ].map((step, i) => (
              <div 
                key={i} 
                className="relative z-10 glass-panel border border-white/10 p-8 rounded-2xl flex flex-col items-center hover:border-white/30 transition-colors"
              >
                <div className={`p-4 rounded-full bg-white/5 mb-6 ${step.color} shadow-lg shadow-white/5`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase">{step.title}</h3>
                <p className="text-neutral-500 text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VS Section */}
      <section 
        className="py-24 relative bg-midnight-950"
        data-animate
        id="vs"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              The Paradigm <span className="text-gold-500">Shift</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base">
              Stop burning cash on algorithms. Start investing in people.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
            <div className="glass p-10 rounded-3xl border border-white/5 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <h3 className="text-xl font-bold text-neutral-500 mb-8 uppercase tracking-widest flex items-center gap-3">
                <XCircle className="text-red-500"/> Old Marketing
              </h3>
              <FeatureList features={[
                'Unpredictable Algorithm Changes',
                'Bot Traffic & Fake Clicks',
                'Passive Scrolling (Banner Blindness)',
                'Low Trust Factor',
                'Slow Setup (Days)',
                'High Costs, Low ROI'
              ]} icon={<XCircleIcon className="text-red-500" size={20} />} />
            </div>

            <div className="glass-panel p-10 rounded-3xl border border-cyan-500/30 bg-cyan-900/10 relative overflow-hidden group hover:border-cyan-500 transition-colors shadow-[0_0_50px_rgba(6,182,212,0.1)]">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-3 relative z-10">
                <CheckCircle2 className="text-cyan-400"/> KwikAds System
              </h3>
              <FeatureList features={[
                'Direct Push Notification Delivery',
                '100% Verified Human Audience',
                'Active Engagement (Status Views)',
                'High Trust (Friend Recommendation)',
                'Instant Deployment (< 2 min)',
                'Proven 340% Average ROI'
              ]} icon={<CheckCircle className="text-cyan-400" size={20} />} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-24 relative bg-black/20"
        data-animate
        id="stats"
      >
        <AnimatedBackground type="particles" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: t('stats.reach'), value: '1.2M+', icon: <Globe2 size={24} className="text-cyan-400" />, color: 'border-cyan-500/30' },
              { label: t('stats.influencers'), value: '5K+', icon: <Users size={24} className="text-purple-500" />, color: 'border-purple-500/30' },
              { label: t('stats.brands'), value: '850+', icon: <LayoutDashboard size={24} className="text-gold-500" />, color: 'border-gold-500/30' },
              { label: t('stats.satisfaction'), value: '98%', icon: <Target size={24} className="text-green-500" />, color: 'border-green-500/30' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`glass p-8 border ${stat.color} rounded-xl hover:bg-white/[0.05] transition-all group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-3 glass rounded-lg border border-white/10 group-hover:scale-110 transition-transform shadow-lg">
                    {stat.icon}
                  </div>
                  <Activity className="text-neutral-700 group-hover:text-white transition-colors" size={16}/>
                </div>
                <p className="text-4xl md:text-6xl font-thin text-white mb-2 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all relative z-10">
                  {stat.value}
                </p>
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors relative z-10">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        className="py-24 bg-black/20 relative"
        data-animate
        id="how"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-32 flex flex-col md:flex-row items-start md:items-end justify-between">
            <div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
                The <span className="text-gold-500">System</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-cyan-500"></div>
            </div>
            <p className="mt-6 md:mt-0 text-neutral-500 max-w-sm text-left md:text-right font-light">
              Engineered for maximum velocity. <br/>From concept to viral in 3 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ScanFace size={40}/>, 
                title: t('steps.s1_title'), 
                desc: t('steps.s1_desc'), 
                step: '01', 
                color: 'text-cyan-400', 
                border: 'hover:border-cyan-500/50', 
                shadow: 'hover:shadow-cyan-500/20', 
                bgHover: 'group-hover:bg-cyan-900/10' 
              },
              { 
                icon: <MousePointerClick size={40}/>, 
                title: t('steps.s2_title'), 
                desc: t('steps.s2_desc'), 
                step: '02', 
                color: 'text-purple-400', 
                border: 'hover:border-purple-500/50', 
                shadow: 'hover:shadow-purple-500/20', 
                bgHover: 'group-hover:bg-purple-900/10' 
              },
              { 
                icon: <Rocket size={40}/>, 
                title: t('steps.s3_title'), 
                desc: t('steps.s3_desc'), 
                step: '03', 
                color: 'text-gold-500', 
                border: 'hover:border-gold-500/50', 
                shadow: 'hover:shadow-gold-500/20', 
                bgHover: 'group-hover:bg-gold-900/10' 
              },
            ].map((step, i) => (
              <div 
                key={i} 
                className={`group glass p-12 border border-white/10 ${step.border} transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${step.bgHover} hover:shadow-2xl ${step.shadow} rounded-2xl overflow-hidden backdrop-blur-md`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl text-white select-none transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-20 animate-float">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className={`mb-8 p-5 inline-block rounded-2xl glass border border-white/10 ${step.color} shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out group-hover:bg-white/10 group-hover:shadow-[0_0_30px_currentColor] animate-float`}>
                    {step.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed font-light text-sm group-hover:text-white transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${step.color} shadow-[0_-5px_15px_currentColor]`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Bento Grid */}
      <section 
        className="py-24 bg-midnight-950/30 relative"
        data-animate
        id="audience"
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-5xl md:text-6xl font-thin tracking-tighter mb-4 text-white">
                Target <span className="font-bold text-cyan-400">Audience</span>
              </h2>
              <p className="text-neutral-400 max-w-md">{t('audience.subtitle')}</p>
            </div>
            <button 
              onClick={() => onNavigate('create')} 
              className="text-cyan-400 hover:text-white uppercase tracking-widest text-xs font-bold border-b border-cyan-500 pb-1 mt-8 md:mt-0 transition-colors shadow-[0_4px_20px_rgba(6,182,212,0.2)]"
            >
              {t('audience.explore')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-auto md:h-[700px]">
            <HoloCard 
              onClick={() => onNavigate('create')}
              className="col-span-1 md:col-span-2 md:row-span-2"
              icon={<Martini size={240} strokeWidth={0.5} />}
              iconClass="text-gold-500"
              colorClass="bg-gold-500"
              title={t('audience.rest')}
              desc={t('audience.rest_desc')}
            />
            <HoloCard 
              onClick={() => onNavigate('create')} 
              className="col-span-1 md:col-span-2"
              icon={<Music2 size={180} strokeWidth={0.5} />}
              iconClass="text-purple-500"
              colorClass="bg-purple-500"
              title={t('audience.events')}
              desc={t('audience.events_desc')}
            />
            <HoloCard 
              onClick={() => onNavigate('create')} 
              className="col-span-1"
              icon={<ShoppingBag size={140} strokeWidth={0.5} />}
              iconClass="text-pink-500"
              colorClass="bg-pink-500"
              title={t('audience.fashion')}
              desc={t('audience.fashion_desc')}
            />
            <HoloCard 
              onClick={() => onNavigate('create')} 
              className="col-span-1"
              icon={<Briefcase size={140} strokeWidth={0.5} />}
              iconClass="text-cyan-400"
              colorClass="bg-cyan-500"
              title={t('audience.services')}
              desc={t('audience.services_desc')}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section 
        className="py-24 border-t border-white/5 relative"
        data-animate
        id="pricing"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-thin text-white mb-6 tracking-tighter uppercase">
              {t('pricing.title')}
            </h2>
            <p className="text-neutral-400 font-mono text-sm mb-4">{t('pricing.subtitle')}</p>
            <p className="text-neutral-500 text-sm max-w-2xl mx-auto">
              Choose the package that fits your needs. All packages include real-time analytics, 
              verified influencers, and 24/7 support. No hidden fees, no contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(PACKAGES).map((pkg) => (
              <div 
                key={pkg.name} 
                className={`glass p-10 rounded-3xl border transition-all duration-500 group relative flex flex-col backdrop-blur-xl ${
                  pkg.name === 'Growth' 
                    ? 'bg-gradient-to-b from-neutral-900/80 to-black/80 border-gold-500 shadow-[0_0_40px_rgba(234,179,8,0.1)] scale-105 md:scale-100' 
                    : 'border-white/10 hover:border-cyan-500/50'
                }`}
              >
                {pkg.name === 'Growth' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    {t('pricing.most_popular')}
                  </div>
                )}
                
                <h3 className={`text-3xl font-black mb-4 tracking-tight uppercase ${
                  pkg.name === 'Growth' ? 'text-gold-500' : 'text-white'
                }`}>
                  {pkg.name}
                </h3>
                
                <div className="flex items-baseline mb-8 pb-8 border-b border-white/10">
                  <span className="text-5xl font-thin text-white tracking-tighter">
                    {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-neutral-500 ml-2 text-xs font-bold uppercase">XOF</span>
                </div>
                
                <p className="text-neutral-400 text-sm mb-8 h-12 leading-relaxed">
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-12 flex-grow">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs font-bold text-neutral-300 uppercase tracking-wide">
                      <CheckCircle2 className={`w-4 h-4 mr-3 shrink-0 ${
                        pkg.name === 'Growth' ? 'text-gold-500' : 'text-cyan-500'
                      }`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <CTAButton 
                  onClick={() => onNavigate('create')}
                  variant={pkg.name === 'Growth' ? 'primary' : 'secondary'}
                >
                  {t('pricing.choose')}
                </CTAButton>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center glass-panel border border-green-500/30 p-8 rounded-2xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="text-green-400" size={24} />
              <h3 className="text-xl font-bold text-white">100% Satisfaction Guarantee</h3>
            </div>
            <p className="text-neutral-400">
              Not happy with your campaign? Contact us within 7 days for a full refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        className="relative py-24 overflow-hidden"
        data-animate
        id="testimonials"
      >
        {testimonialBgs.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === activeTestimonial ? 'opacity-20' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-midnight-900/90 to-midnight-950"></div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <Quote size={48} className="mx-auto text-gold-500 mb-6 opacity-50"/>
            <h2 className="text-5xl md:text-6xl font-thin text-white tracking-tighter uppercase mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-neutral-400">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote={t('testimonials.t1_quote')}
              author={t('testimonials.t1_author')}
              role={t('testimonials.t1_role')}
              company="Le Grill Cotonou"
              rating={5}
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
            />
            <TestimonialCard
              quote={t('testimonials.t2_quote')}
              author={t('testimonials.t2_author')}
              role={t('testimonials.t2_role')}
              company="Glow Spa"
              rating={5}
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
            />
            <TestimonialCard
              quote={t('testimonials.t3_quote')}
              author={t('testimonials.t3_author')}
              role={t('testimonials.t3_role')}
              company="Event Architect"
              rating={5}
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Extended FAQ */}
      <section 
        className="py-24 max-w-4xl mx-auto px-6"
        data-animate
        id="faq"
      >
        <h2 className="text-4xl font-thin mb-12 text-center tracking-tighter uppercase">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {extendedFaq.map((item, i) => (
            <div 
              key={i} 
              className="group glass border border-white/5 rounded-xl px-8 transition-all hover:border-cyan-500/30 backdrop-blur-md"
            >
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between py-6 text-left group-hover:text-cyan-400 transition-colors"
              >
                <span className="font-bold text-base md:text-lg pr-8">{item.q}</span>
                {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-neutral-400 leading-relaxed font-light text-sm">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden flex items-center justify-center text-center px-6 bg-gradient-to-r from-gold-600 to-amber-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
            Ready to <br/>Dominate?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join 850+ brands already using KwikAds to reach millions of customers. 
            Start your first campaign in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton onClick={() => onNavigate('create')} variant="primary" className="text-lg py-6">
              Launch Your Campaign
            </CTAButton>
            <CTAButton onClick={() => onNavigate('influencer')} variant="outline" className="text-lg py-6">
              Become an Influencer
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
};
