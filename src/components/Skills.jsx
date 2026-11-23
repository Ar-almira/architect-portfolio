import React from 'react';
import { architectProfile } from '../data/portfolioData';
import { Layers, Compass, Lightbulb, Box } from 'lucide-react';

export default function Skills() {
  const { skills } = architectProfile;

  const coreDisciplineIcons = [
    Layers,
    Box,
    Lightbulb,
    Compass
  ];

  return (
    <section
      id="skills"
      aria-label="Architectural Capabilities & Skills"
      className="py-24 sm:py-32 bg-[#F5F2EC] border-t border-b border-[#E8E3DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E3DC]">
          <div>
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#A39D94] block mb-2 font-medium">
              Section 02 &bull; Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141312] tracking-tight">
              Architecture & Creative Skills
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-[#78736B] leading-relaxed">
            Combining creative ideas with practical design, thoughtful planning, and a focus on spaces that are functional, meaningful, and visually appealing.
          </p>
        </div>

        {/* Core Architectural Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills[0].items.map((item, index) => {
            const Icon = coreDisciplineIcons[index % coreDisciplineIcons.length];
            return (
              <div
                key={item.name}
                className="p-7 bg-[#FAF8F5] border border-[#E8E3DC] hover:border-[#141312] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-sans tracking-[0.16em] uppercase text-[#A39D94]">
                      0{index + 1}
                    </span>
                    <Icon className="w-5 h-5 text-[#78736B] group-hover:text-[#141312] transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#141312] font-normal tracking-tight mb-3">
                    {item.name}
                  </h3>
                  <p className="text-xs font-sans text-[#78736B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E3DC]/70 flex items-center justify-between text-[11px] font-sans tracking-[0.14em] uppercase text-[#A39D94]">
                  <span>Discipline</span>
                  <span className="text-[#141312] font-medium">{item.level}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical & Computational Tools Grid */}
        <div className="mt-16 bg-[#FAF8F5] border border-[#E8E3DC] p-8 sm:p-12">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3DC] pb-6">
            <div>
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#A39D94] block mb-1">
                Proficiencies
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#141312]">
                Software Skills
              </h3>
            </div>
            <span className="text-xs font-sans tracking-[0.14em] text-[#78736B] uppercase">
              Planning &bull; Modeling &bull; Rendering
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skills[1].items.map((tool) => (
              <div key={tool.name} className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43473E]" />
                  <h4 className="text-sm font-sans font-medium text-[#141312] tracking-wide">
                    {tool.name}
                  </h4>
                </div>
                <p className="text-xs font-sans text-[#78736B] pl-3.5">
                  {tool.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
