import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">
                Lobola Hub
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted guide to understanding and navigating South African marriage traditions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/guide/zulu" className="hover:text-amber-400 transition-colors">
                  Zulu Lobola Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-semibold mb-4">Disclaimer</h4>
            <p className="text-sm leading-relaxed">
              This app provides general information and does not replace guidance from elders or family. Practices vary between families and regions.
            </p>
          </div>
        </div>
        
        <div className="border-t border-stone-800 pt-8 text-center text-sm">
          <p>© 2026 Lobola Hub • Preserving South African Traditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
