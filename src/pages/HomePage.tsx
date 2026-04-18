import Hero from '../components/Hero';
import PortfolioSections from '../components/PortfolioSections';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PortfolioSections />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
