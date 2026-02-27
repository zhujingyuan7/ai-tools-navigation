'use client';

import { AITool } from '@/types';

interface ToolCardProps {
  tool: AITool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <a
      href={tool.website}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="glass-effect rounded-xl p-6 card-hover relative overflow-hidden">
        {tool.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">
              精选
            </span>
          </div>
        )}
        
        <div className="flex items-start gap-4">
          <div className="text-4xl bg-gradient-to-br from-primary-400 to-indigo-500 p-3 rounded-lg">
            {tool.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {tool.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded">
                {tool.category}
              </span>
              {tool.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 mt-3">
              <svg
                className="h-4 w-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-slate-300">{tool.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </a>
  );
}
