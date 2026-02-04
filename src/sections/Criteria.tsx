import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Criterion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

const criteria: Criterion[] = [
  {
    id: 'rolling',
    title: '滚石',
    subtitle: 'Rolling Stone',
    description: '评估石头的圆润度、光滑度，以及它在斜坡上自由滚动的潜力。',
    details: [
      '1-3分：形状不规则，表面粗糙，几乎无法滚动',
      '4-6分：较为圆润，可以在平滑表面缓慢滚动',
      '7-8分：非常光滑，滚动流畅，有一定惯性',
      '9-10分：完美的滚石，如卵石般圆润，滚动不息',
    ],
  },
  {
    id: 'stubborn',
    title: '顽固石',
    subtitle: 'Stubborn Stone',
    description: '评估石头的硬度、棱角，以及它抵御外界力量的顽固程度。',
    details: [
      '1-3分：质地松软，容易被改变形状或位置',
      '4-6分：有一定硬度，但长期受力会产生变化',
      '7-8分：非常坚硬，难以被外力改变',
      '9-10分：极致顽固，千百年不变，坚不可摧',
    ],
  },
  {
    id: 'philosophical',
    title: '哲学石',
    subtitle: 'Philosophical Stone',
    description: '评估石头的气质、内涵，以及它引发沉思的哲学价值。',
    details: [
      '1-3分：普通石头，没有任何特别之处',
      '4-6分：略有特点，能让人驻足片刻',
      '7-8分：气质独特，引人深思，富有禅意',
      '9-10分：哲学之石，仿佛蕴含着宇宙的奥秘',
    ],
  },
];

export default function Criteria() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="criteria"
      ref={sectionRef}
      className="zen-section bg-[#FAFAFA] relative"
    >
      <div className="zen-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            评分标准
          </h2>
          <p
            className={`text-[#666666] transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            了解我们如何评判每一块石头的独特品质。
          </p>
        </div>

        {/* Criteria Accordion */}
        <div
          className={`max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {criteria.map((criterion, index) => (
            <div
              key={criterion.id}
              className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden transition-all duration-300 hover:border-[#1A1A1A]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(criterion.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#1A1A1A]">
                    {criterion.title}
                  </h3>
                  <p className="text-sm text-[#999999] mt-1">
                    {criterion.subtitle}
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#999999] transition-transform duration-300 ${
                    expandedId === criterion.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedId === criterion.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-[#E0E0E0]">
                  <p className="text-[#666666] mb-4">
                    {criterion.description}
                  </p>
                  <ul className="space-y-2">
                    {criterion.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[#666666] flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#1A1A1A] mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#999999] text-sm">
            评分纯属主观，石头对此一无所知。
          </p>
        </div>
      </div>
    </section>
  );
}
