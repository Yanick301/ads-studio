
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
    status: { type: String, enum: ['ASSIGNED', 'COMPLETED', 'FAILED'], default: 'ASSIGNED' }
  }],

  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Influencer', InfluencerSchema);
