import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import { architectProfile } from './data/portfolioData';

function getInitialProject(projects) {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (hash.startsWith('#project/')) {
    const projectId = hash.replace('#project/', '');
    return projects.find((p) => p.id === projectId) || null;
  }
  return null;
}

function App() {
  const { projects } = architectProfile;
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(() => getInitialProject(projects));

  // Sync with browser hash changes (e.g. Back/Forward button)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const projectId = hash.replace('#project/', '');
        const found = projects.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      if (!hash.startsWith('#project/')) {
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  // Scroll-spy for home page sections
  useEffect(() => {
    if (selectedProject) return;

    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    window.location.hash = `#project/${project.id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToOverview = (targetSection = 'projects') => {
    setSelectedProject(null);
    window.location.hash = `#${targetSection}`;

    // Wait for DOM to render the home view, then scroll to section
    setTimeout(() => {
      const target = document.querySelector(`#${targetSection}`);
      if (target) {
        const topOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141312] font-sans selection:bg-[#E8E2D9] selection:text-[#141312]">
      {/* Top Architectural Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        isProjectView={Boolean(selectedProject)}
        onNavigateHome={(sectionId) => handleBackToOverview(sectionId || 'home')}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {selectedProject ? (
          /* Dedicated Architecture Project Details Page */
          <ProjectDetails
            project={selectedProject}
            allProjects={projects}
            onBack={() => handleBackToOverview('projects')}
            onSelectProject={handleSelectProject}
          />
        ) : (
          /* Portfolio Monograph Overview (Hero, Skills, Projects) */
          <>
            <Hero />
            <Skills />
            <Projects onSelectProject={handleSelectProject} />
          </>
        )}
      </main>

      {/* Footer / Colophon */}
      <Footer />
    </div>
  );
}

export default App;
