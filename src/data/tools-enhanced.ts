import { AITool } from '@/types';

export const categories = [
  '全部',
  '文本生成',
  '图像处理',
  '视频制作',
  '代码开发',
  '音频处理',
  '数据分析',
  '办公助手',
];

export const priceTypes = {
  free: '免费',
  freemium: 'Freemium',
  paid: '付费',
};

export const aiTools: AITool[] = [
  {
    id: '1',
    name: 'GPT-4',
    description: 'OpenAI开发的最先进的语言模型，能够理解和生成自然语言',
    description_en: 'Advanced language model by OpenAI, capable of understanding and generating natural language',
    category: '文本生成',
    tags: ['AI助手', '对话', '写作'],
    icon: '🤖',
    website: 'https://openai.com',
    featured: true,
    rating: 4.9,
    priceType: 'freemium',
    views: 15420,
    favorites: 3420,
    isNew: false,
    isHot: true,
    addedAt: '2023-03-14',
    features: [
      '强大的语言理解和生成能力',
      '支持多轮对话',
      '代码生成和分析',
      '多语言支持'
    ],
    pros: [
      '响应速度快',
      '答案质量高',
      'API接口完善'
    ],
    cons: [
      '有使用限制',
      '需要订阅'
    ]
  },
  {
    id: '2',
    name: 'Midjourney',
    description: '强大的AI图像生成工具，可以根据文字描述创作精美图片',
    description_en: 'Powerful AI image generation tool that creates stunning images from text descriptions',
    category: '图像处理',
    tags: ['AI绘画', '图像生成', '创意设计'],
    icon: '🎨',
    website: 'https://midjourney.com',
    featured: true,
    rating: 4.8,
    priceType: 'paid',
    views: 12350,
    favorites: 2890,
    isNew: false,
    isHot: true,
    addedAt: '2022-07-12',
    features: [
      '高质量图像生成',
      '多种风格支持',
      '快速迭代',
      '社区互动'
    ],
    pros: [
      '图像质量极高',
      '风格多样',
      'Discord社区活跃'
    ],
    cons: [
      '需要通过Discord使用',
      '付费订阅'
    ]
  },
  {
    id: '3',
    name: 'Claude',
    description: 'Anthropic开发的AI助手，擅长分析和长文本处理',
    description_en: 'AI assistant by Anthropic, excels at analysis and long text processing',
    category: '文本生成',
    tags: ['AI助手', '分析', '写作'],
    icon: '💬',
    website: 'https://anthropic.com',
    featured: true,
    rating: 4.7,
    priceType: 'freemium',
    views: 9870,
    favorites: 2340,
    isNew: false,
    isHot: true,
    addedAt: '2023-07-11',
    features: [
      '长文本处理能力强',
      '安全性高',
      '多语言支持',
      '上下文窗口大'
    ],
    pros: [
      '安全性更好',
      '长文本支持优秀'
    ],
    cons: [
      '代码能力略弱于GPT-4'
    ]
  },
  {
    id: '4',
    name: 'Runway ML',
    description: '专业的AI视频编辑和生成平台',
    description_en: 'Professional AI video editing and generation platform',
    category: '视频制作',
    tags: ['视频AI', '编辑', '创作'],
    icon: '🎬',
    website: 'https://runwayml.com',
    featured: true,
    rating: 4.6,
    priceType: 'freemium',
    views: 7650,
    favorites: 1890,
    isNew: false,
    isHot: true,
    addedAt: '2021-06-01',
    features: [
      '视频生成',
      '图像到视频',
      '视频编辑工具',
      '实时协作'
    ],
    pros: [
      '功能全面',
      '用户体验好'
    ],
    cons: [
      '高级功能需要付费'
    ]
  },
  {
    id: '5',
    name: 'GitHub Copilot',
    description: 'AI代码助手，帮助你更快地编写代码',
    description_en: 'AI code assistant that helps you write code faster',
    category: '代码开发',
    tags: ['代码AI', '编程', '开发'],
    icon: '💻',
    website: 'https://github.com/features/copilot',
    featured: true,
    rating: 4.8,
    priceType: 'paid',
    views: 11230,
    favorites: 2980,
    isNew: false,
    isHot: true,
    addedAt: '2021-06-29',
    features: [
      '代码自动补全',
      '多语言支持',
      'IDE集成',
      '代码建议'
    ],
    pros: [
      '提高开发效率',
      '支持多种语言'
    ],
    cons: [
      '需要付费',
      '偶尔生成错误代码'
    ]
  },
  {
    id: '6',
    name: 'Stable Diffusion',
    description: '开源的AI图像生成模型，支持本地部署',
    description_en: 'Open-source AI image generation model, supports local deployment',
    category: '图像处理',
    tags: ['AI绘画', '开源', '图像生成'],
    icon: '🖼️',
    website: 'https://stability.ai',
    featured: false,
    rating: 4.7,
    priceType: 'free',
    views: 8760,
    favorites: 2100,
    isNew: false,
    isHot: false,
    addedAt: '2022-08-22',
    features: [
      '完全开源',
      '可本地部署',
      '模型丰富',
      '社区活跃'
    ],
    pros: [
      '免费使用',
      '可定制性强'
    ],
    cons: [
      '需要一定的技术基础'
    ]
  },
  {
    id: '7',
    name: 'ElevenLabs',
    description: '高质量的AI语音合成和克隆工具',
    description_en: 'High-quality AI voice synthesis and cloning tool',
    category: '音频处理',
    tags: ['语音AI', 'TTS', '声音克隆'],
    icon: '🎙️',
    website: 'https://elevenlabs.io',
    featured: true,
    rating: 4.7,
    priceType: 'freemium',
    views: 6540,
    favorites: 1650,
    isNew: false,
    isHot: true,
    addedAt: '2022-01-01',
    features: [
      '高质量TTS',
      '声音克隆',
      '多语言支持',
      '情感控制'
    ],
    pros: [
      '语音质量极高',
      '克隆效果真实'
    ],
    cons: [
      '免费额度有限'
    ]
  },
  {
    id: '8',
    name: 'Notion AI',
    description: '集成在Notion中的AI写作和内容生成工具',
    description_en: 'AI writing and content generation tool integrated in Notion',
    category: '办公助手',
    tags: ['笔记AI', '写作', '文档'],
    icon: '📝',
    website: 'https://notion.so',
    featured: false,
    rating: 4.5,
    priceType: 'paid',
    views: 5430,
    favorites: 1320,
    isNew: false,
    isHot: false,
    addedAt: '2023-02-14',
    features: [
      '文档内集成',
      '写作辅助',
      '内容生成',
      '智能总结'
    ],
    pros: [
      '与Notion无缝集成',
      '使用方便'
    ],
    cons: [
      '需要Notion订阅'
    ]
  },
  {
    id: '9',
    name: 'PandasAI',
    description: '使用自然语言分析数据的Python库',
    description_en: 'Python library for data analysis using natural language',
    category: '数据分析',
    tags: ['数据分析', 'Python', 'AI分析'],
    icon: '📊',
    website: 'https://pandas-ai.com',
    featured: false,
    rating: 4.4,
    views: 3210,
    favorites: 890,
    isNew: true,
    isHot: false,
    addedAt: '2023-05-01',
    features: [
      '自然语言查询',
      'Pandas集成',
      '数据可视化',
      '支持多种LLM'
    ],
    pros: [
      '降低数据分析门槛',
      '开源免费'
    ],
    cons: [
      '需要Python基础'
    ]
  },
  {
    id: '10',
    name: 'Suno AI',
    description: 'AI音乐生成工具，可以根据描述创作音乐',
    description_en: 'AI music generation tool that creates music from descriptions',
    category: '音频处理',
    tags: ['音乐AI', '音乐创作', '声音'],
    icon: '🎵',
    website: 'https://suno.ai',
    featured: true,
    rating: 4.6,
    priceType: 'freemium',
    views: 5670,
    favorites: 1450,
    isNew: true,
    isHot: true,
    addedAt: '2023-12-15',
    features: [
      '音乐生成',
      '歌词创作',
      '多风格支持',
      '快速生成'
    ],
    pros: [
      '生成速度快',
      '质量不错'
    ],
    cons: [
      '免费额度有限'
    ]
  },
  {
    id: '11',
    name: 'Cursor',
    description: 'AI驱动的代码编辑器，提供智能编程建议',
    description_en: 'AI-powered code editor with intelligent programming suggestions',
    category: '代码开发',
    tags: ['代码AI', '编辑器', '开发'],
    icon: '✨',
    website: 'https://cursor.sh',
    featured: true,
    rating: 4.7,
    priceType: 'freemium',
    views: 4320,
    favorites: 1180,
    isNew: true,
    isHot: true,
    addedAt: '2023-11-01',
    features: [
      'AI代码生成',
      '自然语言编辑',
      '上下文理解',
      'VS Code兼容'
    ],
    pros: [
      '体验流畅',
      'AI集成深度'
    ],
    cons: [
      '仍在开发中'
    ]
  },
  {
    id: '12',
    name: 'Jasper',
    description: '专注于营销文案的AI写作工具',
    description_en: 'AI writing tool focused on marketing copy',
    category: '文本生成',
    tags: ['AI写作', '营销', '文案'],
    icon: '✍️',
    website: 'https://jasper.ai',
    featured: false,
    rating: 4.3,
    views: 3450,
    favorites: 870,
    isNew: false,
    isHot: false,
    addedAt: '2021-01-15',
    features: [
      '营销文案',
      '多语言支持',
      '模板丰富',
      '品牌语调'
    ],
    pros: [
      '营销效果好',
      '模板齐全'
    ],
    cons: [
      '价格较高'
    ]
  },
  {
    id: '13',
    name: 'DALL-E 3',
    description: 'OpenAI开发的图像生成模型，创作逼真的图片',
    description_en: 'Image generation model by OpenAI that creates realistic images',
    category: '图像处理',
    tags: ['AI绘画', '图像生成', 'OpenAI'],
    icon: '🖌️',
    website: 'https://openai.com/dall-e-3',
    featured: true,
    rating: 4.8,
    priceType: 'paid',
    views: 9870,
    favorites: 2450,
    isNew: false,
    isHot: true,
    addedAt: '2023-10-01',
    features: [
      '高精度生成',
      '文本理解强',
      '多风格',
      '易于使用'
    ],
    pros: [
      '质量稳定',
      '集成GPT-4'
    ],
    cons: [
      '需要付费',
      '有使用限制'
    ]
  },
  {
    id: '14',
    name: 'Hugging Face',
    description: 'AI模型社区，提供大量开源AI模型和工具',
    description_en: 'AI model community with massive open-source AI models and tools',
    category: '代码开发',
    tags: ['开源AI', '模型平台', '社区'],
    icon: '🤗',
    website: 'https://huggingface.co',
    featured: false,
    rating: 4.9,
    priceType: 'free',
    views: 7650,
    favorites: 1980,
    isNew: false,
    isHot: false,
    addedAt: '2020-04-01',
    features: [
      '模型库',
      '数据集',
      'Spaces',
      'API服务'
    ],
    pros: [
      '完全免费',
      '资源丰富'
    ],
    cons: [
      '需要一定技术基础'
    ]
  },
  {
    id: '15',
    name: 'Pika Labs',
    description: 'AI视频生成工具，将文本转换为短视频',
    description_en: 'AI video generation tool that converts text to short videos',
    category: '视频制作',
    tags: ['视频AI', 'AI视频', '生成'],
    icon: '🎥',
    website: 'https://pika.art',
    featured: true,
    rating: 4.5,
    priceType: 'freemium',
    views: 4320,
    favorites: 1080,
    isNew: true,
    isHot: true,
    addedAt: '2023-11-20',
    features: [
      '文本到视频',
      '图像到视频',
      '风格迁移',
      '快速生成'
    ],
    pros: [
      '生成速度快',
      '效果不错'
    ],
    cons: [
      '视频时长有限',
      '免费额度少'
    ]
  },
  {
    id: '16',
    name: 'Whisper',
    description: 'OpenAI开源的语音识别模型，支持多语言',
    description_en: 'OpenAI open-source speech recognition model, supports multiple languages',
    category: '音频处理',
    tags: ['语音识别', 'ASR', 'OpenAI'],
    icon: '👂',
    website: 'https://openai.com/research/whisper',
    featured: false,
    rating: 4.6,
    priceType: 'free',
    views: 5430,
    favorites: 1420,
    isNew: false,
    isHot: false,
    addedAt: '2022-09-21',
    features: [
      '多语言支持',
      '高准确率',
      '可本地部署',
      '开源免费'
    ],
    pros: [
      '免费开源',
      '识别准确'
    ],
    cons: [
      '需要GPU加速'
    ]
  },
  {
    id: '17',
    name: 'Tableau AI',
    description: '将自然语言转化为数据可视化图表',
    description_en: 'Converts natural language to data visualization charts',
    category: '数据分析',
    tags: ['数据可视化', 'BI', '分析'],
    icon: '📈',
    website: 'https://tableau.com',
    featured: false,
    rating: 4.5,
    views: 2890,
    favorites: 760,
    isNew: false,
    isHot: false,
    addedAt: '2023-05-23',
    features: [
      '自然语言查询',
      '智能分析',
      '交互式仪表板',
      '企业级'
    ],
    pros: [
      '功能强大',
      '企业支持好'
    ],
    cons: [
      '价格昂贵',
      '学习曲线陡'
    ]
  },
  {
    id: '18',
    name: 'Otter.ai',
    description: 'AI会议记录和语音转文字工具',
    description_en: 'AI meeting transcription and speech-to-text tool',
    category: '办公助手',
    tags: ['会议记录', '语音转文字', '转录'],
    icon: '📋',
    website: 'https://otter.ai',
    featured: true,
    rating: 4.4,
    views: 3780,
    favorites: 950,
    isNew: false,
    isHot: false,
    addedAt: '2016-04-01',
    features: [
      '实时转录',
      '会议记录',
      '语音搜索',
      '多说话人识别'
    ],
    pros: [
      '识别准确',
      '使用方便'
    ],
    cons: [
      '免费版功能有限'
    ]
  },
  {
    id: '19',
    name: 'Perplexity AI',
    description: 'AI搜索引擎，提供实时准确的答案',
    description_en: 'AI search engine that provides real-time accurate answers',
    category: '文本生成',
    tags: ['AI搜索', '问答', '信息检索'],
    icon: '🔍',
    website: 'https://perplexity.ai',
    featured: true,
    rating: 4.7,
    priceType: 'freemium',
    views: 6780,
    favorites: 1720,
    isNew: true,
    isHot: true,
    addedAt: '2022-08-01',
    features: [
      '实时搜索',
      '引用来源',
      '多模态',
      '深度搜索'
    ],
    pros: [
      '信息准确',
      '来源清晰'
    ],
    cons: [
      '搜索速度有时慢'
    ]
  },
  {
    id: '20',
    name: 'Replit AI',
    description: '云端代码编辑器，内置AI编程助手',
    description_en: 'Cloud code editor with built-in AI programming assistant',
    category: '代码开发',
    tags: ['在线编程', '代码AI', '协作'],
    icon: '⚡',
    website: 'https://replit.com',
    featured: false,
    rating: 4.5,
    views: 4560,
    favorites: 1230,
    isNew: false,
    isHot: false,
    addedAt: '2023-04-01',
    features: [
      '在线IDE',
      'AI辅助',
      '实时协作',
      '模板丰富'
    ],
    pros: [
      '无需安装',
      '协作方便'
    ],
    cons: [
      '性能依赖网络'
    ]
  },
  {
    id: '21',
    name: 'Synthesia',
    description: 'AI虚拟人视频生成平台，创建专业的视频内容',
    description_en: 'AI virtual avatar video generation platform for professional video content',
    category: '视频制作',
    tags: ['虚拟人', 'AI视频', '演示'],
    icon: '👤',
    website: 'https://synthesia.io',
    featured: false,
    rating: 4.4,
    views: 3210,
    favorites: 840,
    isNew: false,
    isHot: false,
    addedAt: '2017-11-01',
    features: [
      '虚拟人视频',
      '多语言',
      '自定义头像',
      '企业级'
    ],
    pros: [
      '视频质量高',
      '多语言支持'
    ],
    cons: [
      '价格高'
    ]
  },
  {
    id: '22',
    name: 'Grammarly',
    description: 'AI写作助手，提供语法检查和写作建议',
    description_en: 'AI writing assistant providing grammar checking and writing suggestions',
    category: '文本生成',
    tags: ['写作辅助', '语法检查', '校对'],
    icon: '✓',
    website: 'https://grammarly.com',
    featured: false,
    rating: 4.6,
    views: 5430,
    favorites: 1450,
    isNew: false,
    isHot: false,
    addedAt: '2009-07-01',
    features: [
      '语法检查',
      '写作建议',
      '风格调整',
      '浏览器插件'
    ],
    pros: [
      '准确可靠',
      '使用方便'
    ],
    cons: [
      '高级功能需付费'
    ]
  },
  {
    id: '23',
    name: 'Leonardo AI',
    description: '专业的AI图像生成和编辑工具',
    description_en: 'Professional AI image generation and editing tool',
    category: '图像处理',
    tags: ['AI绘画', '图像编辑', '创意'],
    icon: '🎨',
    website: 'https://leonardo.ai',
    featured: false,
    rating: 4.5,
    views: 3980,
    favorites: 1020,
    isNew: false,
    isHot: false,
    addedAt: '2022-11-15',
    features: [
      '图像生成',
      '图像编辑',
      '训练模型',
      '社区分享'
    ],
    pros: [
      '功能全面',
      '免费额度多'
    ],
    cons: [
      '生成速度中等'
    ]
  },
  {
    id: '24',
    name: 'Descript',
    description: 'AI视频和音频编辑器，像编辑文档一样编辑媒体',
    description_en: 'AI video and audio editor that lets you edit media like a document',
    category: '视频制作',
    tags: ['视频编辑', '音频编辑', 'AI编辑'],
    icon: '✂️',
    website: 'https://descript.com',
    featured: true,
    rating: 4.6,
    views: 2890,
    favorites: 780,
    isNew: false,
    isHot: false,
    addedAt: '2017-09-01',
    features: [
      '文本编辑',
      '填充词删除',
      'AI配音',
      '协作功能'
    ],
    pros: [
      '创新编辑方式',
      'AI功能强'
    ],
    cons: [
      '需要适应'
    ]
  },
  {
    id: '25',
    name: 'DataRobot',
    description: '企业级AI机器学习平台',
    description_en: 'Enterprise AI machine learning platform',
    category: '数据分析',
    tags: ['机器学习', '企业AI', '数据科学'],
    icon: '🤖',
    website: 'https://datarobot.com',
    featured: false,
    rating: 4.4,
    views: 1890,
    favorites: 520,
    isNew: false,
    isHot: false,
    addedAt: '2012-06-01',
    features: [
      'AutoML',
      '模型部署',
      '监控',
      '企业安全'
    ],
    pros: [
      '功能完整',
      '企业级支持'
    ],
    cons: [
      '价格昂贵'
    ]
  },
  {
    id: '26',
    name: 'Zoom AI',
    description: '集成AI功能的视频会议平台',
    description_en: 'Video conferencing platform with integrated AI features',
    category: '办公助手',
    tags: ['视频会议', 'AI会议', '协作'],
    icon: '📹',
    website: 'https://zoom.us',
    featured: false,
    rating: 4.3,
    views: 4560,
    favorites: 1180,
    isNew: false,
    isHot: false,
    addedAt: '2011-01-01',
    features: [
      '会议转录',
      '智能摘要',
      '实时翻译',
      '背景虚化'
    ],
    pros: [
      '使用广泛',
      '稳定可靠'
    ],
    cons: [
      '免费版限制多'
    ]
  },
  {
    id: '27',
    name: 'Playground AI',
    description: '免费的AI图像生成工具，支持多种风格',
    description_en: 'Free AI image generation tool supporting multiple styles',
    category: '图像处理',
    tags: ['AI绘画', '免费', '创意设计'],
    icon: '🎭',
    website: 'https://playground.com',
    featured: false,
    rating: 4.5,
    views: 3450,
    favorites: 890,
    isNew: false,
    isHot: false,
    addedAt: '2022-07-01',
    features: [
      '免费生成',
      '多模型',
      '社区分享',
      '图像编辑'
    ],
    pros: [
      '完全免费',
      '用户友好'
    ],
    cons: [
      '每日生成有限'
    ]
  },
  {
    id: '28',
    name: 'Character.AI',
    description: '创建和与AI角色对话的平台',
    description_en: 'Platform to create and chat with AI characters',
    category: '文本生成',
    tags: ['AI角色', '聊天机器人', '娱乐'],
    icon: '💬',
    website: 'https://character.ai',
    featured: true,
    rating: 4.6,
    views: 5670,
    favorites: 1430,
    isNew: false,
    isHot: true,
    addedAt: '2021-09-16',
    features: [
      '角色创建',
      '对话系统',
      '社区角色',
      '多角色对话'
    ],
    pros: [
      '互动有趣',
      '角色多样'
    ],
    cons: [
      '有时响应慢'
    ]
  },
  {
    id: '29',
    name: 'Vizard',
    description: 'AI视频剪辑工具，快速制作短视频',
    description_en: 'AI video editing tool for quick short video creation',
    category: '视频制作',
    tags: ['视频剪辑', '短视频', 'AI编辑'],
    icon: '📱',
    website: 'https://vizard.ai',
    featured: false,
    rating: 4.3,
    views: 2340,
    favorites: 620,
    isNew: true,
    isHot: false,
    addedAt: '2023-10-15',
    features: [
      '自动剪辑',
      '字幕生成',
      '社交媒体优化',
      '批量处理'
    ],
    pros: [
      '操作简单',
      '适合短视频'
    ],
    cons: [
      '功能有限'
    ]
  },
  {
    id: '30',
    name: 'Freedcamp AI',
    description: '集成了AI功能的项目管理工具',
    description_en: 'Project management tool with integrated AI features',
    category: '办公助手',
    tags: ['项目管理', 'AI辅助', '协作'],
    icon: '📊',
    website: 'https://freedcamp.com',
    featured: false,
    rating: 4.2,
    views: 1890,
    favorites: 510,
    isNew: true,
    isHot: false,
    addedAt: '2023-09-01',
    features: [
      'AI任务生成',
      '智能分析',
      '团队协作',
      '多功能集成'
    ],
    pros: [
      '免费版功能多',
      '易于使用'
    ],
    cons: [
      'AI功能有限'
    ]
  },
];

// 导出默认数据以兼容现有代码
export { aiTools as default };
