import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/guide/zulu', label: 'Zulu Guide' },
  { to: '/faq', label: 'FAQ' },
];

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prefix match so each stage at /guide/zulu/<stage> keeps the guide link lit
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const closeMenu = () => setIsMenuOpen(false);

  // The current page is marked the way a book marks it: underlined, not boxed
  const linkClass = (path: string) =>
    `font-reading decoration-1 underline-offset-[6px] transition-colors hover:underline ${
      isActive(path) ? 'text-ink underline decoration-2' : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <nav aria-label="Main" className="bg-paper border-b border-rule sticky top-0 z-50">
      <div className="max-w-[1120px] mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-display font-semibold text-[22px] lg:text-[26px] leading-tight text-ink py-2.5"
          >
            Lobola Hub
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[17px]">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                aria-current={isActive(to) ? 'page' : undefined}
                className={`py-2.5 ${linkClass(to)}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden w-11 h-11 -mr-2.5 flex items-center justify-center text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="main-menu"
          className="md:hidden absolute w-full left-0 bg-paper border-b border-rule shadow-lg animate-slide-down"
        >
          <div className="flex flex-col px-5 py-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                aria-current={isActive(to) ? 'page' : undefined}
                className={`py-3 text-lg ${linkClass(to)}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
