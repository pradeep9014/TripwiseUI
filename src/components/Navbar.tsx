import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Map, Menu, X, Compass } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/plan', label: 'Plan Trip' },
    { path: '/my-trip', label: 'My Trip' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="TripWise Home"
          >
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Compass className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <span className="text-lg font-bold text-gradient">TripWise</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === link.path
                    ? 'bg-indigo-600/20 text-indigo-300'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/plan')}
              className="btn-primary px-5 py-2.5 text-sm"
              id="nav-plan-trip-btn"
            >
              <Map size={16} />
              Plan a Trip
            </button>
          </div>

          {/* Mobile Hamburger — hidden on desktop */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="navbar-hamburger btn-ghost p-2 rounded-lg"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — hidden on desktop */}
      <div
        className={`navbar-mobile-menu transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="glass border-t border-white/5 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'bg-indigo-600/20 text-indigo-300'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 pb-1">
            <button
              onClick={() => { navigate('/plan'); setIsMenuOpen(false); }}
              className="btn-primary w-full py-3 text-sm justify-center"
              id="mobile-plan-trip-btn"
            >
              <Map size={16} />
              Plan a Trip
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
