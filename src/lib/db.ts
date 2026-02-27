import { promises as fs } from 'fs';
import path from 'path';
import type { Admin, AuditLog, SiteSettings } from '@/types';

const TOOLS_FILE = path.join(process.cwd(), 'src/data/tools.json');
const STATS_FILE = path.join(process.cwd(), 'src/data/stats.json');
const ADMINS_FILE = path.join(process.cwd(), 'src/data/admin.json');
const AUDIT_LOGS_FILE = path.join(process.cwd(), 'src/data/auditLogs.json');
const SETTINGS_FILE = path.join(process.cwd(), 'src/data/settings.json');

export interface Stats {
  totalViews: number;
  activeUsers: number;
  dailyViews: Record<string, number>;
  categoryViews: Record<string, number>;
  toolViews: Record<string, number>;
  searchQueries: Record<string, number>;
  userBehaviors: Array<{
    id: string;
    timestamp: number;
    action: string;
    toolId?: string;
    category?: string;
    searchQuery?: string;
  }>;
}

// 工具管理
export async function getTools() {
  try {
    const data = await fs.readFile(TOOLS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tools:', error);
    return [];
  }
}

export async function saveTools(tools: any[]) {
  try {
    await fs.writeFile(TOOLS_FILE, JSON.stringify(tools, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving tools:', error);
    return false;
  }
}

export async function getToolById(id: string) {
  const tools = await getTools();
  return tools.find((tool: any) => tool.id === id);
}

export async function createTool(tool: any) {
  const tools = await getTools();
  const newTool = {
    ...tool,
    id: String(tools.length + 1),
  };
  tools.push(newTool);
  await saveTools(tools);
  return newTool;
}

export async function updateTool(id: string, updates: any) {
  const tools = await getTools();
  const index = tools.findIndex((tool: any) => tool.id === id);
  if (index === -1) return null;
  tools[index] = { ...tools[index], ...updates };
  await saveTools(tools);
  return tools[index];
}

export async function deleteTool(id: string) {
  const tools = await getTools();
  const filtered = tools.filter((tool: any) => tool.id !== id);
  await saveTools(filtered);
  return true;
}

// 统计数据管理
export async function getStats(): Promise<Stats> {
  try {
    const data = await fs.readFile(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stats:', error);
    return {
      totalViews: 0,
      activeUsers: 0,
      dailyViews: {},
      categoryViews: {},
      toolViews: {},
      searchQueries: {},
      userBehaviors: [],
    };
  }
}

export async function saveStats(stats: Stats) {
  try {
    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving stats:', error);
    return false;
  }
}

export async function incrementToolView(toolId: string) {
  const stats = await getStats();
  stats.totalViews += 1;
  stats.toolViews[toolId] = (stats.toolViews[toolId] || 0) + 1;

  const today = new Date().toISOString().split('T')[0];
  stats.dailyViews[today] = (stats.dailyViews[today] || 0) + 1;

  const tool = await getToolById(toolId);
  if (tool) {
    stats.categoryViews[tool.category] = (stats.categoryViews[tool.category] || 0) + 1;
  }

  // 记录用户行为
  stats.userBehaviors.push({
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    action: 'view_tool',
    toolId,
    category: tool?.category,
  });

  await saveStats(stats);
  return true;
}

export async function recordSearch(query: string) {
  const stats = await getStats();
  stats.searchQueries[query] = (stats.searchQueries[query] || 0) + 1;

  stats.userBehaviors.push({
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    action: 'search',
    searchQuery: query,
  });

  await saveStats(stats);
  return true;
}

// ============ 管理员管理 ============

export async function getAdmins(): Promise<Admin[]> {
  try {
    const data = await fs.readFile(ADMINS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading admins:', error);
    return [];
  }
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const admins = await getAdmins();
  return admins.find((admin) => admin.username === username) || null;
}

export async function createAdmin(admin: Omit<Admin, 'id' | 'createdAt'>): Promise<Admin> {
  const admins = await getAdmins();
  const newAdmin: Admin = {
    ...admin,
    id: `admin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  admins.push(newAdmin);
  await fs.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2));
  return newAdmin;
}

export async function updateAdmin(id: string, updates: Partial<Admin>): Promise<Admin | null> {
  const admins = await getAdmins();
  const index = admins.findIndex((admin) => admin.id === id);
  if (index === -1) return null;

  admins[index] = { ...admins[index], ...updates };
  await fs.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2));
  return admins[index];
}

export async function deleteAdmin(id: string): Promise<boolean> {
  const admins = await getAdmins();
  const filtered = admins.filter((admin) => admin.id !== id);
  if (filtered.length === admins.length) return false;

  await fs.writeFile(ADMINS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

// ============ 审计日志 ============

export async function getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
  try {
    const data = await fs.readFile(AUDIT_LOGS_FILE, 'utf-8');
    const logs = JSON.parse(data);
    return logs.sort((a: AuditLog, b: AuditLog) => b.timestamp - a.timestamp).slice(0, limit);
  } catch (error) {
    console.error('Error reading audit logs:', error);
    return [];
  }
}

export async function addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
  const logs = await getAuditLogs(10000); // 获取所有日志
  const newLog: AuditLog = {
    ...log,
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  logs.unshift(newLog); // 添加到开头

  // 保留最近 10000 条日志
  const trimmedLogs = logs.slice(0, 10000);
  await fs.writeFile(AUDIT_LOGS_FILE, JSON.stringify(trimmedLogs, null, 2));
  return newLog;
}

// ============ 网站设置 ============

export async function getSettings(): Promise<SiteSettings> {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
      siteName: 'Waffle Brain',
      siteTitle: 'AI 工具导航站',
      description: '',
      keywords: [],
      defaultSeoDescription: '',
      defaultSeoKeywords: [],
    };
  }
}

export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  try {
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

// ============ 批量操作 ============

export async function batchUpdateTools(updates: Array<{ id: string; data: any }>): Promise<void> {
  const tools = await getTools();
  updates.forEach(({ id, data }) => {
    const index = tools.findIndex((tool) => tool.id === id);
    if (index !== -1) {
      tools[index] = { ...tools[index], ...data };
    }
  });
  await saveTools(tools);
}

export async function batchDeleteTools(ids: string[]): Promise<void> {
  const tools = await getTools();
  const filtered = tools.filter((tool) => !ids.includes(tool.id));
  await saveTools(filtered);
}
