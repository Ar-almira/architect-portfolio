import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { architectProfile } from '../data/portfolioData';

export default function Footer() {
  const { name, profession, graduation, contact } = architectProfile;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="contact" className="bg-[#141312] text-[#FAF8F5] pt-20 pb-12 border-t border-[#252321]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top Colophon Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A2825]">
          <div className="lg:col-span-7">
            <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#A39D94] block mb-3 font-medium">
              Inquiries & Collaborations
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight">
              Let&rsquo;s shape thoughtful spaces together.
            </h3>
            <p className="mt-4 text-sm font-sans text-[#A39D94] max-w-lg leading-relaxed">
              Open to architectural design projects, internship opportunities, collaborative work, and learning through new design experiences.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.24em] uppercase font-sans text-[#A39D94] block font-medium">
                Direct Communication
              </span>

              <a
                href={`mailto:${contact.email}`}
                className="block font-['Times_New_Roman'] text-xl sm:text-2xl text-[#FAF8F5] hover:text-[#D8D2C9] transition-colors underline underline-offset-8 decoration-[#3E3B37] break-all sm:break-normal">
                {contact.email}
              </a>

              <a
                href={`tel:${contact.phone}`}
                className="block font-['Times_New_Roman'] text-xl sm:text-2xl text-[#FAF8F5] hover:text-[#D8D2C9] transition-colors underline underline-offset-8 decoration-[#3E3B37] break-all sm:break-normal"
              >
                {contact.phone}
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs font-sans tracking-[0.16em] uppercase text-[#A39D94]">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#78736B]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-sans text-[#78736B]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span className="text-[#FAF8F5] font-medium">{name}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>{profession}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>{graduation}</span>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#A39D94] hover:text-[#FAF8F5] transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-full border border-[#3E3B37] flex items-center justify-center group-hover:border-[#FAF8F5] transition-colors">
              <ArrowUp className="w-3 h-3" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
