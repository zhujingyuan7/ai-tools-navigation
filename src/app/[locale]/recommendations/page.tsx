import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import RecommendationsLibrary from '@/components/recommendations/RecommendationsLibrary';

export const metadata: Metadata = {
  title: 'AI 工具推荐 - 为您精选最适合的工具',
  description: '基于您的使用习惯，发现最适合的 AI 工具。多维度推荐系统，包括个性化推荐、分类推荐和社区热门推荐。',
};

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <RecommendationsLibrary />
      </div>
    </div>
  );
}
