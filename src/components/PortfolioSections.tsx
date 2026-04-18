import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

type WeddingCategory = 'Bengali Wedding' | 'Non-Bengali Wedding' | 'Muslim Wedding';

const weddingData: Record<WeddingCategory, { images: string[], videos: string[] }> = {
  'Bengali Wedding': {
    images: [
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
    ],
    videos: ['7yS_u29p0_Y', 'q76bS-m_t-I', '-F_ju9utl1I'],
  },
  'Non-Bengali Wedding': {
    images: [
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
    ],
    videos: ['q76bS-m_t-I', '-F_ju9utl1I', '7yS_u29p0_Y'],
  },
  'Muslim Wedding': {
    images: [
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_3.png',
    ],
    videos: ['-F_ju9utl1I', '7yS_u29p0_Y', 'q76bS-m_t-I'],
  }
};

const stories = [
  {
    id: 'pre-wedding',
    title: 'Pre-Wedding',
    quote: '“Every love story is beautiful, but yours is our favorite to capture.”',
    description: 'The anticipation, the quiet moments, and the raw excitement before the big day. We capture the essence of your journey together.',
    images: [
      '/images/pre-wedding/prewedding_1_digha.png',
      '/images/pre-wedding/prewedding_2_digha.png',
      '/images/pre-wedding/prewedding_3_kolkata.png',
      '/images/pre-wedding/prewedding_4_digha.png',
      '/images/pre-wedding/prewedding_1_digha.png',
      '/images/pre-wedding/prewedding_2_digha.png',
      '/images/pre-wedding/prewedding_3_kolkata.png',
      '/images/pre-wedding/prewedding_4_digha.png',

    ],
    videos: ['-F_ju9utl1I', '7yS_u29p0_Y', 'q76bS-m_t-I'],
    reverse: false,
  },
  {
    id: 'wedding',
    title: 'Wedding Moments',
    quote: '“Capturing the emotions, traditions and timeless beauty of your wedding day.”',
    description: 'From the grand celebrations to the intimate glances, we document every detail of your special day with elegance and grace.',
    images: [
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
      '/images/wedding/wedding_1_asansol.png',
      '/images/wedding/wedding_2_kolkata.png',
      '/images/wedding/wedding_3.png',
      '/images/wedding/wedding_4.png',
    ],
    videos: ['7yS_u29p0_Y', 'q76bS-m_t-I', '-F_ju9utl1I'],
    reverse: true,
  },
  {
    id: 'model',
    title: 'Model Shoot',
    quote: '“Elegance, creativity and storytelling through every frame.”',
    description: 'High-fashion, artistic expression, and professional styling. Our model shoots are designed to showcase personality and aesthetic.',
    images: [
      '/images/model-shoot/model_1.png',
      '/images/model-shoot/model_2.png',
      '/images/model-shoot/model_3.png',
      '/images/model-shoot/model_4.png',
      '/images/model-shoot/model_1.png',
      '/images/model-shoot/model_2.png',
      '/images/model-shoot/model_3.png',
      '/images/model-shoot/model_4.png',
    ],
    videos: ['q76bS-m_t-I', '-F_ju9utl1I', '7yS_u29p0_Y'],
    reverse: false,
  },
];

function VerticalScrollingGallery({ images, speed = 20 }: { images: string[], speed?: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[600px] w-full overflow-hidden rounded-sm border border-stone-100 shadow-2xl bg-stone-50"
    >
      <motion.div
        className="flex flex-col gap-4 py-4"
        animate={isInView || isHovered ? {
          y: ['0%', '-50%'],
        } : { y: 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          height: 'auto'
        }}
      >
        {duplicatedImages.map((src, i) => (
          <div key={i} className="px-4 w-full">
            <img
              src={src}
              alt={`Gallery ${i}`}
              className="w-full aspect-[3/4.5] object-cover rounded-sm transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient Overlays for depth */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </div>
  );
}

function HorizontalVideoGallery({ videos }: { videos: string[] }) {
  return (
    <div className="w-full mt-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-stone-200" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">Cinematic Highlights</span>
        <div className="h-px flex-1 bg-stone-200" />
      </div>
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x scroll-smooth">
        {videos.map((id, i) => (
          <div key={i} className="flex-none w-[85vw] sm:w-[320px] md:w-[450px] aspect-video rounded-lg overflow-hidden shadow-lg snap-center bg-stone-100">
            <iframe
              src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-view"
              allowFullScreen
              title={`Wedding Video ${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioSections() {
  const [weddingType, setWeddingType] = useState<WeddingCategory>('Bengali Wedding');

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-48">
        {stories.map((story, index) => {
          const isWedding = story.id === 'wedding';
          const currentImages = isWedding ? weddingData[weddingType].images : story.images;
          const currentVideos = isWedding ? weddingData[weddingType].videos : story.videos;

          return (
            <div key={story.id} className="space-y-24">
              <div
                className={`flex flex-col md:flex-row items-center gap-16 lg:gap-32 ${story.reverse ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex-1 space-y-8 text-center md:text-left"
                >
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-gold block">
                      Chapter {index + 1}
                    </span>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-stone-900 leading-tight">
                      {story.title}
                    </h2>
                  </div>

                  <div className="w-20 h-px bg-gold mx-auto md:mx-0" />

                  <p className="text-2xl md:text-3xl font-serif italic text-stone-700 leading-relaxed max-w-xl">
                    {story.quote}
                  </p>

                  <p className="text-stone-500 leading-relaxed max-w-md mx-auto md:mx-0 text-lg">
                    {story.description}
                  </p>

                  {isWedding && (
                    <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start">
                      {(['Bengali Wedding', 'Non-Bengali Wedding', 'Muslim Wedding'] as WeddingCategory[]).map((type) => (
                        <button
                          key={type}
                          onClick={() => setWeddingType(type)}
                          className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all border outline-none ${weddingType === type
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400 hover:bg-stone-100'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Vertical Scrolling Image Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex-1 w-full max-w-[450px]"
                >
                  <VerticalScrollingGallery key={isWedding ? weddingType : story.id} images={currentImages} speed={index % 2 === 0 ? 20 : 25} />
                </motion.div>
              </div>

              {/* Horizontal Video Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <HorizontalVideoGallery key={isWedding ? weddingType : story.id} videos={currentVideos} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
