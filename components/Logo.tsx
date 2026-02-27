import React from 'react';

/**
 * Waffle Brain Logo 组件
 *
 * 支持四种变体：
 * - simple: 简洁版（只华夫+brain）
 * - full: 完整版（带香气线条）
 * - dark: 深色版本
 * - light: 轻量版本（线条简化）
 */
export type LogoVariant = 'simple' | 'full' | 'dark' | 'light';

interface LogoProps {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'simple',
  width = 200,
  height = 200,
  className = '',
  alt = 'Waffle Brain Logo'
}) => {
  const logoPaths = {
    simple: '/logos/logo-simple.svg',
    full: '/logos/logo-full.svg',
    dark: '/logos/logo-dark.svg',
    light: '/logos/logo-light.svg'
  };

  return (
    <img
      src={logoPaths[variant]}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Logo;

/**
 * Logo 变体选择器组件
 */
export const LogoVariantSelector: React.FC<{
  selectedVariant: LogoVariant;
  onSelectVariant: (variant: LogoVariant) => void;
}> = ({ selectedVariant, onSelectVariant }) => {
  const variants: { key: LogoVariant; label: string; description: string }[] = [
    { key: 'simple', label: '简洁版', description: '华夫格子 + 大脑，最干净' },
    { key: 'full', label: '完整版', description: '带香气动画和微光效果' },
    { key: 'dark', label: '深色版', description: '深色背景，适合暗色主题' },
    { key: 'light', label: '轻量版', description: '线条简化，适合小尺寸' }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <button
          key={variant.key}
          onClick={() => onSelectVariant(variant.key)}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            selectedVariant === variant.key
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="font-semibold">{variant.label}</div>
          <div className="text-xs text-gray-500 mt-1">{variant.description}</div>
        </button>
      ))}
    </div>
  );
};

/**
 * Logo 演示页面组件
 */
export const LogoShowcase: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = React.useState<LogoVariant>('simple');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Waffle Brain Logo 演示</h1>

        {/* Logo 显示区域 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex justify-center items-center min-h-[300px]">
          <Logo
            variant={selectedVariant}
            width={200}
            height={200}
            className="transition-all hover:scale-110"
          />
        </div>

        {/* 变体选择器 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">选择变体</h2>
          <LogoVariantSelector
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
        </div>

        {/* 所有变体预览 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">所有变体预览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Logo variant="simple" width={100} height={100} />
              <div className="mt-2 text-sm font-medium">简洁版</div>
            </div>
            <div className="text-center">
              <Logo variant="full" width={100} height={100} />
              <div className="mt-2 text-sm font-medium">完整版</div>
            </div>
            <div className="text-center">
              <Logo variant="dark" width={100} height={100} />
              <div className="mt-2 text-sm font-medium">深色版</div>
            </div>
            <div className="text-center">
              <Logo variant="light" width={100} height={100} />
              <div className="mt-2 text-sm font-medium">轻量版</div>
            </div>
          </div>
        </div>

        {/* 设计理念 */}
        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">💡 设计理念</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>华夫格子：</strong>3×3 网格象征神经网络节点，体现 AI 的结构化思维。</p>
            <p><strong>大脑图标：</strong>位于中心，代表智能与创意，是品牌的核心价值。</p>
            <p><strong>配色方案：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><span className="text-blue-500 font-semibold">科技蓝 #3B82F6</span> - 专业、可信赖，呼应 Next.js 风格</li>
              <li><span className="text-orange-500 font-semibold">华夫黄 #F5A623</span> - 温暖、活力，带来亲切感</li>
            </ul>
            <p><strong>风格特点：</strong>扁平化、圆角设计、现代科技感，同时略带可爱幽默。</p>
            <p><strong>香气线条：</strong>象征智慧的"香气"正在散发，为 Logo 增添灵动和幽默感。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
