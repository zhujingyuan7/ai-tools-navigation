import { NextRequest, NextResponse } from 'next/server';
import { getStats, incrementToolView, recordSearch } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

// 获取统计数据
export async function GET(request: NextRequest) {
  try {
    const stats = await getStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

// 记录工具访问
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, toolId, query } = body;

    if (type === 'view' && toolId) {
      await incrementToolView(toolId);
      return NextResponse.json({ success: true });
    } else if (type === 'search' && query) {
      await recordSearch(query);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record event' },
      { status: 500 }
    );
  }
}
