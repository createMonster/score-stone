import { useEffect, useRef, useState } from 'react';
import { Circle, Square, Brain } from 'lucide-react';

interface Dimension {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const dimensions: Dimension[] = [
  {
    icon: <Circle className="w-8 h-8" />,
    title: '滚石',
    subtitle: 'Rolling Stone',
    description: '滚动的意愿与能力。评估石头的圆润度、光滑度，以及它在斜坡上自由滚动的潜力。',
  },
  {
    icon: <Square className="w-8 h-8" />,
    title: '顽固石',
    subtitle: 'Stubborn Stone',
    description: '坚守立场的决心。评估石头的硬度、棱角，以及它抵御外界力量的顽固程度。',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: '哲学石',
    subtitle: 'Philosophical Stone',
    description: '存在主义的深度。评估石头的气质、内涵，以及它引发沉思的哲学价值。',
  },
];

export default function Dimensions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="dimensions"
      ref={sectionRef}
      className="zen-section relative overflow-hidden"
    >
      <div className="zen-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2
            className={`text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            评分维度
          </h2>
          <p
            className={`text-lg text-[#666666] transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            我们从三个独特维度审视每一块石头，发现它们隐藏的特质。
          </p>
        </div>

        {/* SVG Connection Line */}
        <svg
          className="absolute top-48 left-0 w-full h-[600px] pointer-events-none hidden lg:block"
          style={{ zIndex: 0 }}
        >
          <path
            d="M 200 0 Q 400 200 200 400 Q 0 600 200 800"
            fill="none"
            stroke="#E0E0E0"
            strokeWidth="1"
            strokeDasharray="8 8"
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              strokeDashoffset: isVisible ? 0 : 1000,
              transition: 'stroke-dashoffset 2s ease-out, opacity 1s ease-out',
            }}
          />
        </svg>

        {/* Dimension Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {dimensions.map((dim, index) => (
            <div
              key={dim.title}
              className={`zen-card group cursor-pointer transition-all duration-700 flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${300 + index * 150}ms`,
              }}
            >
              {/* Icon */}
              <div className="mb-6 text-[#1A1A1A] transition-transform duration-500 group-hover:rotate-[360deg]">
                {dim.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-1">
                {dim.title}
              </h3>
              <p className="text-sm text-[#999999] mb-4 font-light tracking-wider">
                {dim.subtitle}
              </p>

              {/* Description */}
              <p className="text-[#666666] leading-relaxed flex-grow">{dim.description}</p>

              {/* Hover indicator */}
              <div className="mt-6 flex items-center gap-2 text-sm text-[#999999] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-8 h-px bg-[#1A1A1A]" />
                <span>了解更多</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div
          className={`mt-20 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#999999] text-sm italic">
            "石头不在乎你的评分，它只是存在。"
          </p>
        </div>
      </div>
    </section>
  );
}
