import Navbar from '../components/Navbar';

export default function VideoEditing() {
  return (
    <div className="min-h-screen bg-[#0c0d10] text-slate-100">
      <div className="hero-bg" />
      <div className="relative flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
        <Navbar />

        <main className="w-full flex flex-col items-center">
          <section id="video-page" className="page-hero w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="page-kicker"><i className="fas fa-film" /> Secondary Portfolio Skill</div>
            <h1 className="page-title">Supporting Video Editing</h1>
            <p className="page-subtitle">
              Video editing is a secondary skill here. The main priority is web development, while these edits
              support content, social previews, and creative presentation when needed.
            </p>
            <div className="hero-badges">
              <span>CapCut</span><span>DaVinci Resolve</span><span>Captions</span><span>9:16 Export</span><span>Secondary</span>
            </div>
            <div className="mt-8">
              <a href="#instagram-reels" className="btn btn-primary">Preview Reels</a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>9:16</strong><span>Supporting exports</span></div>
              <div className="hero-stat"><strong>4</strong><span>Reels embedded here</span></div>
              <div className="hero-stat"><strong>3</strong><span>Secondary sample types</span></div>
            </div>
          </section>

          <section id="instagram-reels" className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="reels-banner">
              <div>
                <span className="current-label">Instagram Reels Preview</span>
                <h2>Watch My Short-Form Edits</h2>
                <p>A selection of recent Reels edits showcasing pacing, and visual polish.</p>
              </div>
              <a href="https://www.instagram.com/asandip01/" className="btn btn-secondary" target="_blank" rel="noopener">
                <i className="fab fa-instagram" /> Open Instagram
              </a>
            </div>
            <div className="instagram-embed-grid">
              {['DRpGW88CMfW', 'DR7MGuVCAta', 'DR2VjZbiLOD', 'DTAEO4iCCt6'].map((reelId) => (
                <article key={reelId} className="instagram-embed-card">
                  <blockquote className="instagram-media"
                    data-instgrm-permalink={`https://www.instagram.com/reel/${reelId}/`}
                    data-instgrm-version="14">
                    <a href={`https://www.instagram.com/reel/${reelId}/`} target="_blank" rel="noopener">Watch Reel on Instagram</a>
                  </blockquote>
                </article>
              ))}
            </div>
            <div className="section-actions">
              <a href="https://www.instagram.com/asandip01/" className="btn btn-primary" target="_blank" rel="noopener">View More Reels</a>
              <a href="/#contact" className="btn btn-secondary">Book Editing</a>
            </div>
          </section>

          <section className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <div className="sample-heading">
              <div>
                <span className="current-label">Sample Types</span>
                <h3>Editing Work I Can Show Here</h3>
              </div>
              <a href="/#contact" className="btn btn-secondary">Book Editing</a>
            </div>
            <div className="sample-grid">
              <article className="sample-card">
                <div className="phone-frame"><i className="fas fa-play" /></div>
                <h4>Fast-Paced Reel Edit</h4>
                <p>Hook-first pacing, music sync, sharp cuts, captions, and a clean end frame.</p>
                <div className="project-tags"><span>Reels</span><span>Hook</span><span>Captions</span></div>
              </article>
              <article className="sample-card">
                <div className="phone-frame"><i className="fas fa-clapperboard" /></div>
                <h4>Event Recap Clip</h4>
                <p>Highlight moments arranged into a short story with transitions and color polish.</p>
                <div className="project-tags"><span>Recap</span><span>Transitions</span><span>Color</span></div>
              </article>
              <article className="sample-card">
                <div className="phone-frame"><i className="fas fa-closed-captioning" /></div>
                <h4>Captioned Talking Clip</h4>
                <p>Readable captions, subtle motion emphasis, and exports ready for mobile platforms.</p>
                <div className="project-tags"><span>Subtitles</span><span>Talking Head</span><span>Mobile</span></div>
              </article>
            </div>
            <div className="detail-strip">
              <div><i className="fas fa-music" /><h4>Music Sync</h4><p>Cuts are timed around rhythm, emphasis, and retention.</p></div>
              <div><i className="fas fa-closed-captioning" /><h4>Readable Captions</h4><p>Caption styling is sized for phone viewing.</p></div>
              <div><i className="fas fa-image" /><h4>Thumbnail Direction</h4><p>Frames and covers are considered alongside the edit.</p></div>
              <div><i className="fas fa-upload" /><h4>Platform Export</h4><p>Final files are prepared for Reels, Shorts, TikTok, or Facebook.</p></div>
            </div>
          </section>

          <section className="w-full p-8 sm:p-12 rounded-2xl shadow-xl my-12 animate-on-scroll">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Editing <span className="text-red-500">Workflow</span></h2>
            <div className="current-grid">
              <div><span className="current-label">1. Structure</span><h3>Hook And Flow</h3><p>Start with a strong opening, remove weak moments, and build a clear watch path.</p></div>
              <div><span className="current-label">2. Polish</span><h3>Captions And Visuals</h3><p>Add readable captions, simple motion accents, color correction, and thumbnail direction.</p></div>
              <div><span className="current-label">3. Export</span><h3>Platform Ready</h3><p>Prepare exports for Reels, TikTok, Shorts, and Facebook with the right format.</p></div>
            </div>
            <p className="section-note">
              Each edit is shaped for mobile attention first, with the opening hook, text size, and final export checked as part of delivery.
            </p>
          </section>
        </main>

        <footer className="w-full max-w-6xl text-center py-8 mt-12 border-t border-gray-700">
          <p className="text-gray-500 text-sm">&copy; 2026 Sandeep Meche. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
