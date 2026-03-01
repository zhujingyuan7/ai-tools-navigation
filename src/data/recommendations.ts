import { Recommendation, NewTool } from '@/types/recommendations';

// 推荐库数据
export const recommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'handpicked',
    title: 'AI 写作助手推荐',
    description: '精选 3 款最适合中文写作的 AI 助手',
    category: 'writing-tools',
    tags: ['writing', 'chinese', 'productivity'],
    priority: 'high',
    features: ['中文优化', '多风格支持', '实时润色'],
    tools: ['tool-1', 'tool-2', 'tool-3'],
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'rec-2',
    type: 'algorithmic',
    title: '程序员必备工具',
    description: '基于您浏览历史推荐的 AI 编程助手',
    category: 'coding-assistants',
    tags: ['coding', 'productivity', 'development'],
    priority: 'high',
    features: ['代码补全', 'bug 修复', '代码解释'],
    tools: ['tool-4', 'tool-5'],
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'rec-3',
    type: 'community',
    title: '社区热门：图像生成',
    description: '本周最受欢迎的 AI 图像生成工具',
    category: 'image-tools',
    tags: ['image', 'generation', 'popular'],
    priority: 'medium',
    features: ['高质量输出', '快速生成', '多种风格'],
    tools: ['tool-6', 'tool-7', 'tool-8'],
    createdAt: new Date('2024-01-25'),
  },
];

// 新工具数据
export const newTools: NewTool[] = [
  {
    id: 'new-1',
    name: 'GPT-4 Turbo',
    category: 'chatbots',
    tags: ['AI Chatbot', 'Free Trial'],
    releasedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    trending: true,
    badges: ['AI Chatbot', 'Free Trial'],
    rating: 4.8,
    description: 'GPT-4 Turbo 是 OpenAI 最快的模型，适合需要快速响应的任务。',
    logo: '🤖',
    features: ['极速响应', '高准确率', '支持长上下文'],
    priceType: 'freemium',
    screenshots: [],
  },
  {
    id: 'new-2',
    name: 'Midjourney V6',
    category: 'image-tools',
    tags: ['Image Generator', 'Pro'],
    releasedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    trending: true,
    badges: ['Image Generator', 'Pro'],
    rating: 4.9,
    description: 'Midjourney V6 带来了更好的图像质量和更精确的文本到图像能力。',
    logo: '🎨',
    features: ['高质量图像', '文本转图像', '快速生成'],
    priceType: 'paid',
    screenshots: [],
  },
  {
    id: 'new-3',
    name: 'Cursor Pro',
    category: 'coding-assistants',
    tags: ['AI IDE', 'Pair Programming', 'VS Code Compatible'],
    releasedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    trending: false,
    badges: ['AI IDE', 'VS Code Compatible'],
    rating: 4.7,
    description: 'Cursor Pro 是一个基于 VS Code 的 AI 代码编辑器，支持 GPT-4。',
    logo: '💻',
    features: ['AI 补全', '代码生成', '项目导航'],
    priceType: 'freemium',
    screenshots: [],
  },
  {
    id: 'new-4',
    name: 'Perplexity Pro',
    category: 'research',
    tags: ['AI Search', 'Research', 'Citations'],
    releasedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    trending: true,
    badges: ['AI Search', 'Citations'],
    rating: 4.6,
    description: 'Perplexity Pro 是一个强大的 AI 搜索引擎，提供准确的答案和引用。',
    logo: '🔍',
    features: ['智能搜索', '引用来源', '多模态查询'],
    priceType: 'freemium',
    screenshots: [],
  },
];

// 热门搜索词
export const trendingSearches = [
  'GPT-4',
  'Claude 3.5',
  'Midjourney',
  'Cursor',
  'Copilot',
  'Perplexity',
  'Jasper',
  'Notion AI',
  'Runway',
  'Stable Diffusion',
];

// 时间范围选项
export const timeRanges = [
  { id: '24h', label: '24小时' },
  { id: '7d', label: '7天' },
  { id: '30d', label: '30天' },
];

// 推荐类别
export const recommendationCategories = [
  { id: 'chatbots', name: 'AI Chatbots', icon: 'MessageSquare', count: 234 },
  { id: 'image-tools', name: 'Image Tools', icon: 'Image', count: 156 },
  { id: 'coding-assistants', name: 'Coding Assistants', icon: 'Code', count: 89 },
  { id: 'writing-tools', name: 'Writing Tools', icon: 'FileText', count: 45 },
  { id: 'productivity', name: 'Productivity', icon: 'Layout', count: 67 },
  { id: 'research', name: 'Research', icon: 'Search', count: 34 },
];
