/**
 * Notion Client 配置和工具函数
 * 用于从 Notion 数据库获取 AI 工具数据
 */

import { Client, isNotionClientError } from '@notionhq/client';

// ============================================================
// 客户端配置
// ============================================================

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// ============================================================
// 类型定义
// ============================================================

export interface NotionTool {
  id: string;
  name: string;
  description: string;
  description_en?: string;
  category: string;
  tags: string[];
  icon: string;
  website: string;
  featured: boolean;
  rating: number;
  priceType: 'free' | 'freemium' | 'paid';
  price?: string;
  status: 'draft' | 'published' | 'unpublished';
  views: number;
  favorites: number;
  isNew: boolean;
  isHot: boolean;
  addedAt: string;
  screenshots?: string[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface NotionProperty {
  type: string;
  [key: string]: any;
}

interface NotionPage {
  id: string;
  properties: {
    [key: string]: NotionProperty;
  };
  icon?: any;
  cover?: any;
}

// ============================================================
// 工具函数
// ============================================================

/**
 * 从 Notion 页面属性中提取文本
 */
function extractText(property: NotionProperty): string {
  if (property.type === 'title') {
    return property.title?.[0]?.plain_text || '';
  }
  if (property.type === 'rich_text') {
    return property.rich_text?.[0]?.plain_text || '';
  }
  if (property.type === 'select') {
    return property.select?.name || '';
  }
  if (property.type === 'multi_select') {
    return property.multi_select?.map((item: any) => item.name).join(', ') || '';
  }
  if (property.type === 'url') {
    return property.url || '';
  }
  if (property.type === 'number') {
    return String(property.number || '');
  }
  return '';
}

/**
 * 从 Notion 页面属性中提取数组
 */
function extractArray(property: NotionProperty): string[] {
  if (property.type === 'multi_select') {
    return property.multi_select?.map((item: any) => item.name) || [];
  }
  if (property.type === 'rich_text') {
    return property.rich_text?.map((item: any) => item.plain_text) || [];
  }
  return [];
}

/**
 * 从 Notion 页面属性中提取布尔值
 */
function extractBoolean(property: NotionProperty, defaultValue: boolean = false): boolean {
  if (property.type === 'checkbox') {
    return property.checkbox || defaultValue;
  }
  if (property.type === 'select') {
    return property.select?.name === 'true' || property.select?.name === 'yes';
  }
  return defaultValue;
}

/**
 * 从 Notion 页面属性中提取日期
 */
function extractDate(property: NotionProperty): string {
  if (property.type === 'date') {
    return property.date?.start || '';
  }
  if (property.type === 'created_time') {
    return property.created_time || '';
  }
  return '';
}

/**
 * 从 Notion 页面提取图标
 */
function extractIcon(page: NotionPage): string {
  if (page.icon?.type === 'emoji') {
    return page.icon.emoji || '🤖';
  }
  if (page.icon?.type === 'external') {
    return page.icon.external.url || '🤖';
  }
  if (page.icon?.type === 'file') {
    return page.icon.file.url || '🤖';
  }
  return '🤖';
}

/**
 * 从 Notion 页面提取封面图片
 */
function extractCover(page: NotionPage): string | undefined {
  if (page.cover?.type === 'external') {
    return page.cover.external.url;
  }
  if (page.cover?.type === 'file') {
    return page.cover.file.url;
  }
  return undefined;
}

/**
 * 将 Notion 页面转换为 AITool 对象
 */
function notionPageToTool(page: NotionPage): NotionTool {
  const properties = page.properties;

  return {
    id: page.id.replace(/-/g, ''),
    name: extractText(properties.name || properties.title || properties.Name),
    description: extractText(properties.description || properties.Description),
    description_en: properties.description_en || properties.Description_en ? extractText(properties.description_en || properties.Description_en) : undefined,
    category: extractText(properties.category || properties.Category),
    tags: extractArray(properties.tags || properties.Tags),
    icon: extractIcon(page),
    website: extractText(properties.website || properties.url || properties.Website || properties.URL),
    featured: extractBoolean(properties.featured || properties.Featured),
    rating: Number(properties.rating?.number || properties.Rating?.number || 0),
    priceType: (extractText(properties.priceType || properties.PriceType) as 'free' | 'freemium' | 'paid') || 'freemium',
    price: properties.price || properties.Price ? extractText(properties.price || properties.Price) : undefined,
    status: (extractText(properties.status || properties.Status) as 'draft' | 'published' | 'unpublished') || 'published',
    views: Number(properties.views?.number || properties.Views?.number || 0),
    favorites: Number(properties.favorites?.number || properties.Favorites?.number || 0),
    isNew: extractBoolean(properties.isNew || properties.IsNew),
    isHot: extractBoolean(properties.isHot || properties.IsHot),
    addedAt: extractDate(properties.addedAt || properties.AddedAt || properties.created_time),
    screenshots: extractArray(properties.screenshots || properties.Screenshots),
    features: extractArray(properties.features || properties.Features),
    pros: extractArray(properties.pros || properties.Pros),
    cons: extractArray(properties.cons || properties.Cons),
    seoTitle: properties.seoTitle || properties.SeoTitle ? extractText(properties.seoTitle || properties.SeoTitle) : undefined,
    seoDescription: properties.seoDescription || properties.SeoDescription ? extractText(properties.seoDescription || properties.SeoDescription) : undefined,
    seoKeywords: extractArray(properties.seoKeywords || properties.SeoKeywords),
  };
}

/**
 * 获取所有已发布的工具
 */
export async function getPublishedTools(): Promise<NotionTool[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID not configured, returning empty array');
      return [];
    }

    const response = await notion.databases.query({
      database_id: databaseId,
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

    return response.results.map((page: any) => notionPageToTool(page));
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error('Notion API Error:', error.message);
      console.error('Error code:', error.code);
    } else {
      console.error('Error fetching tools from Notion:', error);
    }
    return [];
  }
}

/**
 * 根据分类获取工具
 */
export async function getToolsByCategory(category: string): Promise<NotionTool[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID not configured, returning empty array');
      return [];
    }

