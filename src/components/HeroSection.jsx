import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection({
  title,
  subtitle,
  backgroundImage,
  primaryBtn,
  secondaryBtn,
  dark = true,
  minHeight = 'min-h-screen',
}) {
  return (
    <section
      className={`relative ${minHeight} flex items-center justify-center bg-[#1B5E20] overflow-hidden`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B5E20]/85 via-[#1B5E20]/70 to-[#0d3b10]/80" />
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FFC107]/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFC107]/20 rounded-full mb-6 border border-[#FFC107]/30">
            <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
            <span className="text-[#FFC107] text-sm font-medium">Making a Difference</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryBtn || secondaryBtn) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryBtn && (
                <Link
                  to={primaryBtn.to}
                  className="px-8 py-4 bg-[#FFC107] text-[#1B5E20] font-heading font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-400/30 hover:scale-105 text-base"
                >
                  {primaryBtn.label}
                </Link>
              )}
              {secondaryBtn && (
                <Link
                  to={secondaryBtn.to}
                  className="px-8 py-4 bg-white/10 text-white font-heading font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all hover:scale-105 backdrop-blur-sm text-base"
                >
                  {secondaryBtn.label}
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
