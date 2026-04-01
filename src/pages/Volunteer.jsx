import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import HeroSection from '../components/HeroSection';
import { CheckCircle, Loader2 } from 'lucide-react';


const INTERESTS = ['Education', 'Healthcare', 'Environment', 'Community Development', 'Other'];
const AVAILABILITY = ['Weekdays', 'Weekends', 'Flexible'];

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all text-sm';
const labelClass = 'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5';
const errorClass = 'text-red-500 text-xs mt-1';

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const PROJECT_ID = 'ngo-aa5d9';

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        fields: {
          name:         { stringValue: data.name },
          email:        { stringValue: data.email },
          phone:        { stringValue: data.phone },
          age:          { integerValue: String(data.age) },
          city:         { stringValue: data.city },
          interest:     { stringValue: data.interest },
          motivation:   { stringValue: data.motivation },
          availability: {
            arrayValue: {
              values: (Array.isArray(data.availability) ? data.availability : [])
                .map((v) => ({ stringValue: v })),
            },
          },
          createdAt: { stringValue: new Date().toISOString() },
        },
      };

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/volunteers`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );
      clearTimeout(timer);

      if (res.status === 403) {
        toast.error(
          '⚠️ Firebase rules are blocking writes. Go to Firebase Console → Firestore → Rules and set: allow read, write: if true;',
          { autoClose: 10000 }
        );
        return;
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `HTTP ${res.status}`);
      }

      toast.success('Thank you! Your volunteer registration is submitted! 🎉');
      setSubmitted(true);
      reset();
    } catch (err) {
      if (err.name === 'AbortError') {
        toast.error('Request timed out. Check your internet connection or Firebase rules.');
      } else {
        console.error('Submission error:', err);
        toast.error(`Submission failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <Helmet>
        <title>Volunteer – GreenHope NGO</title>
        <meta name="description" content="Register as a volunteer with GreenHope NGO and be part of India's most impactful community initiatives." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection
          title="Become a Volunteer"
          subtitle="Your time and skills can transform lives. Join our growing family of changemakers."
          backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
          minHeight="min-h-[55vh]"
        />

        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle className="w-20 h-20 text-[#1B5E20] mx-auto mb-6" />
                <h2 className="font-heading font-bold text-3xl text-slate-800 dark:text-white mb-4">You're In! 🎉</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                  Thank you for registering as a volunteer. Our team will reach out to you within 2-3 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-[#1B5E20] text-white font-semibold rounded-full hover:bg-[#145214] transition-colors"
                >
                  Register Another
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 sm:p-12 border border-slate-100 dark:border-slate-700"
              >
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-2xl text-slate-800 dark:text-white">Volunteer Registration</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">All fields are required unless marked optional</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Priya Sharma"
                      className={inputClass}
                      {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className={inputClass}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                      })}
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>

                  {/* Phone + Age */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={inputClass}
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: { value: /^[+]?[\d\s\-()]{8,15}$/, message: 'Invalid phone number' },
                        })}
                      />
                      {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Age</label>
                      <input
                        type="number"
                        placeholder="25"
                        className={inputClass}
                        {...register('age', {
                          required: 'Age is required',
                          min: { value: 16, message: 'Must be at least 16' },
                          max: { value: 80, message: 'Max age is 80' },
                        })}
                      />
                      {errors.age && <p className={errorClass}>{errors.age.message}</p>}
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className={labelClass}>City / Location</label>
                    <input
                      type="text"
                      placeholder="Hyderabad"
                      className={inputClass}
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && <p className={errorClass}>{errors.city.message}</p>}
                  </div>

                  {/* Area of Interest */}
                  <div>
                    <label className={labelClass}>Area of Interest</label>
                    <select
                      className={inputClass}
                      {...register('interest', { required: 'Please select an area of interest' })}
                    >
                      <option value="">Select an area...</option>
                      {INTERESTS.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                    {errors.interest && <p className={errorClass}>{errors.interest.message}</p>}
                  </div>

                  {/* Why volunteer */}
                  <div>
                    <label className={labelClass}>Why do you want to volunteer?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your motivation and what you hope to contribute..."
                      className={`${inputClass} resize-none`}
                      {...register('motivation', { required: 'This field is required', minLength: { value: 30, message: 'Please write at least 30 characters' } })}
                    />
                    {errors.motivation && <p className={errorClass}>{errors.motivation.message}</p>}
                  </div>

                  {/* Availability */}
                  <div>
                    <label className={labelClass}>Availability</label>
                    <div className="flex flex-wrap gap-4">
                      {AVAILABILITY.map((slot) => (
                        <label key={slot} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            value={slot}
                            className="w-4 h-4 accent-[#1B5E20]"
                            {...register('availability')}
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-[#1B5E20] transition-colors">{slot}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#1B5E20] text-white font-heading font-bold rounded-xl hover:bg-[#145214] transition-all shadow-lg hover:shadow-green-900/20 disabled:opacity-60 flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      '🤝 Submit Registration'
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </section>
      </motion.div>
    </>
  );
}
