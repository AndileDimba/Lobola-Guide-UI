import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-black text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-stone-900">
              Lobola <span className="text-amber-600">Hub</span>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
