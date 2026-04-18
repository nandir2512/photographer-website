import { Camera, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white py-24 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gold/20 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center md:text-left">

          {/* Quick Links */}
          <div className="space-y-8 flex flex-col md:items-start items-center">
            <h4 className="font-serif font-light text-xl tracking-widest uppercase">Explore</h4>
            <ul className="space-y-4 flex flex-col items-center md:items-start text-sm">
              {['Home', 'Gallery', 'Services', 'Testimonials'].map((item) => {
                let path = '/';
                if (item === 'Gallery') path = '/gallery';
                else if (item === 'Services') path = '/#services';
                else if (item === 'Testimonials') path = '/#testimonials';

                return (
                  <li key={item}>
                    <Link
                      to={path}
                      onClick={(e) => {
                        if (path.startsWith('/#') && window.location.pathname === '/') {
                          e.preventDefault();
                          const id = path.substring(2);
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        } else if (path === '/') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="text-stone-400 hover:text-gold transition-colors font-light tracking-wide uppercase text-[10px]"
                    >
                      {item}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* Brand */}
          <div className="space-y-8 flex flex-col items-center text-center">
            <Link to="/" className="flex flex-col items-center gap-4 group">
              <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5 }}>
                <Camera className="w-10 h-10 text-gold drop-shadow-lg" />
              </motion.div>
              <span className="text-xl md:text-2xl font-serif font-light tracking-[0.3em] text-white">
                WEDDING <span className="font-bold">DREAMS</span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto font-light tracking-wider">
              Capturing love stories that last forever. We specialize in wedding, pre-wedding, and artistic photography.
            </p>
            <div className="flex gap-6 pt-4">
              {[Facebook, Instagram, MessageCircle].map((Icon, idx) => (
                <a key={idx} href="#" className="p-3 bg-white/5 border border-white/10 rounded-full hover:border-gold hover:text-gold hover:bg-gold/10 text-stone-400 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          {/* Contact Info */}
          <div className="space-y-8 flex flex-col md:items-end items-center md:text-right">
            <h4 className="font-serif font-light text-xl tracking-widest uppercase">Contact</h4>
            <ul className="space-y-4 flex flex-col items-center md:items-end text-sm text-stone-400 font-light tracking-wide">
              <li>#123, Weeding Dreams, Ramdi </li>
              <li>Asansol, WB-713335</li>
              <li className="text-gold pt-2">+91 9876543210</li>
              <li>
                <a href="mailto:weeding_dreams@gmail.com" className="hover:text-white transition-colors border-b border-transparent hover:border-gold pb-1">
                  weeding_dreams@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-stone-500 text-[10px] tracking-widest uppercase">© {new Date().getFullYear()} Wedding Dreams Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}