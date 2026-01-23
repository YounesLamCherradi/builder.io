import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp, Zap } from 'lucide-react';

interface AboutHeroProps {
  t: (key: string) => string;
}

export function AboutHero({ t }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      </div>

      {/* Main Hero Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10 pt-20 sm:pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F2b3e67eefa4d409d9735a3189d2b923e?format=webp&width=1000"
              alt="Maria Zakharova"
              className="w-full max-w-2xl h-auto"
            />
          </div>

          {/* Right side - Quote and Attribution */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Quote */}
            <div className="space-y-6">
              <blockquote className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-relaxed">
                {t('about_testimonial_quote')}
              </blockquote>

              {/* Attribution */}
              <div className="space-y-2 pt-4 border-t border-brand-red/30">
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {t('about_testimonial_author')}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  {t('about_testimonial_role')}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/events"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-red to-red-700 text-white rounded-full font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:brightness-110"
              >
                <span>{t('about_cta_button')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
    <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Container */}
              <div className={`relative h-full rounded-2xl backdrop-blur-md ${stat.lightBg} border-2 bg-white/60 ${stat.borderColor} p-5 sm:p-6 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:bg-white/80 group-hover:-translate-y-1`}>

                {/* Animated Background Orb */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700`} />

                {/* Decorative Top Line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.gradient} p-2.5 mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Value */}
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1.5 tracking-tight leading-none`}>
                    {stat.value}
                  </div>

                  {/* Divider */}
                  <div className={`h-0.5 w-10 bg-gradient-to-r ${stat.gradient} rounded-full mb-3 group-hover:w-full transition-all duration-500`} />

                  {/* Label */}
                  <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug">
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