    const filter: any = {
      and: [
        {
          property: 'status',
          select: {
            equals: 'published',
          },
        },
      ],
    };

    if (category !== 'all') {
      filter.and.push({
        property: 'category',
        select: {
          equals: category,
        },
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter,
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

    return response.results.map((page: any) => notionPageToTool(page));
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error('Notion API Error:', error.message);
      console.error('Error code:', error.code);
    } else {
      console.error('Error fetching tools by category from Notion:', error);
    }
    return [];
  }
}

/**
 * 根据工具 ID 获取工具详情
 */
export async function getToolById(id: string): Promise<NotionTool | null> {
  try {
    const page = await notion.pages.retrieve({
      page_id: id,
    });

    return notionPageToTool(page as any);
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error('Notion API Error:', error.message);
      console.error('Error code:', error.code);
    } else {
      console.error('Error fetching tool by ID from Notion:', error);
    }
    return null;
  }
}

/**
 * 搜索工具
 */
export async function searchTools(query: string): Promise<NotionTool[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID not configured, returning empty array');
      return [];
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'status',
            select: {
              equals: 'published',
            },
          },
          {
            or: [
              {
                property: 'name',
                title: {
                  contains: query,
                },
              },
              {
                property: 'description',
                rich_text: {
                  contains: query,
                },
              },
            ],
          },
        ],
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

    return response.results.map((page: any) => notionPageToTool(page));
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error('Notion API Error:', error.message);
      console.error('Error code:', error.code);
    } else {
      console.error('Error searching tools in Notion:', error);
    }
    return [];
  }
}

/**
 * 获取所有分类
 */
export async function getCategories(): Promise<string[]> {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID not configured, returning empty array');
      return [];
    }

    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const categoryProperty = (database as any).properties.find((p: any) =>
      p.name === 'category' || p.name === 'Category'
    );

    if (categoryProperty?.type === 'select' && categoryProperty.select?.options) {
      return categoryProperty.select.options.map((opt: any) => opt.name);
    }

    return [];
  } catch (error) {
    if (isNotionClientError(error)) {
      console.error('Notion API Error:', error.message);
      console.error('Error code:', error.code);
    } else {
      console.error('Error fetching categories from Notion:', error);
    }
    return [];
  }
}

// ============================================================
// 检查配置
// ============================================================

export function isNotionConfigured(): boolean {
  return !!(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
}

export function getNotionConfig() {
  return {
    apiKey: process.env.NOTION_API_KEY ? '✓ 配置' : '✗ 未配置',
    databaseId: process.env.NOTION_DATABASE_ID ? '✓ 配置' : '✗ 未配置',
  };
}
