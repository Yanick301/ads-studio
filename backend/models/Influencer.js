
const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // WhatsApp number
  platform: { 
    type: String, 
    enum: ['WHATSAPP', 'TIKTOK', 'INSTAGRAM', 'FACEBOOK', 'SNAPCHAT'], 
    required: true 
  },
  profileLink: { type: String, required: true },
  followers: { type: Number, required: true },
  active: { type: Boolean, default: false }, // Requires admin approval
  
  // Performance Metrics
  metrics: {
    totalEarnings: { type: Number, default: 0 },
    averageClickThroughRate: { type: Number, default: 0 }, // CTR in percentage
    campaignCount: { type: Number, default: 0 },
    trustScore: { type: Number, default: 100 } // Internal score based on reliability
  },

  // Campaign Tracking
  lastCampaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  campaignHistory: [{
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
    assignedAt: { type: Date, default: Date.now },
    earnings: { type: Number, default: 0 },
    status: { type: String, enum: ['ASSIGNED', 'COMPLETED', 'FAILED'], default: 'ASSIGNED' },
    verifiedAt: { type: Date },
    paidAt: { type: Date }
  }],

  // Digital Wallet (NEW)
  wallet: {
    balance: { type: Number, default: 0 },
    totalEarned: { type: Number, default: 0 },
    transactions: [{
      type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
      amount: { type: Number, required: true },
      campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
      provider: { type: String, enum: ['MTN', 'WAVE', 'PAYTECH'] },
      description: { type: String },
      externalId: { type: String },
      timestamp: { type: Date, default: Date.now }
    }]
  },

  // Gamification (NEW)
  level: { 
    type: String, 
    enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'], 
    default: 'BRONZE' 
  },
  badges: [{ 
    type: String,
    enum: ['RAPID_RESPONSE', 'HIGH_PERFORMER', 'LOYALTY', 'TOP_INFLUENCER']
  }],

  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Influencer', InfluencerSchema);
