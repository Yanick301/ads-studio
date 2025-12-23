/**
 * SERVICE D'AUTOMATISATION DES PAIEMENTS
 * 
 * Gère les paiements automatiques aux influenceurs après vérification
 */

const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');
const axios = require('axios');

// Configuration des APIs de paiement
const MTN_MOMO_API = process.env.MTN_MOMO_API_URL;
const WAVE_API = process.env.WAVE_API_URL;
const PAYTECH_API = process.env.PAYTECH_API_URL;

/**
 * Calcule le montant à payer à un influenceur pour une campagne
 * @param {Object} campaign - Objet campagne
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Montant en XOF
 */
const calculatePayout = (campaign, influencer) => {
  // Base: 60% du prix de campagne réparti entre les influenceurs
  const totalPayoutPool = campaign.price * 0.60;
  const influencerCount = campaign.assignedInfluencers.length;
  const basePayout = Math.floor(totalPayoutPool / influencerCount);

  // Bonus basé sur le niveau de l'influenceur
  const levelBonus = getLevelBonus(influencer);
  
  // Bonus de performance (si engagement élevé)
  const performanceBonus = getPerformanceBonus(influencer);

  const totalPayout = basePayout + levelBonus + performanceBonus;
  
  return Math.floor(totalPayout);
};

/**
 * Calcule le bonus selon le niveau de l'influenceur
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Bonus en XOF
 */
const getLevelBonus = (influencer) => {
  const campaignCount = influencer.metrics.campaignCount || 0;
  
  if (campaignCount >= 100) {
    return 2000; // Platinum: +2000 XOF
  } else if (campaignCount >= 30) {
    return 1000; // Gold: +1000 XOF
  } else if (campaignCount >= 10) {
    return 500;  // Silver: +500 XOF
  }
  
  return 0; // Bronze: pas de bonus
};

/**
 * Calcule le bonus de performance
 * @param {Object} influencer - Objet influenceur
 * @returns {number} Bonus en XOF
 */
const getPerformanceBonus = (influencer) => {
  const avgCTR = influencer.metrics.averageClickThroughRate || 0;
  
  if (avgCTR >= 5) {
    return 1500; // Excellent engagement
  } else if (avgCTR >= 3) {
    return 750;  // Bon engagement
  }
  
  return 0;
};

/**
 * Ajoute des fonds au portefeuille d'un influenceur
 * @param {string} influencerId - ID de l'influenceur
 * @param {number} amount - Montant à ajouter
 * @param {string} campaignId - ID de la campagne
 * @returns {Promise<Object>} Transaction créée
 */
const addToWallet = async (influencerId, amount, campaignId) => {
  const influencer = await Influencer.findById(influencerId);
  if (!influencer) throw new Error('Influenceur introuvable');

  // Initialiser le portefeuille si nécessaire
  if (!influencer.wallet) {
    influencer.wallet = {
      balance: 0,
      totalEarned: 0,
      transactions: []
    };
  }

  // Ajouter au solde
  influencer.wallet.balance += amount;
  influencer.wallet.totalEarned += amount;

  // Enregistrer la transaction
  influencer.wallet.transactions.push({
    type: 'CREDIT',
    amount,
    campaignId,
    description: `Paiement pour campagne ${campaignId}`,
    timestamp: new Date()
  });

  await influencer.save();

  return {
    newBalance: influencer.wallet.balance,
    transactionId: influencer.wallet.transactions[influencer.wallet.transactions.length - 1]._id
  };
};

/**
 * Effectue un paiement vers Mobile Money
 * @param {string} influencerId - ID de l'influenceur
 * @param {number} amount - Montant à transférer
 * @param {string} provider - 'MTN', 'WAVE', ou 'PAYTECH'
 * @returns {Promise<Object>} Résultat du paiement
 */
const processPayout = async (influencerId, amount, provider = 'MTN') => {
  const influencer = await Influencer.findById(influencerId);
  if (!influencer) throw new Error('Influenceur introuvable');

  if (!influencer.wallet || influencer.wallet.balance < amount) {
    throw new Error('Solde insuffisant');
  }

  try {
    // Appel à l'API de paiement correspondante
    let response;
    
    switch (provider) {
      case 'MTN':
        response = await axios.post(MTN_MOMO_API + '/transfer', {
          phone: influencer.phone,
          amount,
          currency: 'XOF'
        });
        break;
        
      case 'WAVE':
        response = await axios.post(WAVE_API + '/send-money', {
          recipient: influencer.phone,
          amount,
          currency: 'XOF'
        });
        break;
        
      case 'PAYTECH':
        response = await axios.post(PAYTECH_API + '/payout', {
          recipient: influencer.phone,
          amount,
          currency: 'XOF'
        });
        break;
        
      default:
        throw new Error('Provider de paiement non supporté');
    }

    // Déduire du solde
    influencer.wallet.balance -= amount;
    
    // Enregistrer la transaction
    influencer.wallet.transactions.push({
      type: 'DEBIT',
      amount,
      provider,
      description: `Retrait vers ${provider}`,
      externalId: response.data.transactionId,
      timestamp: new Date()
    });

    await influencer.save();

    return {
      success: true,
      transactionId: response.data.transactionId,
      newBalance: influencer.wallet.balance
    };
  } catch (error) {
    console.error(`Erreur lors du paiement ${provider}:`, error);
    throw error;
  }
};

/**
 * Paiement automatique après vérification d'une campagne
 * @param {string} influencerId - ID de l'influenceur
 * @param {string} campaignId - ID de la campagne
 * @returns {Promise<Object>} Résultat du paiement
 */
const autoPayAfterVerification = async (influencerId, campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  const influencer = await Influencer.findById(influencerId);

  if (!campaign || !influencer) {
    throw new Error('Campagne ou influenceur introuvable');
  }

  // Calculer le montant
  const amount = calculatePayout(campaign, influencer);

  // Ajouter au portefeuille
  const walletUpdate = await addToWallet(influencerId, amount, campaignId);

  // Mettre à jour l'historique de campagne
  const historyEntry = influencer.campaignHistory.find(
    h => h.campaignId.toString() === campaignId
  );
  
  if (historyEntry) {
    historyEntry.earnings = amount;
    historyEntry.paidAt = new Date();
    await influencer.save();
  }

  console.log(`💰 Paiement automatique: ${influencer.name} - ${amount} XOF`);

  return {
    amount,
    walletBalance: walletUpdate.newBalance,
    message: 'Paiement ajouté au portefeuille'
  };
};

module.exports = {
  calculatePayout,
  addToWallet,
  processPayout,
  autoPayAfterVerification,
  getLevelBonus,
  getPerformanceBonus
};

