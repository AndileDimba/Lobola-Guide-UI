import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-black text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-stone-900">
              Lobola <span className="text-amber-600">Hub</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/guide/zulu"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/guide/zulu') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Zulu Guide
            </Link>
            <Link
              to="/faq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/faq') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white absolute w-full left-0 shadow-xl animate-slide-down">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/guide/zulu"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/guide/zulu') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              Zulu Guide
            </Link>
            <Link
              to="/faq"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive('/faq') 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              FAQ
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
