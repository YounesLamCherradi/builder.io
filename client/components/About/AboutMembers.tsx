interface AboutMembersProps {
  t: (key: string) => string;
}

export function AboutMembers({ t }: AboutMembersProps) {
  const memberStats = [
    {
      count: '+20',
      title: 'Members Executive Committee',
      icon: '👤',
      gradient: 'from-brand-red to-red-600',
      bg: 'from-brand-red/5 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/30',
    },
    {
      count: '+220',
      title: 'Members General Council',
      icon: '👥',
      gradient: 'from-gray-900 to-gray-700',
      bg: 'from-gray-900/5 to-gray-700/5',
      border: 'from-gray-900/30 to-gray-700/30',
    },
  ];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title - Compact */}
        <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            Our Members
          </h2>
          <div className="h-0.5 w-14 bg-gradient-to-r from-brand-red to-red-600 rounded-full" />
        </div>

        {/* Members Stats - Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {memberStats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card */}
              <div className={`relative rounded-xl backdrop-blur-md bg-gradient-to-br ${stat.bg} border border-gray-300 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1`}>

                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient}`} />

                <div className="relative z-10 flex items-start gap-3">
                  {/* Icon */}
                  <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.gradient} text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    {/* Count */}
                    <p className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent leading-none mb-0.5`}>
                      {stat.count}
                    </p>

                    {/* Title */}
                    <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">
                      {stat.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
