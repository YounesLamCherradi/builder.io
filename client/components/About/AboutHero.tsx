import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AboutHeroProps {
  t: (key: string) => string;
}

export function AboutHero({ t }: AboutHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10">
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

      {/* Statistics Section */}
      <AboutStats t={t} />
    </section>
  );
}

interface AboutStatsProps {
  t: (key: string) => string;
}

function AboutStats({ t }: AboutStatsProps) {
  const stats = [
    {
      value: '50K+',
      label: t('about_achievements_1_desc'),
      color: 'from-brand-red/10',
      borderColor: 'border-brand-red/30',
      hoverBorderColor: 'hover:border-brand-red/60',
      textColor: 'text-transparent bg-gradient-to-r from-brand-red to-red-700',
      bgColor: 'bg-brand-red/5',
      delay: 'duration-700',
    },
    {
      value: '150+',
      label: t('about_achievements_2_desc'),
      color: 'from-blue-50/50',
      borderColor: 'border-blue-200/50',
      hoverBorderColor: 'hover:border-blue-400/50',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100/30',
      delay: 'duration-700 delay-100',
    },
    {
      value: '95%',
      label: t('about_achievements_4_desc'),
      color: 'from-green-50/50',
      borderColor: 'border-green-200/50',
      hoverBorderColor: 'hover:border-green-400/50',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100/30',
      delay: 'duration-700 delay-200',
    },
    {
      value: '24/7',
      label: t('stat_support'),
      color: 'from-purple-50/50',
      borderColor: 'border-purple-200/50',
      hoverBorderColor: 'hover:border-purple-400/50',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-100/30',
      delay: 'duration-700 delay-300',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 pt-12 sm:pt-16 lg:pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="group animate-in fade-in slide-in-from-bottom-4">
            <div className={`relative h-full rounded-2xl bg-gradient-to-br ${stat.color} to-white border ${stat.borderColor} ${stat.hoverBorderColor} p-6 sm:p-8 hover:shadow-xl transition-all overflow-hidden`}>
              {/* Decorative background */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgColor} rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative z-10">
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${stat.textColor === 'text-transparent bg-gradient-to-r from-brand-red to-red-700' ? 'bg-gradient-to-r from-brand-red to-red-700 bg-clip-text text-transparent' : stat.textColor} mb-3`}>
                  {stat.value}
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-semibold">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
