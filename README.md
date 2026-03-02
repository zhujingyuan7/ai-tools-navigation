# 🧇 Waffle Brain 🧠

<div align="center">

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

---

## ✨ 主要功能

### 🧰 工具导航
- 📂 **分类导航** - 左侧固定液态玻璃分类导航栏
- 🔍 **实时搜索** - 支持工具名称、描述、标签搜索
- 🏷️ **标签系统** - 每个工具的标签展示
- 🌟 **精选推荐** - 高亮推荐的优质工具
- 📖 **工具详情** - 完整的工具信息、官网链接
- ⭐ **收藏功能** - 本地存储、个性化收藏列表

### 🎨 设计系统
- 🪟 **纸张质感** - 微黄色（亮色）/ 暖棕色（暗色）纸张纹理
- 🪞 **液态玻璃** - 毛玻璃效果 + 液态流动感
- 🌈 **莫兰迪色系** - 温暖柔和的配色方案
- ✨ **光泽效果** - 悬停时的光泽扫过动画
- 🎯 **对比强烈** - 暗色主题下文字清晰醒目

### 🎭 主题切换
- ☀️ **亮色主题** - 微黄色新纸张质感，适合白天
- 🌙 **暗色主题** - 暖棕色旧纸张质感，适合夜间
- 🎯 **白色标题** - 暗色主题下 "Waffle Brain" 显示为纯白渐变
- 🌈 **完整适配** - 所有组件都支持主题切换

---

## 🚀 技术栈

### 核心框架
- **[Next.js 14](https://nextjs.org)** - React 框架，App Router
- **[React 18](https://react.dev)** - UI 库
- **[TypeScript](https://www.typescriptlang.org)** - 类型安全
- **[next-intl](https://next-intl-docs.vercel.app)** - 国际化

### 样式和 UI
- **[Tailwind CSS 3.4](https://tailwindcss.com)** - 原子化 CSS 框架
- **[Framer Motion 12.34](https://www.framer.com/motion)** - 高性能动画库
- **[Lucide React Icons](https://lucide.dev)** - 精美的图标库

### 部署
- **[Vercel](https://vercel.com)** - 自动部署平台
- **Edge Runtime** - 全球边缘计算网络

---

## 🎨 莫兰迪纸张质感设计

### 🌈 配色方案（基于 oklch()）

#### 亮色主题（微黄纸张）
- **背景**: `oklch(0.98 0.006 90)` - 明亮的微黄色，像新纸张
- **前景**: `oklch(0.20 0.018 65)` - 深棕色，像墨水
- **主色调**: 温暖棕 + 柔和灰 + 温暖橙黄

#### 暗色主题（暖棕纸张）
- **背景**: `oklch(0.35 0.025 55)` - 暖棕色，像旧纸张
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

### 📐 布局设计

#### 极简结构
```
┌─────────────────────────────────────────────┐
│  侧边栏        主内容区             │
│                 ┌─────────────┐      │
│  ┌─────────┐   │  搜索框     │      │
│  │ 液态玻璃 │   │             │      │
│  │ 导航     │   │ Waffle      │      │
│  │         │   │ Brain       │      │
│  │ Logo    │   │ slogan      │      │
│  │         │   │             │      │
│  │ 分类     │   ┌─────────────┐      │
│  │ - 全部   │   │ 工具卡片     │      │
│  │ - 文生  │   │ [卡片][卡片]  │      │
│  │ - 图像   │   │ [卡片][卡片]  │      │
│  │ - 音频   │   │ [卡片][卡片]  │      │
│  │ - 视频   │   └─────────────┘      │
│  │ - ...    │                          │
│  │         │                          │
│  └─────────┘                          │
└─────────────────────────────────────────────┘
```

#### 响应式网格
- **移动端** (< 640px): 1 列
- **平板** (640px - 1024px): 2 列
- **桌面** (≥ 1024px): 3 列

---

## 📦 项目结构

```
ai-tools-navigation/
├── src/
│   ├── [locale]/              # 多语言路由（zh-CN, en-US, es-ES, fr-FR）
│   │   ├── page.tsx          # 主页（极简布局 + 侧边栏）
│   │   ├── tools/[id]/      # 工具详情页
│   │   └── layout.tsx       # 布局（主题切换器）
│   ├── components/         # React 组件
│   │   ├── ToolCard.tsx        # 工具卡片（纸张质感）
│   │   ├── SmartSearchBox.tsx  # 智能搜索框
│   │   └── ...更多组件
│   ├── hooks/             # 自定义 Hooks
│   ├── data/              # 数据文件
│   │   ├── tools.ts           # 工具数据
│   │   └── categories.ts      # 分类数据
│   ├── lib/               # 工具库
│   ├── app/               # Next.js App Router
│   │   ├── globals.css       # 全局样式（莫兰迪色系）
│   │   └── layout.tsx       # 根布局
│   └── types/            # TypeScript 类型
├── public/                # 静态资源
│   └── logos/             # Logo 文件（SVG）
├── messages/             # 国际化消息文件
├── tailwind.config.ts    # Tailwind 配置（oklch 色彩空间）
├── tsconfig.json        # TypeScript 配置
├── package.json         # 项目配置
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

### 3. 运行开发服务器

```bash
npm run dev
```

然后访问：**http://localhost:3000**

### 4. 构建生产版本

```bash
npm run build
npm start
```

---

## 🌍 支持的语言

| 语言 | 代码 | 名称 | 状态 |
|------|------|------|------|
| 🇨🇳 | zh-CN | 简体中文 | ✅ 完整支持 |
| 🇺🇸 | en-US | 英文 | ✅ 完整支持 |
| 🇪🇸 | es-ES | 西班牙文 | ✅ 完整支持 |
| 🇫🇷 | fr-FR | 法文 | ✅ 完整支持 |

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

---

## 📝 许可证

MIT License

---

## 👨‍💻 作者

**Waffle Brain Team**

- 🌐 **官网**: [https://wafflebrain.com](https://wafflebrain.com)
- 🐙 **GitHub**: [https://github.com/zhujingyuan7/ai-tools-navigation](https://github.com/zhujingyuan7/ai-tools-navigation)

---

<div align="center">

**Made with 🧇 using [Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)**

</div>
