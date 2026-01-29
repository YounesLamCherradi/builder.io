interface AboutStoryProps {
  t: (key: string) => string;
}

export function AboutStory({ t }: AboutStoryProps) {
  return (
    <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="inline-block animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full border border-brand-red/30">
                {t('about_story_title')}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
              {t('about_story_title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
              {t('about_story_desc')}
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium bg-gradient-to-r from-brand-red/10 via-gray-50 to-transparent p-6 rounded-2xl border-l-4 border-brand-red animate-in fade-in slide-in-from-left-10 duration-700 delay-300">
              {t('about_story_highlight')}
            </p>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 animate-in fade-in zoom-in-50 duration-700 delay-200">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800"
              alt="Global representation with Moroccan flag"
              className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full h-auto"
            />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
