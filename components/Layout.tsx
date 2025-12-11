
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Globe, MapPin, Mail, ExternalLink, ArrowUpRight, User, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { language, setLanguage, languages, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Nav Items based on Auth Status
  const getNavItems = () => {
    const base = [{ id: 'home', label: t('nav.home') }];
    if (isAuthenticated) {
       if (user?.role === 'ADMIN') base.push({ id: 'admin', label: t('nav.admin') });
       if (user?.role === 'BRAND') base.push({ id: 'brand', label: 'Dashboard' });
       // Influenceur dashboard link can be added here if needed
    } 
    // Always show Launch button, it will redirect if not auth
    base.push({ id: 'create', label: t('nav.launch') });
    
    if (!isAuthenticated) {
       base.push({ id: 'influencer', label: t('nav.earn') });
    }
    return base;
  };

  const navItems = getNavItems();
  const currentLangInfo = languages.find(l => l.code === language);

  return (
    <div className="min-h-screen flex flex-col bg-cosmic-gradient text-neutral-200 selection:bg-cyan-500 selection:text-black relative overflow-x-hidden font-sans transition-colors duration-1000">
      
      {/* --- GLOBAL IMMERSIVE BACKGROUNDS --- */}
      
      {/* 1. Abstract Video Mesh (The "Alive" Feel) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 bg-midnight-950/80 z-10"></div> {/* Deep Blue Darkener */}
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        >
           {/* Abstract Network/Particles Video */}
           <source src="https://player.vimeo.com/external/369733011.sd.mp4?s=d7e68224e756c2d1b7147814c1e4c7604a11e16e&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      {/* 2. Tech Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none z-0 mix-blend-overlay"></div>
      
      {/* 3. Ambient Spotlights (Peps & Color) - Enhanced for Blue BG */}
      <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-violet-900/30 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-slow mix-blend-screen"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/30 rounded-full blur-[120px] pointer-events-none z-0 animate-float mix-blend-screen"></div>
      <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"></div>

      {/* Smart Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          scrolled 
            ? 'bg-midnight-950/70 backdrop-blur-2xl border-b border-white/5 py-3 md:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-b border-transparent py-4 md:py-8'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mr-3 md:mr-4 transition-transform duration-500 group-hover:rotate-180">
                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-full h-full bg-midnight-900/50 backdrop-blur-md flex items-center justify-center border border-white/20 rounded-lg group-hover:border-cyan-400">
                    <Zap className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-cyan-400 transition-colors" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl tracking-tighter text-white leading-none group-hover:text-cyan-400 transition-all">KWIK<span className="text-cyan-500 group-hover:text-white transition-colors">ADS</span></span>
                <span className="text-[9px] text-neutral-400 tracking-[0.4em] uppercase mt-1 font-mono group-hover:text-gold-500 transition-colors hidden sm:block">System v2.0</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center space-x-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`relative px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                      activePage === item.id 
                        ? 'bg-white text-midnight-950 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Language Dropdown */}
              <div className="relative group">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border border-white/5 px-3 py-2 rounded-full hover:border-cyan-500/50 hover:bg-cyan-500/10 backdrop-blur-sm"
                >
                  <Globe size={14} className="text-cyan-500 group-hover:animate-spin-slow"/>
                  <span className="text-xs font-bold tracking-widest">{currentLangInfo?.code.toUpperCase()}</span>
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-4 w-40 bg-midnight-900/90 border border-white/10 py-2 z-50 animate-fade-in-up shadow-2xl rounded-xl backdrop-blur-2xl">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-white/5 transition-colors ${
                          language === lang.code ? 'text-cyan-400' : 'text-neutral-400'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile / Login */}
              {isAuthenticated && user ? (
                 <div className="flex items-center gap-6 pl-6 border-l border-white/10">
                    <button className="relative text-neutral-400 hover:text-white transition-colors hover:scale-110 transform">
                       <Bell size={18} />
                       <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></span>
                    </button>
                    
                    <div className="relative">
                       <button 
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                          className="flex items-center gap-3 group p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                       >
                          <div className="relative">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-white/20 group-hover:border-cyan-500 transition-colors object-cover" />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-midnight-950 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                          </div>
                          <div className="text-left hidden lg:block">
                             <div className="text-[10px] font-bold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">{user.name}</div>
                             <div className="text-[9px] text-neutral-500 font-mono">{user.role}</div>
                          </div>
                          <ChevronDown size={12} className="text-neutral-600 group-hover:text-white transition-colors"/>
                       </button>

                       {userMenuOpen && (
                          <div className="absolute right-0 mt-4 w-56 bg-midnight-900/90 border border-white/10 py-2 z-50 animate-fade-in-up shadow-2xl rounded-xl backdrop-blur-2xl overflow-hidden">
                             <div className="px-5 py-4 border-b border-white/5 bg-white/5">
                                <p className="text-white text-xs font-bold">{user.name}</p>
                                <p className="text-neutral-500 text-[10px] truncate">{user.email}</p>
                             </div>
                             <button onClick={() => { onNavigate(user.role === 'BRAND' ? 'brand' : 'admin'); setUserMenuOpen(false); }} className="w-full text-left px-5 py-3 text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wider">Dashboard</button>
                             <button onClick={() => { logout(); setUserMenuOpen(false); onNavigate('home'); }} className="w-full text-left px-5 py-3 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 flex items-center gap-2 transition-colors uppercase tracking-wider border-t border-white/5">
                                <LogOut size={12}/> Logout
                             </button>
                          </div>
                       )}
                    </div>
                 </div>
              ) : (
                 <button 
                   onClick={() => onNavigate('login')}
                   className="ml-4 px-8 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md rounded-sm"
                 >
                    Access ID
                 </button>
              )}

            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-[60]"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-midnight-950/98 backdrop-blur-3xl fixed inset-0 z-[55] animate-fade-in flex flex-col pt-24 pb-12 px-8 overflow-y-auto">
              <div className="space-y-6 flex-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-2xl md:text-3xl font-thin tracking-tighter uppercase transition-all py-2 border-b border-white/5 ${
                      activePage === item.id 
                        ? 'text-cyan-400 border-cyan-500 pl-4' 
                        : 'text-neutral-500 hover:text-white hover:pl-2'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {!isAuthenticated && (
                  <button onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }} className="block w-full text-left text-2xl font-thin tracking-tighter uppercase text-gold-500 mt-8 py-2">
                    Log In
                  </button>
                )}

                {isAuthenticated && (
                  <button onClick={() => { logout(); onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-lg font-bold tracking-widest uppercase text-red-500 mt-8">
                    Log Out
                  </button>
                )}
              </div>

              <div className="border-t border-white/10 pt-8 mt-auto">
                 <div className="grid grid-cols-3 gap-3">
                    {languages.map(l => (
                       <button key={l.code} onClick={() => {setLanguage(l.code); setMobileMenuOpen(false)}} className={`text-center py-3 border rounded-lg text-sm ${language === l.code ? 'border-cyan-500 text-cyan-500 bg-cyan-500/10' : 'border-white/10 text-neutral-500'}`}>
                          {l.code.toUpperCase()}
                       </button>
                    ))}
                 </div>
              </div>
          </div>
        )}
      </nav>

      {/* Main Content - Z-Index to stay above video */}
      <main className="flex-grow pt-0 relative z-10">
        {children}
      </main>

      {/* Footer (Monolith Tech Style) */}
      <footer className="bg-midnight-950/80 backdrop-blur-xl border-t border-white/5 pt-20 md:pt-32 pb-12 relative z-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-32">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2 text-center md:text-left">
               <h2 className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter leading-none mb-6 md:mb-8 select-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent">KWIKADS</h2>
               <p className="text-lg md:text-xl text-neutral-400 max-w-md font-light leading-relaxed border-l-2 border-cyan-500/30 pl-6 mx-auto md:mx-0">
                  {t('footer.slogan')}
               </p>
            </div>

            {/* Links */}
            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mb-4 md:mb-8 flex items-center justify-center md:justify-start gap-2"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>Platform</h4>
              <ul className="space-y-4 flex flex-col items-center md:items-start">
                <li><button onClick={() => onNavigate('home')} className="text-neutral-500 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2 group">Overview <ArrowUpRight className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" size={12}/></button></li>
                <li><button onClick={() => onNavigate('create')} className="text-neutral-500 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2 group">Studio <ArrowUpRight className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" size={12}/></button></li>
                <li><button onClick={() => onNavigate('influencer')} className="text-neutral-500 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2 group">Network <ArrowUpRight className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" size={12}/></button></li>
              </ul>
            </div>

            <div className="space-y-6 md:space-y-8 text-center md:text-left">
              <h4 className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.2em] mb-4 md:mb-8 flex items-center justify-center md:justify-start gap-2"><div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>DeOS Core</h4>
              <ul className="space-y-6 text-sm flex flex-col items-center md:items-start">
                 <li className="flex items-start gap-4 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors border border-white/5 group-hover:border-purple-500/30">
                        <MapPin className="text-purple-400 shrink-0" size={14}/>
                    </div>
                    <span className="text-neutral-400 group-hover:text-white transition-colors text-xs leading-relaxed text-left">Haie Vive, Rue 340<br/>Cotonou, Bénin</span>
                 </li>
                 <li className="flex items-start gap-4 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:bg-purple-500/20 transition-colors border border-white/5 group-hover:border-purple-500/30">
                        <Mail className="text-purple-400 shrink-0" size={14}/>
                    </div>
                    <a href="mailto:contact@deos.bj" className="text-neutral-400 hover:text-white transition-colors text-xs">contact@deos.bj</a>
                 </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
             <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                <div className="relative">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">System Operational</span>
             </div>
             <div className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest order-last md:order-none">
                © 2024 DEOS DIGITAL. {t('footer.rights')}
             </div>
             <div className="flex gap-8">
                <button onClick={() => onNavigate('legal')} className="text-[10px] text-neutral-600 hover:text-cyan-400 uppercase tracking-widest transition-colors">Privacy Protocol</button>
                <button onClick={() => onNavigate('legal')} className="text-[10px] text-neutral-600 hover:text-cyan-400 uppercase tracking-widest transition-colors">Terms of Engagement</button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
