interface AboutMembersProps {
  t: (key: string) => string;
}

export function AboutMembers({ t }: AboutMembersProps) {
  const memberStats = [
    {
      title: 'Executive Committee',
      count: '+20',
      label: 'Members',
      icon: '👤',
      gradient: 'from-brand-red to-red-600',
      bg: 'from-brand-red/5 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/30',
    },
    {
      title: 'General Council',
      count: '+220',
      label: 'Members',
      icon: '👥',
      gradient: 'from-gray-900 to-gray-700',
      bg: 'from-gray-900/5 to-gray-700/5',
      border: 'from-gray-900/30 to-gray-700/30',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-red to-red-600">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Our Members
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-brand-red to-red-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Members Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12">
          {memberStats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Card with gradient background */}
              <div className={`relative h-full rounded-3xl backdrop-blur-md bg-gradient-to-br ${stat.bg} border-2 bg-gradient-to-br ${stat.border} p-8 sm:p-10 lg:p-12 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3`}>

                {/* Animated background orb */}
                <div className={`absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-all duration-700`} />

                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 space-y-4">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {stat.title}
                  </h3>

                  {/* Divider */}
                  <div className={`h-1 w-12 bg-gradient-to-r ${stat.gradient} rounded-full`} />

                  {/* Count with large styling */}
                  <div className="space-y-2">
                    <p className={`text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent leading-none`}>
                      {stat.count}
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-gray-600">
                      {stat.label}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 pt-2">
                    {stat.title === 'Executive Committee'
                      ? 'Leading strategic initiatives'
                      : 'Supporting our mission globally'}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          ))}
        </div>

        {/* Information Box */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: '300ms' }}>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-red text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-gray-700 font-semibold leading-relaxed">
                Explore the complete list of our dedicated members by scrolling through the members section below. Each member brings valuable expertise and commitment to our mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
