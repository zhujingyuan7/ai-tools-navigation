import { Metadata } from 'next';
import NewToolsDiscovery from '@/components/discovery/NewToolsDiscovery';

export const metadata: Metadata = {
  title: '新工具发现 - 发现最新 AI 工具',
  description: '发现最新发布的 AI 工具，时间轴视图展示新工具发布动态，第一时间体验前沿技术。',
};

export default function NewToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <NewToolsDiscovery />
      </div>
    </div>
  );
}
