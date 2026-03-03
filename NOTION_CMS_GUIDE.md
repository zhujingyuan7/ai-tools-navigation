# Notion CMS 快速入门指南

本指南将帮助你快速配置 Notion 作为 Waffle Brain 的内容管理系统（CMS）。

---

## 📋 前置要求

- 一个 Notion 账户
- 已克隆 Waffle Brain 项目
- 已安装 Node.js 和 npm

---

## 🚀 快速开始（5 分钟）

### 第 1 步：创建 Notion Integration（2 分钟）

1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击 **"+ New integration"**
3. 填写信息：
   - **Name**: `Waffle Brain`
   - **Type**: `Internal`
   - **Associated workspace**: 选择你的工作空间
4. 点击 **"Submit"**
5. 复制生成的 **Internal Integration Token**（格式：`secret_xxx...`）

> **提示**：保存好这个 Token，之后需要用到！

---

### 第 2 步：创建 Notion 数据库（2 分钟）

#### 方式 1：手动创建数据库

1. 在 Notion 中创建新页面，选择 **"Table - Database"**
2. 点击 **"+"** 添加列，按照以下结构设置字段：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| Name | Title | 工具名称 |
| description | Text | 工具描述 |
| category | Select | 分类 |
| tags | Multi-select | 标签 |
| website | URL | 官网链接 |
| featured | Checkbox | 是否精选 |
| rating | Number | 评分 |
| priceType | Select | 价格类型 |
| status | Select | 状态 |
| views | Number | 访问量 |
| favorites | Number | 收藏数 |
| isNew | Checkbox | 是否新工具 |
| isHot | Checkbox | 是否热门 |
| addedAt | Date | 添加日期 |

#### 为 Select 字段添加选项：

**category** 选项：
- chatbots
- image-tools
- coding-assistants
- writing-tools
- productivity
- research

**priceType** 选项：
- free
- freemium
- paid

**status** 选项：
- draft
- published
- unpublished

#### 方式 2：导入模板（推荐）

1. 复制以下 JSON，在 Notion 中导入数据库模板
2. 点击数据库右上角 "..." → "Duplicate" → "Export" → 选择 "CSV"
3. （待提供：Notion 数据库模板链接）

---

### 第 3 步：添加示例数据（1 分钟）

在数据库中添加几个示例工具：

| Name | description | category | tags | website | featured | rating | priceType | status |
|------|-------------|----------|------|---------|----------|--------|-----------|--------|
| ChatGPT | AI 对话助手，能够理解和生成自然语言 | chatbots | AI, Chat, Free | https://chatgpt.com | ✅ | 4.8 | freemium | published |
| Midjourney | 强大的 AI 图像生成工具，可创建高质量艺术作品 | image-tools | 图像生成, AI绘画 | https://midjourney.com | ✅ | 4.7 | paid | published |
| GitHub Copilot | AI 编程助手，帮助开发者提高代码编写效率 | coding-assistants | 编程, 代码生成 | https://github.com/features/copilot | ❌ | 4.6 | freemium | published |

> **提示**：记得给每个工具页面添加 emoji 图标！

---

### 第 4 步：获取 Database ID（1 分钟）

1. 打开你的 Notion 数据库页面
2. 查看 URL，格式如下：
   ```
   https://www.notion.so/your-workspace/[DATABASE_ID]?v=xxx
   ```
3. 复制 `[DATABASE_ID]` 部分（32 位字符，不包含连字符）

> **示例**：如果 URL 是 `https://www.notion.so/my-workspace/abcdef1234567890abcdef1234567890?v=xxx`，则 Database ID 为 `abcdef1234567890abcdef1234567890`

---

### 第 5 步：连接 Integration（30 秒）

1. 打开你的 Notion 数据库页面
2. 点击右上角 **"..."** 菜单
3. 选择 **"Add connections"**
4. 搜索并选择你创建的 **"Waffle Brain"** Integration
5. 点击 **"Confirm"**

> **重要**：必须完成这一步，否则无法访问数据库！

---

### 第 6 步：配置环境变量（1 分钟）

1. 在项目根目录创建 `.env.local` 文件：
   ```bash
   touch .env.local
   ```

2. 编辑 `.env.local`，添加以下内容：
   ```env
   # Notion API Key（从第 1 步获取）
   NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   # Notion Database ID（从第 4 步获取）
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. 保存文件

---

### 第 7 步：启动项目（1 分钟）

1. 安装依赖（如果还没安装）：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 打开浏览器访问：`http://localhost:3000`

