import { Recommendation } from '@/types/recommendations';
import { recommendations } from '@/data/recommendations';

// 模拟用户浏览历史（实际应用中可以从 localStorage 或 API 获取）
const getUserBrowseHistory = (userId?: string): string[] => {
  if (typeof window === 'undefined') return [];
  
  const history = localStorage.getItem('userBrowseHistory');
  return history ? JSON.parse(history) : [];
};

// 模拟用户偏好（实际应用中可以从 localStorage 或 API 获取）
const getUserPreferences = (userId?: string): { categories: string[]; tags: string[] } => {
  if (typeof window === 'undefined') return { categories: [], tags: [] };
  
  const preferences = localStorage.getItem('userPreferences');
  return preferences ? JSON.parse(preferences) : { categories: [], tags: [] };
};

// 基于用户浏览历史推荐
export const getPersonalizedRecommendations = async (userId?: string): Promise<Recommendation[]> => {
  const browseHistory = getUserBrowseHistory(userId);
  const preferences = getUserPreferences(userId);
  
  // 根据浏览历史和偏好筛选推荐
  const personalized = recommendations.filter(rec => {
    // 如果用户有偏好类别，优先匹配
    if (preferences.categories.length > 0) {
      return preferences.categories.includes(rec.category);
    }
    // 否则根据浏览历史匹配
    if (browseHistory.length > 0) {
      return browseHistory.some(cat => cat === rec.category);
    }
    // 如果都没有，返回高优先级的推荐
    return rec.priority === 'high';
  });
  
  // 按优先级和时间排序
  return personalized
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] ||
             b.createdAt.getTime() - a.createdAt.getTime();
    })
    .slice(0, 5);
};

// 基于分类推荐
export const getCategoryBasedRecommendations = async (category: string): Promise<Recommendation[]> => {
  const categoryRecs = recommendations.filter(rec => rec.category === category);
  
  return categoryRecs
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] ||
             b.createdAt.getTime() - a.createdAt.getTime();
    });
};

// 社区推荐（热门工具）
export const getCommunityRecommendations = async (): Promise<Recommendation[]> => {
  const communityRecs = recommendations.filter(rec => rec.type === 'community');
  
  return communityRecs
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);
};

// 导出推荐引擎接口
export const recommendationEngine = {
  getPersonalizedRecommendations,
  getCategoryBasedRecommendations,
  getCommunityRecommendations,
};
