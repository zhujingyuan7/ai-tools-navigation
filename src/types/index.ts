export interface AITool {
  id: string;
  name: string;
  description: string;
  description_en?: string; // 英文描述
  category: string;
  tags: string[];
  icon: string;
  website: string;
  featured: boolean;
  rating: number;
  priceType: 'free' | 'freemium' | 'paid'; // 价格类型
  price?: string; // 价格详情
  status: 'draft' | 'published' | 'unpublished'; // 状态
  views: number; // 访问量
  favorites: number; // 收藏数
  isNew: boolean; // 是否新工具
  isHot: boolean; // 是否热门
  addedAt: string; // 添加时间
  screenshots?: string[]; // 截图URL
  features?: string[]; // 功能特点
  pros?: string[]; // 优点
  cons?: string[]; // 缺点
  seoTitle?: string; // SEO 标题
  seoDescription?: string; // SEO 描述
  seoKeywords?: string[]; // SEO 关键词
}

export interface NewsItem {
  id: string;
  title: string;
  title_en?: string;
  summary: string;
  summary_en?: string;
  content: string;
  content_en?: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  source?: string;
  tags: string[];
}

export interface Tip {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  content: string;
  content_en?: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codeExample?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  category: string;
  author: string;
  author_en?: string;
  publishedAt: string;
  readingTime: number; // 阅读时间（分钟）
  level: 'beginner' | 'intermediate' | 'advanced';
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  steps: string[];
}

export interface Question {
  id: string;
  title: string;
  title_en?: string;
  content: string;
  content_en?: string;
  answer: string;
  answer_en?: string;
  author: string;
  author_en?: string;
  publishedAt: string;
  answers: number;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  solved: boolean;
}

export interface CompareSelection {
  tools: AITool[];
}

export interface Admin {
  id: string;
  username: string;
  passwordHash: string;
  email?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminUsername: string;
  action: string;
  details: any;
  timestamp: number;
  ip?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTitle: string;
  logo?: string;
  favicon?: string;
  description: string;
  keywords: string[];
  defaultSeoDescription: string;
  defaultSeoKeywords: string[];
  contactEmail?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    discord?: string;
  };
}

export interface AnalyticsData {
  totalViews: number;
  activeUsers: number;
  dailyViews: Record<string, number>;
  categoryViews: Record<string, number>;
  toolViews: Record<string, number>;
  searchQueries: Record<string, number>;
  userBehaviors: Array<{
    id: string;
    timestamp: number;
    action: string;
    toolId?: string;
    category?: string;
    searchQuery?: string;
  }>;
}
