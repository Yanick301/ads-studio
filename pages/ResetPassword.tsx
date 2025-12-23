import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { KeyRound, CheckCircle2, Loader2, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlowEffect } from '../components/GlowEffect';
import { supabase } from '../lib/supabase';

interface ResetPasswordProps {
  onSuccess: () => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ onSuccess }) => {
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if we have a valid session from password reset link
    if (supabase) {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          // User has valid recovery session
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          
          <h2 className="text-3xl font-black text-white mb-4">Password Updated!</h2>
          <p className="text-neutral-300 mb-6 leading-relaxed">
            Your password has been successfully updated. You can now login with your new password.
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
        <div className="glass-panel border border-white/10 p-10 rounded-3xl shadow-2xl relative backdrop-blur-2xl">
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <KeyRound className="text-cyan-400" size={24} />
              </div>
              <h2 className="text-3xl font-black text-white">Reset Password</h2>
            </div>

            <p className="text-neutral-400 mb-8 leading-relaxed">
              Enter your new password. Make sure it's at least 8 characters long and includes a mix of letters and numbers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block flex items-center gap-2">
                  <Shield size={14} />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full glass border border-white/10 py-4 px-5 pr-12 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-neutral-600 mt-2">Minimum 8 characters</p>
              </div>

              <div className="group">
                <label className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-2 block flex items-center gap-2">
                  <Shield size={14} />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full glass border border-white/10 py-4 px-5 pr-12 text-white placeholder-neutral-600 focus:border-cyan-500 outline-none transition-all rounded-xl focus:bg-white/10 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-3 text-red-400 animate-scale-in">
                  <AlertCircle size={20} className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              <GlowEffect color="cyan" intensity="medium">
                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-white font-black py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Update Password
                      <KeyRound size={18} />
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

