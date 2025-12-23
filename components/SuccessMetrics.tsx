import React from 'react';
import { TrendingUp, Users, DollarSign, Target, Award, Zap } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const SuccessMetrics: React.FC = () => {
  const metrics = [
    {
      icon: <TrendingUp className="text-cyan-400" size={32} />,
      value: 340,
      suffix: '%',
      label: 'Average ROI',
      description: 'Return on investment across all campaigns',
      color: 'cyan',
    },
    {
      icon: <Users className="text-purple-500" size={32} />,
      value: 5247,
      suffix: '+',
      label: 'Active Influencers',
      description: 'Verified creators ready to promote your brand',
      color: 'purple',
    },
    {
      icon: <DollarSign className="text-gold-500" size={32} />,
      value: 4.5,
      suffix: 'M XOF',
      label: 'Revenue Generated',
      description: 'Total revenue generated for our clients',
      color: 'gold',
    },
    {
      icon: <Target className="text-green-500" size={32} />,
      value: 98.2,
      suffix: '%',
      label: 'Satisfaction Rate',
      description: 'Clients who would recommend us',
      color: 'green',
    },
    {
      icon: <Award className="text-pink-500" size={32} />,
      value: 850,
      suffix: '+',
      label: 'Brands Trust Us',
      description: 'Companies using KwikAds platform',
      color: 'pink',
    },
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      value: 120,
      suffix: 'sec',
      label: 'Avg Deployment',
      description: 'Time from payment to influencer notification',
      color: 'yellow',
    },
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-midnight-950 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Numbers That <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-cyan-400">Speak</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Real results from real campaigns. No fluff, just facts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="glass-panel border border-white/10 p-8 rounded-2xl hover:border-cyan-500/50 transition-all group hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black ${`text-${metric.color}-400`}`}>
                    <AnimatedCounter value={metric.value} duration={2000} decimals={metric.value < 10 ? 1 : 0} />
                  </span>
                  <span className="text-2xl font-bold text-white">{metric.suffix}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                  {metric.label}
                </h3>
              </div>
              
              <p className="text-sm text-neutral-400 leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

