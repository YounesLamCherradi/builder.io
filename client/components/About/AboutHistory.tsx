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
      color: 'from-gray-700 to-gray-900',
      bg: 'from-gray-50 to-gray-100',
      border: 'from-gray-300 to-gray-400',
    },
    {
      year: '1957',
      title: 'The First World Youth Festival',
      description: 'Moscow hosted the World Festival of 1957, which became the largest in the history of the festival movement with 34,000 people participating from 130+ countries including Morocco and other African Nations.',
      icon: '🎉',
      color: 'from-brand-red to-red-700',
      bg: 'from-brand-red/10 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/20',
    },
    {
      year: '2017',
      title: 'Festival Relocation',
      description: 'Moscow hosted the Festival in Sochi before starting the new version of the World Youth Festival in 2024.',
      icon: '🌍',
      color: 'from-gray-600 to-gray-800',
      bg: 'from-gray-50 to-gray-100',
      border: 'from-gray-300 to-gray-400',
    },
    {
      year: '2024',
      title: 'The New Era Begins',
      description: 'By decree of the President of the Russian Federation, the largest World Youth Festival was held on the federal territory "Sirius", from March 1 to 7, 2024, under the motto "Let\'s start the future together!"',
      icon: '✨',
      color: 'from-brand-red to-red-700',
      bg: 'from-brand-red/10 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/20',
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
        <div className="mb-10 animate-in fade-in slide-in-from-top-6 duration-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            WYF, a long history since 1957!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            World Youth Festival started originally many decades ago
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative group">
          {/* Horizontal Timeline Line */}
          <div className="absolute left-0 right-0 top-7 h-1 bg-gradient-to-r from-brand-red via-gray-900 to-brand-red opacity-20 z-0" />

          {/* Timeline Container - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 sm:gap-4 pb-2 min-w-min">
              {historyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 animate-in fade-in slide-in-from-bottom-6 duration-700"
                  style={{ animationDelay: `${idx * 100}ms`, width: '320px' }}
                >
                  {/* Timeline Connector - Vertical line from dot to card */}
                  <div className="flex flex-col items-center">
                    {/* Timeline Dot */}
                    <div className="relative z-10 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${point.color} text-white font-bold text-2xl shadow-lg ring-4 ring-white`}>
                        {point.icon}
                      </div>
                    </div>

                    {/* Connector line from dot to card */}
                    <div className="w-0.5 h-2 bg-gradient-to-b from-gray-400 to-transparent" />

                    {/* Content Card */}
                    <div className={`relative w-full rounded-xl backdrop-blur-sm bg-gradient-to-br ${point.bg} border border-gray-300 p-4 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col h-full`}>
                      {/* Decorative top bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${point.color}`} />

                      <div className="relative z-10 flex-grow flex flex-col">
                        {/* Year Badge */}
                        <div className={`inline-flex items-center gap-1 bg-gradient-to-r ${point.color} text-white px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 w-fit`}>
                          {point.year}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                          {point.title}
                        </h3>

                        {/* Divider */}
                        <div className={`h-0.5 w-6 bg-gradient-to-r ${point.color} rounded-full mb-2`} />

                        {/* Description */}
                        <p className="text-gray-700 leading-snug text-xs flex-grow">
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
        <div className="mt-10 relative animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '400ms' }}>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-red to-red-700 border-2 border-brand-red/20">
            {/* Content */}
            <div className="relative px-6 sm:px-8 py-6 sm:py-8 text-white">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">🎊</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    Within this festival, WYF Morocco was officially created!
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    The main idea was to unite countries to create a multipolar world based on the principles of justice and equality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
