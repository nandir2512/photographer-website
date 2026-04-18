import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black perspective-1000">
      {/* YouTube Background with Parallax Scale */}
      <motion.div
        style={{ scale: scaleVideo }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <iframe
          src="https://www.youtube.com/embed/-F_ju9utl1I?autoplay=1&mute=1&loop=1&playlist=-F_ju9utl1I&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-[177.77vh] h-[56.25vw] object-cover opacity-80"
          allow="autoplay; encrypted-media"
          title="Background Video"
        />
      </motion.div>
      {/* Dramatic Cinematic Overlay */}
      <div className="absolute inset-0 video-overlay-darker z-0" />
      {/* Floaters (Dust/Particles proxy) */}
      <motion.div
        animate={{ y: [-20, 20], opacity: [0.3, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [20, -20], opacity: [0.2, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"
      />
      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="max-w-5xl glass-panel-dark p-12 md:p-16 rounded-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] text-white font-serif leading-[1.1] mb-8 drop-shadow-2xl font-light">
              We believe in capturing <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#f9e596] font-medium">love stories</span> <br />
              that will last forever
            </h1>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
            className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className="text-white/70 uppercase tracking-[0.4em] text-xs md:text-sm font-light">
              Eternal Moments & Motions
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-gold">Scroll to Discover</span>
        <motion.div
          animate={{ height: ["0px", "40px"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-gradient-to-b from-white/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}