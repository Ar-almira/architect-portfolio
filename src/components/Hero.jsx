import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { architectProfile } from '../data/portfolioData';
import { resolveAsset } from '../utils/resolveAsset';

export default function Hero() {
  const {
    name,
    profession,
    graduation,
    edition,
    headline,
    description,
    quote,
    images
  } = architectProfile;

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const target = document.querySelector(sectionId);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction & Architectural Hero"
      className="relative min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-20 md:pb-28 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Background Subtle Editorial Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 editorial-grid"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Top Metadata Row: Edition, Architect Status & Graduation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E8E3DC] text-xs font-sans text-[#78736B] tracking-[0.16em] uppercase">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-[#43473E] rounded-full"></span>
            <span className="font-semibold text-[#141312]">{edition}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="text-[#141312] font-medium">{profession}</span>
            <span className="text-[#E8E3DC] hidden sm:inline">|</span>
            <span className="text-[#A39D94]">{graduation}</span>
          </div>
        </div>

        {/* Editorial Headline & Architect Presentation */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">

          {/* Main Headline */}
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-light text-[#141312] tracking-[-0.02em] leading-[1.08] sm:leading-[1.06]">
              {headline.split('.')[0]}. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#3E3B37]">
                {headline.split('.')[1] ? headline.split('.')[1].trim() : 'Shaping experiences.'}
              </span>
            </h1>
          </div>

          {/* Architect Identity & Monograph Subtitle */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2 lg:pt-4 lg:pl-6 border-l-0 lg:border-l border-[#E8E3DC]">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase font-sans text-[#A39D94] mb-1">
                Monograph & Works
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] font-normal tracking-tight">
                {name}
              </h2>
              <p className="text-xs font-sans text-[#78736B] tracking-[0.12em] uppercase mt-1">
                Architect | Designer | Creative Thinker
              </p>
            </div>

            <p className="mt-6 text-sm sm:text-[15px] font-sans text-[#78736B] leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>

        {/* Asymmetrical Visual Composition: Large Primary Image + Secondary Detail + Editorial Quote */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Primary Large Architectural Image */}
          <div className="lg:col-span-8 group relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden">
              <img
                src={resolveAsset(images.heroMain)}
                alt={images.heroMainAlt}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025] filter contrast-[1.02]"
              />
              {/* Subtle ambient light gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#141312]/30 via-transparent to-transparent pointer-events-none"
              />
            </div>

            {/* Architectural Caption Bar */}
            <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#E8E3DC] flex items-center justify-between text-[11px] font-sans tracking-[0.14em] text-[#78736B]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141312]"></span>
                <span className="uppercase text-[#141312] font-medium">FIG. 01 — Entrance Gate</span>
              </div>
              <span className="text-[#A39D94] uppercase hidden sm:inline">Cultural Heritage Park</span>
            </div>
          </div>

          {/* Right Column: Secondary Detail Image & Editorial Quote */}
          <div className="lg:col-span-4 flex flex-col space-y-8">

            {/* Secondary Architectural Detail Image */}
            <div className="group relative bg-[#F4EFEB] border border-[#E8E3DC] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={resolveAsset(images.heroSecondary)}
                  alt={images.heroSecondaryAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase font-sans text-[#141312] border border-[#E8E3DC]">
                  Detail Study
                </div>
              </div>
              <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E3DC]">
                <p className="text-[11px] font-sans tracking-[0.12em] uppercase text-[#78736B]">
                  FIG. 02 — Aerial View
                </p>
                <p className="text-xs font-sans text-[#3E3B37] mt-1 line-clamp-2">
                  A modern commercial project featuring functional spaces, a green courtyard, and beautiful outdoor areas.
                </p>
              </div>
            </div>

            {/* Subtle Editorial Quote (Not a generic card, but a refined architectural publication element) */}
            <div className="relative pl-6 py-4 border-l-2 border-[#141312] bg-[#FAF8F5]">
              <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#A39D94] block mb-2 font-medium">
                Design Philosophy
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl italic text-[#141312] font-light leading-snug">
                &ldquo;{quote.text}&rdquo;
              </blockquote>
              <div className="mt-3 flex items-center justify-between text-xs font-sans text-[#78736B]">
                <cite className="not-italic tracking-[0.12em] uppercase text-[#141312] font-medium text-[11px]">
                  &mdash; {quote.author}
                </cite>
                <span className="text-[10px] tracking-[0.1em] text-[#A39D94]">
                  {quote.note}
                </span>
              </div>
            </div>

            {/* Action Buttons: View Projects & Inquire */}
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="group flex items-center justify-between px-5 py-3.5 bg-[#141312] text-[#FAF8F5] hover:bg-[#3E3B37] transition-all duration-300 rounded-[2px]"
              >
                <span className="text-xs font-sans tracking-[0.16em] uppercase font-medium">
                  Explore Selected Works
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#skills"
                onClick={(e) => scrollToSection(e, '#skills')}
                className="group flex items-center justify-between px-5 py-3.5 border border-[#E8E3DC] hover:border-[#141312] bg-transparent text-[#141312] transition-all duration-300 rounded-[2px]"
              >
                <span className="text-xs font-sans tracking-[0.16em] uppercase font-medium text-[#78736B] group-hover:text-[#141312]">
                  Capabilities & Skills
                </span>
                <span className="text-xs font-sans text-[#A39D94] group-hover:text-[#141312]">&darr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Section Bar & Scroll Indicator */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-8 text-[11px] font-sans tracking-[0.16em] uppercase text-[#78736B]">
            <div>
              <span className="text-[#A39D94] block text-[9px]">Project Typologies</span>
              <span className="text-[#141312] font-medium">Residential &bull; Public &bull; Cultural &bull; Commercial &bull; Industrial</span>
            </div>
          </div>

          {/* Smooth Scroll Indicator */}
          <a
            href="#skills"
            onClick={(e) => scrollToSection(e, '#skills')}
            className="group inline-flex items-center gap-3 text-xs font-sans tracking-[0.2em] uppercase text-[#78736B] hover:text-[#141312] transition-colors"
          >
            <span className="text-[11px]">Scroll to explore</span>
            <div className="w-8 h-8 rounded-full border border-[#E8E3DC] group-hover:border-[#141312] flex items-center justify-center transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-[#141312] animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
