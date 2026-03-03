# 🧇 Waffle Brain 🧠

![Waffle Brain Logo](/logos/logo-simple.svg)

**一个现代化的 AI 工具导航站，采用莫兰迪纸张质感设计**

---

## 🌟 核心亮点

- 🎨 **莫兰迪纸张质感** - 温暖舒适的微黄色/暗棕色纸张风格，眼睛友好
- 🌈 **双主题支持** - 亮色（微黄纸张）和暗色（暖棕纸张）完美切换
- 🪟 **液态玻璃导航** - 左侧液态玻璃分类导航栏，固定可滚动
- 📦 **极简布局** - 聚焦核心功能，清晰的信息层次
- 🎯 **每列3个** - 响应式网格，移动1列，平板2列，桌面3列
- ⚡ **流畅交互** - 纸张质感的悬停、点击效果
- 🌍 **多语言支持** - 中文、英文、西班牙文、法文
- 🗄️ **Notion CMS** - 支持 Notion 数据库作为内容管理系统

---

## ✨ 主要功能

### 🧰 工具导航
- 📂 **分类导航** - 左侧固定液态玻璃分类导航栏
- 🔍 **实时搜索** - 支持工具名称、描述、标签搜索
- 🏷️ **标签系统** - 每个工具的标签展示
- 🌟 **精选推荐** - 高度推荐的优质工具
- 📖 **工具详情** - 完整的工具信息、官网链接
- ⭐ **收藏功能** - 本地存储、个性化收藏列表

### 🗄️ Notion CMS 集成
- 📊 **Notion 数据库** - 使用 Notion 作为内容管理系统
- 🔌 **灵活配置** - 支持 Mock 数据和 Notion 数据双模式
- 🔄 **自动同步** - 配置后自动从 Notion 加载数据
- 🛡️ **安全可靠** - 使用 Notion 官方 API，数据安全

### 🎨 设计系统
- 🪟 **纸张质感** - 微黄色（亮色）/ 暗棕色（暗色）纸张纹理
- 🪞 **液态玻璃** - 毛玻璃效果 + 液态流动感
- 🌈 **莫兰迪色系** - 温暖柔和的配色方案
- ✨ **光泽效果** - 悬停时的光泽扫过动画
- 🎯 **对比强烈** - 暗色主题下文字清晰醒目

### 🎭 主题切换
- ☀️ **亮色主题** - 微黄色新纸张质感，适合白天
- 🌙 **暗色主题** - 暗棕色旧纸张质感，适合夜间
- 🎯 **白色标题** - 暗色主题下 "Waffle Brain" 显示为纯白渐变
- 🌈 **完整适配** - 所有组件都支持主题切换

---

## 🚀 技术栈

