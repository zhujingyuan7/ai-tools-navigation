import Link from 'next/link';
import { trendingTools } from '@/data/trending';

export default function TrendingLeaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400">
            🔥 热门工具排行榜
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            根据访问量和收藏数，精选最热门的 AI 工具
          </p>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {trendingTools.map((tool, index) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="block"
            >
              <div className="glass-effect rounded-xl p-6 card-hover">
                {/* Rank */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-5xl font-bold text-yellow-400 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-4xl bg-gradient-to-br from-primary-400 to-indigo-500 p-3 rounded-lg">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-100 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👁</span>
                    <span className="text-slate-400">{tool.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">❤️</span>
                    <span className="text-slate-400">{tool.favorites.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="text-slate-400">{tool.rating}</span>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-4">
                <span className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded text-sm">
                  {tool.category}
                </span>
              </div>
              </div>
            </a>
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
