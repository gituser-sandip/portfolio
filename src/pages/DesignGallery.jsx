import Navbar from '../components/Navbar';

export default function DesignGallery() {
  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-100">
      <div className="hero-bg" />
      <div className="relative flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
        <Navbar />

        <main className="w-full flex flex-col items-center">
          <section id="design-page" className="page-hero w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="page-kicker"><i className="fas fa-palette" /> Secondary Portfolio Skill</div>
            <h1 className="page-title">Supporting Design Gallery</h1>
            <p className="page-subtitle">
              Design is a supporting skill for this portfolio. The main priority is web development, while these
              visuals help with thumbnails, banners, and presentation assets.
            </p>
            <div className="hero-badges">
              <span>Photoshop</span><span>Lightroom</span><span>Illustrator</span><span>Canva</span><span>Thumbnails</span><span>Secondary</span>
            </div>
            <div className="page-hero-actions">
              <a href="#design-categories" className="btn btn-primary">View Categories</a>
              <a href="/#contact" className="btn btn-secondary">Request Design</a>
            </div>
          </section>

          <section id="design-categories" className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="sample-heading">
              <div>
                <span className="current-label">Gallery</span>
                <h3>Design Sample Categories</h3>
              </div>
              <a href="/#contact" className="btn btn-secondary">Request Design</a>
            </div>
            <div className="design-gallery">
              <article className="design-card large coming-soon-card">
                <span className="page-card-icon"><i className="fas fa-wand-magic-sparkles" /></span>
                <h4>Design Samples Coming Soon</h4>
                <p>Poster, thumbnail, banner, and social media design previews will be added here.</p>
                <div className="project-tags"><span>Posters</span><span>Thumbnails</span><span>Banners</span></div>
              </article>
            </div>
            <p className="section-note">
              This gallery is a work in progress. Design samples will be added over time, showcasing poster,
              thumbnail, banner, and social media design concepts that support the web development projects in
              this portfolio.
            </p>
          </section>

          <section className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Design <span className="text-red-500">Services</span></h2>
            <div className="sample-grid">
              <article className="sample-card design-service-card">
                <span className="page-card-icon"><i className="fas fa-rectangle-ad" /></span>
                <h4>Posters And Banners</h4>
                <p>Promotional layouts for events, pages, offers, and digital announcements.</p>
                <div className="project-tags"><span>Poster</span><span>Banner</span><span>Promo</span></div>
              </article>
              <article className="sample-card design-service-card">
                <span className="page-card-icon"><i className="fas fa-image" /></span>
                <h4>Thumbnails</h4>
                <p>Readable, high-impact thumbnails for videos and social media posts.</p>
                <div className="project-tags"><span>YouTube</span><span>Reels</span><span>Social</span></div>
              </article>
              <article className="sample-card design-service-card">
                <span className="page-card-icon"><i className="fas fa-layer-group" /></span>
                <h4>Poster Design Sets</h4>
                <p>Reusable poster and banner layouts for announcements, promotions, and profile visuals.</p>
                <div className="project-tags"><span>Templates</span><span>Posters</span><span>Banners</span></div>
              </article>
            </div>
            <div className="process-list">
              <div><h4>Collect</h4><p>Gather text, references, images, deadline, and target platform.</p></div>
              <div><h4>Design</h4><p>Create a clean first direction with strong contrast and readable type.</p></div>
              <div><h4>Export</h4><p>Prepare final files for posting, printing, thumbnails, or banners.</p></div>
            </div>
            <div className="section-actions">
              <a href="/#contact" className="btn btn-primary">Request Design</a>
              <a href="/video-editing" className="btn btn-secondary">Pair With Video</a>
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
