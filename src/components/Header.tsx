import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Camera, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Services', path: '/#services' },
    { name: 'Testimonials', path: '/#testimonials' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMobileMenuOpen(false);

    if (path.startsWith('/#')) {
      const targetId = path.substring(2);

      if (location.pathname === '/') {
        // If already on homepage, just scroll smoothly
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // We intentionally do NOT use window.history.pushState(hash) here 
          // because we don't want the browser to auto-scroll here on page refresh.
        }
      } else {
        // Will be handled by React Router and ScrollToTop in App.tsx
      }
    } else if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Camera className={`w-8 h-8 transition-colors ${isScrolled ? 'text-gold' : 'text-white'} drop-shadow-xl`} />
          </motion.div>
          <span className={`text-xl font-serif font-bold tracking-wider transition-colors ${isScrolled ? 'text-black' : 'text-white'}`}>
            WEDDING DREAMS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`text-sm font-medium tracking-widest uppercase hover:text-gold transition-colors ${isScrolled ? 'text-stone-600' : 'text-white/80'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${isScrolled
              ? 'bg-black text-white hover:bg-gold'
              : 'bg-white text-black hover:bg-gold hover:text-white'
              }`}
          >
            Get In Touch
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-black' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-black' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-stone-100 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="text-lg font-serif text-stone-800 hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={(e) => handleNavClick(e, '/#contact')}
                className="mt-2 bg-black text-white py-3 rounded-full text-center font-semibold tracking-widest uppercase"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
