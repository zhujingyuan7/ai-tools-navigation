export interface Recommendation {
  id: string;
  type: 'handpicked' | 'algorithmic' | 'community';
  title: string;
  description: string;
  category: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
  features: string[];
  tools: string[];
  createdAt: Date;
}

export interface NewTool {
  id: string;
  name: string;
  category: string;
  tags: string[];
  releasedAt: Date;
  trending: boolean;
  badges: string[];
  screenshots: string[];
  logo?: string;
  rating: number;
  description: string;
  features: string[];
  priceType: 'free' | 'freemium' | 'paid';
}

export interface SearchHistory {
  id: string;
  query: string;
  category: string;
  timestamp: Date;
  resultsCount: number;
}

export interface SearchSuggestion {
  type: 'history' | 'trending' | 'related' | 'typo';
  text: string;
  icon?: string;
  highlight?: string;
}

export interface RecommendationEngine {
  getPersonalizedRecommendations(userId?: string): Promise<Recommendation[]>;
  getCategoryBasedRecommendations(category: string): Promise<Recommendation[]>;
  getCommunityRecommendations(): Promise<Recommendation[]>;
}