### 核心框架
- **[Next.js 14](https://nextjs.org)** - React 框架，App Router
- **[React 18](https://react.dev)** - UI 库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全
- **[next-intl](https://next-intl-docs.vercel.app)** - 国际化

### CMS 集成
- **[@notionhq/client](https://github.com/makenotion/notion-sdk-js)** - Notion API 官方 SDK

### 样式和 UI
- **[Tailwind CSS 3.4](https://tailwindcss.com)** - 原子化 CSS 框架
- **[Framer Motion 12.34](https://www.framer.com/motion)** - 高性能动画库
- **[Lucide React Icons](https://lucide.dev)** - 精美的图标库

### 部署
- **[Vercel](https://vercel.com)** - 自动部署平台
- **Edge Runtime** - 全球边缘计算网络

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Git** - 版本控制

---

## 🎨 莫兰迪纸张质感设计

### 🌈 配色方案（基于 oklch()）

#### 亮色主题（微黄纸张）
- **背景**: `oklch(0.98 0.006 90)` - 明亮的微黄色，像新纸张
- **前景**: `oklch(0.20 0.018 65)` - 深棕色，像墨水

#### 暗色主题（暖棕纸张）
- **背景**: `oklch(0.35 0.025 55)` - 暗棕色，像旧纸张
- **前景**: `oklch(0.92 0.008 85)` - 浅色，像白墨水
- **标题**: `oklch(1 0 0) → oklch(0.99 0.0005 95) → oklch(0.97 0.001 90)` - 纯白渐变

### 🪟 视觉效果

#### 纸张质感
- **背景纹理** - SVG 噪点纹理，模拟纸张质感
- **渐变叠加** - 径向渐变，营造立体感
- **边缘模糊** - 柔和的纸张边缘

#### 液态玻璃效果
- **背景模糊** - 12px blur + 180% 饱和度
- **边框透明度** - 15-25% 半透明边框
- **三层结构** - 基础背景 + 渐变边框 + 光泽动画

#### 光泽动画
- **光泽扫过** - 4秒光泽移动动画
- **悬停增强** - 悬停时更明显
- **脉冲效果** - 2秒发光脉冲

---

## 📐 布局设计

### 极简结构
```
┌───────────────────────────────────────────┐
│ 侧边栏        主内容区             │
│                 ┌─────────────┐      │
│  ┌─────────┐   │  搜索框     │      │
│  │ 液态玻璃 │   │             │      │
│  │ 导航     │   │ Waffle      │      │
│  │         │   │ Brain       │      │
│  │ Logo    │   │ slogan      │      │
│  │         │   │             │      │
│  │ 分类     │   └─────────────┘      │
│  │ - 全部   │                          │
│  │ - 文生  │   ┌─────────────┐      │
│  │ - 图像   │   │ 工具卡片     │      │
│  │ - 音频   │   │ [卡片][卡片]  │      │
│  │ - 视频   │   │ [卡片][卡片]  │      │
│  │ - ...    │   └─────────────┘      │
│  │         │                          │
│  └─────────┘                          │
└───────────────────────────────────────────┘
```

### 响应式网格
- **移动端** (< 640px): 1 列
- **平板** (640px - 1024px): 2 列
- **桌面** (≥ 1024px): 3 列

---

## 📦 项目结构

```
ai-tools-navigation/
├── src/
│   ├── [locale]/              # 多语言路由（zh-CN, en-US, es-ES, fr-FR）
│   │   ├── page.tsx          # 主页（支持 Notion 数据 + Mock 数据）
│   │   ├── tools/[id]/      # 工具详情页
│   │   └── layout.tsx       # 布局（主题切换器）
│   ├── components/         # React 组件
│   │   ├── ToolCard.tsx        # 工具卡片（纸张质感）
│   │   └── ...更多组件
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具库
│   │   └── notion.ts         # Notion API 客户端配置
│   ├── data/              # 数据文件
│   │   ├── tools.ts           # Mock 工具数据
│   │   └── categories.ts      # Mock 分类数据
│   ├── types/             # TypeScript 类型定义
│   ├── app/               # Next.js App Router
│   ├── globals.css       # 全局样式（莫兰迪色系）
│   └── layout.tsx       # 根布局
├── public/             # 静态资源
│   ├── logos/          # Logo 文件（SVG）
│   └── ...其他资源
├── messages/          # 国际化消息文件
├── .env.example       # 环境变量示例（包含 Notion 配置）
├── .env.local         # 实际环境变量（不提交到 Git）
├── tailwind.config.ts  # Tailwind 配置（oklch 色彩空间）
├── tsconfig.json       # TypeScript 配置
├── package.json        # 项目配置
└── ...其他文件
```

---

## 📚 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/zhujingyuan7/ai-tools-navigation.git
cd ai-tools-navigation
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量（可选，如需使用 Notion）

创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.example .env.local
```

编辑 `.env.local` 并填写你的 Notion 配置：

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**详细配置说明请查看 [Notion 集成文档](#notion-cms-集成)**

### 4. 运行开发服务器

```bash
npm run dev
```

然后访问：**http://localhost:3000**

### 5. 构建生产版本

```bash
npm run build
npm start
```

---

## 🗄️ Notion CMS 集成

### 📖 概述

Waffle Brain 支持使用 Notion 作为内容管理系统（CMS），你可以：
- ✅ 在 Notion 数据库中管理 AI 工具数据
- ✅ 自动同步到网站，无需修改代码
- ✅ 保留 Mock 数据作为 fallback，确保数据安全

### 🔧 配置步骤

#### 1. 创建 Notion Integration

1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击 **"+ New integration"** 或 **"+ New"**
3. 填写信息：
   - **Name**: AI Tools Navigation（或其他名称）
   - **Associated workspace**: 选择你的工作空间
   - **Type**: Internal
4. 点击 **"Submit"**
5. 复制生成的 **"Internal Integration Token"**（以 `secret_` 开头）

#### 2. 创建 Notion 数据库

1. 在 Notion 中创建新的数据库
2. 按照下方的表结构设置字段
3. 复制数据库 ID：
   - 打开数据库页面
   - 从 URL 中提取数据库 ID（32 位字符，不包含连字符）
   - URL 格式: `https://www.notion.so/your-workspace/[DATABASE_ID]?v=...`

#### 3. 连接 Integration 到数据库

1. 打开你的 Notion 数据库页面
2. 点击右上角 **"..."** 菜单
3. 选择 **"Add connections"**
4. 搜索并选择你创建的 Integration
5. 点击 **"Confirm"**

#### 4. 配置环境变量

1. 创建 `.env.local` 文件（如果不存在）
2. 添加以下配置：

```env
# Notion API Key（从步骤 1 复制）
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Notion Database ID（从步骤 2 复制）
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. 重启开发服务器：

```bash
npm run dev
```

#### 5. 验证配置

启动项目后，打开浏览器控制台（F12），查看日志输出：

- ✓ 成功加载 Notion 数据：`✓ 从 Notion 加载了 X 个工具`
- ℹ Notion 未配置：`ℹ Notion 未配置，使用 Mock 数据`
- ⚠ Notion 数据为空：`⚠ Notion 数据为空，使用 Mock 数据`

### 📊 Notion 数据库表结构

#### 必需字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| **Name** | Title | 工具名称（自动创建） | ChatGPT |
| **description** | Text | 工具描述 | AI 对话助手，能够理解和生成自然语言 |
| **category** | Select | 分类 | chatbots, image-tools, coding-assistants, writing-tools, productivity, research |
| **tags** | Multi-select | 标签 | AI, Chat, Free |
| **website** | URL | 官网链接 | https://chatgpt.com |
| **featured** | Checkbox | 是否精选 | 勾选表示精选工具 |
| **rating** | Number | 评分（0-5） | 4.8 |
| **priceType** | Select | 价格类型 | free, freemium, paid |
| **status** | Select | 状态 | draft, published, unpublished |
| **views** | Number | 访问量 | 15420 |
| **favorites** | Number | 收藏数 | 3420 |
| **isNew** | Checkbox | 是否新工具 | 勾选表示新工具 |
| **isHot** | Checkbox | 是否热门 | 勾选表示热门 |
| **addedAt** | Date | 添加日期 | 2024-01-01 |

#### 可选字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| **description_en** | Text | 英文描述 | AI chat assistant for natural language |
| **price** | Text | 价格详情 | $20/month |
| **screenshots** | Multi-select | 截图 URL（数组） | https://example.com/screenshot1.png |
| **features** | Multi-select | 功能特点（数组） | 实时对话, 多语言支持, 上下文记忆 |
| **pros** | Multi-select | 优点（数组） | 响应快, 准确率高, 易用 |
| **cons** | Multi-select | 缺点（数组） | 限制次数, 需要网络 |
| **seoTitle** | Text | SEO 标题 | ChatGPT - AI 对话助手 |
| **seoDescription** | Text | SEO 描述 | ChatGPT 是最先进的 AI 对话助手，帮助你完成各种任务 |
| **seoKeywords** | Multi-select | SEO 关键词（数组） | AI, 对话助手, ChatGPT |

#### Select 选项推荐

**category** 选项：
- `chatbots` - 聊天机器人
- `image-tools` - 图像工具
- `coding-assistants` - 编程助手
- `writing-tools` - 写作工具
- `productivity` - 生产力工具
- `research` - 研究工具

**priceType** 选项：
- `free` - 免费
- `freemium` - 免费增值
- `paid` - 付费

**status** 选项：
- `draft` - 草稿
- `published` - 已发布
- `unpublished` - 未发布

### 🎨 图标和封面设置

#### 工具图标

为每个工具设置图标，推荐使用 emoji：

1. 在 Notion 页面标题左侧，点击添加图标
2. 选择 **"Emoji"** 标签
3. 搜索并选择合适的 emoji
4. 常用图标示例：
   - 🤖 - 聊天机器人
   - 🎨 - 图像工具
   - 💻 - 编程工具
   - ✍️ - 写作工具
   - ⚡ - 生产力工具
   - 🔬 - 研究工具

#### 封面图片（可选）

为工具添加封面图片：

1. 在 Notion 页面顶部，点击 **"Add cover"**
2. 上传图片或输入图片 URL
3. 支持的格式：JPG, PNG, GIF, WebP

### 🔄 数据同步

- **自动加载**：启动时自动从 Notion 加载数据
- **实时更新**：修改 Notion 数据后，刷新页面即可看到最新数据
- **分类筛选**：点击分类时，从 Notion 加载对应分类的工具
- **搜索功能**：使用本地搜索，支持名称、描述、标签

### ⚠️ 注意事项

1. **NOTION_API_KEY** 必须以 `secret_` 开头
2. **NOTION_DATABASE_ID** 是 32 位字符，不包含连字符
3. 确保 Integration 已连接到数据库（"Add connections"）
4. 工具状态必须为 `published` 才会显示在前端
5. 如果 Notion 数据为空或加载失败，会自动使用 Mock 数据
6. `.env.local` 文件不要提交到 Git

### 🐛 故障排除

#### 问题：控制台显示 "Notion API Error"

**原因**：API Key 或 Database ID 错误

**解决方案**：
1. 检查 `.env.local` 中的配置是否正确
2. 确认 Integration 已连接到数据库
3. 检查 Notion API 配额是否超限

#### 问题：显示 "Notion 数据为空，使用 Mock 数据"

**原因**：数据库为空或没有 `status = published` 的数据

**解决方案**：
1. 在 Notion 数据库中添加工具数据
2. 确保 `status` 字段设置为 `published`
3. 检查字段名是否与表结构一致

#### 问题：控制台显示 "Notion 未配置，使用 Mock 数据"

**原因**：环境变量未配置

**解决方案**：
1. 创建 `.env.local` 文件
2. 添加 `NOTION_API_KEY` 和 `NOTION_DATABASE_ID`
3. 重启开发服务器

---

## 🌍 支持的语言

| 语言 | 代码 | 名称 | 状态 |
|------|------|------|------|
| 🇨🇳🇰 | zh-CN | 简体中文 | ✅ 完整支持 |
| 🇺🇸 | en-US | 英文 | ✅ 完整支持 |
| 🇪🇸 | es-ES | 西班牙文 | ✅ 完整支持 |
| 🇫🇷 | fr-FR | 法文 | ✅ 完整支持 |

---

## 📊 数据统计

- **工具总数**: 30 个精选 AI 工具
- **分类数量**: 8 个主要分类
- **支持语言**: 4 种语言
- **CMS 模式**: Mock 数据 + Notion 数据双模式

---

## 🎯 设计理念

Waffle Brain 的设计灵感来自：

- **华夫格子**（Waffle）- 象征神经网络的结构化数据
- **大脑**（Brain）- 代表 AI 的智能和思考

**设计原则：**
1. **纸张质感** - 模拟真实的纸质体验
2. **莫兰迪色系** - 温暖柔和，眼睛舒适
3. **极简布局** - 聚焦内容，去除冗余
4. **流畅交互** - 60fps 动画，纸张质感反馈
5. **主题切换** - 亮暗两用，适应不同场景
6. **CMS 集成** - 灵活的内容管理

---

## 📝 许可证

MIT License

---

## 👨‍💻 作者

**Waffle Brain Team**

- 🌐 **官网**: [https://wafflebrain.com](https://wafflebrain.com)
- 🐙 **GitHub**: [https://github.com/zhujingyuan7/ai-tools-navigation](https://github.com/zhujingyuan7/ai-tools-navigation)

---

**Made with 🧇 using [Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)**
