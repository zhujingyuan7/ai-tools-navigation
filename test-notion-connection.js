/**
 * 测试 Notion 集成
 *
 * 使用方法：
 * node test-notion-connection.js
 */

require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

// 创建 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

console.log('🔍 Notion 集成测试\n');

// 检查配置
console.log('📋 配置检查：');
console.log(`  API Key: ${process.env.NOTION_API_KEY ? '✓ 已配置' : '✗ 未配置'}`);
console.log(`  Database ID: ${process.env.NOTION_DATABASE_ID ? '✓ 已配置' : '✗ 未配置'}`);

if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
  console.log('\n❌ 配置不完整，请检查 .env.local 文件');
  console.log('\n提示：');
  console.log('  1. 确保已设置 NOTION_API_KEY（格式：secret_xxx...）');
  console.log('  2. 确保已设置 NOTION_DATABASE_ID（32 位字符）');
  console.log('  3. 参考 NOTION_CMS_GUIDE.md 完成配置');
  process.exit(1);
}

// 测试连接
async function testConnection() {
  try {
    console.log('\n🔄 测试连接...\n');

    // 1. 测试数据库访问
    console.log('1️⃣ 测试数据库访问...');
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    console.log(`   ✅ 数据库名称: ${database.title?.[0]?.plain_text || '无标题'}`);
    console.log(`   📊 字段数量: ${Object.keys(database.properties).length}`);

    // 2. 获取所有已发布的工具
    console.log('\n2️⃣ 获取已发布的工具...');
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'status',
        select: {
          equals: 'published',
        },
      },
      sorts: [
        {
          property: 'featured',
          direction: 'descending',
        },
        {
          property: 'rating',
          direction: 'descending',
        },
      ],
    });

    const publishedTools = response.results;

    console.log(`   ✅ 找到 ${publishedTools.length} 个已发布的工具`);

    if (publishedTools.length > 0) {
      console.log('\n📝 工具列表：\n');

      publishedTools.slice(0, 5).forEach((page, index) => {
        const properties = page.properties;
        const name = properties.Name || properties.name;
        const description = properties.description || properties.Description;
        const category = properties.category || properties.Category;
        const rating = properties.rating || properties.Rating;

        const toolName = name?.title?.[0]?.plain_text || '无名称';
        const toolDescription = description?.rich_text?.[0]?.plain_text || '无描述';
        const toolCategory = category?.select?.name || '无分类';
        const toolRating = rating?.number || 0;

        console.log(`   ${index + 1}. ${toolName}`);
        console.log(`      分类: ${toolCategory}`);
        console.log(`      评分: ${toolRating}`);
        console.log(`      描述: ${toolDescription.substring(0, 60)}${toolDescription.length > 60 ? '...' : ''}`);
        console.log('');
      });

      if (publishedTools.length > 5) {
        console.log(`   ... 还有 ${publishedTools.length - 5} 个工具\n`);
      }
    }

    // 3. 测试分类查询
    console.log('3️⃣ 测试分类查询...');
    const categoryProperty = Object.values(database.properties).find(
      (p) => p.name === 'category' || p.name === 'Category'
    );

    if (categoryProperty?.type === 'select' && categoryProperty.select?.options) {
      console.log(`   ✅ 找到 ${categoryProperty.select.options.length} 个分类:`);
      categoryProperty.select.options.forEach((opt, index) => {
        console.log(`      ${index + 1}. ${opt.name}`);
      });
    } else {
      console.log('   ⚠️  未找到 category 字段');
    }

    console.log('\n✅ Notion 集成测试通过！\n');
    console.log('💡 现在你可以启动项目了：');
    console.log('   npm run dev\n');

    return true;
  } catch (error) {
    console.error('\n❌ Notion 集成测试失败：\n');
    console.error('错误信息：', error.message);
    console.error('\n可能的原因：');
    console.error('  1. API Key 或 Database ID 错误');
    console.error('  2. Integration 未连接到数据库');
    console.error('  3. 数据库不存在或无访问权限');
    console.error('  4. 网络问题');
    console.error('\n解决方案：');
    console.error('  1. 检查 .env.local 中的配置');
    console.error('  2. 在 Notion 中确认 Integration 已连接（"Add connections"）');
    console.error('  3. 参考 NOTION_CMS_GUIDE.md 排查问题\n');
    return false;
  }
}

// 运行测试
testConnection()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ 测试过程中发生错误：', error);
    process.exit(1);
  });
