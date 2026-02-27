# Waffle Brain 🧇🧼

<div align="center">

![Waffle Brain Logo](/logos/logo-simple.svg)

**一个现代化的 AI 工具导航站，发现和探索最好的人工智能工具**

---

## ✨ 功能特点

- 🎨 **现代化暗色主题** - 玻璃拟态设计，视觉体验极佳
- 🔍 **实时搜索** - 支持工具名称、描述、标签搜索
- 📂 **智能分类** - 8 个分类，快速筛选
- ⭐ **精选推荐** - 每周更新的热门工具
- 📱 **完全响应式** - 完美适配手机、平板、桌面
- 🌍 **多语言支持** - 中文、英文、日文、韩文、西班牙文、法文
- 📝 **收藏功能** - 本地存储，个性化收藏列表
- 💰 **新内容分类** - 除了工具，还有新闻、技巧、教程、社区
- 🔥 **热门排行榜** - 基于访问量的 Top 10 热门工具
- 💰 **价格筛选** - 免费工具、Freemium、付费工具筛选
- 🌙 **主题切换** - 支持深色/浅色主题，持久化设置
- 📊 **前端埋点** - 完整的用户行为追踪和分析

---

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel
- **图标**: Lucide React Icons
- **字体**: Inter (Google Fonts)

---

## 📦 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/zhujingyuan7/ai-tools-navigation.git
cd ai-tools-navigation
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

---

## 🎯 核心功能模块

### 📂 工具导航

#### 主页功能
- ✅ 工具列表展示
- ✅ 实时搜索
- ✅ 分类筛选（全部、文本生成、图像处理、视频制作、代码开发、音频处理、数据分析、办公助手）
- ✅ 价格筛选（全部、免费、Freemium、付费）
- ✅ 精选推荐展示
- ✅ 响应式网格布局
- ✅ 悬停动画和过渡效果

#### 工具详情页
- ✅ 独立页面路由 `/[locale]/tools/[id]`
- ✅ 面包屑导航
- ✅ 工具完整信息展示
- ✅ 访问官网按钮
- ✅ 收藏功能集成
- ✅ 快捷键提示

#### 收藏功能
- ✅ 独立收藏页面 `/[locale]/favorites`
- ✅ 本地存储（localStorage）
- ✅ 收藏管理（添加/移除）
- ✅ 收藏统计显示

#### 新内容分类

##### 📰 AI 每日热点 `/[locale]/news`
- AI 行业新闻和动态
- 产品发布信息
- 融资和收购消息
- 技术突破和更新
- 15 条 mock 数据

##### 💡 OpenClaw 使用技巧 `/[locale]/tips`
- OpenClaw 配置和安装
- Gateway 服务管理
- Agent 技能管理
- CLI 命令速查
- 自动化脚本编写
- 最佳实践和技巧
- 12 条技巧数据，分难度等级

##### 📚 AI 教程合集 `/[locale]/tutorials`
- 编程类教程
- AI 应用使用教程
- Prompt Engineering 教程
- 框架使用教程
- 12 条教程数据，含阅读时间

##### 💬 AI 咨询社区 `/[locale]/community`
- 常见问题和解答
- 用户分享经验
- 工具推荐请求
- 10 条问答数据，含点赞和评论

##### 🔥 热门工具排行榜 `/[locale]/trending`
- Top 10 热门工具
- 基于访问量排序
- 显示收藏数和评分
- 动态排名卡片

---

## 🎨 设计理念

**Waffle Brain** 的设计灵感来自：
- **华夫格子**（Waffle）- 象征神经网络的结构化数据
- **大脑**（Brain）- 代表 AI 的智能和思考

**配色方案**：
- 主色：科技蓝 `#3B82F6`（Next.js 蓝）
- 强调色：华夫黄 `#F5A623`（温暖）
- 背景：深石板色 `#0F172A`

**UI 风格**：
- 玻璃拟态效果（Glassmorphism）
- 渐变色和阴影
- 圆角和柔和过渡
- 卡片悬停动画
- 流畅的页面切换

---

## 📊 项目结构

