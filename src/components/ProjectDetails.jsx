import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import ImageLightbox from './ImageLightbox';

export default function ProjectDetails({ project, allProjects = [], onBack, onSelectProject }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Scroll to top whenever project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project?.id]);

  if (!project) return null;

  // Find index of current project for previous / next project navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const gallery = project.gallery || [];
  const photo1 = gallery[0];
  const photo2 = gallery[1];
  const photo3 = gallery[2];
  const photo4 = gallery[3];
  const photo5 = gallery[4];

  const openLightbox = (index) => {
    setActivePhotoIdx(index);
    setLightboxOpen(true);
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-[#141312] pt-28 sm:pt-36 pb-24 relative overflow-hidden">

      {/* Lightbox Component */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={gallery}
        currentIndex={activePhotoIdx}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIdx(newIdx)}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* 1. TOP SUBTLE BREADCRUMB & BACK NAVIGATION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E8E3DC] text-xs font-sans tracking-[0.16em] uppercase text-[#78736B]">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-[#141312] hover:text-[#43473E] font-medium transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all projects</span>
          </button>

          <div className="flex items-center gap-6 text-[11px] text-[#A39D94]">
            <span>
              Project {String(currentIndex + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
            </span>
            <span className="text-[#E8E3DC]">&bull;</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="hover:text-[#141312] transition-colors uppercase font-medium focus:outline-none"
                title={`Previous: ${prevProject?.title}`}
              >
                &larr; Prev
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="hover:text-[#141312] transition-colors uppercase font-medium focus:outline-none"
                title={`Next: ${nextProject?.title}`}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* 2. PROJECT HEADER */}
        <header className="mt-12 sm:mt-16 pb-12 border-b border-[#E8E3DC]">
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans tracking-[0.2em] uppercase text-[#78736B] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141312]" />
            <span className="text-[#141312] font-semibold">{project.category}</span>
            <span className="text-[#E8E3DC]">&bull;</span>
            <span>{project.location}</span>
            <span className="text-[#E8E3DC]">&bull;</span>
            <span className="text-[#A39D94]">{project.year}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#141312] tracking-tight leading-[1.05]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="font-serif text-xl sm:text-2xl text-[#78736B] font-normal tracking-tight mt-3">
              {project.subtitle}
            </p>
          )}

          {project.tagline && (
            <p className="mt-8 font-serif text-lg sm:text-2xl italic font-light text-[#3E3B37] max-w-4xl leading-relaxed">
              &ldquo;{project.tagline}&rdquo;
            </p>
          )}
        </header>

        {/* 3. MINIMAL PROJECT METADATA GRID (Editorial Colophon Layout) */}
        <section aria-label="Project Metadata" className="py-10 border-b border-[#E8E3DC]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-xs font-sans">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A39D94] block mb-1 font-medium">
                Category
              </span>
              <span className="text-[#141312] font-medium leading-snug block">
                {project.category}
              </span>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A39D94] block mb-1 font-medium">
                Location
              </span>
              <span className="text-[#141312] font-medium leading-snug block">
                {project.location}
              </span>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A39D94] block mb-1 font-medium">
                Year / Status
              </span>
              <span className="text-[#141312] font-medium leading-snug block">
                {project.year} &bull; {project.status || 'Academic Study'}
              </span>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A39D94] block mb-1 font-medium">
                Scale / Built Area
              </span>
              <span className="text-[#141312] font-medium leading-snug block">
                {project.builtUpArea || 'Variable Scale'}
              </span>
            </div>

            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A39D94] block mb-1 font-medium">
                Digital & Analog Tools
              </span>
              <span className="text-[#78736B] leading-snug block">
                {project.tools ? project.tools.slice(0, 4).join(', ') : 'AutoCAD, Revit, Lumion, Photoshop'}
              </span>
            </div>
          </div>
        </section>

        {/* 4. ARCHITECTURAL GALLERY (MULTI-IMAGE CARDS FOR 1ST PROJECT, 5-PHOTO EDITORIAL FOR OTHERS) */}
        {project.id === 'eternal-oasis' ? (
          <section aria-label="Project Visual Gallery" className="py-16 sm:py-24">
            <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E3DC] pb-5">
              <div>
                <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#A39D94] font-medium block">
                  Visual Monograph & Drawings
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#141312] font-normal mt-1 tracking-tight">
                  Architectural Plates & Renderings
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#78736B]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#141312]" />
                <span>{gallery.length} Plates in Sequence &bull; Click to Expand</span>
              </div>
            </div>

            {/* Responsive Multi-Image Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gallery.map((photo, index) => (
                <figure
                  key={photo.id || index}
                  onClick={() => openLightbox(index)}
                  className="group cursor-pointer bg-[#FAF8F5] border border-[#E8E3DC] hover:border-[#141312] transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFEB]">
                    <img
                      src={photo.url}
                      alt={photo.label || `${project.title} — Plate ${index + 1}`}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Hover expand indicator overlay */}
                    <div className="absolute inset-0 bg-[#141312]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 bg-[#FAF8F5]/95 backdrop-blur-sm text-[11px] font-sans uppercase tracking-[0.16em] text-[#141312] font-medium shadow-md flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Plate</span>
                      </span>
                    </div>

                    {/* Sequential Plate Badge */}
                    <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2 py-0.5 border border-[#E8E3DC] text-[10px] font-mono font-medium text-[#141312]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Card Label Bar */}
                  <figcaption className="p-3.5 bg-[#FAF8F5] border-t border-[#E8E3DC] flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141312] shrink-0" />
                      <span className="font-medium text-[#141312] uppercase tracking-[0.12em] truncate text-[11px] sm:text-xs">
                        {photo.label || `Plate ${String(index + 1).padStart(2, '0')}`}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : (
          <section aria-label="Five-Photo Project Gallery" className="py-16 sm:py-24">
            <div className="mb-10 flex items-center justify-between border-b border-[#E8E3DC] pb-4">
              <div>
                <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#A39D94] font-medium block">
                  Visual Monograph
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#141312] font-normal mt-1">
                  Five Photographic Study
                </h2>
              </div>
            </div>

            <div className="space-y-12 sm:space-y-20">

              {/* PHOTO 1: LARGE FEATURED IMAGE / HERO VIEW */}
              {photo1 && (
                <figure className="group cursor-pointer" onClick={() => openLightbox(0)}>
                  <div className="relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                    <div className="aspect-[16/10] sm:aspect-[21/10] overflow-hidden relative">
                      <img
                        src={photo1.url}
                        alt={photo1.label || project.title}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      />
                      {/* Hover expand indicator button */}
                      <div className="absolute top-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-sm p-2.5 rounded-full text-[#141312] border border-[#E8E3DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Editorial Caption Bar */}
                  <figcaption className="mt-3 px-2 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141312]" />
                      <span className="font-medium text-[#141312] uppercase tracking-[0.14em]">
                        {photo1.label || '01 / FEATURED ARCHITECTURAL VIEW'}
                      </span>
                    </div>
                  </figcaption>
                </figure>
              )}

              {/* PHOTO 2 & 3: SIDE-BY-SIDE ARCHITECTURAL COMPOSITION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">

                {/* PHOTO 2: EXTERIOR FACADE / TECTONICS */}
                {photo2 && (
                  <figure className="group cursor-pointer" onClick={() => openLightbox(1)}>
                    <div className="relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                      <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden relative">
                        <img
                          src={photo2.url}
                          alt={photo2.label || 'Exterior view'}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm p-2 rounded-full text-[#141312] border border-[#E8E3DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                    <figcaption className="mt-3 px-1 text-xs font-sans">
                      <span className="font-medium text-[#141312] uppercase tracking-[0.14em] block">
                        {photo2.label || '02 / EXTERIOR FACADE'}
                      </span>
                    </figcaption>
                  </figure>
                )}

                {/* PHOTO 3: INTERIOR SPATIAL VOLUMES */}
                {photo3 && (
                  <figure className="group cursor-pointer" onClick={() => openLightbox(2)}>
                    <div className="relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                      <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden relative">
                        <img
                          src={photo3.url}
                          alt={photo3.label || 'Interior view'}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm p-2 rounded-full text-[#141312] border border-[#E8E3DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                    <figcaption className="mt-3 px-1 text-xs font-sans">
                      <span className="font-medium text-[#141312] uppercase tracking-[0.14em] block">
                        {photo3.label || '03 / INTERIOR SPATIAL VOLUMES'}
                      </span>
                    </figcaption>
                  </figure>
                )}

              </div>

              {/* PHOTO 4: FULL-WIDTH ARCHITECTURAL IMAGE (ELEVATION / PERSPECTIVE) */}
              {photo4 && (
                <figure className="group cursor-pointer" onClick={() => openLightbox(3)}>
                  <div className="relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                    <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden relative">
                      <img
                        src={photo4.url}
                        alt={photo4.label || 'Full elevation view'}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute top-4 right-4 bg-[#FAF8F5]/90 backdrop-blur-sm p-2.5 rounded-full text-[#141312] border border-[#E8E3DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-3 px-2 flex items-center justify-between text-xs font-sans">
                    <span className="font-medium text-[#141312] uppercase tracking-[0.14em]">
                      {photo4.label || '04 / FULL-WIDTH ELEVATION & CONTEXT'}
                    </span>
                  </figcaption>
                </figure>
              )}

              {/* PHOTO 5: DETAIL IMAGE / FINAL VISUAL */}
              {photo5 && (
                <div className="max-w-4xl mx-auto">
                  <figure className="group cursor-pointer" onClick={() => openLightbox(4)}>
                    <div className="relative overflow-hidden bg-[#F4EFEB] border border-[#E8E3DC]">
                      <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden relative">
                        <img
                          src={photo5.url}
                          alt={photo5.label || 'Detail study'}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                        />
                        <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm p-2 rounded-full text-[#141312] border border-[#E8E3DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                    <figcaption className="mt-3 px-1 text-center text-xs font-sans">
                      <span className="font-medium text-[#141312] uppercase tracking-[0.14em] block">
                        {photo5.label || '05 / MATERIAL TACTILITY & TECTONIC DETAIL'}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              )}

            </div>
          </section>
        )}

        {/* BOTTOM PROJECT NAVIGATION (PREV / NEXT PROJECT) */}
        <nav aria-label="Adjacent Projects" className="pt-16 sm:pt-20 border-t border-[#E8E3DC]">
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6">

            {/* Previous Project Card */}
            {prevProject && (
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="group flex-1 p-6 sm:p-8 bg-[#FAF8F5] border border-[#E8E3DC] hover:border-[#141312] transition-all duration-300 text-left flex items-center gap-5 focus:outline-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F4EFEB] overflow-hidden flex-shrink-0 border border-[#E8E3DC]">
                  <img
                    src={prevProject.image}
                    alt={prevProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.18em] uppercase text-[#A39D94] mb-1">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Project</span>
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#141312] font-normal group-hover:text-[#43473E] transition-colors">
                    {prevProject.title}
                  </h4>
                  <span className="text-xs font-sans text-[#78736B] mt-0.5 block">
                    {prevProject.category}
                  </span>
                </div>
              </button>
            )}

            {/* Next Project Card */}
            {nextProject && (
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="group flex-1 p-6 sm:p-8 bg-[#FAF8F5] border border-[#E8E3DC] hover:border-[#141312] transition-all duration-300 text-right flex flex-row-reverse items-center gap-5 focus:outline-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F4EFEB] overflow-hidden flex-shrink-0 border border-[#E8E3DC]">
                  <img
                    src={nextProject.image}
                    alt={nextProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-sans tracking-[0.18em] uppercase text-[#A39D94] mb-1">
                    <span>Next Project</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-[#141312] font-normal group-hover:text-[#43473E] transition-colors">
                    {nextProject.title}
                  </h4>
                  <span className="text-xs font-sans text-[#78736B] mt-0.5 block">
                    {nextProject.category}
                  </span>
                </div>
              </button>
            )}

          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.18em] uppercase text-[#78736B] hover:text-[#141312] transition-colors py-2 px-4 border border-[#E8E3DC] hover:border-[#141312] rounded-[2px]"
            >
              <span>Return to Portfolio Overview</span>
            </button>
          </div>
        </nav>

      </div>
    </article>
  );
}
