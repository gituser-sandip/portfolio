import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import SandeepAI from './components/SandeepAI';
import WebDevelopment from './pages/WebDevelopment';
import VideoEditing from './pages/VideoEditing';
import DesignGallery from './pages/DesignGallery';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

const experienceItems = [
  {
    period: 'Contract - Kathmandu, Nepal',
    title: 'Event Coordinator',
    company: 'Elite Events',
    description: 'Coordinate visual production, digital logistics, promotional content, and on-site media assets for premium event experiences.'
  },
  {
    period: '2023 - 2024',
    title: 'Web Portfolio Builder',
    company: 'Personal & Practice Projects',
    description: 'Build responsive portfolio pages, static websites, navigation systems, and mobile-first interface sections.'
  },
  {
    period: '2022 - 2023',
    title: 'Frontend UI Practice',
    company: 'Personal Learning',
    description: 'Build beginner frontend interfaces with HTML, CSS, JavaScript, and responsive layout concepts.'
  }
];

const educationItems = [
  {
    period: 'Currently Studying',
    title: 'Bachelor of Science in Computing with AI',
    company: 'Islington College - Kathmandu, NEPAL',
    description: 'Specialized in Software Engineering and Artificial Intelligence.'
  },
  {
    period: '2024',
    title: '+2 NEB',
    company: 'Kanchanjunga English School',
    description: 'Completed higher secondary education before starting undergraduate computing studies.'
  },
  {
    period: '2022',
    title: 'SEE',
    company: 'Sigma English School',
    description: 'Built the academic foundation for computing, design, and creative work.'
  }
];

const technicalSkills = [
  { label: 'Frontend Development', value: '95%' },
  { label: 'Responsive UI', value: '90%' },
  { label: 'JavaScript', value: '85%' },
  { label: 'Video Editing', value: '55%' },
  { label: 'Graphic Design', value: '50%' }
];

const professionalSkills = [
  { label: 'Aesthetic Judgment', value: '95%' },
  { label: 'Communication', value: '70%' },
  { label: 'Creative Direction', value: '85%' },
  { label: 'Problem Solving', value: '90%' }
];

const projectCards = [
  {
    title: 'Responsive Portfolio Website',
    description: 'The main web project: responsive layout, theme switching, smooth navigation, project pages, CV download, and contact flow.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    icon: 'fa-laptop-code',
    link: 'https://www.sandeepmeche.com.np',
    linkLabel: 'View Project'
  },
  {
    title: 'Web Development Projects',
    description: 'Live frontend projects, GitHub repositories, and website previews showing practice with HTML, CSS, JavaScript, React, and deployment.',
    tags: ['Frontend', 'GitHub', 'Deployment'],
    icon: 'fa-window-restore',
    link: '/web-development',
    linkLabel: 'View Web Projects'
  },
  {
    title: 'Mobile UI & Responsiveness',
    description: 'Section spacing, mobile navigation, card grids, contact layout, and page structures refined for small screens.',
    tags: ['Mobile First', 'CSS', 'UI Polish'],
    icon: 'fa-mobile-screen-button',
    link: '/web-development',
    linkLabel: 'See Web Details'
  },
  {
    title: 'n8n Automation Workflows',
    description: 'Automation concepts for connecting forms, alerts, content tasks, and simple backend workflows with visual n8n-style logic.',
    tags: ['n8n', 'Automation', 'Workflows'],
    icon: 'fa-diagram-project',
    link: '/web-development',
    linkLabel: 'View Automation'
  },
  {
    title: 'Supporting Video Edits',
    description: 'Short-form editing is a secondary skill used to support web content, previews, and visual storytelling when needed.',
    tags: ['Secondary', 'Captions', 'Social Clips'],
    icon: 'fa-film',
    link: '/video-editing',
    linkLabel: 'View Secondary Work'
  },
  {
    title: 'Supporting Design Assets',
    description: 'Design work is kept as a smaller support area for thumbnails, banners, and visuals that improve web presentation.',
    tags: ['Secondary', 'Canva', 'Thumbnails'],
    icon: 'fa-palette',
    link: '/design-gallery',
    linkLabel: 'View Secondary Work'
  }
];

