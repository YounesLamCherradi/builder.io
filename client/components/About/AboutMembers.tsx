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
              <div className={`relative rounded-2xl backdrop-blur-md bg-gradient-to-br ${stat.bg} border-2 bg-gradient-to-br ${stat.border} p-6 sm:p-7 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2`}>

                {/* Animated background orb */}
                <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700`} />

                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    {/* Count */}
                    <p className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent leading-none mb-1`}>
                      {stat.count}
                    </p>

                    {/* Title */}
                    <p className="text-sm sm:text-base font-bold text-gray-800 leading-snug">
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
