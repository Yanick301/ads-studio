/**
 * SERVICE DE VÉRIFICATION AUTOMATIQUE DES POSTS
 * 
 * Ce service vérifie que les influenceurs ont réellement posté le contenu de la campagne
 */

const axios = require('axios');
const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');

// Configuration Google Vision API (ou AWS Rekognition)
const VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY;
const VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

/**
 * Vérifie qu'une image contient le contenu de la campagne
 * @param {string} imageUrl - URL de l'image à vérifier
 * @param {string} campaignId - ID de la campagne
 * @returns {Promise<boolean>}
 */
const verifyImageContent = async (imageUrl, campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return false;

    // Appel à Google Vision API pour détecter le texte et les objets
    const response = await axios.post(
      `${VISION_API_URL}?key=${VISION_API_KEY}`,
      {
        requests: [{
          image: { source: { imageUri: imageUrl } },
          features: [
            { type: 'TEXT_DETECTION' },
            { type: 'LABEL_DETECTION', maxResults: 10 }
          ]
        }]
      }
    );

    const annotations = response.data.responses[0];
    
    // Vérifier si le texte de la campagne est présent
    const detectedText = annotations.textAnnotations?.[0]?.description || '';
    const campaignKeywords = campaign.description.toLowerCase().split(' ');
    const matches = campaignKeywords.filter(keyword => 
      detectedText.toLowerCase().includes(keyword)
    );

    // Si au moins 30% des mots-clés sont détectés, considérer comme valide
    return matches.length / campaignKeywords.length >= 0.3;
  } catch (error) {
    console.error('Erreur lors de la vérification d\'image:', error);
    return false;
  }
};

/**
 * Vérifie qu'un screenshot est récent (dans les 24 dernières heures)
 * @param {Date} screenshotDate - Date du screenshot
 * @returns {boolean}
 */
const verifyTimestamp = (screenshotDate) => {
  const now = new Date();
  const diffHours = (now - screenshotDate) / (1000 * 60 * 60);
  return diffHours <= 24;
};

/**
 * Envoie une demande de confirmation via WhatsApp
 * @param {string} influencerPhone - Numéro de téléphone de l'influenceur
 * @param {string} campaignId - ID de la campagne
 */
const requestConfirmation = async (influencerPhone, campaignId) => {
  const { notifyInfluencer } = require('./whatsapp');
  const campaign = await Campaign.findById(campaignId);
  
  // Envoyer un message avec bouton interactif
  // Note: Nécessite un template WhatsApp Business approuvé
  await notifyInfluencer(influencerPhone, {
    ...campaign.toObject(),
    description: `Confirmez-vous avoir posté le contenu de la campagne "${campaign.businessName}" ?`
  }, null);
};

/**
 * Vérifie la complétion d'une campagne par un influenceur
 * @param {string} influencerId - ID de l'influenceur
 * @param {string} campaignId - ID de la campagne
 * @param {string} proofImageUrl - URL de l'image de preuve
 * @returns {Promise<{verified: boolean, reason?: string}>}
 */
const verifyCampaignCompletion = async (influencerId, campaignId, proofImageUrl) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);

    if (!influencer || !campaign) {
      return { verified: false, reason: 'Influenceur ou campagne introuvable' };
    }

    // 1. Vérifier que l'influenceur est assigné à cette campagne
    if (!campaign.assignedInfluencers.includes(influencerId)) {
      return { verified: false, reason: 'Influenceur non assigné à cette campagne' };
    }

    // 2. Vérifier le contenu de l'image
    const imageValid = await verifyImageContent(proofImageUrl, campaignId);
    if (!imageValid) {
      return { verified: false, reason: 'Le contenu de l\'image ne correspond pas à la campagne' };
    }

    // 3. Vérifier le timestamp (si fourni)
    // Note: Le timestamp devrait être extrait des métadonnées de l'image

    // 4. Mettre à jour le statut
    const historyEntry = influencer.campaignHistory.find(
      h => h.campaignId.toString() === campaignId
    );
    
    if (historyEntry) {
      historyEntry.status = 'COMPLETED';
      historyEntry.verifiedAt = new Date();
      await influencer.save();
    }

    // 5. Mettre à jour le trust score de l'influenceur
    influencer.metrics.trustScore = Math.min(100, influencer.metrics.trustScore + 5);
    await influencer.save();

    return { verified: true };
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    return { verified: false, reason: 'Erreur technique' };
  }
};

/**
 * Programme une vérification automatique après un délai
 * @param {string} influencerId - ID de l'influenceur
 * @param {string} campaignId - ID de la campagne
 * @param {number} delayHours - Délai en heures (défaut: 2)
 */
const scheduleVerification = (influencerId, campaignId, delayHours = 2) => {
  setTimeout(async () => {
    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);
    
    // Vérifier si la campagne a été complétée
    const historyEntry = influencer.campaignHistory.find(
      h => h.campaignId.toString() === campaignId && h.status === 'COMPLETED'
    );

    if (!historyEntry) {
      // Envoyer un rappel
      await requestConfirmation(influencer.phone, campaignId);
      
      // Programmer une autre vérification dans 4h
      scheduleVerification(influencerId, campaignId, 4);
    }
  }, delayHours * 60 * 60 * 1000);
};

module.exports = {
  verifyCampaignCompletion,
  verifyImageContent,
  verifyTimestamp,
  requestConfirmation,
  scheduleVerification
};

