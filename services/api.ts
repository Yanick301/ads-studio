
import { Campaign, Influencer, PackageType, Platform, CampaignStatus, DashboardStats } from '../types';
import { PACKAGES, MOCK_INFLUENCERS_COUNT, MOCK_REVENUE } from '../constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ApiService {
  private campaigns: Campaign[] = [];
  private influencers: Influencer[] = [];

  constructor() {
    this.campaigns = [
      {
        id: 'c_1',
        businessName: 'Burger King Cotonou',
        phone: '+22901020304',
        description: 'Promo 2 for 1 burgers this weekend only!',
        platform: Platform.WHATSAPP,
        packageType: PackageType.GROWTH,
        price: 35000,
        status: CampaignStatus.LAUNCHED,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        influencersReached: 15
      },
      {
        id: 'c_2',
        businessName: 'Fashion Nova',
        phone: '+22999887766',
        description: 'New summer collection out now.',
        platform: Platform.INSTAGRAM,
        packageType: PackageType.STARTER,
        price: 15000,
        status: CampaignStatus.PAID,
        createdAt: new Date().toISOString(),
        influencersReached: 0
      }
    ];

    this.influencers = [
      { id: 'i_1', name: 'Jean K.', phone: '+229...', platform: Platform.WHATSAPP, profileLink: '...', followers: 500, averageViews: 450, active: true, joinedAt: '2023-01-01' },
    ];
  }

  async createCampaign(data: Omit<Campaign, 'id' | 'status' | 'createdAt'>): Promise<Campaign> {
    await delay(1000);
    const newCampaign: Campaign = {
      ...data,
      id: `c_${Date.now()}`,
      status: CampaignStatus.PENDING_PAYMENT,
      createdAt: new Date().toISOString(),
      influencersReached: 0
    };
    this.campaigns.unshift(newCampaign);
    return newCampaign;
  }

  async processPayment(campaignId: string, provider: 'MOMO' | 'STRIPE' | 'PAYTECH'): Promise<Campaign> {
    await delay(2000); // Simulate payment processing time
    
    const campaign = this.campaigns.find(c => c.id === campaignId);
    
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaignId} not found`);
    }

    campaign.status = CampaignStatus.PAID;
    
    // Simulate immediate activation for demo purposes to avoid detached timeout errors
    campaign.status = CampaignStatus.LAUNCHED;
    campaign.influencersReached = PACKAGES[campaign.packageType]?.influencers || 0;

    return campaign;
  }

  async registerInfluencer(data: Omit<Influencer, 'id' | 'active' | 'joinedAt'> & { proofFile?: File }): Promise<Influencer> {
    await delay(1500);
    // In a real backend, we would upload the proofFile here
    const newInfluencer: Influencer = {
      ...data,
      id: `i_${Date.now()}`,
      active: false, // Default to inactive until verified
      joinedAt: new Date().toISOString()
    };
    this.influencers.push(newInfluencer);
    return newInfluencer;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    await delay(800);
    return {
      totalCampaigns: this.campaigns.length + 124,
      activeInfluencers: this.influencers.length + MOCK_INFLUENCERS_COUNT,
      totalRevenue: this.campaigns.reduce((acc, curr) => acc + curr.price, 0) + MOCK_REVENUE,
      recentActivity: [...this.campaigns] // Return a copy to avoid mutation issues
    };
  }
  
  // NEW: Get stats specifically for a Brand User
  async getBrandStats() {
    await delay(600);
    return {
       activeCampaigns: 2,
       totalSpend: 150000,
       totalViews: 45200,
       campaigns: [...this.campaigns] // Return a copy
    }
  }

  async getInfluencers(): Promise<Influencer[]> {
    await delay(500);
    const generated = Array.from({ length: 5 }).map((_, i) => ({
      id: `gen_${i}`,
      name: `Influencer ${i+1}`,
      phone: '+229 00 00 00 00',
      platform: i % 2 === 0 ? Platform.WHATSAPP : Platform.TIKTOK,
      profileLink: 'http://social.com/user',
      followers: 500 + i * 100,
      averageViews: 200 + i * 50,
      active: true,
      joinedAt: '2023-10-01'
    }));
    return [...this.influencers, ...generated];
  }

  // NEW: Admin Action to toggle status
  async toggleInfluencerStatus(id: string, currentStatus: boolean): Promise<boolean> {
    await delay(600);
    // In a real app, this would call the backend
    const inf = this.influencers.find(i => i.id === id);
    if (inf) inf.active = !currentStatus;
    return !currentStatus;
  }
}

export const api = new ApiService();
