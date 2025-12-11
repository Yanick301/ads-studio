
import React, { useState } from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Loader2, ArrowRight, ShieldCheck, Zap, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onSuccess: () => void;
  isRedirected?: boolean;
}

export const Login: React.FC<LoginProps> = ({ onSuccess, isRedirected }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>('BRAND');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

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

  return (
    <div className="min-h-screen bg-midnight-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left: Cinematic Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-midnight-900 items-center justify-center">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-midnight-950/60 z-10"></div>
           <video 
             autoPlay loop muted playsInline 
             className="w-full h-full object-cover opacity-60 mix-blend-screen"
           >
              <source src="https://player.vimeo.com/external/370259942.sd.mp4?s=d7e3549d40b955700832279f60046648873752e5&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
           </video>
        </div>
        
        <div className="relative z-10 px-16 max-w-xl">
           <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(234,179,8,0.4)] animate-pulse-slow">
              <Zap className="text-black h-8 w-8" strokeWidth={3} />
           </div>
           <h1 className="text-6xl font-black text-white mb-6 tracking-tighter leading-none drop-shadow-2xl">
             Access the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-white">Mainframe.</span>
           </h1>
           <p className="text-neutral-300 text-lg leading-relaxed border-l-2 border-gold-500 pl-6 drop-shadow-md">
             Welcome back to the operating system of local influence. Manage campaigns, track velocity, and scale your reach.
           </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-16 relative bg-midnight-950 h-screen lg:h-auto overflow-y-auto">
         <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] absolute inset-0 opacity-5 pointer-events-none"></div>
         
         <div className="w-full max-w-md animate-fade-in-up p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-2xl shadow-2xl relative mt-10 lg:mt-0">
            
            {/* Restricted Access Alert */}
            {isRedirected && (
               <div className="absolute -top-20 left-0 w-full animate-fade-in-up">
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-4 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-md">
                     <div className="p-2 bg-red-500 rounded-full text-white shrink-0"><Lock size={16}/></div>
                     <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-red-400">Restricted Access</p>
                        <p className="text-xs">Authentication required to access campaign tools.</p>
                     </div>
                  </div>
               </div>
            )}

            <div className="mb-8 lg:mb-12">
               <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                 {isRegistering ? 'Initialize Account' : 'Secure Login'}
               </h2>
               <p className="text-cyan-500 text-sm uppercase tracking-widest font-mono">
                 Authentication Required
               </p>
            </div>

            <div className="flex gap-2 mb-8 p-1 bg-midnight-900/50 rounded-lg border border-white/10">
               {['BRAND', 'INFLUENCER', 'ADMIN'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r as UserRole)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${
                      role === r ? 'bg-white text-black shadow-lg' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
               ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {isRegistering && (
                 <div className="group">
                   <input 
                     type="text" 
                     placeholder="FULL NAME"
                     className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-600 focus:border-gold-500 outline-none transition-colors"
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                   />
                 </div>
               )}
               <div className="group">
                 <input 
                   type="email" 
                   placeholder="ACCESS ID (EMAIL)"
                   className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-600 focus:border-gold-500 outline-none transition-colors"
                   value={formData.email}
                   onChange={e => setFormData({...formData, email: e.target.value})}
                 />
               </div>
               <div className="group">
                 <input 
                   type="password" 
                   placeholder="PASSPHRASE"
                   className="w-full bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-600 focus:border-gold-500 outline-none transition-colors"
                   value={formData.password}
                   onChange={e => setFormData({...formData, password: e.target.value})}
                 />
               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 mt-8 flex items-center justify-center transition-all group rounded-lg hover:shadow-[0_0_20px_#eab308]"
               >
                 {loading ? <Loader2 className="animate-spin"/> : (
                    <>
                      {isRegistering ? 'Create Access' : 'Authenticate'} 
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </>
                 )}
               </button>
            </form>

            <div className="mt-8 text-center">
               <button 
                 onClick={() => setIsRegistering(!isRegistering)}
                 className="text-xs text-neutral-500 hover:text-gold-500 transition-colors uppercase tracking-widest"
               >
                 {isRegistering ? 'Already have an ID? Login' : 'New to KwikAds? Apply for Access'}
               </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-2 text-neutral-600">
               <ShieldCheck size={12}/>
               <span className="text-[10px] uppercase tracking-widest">End-to-End Encrypted Session</span>
            </div>
         </div>
      </div>
    </div>
  );
};
