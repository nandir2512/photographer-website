import { Instagram, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  media_type: string;
}

export default function InstagramFeed() {
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
          // Filter for images and limit to 6
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

  // Fallback data if no token or error
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
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-gold">
            <Instagram className="w-5 h-5" />
            <span className="uppercase tracking-[0.3em] text-xs font-bold">Follow Our Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif">@eternal_moments</h2>
          {!accessToken && (
            <p className="text-stone-400 text-[10px] uppercase tracking-widest">
              (Connect Instagram API in settings to see live feed)
            </p>
          )}
          <p className="text-stone-500 text-sm">Join our community on Instagram for daily inspiration and behind-the-scenes.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                className="relative aspect-square overflow-hidden group rounded-lg"
              >
                <img 
                  src={post.media_url} 
                  alt={post.caption || `Instagram ${post.id}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white w-6 h-6" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-10 py-3 border-2 border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-all rounded-full"
          >
            Follow Us
          </a>
        </div>
      </div>
    </section>
  );
}
