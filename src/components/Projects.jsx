import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { architectProfile } from '../data/portfolioData';
import { resolveAsset } from '../utils/resolveAsset';

export default function Projects({ onSelectProject }) {
  const { projects } = architectProfile;

  return (
    <section
      id="projects"
      aria-label="Selected Architectural Works"
      className="py-24 sm:py-32 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E3DC]">
          <div>
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#A39D94] block mb-2 font-medium">
              Section 03 &bull; Works
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141312] tracking-tight">
              Selected Architectural Projects
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-sans text-[#78736B] leading-relaxed">
            Exploring residential, commercial, and public building designs through creative ideas, simple planning, material choices, and thoughtful spaces for people.
          </p>
        </div>

        {/* Projects Editorial Layout */}
        <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-24">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <article
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Project Image Showcase */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div
                    onClick={() => onSelectProject && onSelectProject(project)}
                    className="group relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC] cursor-pointer"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={resolveAsset(project.image)}
                        alt={`${project.title} — ${project.category}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle hover overlay hint */}
                      <div className="absolute inset-0 bg-[#141312]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-[#FAF8F5]/95 backdrop-blur-sm text-xs font-sans uppercase tracking-[0.18em] text-[#141312] font-medium shadow-md">
                          View Project Details &rarr;
                        </span>
                      </div>
                    </div>

                    {/* Architectural Caption Bar */}
                    <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E8E3DC] flex items-center justify-between text-xs font-sans">
                      <span className="text-[#141312] font-medium tracking-wide">
                        {project.title}
                      </span>
                      <span className="text-[#78736B] text-[11px] uppercase tracking-wider">
                        {project.year} &bull; {project.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Narrative & Details */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3 text-xs font-sans tracking-[0.16em] uppercase text-[#A39D94] mb-3">
                    <span>0{index + 1}</span>
                    <span>&bull;</span>
                    <span>{project.category}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProject && onSelectProject(project)}
                    className="font-serif text-3xl sm:text-4xl font-normal text-[#141312] tracking-tight mb-4 hover:text-[#43473E] cursor-pointer transition-colors"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm font-sans text-[#78736B] leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>

                  <div className="py-4 border-t border-b border-[#E8E3DC] grid grid-cols-2 gap-4 text-xs font-sans mb-8">
                    <div>
                      <span className="text-[#A39D94] uppercase tracking-wider block text-[10px]">Location</span>
                      <span className="text-[#141312] font-medium mt-0.5 block">{project.location}</span>
                    </div>
                    <div>
                      <span className="text-[#A39D94] uppercase tracking-wider block text-[10px]">Year / Status</span>
                      <span className="text-[#141312] font-medium mt-0.5 block">{project.year} &bull; {project.status ? project.status.split('/')[0].trim() : 'Design Study'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#FAF8F5] bg-[#141312] hover:bg-[#3E3B37] px-5 py-3 font-medium transition-all duration-300 rounded-[2px] group"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
