import { NextRequest, NextResponse } from 'next/server';
import { getTools, createTool, updateTool, deleteTool, getToolById } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';

// 获取所有工具
export async function GET(request: NextRequest) {
  try {
    const tools = await getTools();
    return NextResponse.json({ success: true, data: tools });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

// 创建新工具
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证密码
    const password = request.headers.get('x-admin-password');
    if (!password || !(await verifyPassword(password))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const newTool = await createTool(body);
    return NextResponse.json({ success: true, data: newTool });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create tool' },
      { status: 500 }
    );
  }
}

// 更新工具
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    // 验证密码
    const password = request.headers.get('x-admin-password');
    if (!password || !(await verifyPassword(password))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updated = await updateTool(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Tool not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update tool' },
      { status: 500 }
    );
  }
}

// 删除工具
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Tool ID is required' },
        { status: 400 }
      );
    }

    // 验证密码
    const password = request.headers.get('x-admin-password');
    if (!password || !(await verifyPassword(password))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await deleteTool(id);
    return NextResponse.json({ success: true, message: 'Tool deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete tool' },
      { status: 500 }
    );
  }
}
