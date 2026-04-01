import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Leaf, Zap, Users } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TeamCard from '../components/TeamCard';

const TEAM = [
  { name: 'Dr. Ananya Reddy', role: 'Founder & President', image: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Vikram Sharma', role: 'Executive Director', image: 'https://i.pravatar.cc/300?img=11' },
  { name: 'Preethi Nair', role: 'Head of Education Programs', image: 'https://i.pravatar.cc/300?img=46' },
  { name: 'Arjun Mehta', role: 'Health Outreach Lead', image: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Kavitha Rao', role: 'Environment Officer', image: 'https://i.pravatar.cc/300?img=45' },
  { name: 'Rohan Gupta', role: 'Volunteer Coordinator', image: 'https://i.pravatar.cc/300?img=13' },
];

const VALUES = [
  { icon: Heart, title: 'Compassion', description: 'We lead with empathy, placing community needs at the heart of every decision.' },
  { icon: Leaf, title: 'Sustainability', description: 'Our solutions are designed for lasting impact, not just immediate relief.' },
  { icon: Zap, title: 'Innovation', description: 'We embrace creative thinking and technology to solve age-old challenges.' },
  { icon: Users, title: 'Inclusivity', description: "We work with and for all communities, leaving no one behind in our journey." },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us – GreenHope NGO</title>
        <meta name="description" content="Learn about GreenHope NGO's history, mission, vision, and the dedicated team behind our work." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection
          title="About GreenHope"
          subtitle="A decade of impact. A lifelong commitment to change."
          backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
          minHeight="min-h-[60vh]"
        />

        {/* History */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">Our Story</span>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2 mb-6">
                  Over a Decade of Community Service
                </h2>
                <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    GreenHope was founded in 2014 by Dr. Ananya Reddy, a social entrepreneur with a vision to address the root causes of inequality in India — lack of education, poor healthcare, and environmental degradation.
                  </p>
                  <p>
                    Starting with a single digital literacy project in five villages in Telangana, GreenHope has grown into a full-scale NGO with operations across 5 states, 50+ completed projects, and a volunteer network of 500+ dedicated changemakers.
                  </p>
                  <p>
                    Today, we work at the intersection of technology, nature, and community to create programs that are not just impactful but truly transformative and self-sustaining.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { value: '2014', label: 'Founded' },
                    { value: '5 States', label: 'Presence' },
                    { value: '1L+', label: 'Beneficiaries' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-green-50 dark:bg-emerald-900/20 rounded-xl border border-green-100 dark:border-emerald-800/30">
                      <div className="font-heading font-bold text-xl text-[#1B5E20] dark:text-emerald-400">{stat.value}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                    alt="GreenHope team working in community"
                    className="w-full h-[480px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=200&q=80"
                    alt="Community event"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2">Vision & Mission</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1B5E20] rounded-3xl p-10 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
                <div className="text-5xl mb-5">🎯</div>
                <h3 className="font-heading font-bold text-2xl mb-4">Our Mission</h3>
                <p className="text-slate-200 leading-relaxed">
                  To empower marginalized communities across India through sustainable education, accessible healthcare, livelihood support, and environmental stewardship — creating pathways to lasting dignity and self-reliance.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#FFC107] rounded-3xl p-10 text-[#1B5E20] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-black/5 rounded-full -translate-y-20 translate-x-20" />
                <div className="text-5xl mb-5">👁️</div>
                <h3 className="font-heading font-bold text-2xl mb-4">Our Vision</h3>
                <p className="leading-relaxed">
                  An India where every child is educated, every family is healthy, and every community lives in harmony with its natural environment — a nation that leads by example in inclusive and sustainable development.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">What We Believe</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2">Our Core Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow text-center"
                >
                  <v.icon className="w-8 h-8 text-[#1B5E20] dark:text-emerald-400 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-slate-800 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[#1B5E20] dark:text-emerald-400 font-semibold text-sm uppercase tracking-widest">The People Behind the Mission</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-800 dark:text-white mt-2">Meet Our Team</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM.map((member, i) => (
                <TeamCard key={member.name} member={member} index={i} />
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
