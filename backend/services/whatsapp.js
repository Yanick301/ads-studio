
const axios = require('axios');

const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;
const TOKEN = process.env.WA_ACCESS_TOKEN;

/**
 * Sends a templated message to an influencer.
 * @param {string} to - Recipient phone number (e.g., '22997000000')
 * @param {object} campaign - Campaign details
 * @param {string} mediaUrl - Link to the ad creative
 */
const notifyInfluencer = async (to, campaign, mediaUrl) => {
  try {
    const payload = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'template',
      template: {
        name: 'new_campaign_alert', // Pre-approved template name in Meta Manager
        language: { code: 'en' },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: { link: mediaUrl || 'https://via.placeholder.com/1000' }
              }
            ]
          },
          {
            type: 'body',
            parameters: [
              { type: 'text', text: campaign.businessName }, // {{1}}
              { type: 'text', text: campaign.description },  // {{2}}
              { type: 'text', text: '24 Hours' },            // {{3}} Duration
              { type: 'text', text: '2000 XOF' }             // {{4}} Payout per post
            ]
          }
        ]
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ WhatsApp sent to ${to}:`, response.data.messages[0].id);
    return true;
  } catch (error) {
    console.error('❌ WhatsApp API Error:', error.response ? error.response.data : error.message);
    return false;
  }
};

module.exports = { notifyInfluencer };
