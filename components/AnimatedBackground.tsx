import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  type?: 'particles' | 'grid' | 'gradient' | 'video';
  videoUrl?: string;
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  type = 'particles', 
  videoUrl,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type === 'particles' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
      }> = [];

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [type]);

  if (type === 'video' && videoUrl) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/80 via-midnight-950/60 to-midnight-950/80"></div>
      </div>
    );
  }

  if (type === 'particles') {
    return (
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${className}`}
        style={{ zIndex: 0 }}
      />
    );
  }

  if (type === 'grid') {
    return (
      <div className={`absolute inset-0 bg-grid-pattern opacity-20 ${className}`} style={{ zIndex: 0 }} />
    );
  }

  if (type === 'gradient') {
    return (
      <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-gold-900/20 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950"></div>
      </div>
    );
  }

  return null;
};

