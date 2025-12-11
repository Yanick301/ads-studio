
import React, { useState } from 'react';
import { PackageType, Platform, Campaign } from '../types';
import { PACKAGES } from '../constants';
import { api } from '../services/api';
import { Upload, Check, Loader2, Smartphone, CreditCard, MessageCircle, Video, Instagram, ArrowRight, ChevronRight, Zap, ShieldCheck, Globe, Hash, Cpu, Facebook, Ghost, FileVideo, FileImage, AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSuccess: () => void;
}

export const CreateCampaign: React.FC<Props> = ({ onSuccess }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [processingProvider, setProcessingProvider] = useState<'MOMO' | 'STRIPE' | 'PAYTECH' | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    description: '',
    platform: Platform.WHATSAPP,
    packageType: PackageType.GROWTH,
    file: null as File | null
  });

  const [createdCampaignId, setCreatedCampaignId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    // 1. Validate Size (Max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError("File exceeds maximum size of 50MB.");
      return;
    }

    // 2. Validate Type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      setFileError("Invalid format. Please upload JPG, PNG, MP4, or MOV.");
      return;
    }

    setFormData({ ...formData, file });
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening file dialog
    setFormData({ ...formData, file: null });
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setFileError("Creative payload is required to launch.");
      return;
    }
    setLoading(true);
    try {
      const campaign = await api.createCampaign({
        ...formData,
        price: PACKAGES[formData.packageType].price,
        mediaUrl: 'https://picsum.photos/400/600'
      });
      setCreatedCampaignId(campaign.id);
      setStep(2);
      window.scrollTo(0,0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (provider: 'MOMO' | 'STRIPE' | 'PAYTECH') => {
    if (!createdCampaignId) return;
    setLoading(true);
    setProcessingProvider(provider);
    setPaymentError(null);

    try {
      await api.processPayment(createdCampaignId, provider);
      setShowSuccessModal(true); 
    } catch (err) {
      setPaymentError(`Payment via ${provider} failed. Please try again.`);
    } finally {
      setLoading(false);
      setProcessingProvider(null);
    }
  };

  const currentPackage = PACKAGES[formData.packageType];

  // Styles
  const sectionTitle = "text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2 border-b border-white/5 pb-2 opacity-80";
  const inputGroupClass = "relative z-0 w-full group mb-10";
  const inputClass = "block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-all duration-300 font-light tracking-wide focus:text-cyan-50 placeholder-transparent rounded-none";
  const labelClass = "peer-focus:font-bold peer-focus:tracking-[0.2em] absolute text-xs text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:font-normal peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider";

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
         <div className="absolute inset-0 bg-black/70 z-10"></div>
         <video 
           autoPlay loop muted playsInline 
           className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
         >
            <source src="https://player.vimeo.com/external/394677737.sd.mp4?s=1d577a76059952002779f678201a43a0d33e9b88&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
         </video>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 flex">
        <div className={`h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000 ease-in-out shadow-[0_0_20px_#22d3ee] ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
        <div className={`h-full bg-white/5 backdrop-blur transition-all duration-1000 ease-in-out ${step === 1 ? 'w-1/2' : 'w-0'}`}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
          
          {/* LEFT: FORM INTERFACE */}
          <div className="lg:col-span-8 animate-fade-in-up order-1">
             
             {/* Header */}
             <div className="mb-10 md:mb-16 border-l-4 border-cyan-500 pl-4 md:pl-8 relative backdrop-blur-sm group">
                <div className="absolute -left-[5px] top-0 w-1 h-0 bg-white shadow-[0_0_15px_white] group-hover:h-full transition-all duration-700 ease-out"></div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
                   {step === 1 ? t('create.mission') : t('create.payment')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 block md:inline">{t('create.config')}</span>
                </h1>
                <p className="text-cyan-200/60 text-sm md:text-lg font-mono tracking-wide max-w-xl">
                   {step === 1 ? t('create.subtitle_1') : t('create.subtitle_2')}
                </p>
             </div>

             {step === 1 ? (
               <form onSubmit={handleSubmit} className="space-y-16 md:space-y-24 p-6 md:p-10 rounded-3xl bg-midnight-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                 
                 {/* Decorative Glow */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                 {/* 1. Identity Matrix */}
                 <section>
                    <div className={sectionTitle}><Hash size={12}/> {t('create.section_identity')}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                      <div className={inputGroupClass}>
                        <input 
                          type="text" 
                          name="businessName"
                          id="businessName"
                          className={inputClass}
                          placeholder=" "
                          required
                          value={formData.businessName}
                          onChange={e => setFormData({...formData, businessName: e.target.value})}
                        />
                        <label htmlFor="businessName" className={labelClass}>{t('create.placeholder_name')}</label>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out group-focus-within:w-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>

                      <div className={inputGroupClass}>
                        <input 
                          type="tel" 
                          name="phone"
                          id="phone"
                          className={inputClass}
                          placeholder=" "
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                        <label htmlFor="phone" className={labelClass}>{t('create.placeholder_phone')}</label>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out group-focus-within:w-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>

                      <div className={`${inputGroupClass} md:col-span-2`}>
                        <input 
                          type="text" 
                          name="description"
                          id="description"
                          className={inputClass}
                          placeholder=" "
                          required
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                        <label htmlFor="description" className={labelClass}>{t('create.placeholder_desc')}</label>
                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-500 ease-out group-focus-within:w-full shadow-[0_0_10px_#22d3ee]"></div>
                      </div>
                    </div>
                 </section>

                 {/* 2. Vector Selection */}
                 <section>
                    <div className={sectionTitle}><Globe size={12}/> {t('create.section_vector')}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                       {[
                         { id: Platform.WHATSAPP, icon: <MessageCircle size={32}/>, label: 'WHATSAPP', desc: 'Private Circles', color: 'text-green-500' },
                         { id: Platform.FACEBOOK, icon: <Facebook size={32}/>, label: 'FACEBOOK', desc: 'Community', color: 'text-blue-500' },
                         { id: Platform.TIKTOK, icon: <Video size={32}/>, label: 'TIKTOK', desc: 'Viral Feed', color: 'text-pink-500' },
                         { id: Platform.INSTAGRAM, icon: <Instagram size={32}/>, label: 'INSTAGRAM', desc: 'Visual Story', color: 'text-purple-500' },
                         { id: Platform.SNAPCHAT, icon: <Ghost size={32}/>, label: 'SNAPCHAT', desc: 'Gen Z Pulse', color: 'text-yellow-400' }
                       ].map((p) => (
                         <div 
                           key={p.id}
                           onClick={() => setFormData({...formData, platform: p.id})}
                           className={`cursor-pointer p-6 md:p-8 border transition-all duration-500 relative overflow-hidden group min-h-[160px] md:min-h-[200px] flex flex-col justify-between rounded-2xl backdrop-blur-md hover:scale-[1.02] ${
                             formData.platform === p.id 
                               ? 'bg-cyan-900/10 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)]' 
                               : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                           }`}
                         >
                           <div className={`absolute -top-4 -right-4 p-4 opacity-5 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-12 ${formData.platform === p.id ? 'text-white' : 'text-white'}`}>
                              {React.cloneElement(p.icon as React.ReactElement, { size: 100 })}
                           </div>
                           <div className={`${formData.platform === p.id ? 'text-cyan-400' : 'text-neutral-500 group-hover:text-white'} transition-colors duration-300 relative z-10`}>
                             {p.icon}
                           </div>
                           <div className="relative z-10">
                              <div className="font-bold text-lg tracking-widest text-white mb-1">{p.label}</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono">{p.desc}</div>
                           </div>
                           {formData.platform === p.id && (
                             <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-2xl animate-pulse-slow pointer-events-none"></div>
                           )}
                         </div>
                       ))}
                    </div>
                 </section>

                 {/* 3. Intensity Level */}
                 <section>
                    <div className={sectionTitle}><Zap size={12}/> {t('create.section_intensity')}</div>
                    <div className="grid grid-cols-1 gap-4">
                       {Object.values(PACKAGES).map((pkg) => (
                          <div 
                            key={pkg.name}
                            onClick={() => setFormData({...formData, packageType: pkg.name.toUpperCase() as PackageType})}
                            className={`cursor-pointer px-6 md:px-8 py-6 border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between group rounded-xl backdrop-blur-md relative overflow-hidden ${
                              formData.packageType === pkg.name.toUpperCase()
                                ? 'bg-gold-500/10 border-gold-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]'
                                : 'bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5'
                            }`}
                          >
                             {formData.packageType === pkg.name.toUpperCase() && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 shadow-[0_0_15px_#eab308]"></div>}
                             
                             <div className="flex items-start md:items-center gap-4 md:gap-8 pl-0 md:pl-4 mb-4 md:mb-0">
                                <div className={`font-mono text-[10px] font-bold px-3 py-1 border rounded transition-colors whitespace-nowrap ${
                                   formData.packageType === pkg.name.toUpperCase() ? 'text-gold-500 border-gold-500 bg-gold-500/10' : 'text-neutral-600 border-neutral-800'
                                }`}>
                                   {pkg.influencers < 10 ? `0${pkg.influencers}` : pkg.influencers} AGENTS
                                </div>
                                <div>
                                   <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase group-hover:text-gold-500 transition-colors">{pkg.name}</h3>
                                   <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-mono">{pkg.description}</p>
                                </div>
                             </div>
                             <div className="text-right w-full md:w-auto">
                                <div className={`text-xl font-mono font-bold transition-colors ${formData.packageType === pkg.name.toUpperCase() ? 'text-gold-500' : 'text-neutral-500 group-hover:text-white'}`}>
                                   {pkg.price.toLocaleString()} <span className="text-xs font-normal opacity-50">XOF</span>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </section>

                 {/* 4. Payload */}
                 <section>
                    <div className={sectionTitle}><Upload size={12}/> {t('create.section_payload')}</div>
                    <div 
                      className={`relative border border-dashed p-10 md:p-16 text-center transition-all duration-300 group rounded-2xl backdrop-blur-sm ${
                        fileError 
                          ? 'border-red-500/50 bg-red-500/5' 
                          : formData.file 
                            ? 'border-cyan-500/50 bg-cyan-900/10' 
                            : 'border-white/20 bg-black/20 hover:border-cyan-500/50 hover:bg-cyan-900/5'
                      }`}
                    >
                      <input 
                        type="file" 
                        accept=".jpg,.jpeg,.png,.mp4,.mov"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={handleFileChange}
                      />
                      
                      <div className={`inline-block p-6 rounded-full border mb-6 transition-transform duration-300 group-hover:scale-110 ${
                        formData.file 
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                          : 'border-white/10 bg-white/5 group-hover:border-cyan-500'
                      }`}>
                         {formData.file ? (
                            formData.file.type.startsWith('video/') ? (
                               <FileVideo className="text-cyan-400" size={32} />
                            ) : (
                               <FileImage className="text-cyan-400" size={32} />
                            )
                         ) : (
                            <Upload className="text-neutral-400 group-hover:text-cyan-500 transition-colors" size={32} />
                         )}
                      </div>

                      {formData.file ? (
                        <div className="relative z-20">
                          <p className="text-cyan-400 font-bold text-lg md:text-xl tracking-wide truncate max-w-xs mx-auto">
                            {formData.file.name}
                          </p>
                          <p className="text-neutral-500 text-xs uppercase tracking-widest mt-2 font-mono">
                            {(formData.file.size / (1024*1024)).toFixed(2)} MB • {formData.file.type.split('/')[1].toUpperCase()}
                          </p>
                          <button 
                            onClick={removeFile}
                            className="mt-4 text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                          >
                            <X size={12} /> Remove File
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-white font-bold text-lg md:text-xl tracking-wide group-hover:text-cyan-400 transition-colors">
                            {t('create.upload_default')}
                          </p>
                          <p className="text-neutral-600 text-xs uppercase tracking-widest mt-2 font-mono">
                            {t('create.upload_max')} (MOV/MP4/JPG)
                          </p>
                        </>
                      )}

                      {fileError && (
                        <div className="absolute bottom-4 left-0 w-full text-center px-4">
                          <span className="text-red-500 text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2">
                             <AlertCircle size={12} className="shrink-0"/> <span className="truncate">{fileError}</span>
                          </span>
                        </div>
                      )}
                    </div>
                 </section>

               </form>
             ) : (
               <div className="animate-fade-in space-y-8 p-6 md:p-10 rounded-3xl bg-midnight-900/60 border border-white/10 backdrop-blur-xl shadow-2xl">
                  {/* Payment Step content - unchanged structure but inside responsive container */}
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-cyan-500 uppercase tracking-widest hover:text-white flex items-center gap-2 mb-8 transition-colors group">
                     <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14}/> {t('create.modify')}
                  </button>

                  <div className="grid grid-cols-1 gap-4">
                     {['MOMO', 'PAYTECH', 'STRIPE'].map((p) => (
                       <button 
                          key={p}
                          onClick={() => handlePayment(p as any)} 
                          disabled={loading}
                          className={`group relative overflow-hidden h-auto md:h-32 py-6 border transition-all duration-500 flex flex-col md:flex-row items-center justify-between px-6 md:px-10 rounded-2xl backdrop-blur-md gap-4 ${
                            loading 
                              ? (processingProvider === p 
                                  ? 'border-gold-500/50 bg-gold-500/10 cursor-wait shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
                                  : 'opacity-20 border-white/5 bg-white/5 cursor-not-allowed grayscale')
                              : 'border-white/10 hover:border-gold-500/50 bg-white/5 hover:bg-white/10 cursor-pointer hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]'
                          }`}
                       >
                          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
                             <div className={`w-16 h-16 flex items-center justify-center rounded-full border transition-all duration-300 ${
                                processingProvider === p 
                                 ? 'bg-gold-500/20 border-gold-500 text-gold-500 scale-110'
                                 : 'bg-white/5 border-white/10 text-neutral-400 group-hover:text-gold-500 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                             }`}>
                                {p === 'MOMO' ? <Smartphone size={28}/> : <CreditCard size={28}/>}
                             </div>
                             <div className="text-center md:text-left">
                                <div className={`text-xl font-bold tracking-wider transition-colors ${
                                   processingProvider === p ? 'text-gold-500' : 'text-white group-hover:text-gold-500'
                                }`}>
                                   {p === 'MOMO' ? 'MTN MOBILE MONEY' : p === 'PAYTECH' ? 'WAVE / PAYTECH' : 'CREDIT CARD'}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest mt-1 font-mono">
                                   {processingProvider === p ? (
                                      <span className="text-cyan-400 animate-pulse">Processing Secure Transaction...</span>
                                   ) : (
                                      <span className="text-neutral-500">Instant Activation • Secure Gateway</span>
                                   )}
                                </div>
                             </div>
                          </div>
                          
                          {processingProvider === p ? (
                             <Loader2 className="animate-spin text-gold-500 w-8 h-8"/>
                          ) : (
                             <ArrowRight className="text-white/10 group-hover:text-gold-500 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 transform opacity-0 group-hover:opacity-100 hidden md:block" size={24}/>
                          )}
                       </button>
                     ))}
                  </div>

                  {loading && !processingProvider && <div className="text-center text-cyan-500 text-xs uppercase tracking-widest animate-pulse mt-8 font-mono">{t('create.establishing')}</div>}
                  
                  {paymentError && (
                    <div className="p-6 bg-red-900/10 border border-red-500/30 text-red-500 text-xs font-mono uppercase tracking-wide rounded-xl flex items-center gap-4 animate-scale-in">
                      <Zap size={16}/> Error: {paymentError}
                    </div>
                  )}
               </div>
             )}
          </div>

          {/* RIGHT: LIVE SUMMARY (HUD) - Stacks below form on mobile */}
          <div className="lg:col-span-4 relative mt-8 lg:mt-0 order-2">
             <div className="lg:sticky lg:top-32">
                <div className="bg-midnight-950/80 border border-white/10 p-6 md:p-10 shadow-2xl relative overflow-hidden group rounded-3xl backdrop-blur-2xl">
                   {/* HUD Decor elements */}
                   <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/10 rounded-tr-3xl pointer-events-none"></div>
                   <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/10 rounded-bl-3xl pointer-events-none"></div>
                   
                   <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] mb-10 flex items-center justify-between border-b border-white/5 pb-6">
                      <span className="flex items-center gap-2"><Cpu size={14}/> System Status</span>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] text-neutral-600 font-mono">ONLINE</span>
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                      </div>
                   </h3>
                   
                   <div className="space-y-6 font-mono text-sm">
                      <div className="flex justify-between items-end border-b border-dashed border-white/10 pb-4 group/item hover:border-cyan-500/30 transition-colors">
                         <span className="text-neutral-500 uppercase text-[10px] tracking-widest">Target</span>
                         <span className="text-white text-right max-w-[150px] truncate font-bold">{formData.businessName || '---'}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-dashed border-white/10 pb-4 group/item hover:border-cyan-500/30 transition-colors">
                         <span className="text-neutral-500 uppercase text-[10px] tracking-widest">Vector</span>
                         <span className="text-cyan-400 font-bold">{formData.platform}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-dashed border-white/10 pb-4 group/item hover:border-cyan-500/30 transition-colors">
                         <span className="text-neutral-500 uppercase text-[10px] tracking-widest">Module</span>
                         <span className="text-white font-bold">{currentPackage.name}</span>
                      </div>
                      <div className="flex justify-between items-end border-b border-dashed border-white/10 pb-4 group/item hover:border-cyan-500/30 transition-colors">
                         <span className="text-neutral-500 uppercase text-[10px] tracking-widest">Est. Impact</span>
                         <span className="text-purple-400 font-bold">~{currentPackage.influencers * 200} Nodes</span>
                      </div>
                   </div>

                   <div className="mt-12 mb-8 bg-black/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
                      <div className="text-neutral-500 text-[10px] uppercase tracking-widest mb-3">Total Investment</div>
                      <div className="text-5xl font-black text-white tracking-tighter flex items-start justify-between">
                         <span className="text-gradient-gold drop-shadow-lg">{currentPackage.price.toLocaleString()}</span>
                         <span className="text-lg font-bold text-neutral-500 mt-2">XOF</span>
                      </div>
                   </div>

                   {step === 1 ? (
                     <button 
                       onClick={handleSubmit}
                       disabled={loading}
                       className="group relative w-full bg-cyan-500 text-black font-black py-6 text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-4 overflow-hidden rounded-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:bg-cyan-400"
                     >
                        <span className="relative z-10 flex items-center gap-3">
                           {loading ? <Loader2 className="animate-spin"/> : <>{t('create.button_init')} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/> </>}
                        </span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                     </button>
                   ) : (
                     <div className="bg-white/5 border border-white/10 p-5 text-center text-neutral-400 text-xs uppercase tracking-widest rounded-xl animate-pulse">
                        {t('create.awaiting')}
                     </div>
                   )}
                   
                   <div className="mt-8 flex items-center justify-center gap-4 text-neutral-600/50">
                      <ShieldCheck size={14}/>
                      <span className="text-[10px] uppercase tracking-widest font-mono">256-Bit SSL Encrypted</span>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* SUCCESS MODAL (CYBER STYLE) */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold-500 rounded-full animate-confetti shadow-[0_0_50px_#eab308]"></div>
            </div>

            <div className="bg-midnight-950/90 border border-cyan-500/50 w-full max-w-lg p-1 relative shadow-[0_0_150px_rgba(6,182,212,0.2)] animate-scale-in group rounded-2xl overflow-hidden backdrop-blur-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
               
               <div className="p-12 text-center relative overflow-hidden">
                  {/* Scanlines */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>

                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-gold-500 to-gold-600 text-black flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(234,179,8,0.4)] rounded-full">
                      <Check size={48} strokeWidth={4} />
                    </div>
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">{t('create.success_title')}</h2>
                    <p className="text-cyan-500 mb-10 text-sm uppercase tracking-widest font-mono">{t('create.success_sub')}</p>
                    
                    <div className="font-mono text-sm text-left space-y-4 mb-10 border-t border-b border-white/10 py-8 bg-white/5 rounded-xl px-6">
                       <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-neutral-500 text-xs">ID</span><span className="text-white font-bold">{createdCampaignId}</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-neutral-500 text-xs">CLIENT</span><span className="text-white font-bold">{formData.businessName}</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-neutral-500 text-xs">VECTOR</span><span className="text-cyan-400 font-bold">{formData.platform}</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-neutral-500 text-xs">PACKAGE</span><span className="text-white font-bold">{PACKAGES[formData.packageType].name}</span></div>
                       <div className="flex justify-between pt-2"><span className="text-neutral-500 text-xs">AMOUNT</span><span className="text-gold-500 font-bold">{currentPackage.price.toLocaleString()} XOF</span></div>
                    </div>

                    <button 
                      onClick={onSuccess}
                      className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 text-xs uppercase tracking-[0.2em] transition-all rounded-xl border border-white/10 hover:border-white/30"
                    >
                      {t('create.return')}
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
