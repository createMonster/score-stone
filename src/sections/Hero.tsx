import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ink flow background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Simplex-like noise function
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.01 + t * 0.5) *
        Math.cos(y * 0.01 + t * 0.3) *
        Math.sin((x + y) * 0.005 + t * 0.2)
      );
    };

    const draw = () => {
      time += 0.005;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(250, 250, 250, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing ink lines
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(224, 224, 224, ${0.1 + i * 0.02})`;
        ctx.lineWidth = 0.5;

        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height * 0.5 +
            noise(x, i * 100, time) * 100 +
            Math.sin(x * 0.002 + time + i) * 50;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToDimensions = () => {
    const element = document.querySelector('#dimensions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ink flow background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 zen-container text-center">
        {/* Title with character stagger */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1A1A1A] mb-6 tracking-tight">
          {'给石头打分'.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-[#666666] max-w-md mx-auto mb-12 fade-in-up stagger-3"
          style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
        >
          以专业的眼光，审视每一颗石头的独特之处
        </p>

        {/* Hero Image */}
        <div className="relative max-w-lg mx-auto mb-12">
          <div
            className={`relative transition-all duration-1000 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <img
              src="/stone-hero.jpg"
              alt="禅意石头"
              className="w-full h-auto rounded-2xl shadow-2xl float-animation"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#FAFAFA]/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToDimensions}
          className="zen-button fade-in-up stagger-4 group"
        >
          开始评分
          <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0E0E0] to-transparent" />
    </section>
  );
}
