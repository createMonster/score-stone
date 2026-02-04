import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryStone {
  id: number;
  name: string;
  image: string;
}

const galleryStones: GalleryStone[] = [
  { id: 1, name: '鹅卵石 #47', image: '/stone-1.jpg' },
  { id: 2, name: '花岗岩思考者', image: '/stone-2.jpg' },
  { id: 3, name: '石英冥想者', image: '/stone-3.jpg' },
  { id: 4, name: '玄武岩存在', image: '/stone-4.jpg' },
  { id: 5, name: '砂岩观察者', image: '/stone-5.jpg' },
  { id: 6, name: '沉思者', image: '/stone-today.jpg' },
  { id: 7, name: '禅意石', image: '/stone-hero.jpg' },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScrollability, { passive: true });
      checkScrollability();
    }
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScrollability);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="zen-section relative overflow-hidden"
    >
      <div className="zen-container mb-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h2
              className={`text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              石头画廊
            </h2>
            <p
              className={`text-[#666666] transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              滑动探索更多石头，每一颗都有它的故事。
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border border-[#E0E0E0] transition-all duration-200 ${
                canScrollLeft
                  ? 'hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border border-[#E0E0E0] transition-all duration-200 ${
                canScrollRight
                  ? 'hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollRef}
        className={`flex gap-6 overflow-x-auto pb-4 px-5 md:px-10 snap-x snap-mandatory scrollbar-hide transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Left spacer for desktop */}
        <div className="hidden md:block flex-shrink-0 w-[calc((100vw-1200px)/2)]" />

        {galleryStones.map((stone, index) => (
          <div
            key={stone.id}
            className="flex-shrink-0 w-72 snap-start group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-xl">
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    {stone.name}
                  </h3>
                  <button className="text-sm text-white/80 hover:text-white flex items-center gap-1 transition-colors">
                    查看详情
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Right spacer for desktop */}
        <div className="hidden md:block flex-shrink-0 w-[calc((100vw-1200px)/2)]" />
      </div>

      {/* Mobile scroll indicator */}
      <div className="md:hidden flex justify-center gap-2 mt-4">
        {galleryStones.map((_, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full bg-[#E0E0E0]"
          />
        ))}
      </div>
    </section>
  );
}
