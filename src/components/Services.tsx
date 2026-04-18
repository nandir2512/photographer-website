import { Camera, Video, Plane, User, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const services = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Wedding Photography',
    description: 'Capturing the magic of your big day with timeless elegance and emotional depth.',
    image: 'https://picsum.photos/seed/service1/400/200'
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: 'Pre Wedding Shoot',
    description: 'Beautifully staged and candid moments before you say "I do".',
    image: 'https://picsum.photos/seed/service2/400/300'
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: 'Cinematic Wedding Films',
    description: 'Story-driven films that bring your wedding memories back to life.',
    image: 'https://picsum.photos/seed/service3/400/300'
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: 'Drone Coverage',
    description: 'Breathtaking aerial perspectives of your celebration and venue.',
    image: 'https://picsum.photos/seed/service4/400/300'
  },
  {
    icon: <User className="w-8 h-8" />,
    title: 'Model Photography',
    description: 'Professional portfolio and high-fashion shoots with artistic flair.',
    image: 'https://picsum.photos/seed/service5/400/300'
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  return (
    <section id="services" ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      {/* Dark Cinematic Parallax Background Fill */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-black to-black opacity-60 z-0 pointer-events-none"
      />

      {/* Light leaks/Auras */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24 space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.5em] font-light text-gold">Our Expertise</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-light">What We Do</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          <p className="text-stone-400 max-w-2xl mx-auto font-light text-lg tracking-wide">
            We offer a comprehensive range of sophisticated photography and videography services tailored to capture your most precious moments.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-panel-dark group overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] relative"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-6 left-6 p-4 glass-panel rounded-xl text-gold shadow-lg backdrop-blur-xl group-hover:bg-gold group-hover:text-black transition-colors duration-500">
                  {service.icon}
                </div>
              </div>
              <div className="p-8 space-y-4 relative z-10 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-serif font-light text-white group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed tracking-wide group-hover:text-stone-300 transition-colors">
                  {service.description}
                </p>
                {/* <button className="text-xs uppercase tracking-widest font-bold text-stone-400 group-hover:text-black transition-colors flex items-center gap-2">
                  Learn More <span className="w-4 h-px bg-stone-300 group-hover:w-8 group-hover:bg-gold transition-all" />
                </button> */}
                <div className="pt-4 overflow-hidden">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <span>Discover More</span>
                    <div className="w-8 h-px bg-gold" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
