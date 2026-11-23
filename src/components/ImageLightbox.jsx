import React, { useEffect, useCallback } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ImageLightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onNavigate
}) {
  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    const nextIdx = (currentIndex + 1) % images.length;
    onNavigate(nextIdx);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Architectural Image Lightbox"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141312]/95 backdrop-blur-md text-[#FAF8F5] select-none transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar: Counter, Title & Close Button */}
      <div
        className="w-full px-6 py-5 flex items-center justify-between border-b border-[#2A2825] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#A39D94] font-medium">
            Photograph {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline text-[#3E3B37]">&bull;</span>
          <span className="hidden sm:inline font-sans text-xs tracking-[0.16em] uppercase text-[#FAF8F5] font-light">
            {currentImage.label}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#A39D94] hover:text-[#FAF8F5] transition-colors p-2 focus:outline-none"
          aria-label="Close Lightbox"
        >
          <span className="hidden sm:inline">Close</span>
          <div className="w-8 h-8 rounded-full border border-[#3E3B37] group-hover:border-[#FAF8F5] flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#141312]/80 hover:bg-[#141312] border border-[#3E3B37] hover:border-[#FAF8F5] text-[#FAF8F5] flex items-center justify-center transition-all duration-300 focus:outline-none group shadow-lg"
            aria-label="Previous photograph"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* The Architectural Image */}
        <div className="relative max-w-full max-h-[76vh] flex items-center justify-center animate-fadeIn">
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.label || 'Architectural visual'}
            className="max-h-[76vh] max-w-[90vw] sm:max-w-[84vw] object-contain shadow-2xl transition-all duration-500"
          />
        </div>

        {/* Navigation Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#141312]/80 hover:bg-[#141312] border border-[#3E3B37] hover:border-[#FAF8F5] text-[#FAF8F5] flex items-center justify-center transition-all duration-300 focus:outline-none group shadow-lg"
            aria-label="Next photograph"
          >
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Bottom Information Bar: Keyboard Instructions */}
      <div
        className="w-full px-6 py-4 bg-[#141312] border-t border-[#2A2825] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#A39D94] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 text-center sm:text-left max-w-3xl">
          {currentImage.label && (
            <p className="text-sm font-sans tracking-[0.14em] text-[#FAF8F5] uppercase font-light">
              {currentImage.label}
            </p>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4 text-[10px] tracking-[0.16em] uppercase text-[#6C665D]">
          <span>Use &larr; &rarr; to navigate</span>
          <span>&bull;</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
