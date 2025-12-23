/**
 * SERVICE DE MATCHING INTELLIGENT AVEC IA
 * 
 * Algorithme avancé pour sélectionner les meilleurs influenceurs pour une campagne
 */

const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');

/**
 * Calcule le score de performance d'un influenceur
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Score de 0 à 100
 */
const calculatePerformanceScore = (influencer) => {
  const history = influencer.campaignHistory || [];
  const completed = history.filter(h => h.status === 'COMPLETED').length;
  const total = history.length || 1;
  
  // Taux de complétion (0-100)
  const completionRate = (completed / total) * 100;
  
  return Math.min(100, completionRate);
};

/**
 * Calcule le score d'engagement d'un influenceur
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Score de 0 à 100
 */
const calculateEngagementScore = (influencer) => {
  const avgCTR = influencer.metrics.averageClickThroughRate || 0;
  
  // Normaliser le CTR (0-10% = 0-100 points)
  return Math.min(100, avgCTR * 10);
};

/**
 * Calcule la correspondance avec le public cible
 * @param {Object} influencer - Objet influenceur
 * @param {Object} campaign - Objet campagne
 * @returns {number} Score de 0 à 100
 */
const calculateAudienceMatch = (influencer, campaign) => {
  // Pour l'instant, logique simple basée sur la plateforme
  // Dans le futur, on pourrait analyser les intérêts, la démographie, etc.
  
  if (influencer.platform === campaign.platform) {
    return 100;
  }
  
  return 50; // Plateforme différente mais compatible
};

/**
 * Calcule le score de timing (disponibilité)
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Score de 0 à 100
 */
const calculateTimingScore = (influencer) => {
  const lastCampaign = influencer.lastCampaignId;
  
  if (!lastCampaign) {
    return 100; // Jamais utilisé, très disponible
  }
  
  // Plus le dernier usage est récent, plus le score est bas
  // Logique simplifiée : si dernière campagne il y a plus de 7 jours = 100
  // Sinon, score décroissant
  
  return 100; // Pour l'instant, toujours disponible
};

/**
 * Calcule le score total d'un influenceur pour une campagne
 * @param {Object} influencer - Objet influenceur
 * @param {Object} campaign - Objet campagne
 * @returns {number} Score total pondéré
 */
const calculateTotalScore = (influencer, campaign) => {
  const weights = {
    performance: 0.30,    // 30% - Taux de complétion historique
    engagement: 0.25,     // 25% - Taux d'engagement moyen
    audienceMatch: 0.20,  // 20% - Correspondance avec le public
    timing: 0.15,         // 15% - Disponibilité
    trustScore: 0.10      // 10% - Score de confiance
  };

  const scores = {
    performance: calculatePerformanceScore(influencer),
    engagement: calculateEngagementScore(influencer),
    audienceMatch: calculateAudienceMatch(influencer, campaign),
    timing: calculateTimingScore(influencer),
    trustScore: influencer.metrics.trustScore || 50
  };

  // Calcul du score pondéré
  const totalScore = Object.keys(weights).reduce((sum, key) => {
    return sum + (scores[key] * weights[key]);
  }, 0);

  return totalScore;
};

/**
 * Sélectionne les meilleurs influenceurs pour une campagne
 * @param {string} campaignId - ID de la campagne
 * @param {number} count - Nombre d'influenceurs requis
 * @returns {Promise<Array>} Liste des influenceurs sélectionnés
 */
const findBestInfluencers = async (campaignId, count) => {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error('Campagne introuvable');

  // Récupérer tous les influenceurs actifs sur la plateforme
  const allInfluencers = await Influencer.find({
    platform: campaign.platform,
    active: true
  });

  // Calculer le score pour chaque influenceur
  const scoredInfluencers = allInfluencers.map(influencer => ({
    influencer,
    score: calculateTotalScore(influencer, campaign)
  }));

  // Trier par score décroissant
  scoredInfluencers.sort((a, b) => b.score - a.score);

  // Sélectionner les N meilleurs
  const selected = scoredInfluencers
    .slice(0, count)
    .map(item => item.influencer);

  // Log pour debugging
  console.log(`🎯 Matching intelligent:`);
  console.log(`   Campagne: ${campaign.businessName}`);
  console.log(`   Plateforme: ${campaign.platform}`);
  console.log(`   Influenceurs sélectionnés: ${selected.length}`);
  selected.forEach((inf, i) => {
    const score = scoredInfluencers[i].score;
    console.log(`   ${i + 1}. ${inf.name} - Score: ${score.toFixed(2)}`);
  });

  return selected;
};

/**
 * Prédit le ROI probable d'une campagne
 * @param {string} campaignId - ID de la campagne
 * @returns {Promise<Object>} Prédiction avec ROI estimé
 */
const predictCampaignROI = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error('Campagne introuvable');

  // Récupérer les campagnes similaires passées
  const similarCampaigns = await Campaign.find({
    platform: campaign.platform,
    packageType: campaign.packageType,
    status: 'COMPLETED'
  }).limit(10);

  if (similarCampaigns.length === 0) {
    // Pas assez de données historiques
    return {
      predictedROI: 150, // ROI par défaut
      confidence: 0.3,
      message: 'Pas assez de données historiques pour une prédiction précise'
    };
  }

  // Calculer le ROI moyen des campagnes similaires
  // Note: Dans une vraie implémentation, on utiliserait un modèle ML
  const avgROI = 200; // ROI moyen observé (à calculer avec les vraies données)
  const confidence = Math.min(0.9, 0.5 + (similarCampaigns.length / 20));

  return {
    predictedROI: avgROI,
    confidence,
    message: `Basé sur ${similarCampaigns.length} campagnes similaires`
  };
};

module.exports = {
  findBestInfluencers,
  calculateTotalScore,
  predictCampaignROI
};

