# 🧇🧼 Waffle Brain 🧠

<div align="center">

![Waffle Brain Logo](/logos/logo-simple.svg)

**一个现代化的 AI 工具导航站，基于 Next.js 14 和 Tailwind CSS 构建**

---

## 🌟 核心亮点

- 🎨 **Apple 风格设计** - 精致的毛玻璃效果、流沙动画、动态渐变背景
- 🌐 **完全响应式** - 完美适配手机、平板、桌面设备
- 🚀 **极速体验** - 60fps 流畅动画、快速搜索响应
- 🌍 **多语言支持** - 中文、英文、日语、韩文、西班牙文
- 💾 **智能推荐** - AI 驱动的工具推荐系统
- 📊 **热门排行榜** - 实时更新的 Top 10 工具榜单

---

## ✨ 主要功能

### 🧰 工具导航
- 📂 **8 大分类** - 自然语言、代码助手、图像生成、视频制作等
- 🔍 **实时搜索** - 支持工具名称、描述、标签搜索
- 🏷️ **价格筛选** - 免费工具、Freemium、付费工具筛选
- ⭐ **精选推荐** - 周度更新的热门工具推荐
- 💾 **工具详情** - 完整的工具信息、官网链接、评分、用户评价
- 📚 **收藏功能** - 本地存储、个性化收藏列表

### 📰 新内容分类
- 📰 **AI 新闻热点** - AI 行业最新动态、产品发布、融资收购
- 💡 **OpenClaw 使用技巧** - Agent 配置、最佳实践、快捷命令
- 📚 **AI 教程合集** - 编程教程、Prompt Engineering、架构设计
- 💬 **AI 问答社区** - 常见问题解答、用户经验分享
- 🔥 **热门排行榜** - Top 10 工具、动态排名、访问量统计

### 🎨 个性化功能
- 🌍 **主题切换** - 支持深色/浅色主题，持久化存储
- 🌐 **语言切换** - 6 种语言支持（中文、英文、日语、韩文、西班牙文、法文）
- ⭐ **收藏管理** - 收藏列表、分类管理、导入导出
- 📊 **浏览历史** - 最近查看的工具记录
- 🔔 **偏好设置** - 默认语言、主题、搜索建议等

---

## 🚀 技术栈

