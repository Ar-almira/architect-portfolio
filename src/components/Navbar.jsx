import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ activeSection = 'home', isProjectView = false, onNavigateHome }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
  ];

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isProjectView) {
      if (onNavigateHome) {
        onNavigateHome(sectionId);
      }
      return;
    }

    const target = document.querySelector(`#${sectionId}`);
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
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled || isProjectView
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md py-4 border-b border-[#E8E3DC]/70 shadow-[0_4px_24px_rgba(20,19,18,0.02)]'
            : 'bg-transparent py-6 md:py-8'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Typographic Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141312]"
            aria-label="Almira Aslam Vathare Portfolio Home"
          >
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[-0.01em] text-[#141312] group-hover:text-[#43473E] transition-colors duration-300">
              Almira Aslam Vathare
            </span>
            <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#78736B] font-medium mt-0.5 group-hover:text-[#141312] transition-colors duration-300">
              Architecture &bull; Portfolio 2026
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-10 lg:gap-14"
          >
            {navLinks.map((link) => {
              const isActive = !isProjectView && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`group relative text-xs tracking-[0.16em] uppercase font-sans font-medium transition-colors duration-300 py-1 ${isActive
                      ? 'text-[#141312]'
                      : 'text-[#78736B] hover:text-[#141312]'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141312] inline-block animate-pulse" />
                    )}
                    {link.label}
                  </span>

                  {/* Subtle architectural underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#141312] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full bg-[#78736B]/60'
                      }`}
                  />
                </a>
              );
            })}

            {/* Direct Contact Button / Call to Action */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase font-sans font-medium px-4 py-2 border border-[#141312]/20 hover:border-[#141312] hover:bg-[#141312] hover:text-[#FAF8F5] transition-all duration-300 rounded-[2px]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#141312] hover:text-[#78736B] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#141312] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAF8F5] transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between p-8 pt-28 ${mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
          }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-6">
          <p className="text-[11px] tracking-[0.24em] uppercase font-sans text-[#78736B] border-b border-[#E8E3DC] pb-4">
            Navigation Index
          </p>
          <nav className="flex flex-col space-y-5">
            {navLinks.map((link, idx) => {
              const isActive = !isProjectView && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="flex items-center justify-between group py-2"
                >
                  <span
                    className={`font-serif text-3xl font-light tracking-wide transition-colors ${isActive ? 'text-[#141312] italic' : 'text-[#78736B] group-hover:text-[#141312]'
                      }`}
                  >
                    <span className="text-xs font-sans text-[#A39D94] mr-3 font-normal not-italic">
                      0{idx + 1}
                    </span>
                    {link.label}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-transform ${isActive ? 'bg-[#141312] scale-100' : 'bg-transparent scale-0 group-hover:scale-75 group-hover:bg-[#78736B]'
                      }`}
                  />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Drawer Footer Info */}
        <div className="border-t border-[#E8E3DC] pt-6 flex flex-col space-y-3">
          <div className="text-xs font-sans text-[#78736B]">
            <p className="font-medium text-[#141312]">Almira Aslam Vathare</p>
            <p>Architect | Spatial Designer</p>
            <p className="text-[11px] text-[#A39D94] mt-1">Class of 2026</p>
          </div>
          <a
            href="mailto:ar.almira7@gmail.com"
            className="text-xs tracking-[0.1em] text-[#141312] underline underline-offset-4 decoration-[#E8E3DC] hover:decoration-[#141312] transition-colors"
          >
            ar.almira7@gmail.com
          </a>
        </div>
      </div>
    </>
  );
}
