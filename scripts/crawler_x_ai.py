#!/usr/bin/env python3
"""
Waffle Brain X (Twitter) 爬虫
爬取 AI 行业知名账号的推文和咨询
"""

import json
import time
import os

# 配置输出到 JSON 文件
OUTPUT_FILE = "crawled_data/x_ai_tweets.json"
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

# 要爬取的账号列表（知名 AI 行业账号）
ACCOUNTS_TO_CRAWL = [
    "OpenAI",
    "AnthropicAI", 
    "GoogleDeepMind",
    "PerplexityAI",
    "RunwayML",
    "StabilityAI",
    "Midjourney",
    "NVIDIA",
    "AIatMeta",
    "xAI",
    "GeminiAI",
    "HuggingFace",
    "ElevenLabs"
]

def extract_tweet_text(tweet):
    """提取推文的核心内容"""
    return tweet.get('text', '')

def crawl_x_ai_tweets(account, limit=20):
    """
    爬取指定账号的最新推文
    注意：这是模拟示例，实际使用需要 Twitter API
    """
    tweets = []
    
    for i in range(limit):
        tweet = {
            "account": account,
            "text": f"这是第 {i+1} 条模拟推文：{account} 分享了最新的 AI 功能更新。",
            "date": time.strftime("%Y-%m-%d"),
            "likes": f"{1000 + i * 50}",
            "retweets": f"{200 + i * 30}",
            "replies": f"{50 + i * 10}",
            "url": f"https://twitter.com/{account}/status/{12345678 + i}"
        }
        tweets.append(tweet)
        time.sleep(1)
    
    return tweets

def main():
    """主函数"""
    all_tweets = []
    
    for account in ACCOUNTS_TO_CRAWL:
        print(f"正在爬取 {account} 的推文...")
        tweets = crawl_x_ai_tweets(account)
        all_tweets.extend(tweets)
    
    # 保存到文件
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump({
            "crawled_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
            "source": "X/Twitter (Mock)",
            "tweets": all_tweets
        }, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 成功爬取 {len(all_tweets)} 条推文")
    print(f"📄 数据已保存到: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
