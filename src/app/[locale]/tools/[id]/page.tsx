'use client';

import { useParams } from 'next/navigation';
import { aiTools } from '@/data/tools';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, Heart, Share2 } from 'lucide-react';

export default function ToolDetailPage() {
  const params = useParams();
  const toolId = params.id as string;

  const tool = aiTools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">工具未找到</h1>
          <Link href="/" className="text-purple-400 hover:text-purple-300">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* 工具详情卡片 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">{tool.name}</h1>
                <p className="text-slate-400">{tool.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-slate-400" />
                </button>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            <p className="text-lg text-slate-300 mb-6">{tool.description}</p>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-semibold">{tool.rating}</span>
              </div>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {tool.priceType}
              </div>
            </div>

            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
            >
              访问网站
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 标签 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">标签</h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 功能特点 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">功能特点</h2>
            <ul className="space-y-2">
              {tool.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <span className="text-purple-400 mt-1">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
