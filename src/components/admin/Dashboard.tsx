'use client';

import { useState, useEffect } from 'react';
import { LogOut, Users, Eye, TrendingUp, Package } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalVisitors: 0,
    totalTools: 0,
    trendingTools: 0,
  });

  useEffect(() => {
    // 模拟加载统计数据
    const loadStats = () => {
      setStats({
        totalViews: 12580,
        totalVisitors: 3240,
        totalTools: 156,
        trendingTools: 23,
      });
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">管理后台</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="总浏览量"
            value={stats.totalViews.toLocaleString()}
            icon={Eye}
            color="blue"
          />
          <StatCard
            title="访客数量"
            value={stats.totalVisitors.toLocaleString()}
            icon={Users}
            color="green"
          />
          <StatCard
            title="工具数量"
            value={stats.totalTools.toString()}
            icon={Package}
            color="purple"
          />
          <StatCard
            title="热门工具"
            value={stats.trendingTools.toString()}
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* 欢迎信息 */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">欢迎回来，管理员</h2>
          <p className="text-slate-400">
            这是 AI 导航站的管理后台。在这里您可以查看统计数据、管理工具和监控网站性能。
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}


