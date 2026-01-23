interface AboutMembersProps {
  t: (key: string) => string;
}

export function AboutMembers({ t }: AboutMembersProps) {
  const memberStats = [
    {
      title: 'Executive Committee',
      count: '+20 Members',
      icon: '👥',
    },
    {
      title: 'General Council',
      count: '+220 Members',
      icon: '🌍',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="border-l-4 border-brand-red pl-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Members
          </h2>
        </div>

        {/* Members Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {memberStats.map((stat, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{stat.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.count}
                  </h3>
                  <p className="text-gray-600 font-semibold">{stat.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Members List Note */}
        <div className="bg-gradient-to-r from-brand-red/5 to-gray-100/10 rounded-2xl border-2 border-brand-red/20 p-8 sm:p-10">
          <p className="text-gray-700 font-semibold">
            View the complete list of our members by scrolling through the members section below.
          </p>
        </div>
      </div>
    </section>
  );
}
