import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Check, ChevronRight } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface Stone {
  id: number;
  name: string;
  description: string;
  image: string;
}

const stones: Stone[] = [
  {
    id: 1,
    name: '沉思者',
    description: '这块石头展现出非凡的静止能力，仿佛已经沉思了千年。',
    image: '/stone-today.jpg',
  },
  {
    id: 2,
    name: '鹅卵石 #47',
    description: '历经水流冲刷，表面光滑如镜，蕴含着时间的秘密。',
    image: '/stone-1.jpg',
  },
  {
    id: 3,
    name: '花岗岩思考者',
    description: '坚硬而固执，它的存在本身就是对变化的抗议。',
    image: '/stone-2.jpg',
  },
  {
    id: 4,
    name: '石英冥想者',
    description: '透明而纯净，仿佛能映照出观察者内心的波澜。',
    image: '/stone-3.jpg',
  },
  {
    id: 5,
    name: '玄武岩存在',
    description: '深色的外表下隐藏着火山喷发时的激情记忆。',
    image: '/stone-4.jpg',
  },
];

interface Scores {
  rolling: number;
  stubborn: number;
  philosophical: number;
}

export default function TodayStone() {
  const [currentStoneIndex, setCurrentStoneIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({
    rolling: 5,
    stubborn: 5,
    philosophical: 5,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentStone = stones[currentStoneIndex];

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

  const handleNextStone = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStoneIndex((prev) => (prev + 1) % stones.length);
      setScores({ rolling: 5, stubborn: 5, philosophical: 5 });
      setIsSubmitted(false);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  const getScoreLabel = (dimension: keyof Scores, score: number): string => {
    if (dimension === 'rolling') {
      if (score <= 3) return '稳如泰山';
      if (score <= 6) return '偶尔滚动';
      return '滚石不生苔';
    }
    if (dimension === 'stubborn') {
      if (score <= 3) return '随遇而安';
      if (score <= 6) return '有所坚持';
      return '顽固不化';
    }
    if (score <= 3) return '平淡无奇';
    if (score <= 6) return '略有深意';
    return '哲人石';
  };

  return (
    <section
      id="today-stone"
      ref={sectionRef}
      className="zen-section bg-white relative"
    >
      <div className="zen-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            今日石头
          </h2>
          <p
            className={`text-[#666666] transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            为眼前的石头打分，它不会感激，也不会怨恨。
          </p>
        </div>

        {/* Main Content - Split Layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left: Stone Image */}
          <div className="relative">
            <div
              className={`relative transition-all duration-300 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <img
                src={currentStone.image}
                alt={currentStone.name}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              {/* Stone info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                <h3 className="text-2xl font-serif font-bold text-white mb-1">
                  {currentStone.name}
                </h3>
                <p className="text-white/80 text-sm">{currentStone.description}</p>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
              {stones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentStoneIndex) {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentStoneIndex(index);
                        setScores({ rolling: 5, stubborn: 5, philosophical: 5 });
                        setIsSubmitted(false);
                        setIsTransitioning(false);
                      }, 300);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStoneIndex
                      ? 'bg-[#1A1A1A] w-6'
                      : 'bg-[#E0E0E0] hover:bg-[#999999]'
                  }`}
                  aria-label={`Go to stone ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Scoring Panel */}
          <div className="space-y-8">
            {/* Score Sliders */}
            <div className="space-y-6">
              {/* Rolling Stone */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-serif font-bold text-[#1A1A1A]">
                    滚石
                  </label>
                  <span className="text-sm text-[#666666]">
                    {getScoreLabel('rolling', scores.rolling)}
                  </span>
                </div>
                <Slider
                  value={[scores.rolling]}
                  onValueChange={(value) =>
                    setScores((prev) => ({ ...prev, rolling: value[0] }))
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#999999]">
                  <span>静止</span>
                  <span>滚动</span>
                </div>
              </div>

              {/* Stubborn Stone */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-serif font-bold text-[#1A1A1A]">
                    顽固石
                  </label>
                  <span className="text-sm text-[#666666]">
                    {getScoreLabel('stubborn', scores.stubborn)}
                  </span>
                </div>
                <Slider
                  value={[scores.stubborn]}
                  onValueChange={(value) =>
                    setScores((prev) => ({ ...prev, stubborn: value[0] }))
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#999999]">
                  <span>随和</span>
                  <span>顽固</span>
                </div>
              </div>

              {/* Philosophical Stone */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-serif font-bold text-[#1A1A1A]">
                    哲学石
                  </label>
                  <span className="text-sm text-[#666666]">
                    {getScoreLabel('philosophical', scores.philosophical)}
                  </span>
                </div>
                <Slider
                  value={[scores.philosophical]}
                  onValueChange={(value) =>
                    setScores((prev) => ({ ...prev, philosophical: value[0] }))
                  }
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#999999]">
                  <span>平凡</span>
                  <span>深邃</span>
                </div>
              </div>
            </div>

            {/* Total Score */}
            <div className="pt-6 border-t border-[#E0E0E0]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#666666]">综合评分</span>
                <span className="text-4xl font-serif font-bold text-[#1A1A1A]">
                  {(
                    (scores.rolling + scores.stubborn + scores.philosophical) /
                    3
                  ).toFixed(1)}
                  <span className="text-lg text-[#999999]">/10</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className={`flex-1 zen-button transition-all duration-300 ${
                    isSubmitted ? 'bg-green-600' : ''
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      已提交
                    </>
                  ) : (
                    '提交评分'
                  )}
                </button>
                <button
                  onClick={handleNextStone}
                  className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] rounded-lg font-medium transition-all duration-200 hover:bg-[#1A1A1A] hover:text-white flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  下一块
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
