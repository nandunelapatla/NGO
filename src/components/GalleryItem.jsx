import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

export default function GalleryItem({ item, index = 0, onClick }) {
  const { image, category, alt } = item;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="masonry-item group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow"
      onClick={() => onClick(index)}
    >
      <img
        src={image}
        alt={alt || category}
        loading="lazy"
        className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 transform" />
      </div>
      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
        {category}
      </span>
    </motion.div>
  );
}
