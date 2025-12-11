
import { PackageType } from './types';

export const PACKAGES = {
  [PackageType.STARTER]: {
    name: 'Starter',
    price: 15000,
    currency: 'XOF',
    influencers: 5,
    description: 'The Spark. Perfect for flash sales and daily specials.',
    features: ['5 Verified Voices', 'Neighborhood Targeting', '24h Status Duration', 'Basic Impact Report']
  },
  [PackageType.GROWTH]: {
    name: 'Growth',
    price: 35000,
    currency: 'XOF',
    influencers: 15,
    description: 'The Surge. Ideal for product launches and grand openings.',
    features: ['15 Elite Creators', 'City-Wide Reach', 'Video & Image Support', 'Priority Deployment', 'Advanced Analytics']
  },
  [PackageType.SCALE]: {
    name: 'Scale',
    price: 75000,
    currency: 'XOF',
    influencers: 40,
    description: 'The Takeover. Maximum density for total market awareness.',
    features: ['40+ Influencer Army', 'Dedicated Campaign Strategist', 'Multi-Platform (WA + TikTok)', 'A/B Testing', 'VIP Support']
  }
};

export const MOCK_INFLUENCERS_COUNT = 142;
export const MOCK_REVENUE = 4500000;
