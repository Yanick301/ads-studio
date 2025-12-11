
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Influencer = require('../models/Influencer');
const { launchCampaign } = require('../services/matcher');

// --- CAMPAIGNS ---

// Create a new campaign
router.post('/campaigns', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PAYMENTS (MOCK & WEBHOOKS) ---

// Create Payment Intent (Mock for Frontend)
router.post('/payments/create', async (req, res) => {
  const { campaignId, provider } = req.body;
  // Here you would integrate Stripe/PayTech/MTN API to get a payment link
  // For this demo, we simulate a successful initiation
  res.json({ 
    success: true, 
    paymentUrl: `https://pay.mock.com/${campaignId}`, 
    transactionId: `tx_${Date.now()}` 
  });
});

// Confirm Payment (Called by Payment Gateway Webhook)
// This triggers the automation
router.post('/payments/webhook', async (req, res) => {
  const { campaignId, status } = req.body;

  if (status === 'success') {
    try {
      const campaign = await Campaign.findById(campaignId);
      if (campaign) {
        campaign.status = 'PAID';
        await campaign.save();
        
        // TRIGGER AUTOMATION
        // We don't await this so the webhook returns 200 quickly
        launchCampaign(campaignId).catch(console.error);
        
        return res.json({ status: 'automation_started' });
      }
    } catch (err) {
      console.error(err);
    }
  }
  res.status(400).json({ error: 'Invalid request' });
});

// --- INFLUENCERS ---

// Register Influencer
router.post('/influencers', async (req, res) => {
  try {
    const influencer = new Influencer(req.body);
    // Auto-activate for demo purposes, usually false
    influencer.active = true; 
    await influencer.save();
    res.status(201).json(influencer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN ---

// Get Dashboard Stats
router.get('/admin/stats', async (req, res) => {
  try {
    const totalCampaigns = await Campaign.countDocuments();
    const activeInfluencers = await Influencer.countDocuments({ active: true });
    
    // Calculate revenue
    const campaigns = await Campaign.find({ status: { $ne: 'PENDING_PAYMENT' } });
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.price, 0);

    const recentActivity = await Campaign.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      totalCampaigns,
      activeInfluencers,
      totalRevenue,
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
