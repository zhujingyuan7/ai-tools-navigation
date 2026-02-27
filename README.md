# AI工具导航站

一个现代化的AI工具导航站，使用 Next.js 14 + TypeScript + Tailwind CSS 构建。

## 功能特点

- ✨ 现代化暗色主题设计
- 🔍 实时搜索功能
- 📂 分类过滤
- 🎴 精美的卡片展示
- 📱 完全响应式布局
- 🎨 流畅的动画效果
- ⭐ 精选推荐功能

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: 支持 Vercel 等平台

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
ai-tools-navigation/
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 主页
│   ├── components/
│   │   ├── CategoryFilter.tsx  # 分类过滤器
│   │   ├── SearchBar.tsx      # 搜索栏
│   │   └── ToolCard.tsx       # 工具卡片
│   ├── data/
│   │   └── tools.ts          # AI工具数据
│   └── types/
│       └── index.ts          # TypeScript类型定义
├── public/                   # 静态资源
├── tailwind.config.ts       # Tailwind配置
├── tsconfig.json            # TypeScript配置
└── package.json             # 项目配置
```

## 自定义

### 添加新的AI工具

在 `src/data/tools.ts` 中添加新的工具数据：

```typescript
{
  id: '13',
  name: '工具名称',
  description: '工具描述',
  category: '分类',
  tags: ['标签1', '标签2'],
  icon: '🎯',
  website: 'https://example.com',
  featured: true,
  rating: 4.5,
}
```

### 修改主题颜色

在 `tailwind.config.ts` 中自定义主题颜色。

## 部署

推荐使用 [Vercel](https://vercel.com) 进行部署：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

## 许可

MIT License
