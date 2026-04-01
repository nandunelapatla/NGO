import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import GalleryItem from '../components/GalleryItem';
import Lightbox from '../components/Lightbox';

const GALLERY_IMAGES = [
  { id: 1, image: 'https://picsum.photos/seed/g1/600/400', category: 'Events', alt: 'Annual Volunteer Meet' },
  { id: 2, image: 'https://picsum.photos/seed/g2/400/600', category: 'Projects', alt: 'Tree Planting Drive' },
  { id: 3, image: 'https://picsum.photos/seed/g3/600/450', category: 'Community', alt: 'Village Health Camp' },
  { id: 4, image: 'https://picsum.photos/seed/g4/500/350', category: 'Team', alt: 'Team Outing 2024' },
  { id: 5, image: 'https://picsum.photos/seed/g5/400/500', category: 'Events', alt: 'GreenHope Foundation Day' },
  { id: 6, image: 'https://picsum.photos/seed/g6/600/400', category: 'Projects', alt: 'Clean Water Project Inauguration' },
  { id: 7, image: 'https://picsum.photos/seed/g7/500/600', category: 'Community', alt: 'Women Empowerment Workshop' },
  { id: 8, image: 'https://picsum.photos/seed/g8/600/350', category: 'Team', alt: 'Field Volunteers' },
  { id: 9, image: 'https://picsum.photos/seed/g9/400/400', category: 'Events', alt: 'Youth Summit' },
  { id: 10, image: 'https://picsum.photos/seed/g10/600/500', category: 'Projects', alt: 'Solar Panel Installation' },
  { id: 11, image: 'https://picsum.photos/seed/g11/500/400', category: 'Community', alt: 'Community Tree Nursery' },
  { id: 12, image: 'https://picsum.photos/seed/g12/600/450', category: 'Team', alt: 'Leadership Meet 2024' },
  { id: 13, image: 'https://picsum.photos/seed/g13/400/600', category: 'Events', alt: 'Awareness Rally' },
  { id: 14, image: 'https://picsum.photos/seed/g14/600/400', category: 'Projects', alt: 'School Library Project' },
];

const CATEGORIES = ['All', 'Events', 'Projects', 'Community', 'Team'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const handlePrev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const handleNext = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  return (
    <>
      <Helmet>
        <title>Photo Gallery – GreenHope NGO</title>
        <meta name="description" content="Browse photos from GreenHope NGO's events, projects, and community activities." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection
          title="Photo Gallery"
          subtitle="Moments that capture the spirit of our mission."
          backgroundImage="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1600&q=80"
          minHeight="min-h-[55vh]"
        />

        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1B5E20] text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-emerald-900/20 hover:text-[#1B5E20] dark:hover:text-emerald-400'
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-xs opacity-70">
                    ({cat === 'All' ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter((i) => i.category === cat).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="masonry-grid">
              {filtered.map((item, index) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={(i) => setLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            current={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </motion.div>
    </>
  );
}
