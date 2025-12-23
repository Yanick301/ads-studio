import React from 'react';
import { 
  Zap, Shield, TrendingUp, Clock, Globe2, Users, BarChart3, 
  Smartphone, Video, MessageCircle, Target, Award, Lock, 
  CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  stats?: string;
}

export const FeatureShowcase: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Zap className="text-gold-500" size={32} />,
      title: 'Lightning Fast Deployment',
      description: 'Launch campaigns in under 2 minutes. From creation to influencer assignment, everything is automated.',
      color: 'gold',
      stats: '< 2 min'
    },
    {
      icon: <Shield className="text-cyan-400" size={32} />,
      title: '100% Verified Audience',
      description: 'Every influencer is verified. No bots, no fake followers. Only real people with real engagement.',
      color: 'cyan',
      stats: '100%'
    },
    {
      icon: <TrendingUp className="text-purple-500" size={32} />,
      title: 'Proven ROI',
      description: 'Average 340% return on investment. Real results from real campaigns tracked in real-time.',
      color: 'purple',
      stats: '340%'
    },
    {
      icon: <Clock className="text-green-500" size={32} />,
      title: '24h Payouts',
      description: 'Influencers get paid within 24 hours after campaign completion. Fast, secure, automated.',
      color: 'green',
      stats: '24h'
    },
    {
      icon: <Globe2 className="text-pink-500" size={32} />,
      title: 'Multi-Platform',
      description: 'WhatsApp, TikTok, Instagram, Facebook, Snapchat. One platform, all channels covered.',
      color: 'pink',
      stats: '5+'
    },
    {
      icon: <BarChart3 className="text-yellow-500" size={32} />,
      title: 'Real-Time Analytics',
      description: 'Track performance, engagement, conversions, and ROI in real-time. Data-driven decisions.',
      color: 'yellow',
      stats: 'Live'
    },
  ];

  return (
    <section className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-cyan-400">KwikAds</span>?
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Built for speed, designed for results, trusted by 850+ brands across West Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass-panel border border-white/10 p-8 rounded-2xl hover:border-cyan-500/50 transition-all group hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                {feature.stats && (
                  <div className="text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                    {feature.stats}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

