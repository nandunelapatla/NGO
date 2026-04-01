import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';

const ALL_PROJECTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?w=600&q=80',
    title: 'Digital Literacy for Rural Schools',
    category: 'Education',
    description: 'Providing tablets, internet access, and teacher training to 120 rural government schools across Telangana.',
    stats: [{ value: '5,000+', label: 'Students' }, { value: '120', label: 'Schools' }],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80',
    title: 'Clean Water Initiative',
    category: 'Health',
    description: 'Installing bio-sand water filters and educating communities on safe water practices in drought-affected villages.',
    stats: [{ value: '30+', label: 'Villages' }, { value: '15K', label: 'Beneficiaries' }],
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    title: 'Urban Forest Revival',
    category: 'Environment',
    description: 'Planting 50,000 native trees in urban heat islands with community maintenance programs.',
    stats: [{ value: '50K', label: 'Trees' }, { value: '200+', label: 'Volunteers' }],
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&q=80',
    title: 'Women Skill Development Center',
    category: 'Community',
    description: 'Training rural women in tailoring, digital literacy, and entrepreneurship to achieve financial independence.',
    stats: [{ value: '800+', label: 'Women Trained' }, { value: '12', label: 'Centers' }],
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80',
    title: 'School Health Screening Camp',
    category: 'Health',
    description: 'Free medical, dental, and vision screenings for 10,000+ government school children annually.',
    stats: [{ value: '10K+', label: 'Children' }, { value: '250+', label: 'Doctors' }],
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    title: 'Solar Energy for Remote Villages',
    category: 'Environment',
    description: 'Installing solar micro-grids to power homes and schools in electrification-deprived areas.',
    stats: [{ value: '40', label: 'Villages' }, { value: '2,000+', label: 'Homes' }],
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80',
    title: 'Library on Wheels',
    category: 'Education',
    description: 'Mobile libraries reaching remote localities, distributing 5,000+ books and fostering a reading culture.',
    stats: [{ value: '5K+', label: 'Books' }, { value: '80', label: 'Routes' }],
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600&q=80',
    title: 'Elderly Care Network',
    category: 'Community',
    description: 'Connecting isolated senior citizens with volunteers for companionship, healthcare access, and daily support.',
    stats: [{ value: '1,200+', label: 'Seniors' }, { value: '350', label: 'Volunteers' }],
  },
];

const CATEGORIES = ['All', 'Education', 'Health', 'Environment', 'Community'];

export default function OurWorks() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Helmet>
        <title>Our Works – GreenHope NGO</title>
        <meta name="description" content="Explore GreenHope NGO's projects spanning education, healthcare, environment, and community empowerment." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection
          title="Our Works & Projects"
          subtitle="Explore our portfolio of impactful initiatives across India."
          backgroundImage="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&q=80"
          minHeight="min-h-[60vh]"
        />

        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    active === cat
                      ? 'bg-[#1B5E20] text-white shadow-md shadow-green-900/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-green-50 dark:hover:bg-emerald-900/20 hover:text-[#1B5E20] dark:hover:text-emerald-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-400">No projects found in this category.</div>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
}
