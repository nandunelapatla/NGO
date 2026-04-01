import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../components/SocialIcons';
import HeroSection from '../components/HeroSection';
import { useState } from 'react';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all text-sm';
const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';
const errorClass = 'text-red-500 text-xs mt-1';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), { ...data, createdAt: serverTimestamp() });
      toast.success('Message sent! We\'ll get back to you soon. 📩');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us – GreenHope NGO</title>
        <meta name="description" content="Get in touch with GreenHope NGO for partnerships, volunteer inquiries, or general queries." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection
          title="Get In Touch"
          subtitle="We'd love to hear from you. Reach out for partnerships, volunteering, or general inquiries."
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
          minHeight="min-h-[55vh]"
        />

        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 sm:p-10 border border-slate-100 dark:border-slate-700"
              >
                <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-white mb-2">Send Us a Message</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">We respond within 24 hours on working days.</p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input type="text" placeholder="Priya Sharma" className={inputClass}
                        {...register('name', { required: 'Name is required' })} />
                      {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" placeholder="you@email.com" className={inputClass}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                        })} />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Subject</label>
                    <input type="text" placeholder="How can we help?" className={inputClass}
                      {...register('subject', { required: 'Subject is required' })} />
                    {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>Message</label>
                    <textarea rows={5} placeholder="Your message..." className={`${inputClass} resize-none`}
                      {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message too short' } })} />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#1B5E20] text-white font-heading font-bold rounded-xl hover:bg-[#145214] transition-all shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : '📬 Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-white mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, label: 'Address', value: '123 Green Avenue, Banjara Hills,\nHyderabad, Telangana 500034, India' },
                      { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                      { icon: Mail, label: 'Email', value: 'info@greenhope.org', href: 'mailto:info@greenhope.org' },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#1B5E20] dark:text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
                          {href ? (
                            <a href={href} className="text-slate-700 dark:text-slate-200 hover:text-[#1B5E20] dark:hover:text-emerald-400 transition-colors font-medium text-sm">
                              {value}
                            </a>
                          ) : (
                            <p className="text-slate-700 dark:text-slate-200 font-medium text-sm whitespace-pre-line">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h3 className="font-heading font-semibold text-slate-800 dark:text-white mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: FacebookIcon, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
                      { icon: InstagramIcon, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
                      { icon: TwitterIcon, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
                      { icon: LinkedinIcon, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
                    ].map(({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className={`w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all ${color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 h-64">
                  <iframe
                    title="GreenHope NGO Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2894219437!2d78.4482857!3d17.4256421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c66c4f3a1d%3A0x9b8f0f6a0e1c3e1a!2sBanjara Hills%2C Hyderabad!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}
