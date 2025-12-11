import React from 'react';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalProps {
  onNavigate: (page: string) => void;
}

export const Legal: React.FC<LegalProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in relative">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none fixed">
        <div className="absolute inset-0 bg-midnight-950/90 z-10"></div>
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover opacity-20 mix-blend-screen"
        >
           <source src="https://player.vimeo.com/external/370259942.sd.mp4?s=d7e3549d40b955700832279f60046648873752e5&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center text-gold-500 font-bold mb-8 hover:underline"
        >
          <ArrowLeft className="mr-2" size={20} />
          {t('nav.home') || 'Back to Home'}
        </button>

        <div className="bg-midnight-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-12 space-y-12 shadow-2xl">
          
          {/* Company Info */}
          <section>
            <h1 className="text-3xl font-bold text-white mb-6">Informations de l'entreprise</h1>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h2 className="text-xl font-bold text-gold-500 mb-4">DeOS Digital Solutions</h2>
              <div className="space-y-4 text-neutral-300">
                <div className="flex items-start">
                  <MapPin className="mr-3 text-neutral-500 mt-1" size={20} />
                  <p>
                    Siège Social : Haie Vive, Rue 340<br />
                    Cotonou, Bénin
                  </p>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-neutral-500" size={20} />
                  <a href="mailto:contact@deos.bj" className="hover:text-gold-500 transition-colors">contact@deos.bj</a>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-neutral-500" size={20} />
                  <a href="tel:+22900000000" className="hover:text-gold-500 transition-colors">+229 97 00 00 00</a>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Politique de Confidentialité</h2>
            <div className="text-neutral-400 space-y-4 leading-relaxed">
              <p>
                Chez <strong>KwikAds (par DeOS)</strong>, la confidentialité de vos données est notre priorité. 
                Cette politique décrit comment nous collectons, utilisons et protégeons vos informations personnelles 
                dans le cadre de nos services de publicité automatisée au Bénin et en Afrique de l'Ouest.
              </p>
              <h3 className="text-white font-semibold pt-2">1. Collecte des données</h3>
              <p>
                Nous collectons les informations nécessaires à la création de campagnes (nom de l'entreprise, 
                numéro WhatsApp, contenu publicitaire) et à l'inscription des influenceurs (profils sociaux, statistiques).
              </p>
              <h3 className="text-white font-semibold pt-2">2. Utilisation via WhatsApp Cloud API</h3>
              <p>
                Nous utilisons l'API officielle de Meta (WhatsApp Cloud API) pour automatiser les communications. 
                Aucun message n'est envoyé sans le consentement explicite des influenceurs inscrits.
              </p>
            </div>
          </section>

          {/* Terms of Service */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Conditions Générales d'Utilisation (CGU)</h2>
            <div className="text-neutral-400 space-y-4 leading-relaxed">
              <p>
                En utilisant KwikAds, vous acceptez les conditions suivantes établies par DeOS :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Les paiements via MTN Mobile Money, Moov Money et Cartes Bancaires sont finaux une fois la campagne lancée.</li>
                <li>DeOS ne garantit pas un nombre exact de ventes, mais garantit la distribution du contenu aux influenceurs sélectionnés.</li>
                <li>Tout contenu publicitaire illégal, offensant ou frauduleux sera immédiatement supprimé sans remboursement.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};