### 核心框架
- **[Next.js 14](https://nextjs.org)** - React 框架，App Router
- **[React 18](https://react.dev)** - UI 库
- **[TypeScript](https://www.typescriptlang.org/)** - 类型安全

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

## 🎨 Apple 风格设计系统

### 🌈 配色方案（基于 oklch()）

#### 主色调
- **Apple Blue** - `oklch(0.65 0.195 254.14)` - 专业、可信赖的主色调
- **Neutral Gray** - `oklch(0.98 0.004 285.82)` - 中性灰，用于次要元素
- **Accent Purple** - `oklch(0.60 0.18 310.14)` - 强调色，用于交互反馈

#### 玻璃态效果
- **背景模糊** - 20px blur + 180% 饱和度
- **边框透明度** - 18% 精细边框
- **三层结构** - 基础背景 + 渐变边框 + 光泽动画

### ✨ 高级视觉效果

#### 🌊 流沙效果（Floating Particles）
- **20 个随机分布的发光粒子**
- **从底部浮起** - 6.5s - 9.5s 动画时长
- **不同速度** - 营造深度感

#### 🪟 动态渐变背景
- **15 秒色彩循环** - primary → accent → secondary → primary
- **平滑过渡** - 无性能影响
- **400% 400%** 尺寸

#### 🪟 Shimmer 光泽效果
- **4 秒光泽移动** - 白色渐变光泽
- **卡片悬停时增强** - 更明显的光泽效果

#### 💡 光反射效果
- **顶部柔和光晕** - 椭圆形渐变
- **3 秒脉冲动画** - opacity 0.3 → 0.6

#### ✨ 增强辉光效果
- **4 层蓝色发光** - 20px、40px、60px、100px
- **2 秒脉冲循环** - 模拟呼吸灯效果
- **悬停时增强** - 更强烈的发光

### 🎭 动画系统

#### 动画时长（Apple 风格）
| 效果 | 时长 | 用途 |
|------|------|------|
| 立即响应 | 0ms | 焦点变化 |
| 快速 | 150ms | 按钮点击、图标动画 |
| 正常 | 300ms | 卡片悬停、页面过渡 |
| 缓慢 | 500ms | 搜索结果加载 |
| 较慢 | 750ms | 页面加载动画 |
| 最慢 | 1000ms | 重大状态变化 |

#### 缓动函数
- **linear** - 线性（色彩渐变）
- **ease-in** - 页面淡入
- **ease-out** - 页面淡出
- **ease-in-out** - 双向过渡
- **ease-bounce** - 弹性动画
- **ease-elastic** - 弹性效果

### 🔤 字体系统

#### 字体家族（Apple 风格）
- **Inter** - 主要字体（现代、清晰、易读）
- **JetBrains Mono** - 代码字体（开发者友好）
- **Apple System Fonts** - 优先使用原生字体（最佳性能）

#### 字体选择理由
- ✅ **优先使用 Apple 系统字体** - SF Pro Display、SF Pro Text 等
- ✅ **Inter 作为备选** - 现代、清晰
- ✅ **JetBrains Mono** - 专业的代码显示

---

## 📦 项目结构

```
ai-tools-navigation/
├── src/
│   ├── [locale]/              # 多语言路由（zh-CN, en-US, ja-JP, ko-KR, es-ES, fr-FR）
│   │   ├── page.tsx          # 主页
│   │   ├── tools/[id]/      # 工具详情页
│   │   ├── favorites/       # 收藏列表页
│   │   ├── news/            # AI 新闻热点
│   │   ├── tips/            # OpenClaw 使用技巧
│   │   ├── tutorials/         # AI 教程合集
│   │   ├── community/        # AI 问答社区
│   │   └── trending/        # 热门排行榜
│   ├── components/         # React 组件
│   │   ├── CategoryFilter.tsx    # 分类和价格筛选
│   │   ├── SearchBar.tsx          # 搜索栏
│   │   ├── ToolCard.tsx           # 工具卡片
│   │   ├── LoadingSpinner.tsx      # 加载动画
│   │   ├── EmptyState.tsx         # 空状态
│   │   ├── LanguageSwitcher.tsx   # 语言切换器
│   │   ├── ThemeSwitcher.tsx     # 主题切换器
│   │   └── ...更多组件
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useTranslations.ts  # 国际化 Hook
│   │   ├── useAnalytics.ts        # 分析 Hook
│   │   ├── useFavorites.ts        # 收藏 Hook
│   │   ├── useTheme.ts            # 主题 Hook
│   │   └── ...更多 Hooks
│   ├── data/              # 数据文件
│   │   ├── tools.ts               # 工具数据（30 个）
│   │   ├── trending.ts            # 热门数据（10 个）
│   │   ├── news.ts                # 新闻数据（15 条）
│   │   ├── tips.ts                 # 技巧数据（12 条）
│   │   ├── tutorials.ts            # 教程数据（12 条）
│   │   └── community.ts           # 问答数据（10 条）
│   ├── lib/               # 工具库
│   ├── i18n/              # 国际化文件
│   │   ├── zh-CN.json      # 中文
│   │   ├── en-US.json      # 英文
│   │   ├── ja-JP.json      # 日文
│   │   ├── ko-KR.json      # 韩文
│   │   ├── es-ES.json      # 西班牙文
│   │   └── fr-FR.json      # 法文
│   ├── app/             # Next.js App Router
│   ├── globals.css       # 全局样式（Apple 风格）
│   ├── layout.tsx       # 根布局
│   └── ...其他配置文件
├── public/             # 静态资源
│   ├── logos/          # Logo 文件（SVG）
│   └── ...其他资源
├── messages/          # 国际化消息文件
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
| 🇨🇳🇰 | zh-CN | 简体中文 | ✅ 完整支持 |
| 🇺🇸 | en-US | 英文 | ✅ 完整支持 |
| 🇯🇵 | ja-JP | 日文 | ✅ 完整支持 |
| 🇰🇷 | ko-KR | 韩文 | ✅ 完整支持 |
| 🇪🇸 | es-ES | 西班牙文 | ✅ 完整支持 |
| 🇫🇷 | fr-FR | 法文 | ✅ 完整支持 |

---

## 📊 数据统计

- **工具总数**: 30 个精选 AI 工具
- **分类数量**: 8 个主要分类
- **新闻条目**: 15 条 AI 行业动态
- **技巧条目**: 12 条 OpenClaw 使用技巧
- **教程条目**: 12 条 AI 学习教程
- **问答条目**: 10 条社区热门问答
- **支持语言**: 6 种语言

---

## 🎨 Apple 风格特色

### 视觉效果
- ✨ **流沙效果** - 20 个浮动的发光粒子
- 🪟 **动态渐变背景** - 15 秒色彩循环动画
- 🪟 **毛玻璃效果** - 20px blur + 180% 饱和度
- 💫 **Shimmer 光泽** - 4 秒光泽移动动画
- 💡 **光反射** - 悬停时显示的顶部光晕
- ✨ **增强辉光** - 4 层蓝色发光系统

### 交互效果
- ⬆️ **3D 悬停** - 卡片悬停时轻微上浮（8px）
- 🔄 **旋转效果** - 悬停时轻微旋转（2deg）
- 🫧 **光泽移动** - Shimmer 效果增强
- 💫 **脉冲动画** - 2 秒发光脉冲

### 动画性能
- ⚡ **GPU 加速** - 使用 `transform` 和 `opacity`
- 📊 **Will-Change** - 重要动画使用 `will-change`
- 🎯 **60fps** - 流畅的动画帧率

---

## 🎯 设计理念

Waffle Brain 的设计灵感来自：

- **华夫格子**（Waffle）- 象征神经网络的结构化数据
- **大脑**（Brain）- 代表 AI 的智能和思考

**设计原则：**
1. **简洁优先** - 留白，让内容说话
2. **细节完美** - 精心打磨每个像素
3. **流畅动画** - 60fps 流畅体验
4. **高对比度** - 清晰的视觉层次
5. **一致性** - 统一的设计语言

---

## 📝 许可证

MIT License

---

## 👨 作者

**Waffle Brain Team**

- 🌐 **官网**: [https://wafflebrain.com](https://wafflebrain.com)
- 🐙 **GitHub**: [https://github.com/zhujingyuan7/ai-tools-navigation](https://github.com/zhujingyuan7/ai-tools-navigation)
- 📧 **Twitter**: [@wafflebrain](https://twitter.com/wafflebrain)

---

<div align="center">

**Made with ❤️ using [Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)**

</div>
