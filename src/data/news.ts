import { NewsItem } from '@/types';

export const news: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI 发布 GPT-5 Turbo 模型',
    summary: 'OpenAI 宣布推出 GPT-5 Turbo，响应速度提升 2 倍',
    content: 'OpenAI 宣布推出 GPT-5 Turbo，这是迄今为止最快的 AI 模型。新模型在保持高质量输出的同时，将响应速度提升了 2 倍，为用户提供更流畅的体验。',
    source: 'OpenAI',
    author: 'OpenAI 团队',
    publishedAt: '2026-02-27',
    category: 'new_product',
    tags: ['GPT-5', 'OpenAI', 'AI模型']
  },
  {
    id: '2',
    title: '智谱 AI 完成 GLM-4.7 训练',
    summary: '智谱 AI 宣布完成 GLM-4.7 大规模训练，性能大幅提升',
    content: '智谱 AI 宣布完成 GLM-4.7 大规模训练，性能大幅提升。新模型在多项基准测试中表现出色，特别是在中文理解和生成方面有显著进步。',
    source: '智谱AI',
    author: '智谱 AI 团队',
    publishedAt: '2026-02-26',
    category: 'new_product',
    tags: ['GLM-4.7', '智谱', 'AI模型']
  },
  {
    id: '3',
    title: 'Midjourney V6.1 发布',
    summary: 'Midjourney 发布最新版本 V6.1，图像质量显著提升',
    content: 'Midjourney 发布最新版本 V6.1，图像质量显著提升。新版本带来了更好的细节表现、更准确的文本渲染和更快的生成速度。',
    source: 'Midjourney',
    author: 'Midjourney 团队',
    publishedAt: '2026-02-25',
    category: 'new_product',
    tags: ['Midjourney', '图像生成', 'AI绘画']
  },
  {
    id: '4',
    title: 'Claude 3.5 Sonnet 发布',
    summary: 'Anthropic 发布 Claude 3.5 Sonnet，性能超越 GPT-4',
    content: 'Anthropic 发布 Claude 3.5 Sonnet，在多项测试中性能超越 GPT-4。新模型在代码生成、数学推理和长文本处理方面表现突出。',
    source: 'Anthropic',
    author: 'Anthropic 团队',
    publishedAt: '2026-02-24',
    category: 'new_product',
    tags: ['Claude 3.5', 'Anthropic', 'AI模型']
  }
];
