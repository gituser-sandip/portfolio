import Navbar from '../components/Navbar';

const githubProjects = [
  { icon: 'fa-dumbbell', tag: 'TypeScript + React', title: 'Extra Life GYM', desc: 'A modern gym website built with TypeScript and React, live on Vercel with full responsive design.', tags: ['TypeScript', 'React', 'Vite', 'Vercel'], live: 'https://extra-life-gym.vercel.app', code: 'https://github.com/gituser-sandip/Extra_Life_GYM' },
  { icon: 'fa-building', tag: 'JavaScript + React', title: 'Real State', desc: 'A real estate listing web app with property browsing and details, deployed on Vercel.', tags: ['JavaScript', 'React', 'Vercel', 'Property'], live: 'https://realstate-smoky-three.vercel.app', code: 'https://github.com/gituser-sandip/real_state' },
  { icon: 'fa-briefcase', tag: 'TypeScript + React', title: 'Hyder Ali Advisory', desc: 'A professional advisory portfolio website built with TypeScript and React, deployed on Vercel.', tags: ['TypeScript', 'React', 'Vite', 'Vercel'], live: 'https://hyderali-advisory-protfolio.vercel.app', code: 'https://github.com/gituser-sandip/hyderali-advisory-protfolio' },
  { icon: 'fa-clock', tag: 'React + Laravel', title: 'Times', desc: 'A watch-store web project with the tagline "more than time it\'s a statement."', tags: ['JavaScript', 'React', 'Tailwind', 'PHP', 'Laravel'], live: 'https://times-watch-store.vercel.app/', code: 'https://github.com/gituser-sandip/Times' },
  { icon: 'fa-heart-pulse', tag: 'Java', title: 'MindWell', desc: 'A wellness-focused application with a clean frontend, deployed and live online.', tags: ['Java', 'Wellness App', 'Full Stack'], live: 'https://mindwell-nepal.onrender.com/', code: 'https://github.com/gituser-sandip/MindWell' },
  { icon: 'fa-book-open-reader', tag: 'HTML', title: 'WellGuide', desc: 'An HTML project connected to health guidance and learning content, deployed on Netlify.', tags: ['HTML', 'Frontend', 'Netlify'], live: 'https://wellgu1de.netlify.app/', code: 'https://github.com/gituser-sandip/WellGuide' },
  { icon: 'fa-camera-retro', tag: 'HTML', title: 'Photobooth', desc: 'A photo-booth style web project with a fun interactive UI, deployed on Vercel.', tags: ['HTML', 'CSS', 'Vercel'], live: 'https://photobooth-blond.vercel.app', code: 'https://github.com/gituser-sandip/potobooth' },
  { icon: 'fa-volume-xmark', tag: 'JavaScript', title: 'silence', desc: 'A deployed JavaScript web project with a unique concept, hosted on Vercel.', tags: ['JavaScript', 'Vercel', 'Web App'], live: 'https://silence-gamma.vercel.app', code: 'https://github.com/gituser-sandip/silence' }
];

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-100">
      <div className="hero-bg" />
      <div className="relative flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
        <Navbar />

        <main className="w-full flex flex-col items-center">
          <section id="web-page" className="page-hero w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="page-kicker"><i className="fas fa-laptop-code" /> Main Portfolio Priority</div>
            <h1 className="page-title">Web Development</h1>
            <p className="page-subtitle">
              This is the primary focus of the portfolio: responsive websites, frontend layouts, UI polish, live
              project previews, and clean interfaces built with HTML, CSS, JavaScript, and React practice.
            </p>
            <div className="hero-badges">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>Responsive UI</span><span>Main Focus</span>
            </div>
            <div className="page-hero-actions">
              <a href="#web-projects" className="btn btn-primary">View Projects</a>
              <a href="/#contact" className="btn btn-secondary">Start a Website</a>
            </div>
          </section>

          <section id="web-projects" className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="sample-heading">
              <div>
                <span className="current-label">Live Projects</span>
                <h3>Web Project Previews</h3>
              </div>
              <a href="/#contact" className="btn btn-secondary">Start a Website</a>
            </div>
            <div className="web-project-grid">
              <article className="web-project-card">
                <div className="web-preview">
                  <img src="/images/portfolio7.JPG" alt="Personal portfolio preview" />
                </div>
                <div className="web-project-content">
                  <span className="current-label">Live Website</span>
                  <h4>Personal Portfolio</h4>
                  <p>A responsive multi-page portfolio with dark/light themes, project pages, CV download, contact form wiring, and GitHub Pages hosting.</p>
                  <div className="project-tags">
                    <span>HTML</span><span>CSS</span><span>JavaScript</span><span>GitHub Pages</span>
                  </div>
                  <div className="web-project-actions">
                    <a href="https://www.sandeepmeche.com.np/" className="btn btn-primary" target="_blank" rel="noopener">Visit Live</a>
                    <a href="https://github.com/gituser-sandip/portfolio" className="btn btn-secondary" target="_blank" rel="noopener">View Code</a>
                  </div>
                </div>
              </article>
            </div>
            <div className="detail-strip">
              <div><i className="fas fa-gauge-high" /><h4>Fast Static Pages</h4><p>Simple structure, optimized assets, and clean navigation.</p></div>
              <div><i className="fas fa-moon" /><h4>Theme Support</h4><p>Dark and light modes use shared CSS variables.</p></div>
              <div><i className="fas fa-mobile-screen" /><h4>Mobile Layouts</h4><p>Hero, cards, buttons, and forms collapse cleanly.</p></div>
              <div><i className="fas fa-link" /><h4>Deployment Ready</h4><p>Pages are built for GitHub Pages and custom domains.</p></div>
            </div>
          </section>

          <section className="web-carousel-section w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="sample-heading carousel-heading">
              <div>
                <span className="current-label">GitHub Projects</span>
                <h3>Project Carousel</h3>
                <p>Swipe or scroll through responsive builds, live apps, and shipped experiments.</p>
              </div>
              <a href="https://github.com/gituser-sandip" className="btn btn-secondary" target="_blank" rel="noopener">Open GitHub</a>
            </div>
            <div className="github-project-grid feature-carousel" aria-label="Web development project carousel">
              {githubProjects.map((project) => (
                <article key={project.title} className="github-project-card">
                  <span className="page-card-icon"><i className={`fas ${project.icon}`} /></span>
                  <span className="current-label">{project.tag}</span>
                  <h4>{project.title}</h4>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="web-project-actions">
                    <a href={project.live} className="btn btn-primary" target="_blank" rel="noopener">Visit Live</a>
                    <a href={project.code} className="btn btn-secondary" target="_blank" rel="noopener">View Code</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="section-note">
              All public projects from my GitHub are listed above — from modern TypeScript + React apps deployed
              on Vercel to early HTML experiments on GitHub Pages. Each one reflects a different stage of
              learning, building, and shipping.
            </p>
          </section>

          <section className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Web <span className="text-red-500">Services</span></h2>
            <div className="current-grid">
              <div>
                <span className="current-label">Build</span>
                <h3>Responsive Pages</h3>
                <p>Clean landing pages, portfolio sections, and static websites that work across screen sizes.</p>
              </div>
              <div>
                <span className="current-label">Improve</span>
                <h3>UI Polish</h3>
                <p>Better spacing, colors, navigation, sections, mobile behavior, and visual hierarchy.</p>
              </div>
              <div>
                <span className="current-label">Publish</span>
                <h3>GitHub Pages Hosting</h3>
                <p>Static website deployment with custom domain setup and organized project structure.</p>
              </div>
            </div>
            <div className="section-actions">
              <a href="/#contact" className="btn btn-primary">Request UI Polish</a>
              <a href="/design-gallery" className="btn btn-secondary">See Design Services</a>
            </div>
          </section>
        </main>

        <footer className="w-full max-w-6xl text-center py-8 mt-12 border-t border-gray-700">
          <p className="text-gray-500 text-sm">&copy; 2026 Sandeep Meche. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
