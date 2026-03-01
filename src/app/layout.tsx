import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI工具导航站 - 发现最好的AI工具",
  description: "探索和发现最好的人工智能工具，包括文本生成、图像处理、视频制作等多个领域",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
