import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

/*Since GitHub Pages hosts static files, it doesn't natively support standard Single Page Application routing (visiting yoursite.com/gallery directly will result in a 404 error). 
The easiest and most reliable fix is to switch from BrowserRouter to HashRouter.
(This will make your URLs look like yoursite.com/#/gallery, which routes perfectly on static hosting)*/

import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import Chatbot from './components/Chatbot';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </div>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}
