
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: true },
  platform: { 
    type: String, 
    enum: ['WHATSAPP', 'TIKTOK', 'INSTAGRAM', 'FACEBOOK', 'SNAPCHAT'], 
    required: true 
  },
  packageType: { 
    type: String, 
    enum: ['STARTER', 'GROWTH', 'SCALE'], 
    required: true 
  },
  price: { type: Number, required: true },
  mediaUrl: { type: String }, // URL to image/video
  status: { 
    type: String, 
    enum: ['PENDING_PAYMENT', 'PAID', 'LAUNCHED', 'COMPLETED'],
    default: 'PENDING_PAYMENT'
  },
  transactionId: { type: String },
  assignedInfluencers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Influencer' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