```
ai-tools-navigation/
├── src/
│   ├── app/
│   │   ├── [locale]/          # 多语言路由
│   │   │   ├── page.tsx          # 主页
│   │   │   ├── tools/[id]/    # 工具详情页
│   │   │   ├── favorites/       # 收藏列表页
│   │   │   ├── news/           # AI 每日热点
│   │   │   ├── tips/           # OpenClaw 使用技巧
│   │   │   ├── tutorials/      # AI 教程合集
│   │   │   ├── community/      # AI 咨询社区
│   │   │   └── trending/      # 热门排行榜
│   │   ├── components/         # 可复用组件
│   │   │   ├── CategoryFilter.tsx  # 分类和价格筛选
│   │   │   ├── SearchBar.tsx      # 搜索栏
│   │   │   ├── ToolCard.tsx       # 工具卡片
│   │   │   ├── LanguageSwitcher.tsx  # 语言切换器
│   │   │   ├── ThemeSwitcher.tsx  # 主题切换器
│   │   │   ├── AnalyticsProvider.tsx # 埋点 Provider
│   │   │   ├── CookieConsent.tsx   # GDPR 隐私提示
│   │   │   └── Logo.tsx         # Logo 组件
│   ├── data/                 # 数据文件
│   │   ├── tools.ts            # AI 工具数据（30个）
│   │   ├── trending.ts         # 热门工具数据
│   │   ├── news.ts            # 新闻数据
│   │   ├── tips.ts            # 技巧数据
│   │   ├── tutorials.ts        # 教程数据
│   │   └── community.ts       # 社区问答数据
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useTranslations.ts  # 国际化 Hook
│   │   ├── useAnalytics.ts     # 埋点 Hook
│   │   ├── useFavorites.ts     # 收藏 Hook
│   │   └── useTheme.ts        # 主题 Hook
│   ├── i18n.ts             # 国际化配置
│   ├── middleware.ts         # Next.js 中间件
│   ├── types/               # TypeScript 类型定义
│   ├── app/
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx      # 根布局
│   │   └── [locale]/globals.css  # 多语言样式
│   └── messages/            # 翻译文件
│       ├── zh-CN.json       # 中文
│       ├── en-US.json       # 英文
│       ├── ja-JP.json        # 日文
│       ├── ko-KR.json        # 韩文
│       ├── es-ES.json        # 西班牙文
│       └── fr-FR.json        # 法文
├── public/
│   └── logos/             # Logo 文件
│       ├── logo-simple.svg    # 简洁版
│       ├── logo-full.svg     # 完整版
│       ├── logo-dark.svg     # 深色版
│       └── logo-light.svg    # 浅色版
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目配置
```

---

## 🌍 支持的语言

- 🇨🇳 **中文** (zh-CN) - 默认
- 🇺🇸 **英文** (en-US)
- 🇯🇵 **日文** (ja-JP)
- 🇰🇷 **韩文** (ko-KR)
- 🇪🇸 **西班牙文** (es-ES)
- 🇫🇷 **法文** (fr-FR)

---

## 📝 工具分类

1. **全部** - 展示所有工具
2. **文本生成** - ChatGPT、Claude、Perplexity 等
3. **图像处理** - Midjourney、Stable Diffusion、DALL-E 3 等
4. **视频制作** - Runway ML、Pika、HeyVid AI 等
5. **代码开发** - GitHub Copilot、Cursor、Replit AI 等
6. **音频处理** - ElevenLabs、Suno AI、Whisper 等
7. **数据分析** - PandasAI、DataRobot、Tableau AI 等
8. **办公助手** - Notion AI、Otter.ai、Grammarly 等

---

## 🔧 开发命令

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## 📈 数据统计

- **工具总数**: 30 个精选 AI 工具
- **分类数量**: 8 个主要分类
- **新闻条目**: 15 条 AI 行业动态
- **技巧条目**: 12 条 OpenClaw 使用技巧
- **教程条目**: 12 条 AI 学习教程
- **问答条目**: 10 条社区热门问答
- **支持语言**: 6 种语言
- **主题**: 深色/浅色双主题

---

## 🎯 项目路线图

- [x] ~~工具对比功能~~（已移除，专注核心体验）
- [ ] 无限滚动加载
- [ ] 页面加载骨架屏
- [ ] 工具快捷键提示
- [ ] 搜索历史记录
- [ ] 搜索建议/自动补全
- [ ] 高级搜索过滤器（多维度筛选）
- [ ] 新内容分类展示页
- [x] ~~后台管理系统~~（已移除，专注前端体验）
- [ ] ~~Notion API 集成~~（等待申请）
- [ ] 数据可视化图表（使用 Recharts）

---

## 🤝 贡献方式

### 提交 Issue
发现 Bug 或有新功能建议？欢迎提交 Issue：

[https://github.com/zhujingyuan7/ai-tools-navigation/issues](https://github.com/zhujingyuan7/ai-tools-navigation/issues)

### Fork 项目
想自定义功能？欢迎 Fork 项目并进行修改：

[https://github.com/zhujingyuan7/ai-tools-navigation/fork](https://github.com/zhujingyuan7/ai-tools-navigation/fork)

### Star 项目
觉得这个项目有用？给个 Star 支持：

[https://github.com/zhujingyuan7/ai-tools-navigation](https://github.com/zhujingyuan7/ai-tools-navigation)

---

## 📄 许可证

MIT License

---

## 👨 作者

**Waffle Brain Team**  
[https://github.com/zhujingyuan7](https://github.com/zhujingyuan7)

---

<div align="center">

**Made with ❤️ using Next.js & Tailwind CSS**

</div>
