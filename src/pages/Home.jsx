import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target, Eye, TrendingUp, Users, Briefcase, Calendar,
  Quote, ArrowRight,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../components/SocialIcons';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';

// ─── Sample Data ───────────────────────────────────
const PROJECTS = [
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
    description: 'Planting 50,000 native trees in urban heat islands across Hyderabad with community maintenance programs.',
    stats: [{ value: '50K', label: 'Trees' }, { value: '200+', label: 'Volunteers' }],
  },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', location: 'Hyderabad', quote: 'GreenHope changed my village forever. The clean water project saved countless lives and gave us hope we never had.' },
  { name: 'Rajan Mehta', location: 'Mumbai', quote: 'Volunteering with GreenHope for two years has been the most fulfilling experience of my life. A truly impactful organization.' },
  { name: 'Lakshmi Nair', location: 'Chennai', quote: "My daughter's school was transformed by the Digital Literacy project. She now dreams of becoming an engineer!" },
];

const COUNTERS = [
  { icon: Users, value: 500, suffix: '+', label: 'Volunteers' },
  { icon: Briefcase, value: 50, suffix: '+', label: 'Projects' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Active' },
  { icon: TrendingUp, value: 1, prefix: '', value2: '1L+', label: 'Lives Impacted' },
];

const MISSION_CARDS = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower underserved communities through holistic development — education, healthcare, livelihood, and environment.',
    color: 'text-[#1B5E20]',
    bg: 'bg-green-50 dark:bg-emerald-900/20',
    border: 'border-green-200 dark:border-emerald-800/30',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'A world where every person has access to dignity, opportunity, and a clean, thriving environment.',
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800/30',
  },
  {
    icon: TrendingUp,
    title: 'Our Impact',
    description: 'Over a decade of sustained impact — 50+ projects, 500+ volunteers, and 1 lakh+ beneficiaries across India.',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800/30',
  },
];

// ─── Animated Counter Hook ──────────────────────────
function useCountUp(target, duration = 2000, inView) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function CounterCard({ icon: Icon, value, suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, 1800, inView);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-[#FFC107]" />
      </div>
      <div className="font-heading font-extrabold text-4xl text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-slate-300 font-medium">{label}</div>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>GreenHope NGO – Empowering Communities</title>
        <meta name="description" content="GreenHope NGO empowers communities through education, healthcare, and environmental initiatives across India." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hero */}
        <HeroSection
          title="Empowering Communities, Changing Lives"
          subtitle="We believe every person deserves access to education, healthcare, and a clean environment. Join us in making that a reality."
          backgroundImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
          primaryBtn={{ to: '/volunteer', label: '🤝 Join as Volunteer' }}
          secondaryBtn={{ to: '/works', label: '✨ Our Works' }}
        />

        {/* Mission/Vision/Impact */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">Who We Are</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2">
                Driven by Purpose, Guided by Values
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MISSION_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`${card.bg} ${card.border} border rounded-2xl p-8 hover:shadow-lg transition-shadow`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white dark:bg-slate-800 shadow-sm`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-slate-800 dark:text-white mb-3">{card.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Counters */}
        <section className="py-20 bg-gradient-to-br from-[#1B5E20] to-[#0d3b10] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #FFC107 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <h2 className="font-heading font-bold text-3xl text-white">Our Impact in Numbers</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              <CounterCard icon={Users} value={500} suffix="+" label="Volunteers" delay={0} />
              <CounterCard icon={Briefcase} value={50} suffix="+" label="Projects Completed" delay={0.1} />
              <CounterCard icon={Calendar} value={10} suffix="+" label="Years Active" delay={0.2} />
              <CounterCard icon={TrendingUp} value={100} suffix="K+" label="Lives Impacted" delay={0.3} />
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
              <div>
                <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">What We Do</span>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-1">Featured Projects</h2>
              </div>
              <Link
                to="/works"
                className="inline-flex items-center gap-2 text-[#1B5E20] dark:text-emerald-400 font-semibold hover:gap-3 transition-all text-sm"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2 mb-12">
              Stories That Inspire
            </h2>

            <div className="relative min-h-[200px]">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === activeTestimonial ? 1 : 0 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center ${i === activeTestimonial ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                  <Quote className="w-10 h-10 text-[#FFC107] mx-auto mb-5" />
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic mb-6">"{t.quote}"</p>
                  <div className="font-heading font-semibold text-slate-800 dark:text-white">{t.name}</div>
                  <div className="text-[#1B5E20] dark:text-emerald-400 text-sm">{t.location}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2 justify-center mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeTestimonial ? 'bg-[#1B5E20] w-6' : 'bg-slate-300 dark:bg-slate-600'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Social Strip */}
        <section className="py-10 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 font-medium">Follow our journey on social media</p>
            <div className="flex justify-center gap-5">
              {[
                { icon: FacebookIcon, href: '#', color: 'hover:text-blue-600', label: 'Facebook' },
                { icon: InstagramIcon, href: '#', color: 'hover:text-pink-500', label: 'Instagram' },
                { icon: TwitterIcon, href: '#', color: 'hover:text-sky-500', label: 'Twitter' },
                { icon: LinkedinIcon, href: '#', color: 'hover:text-blue-500', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, color, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm text-slate-500 dark:text-slate-400 ${color} hover:shadow-md transition-all hover:scale-110 border border-slate-200 dark:border-slate-700`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-[#FFC107] to-amber-500">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#1B5E20] mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-[#1B5E20]/80 text-lg mb-8">
                Join our community of changemakers and help shape a better future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/volunteer" className="px-8 py-4 bg-[#1B5E20] text-white font-heading font-bold rounded-full hover:bg-[#145214] transition-all shadow-lg hover:scale-105">
                  Become a Volunteer
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white text-[#1B5E20] font-heading font-bold rounded-full hover:bg-slate-50 transition-all shadow-lg hover:scale-105">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
