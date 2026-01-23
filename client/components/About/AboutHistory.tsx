interface AboutHistoryProps {
  t: (key: string) => string;
}

export function AboutHistory({ t }: AboutHistoryProps) {
  const historyPoints = [
    {
      year: '1945',
      title: 'A World Conference for Peace',
      description: 'After the end of World War II, a world conference of youth for peace was held in London, where a decision was made to begin holding world festivals of youth and students.',
      icon: '🕊️',
      color: 'from-blue-500 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50',
      border: 'from-blue-300 to-cyan-300',
    },
    {
      year: '1957',
      title: 'The First World Youth Festival',
      description: 'Moscow hosted the World Festival of 1957, which became the largest in the history of the festival movement with 34,000 people participating from 130+ countries including Morocco and other African Nations.',
      icon: '🎉',
      color: 'from-brand-red to-red-600',
      bg: 'from-brand-red/50 to-red-100/50',
      border: 'from-brand-red/40 to-red-400/40',
    },
    {
      year: '2017',
      title: 'Festival Relocation',
      description: 'Moscow hosted the Festival in Sochi before starting the new version of the World Youth Festival in 2024.',
      icon: '🌍',
      color: 'from-emerald-500 to-teal-500',
      bg: 'from-emerald-50 to-teal-50',
      border: 'from-emerald-300 to-teal-300',
    },
    {
      year: '2024',
      title: 'The New Era Begins',
      description: 'By decree of the President of the Russian Federation, the largest World Youth Festival was held on the federal territory "Sirius", from March 1 to 7, 2024, under the motto "Let\'s start the future together!"',
      icon: '✨',
      color: 'from-amber-500 to-orange-600',
      bg: 'from-amber-50 to-orange-50',
      border: 'from-amber-300 to-orange-400',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gray-900/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-red to-red-600">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                WYF, a long history since 1957!
              </h2>
              <p className="text-gray-600 font-semibold text-base sm:text-lg">
                World Youth Festival started originally many decades ago
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative group">
          {/* Horizontal Timeline Line */}
          <div className="absolute left-0 right-0 top-7 h-1 bg-gradient-to-r from-brand-red via-gray-900 to-brand-red opacity-20 z-0" />

          {/* Timeline Container - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 sm:gap-6 pb-4 min-w-min">
              {historyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${idx * 100}ms`, width: '320px' }}
                >
                  {/* Timeline Connector - Vertical line from dot to card */}
                  <div className="flex flex-col items-center">
                    {/* Timeline Dot */}
                    <div className="relative z-10 mb-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${point.color} text-white font-bold text-3xl shadow-xl ring-4 ring-white`}>
                        {point.icon}
                      </div>
                    </div>

                    {/* Connector line from dot to card */}
                    <div className="w-1 h-3 bg-gradient-to-b from-gray-900 to-transparent" />

                    {/* Content Card */}
                    <div className={`relative w-full rounded-2xl backdrop-blur-sm bg-gradient-to-br ${point.bg} border-2 border-gray-200 p-5 sm:p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden flex flex-col h-full`}>
                      {/* Decorative top bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${point.color}`} />

                      {/* Background gradient accent */}
                      <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${point.color} opacity-5 rounded-full blur-xl`} />

                      <div className="relative z-10 flex-grow flex flex-col">
                        {/* Year Badge */}
                        <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${point.color} text-white px-3 py-1 rounded-full text-xs font-bold mb-3 w-fit`}>
                          <span className="text-sm">📅</span>
                          {point.year}
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {point.title}
                        </h3>

                        {/* Divider */}
                        <div className={`h-1 w-8 bg-gradient-to-r ${point.color} rounded-full mb-3`} />

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed text-xs sm:text-sm flex-grow">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WYF Morocco Creation - Featured Box */}
        <div className="mt-16 sm:mt-20 relative animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '600ms' }}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-red-600 to-gray-900 opacity-90" />

            {/* Content */}
            <div className="relative px-8 sm:px-12 py-10 sm:py-14 text-white">
              <div className="flex items-start gap-4">
                <div className="text-4xl sm:text-5xl">🎊</div>
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Within this festival, WYF Morocco was officially created!
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    The main idea was to unite countries to create a multipolar world based on the principles of justice and equality. WYF Morocco now stands as a beacon of international youth cooperation and cultural pride.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
