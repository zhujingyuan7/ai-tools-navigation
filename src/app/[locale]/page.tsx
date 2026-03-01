import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Waffle Brain - 发现最好的人工智能工具',
  description: '一个现代化的AI工具导航站，发现和探索最好的人工智能工具',
};

export const dynamic = 'force-dynamic';

export default function Home() {
  return <HomeClient />;
}
