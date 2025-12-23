import React from 'react';

interface GlowEffectProps {
  color?: 'cyan' | 'gold' | 'purple' | 'green';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  children: React.ReactNode;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  color = 'cyan',
  intensity = 'medium',
  className = '',
  children,
}) => {
  const colorClasses = {
    cyan: {
      low: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      medium: 'shadow-[0_0_30px_rgba(6,182,212,0.5)]',
      high: 'shadow-[0_0_50px_rgba(6,182,212,0.8)]',
    },
    gold: {
      low: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
      medium: 'shadow-[0_0_30px_rgba(234,179,8,0.5)]',
      high: 'shadow-[0_0_50px_rgba(234,179,8,0.8)]',
    },
    purple: {
      low: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      medium: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
      high: 'shadow-[0_0_50px_rgba(168,85,247,0.8)]',
    },
    green: {
      low: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      medium: 'shadow-[0_0_30px_rgba(34,197,94,0.5)]',
      high: 'shadow-[0_0_50px_rgba(34,197,94,0.8)]',
    },
  };

  return (
    <div className={`${colorClasses[color][intensity]} ${className} transition-shadow duration-300`}>
      {children}
    </div>
  );
};

