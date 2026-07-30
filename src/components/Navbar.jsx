import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const secondaryNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/web-development', label: 'Web' },
  { href: '/video-editing', label: 'Video' },
  { href: '/design-gallery', label: 'Design' },
  { href: '/#services', label: 'Services' },
  { href: '/#contact', label: 'Contact' }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const currentPath = location.pathname;

  const getLinkClass = (href) => {
    const path = href.split('#')[0] || '/';
    const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);
    return `nav-link ${isActive ? 'active' : ''}`;
  };

  const getMobileLinkClass = (href) => {
    const path = href.split('#')[0] || '/';
    const isActive = path === '/' ? currentPath === '/' : currentPath.startsWith(path);
    return `text-sm font-semibold ${isActive ? 'text-red-500' : 'text-slate-300'}`;
  };

  const handleNavClick = (event, href) => {
    if (href.startsWith('/#') && isHome) {
      event.preventDefault();
      const target = document.querySelector(href.replace('/', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="site-header fixed top-0 z-50 w-full px-4 py-4 text-slate-100">
        <div className="nav-container">
          <Link to="/" className="brand-lockup" aria-label="Sandeep Meche home">
            <img src="/images/IMG_3846.PNG" alt="Sandeep Meche logo" className="h-10 w-10 rounded-full" />
          </Link>

          <nav className={`nav-menu hidden items-center md:flex ${mobileOpen ? 'flex' : ''}`}>
            {secondaryNavLinks.map((item) => (
              <Link
                key={item.href + item.label}
                to={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={getLinkClass(item.href)}
              >
                {item.label}
              </Link>
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
            {secondaryNavLinks.map((item) => (
              <Link
                key={item.href + item.label}
                to={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={getMobileLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