4. 打开浏览器控制台（F12），查看日志输出：
   - ✅ 成功：`✓ 从 Notion 加载了 X 个工具`
   - ⚠️ 空数据：`⚠ Notion 数据为空，使用 Mock 数据`
   - ❌ 错误：检查配置是否正确

---

## ✅ 验证配置

如果配置成功，你应该能够：

1. ✅ 在主页看到从 Notion 加载的工具列表
2. ✅ 点击分类筛选工具
3. ✅ 搜索工具（名称、描述、标签）
4. ✅ 查看工具详情
5. ✅ 收藏工具
6. ✅ 在 Notion 中修改数据，刷新页面后看到更新

---

## 🎯 数据管理

### 添加新工具

1. 在 Notion 数据库中创建新条目
2. 填写所有必需字段
3. 设置 `status` 为 `published`
4. 添加 emoji 图标（推荐）
5. 保存

### 更新工具信息

1. 在 Notion 数据库中找到对应工具
2. 修改需要更新的字段
3. 保存
4. 刷新网站查看更新

### 删除工具

1. 在 Notion 数据库中删除对应条目
2. 刷新网站，工具将从列表中移除

### 批量导入工具

1. 准备 CSV 文件，格式与数据库结构一致
2. 在 Notion 数据库中点击 **"..."** → **"Import"**
3. 选择 CSV 文件
4. 确认字段映射
5. 导入成功后，刷新网站

---

## 🎨 最佳实践

### 1. 工具图标

- 使用 emoji 图标（推荐）
- 常用图标：
  - 🤖 聊天机器人
  - 🎨 图像工具
  - 💻 编程工具
  - ✍️ 写作工具
  - ⚡ 生产力工具
  - 🔬 研究工具

### 2. 工具描述

- 简洁明了，1-2 句话
- 突出核心功能
- 避免营销话术

### 3. 标签

- 3-5 个标签
- 相关性强的关键词
- 使用常用术语

### 4. 评分

- 0-5 分
- 基于真实用户体验
- 定期更新

### 5. 分类

- 选择最相关的分类
- 避免过度分类
- 新工具可暂时归入 "research"

---

## 🐛 故障排除

### 问题 1：控制台显示 "Notion API Error"

**可能原因**：
- API Key 错误
- Database ID 错误
- Integration 未连接到数据库

**解决方案**：
1. 检查 `.env.local` 中的配置是否正确
2. 确认 API Key 以 `secret_` 开头
3. 确认 Database ID 是 32 位字符
4. 确保 Integration 已连接到数据库（"Add connections"）

---

### 问题 2：显示 "Notion 数据为空，使用 Mock 数据"

**可能原因**：
- 数据库为空
- 没有 `status = published` 的数据

**解决方案**：
1. 在 Notion 数据库中添加工具数据
2. 确保 `status` 字段设置为 `published`
3. 检查字段名是否与表结构一致（区分大小写）

---

### 问题 3：刷新页面后看不到更新

**可能原因**：
- 浏览器缓存
- 环境变量未生效

**解决方案**：
1. 重启开发服务器：
   ```bash
   # Ctrl + C 停止
   npm run dev
   ```
2. 清除浏览器缓存（Ctrl + Shift + R）

---

### 问题 4：某些字段显示为空

**可能原因**：
- 字段名拼写错误
- 字段类型不匹配

**解决方案**：
1. 检查 Notion 数据库中的字段名是否与表结构一致
2. 确保字段类型正确（Title, Text, Select 等）
3. 查看控制台错误日志

---

## 📚 更多资源

- [Notion API 文档](https://developers.notion.com/)
- [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js)
- [Notion Integration 指南](https://www.notion.so/help/integrations)
- [Waffle Brain GitHub](https://github.com/zhujingyuan7/ai-tools-navigation)

---

## 💡 进阶技巧

### 使用公式自动计算评分

在 Notion 数据库中添加 `overallScore` 字段（公式类型）：

```
prop("rating") * 0.6 + prop("views") / 10000 * 0.2 + prop("favorites") / 5000 * 0.2
```

### 使用关系字段关联分类

创建单独的 "Categories" 数据库，使用关系字段关联工具和分类，实现更复杂的分类管理。

### 使用模板快速创建工具

为数据库创建模板，预设常用字段值，提高录入效率。

---

## 🎉 恭喜！

如果你已经成功完成以上步骤，你的 Waffle Brain 现在已经使用 Notion 作为 CMS 了！

享受高效的工具管理体验吧！🧇🧠
