
const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');
const { notifyInfluencer } = require('./whatsapp');

const PACKAGES = {
  'STARTER': 5,
  'GROWTH': 15,
  'SCALE': 40
};

/**
 * Selects influencers, updates their stats, and triggers notifications.
 * @param {string} campaignId 
 */
const launchCampaign = async (campaignId) => {
  console.log(`🚀 Launching automation for campaign: ${campaignId}`);
  
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error('Campaign not found');

  const requiredCount = PACKAGES[campaign.packageType] || 5;

  // 1. Find best matching influencers (Active, same platform, sorted by metrics)
  // We prioritize those with higher trust scores and fewer recent campaigns to spread the load
  const influencers = await Influencer.find({
    platform: campaign.platform,
    active: true
  })
  .sort({ 'metrics.trustScore': -1, 'lastCampaignId': 1 }) 
  .limit(requiredCount);

  if (influencers.length === 0) {
    console.log('⚠️ No influencers found for this campaign.');
    return;
  }

  // 2. Assign influencers to campaign & Calculate Payout
  campaign.assignedInfluencers = influencers.map(i => i._id);
  campaign.status = 'LAUNCHED';
  await campaign.save();

  // Calculate generic payout share (e.g., 60% of campaign price distributed among influencers)
  // In a real app, this logic would be more specific per package/tier
  const totalPayoutPool = campaign.price * 0.60; 
  const payoutPerInfluencer = Math.floor(totalPayoutPool / influencers.length);

  // 3. Update Influencer Stats (Earnings, History, Last Campaign)
  const influencerUpdates = influencers.map(async (inf) => {
    // Update metrics
    inf.metrics.campaignCount += 1;
    inf.metrics.totalEarnings += payoutPerInfluencer;
    inf.lastCampaignId = campaign._id;
    
    // Add to history
    inf.campaignHistory.push({
      campaignId: campaign._id,
      earnings: payoutPerInfluencer,
      status: 'ASSIGNED'
    });

    return inf.save();
  });

  await Promise.all(influencerUpdates);
  console.log(`💰 Updated stats for ${influencers.length} influencers. Payout per person: ${payoutPerInfluencer} XOF`);

  // 4. Send WhatsApp Messages asynchronously
  // We use Promise.allSettled to ensure one failure doesn't stop the batch
  const notifications = influencers.map(influencer => 
    notifyInfluencer(influencer.phone, campaign, campaign.mediaUrl)
  );

  await Promise.allSettled(notifications);
  
  console.log(`✅ Campaign launched with ${influencers.length} influencers.`);
};

module.exports = { launchCampaign };
