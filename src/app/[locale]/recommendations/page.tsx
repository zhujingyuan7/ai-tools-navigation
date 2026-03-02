import { Metadata } from 'next';
import RecommendationsLibrary from '@/components/recommendations/RecommendationsLibrary';

export const metadata: Metadata = {
  title: 'AI 工具推荐 - 为您精选最适合的工具',
  description: '基于您的使用习惯，发现最适合的 AI 工具。多维度推荐系统，包括个性化推荐、分类推荐和社区热门推荐。',
};

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen paper-texture">
      <div className="container mx-auto px-4 py-12">
        <RecommendationsLibrary />
      </div>
    </main>
  );
}
