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

          <div className="p-8 sm:p-12 lg:p-16">
            {/* Section Title with Icon */}
            <div className="flex items-start gap-4 sm:gap-6 mb-10">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-red to-red-600">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                  Introduction
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-brand-red to-red-600 rounded-full" />
              </div>
            </div>

            {/* Content with better typography */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-red/20 text-brand-red font-bold text-sm">•</span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                  The National Committee of Morocco of the <span className="font-bold text-brand-red">World Youth Festival (WYF Morocco)</span> is an International Russian Youth Network created for the first time within the World Youth Festival 2024 in Sochi according to the Instructions of Russian President Vladimir Putin on developing the work and the legacy of the festival.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-900/20 text-gray-900 font-bold text-sm">•</span>
                </div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                  Currently our committee is considered as the <span className="font-bold text-gray-900">largest Russian youth network in Africa</span>, reaching millions of Youth in Morocco and beyond and providing hundreds of opportunities through an emerging wide network of members and partners.
                </p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="mt-12 pt-8 border-t-2 border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-brand-red to-red-600 bg-clip-text text-transparent">2024</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-2">Year Founded</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">∞</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-2">Growing Impact</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-brand-red to-gray-900 bg-clip-text text-transparent">Africa</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-2">Our Base</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
