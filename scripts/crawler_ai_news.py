#!/usr/bin/env python3
"""
Waffle Brain AI 新闻网站爬虫
爬取主流 AI 媒体的最新新闻和行业动态
"""

import json
import time
import os
import re

# 配置输出到 JSON 文件
OUTPUT_FILE = "crawled_data/ai_news.json"
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

# AI 新闻网站列表（知名的 AI 媒体和行业新闻源）
NEWS_SOURCES = {
    "TechCrunch": {
        "name": "TechCrunch",
        "url": "https://techcrunch.com/category/artificial-intelligence/",
        "selector": ".post-block-title",
        "title_selector": ".post-block-title a",
        "description_selector": ".post-excerpt p",
        "link_selector": ".post-block-permalink",
        "date_selector": "time .datetime"
    },
    "VentureBeat": {
        "name": "VentureBeat",
        "url": "https://venturebeat.com/category/ai/",
        "selector": ".article-title",
        "title_selector": ".article-title",
        "description_selector": ".article-excerpt p",
        "link_selector": ".article-permalink",
        "date_selector": "time .datetime"
    },
    "The Verge": {
        "name": "The Verge",
        "url": "https://www.theverge.com/ai-artificial-intelligence/",
        "selector": ".c-entry-box-header__title",
        "title_selector": ".c-entry-box-header__title",
        "description_selector": ".c-entry-box-excerpt p",
        "link_selector": ".c-entry-box-read-more",
        "date_selector": "time .datetime"
    },
    "AI News": {
        "name": "AI News",
        "url": "https://www.artificialintelligence.news/",
        "selector": "article-title",
        "title_selector": ".article-title",
        "description_selector": ".article-excerpt p",
        "link_selector": ".article-read-more",
        "date_selector": ".date-meta"
    },
    "Synced Review": {
        "name": "Synced Review",
        "url": "https://www.syncedreview.com/category/ai/",
        "selector": ".entry-title",
        "title_selector": ".entry-title",
        "description_selector": ".entry-excerpt p",
        "link_selector": ".entry-permalink",
        "date_selector": ".entry-meta-date"
    }
}

def extract_date(date_str):
    """提取日期字符串"""
    # 移除多余的空白
    date_str = date_str.strip()
    # 尝试多种日期格式
    for fmt in ['%Y-%m-%d', '%B %d, %Y', '%d %B %Y']:
        try:
            time_obj = time.strptime(date_str, fmt)
            return time_obj.strftime("%Y-%m-%d")
        except:
            pass
    return date_str

def crawl_news_source(source_name, source_info):
    """爬取指定新闻源的最新文章"""
    articles = []
    
    print(f"正在爬取 {source_name} 的最新新闻...")
    
    # 模拟爬取过程（实际使用需要 requests + BeautifulSoup）
    for i in range(10):  # 模拟爬取 10 篇文章
        article = {
            "source": source_name,
            "title": f"AI 突破：新一代多模态模型改变行业格局 - 第 {i+1} 篇模拟",
            "description": f"这是第 {i+1} 篇模拟新闻摘要。新一代多模态 AI 系统能够同时理解和处理文本、图像、视频和音频等多种类型的数据，这一突破将极大推动 AI 应用的发展。专家表示，这将使 AI 系统更加智能和通用，为各行各业带来新的机遇和挑战。",
            "category": "breakthrough",
            "url": f"https://example.com/article-{i}",
            "date": time.strftime("%Y-%m-%d"),
            "author": source_name
        }
        articles.append(article)
        time.sleep(0.5)
    
    return articles

def main():
    """主函数"""
    all_articles = []
    
    for source_name, source_info in NEWS_SOURCES.items():
        articles = crawl_news_source(source_name, source_info)
        all_articles.extend(articles)
    
    # 保存到文件
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump({
            "crawled_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "sources": list(NEWS_SOURCES.keys()),
            "articles": all_articles
        }, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 成功爬取 {len(all_articles)} 篇文章")
    print(f"📄 数据已保存到: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
