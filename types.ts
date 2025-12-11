
export enum PackageType {
  STARTER = 'STARTER',
  GROWTH = 'GROWTH',
  SCALE = 'SCALE'
}

export enum Platform {
  WHATSAPP = 'WHATSAPP',
  TIKTOK = 'TIKTOK',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  SNAPCHAT = 'SNAPCHAT'
}

export enum CampaignStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  LAUNCHED = 'LAUNCHED',
  COMPLETED = 'COMPLETED'
}

export interface Campaign {
  id: string;
  businessName: string;
  phone: string;
  description: string;
  platform: Platform;
  packageType: PackageType;
  price: number;
  mediaUrl?: string; // Placeholder for uploaded file URL
  status: CampaignStatus;
  createdAt: string;
  influencersReached?: number;
}

export interface Influencer {
  id: string;
  name: string;
  phone: string;
  platform: Platform;
  profileLink: string;
  followers: number; // For social media
  contacts?: number; // Specific for WhatsApp
  averageViews: number; // Specific for validation
  active: boolean;
  joinedAt: string;
}

export interface StatData {
  name: string;
  value: number;
}

export interface DashboardStats {
  totalCampaigns: number;
  activeInfluencers: number;
  totalRevenue: number;
  recentActivity: Campaign[];
}
