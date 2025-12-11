
export type Language = 'en' | 'fr' | 'es' | 'pt' | 'de' | 'zh';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export const translations = {
  en: {
    nav: {
      home: 'Home',
      launch: 'Ignite Campaign',
      earn: 'Creator Access',
      admin: 'Command Center',
    },
    hero: {
      new: 'The Future of Influence is Here',
      title_start: 'Dominate Local.',
      title_end: 'Ignite Conversation.',
      subtitle: 'Forget the algorithms. Infiltrate the private circles of your city. Place your brand in the pockets of thousands via trusted local voices. Instantly.',
      cta_start: 'Start Dominating',
      cta_influencer: "Join the Elite",
    },
    stats: {
      reach: 'Eyeballs Captured',
      influencers: 'Vetted Creators',
      brands: 'Brands Scaled',
      satisfaction: 'Client Obsession'
    },
    testimonials: {
      title: 'Success Stories',
      subtitle: 'Real businesses. Explosive growth. Unfiltered results.',
      t1_quote: "We didn't just fill seats; we created a movement. Tuesday night felt like New Year's Eve. The ROI is mathematically undeniable.",
      t1_author: "Amadou K.",
      t1_role: "Visionary, Le Grill Cotonou",
      t2_quote: "Traditional ads are noise. KwikAds is a whisper in the ear of thousands. The authenticity drove our highest sales quarter ever.",
      t2_author: "Jessica M.",
      t2_role: "Founder, Glow Spa",
      t3_quote: "Sold out. Complet. In 24h. If you aren't using this system, you are actively losing market share.",
      t3_author: "Marc D.",
      t3_role: "Event Architect"
    },
    audience: {
      title: 'Who is this for?',
      subtitle: 'Designed for those who demand attention.',
      rest: 'Culinary & Nightlife',
      rest_desc: 'Turn empty tables into exclusive reservations.',
      events: 'Live Experiences',
      events_desc: 'Create FOMO. Sell out venues instantly.',
      fashion: 'Vogue & Retail',
      fashion_desc: 'Drop a collection. Watch the trend spread.',
      services: 'Premium Services',
      services_desc: 'Build authority through local trust networks.',
      explore: 'Explore Use Cases'
    },
    features: {
      title_start: 'Organic Trust.',
      title_end: 'Digital Velocity.',
      desc: 'We don\'t do "ads". We engineer word-of-mouth at an industrial scale. Your brand becomes the topic of conversation in private WhatsApp groups and TikTok feeds across the city.',
      f1_title: 'Laser-Precision Targeting',
      f1_desc: 'Penetrate specific neighborhoods and demographics with surgical accuracy.',
      f2_title: 'Hypersonic Distribution',
      f2_desc: 'From "Payment" to "Viral" in under 12 minutes. Speed is your new currency.',
      f3_title: 'Crystal Clear Intelligence',
      f3_desc: 'Track every view. Measure every impact. Zero guesswork.',
    },
    steps: {
      title: ' The Blueprint',
      subtitle: 'Three steps to market dominance.',
      s1_title: '1. Craft',
      s1_desc: 'Upload your vision. Select your battlefield (Package).',
      s2_title: '2. Deploy',
      s2_desc: 'Our AI agents instantly mobilize an army of local creators.',
      s3_title: '3. Conquer',
      s3_desc: 'Watch the notifications explode. This is the power of KwikAds.',
    },
    create: {
      mission: 'MISSION',
      payment: 'PAYMENT',
      config: 'CONFIG',
      subtitle_1: '// Initialize automated marketing sequence. Precision targeting enabled.',
      subtitle_2: '// Secure transaction gateway. 256-bit encryption active.',
      section_identity: 'IDENTITY MATRIX',
      section_vector: 'ATTACK VECTOR',
      section_intensity: 'INTENSITY LEVEL',
      section_payload: 'CREATIVE PAYLOAD',
      placeholder_name: 'BUSINESS NAME',
      placeholder_phone: 'WHATSAPP BUSINESS NUMBER',
      placeholder_desc: 'CAMPAIGN OBJECTIVE / SCRIPT',
      upload_default: 'INITIATE FILE UPLOAD',
      upload_max: 'Max 50MB • MP4 / JPG / PNG',
      modify: 'Modify Configuration',
      establishing: 'Establishing Secure Link...',
      button_init: 'Initialize Sequence',
      awaiting: 'Awaiting Payment Confirmation',
      success_title: 'Mission Active',
      success_sub: 'Sequence Initiated Successfully',
      return: 'Return to Command Center'
    },
    inf: {
      join: 'Join 5,000+ Creators',
      title: 'Monetize Your Influence.',
      desc: 'Don\'t just post for free. Join KwikAds and get paid automatically for every WhatsApp status view you generate.',
      sim_earnings: 'Potential Earnings',
      sim_reach: 'Your Reach',
      sim_monthly: 'Estimated Monthly Income',
      apply: 'Apply for Access',
      name: 'FULL NAME',
      phone: 'WHATSAPP NUMBER (MOMO)',
      platform: 'VECTOR',
      followers: 'FOLLOWERS COUNT',
      contacts: 'CONTACTS COUNT (WA)',
      views: 'AVERAGE VIEWS',
      link: 'PROFILE LINK',
      proof: 'PROOF OF AUTHORITY',
      proof_desc: 'Upload screenshot of views/analytics',
      req_wa: 'Min. 2000 contacts & 400 views required',
      req_social: 'Min. 1000 followers required',
      submit: 'Initiate Verification',
      success_title: 'Application Received',
      success_desc: 'We are verifying your profile analytics. You will receive an official WhatsApp message from the KwikAds Team once approved (usually 24h).'
    },
    faq: {
      title: 'Intelligence Briefing',
      q1: 'Is the engagement real?',
      a1: '100%. We track screenshots and unique view hashes. No bots. Just real humans seeing your brand.',
      q2: 'What is the velocity?',
      a2: 'Lightning fast. Campaigns typically activate within 120 minutes of secure payment clearance.',
      q3: 'Do I control the narrative?',
      a3: 'Absolutely. You provide the creative asset and the script. Our influencers are the amplifier.',
      q4: 'Is my brand safe?',
      a4: 'Brand safety is our religion. Every creator is manually vetted and continuously monitored.',
    },
    pricing: {
      title: 'Invest in Growth',
      subtitle: 'Transparent pricing. Exponential returns.',
      choose: 'Select & Launch',
      most_popular: 'BEST VALUE'
    },
    footer: {
      slogan: 'The operating system for local virality. Bridging the gap between commerce and community through technology.',
      platform: 'Ecosystem',
      legal: 'Compliance',
      rights: 'Engineered in Benin.'
    },
    admin: {
      actions: {
         activate: 'Activate',
         suspend: 'Suspend',
         view: 'View Matrix'
      },
      ai: {
         analysis: 'System Ready',
         optimizing: 'Analyzing Network...',
         trust: 'Trust Score',
         sentiment: 'Audience Sentiment',
         projection: 'Reach Projection',
         opt: 'Network Optimization',
         opt_btn: 'Run Optimization',
         opt_done: 'Optimization Complete'
      }
    },
    // NEW SECTIONS
    roi: {
      title: 'Calculate Your Dominance',
      subtitle: 'Input your budget. Predict your impact.',
      budget: 'Campaign Budget',
      est_reach: 'Estimated Reach',
      est_conv: 'Projected Conversions',
      est_rev: 'Potential Revenue',
      disclaimer: '*Based on average network performance. Actual results vary.'
    },
    cases: {
      title: 'Declassified Files',
      subtitle: 'Operational Success Reports',
      bk_title: 'Burger King Cotonou',
      bk_res: '+340% Sales Increase on Promo Burgers',
      c_title: 'Canal+ Bénin',
      c_res: 'Record Subscriptions for World Cup',
      mtn_title: 'MTN Mobile Money',
      mtn_res: '12k App Installs in 48 Hours',
      btn_read: 'Access Full Report'
    },
    trust: {
      title: 'The Trust Protocol',
      subtitle: 'How we ensure 100% authenticity.',
      s1: 'ID Verification',
      s1_d: 'Govt ID + Biometric Scan',
      s2: 'Audience Audit',
      s2_d: 'Deep Analytics Inspection',
      s3: 'Contract Lock',
      s3_d: 'Legal Binding Agreement'
    },
    eco: {
      title: 'Integration Ecosystem',
      subtitle: 'Connects with tools you use.',
    },
    academy: {
      title: 'KwikAds Academy',
      subtitle: 'Learn the art of automated influence.',
      c1: 'Viral Engineering 101',
      c2: 'Copywriting for WhatsApp',
      c3: 'Visual Psychology'
    }
  },
  fr: {
    nav: { home: 'Accueil', launch: 'Propulser', earn: 'Créateurs', admin: 'Commandes' },
    hero: { new: 'L\'Ère de l\'Influence Automatisée', title_start: 'Dominez.', title_end: 'Convertissez.', subtitle: 'Oubliez les flyers. Ignorez les algorithmes. Infiltrez les cercles privés de votre ville. Placez votre marque dans la poche de milliers de clients via WhatsApp. Ce soir.', cta_start: 'Lancer l\'Offensive', cta_influencer: "Rejoindre l'Élite" },
    stats: { reach: 'Vues Capturées', influencers: 'Créateurs Validés', brands: 'Marques Propulsées', satisfaction: 'Obsession Client' },
    testimonials: { title: 'Histoires de Réussite', subtitle: 'De vrais business. Une croissance explosive.', t1_quote: "On n'a pas juste rempli le resto, on a créé une émeute. Le ROI est mathématiquement indéniable.", t1_author: "Amadou K.", t1_role: "Visionnaire, Le Grill", t2_quote: "La pub classique est morte. L'authenticité a explosé nos records.", t2_author: "Jessica M.", t2_role: "Fondatrice, Glow Spa", t3_quote: "Sold out en 24h. C'est ça la puissance.", t3_author: "Marc D.", t3_role: "Architecte Événementiel" },
    audience: { title: 'Pour ceux qui osent', subtitle: 'Conçu pour les marques exigeantes.', rest: 'Culinaire & Nightlife', rest_desc: 'Tables vides -> Réservations exclusives.', events: 'Expériences Live', events_desc: 'FOMO immédiat. Sold out.', fashion: 'Mode & Luxe', fashion_desc: 'Lancez une tendance.', services: 'Services Premium', services_desc: 'Autorité et confiance locale.', explore: 'Explorer les Cas' },
    features: { title_start: 'Confiance Organique.', title_end: 'Vitesse Digitale.', desc: 'Industrialisez le bouche-à-oreille. Votre marque dans chaque groupe WhatsApp.', f1_title: 'Ciblage Chirurgical', f1_desc: 'Quartiers et démographies spécifiques.', f2_title: 'Distribution Hypersonique', f2_desc: 'Viral en 120 minutes.', f3_title: 'Intelligence Cristalline', f3_desc: 'Traquez chaque vue.' },
    steps: { title: 'Le Plan de Bataille', subtitle: 'Trois étapes vers la domination.', s1_title: '1. Configurer', s1_desc: 'Vision & Puissance (Pack).', s2_title: '2. Déployer', s2_desc: 'Mobilisation armée IA.', s3_title: '3. Conquérir', s3_desc: 'Explosion des notifs.' },
    create: { mission: 'MISSION', payment: 'PAIEMENT', config: 'CONFIG', subtitle_1: '// Initialisation séquence marketing.', subtitle_2: '// Passerelle sécurisée 256-bit.', section_identity: 'MATRICE IDENTITÉ', section_vector: 'VECTEUR ATTAQUE', section_intensity: 'INTENSITÉ', section_payload: 'CONTENU', placeholder_name: 'NOM BUSINESS', placeholder_phone: 'NUMÉRO WA', placeholder_desc: 'OBJECTIF', upload_default: 'INITIER UPLOAD', upload_max: 'Max 50MB', modify: 'Modifier', establishing: 'Lien Sécurisé...', button_init: 'Initialiser', awaiting: 'Attente Confirmation', success_title: 'Mission Active', success_sub: 'Séquence Initiée', return: 'Retour QG' },
    inf: { join: 'Rejoindre 5000+ Créateurs', title: 'Monétisez votre Influence.', desc: 'Soyez payé pour chaque vue WhatsApp.', sim_earnings: 'Revenus Potentiels', sim_reach: 'Votre Portée', sim_monthly: 'Revenu Mensuel', apply: 'Demander Accès', name: 'NOM COMPLET', phone: 'NUMÉRO WA', platform: 'VECTEUR', followers: 'ABONNÉS', contacts: 'CONTACTS', views: 'VUES MOYENNES', link: 'LIEN PROFIL', proof: 'PREUVE', proof_desc: 'Screenshot stats', req_wa: 'Min 2000 contacts', req_social: 'Min 1000 abonnés', submit: 'Vérification', success_title: 'Reçu', success_desc: 'Vérification en cours...' },
    faq: { title: 'Briefing Intelligence', q1: 'Engagement réel ?', a1: '100% Humain. Pas de bots.', q2: 'Vélocité ?', a2: 'Foudroyante. 120 min max.', q3: 'Contrôle narratif ?', a3: 'Total. Vous êtes le réalisateur.', q4: 'Sécurité marque ?', a4: 'Audit manuel constant.' },
    pricing: { title: 'Investir', subtitle: 'Retours exponentiels.', choose: 'Sélectionner', most_popular: 'TOP' },
    footer: { slogan: 'OS de la viralité locale.', platform: 'Écosystème', legal: 'Conformité', rights: 'Ingénierie Béninoise.' },
    admin: { actions: { activate: 'Activer', suspend: 'Suspendre', view: 'Voir' }, ai: { analysis: 'Prêt', optimizing: 'Analyse...', trust: 'Score Confiance', sentiment: 'Sentiment', projection: 'Projection', opt: 'Optimisation', opt_btn: 'Lancer', opt_done: 'Terminé' } },
    roi: {
      title: 'Calculez votre Domination',
      subtitle: 'Entrez votre budget. Prédisez l\'impact.',
      budget: 'Budget Campagne',
      est_reach: 'Portée Estimée',
      est_conv: 'Conversions Projetées',
      est_rev: 'Revenu Potentiel',
      disclaimer: '*Basé sur la performance moyenne du réseau.'
    },
    cases: {
      title: 'Dossiers Déclassifiés',
      subtitle: 'Rapports de Succès Opérationnel',
      bk_title: 'Burger King Cotonou',
      bk_res: '+340% de Ventes sur Promo Burgers',
      c_title: 'Canal+ Bénin',
      c_res: 'Record d\'Abonnements Coupe du Monde',
      mtn_title: 'MTN Mobile Money',
      mtn_res: '12k Installations App en 48h',
      btn_read: 'Accéder au Rapport'
    },
    trust: {
      title: 'Protocole de Confiance',
      subtitle: 'Authenticité garantie à 100%.',
      s1: 'Vérification ID',
      s1_d: 'Pièce Identité + Scan Biométrique',
      s2: 'Audit Audience',
      s2_d: 'Inspection Analytique Profonde',
      s3: 'Verrou Contractuel',
      s3_d: 'Accord Juridique Contraignant'
    },
    eco: {
      title: 'Écosystème Intégré',
      subtitle: 'Connecté à vos outils.',
    },
    academy: {
      title: 'Académie KwikAds',
      subtitle: 'Maîtrisez l\'art de l\'influence.',
      c1: 'Ingénierie Virale 101',
      c2: 'Copywriting pour WhatsApp',
      c3: 'Psychologie Visuelle'
    }
  },
  es: {
    nav: { home: 'Inicio', launch: 'Lanzar', earn: 'Creadores', admin: 'Admin' },
    hero: { new: 'El Futuro es Ahora', title_start: 'Domina.', title_end: 'Local.', subtitle: 'Olvida los algoritmos.', cta_start: 'Dominar Ahora', cta_influencer: 'Únete a la Élite' },
    create: { mission: 'MISIÓN', payment: 'PAGO', config: 'CONFIG', section_identity: 'IDENTIDAD', section_vector: 'VECTOR', section_intensity: 'INTENSIDAD', section_payload: 'CONTENIDO', placeholder_name: 'NOMBRE NEGOCIO', placeholder_phone: 'TELÉFONO', placeholder_desc: 'OBJETIVO', upload_default: 'SUBIR ARCHIVO', button_init: 'Iniciar', awaiting: 'Esperando Pago', success_title: 'Misión Activa', success_sub: 'Iniciado', return: 'Volver' },
    inf: { join: 'Únete', title: 'Monetiza', desc: 'Gana dinero.', sim_earnings: 'Ganancias', sim_reach: 'Alcance', sim_monthly: 'Ingreso Mensual', apply: 'Aplicar', name: 'NOMBRE', phone: 'TELÉFONO', platform: 'PLATAFORMA', followers: 'SEGUIDORES', contacts: 'CONTACTOS', views: 'VISTAS', link: 'ENLACE', proof: 'PRUEBA', proof_desc: 'Subir captura', req_wa: 'Min 2000 contactos', req_social: 'Min 1000 seguidores', submit: 'Enviar', success_title: 'Recibido', success_desc: 'Verificando...' },
    pricing: { title: 'Invierte', subtitle: 'Retornos masivos.', choose: 'Seleccionar', most_popular: 'TOP' },
    footer: { slogan: 'El sistema operativo de la viralidad.', platform: 'Plataforma', legal: 'Legal', rights: 'Hecho en Benín.' },
    admin: { actions: { activate: 'Activar', suspend: 'Suspender', view: 'Ver' }, ai: { analysis: 'Listo', optimizing: 'Analizando...', trust: 'Confianza', sentiment: 'Sentimiento', projection: 'Proyección', opt: 'Optimizar', opt_btn: 'Ejecutar', opt_done: 'Listo' } },
    roi: { title: 'Calcula tu Dominio', subtitle: 'Presupuesto vs Impacto', budget: 'Presupuesto', est_reach: 'Alcance', est_conv: 'Conversiones', est_rev: 'Ingresos', disclaimer: '*Estimado' },
    cases: { title: 'Casos de Éxito', subtitle: 'Reportes Operacionales', bk_title: 'Burger King', bk_res: '+340% Ventas', btn_read: 'Leer Reporte' },
    trust: { title: 'Protocolo Confianza', subtitle: '100% Auténtico', s1: 'Verificación ID', s1_d: 'Scan Biométrico', s2: 'Audit Audiencia', s2_d: 'Analítica', s3: 'Contrato', s3_d: 'Legal' },
    eco: { title: 'Ecosistema', subtitle: 'Conectado' },
    academy: { title: 'Academia', subtitle: 'Aprende', c1: 'Viral 101', c2: 'Copywriting', c3: 'Psicología' }
  },
  // Brief placeholders for other languages to prevent errors, mirroring structure
  pt: { nav: { home: 'Início', launch: 'Lançar', earn: 'Criadores', admin: 'Admin' }, hero: { new: 'O Futuro', title_start: 'Domine', title_end: 'Local', subtitle: 'Esqueça algoritmos.', cta_start: 'Dominar', cta_influencer: 'Junte-se' }, create: { mission: 'MISSÃO', payment: 'PAGAMENTO', config: 'CONFIG', section_identity: 'ID', section_vector: 'VETOR', section_intensity: 'INTENSIDADE', section_payload: 'CONTEÚDO', placeholder_name: 'NOME', placeholder_phone: 'TEL', placeholder_desc: 'OBJETIVO', upload_default: 'UPLOAD', button_init: 'Iniciar', awaiting: 'Aguardando', success_title: 'Ativo', success_sub: 'Sucesso', return: 'Voltar' }, inf: { join: 'Junte-se', title: 'Monetize', desc: 'Ganhe.', sim_earnings: 'Ganhos', sim_reach: 'Alcance', sim_monthly: 'Mensal', apply: 'Aplicar', name: 'NOME', phone: 'TEL', platform: 'PLAT', followers: 'SEGUIDORES', contacts: 'CONTATOS', views: 'VIEWS', link: 'LINK', proof: 'PROVA', proof_desc: 'Print', req_wa: 'Min 2000', req_social: 'Min 1000', submit: 'Enviar', success_title: 'Recebido', success_desc: 'Verificando' }, pricing: { title: 'Investir', subtitle: 'Retornos', choose: 'Escolher', most_popular: 'TOP' }, footer: { slogan: 'OS da viralidade.', platform: 'Plat', legal: 'Legal', rights: 'Benin.' }, admin: { actions: { activate: 'Ativar', suspend: 'Suspender', view: 'Ver' }, ai: { analysis: 'Pronto', optimizing: '...', trust: 'Confiança', sentiment: 'Sentimento', projection: 'Projeção', opt: 'Otimizar', opt_btn: 'Ir', opt_done: 'Fim' } }, roi: { title: 'Calcule', subtitle: 'Impacto', budget: 'Orçamento', est_reach: 'Alcance', est_conv: 'Conv', est_rev: 'Receita', disclaimer: '*' }, cases: { title: 'Casos', subtitle: 'Sucesso', bk_title: 'BK', bk_res: 'Vendas', btn_read: 'Ler' }, trust: { title: 'Confiança', subtitle: '100%', s1: 'ID', s1_d: 'Bio', s2: 'Audit', s2_d: 'Data', s3: 'Contrato', s3_d: 'Legal' }, eco: { title: 'Eco', subtitle: 'Conexão' }, academy: { title: 'Academia', subtitle: 'Aprenda', c1: 'Viral', c2: 'Copy', c3: 'Psi' } },
  de: { nav: { home: 'Start', launch: 'Starten', earn: 'Creator', admin: 'Admin' }, hero: { new: 'Zukunft', title_start: 'Dominieren', title_end: 'Lokal', subtitle: 'Vergessen Sie Algorithmen.', cta_start: 'Starten', cta_influencer: 'Beitreten' }, create: { mission: 'MISSION', payment: 'ZAHLUNG', config: 'KONFIG', section_identity: 'ID', section_vector: 'VEKTOR', section_intensity: 'INTENSITÄT', section_payload: 'INHALT', placeholder_name: 'NAME', placeholder_phone: 'TEL', placeholder_desc: 'ZIEL', upload_default: 'UPLOAD', button_init: 'Starten', awaiting: 'Warten', success_title: 'Aktiv', success_sub: 'Erfolg', return: 'Zurück' }, inf: { join: 'Beitreten', title: 'Verdienen', desc: 'Geld.', sim_earnings: 'Einnahmen', sim_reach: 'Reichweite', sim_monthly: 'Monatlich', apply: 'Bewerben', name: 'NAME', phone: 'TEL', platform: 'PLATTFORM', followers: 'FOLLOWER', contacts: 'KONTAKTE', views: 'VIEWS', link: 'LINK', proof: 'BEWEIS', proof_desc: 'Screenshot', req_wa: 'Min 2000', req_social: 'Min 1000', submit: 'Senden', success_title: 'Erhalten', success_desc: 'Prüfung' }, pricing: { title: 'Investieren', subtitle: 'Rendite', choose: 'Wählen', most_popular: 'TOP' }, footer: { slogan: 'OS für Viralität.', platform: 'Plattform', legal: 'Recht', rights: 'Benin.' }, admin: { actions: { activate: 'Aktivieren', suspend: 'Suspendieren', view: 'Ansicht' }, ai: { analysis: 'Bereit', optimizing: '...', trust: 'Vertrauen', sentiment: 'Stimmung', projection: 'Prognose', opt: 'Optimieren', opt_btn: 'Start', opt_done: 'Fertig' } }, roi: { title: 'Rechner', subtitle: 'Einfluss', budget: 'Budget', est_reach: 'Reichweite', est_conv: 'Conv', est_rev: 'Umsatz', disclaimer: '*' }, cases: { title: 'Cases', subtitle: 'Erfolg', bk_title: 'BK', bk_res: 'Umsatz', btn_read: 'Lesen' }, trust: { title: 'Vertrauen', subtitle: '100%', s1: 'ID', s1_d: 'Bio', s2: 'Audit', s2_d: 'Data', s3: 'Vertrag', s3_d: 'Recht' }, eco: { title: 'Öko', subtitle: 'Verbinden' }, academy: { title: 'Akademie', subtitle: 'Lernen', c1: 'Viral', c2: 'Copy', c3: 'Psy' } },
  zh: { nav: { home: '首页', launch: '启动', earn: '创作者', admin: '管理' }, hero: { new: '未来', title_start: '统治', title_end: '本地', subtitle: '忘记算法', cta_start: '开始', cta_influencer: '加入' }, create: { mission: '任务', payment: '支付', config: '配置', section_identity: 'ID', section_vector: '矢量', section_intensity: '强度', section_payload: '内容', placeholder_name: '名称', placeholder_phone: '电话', placeholder_desc: '目标', upload_default: '上传', button_init: '启动', awaiting: '等待', success_title: '激活', success_sub: '成功', return: '返回' }, inf: { join: '加入', title: '变现', desc: '赚钱', sim_earnings: '收入', sim_reach: '覆盖', sim_monthly: '月入', apply: '申请', name: '姓名', phone: '电话', platform: '平台', followers: '粉丝', contacts: '联系人', views: '浏览', link: '链接', proof: '证明', proof_desc: '截图', req_wa: '最少2000', req_social: '最少1000', submit: '提交', success_title: '收到', success_desc: '验证中' }, pricing: { title: '投资', subtitle: '回报', choose: '选择', most_popular: '最佳' }, footer: { slogan: '病毒式系统', platform: '平台', legal: '法律', rights: '贝宁' }, admin: { actions: { activate: '激活', suspend: '暂停', view: '查看' }, ai: { analysis: '就绪', optimizing: '...', trust: '信任', sentiment: '情感', projection: '预测', opt: '优化', opt_btn: '运行', opt_done: '完成' } }, roi: { title: '计算', subtitle: '影响', budget: '预算', est_reach: '覆盖', est_conv: '转化', est_rev: '收入', disclaimer: '*' }, cases: { title: '案例', subtitle: '成功', bk_title: 'BK', bk_res: '销售', btn_read: '阅读' }, trust: { title: '信任', subtitle: '100%', s1: 'ID', s1_d: '生物', s2: '审计', s2_d: '数据', s3: '合同', s3_d: '法律' }, eco: { title: '生态', subtitle: '连接' }, academy: { title: '学院', subtitle: '学习', c1: '病毒', c2: '文案', c3: '心理' } }
};
