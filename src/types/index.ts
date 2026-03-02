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
