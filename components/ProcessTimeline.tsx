import React from 'react';
import { CheckCircle2, ArrowRight, Clock, Zap, Rocket } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Campaign',
      description: 'Upload your creative, set your budget, choose your package. Takes less than 2 minutes.',
      time: '2 min',
      icon: <Zap className="text-cyan-400" size={24} />,
    },
    {
      number: '02',
      title: 'AI Matching',
      description: 'Our AI instantly finds the best influencers for your campaign based on audience, platform, and performance.',
      time: '30 sec',
      icon: <Rocket className="text-purple-400" size={24} />,
    },
    {
      number: '03',
      title: 'Automatic Deployment',
      description: 'Influencers receive your campaign via WhatsApp. No manual work, no delays, just instant delivery.',
      time: 'Instant',
      icon: <Clock className="text-gold-500" size={24} />,
    },
    {
      number: '04',
      title: 'Track & Optimize',
      description: 'Monitor performance in real-time. See views, engagement, and ROI as it happens.',
      time: 'Live',
      icon: <CheckCircle2 className="text-green-400" size={24} />,
    },
  ];

  return (
    <section className="py-24 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-cyan-400">Impact</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Your campaign goes live in under 3 minutes. Here's how it works:
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-gold-500 hidden md:block -translate-x-1/2"></div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-start gap-8 relative ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-midnight-950 -translate-x-1/2 z-10 hidden md:block animate-pulse"></div>

                {/* Content Card */}
                <div className={`flex-1 glass-panel border border-white/10 p-8 rounded-2xl hover:border-cyan-500/50 transition-all ${
                  i % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-4xl font-black text-white/10 mb-2">{step.number}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                      {step.time}
                    </div>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

