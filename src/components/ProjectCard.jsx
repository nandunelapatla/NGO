import { motion } from 'framer-motion';
import { Tag, TrendingUp } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  const { image, title, category, description, stats } = project;

  const categoryColors = {
    Education: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Health: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Environment: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Community: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Other: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-700 flex flex-col"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            categoryColors[category] || categoryColors.Other
          }`}
        >
          <Tag className="w-3 h-3" />
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-[#1B5E20] dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {stats && (
          <div className="flex gap-3 mb-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 bg-green-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center border border-green-100 dark:border-emerald-800/30"
              >
                <div className="font-heading font-bold text-[#1B5E20] dark:text-emerald-400 text-base">
                  {stat.value}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <button className="mt-auto flex items-center gap-2 text-[#1B5E20] dark:text-emerald-400 text-sm font-semibold group-hover:gap-3 transition-all">
          <TrendingUp className="w-4 h-4" />
          Read More
        </button>
      </div>
    </motion.div>
  );
}
