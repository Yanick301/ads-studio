import React from 'react';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const features = [
    { feature: 'Human-Verified Audience', kwik: true, traditional: false },
    { feature: 'Instant Deployment', kwik: true, traditional: false },
    { feature: 'Real-Time Analytics', kwik: true, traditional: false },
    { feature: '24h Payouts', kwik: true, traditional: false },
    { feature: 'Multi-Platform Support', kwik: true, traditional: false },
    { feature: 'Automated Matching', kwik: true, traditional: false },
    { feature: 'Bot Traffic', kwik: false, traditional: true },
    { feature: 'Algorithm Dependency', kwik: false, traditional: true },
    { feature: 'Slow Setup (Days)', kwik: false, traditional: true },
    { feature: 'High Costs', kwik: false, traditional: true },
  ];

  return (
    <section className="py-24 relative bg-midnight-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">
            KwikAds vs <span className="text-neutral-500">Traditional Marketing</span>
          </h2>
          <p className="text-neutral-400 text-lg">
            See why 850+ brands switched to KwikAds
          </p>
        </div>

        <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 gap-0">
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Feature</h3>
            </div>
            <div className="p-6 bg-cyan-500/10 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Zap className="text-cyan-400" size={20} />
                <h3 className="text-lg font-black text-white">KwikAds</h3>
              </div>
            </div>
            <div className="p-6 bg-white/5 border-b border-white/10">
              <h3 className="text-lg font-bold text-neutral-400">Traditional</h3>
            </div>

            {/* Rows */}
            {features.map((item, i) => (
              <React.Fragment key={i}>
                <div className={`p-6 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                  <span className="text-neutral-300 font-medium">{item.feature}</span>
                </div>
                <div className={`p-6 border-b border-cyan-500/10 ${i % 2 === 0 ? 'bg-cyan-500/5' : ''}`}>
                  {item.kwik ? (
                    <CheckCircle2 className="text-cyan-400" size={24} />
                  ) : (
                    <XCircle className="text-red-500/50" size={24} />
                  )}
                </div>
                <div className={`p-6 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                  {item.traditional ? (
                    <CheckCircle2 className="text-green-500/50" size={24} />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

