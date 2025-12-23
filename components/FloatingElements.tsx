import React from 'react';
import { Sparkles, Zap, Rocket, Target, TrendingUp } from 'lucide-react';

interface FloatingElement {
  icon: React.ReactNode;
  x: number;
  y: number;
  delay: number;
  size: number;
}

export const FloatingElements: React.FC = () => {
  const elements: FloatingElement[] = [
    { icon: <Sparkles className="text-cyan-400" />, x: 10, y: 20, delay: 0, size: 24 },
    { icon: <Zap className="text-gold-500" />, x: 85, y: 15, delay: 1, size: 28 },
    { icon: <Rocket className="text-purple-500" />, x: 20, y: 70, delay: 2, size: 32 },
    { icon: <Target className="text-green-500" />, x: 75, y: 60, delay: 1.5, size: 26 },
    { icon: <TrendingUp className="text-pink-500" />, x: 50, y: 10, delay: 0.5, size: 30 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20 hover:opacity-40 transition-opacity"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${6 + i}s`,
          }}
        >
          <div style={{ width: el.size, height: el.size }}>
            {el.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

