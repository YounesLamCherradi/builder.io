import { Target, Lightbulb, Globe, Award, Heart, Zap } from 'lucide-react';

interface AboutValuesProps {
  t: (key: string) => string;
}

export function AboutValues({ t }: AboutValuesProps) {
  return (
    <>
      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50/80 to-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            filter: 'sepia(0.2) brightness(1.15) contrast(1.2) saturate(1.1)',
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <div
              className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-700"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('about_mission_title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('about_mission_desc')}
              </p>
            </div>

            {/* Vision Card */}
            <div
              className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-700"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('about_vision_title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('about_vision_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F257d7571060a432ab27e06f12b4bd593?format=webp&width=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.15) brightness(1.15)',
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about_values_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <CoreValueCard
              icon={Globe}
              title={t('about_values_access')}
              desc={t('about_values_access_desc')}
              delay={0}
            />
            <CoreValueCard
              icon={Award}
              title={t('about_values_excellence')}
              desc={t('about_values_excellence_desc')}
              delay={1}
            />
            <CoreValueCard
              icon={Heart}
              title={t('about_values_impact')}
              desc={t('about_values_impact_desc')}
              delay={2}
            />
            <CoreValueCard
              icon={Zap}
              title={t('about_values_innovation')}
              desc={t('about_values_innovation_desc')}
              delay={3}
            />
          </div>
        </div>
      </section>
    </>
  );
}

interface CoreValueCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  delay: number;
}

function CoreValueCard({ icon: Icon, title, desc, delay }: CoreValueCardProps) {
  return (
    <div
      className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-brand-red/20 to-brand-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-gray-900 transition-all">
        <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{desc}</p>
    </div>
  );
}
