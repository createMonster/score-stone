import { useState } from 'react';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { name: '首页', href: '#hero' },
    { name: '评分维度', href: '#dimensions' },
    { name: '今日石头', href: '#today-stone' },
    { name: '画廊', href: '#gallery' },
    { name: '评分标准', href: '#criteria' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAFAFA] py-16">
      <div className="zen-container">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-2">给石头打分</h2>
            <p className="text-[#999999] text-sm">Stone Scoring System</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-[#FAFAFA]/80 hover:text-[#FAFAFA] transition-colors duration-200 text-sm"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#FAFAFA] transition-all duration-300 ${
                    hoveredLink === link.name ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#333333] mb-8" />

        {/* Bottom Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-[#666666] text-sm">
            © 2024 给石头打分. 保留所有权利。
          </p>

          {/* Tagline */}
          <p className="text-[#666666] text-sm italic">
            "石头不在乎你的评分。"
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex justify-center">
          <div className="w-16 h-16 rounded-full border border-[#333333] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#333333]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
