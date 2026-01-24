interface AboutIntroductionProps {
  t: (key: string) => string;
}

export function AboutIntroduction({ t }: AboutIntroductionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-brand-red via-red-600 to-gray-900" />

          <div className="p-5 sm:p-8 lg:p-12">
            {/* Section Title with Icon */}
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-red to-red-600">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {t('intro_title')}
                </h2>
                <div className="h-0.5 w-16 bg-gradient-to-r from-brand-red to-red-600 rounded-full" />
              </div>
            </div>

            {/* Content with better typography */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-brand-red/20 text-brand-red font-bold text-xs">•</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                  The National Committee of Morocco of the <span className="font-bold text-brand-red">World Youth Festival (WYF Morocco)</span> is an International Russian Youth Network created for the first time within the World Youth Festival 2024 in Sochi according to the Instructions of Russian President Vladimir Putin on developing the work and the legacy of the festival.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-900/20 text-gray-900 font-bold text-xs">•</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                  Currently our committee is considered as the <span className="font-bold text-gray-900">largest Russian youth network in Africa</span>, reaching millions of Youth in Morocco and beyond and providing hundreds of opportunities through an emerging wide network of members and partners.
                </p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-brand-red to-red-600 bg-clip-text text-transparent">2024</p>
                  <p className="text-xs text-gray-600 font-semibold mt-1">Year Founded</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">∞</p>
                  <p className="text-xs text-gray-600 font-semibold mt-1">Growing Impact</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-brand-red to-gray-900 bg-clip-text text-transparent">Africa</p>
                  <p className="text-xs text-gray-600 font-semibold mt-1">Our Base</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
