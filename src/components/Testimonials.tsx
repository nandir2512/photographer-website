import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Sarah & James',
    photo: 'https://picsum.photos/seed/client1/100/100',
    text: 'Absolutely amazing photography! They captured every emotion beautifully. The team was professional and made us feel so comfortable.',
    rating: 5
  },
  {
    name: 'Emily Watson',
    photo: 'https://picsum.photos/seed/client2/100/100',
    text: 'The pre-wedding shoot was a dream. The locations and the creative direction were top-notch. Highly recommend for any couple!',
    rating: 5
  },
  {
    name: 'Michael & Rose',
    photo: 'https://picsum.photos/seed/client3/100/100',
    text: 'Eternal Moments truly lives up to its name. Our wedding film is something we will cherish forever. Thank you for the magic!',
    rating: 5
  },
  {
    name: 'David Chen',
    photo: 'https://picsum.photos/seed/client4/100/100',
    text: 'Professional, creative, and incredibly talented. The model shoot exceeded my expectations. The lighting and composition were perfect.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif">Client Love</h2>
          <div className="w-20 h-px bg-gold mx-auto" />
          <p className="text-stone-500">What our beautiful couples and clients say about us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-stone-50 rounded-2xl relative overflow-hidden group"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-stone-200/50 group-hover:text-gold/10 transition-colors" />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.photo} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif font-bold text-lg">{item.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-stone-600 italic leading-relaxed relative z-10">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