const serviceCards = [
  {
    title: 'Frontend Development',
    description: 'Responsive web pages, portfolio sections, and clean UI concepts using HTML, CSS, and JavaScript.',
    icon: 'fa-laptop-code'
  },
  {
    title: 'Responsive UI Polish',
    description: 'Better spacing, navigation, cards, forms, and mobile behavior for existing pages.',
    icon: 'fa-mobile-screen-button'
  },
  {
    title: 'Static Website Setup',
    description: 'GitHub Pages-ready structure, project pages, links, and basic publishing preparation.',
    icon: 'fa-globe'
  },
  {
    title: 'Supporting Creative Assets',
    description: 'Simple thumbnails, banners, or short edits when a web project needs visual support.',
    icon: 'fa-pen-nib'
  }
];

const currentBuilds = [
  {
    tag: 'Learning',
    title: 'Computing with AI',
    description: 'Studying at Islington College while prioritizing frontend development, JavaScript, Python, and practical AI fundamentals.'
  },
  {
    tag: 'Building',
    title: 'Web Interfaces',
    description: 'Improving responsive sections, project cards, navigation, contact flows, and mobile UI details.'
  },
  {
    tag: 'Exploring',
    title: 'Frontend UI',
    description: 'Learning how layout, spacing, accessibility, and design decisions translate into better code.'
  }
];

const heroRoles = ['Web Developer', 'Video Editor', 'Photo Editor', 'AI Student', 'Automation Builder'];

function RouteScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToRouteTarget = () => {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const timeout = window.setTimeout(scrollToRouteTarget, 0);
    return () => window.clearTimeout(timeout);
  }, [pathname, hash]);

  return null;
}

function RouteAnimationHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    let observer;

    const revealRouteSections = () => {
      const animatedSections = Array.from(document.querySelectorAll('.animate-on-scroll'));

      if (!animatedSections.length) return;

      if (!('IntersectionObserver' in window)) {
        animatedSections.forEach((section) => section.classList.add('is-in-view'));
        return;
      }

      observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in-view');
              currentObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
      );

      animatedSections.forEach((section) => {
        section.classList.remove('is-in-view');
        observer.observe(section);

        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          section.classList.add('is-in-view');
          observer.unobserve(section);
        }
      });
    };

    const timeout = window.setTimeout(revealRouteSections, 50);

    return () => {
      window.clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.5, y: 0.5, active: false };
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame;

    const createParticles = () => {
      const count = Math.min(72, Math.max(34, Math.floor(width / 22)));
      particles = Array.from({ length: count }, (_, index) => {
        const angle = (index * 137.5 * Math.PI) / 180;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.4 + Math.random() * 2.2,
          speed: 0.18 + Math.random() * 0.42,
          angle,
          orbit: 0.6 + Math.random() * 1.4
        };
      });
    };

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const drawShape = (particle, time) => {
      const pulse = 0.75 + Math.sin(time * 0.002 + particle.angle) * 0.25;
      const radius = particle.size * pulse;

      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(248, 113, 113, 0.86)';
      context.shadowColor = 'rgba(248, 113, 113, 0.75)';
      context.shadowBlur = 14;
      context.fill();
      context.shadowBlur = 0;

      context.beginPath();
      context.arc(particle.x, particle.y, radius * 2.9, 0, Math.PI * 2);
      context.fillStyle = 'rgba(248, 113, 113, 0.1)';
      context.fill();
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const scrollDepth = Number.parseFloat(canvas.dataset.scroll || '0');
      const influenceX = pointer.active ? (pointer.x - 0.5) * 30 : 0;
      const influenceY = pointer.active ? (pointer.y - 0.5) * 22 : 0;

      particles.forEach((particle, index) => {
        if (!reduceMotion) {
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y += Math.sin(particle.angle) * particle.speed + Math.sin(time * 0.0008 + index) * 0.12;
        }

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        particle.x += influenceX * 0.002 * particle.orbit;
        particle.y += influenceY * 0.002 * particle.orbit;
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 132) {
            const opacity = (1 - distance / 132) * (0.36 - scrollDepth * 0.16);
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => drawShape(particle, time));

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles-canvas" aria-hidden="true" />;
}

function HomePage() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    let timeout;
    const currentRole = heroRoles[roleIndex];
    
    if (isDeletingRole) {
      if (typedRole === '') {
        setIsDeletingRole(false);
        setRoleIndex((prev) => (prev + 1) % heroRoles.length);
      } else {
        timeout = setTimeout(() => {
          setTypedRole(currentRole.slice(0, typedRole.length - 1));
        }, 34);
      }
    } else {
      if (typedRole === currentRole) {
        timeout = setTimeout(() => {
          setIsDeletingRole(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setTypedRole(currentRole.slice(0, typedRole.length + 1));
        }, 86);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedRole, isDeletingRole, roleIndex]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.querySelector('#home');
    const canvas = document.querySelector('.hero-particles-canvas');
    if (!hero || !canvas) return undefined;

    let ticking = false;
    const updateHeroScroll = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      hero.style.setProperty('--hero-scroll', progress.toFixed(4));
      canvas.dataset.scroll = progress.toFixed(4);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroScroll);
        ticking = true;
      }
    };

    updateHeroScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateHeroScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeroScroll);
    };
  }, []);

  useEffect(() => {
    const animatedEls = document.querySelectorAll('.scroll-animate, .progress-fill');
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('scroll-animate')) {
              entry.target.classList.add('visible');
            }
            if (entry.target.classList.contains('progress-fill')) {
              const width = entry.target.getAttribute('data-width');
              if (width) {
                entry.target.style.width = width;
                entry.target.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
              }
            }
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );

    animatedEls.forEach((el) => scrollObserver.observe(el));
    return () => scrollObserver.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') || 'Portfolio visitor',
      email: formData.get('email') || 'No email provided',
      subject: formData.get('subject') || 'Portfolio inquiry',
      message: formData.get('message') || ''
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      form.reset();
      setFormStatus('Message sent successfully. Thank you!');
    } catch (error) {
      setFormStatus('Backend is not running, opening an email draft instead.');
      window.location.href = `mailto:Sandipmeche6@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`)}`;
    }
  };

  const themeToggleLabel = useMemo(() => (theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'), [theme]);

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#0c0d10] text-slate-100'}`}>
      <div className="hero-bg" />
      <div className="site-lines">
        <div className="line line-1" />
        <div className="line line-2" />
        <div className="line line-3" />
        <div className="line line-h line-4" />
        <div className="line line-h line-5" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
        <header className={`site-header fixed top-0 z-50 w-full px-4 py-4 ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
          <div className="nav-container">
            <a href="#home" onClick={(event) => handleNavClick(event, '#home')} className="brand-lockup" aria-label="Sandeep Meche home">
              <img src="/images/IMG_3846.PNG" alt="Sandeep Meche logo" className="h-10 w-10 rounded-full" />
            </a>

            <nav className={`nav-menu hidden items-center md:flex ${mobileOpen ? 'flex' : ''}`}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4 md:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                className="nav-toggle text-xl text-slate-300 hover:text-red-500 focus:outline-none md:hidden"
                aria-label="Open mobile menu"
                aria-expanded={mobileOpen}
              >
                <i className="fas fa-bars" />
              </button>
            </div>
          </div>
        </header>

        {mobileOpen && (
          <div className="mobile-menu fixed left-4 right-4 top-20 z-[60] p-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`text-sm font-semibold ${activeSection === item.href.replace('#', '') ? 'text-red-500' : 'text-slate-300'}`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <main className="w-full max-w-6xl pt-24 mx-auto">
          <section id="home" className="hero-section relative mb-24 flex flex-col items-center justify-between px-6 pt-4 pb-20 md:flex-row md:px-6">
            <div className="hero-geometry-bg" aria-hidden="true">
              <HeroParticles />
              <div className="hero-grid-plane" />
              <div className="hero-orbit-ring hero-orbit-ring-1" />
              <div className="hero-orbit-ring hero-orbit-ring-2" />
              <div className="hero-orbit-ring hero-orbit-ring-3" />
            </div>
            <div className="hero-spidey" aria-hidden="true">
              <img src="/images/lil-spidey-transparent.png" alt="" />
            </div>

            <div className="hero-copy z-10 text-center md:w-7/12 md:text-left">
              <p className="hero-eyebrow hero-reveal hero-delay-1">Hello, I am</p>
              <h1 className="hero-title hero-reveal hero-delay-2 text-5xl font-extrabold leading-tight text-black sm:text-6xl lg:text-7xl">
                <span className="text-red-500">Sandeep </span>
                <br />
                <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>Meche</span>
              </h1>
              <p className="hero-reveal hero-delay-3 mt-5 flex min-h-[2.5rem] flex-wrap items-center justify-center font-mono text-lg font-semibold md:justify-start lg:text-xl" aria-label={heroRoles[roleIndex]}>
                <span className="mr-2 text-slate-400">A</span>
                <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>
                  {typedRole || '\u00A0'}
                </span>
                <span className="ml-1 animate-pulse font-bold text-cyan-400">|</span>
              </p>
              <p className={`hero-summary hero-reveal hero-delay-4 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                Designing responsive web interfaces and refined digital visuals with a balance of performance, clarity, and modern interaction.
              </p>
              <div className="hero-reveal hero-delay-6 mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
                <a href="#projects" onClick={(event) => handleNavClick(event, '#projects')} className="btn btn-primary">View Work</a>
                <a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="btn btn-secondary">Get In Touch</a>
                <a href="/assets/Sandeep_Meche_CV.pdf" className="btn btn-ghost" download>
                  Download CV
                </a>
              </div>
              <div className="hero-reveal hero-delay-7 hero-badges" aria-label="Core tools and skills">
                <span>HTML/CSS</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Responsive UI</span>
                <span>GitHub Pages</span>
              </div>
            </div>

            <div className="z-10 mt-12 flex w-full justify-center md:mt-0 md:w-5/12 pl-0 md:pl-8">
              <SandeepAI />
            </div>
            
            <div id="animated-dot1" />
            <div id="animated-dot2" />
          </section>

          <section id="about" className="about-section my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <div className="scroll-animate fade-up about-hero">
              <span className="section-kicker">About Me</span>
              <h2>Frontend-focused creator with a growing AI foundation.</h2>
              <p>
                I am a computing undergraduate in Kathmandu, focused on building responsive web interfaces, clean portfolio systems, and practical digital experiences. Design, video, and automation support the work when they help the final product feel sharper.
              </p>
            </div>

            <div className="about-stats grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Web', 'Primary Focus'],
                ['React', 'Current Stack'],
                ['AI', 'Academic Track'],
                ['n8n', 'Automation Interest']
              ].map(([value, label], index) => (
                <div key={label} className={`scroll-animate zoom-out stagger-${index + 1} about-stat-card`}>
                  <span>{value}</span>
                  <p>{label}</p>
                </div>
              ))}
            </div>

            <div className="about-profile-grid">
              <div className="scroll-animate tilt-left about-panel">
                <div className="about-panel-heading">
                  <i className="fas fa-briefcase" />
                  <div>
                    <span>Experience</span>
                    <h3>Practical Journey</h3>
                  </div>
                </div>
                <div className="about-experience-list">
                  {experienceItems.map((item) => (
                    <article key={item.title} className="about-experience-item">
                      <span>{item.period}</span>
                      <h4>{item.title}</h4>
                      <strong>{item.company}</strong>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="scroll-animate tilt-right about-panel">
                <div className="about-panel-heading">
                  <i className="fas fa-graduation-cap" />
                  <div>
                    <span>Education</span>
                    <h3>Academic Path</h3>
                  </div>
                </div>
                <div className="education-card-grid">
                  {educationItems.map((item, index) => (
                    <article key={item.title} className={`education-card stagger-${index + 1}`}>
                      <span>{item.period}</span>
                      <h4>{item.title}</h4>
                      <strong>{item.company}</strong>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="skills-section my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <div className="scroll-animate fade-up skills-heading">
              <span className="section-kicker">Skill System</span>
              <h2>My <span>Skills</span></h2>
              <p>A focused stack for frontend builds, visual polish, automation experiments, and clear communication.</p>
            </div>

            <div className="scroll-animate fade-up skills-cosmos">
              <div className="skill-orbit skill-orbit-1" />
              <div className="skill-orbit skill-orbit-2" />
              <div className="skill-orb">
                <span>Core</span>
                <strong>Creative Tech</strong>
              </div>

              <div className="skill-orbit-deck">
                {[
                  ['fa-code', 'Frontend', technicalSkills[0].value, 'HTML, CSS, JavaScript, React'],
                  ['fa-mobile-screen-button', 'Responsive UI', technicalSkills[1].value, 'Layouts built for real device behavior'],
                  ['fa-wand-magic-sparkles', 'Visual Polish', professionalSkills[0].value, 'Typography, spacing, color, and presentation'],
                  ['fa-diagram-project', 'Automation', '70%', 'n8n-style flows, forms, alerts, and simple logic'],
                  ['fa-film', 'Editing', technicalSkills[3].value, 'Short-form edits, captions, and content support'],
                  ['fa-comments', 'Communication', professionalSkills[1].value, 'Clear briefs, client updates, and practical delivery']
                ].map(([icon, title, value, description], index) => (
                  <article key={title} className={`skill-cosmos-card skill-card-${index + 1}`}>
                    <i className={`fas ${icon}`} />
                    <div>
                      <span>{title}</span>
                      <strong>{value}</strong>
                    </div>
                    <p>{description}</p>
                    <div className="progress-bar">
                      <div className="progress-fill" data-width={value} style={{ width: '0%' }} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="scroll-animate fade-up skill-tags skill-toolbelt">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'PHP', 'SQL', 'Canva', 'DaVinci Resolve', 'n8n'].map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>

          <section id="projects" className="projects-section my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <div className="scroll-animate fade-up projects-heading">
              <span className="section-kicker">Selected Work</span>
              <h2>Featured <span>Projects</span></h2>
              <p>Clean builds, responsive interfaces, and visual support work arranged like a compact production flow.</p>
            </div>

            <div className="scroll-animate fade-up projects-stage">
              <div className="projects-stage-header">
                <div>
                  <span className="stage-file">portfolio-showcase.yml</span>
                  <span className="stage-meta">on: creative-build</span>
                </div>
                <span className="stage-status"><i className="fas fa-circle-check" /> Live ready</span>
              </div>

              <div className="projects-flow">
              {projectCards.map((card, index) => (
                <article key={card.title} className={`project-card scroll-animate flip-up stagger-${index + 1}`}>
                  <div className="project-card-top">
                    <span className="project-node"><i className="fas fa-circle-check" /></span>
                    <span className="project-step">Step {String(index + 1).padStart(2, '0')}</span>
                    <i className={`fas ${card.icon} project-icon`} />
                  </div>
                  <div className="project-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="project-tags">
                      {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    {card.link.startsWith('/') ? (
                      <Link to={card.link} className="project-link">
                        {card.linkLabel} <i className="fas fa-arrow-right ml-1 text-xs" />
                      </Link>
                    ) : (
                      <a href={card.link} className="project-link">
                        {card.linkLabel} <i className="fas fa-arrow-right ml-1 text-xs" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
              </div>
            </div>

            <div className="scroll-animate fade-up section-actions project-actions mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/web-development" className="btn btn-primary">Explore Web Work</Link>
              <Link to="/video-editing" className="btn btn-secondary">Secondary Video Work</Link>
              <Link to="/design-gallery" className="btn btn-ghost">Secondary Design Work</Link>
            </div>
          </section>

          <section id="samples" className="my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <h2 className="scroll-animate fade-up mb-4 text-center text-4xl font-bold">Portfolio <span className="text-red-500">Pages</span></h2>
            <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-slate-400">
              Start with the web development page. Video editing and design gallery are secondary pages that support the main frontend portfolio.
            </p>
            <div className="page-card-grid grid gap-6 md:grid-cols-3">
              {[
                ['fa-laptop-code', 'Main Priority', 'Web Projects', 'Responsive portfolio pages, frontend layouts, live deployments, and GitHub project previews.', '/web-development'],
                ['fa-film', 'Secondary Skill', 'Supporting Video Editing', 'Short-form clips and captions used as supporting media skills, not the main portfolio focus.', '/video-editing'],
                ['fa-palette', 'Secondary Skill', 'Supporting Design Gallery', 'Design assets that support web pages, thumbnails, banners, and project presentation.', '/design-gallery']
              ].map(([icon, label, title, description, href]) => (
                <Link key={title} to={href} className="scroll-animate fade-up page-card rounded-xl border border-gray-700 bg-[#2a2a2a] p-6 shadow-lg transition-all duration-300 hover:border-red-500">
                  <span className="page-card-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500"><i className={`fas ${icon}`} /></span>
                  <span className="current-label">{label}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{description}</p>
                  <span className="page-card-link mt-4 inline-flex items-center text-red-500">Open page <i className="fas fa-arrow-right ml-2" /></span>
                </Link>
              ))}
            </div>
          </section>

          <section id="services" className="my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <h2 className="scroll-animate fade-up mb-10 text-center text-4xl font-bold">My <span className="text-red-500">Services</span></h2>
            <div className="scroll-animate fade-up services-banner rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
              <div>
                <span className="current-label">Available Services</span>
                <h3 className="mt-3 text-2xl font-semibold">Frontend web development is the main service; creative visuals are optional support.</h3>
              </div>
              <div className="service-pills mt-6 flex flex-wrap gap-3">
                <span>Frontend Development</span>
                <span>Responsive UI</span>
                <span>Static Websites</span>
                <span>Supporting Design</span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map((service, index) => (
                <div key={service.title} className={`scroll-animate zoom-out stagger-${index + 1} rounded-xl border border-gray-700 bg-[#2a2a2a] p-8 text-center shadow-md transition-all duration-300 hover:border-red-500`}>
                  <i className={`fas ${service.icon} mb-4 text-5xl text-red-500`} />
                  <h3 className="mb-2 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-400">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="scroll-animate fade-up process-list mt-8 grid gap-6 md:grid-cols-3">
              {[
                ['Brief', 'Understand the goal, audience, deadline, and assets before starting.'],
                ['Create', 'Build the first polished direction with clean structure and visual consistency.'],
                ['Deliver', 'Export files or publish pages in formats that are ready to use.']
              ].map(([title, description]) => (
                <div key={title} className="rounded-xl border border-gray-700 bg-[#1c2027] p-6 shadow-md">
                  <h4 className="mb-2 text-lg font-semibold text-white">{title}</h4>
                  <p className="text-sm text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="currently" className="my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <h2 className="scroll-animate fade-up mb-10 text-center text-4xl font-bold">Currently <span className="text-red-500">Building</span></h2>
            <div className="current-grid grid gap-6 md:grid-cols-3">
              {currentBuilds.map((item) => (
                <div key={item.title} className="scroll-animate fade-up rounded-xl border border-gray-700 bg-[#1c2027] p-6 shadow-md">
                  <span className="current-label">{item.tag}</span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="scroll-animate fade-up section-actions mt-8 flex flex-wrap justify-center gap-4">
              <a href="/assets/Sandeep_Meche_CV.pdf" className="btn btn-primary" download>Download CV</a>
              <a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="btn btn-secondary">Discuss Work</a>
            </div>
          </section>

          <section id="contact" className="my-12 w-full px-8 py-8 sm:px-12 sm:py-12">
            <h2 className="scroll-animate fade-up mb-10 text-center text-4xl font-bold">Get In <span className="text-red-500">Touch</span></h2>
            <div className="grid gap-12 md:grid-cols-2">
              <div className="scroll-animate tilt-left">
                <h3 className="mb-6 text-2xl font-semibold">Contact Info</h3>
                <div className="space-y-6">
                  {[['fa-envelope', 'Email Me', 'Sandipmeche6@gmail.com', 'mailto:Sandipmeche6@gmail.com'], ['fa-phone-alt', 'Call Me', '+977 9807944252', 'tel:+9779807944252'], ['fa-map-marker-alt', 'Location', 'Kathmandu, Nepal', ''], ['fa-globe', 'Website', 'www.sandeepmeche.com.np', 'https://www.sandeepmeche.com.np']].map(([icon, label, value, href]) => (
                    <div key={label} className="flex items-center">
                      <i className={`fas ${icon} mr-4 text-2xl text-red-500`} />
                      <div>
                        <p className="text-slate-400">{label}</p>
                        {href ? (
                          <a href={href} className="text-white transition-colors duration-300 hover:text-red-500">{value}</a>
                        ) : (
                          <p className="text-white">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="mb-4 text-2xl font-semibold">Quick Links</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="/assets/Sandeep_Meche_CV.pdf" download className="quick-link"><i className="fas fa-file-arrow-down" /> CV</a>
                    <a href="mailto:Sandipmeche6@gmail.com" className="quick-link"><i className="fas fa-envelope" /> Email</a>
                    <a href="https://www.sandeepmeche.com.np" className="quick-link"><i className="fas fa-globe" /> Website</a>
                  </div>
                </div>
                <div className="social-links mt-8" aria-label="Social and portfolio links">
                  <a href="https://github.com/gituser-sandip" target="_blank" rel="noopener"><i className="fab fa-github" /> GitHub</a>
                  <a href="https://www.instagram.com/asandip01/" target="_blank" rel="noopener"><i className="fab fa-instagram" /> Instagram</a>
                  <a href="https://www.sandeepmeche.com.np" target="_blank" rel="noopener"><i className="fas fa-globe" /> Portfolio</a>
                </div>
              </div>

              <div className="scroll-animate tilt-right">
                <h3 className="mb-6 text-2xl font-semibold">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-400">Your Name</label>
                    <input type="text" id="name" name="name" className="w-full rounded-lg border border-gray-700 bg-[#2a2a2a] p-3 text-white transition-colors duration-300 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-400">Your Email</label>
                    <input type="email" id="email" name="email" className="w-full rounded-lg border border-gray-700 bg-[#2a2a2a] p-3 text-white transition-colors duration-300 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-bold text-slate-400">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full rounded-lg border border-gray-700 bg-[#2a2a2a] p-3 text-white transition-colors duration-300 focus:border-red-500 focus:outline-none" />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-400">Your Message</label>
                    <textarea id="message" name="message" rows="5" className="w-full rounded-lg border border-gray-700 bg-[#2a2a2a] p-3 text-white transition-colors duration-300 focus:border-red-500 focus:outline-none" />
                  </div>
                  <button type="submit" className="rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700">
                    <span className="submit-label">Send Message</span>
                  </button>
                  {formStatus && <p className="form-status">{formStatus}</p>}
                  <p className="form-note">This opens a pre-filled email draft so your message goes directly to me.</p>
                </form>
              </div>
            </div>
          </section>

          <footer className="scroll-animate fade-in mt-12 w-full border-t border-gray-700 py-8 text-center">
            <p className="text-sm text-slate-500">&copy; 2026 Sandeep Meche. All rights reserved.</p>
          </footer>
        </main>
      </div>

      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-to-top" aria-label="Scroll to top" title="Scroll to top">
        <i className="fas fa-arrow-up" />
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <RouteScrollHandler />
      <RouteAnimationHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/video-editing" element={<VideoEditing />} />
        <Route path="/design-gallery" element={<DesignGallery />} />
      </Routes>
    </>
  );
}

export default App;
