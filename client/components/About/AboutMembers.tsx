interface AboutMembersProps {
  t: (key: string) => string;
}

export function AboutMembers({ t }: AboutMembersProps) {
  const memberStats = [
    {
      count: '+20',
      title: t('members_exec_title'),
      subtitle: t('members_exec_subtitle'),
      isRed: true,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      ),
    },
    {
      count: '+220',
      title: t('members_council_title'),
      subtitle: t('members_council_subtitle'),
      isRed: false,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 11.93a.75.75 0 0 1 1.07.25A5.977 5.977 0 0 1 17 15.5a.75.75 0 1 1-1.5 0 4.477 4.477 0 0 0-3.53-4.32.75.75 0 0 1 .24-1.07zM5.5 15.5a5.977 5.977 0 0 1 3.9-5.57.75.75 0 1 0-.24-1.07A7.477 7.477 0 0 0 4 15.5a.75.75 0 1 0 1.5 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-7 sm:mb-9 animate-in fade-in slide-in-from-top-6 duration-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
            Our Members
          </h2>
          <div className="h-0.5 w-12 bg-brand-red rounded-full" />
        </div>

        {/* Members Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {memberStats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card */}
              <div className={`relative rounded-xl bg-white border transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-0.5 overflow-hidden ${
                stat.isRed
                  ? 'border-brand-red/20 hover:border-brand-red/40'
                  : 'border-gray-200 hover:border-gray-900/30'
              }`}>

                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  stat.isRed ? 'bg-brand-red' : 'bg-gray-900'
                }`} />

                <div className="relative z-10 p-4 sm:p-5">
                  {/* Icon and Count Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-white group-hover:scale-110 transition-transform duration-300 ${
                      stat.isRed
                        ? 'bg-brand-red'
                        : 'bg-gray-900'
                    }`}>
                      {stat.icon}
                    </div>
                    <p className={`text-2xl sm:text-3xl font-black leading-none ${
                      stat.isRed
                        ? 'text-brand-red'
                        : 'text-gray-900'
                    }`}>
                      {stat.count}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`h-0.5 w-8 rounded-full mb-3 ${
                    stat.isRed ? 'bg-brand-red/40' : 'bg-gray-900/30'
                  }`} />

                  {/* Content */}
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-gray-900">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
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
