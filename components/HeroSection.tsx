import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Globe2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState(0);

  const heroVideos = [
    "https://player.vimeo.com/external/371836154.sd.mp4?s=d01777207125712f84b64e05b38f8306306059d0&profile_id=165&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/517090025.sd.mp4?s=1d577a76059952002779f678201a43a0d33e9b88&profile_id=164&oauth2_token_id=57447761",
    "https://player.vimeo.com/external/451837014.sd.mp4?s=5481d9f8546114a905862363102436d64923e51a&profile_id=164&oauth2_token_id=57447761"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideo((prev) => (prev + 1) % heroVideos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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

  const stats = [
    { icon: <Users className="text-cyan-400" size={24} />, value: '5K+', label: 'Influenceurs Actifs' },
    { icon: <Globe2 className="text-purple-500" size={24} />, value: '1.2M+', label: 'Portée Totale' },
    { icon: <TrendingUp className="text-gold-500" size={24} />, value: '340%', label: 'ROI Moyen' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Video Background */}
      <div className="absolute inset-0 z-0">
        {heroVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === activeVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/90 via-midnight-950/70 to-midnight-950/90"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      </div>

      {/* Parallax Glow Effect */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full border border-cyan-500/30 backdrop-blur-xl mb-8 bg-cyan-900/20 animate-fade-in-up shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform">
          <Sparkles className="w-4 h-4 text-cyan-400 mr-3 animate-pulse" />
          <span className="text-cyan-200 text-xs font-bold uppercase tracking-widest">
            {t('hero.new')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.9] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t('hero.title_start')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-cyan-400 to-purple-500 animate-shimmer bg-[length:200%_auto]">
            {t('hero.title_end')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-neutral-300 mb-12 font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => onNavigate('create')}
            className="group relative px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] overflow-hidden rounded-lg"
          >
            <span className="relative z-10 flex items-center">
              {t('hero.cta_start')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          </button>

          <button
            onClick={() => onNavigate('influencer')}
            className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-widest transition-all border border-white/20 hover:border-cyan-400/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-lg hover:text-cyan-400"
          >
            {t('hero.cta_influencer')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

