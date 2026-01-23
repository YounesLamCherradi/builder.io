import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp, Zap } from 'lucide-react';

interface AboutHeroProps {
  t: (key: string) => string;
}

export function AboutHero({ t }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fdbc1960e871c41fea425a6c865e4946d?format=webp&width=800&height=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.08,
        }}
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-50/20 to-white/10" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      </div>

      {/* Main Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F2b3e67eefa4d409d9735a3189d2b923e?format=webp&width=1000"
              alt="Maria Zakharova"
              className="w-full max-w-sm sm:max-w-2xl h-auto"
            />
          </div>

          {/* Right side - Quote and Attribution */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Quote */}
            <div className="space-y-4">
              <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-snug">
                {t('about_testimonial_quote')}
              </blockquote>

              {/* Attribution */}
              <div className="space-y-1 pt-3 border-t border-brand-red/30">
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {t('about_testimonial_author')}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {t('about_testimonial_role')}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/news"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-red to-red-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <span>{t('about_cta_button')}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - Full Width with Better Layout */}
      <AboutStats t={t} />
    </section>
  );
}

interface AboutStatsProps {
  t: (key: string) => string;
}

interface StatItemData {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accentColor: string;
  borderColor: string;
  lightBg: string;
}

function AboutStats({ t }: AboutStatsProps) {
  const stats: StatItemData[] = [
    {
      value: '50K+',
      label: t('about_achievements_1_desc'),
      icon: Users,
      gradient: 'from-brand-red to-red-600',
      accentColor: 'brand-red',
      borderColor: 'from-brand-red/20 to-red-500/20',
      lightBg: 'bg-gradient-to-br from-brand-red/5 to-red-100/5',
    },
    {
      value: '150+',
      label: t('about_achievements_2_desc'),
      icon: Globe,
      gradient: 'from-slate-700 to-slate-900',
      accentColor: 'slate',
      borderColor: 'from-slate-700/20 to-slate-900/20',
      lightBg: 'bg-gradient-to-br from-slate-700/5 to-slate-900/5',
    },
    {
      value: '95%',
      label: t('about_achievements_4_desc'),
      icon: TrendingUp,
      gradient: 'from-brand-red to-red-600',
      accentColor: 'red',
      borderColor: 'from-brand-red/20 to-red-500/20',
      lightBg: 'bg-gradient-to-br from-brand-red/5 to-red-100/5',
    },
    {
      value: '24/7',
      label: t('stat_support'),
      icon: Zap,
      gradient: 'from-slate-700 to-slate-900',
      accentColor: 'slate',
      borderColor: 'from-slate-700/20 to-slate-900/20',
      lightBg: 'bg-gradient-to-br from-slate-700/5 to-slate-900/5',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 pt-6 sm:pt-8 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Container */}
              <div className={`relative h-full rounded-xl backdrop-blur-md ${stat.lightBg} border border-gray-300 bg-white/60 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-white/80 group-hover:-translate-y-1`}>

                {/* Animated Background Orb */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700`} />

                {/* Decorative Top Line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br ${stat.gradient} p-2 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Value */}
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 tracking-tight leading-none`}>
                    {stat.value}
                  </div>

                  {/* Divider */}
                  <div className={`h-0.5 w-8 bg-gradient-to-r ${stat.gradient} rounded-full mb-2 group-hover:w-full transition-all duration-500`} />

                  {/* Label */}
                  <p className="text-xs font-semibold text-gray-700 leading-snug">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
