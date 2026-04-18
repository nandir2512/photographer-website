import { motion } from 'motion/react';
import { useState } from 'react';

const galleryData = {
  preWedding: [
    'https://picsum.photos/seed/pw1/800/600',
    'https://picsum.photos/seed/pw2/600/800',
    'https://picsum.photos/seed/pw3/800/800',
    'https://picsum.photos/seed/pw4/600/800',
    'https://picsum.photos/seed/pw5/800/600',
    'https://picsum.photos/seed/pw6/600/800',
  ],
  wedding: [
    'https://picsum.photos/seed/w1/800/600',
    'https://picsum.photos/seed/w2/600/800',
    'https://picsum.photos/seed/w3/800/800',
    'https://picsum.photos/seed/w4/600/800',
    'https://picsum.photos/seed/w5/800/600',
    'https://picsum.photos/seed/w6/600/800',
  ],
  model: [
    'https://picsum.photos/seed/m1/800/600',
    'https://picsum.photos/seed/m2/600/800',
    'https://picsum.photos/seed/m3/800/800',
    'https://picsum.photos/seed/m4/600/800',
    'https://picsum.photos/seed/m5/800/600',
    'https://picsum.photos/seed/m6/600/800',
  ]
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'preWedding' | 'wedding' | 'model'>('all');

  const sections = [
    { key: 'preWedding', title: 'Pre-Wedding Images' },
    { key: 'wedding', title: 'Wedding Images' },
    { key: 'model', title: 'Model Shoot' }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif">Our Gallery</h1>
          <div className="w-24 h-px bg-gold mx-auto" />
          <p className="text-stone-500 uppercase tracking-widest text-sm">Capturing Timeless Stories</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['all', 'preWedding', 'wedding', 'model'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                activeFilter === filter 
                  ? 'bg-black text-white shadow-lg' 
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {filter === 'all' ? 'All' : filter.replace(/([A-Z])/g, ' $1')}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="space-y-24">
          {sections.map((section) => (
            (activeFilter === 'all' || activeFilter === section.key) && (
              <motion.div 
                key={section.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-serif border-l-4 border-gold pl-4">{section.title}</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {galleryData[section.key as keyof typeof galleryData].map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                    >
                      <img 
                        src={img} 
                        alt={`${section.title} ${i}`} 
                        className="w-full h-auto object-cover group-hover:brightness-75 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
