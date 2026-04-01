import { motion } from 'framer-motion';
import { LinkedinIcon } from './SocialIcons';

export default function TeamCard({ member, index = 0 }) {
  const { name, role, image } = member;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group text-center border border-slate-100 dark:border-slate-700"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-700 dark:to-slate-800">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <a
            href="#"
            className="p-2 bg-white rounded-full text-[#1B5E20] hover:bg-[#FFC107] transition-colors"
            aria-label={`${name} LinkedIn`}
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-slate-800 dark:text-white text-base">{name}</h3>
        <p className="text-[#1B5E20] dark:text-emerald-400 text-sm font-medium mt-0.5">{role}</p>
      </div>
    </motion.div>
  );
}
