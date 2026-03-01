'use client';

import { trendingTools } from '@/data/trending';

export default function TrendingLeaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400 mb-4">
            🔥 热门工具排行榜
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            根据访问量和收藏数，精选最受欢迎的 AI 工具
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool, index) => (
            <div
              key={tool.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-primary-500 transition-all duration-300 relative"
            >
              {/* 排名徽章 */}
              <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                index === 0 ? 'bg-yellow-500 text-white' :
                index === 1 ? 'bg-gray-400 text-white' :
                index === 2 ? 'bg-orange-500 text-white' :
                'bg-slate-700 text-slate-400'
              }`}>
                {index + 1}
              </div>

              <div className="pl-6">
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>👁️ {tool.views}</span>
                  <span>⭐ {tool.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
