import React from 'react';
import { ArrowRight, CheckCircle2, Star, TrendingUp, Zap, Shield } from 'lucide-react';

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = "group relative px-8 py-4 font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden rounded-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]",
    secondary: "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]",
    outline: "bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 backdrop-blur-md",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center">
        {children}
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
    </button>
  );
};

interface FeatureListProps {
  features: string[];
  icon?: React.ReactNode;
}

export const FeatureList: React.FC<FeatureListProps> = ({ features, icon }) => {
  return (
    <ul className="space-y-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-4 group">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:scale-110 transition-transform shrink-0">
            {icon || <CheckCircle2 className="text-cyan-400" size={20} />}
          </div>
          <span className="text-neutral-300 group-hover:text-white transition-colors font-medium">
            {feature}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  image?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  rating,
  image,
}) => {
  return (
    <div className="glass-panel border border-white/10 p-8 rounded-2xl hover:border-gold-500/30 transition-all group">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'text-gold-500 fill-gold-500' : 'text-neutral-600'}`}
          />
        ))}
      </div>
      <p className="text-lg text-neutral-300 mb-8 font-light italic leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full border border-white/20 object-cover group-hover:border-gold-500 transition-colors"
          />
        )}
        <div>
          <div className="text-white font-bold">{author}</div>
          <div className="text-cyan-500 text-xs uppercase tracking-wider">
            {role} • {company}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: string;
  color?: 'cyan' | 'gold' | 'purple' | 'green';
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  trend,
  color = 'cyan',
}) => {
  const colorClasses = {
    cyan: 'text-cyan-400 border-cyan-500/30',
    gold: 'text-gold-500 border-gold-500/30',
    purple: 'text-purple-400 border-purple-500/30',
    green: 'text-green-400 border-green-500/30',
  };

  return (
    <div className={`glass-panel border ${colorClasses[color]} p-6 rounded-xl hover:scale-105 transition-all group`}>
      {icon && (
        <div className="mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}
      <div className="flex items-baseline gap-2 mb-2">
        <div className={`text-4xl font-black ${colorClasses[color].split(' ')[0]}`}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500 text-sm">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
        {label}
      </div>
    </div>
  );
};

