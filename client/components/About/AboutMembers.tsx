interface AboutMembersProps {
  t: (key: string) => string;
}

export function AboutMembers({ t }: AboutMembersProps) {
  const memberStats = [
    {
      count: '+20',
      title: 'Executive Committee',
      subtitle: 'Leadership & Strategy',
      gradient: 'from-brand-red to-red-700',
      bg: 'from-brand-red/8 to-red-100/5',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      ),
    },
    {
      count: '+220',
      title: 'General Council',
      subtitle: 'Active Members',
      gradient: 'from-gray-700 to-gray-900',
      bg: 'from-gray-700/8 to-gray-900/5',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 11.93a.75.75 0 0 1 1.07.25A5.977 5.977 0 0 1 17 15.5a.75.75 0 1 1-1.5 0 4.477 4.477 0 0 0-3.53-4.32.75.75 0 0 1 .24-1.07zM5.5 15.5a5.977 5.977 0 0 1 3.9-5.57.75.75 0 1 0-.24-1.07A7.477 7.477 0 0 0 4 15.5a.75.75 0 1 0 1.5 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-gray-900/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-8 sm:mb-10 animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75A2.75 2.75 0 0 0 3 4.25v11A2.75 2.75 0 0 0 5.75 18h8.5A2.75 2.75 0 0 0 17 15.25v-11A2.75 2.75 0 0 0 14.25 1.5h-3.75m0 3h.01m-2.5 0h.01m5 0h.01m-7.5 4h10m-10 3h10" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Our Members
            </h2>
          </div>
          <div className="h-0.5 w-16 bg-gradient-to-r from-brand-red to-red-700 rounded-full" />
        </div>

        {/* Members Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {memberStats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card */}
              <div className={`relative rounded-2xl bg-gradient-to-br ${stat.bg} border border-gray-200 p-5 sm:p-6 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1`}>

                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

                {/* Background glow */}
                <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-700`} />

                <div className="relative z-10 space-y-4">
                  {/* Icon and Count */}
                  <div className="flex items-start justify-between">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <p className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent leading-none text-right`}>
                      {stat.count}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-0.5 bg-gradient-to-r ${stat.gradient} rounded-full opacity-50`} />

                  {/* Content */}
                  <div className="space-y-1">
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      {stat.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">
                      {stat.subtitle}
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
