import { Facebook, Instagram, Mail, Phone, MessageCircle, Loader2, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
}

export default function Contact() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const accessToken = (import.meta as any).env.VITE_INSTAGRAM_ACCESS_TOKEN;

  useEffect(() => {
    async function fetchInstagramPosts() {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`
        );
        const data = await response.json();

        if (data.data) {
          const filteredPosts = data.data
            .filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
            .slice(0, 6);
          setPosts(filteredPosts);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, [accessToken]);

  const fallbackPhotos: InstagramPost[] = [
    { id: '1', media_url: 'https://picsum.photos/seed/ig1/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Wedding Moment' },
    { id: '2', media_url: 'https://picsum.photos/seed/ig2/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Pre-wedding' },
    { id: '3', media_url: 'https://picsum.photos/seed/ig3/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Love Story' },
    { id: '4', media_url: 'https://picsum.photos/seed/ig4/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Celebration' },
    { id: '5', media_url: 'https://picsum.photos/seed/ig5/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Intimate' },
    { id: '6', media_url: 'https://picsum.photos/seed/ig6/400/400', permalink: 'https://instagram.com', media_type: 'IMAGE', caption: 'Timeless' },
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPhotos;

  return (
    <section id="contact" className="py-24 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center">

        {/* Header - Centered */}
        <div className="text-center space-y-6 mb-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-serif">Get In Touch</h2>
          <div className="w-20 h-px bg-gold" />
          <p className="text-stone-400 max-w-md mx-auto">
            Ready to capture your story? We'd love to hear from you. Reach out via any of the channels below.
          </p>
        </div>

        {/* Single Line Info + Buttons */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 w-full mb-32">

          {/* Call Us */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Phone className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Call Us</p>
                <p className="text-sm md:text-base">+91-9547561706</p>
              </div>
            </div>
            <a href="https://wa.me/+919547561706" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>

          {/* Email Us */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Mail className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Email Us</p>
                <p className="text-sm md:text-base">weeding_dreams@gmail.com</p>
              </div>
            </div>
            <a href="mailto:weeding_dreams@gmail.com" className="flex items-center gap-2 bg-stone-700 hover:bg-gold text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105">
              <Mail className="w-5 h-5" /> Send an Email
            </a>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Instagram className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Instagram</p>
                <p className="text-sm md:text-base">@weddingdreams_12</p>
              </div>
            </div>
            <a href="https://instagram.com/weddingdreams_12" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90 text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xl">
              <Instagram className="w-5 h-5" /> Follow on Instagram
            </a>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Facebook className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Facebook</p>
                <p className="text-sm md:text-base">@WDamitdawn</p>
              </div>
            </div>
            <a href="https://www.facebook.com/WDamitdawn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xl">
              <Facebook className="w-5 h-5" /> Like on Facebook
            </a>
          </div>

          {/* Youtube */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <Youtube className="w-6 h-6 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-1">Youtube</p>
                <p className="text-sm md:text-base">Wedding Dreams</p>
              </div>
            </div>
            <a href="https://www.youtube.com/@WeddingDreams" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xl">
              <Youtube className="w-5 h-5" /> YouTube Channel
            </a>
          </div>
        </div>

        {/* Horizontal Instagram Feed */}
        <div className="w-full relative px-4">
          <div className="text-center mb-12 space-y-4">
            {/* <h3 className="text-2xl md:text-3xl font-serif">@eternal_moments</h3> */}
            <p className="text-stone-400 text-sm">Join our community on Instagram for daily inspiration and behind-the-scenes.</p>
            {!accessToken && (
              <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-2">
                (Connect Instagram API in settings to see live feed)
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : (
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
              <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
              <div
                className="flex gap-4 overflow-x-auto pb-12 px-[10vw] scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayPosts.map((post, index) => (
                  <motion.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-none w-[280px] md:w-[350px] lg:w-[400px] aspect-square relative overflow-hidden group rounded-xl bg-stone-800 snap-center shadow-lg"
                  >
                    <img
                      src={post.media_url}
                      alt={post.caption || `Instagram ${post.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram className="text-white w-8 h-8" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
