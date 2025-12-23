import React, { useState, useEffect } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Loader2, ArrowRight, ShieldCheck, Zap, Lock, AlertCircle, Sparkles, Eye, EyeOff, Terminal } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlowEffect } from '../components/GlowEffect';

interface LoginProps {
  onSuccess: () => void;
  isRedirected?: boolean;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, isRedirected }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('BRAND');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, role);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'BRAND' as UserRole, label: 'BRAND', icon: <Zap size={16} />, color: 'gold' },
    { id: 'INFLUENCER' as UserRole, label: 'INFLUENCER', icon: <Sparkles size={16} />, color: 'cyan' },
    { id: 'ADMIN' as UserRole, label: 'ADMIN', icon: <Terminal size={16} />, color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-midnight-950 flex flex-col lg:flex-row overflow-hidden relative">
      {/* Animated Background */}
      <AnimatedBackground type="particles" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Parallax Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Left: Cinematic Visual */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-midnight-900 items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-midnight-950/70 z-10"></div>
          <video 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
          >
            <source src="https://player.vimeo.com/external/370259942.sd.mp4?s=d7e3549d40b955700832279f60046648873752e5&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>
        
        <div className="relative z-10 px-16 max-w-xl animate-fade-in-up">
          <GlowEffect color="gold" intensity="high">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center mb-8 mx-auto animate-pulse-slow shadow-[0_0_50px_rgba(234,179,8,0.4)]">
              <Zap className="text-black h-10 w-10" strokeWidth={3} />
            </div>
          </GlowEffect>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none drop-shadow-2xl">
            Access the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-cyan-400 to-purple-500 animate-shimmer bg-[length:200%_auto]">
              Mainframe.
            </span>
          </h1>
          
          <p className="text-neutral-300 text-lg leading-relaxed border-l-4 border-gold-500 pl-6 drop-shadow-md">
            Welcome back to the operating system of local influence. Manage campaigns, track velocity, and scale your reach.
          </p>

          <div className="mt-12 flex items-center gap-6">
            {[
              { icon: <ShieldCheck size={20} className="text-cyan-400" />, text: '256-Bit SSL' },
              { icon: <Zap size={20} className="text-gold-500" />, text: 'Lightning Fast' },
              { icon: <Lock size={20} className="text-purple-400" />, text: 'Secure' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-neutral-400">
                {feature.icon}
                <span className="text-xs uppercase tracking-widest">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-16 relative bg-midnight-950 h-screen lg:h-auto overflow-y-auto">
        <div className="w-full max-w-md animate-fade-in-up relative">
          
          {/* Restricted Access Alert */}
          {isRedirected && (
            <div className="absolute -top-24 left-0 w-full animate-scale-in">
              <GlowEffect color="gold" intensity="medium">
                <div className="glass-panel border border-red-500/50 rounded-xl p-4 flex items-center gap-4 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-md">
                  <div className="p-2 bg-red-500 rounded-full text-white shrink-0">
                    <Lock size={16}/>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Restricted Access
                    </p>
                    <p className="text-xs">Authentication required to access campaign tools.</p>
                  </div>
                </div>
              </GlowEffect>
            </div>
          )}

          <div className="glass-panel border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl relative backdrop-blur-2xl">
            {/* HUD Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl"></div>

            <div className="mb-8 lg:mb-12 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <Terminal className="text-cyan-400" size={20} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {isRegistering ? 'Initialize Account' : 'Secure Login'}
                </h2>
              </div>
              <p className="text-cyan-500 text-sm uppercase tracking-widest font-mono">
                Authentication Required
              </p>
            </div>

            {/* Role Selection */}
            <div className="flex gap-2 mb-8 p-1 glass border border-white/10 rounded-lg relative z-10">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 ${
                    role === r.id 
                      ? `bg-gradient-to-r from-${r.color}-500 to-${r.color}-400 text-black shadow-lg scale-105` 
                      : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {isRegistering && (
                <div className="group">
                  <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block">
                    FULL NAME
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name"
                    className="w-full glass border border-white/10 py-4 px-5 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              )}
              
              <div className="group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block">
                  ACCESS ID (EMAIL)
                </label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full glass border border-white/10 py-4 px-5 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block">
                  PASSPHRASE
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full glass border border-white/10 py-4 px-5 pr-12 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <GlowEffect color="gold" intensity="medium">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-black py-4 mt-8 flex items-center justify-center transition-all group rounded-xl hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="animate-spin"/>
                  ) : (
                    <>
                      {isRegistering ? 'Create Access' : 'Authenticate'} 
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </>
                  )}
                </button>
              </GlowEffect>
            </form>

            <div className="mt-8 text-center relative z-10">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-neutral-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                {isRegistering ? 'Already have an ID? Login' : 'New to KwikAds? Apply for Access'}
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-neutral-600 relative z-10">
              <ShieldCheck size={14} className="text-cyan-400"/>
              <span className="text-xs uppercase tracking-widest">End-to-End Encrypted Session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
