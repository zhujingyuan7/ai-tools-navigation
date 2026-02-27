import { promises as fs } from 'fs';
import path from 'path';

const TOOLS_FILE = path.join(process.cwd(), 'src/data/tools.json');
const STATS_FILE = path.join(process.cwd(), 'src/data/stats.json');

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
