import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, ArrowLeft, CheckCircle2, Loader2, Shield } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlowEffect } from '../components/GlowEffect';

interface ForgotPasswordProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack, onSuccess }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground type="particles" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-cyan-500/10 to-purple-500/10"></div>
        
        <div className="relative z-10 glass-panel border border-green-500/30 p-12 rounded-3xl max-w-md w-full text-center animate-scale-in">
          <GlowEffect color="green" intensity="high">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-white" />
            </div>
          </GlowEffect>
          
          <h2 className="text-3xl font-black text-white mb-4">Email Sent!</h2>
          <p className="text-neutral-300 mb-6 leading-relaxed">
            We've sent a password reset link to <strong className="text-cyan-400">{email}</strong>
          </p>
          <p className="text-sm text-neutral-500">
            Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground type="particles" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Login</span>
        </button>

        <div className="glass-panel border border-white/10 p-10 rounded-3xl shadow-2xl relative backdrop-blur-2xl">
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <Shield className="text-cyan-400" size={24} />
              </div>
              <h2 className="text-3xl font-black text-white">Reset Password</h2>
            </div>

            <p className="text-neutral-400 mb-8 leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass border border-white/10 py-4 pl-12 pr-4 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <GlowEffect color="cyan" intensity="medium">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-white font-black py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <Mail size={18} />
                    </>
                  )}
                </button>
              </GlowEffect>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-neutral-600">
                <Shield size={14} className="text-cyan-400" />
                <span className="text-xs uppercase tracking-widest">Secure & Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

