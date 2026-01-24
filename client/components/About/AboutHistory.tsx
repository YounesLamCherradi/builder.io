interface AboutHistoryProps {
  t: (key: string) => string;
}

export function AboutHistory({ t }: AboutHistoryProps) {
  const historyPoints = [
    {
      year: t('history_1945_year'),
      title: t('history_1945_title'),
      description: t('history_1945_desc'),
      number: '1',
      color: 'from-gray-700 to-gray-900',
      bg: 'from-gray-50 to-gray-100',
      border: 'from-gray-300 to-gray-400',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fc6c2bf3b2f5d4abdaa10db27bc5ad81c?format=webp&width=800&height=1200',
    },
    {
      year: t('history_1957_year'),
      title: t('history_1957_title'),
      description: t('history_1957_desc'),
      number: '2',
      color: 'from-brand-red to-red-700',
      bg: 'from-brand-red/10 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/20',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F53096ecbc5164b5f8396f908b5ccec06?format=webp&width=800&height=1200',
    },
    {
      year: t('history_2017_year'),
      title: t('history_2017_title'),
      description: t('history_2017_desc'),
      number: '3',
      color: 'from-gray-600 to-gray-800',
      bg: 'from-gray-50 to-gray-100',
      border: 'from-gray-300 to-gray-400',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F0361737ffc9545eeb55e8ac90d38391d?format=webp&width=800&height=1200',
    },
    {
      year: t('history_2024_year'),
      title: t('history_2024_title'),
      description: t('history_2024_desc'),
      number: '4',
      color: 'from-brand-red to-red-700',
      bg: 'from-brand-red/10 to-red-100/5',
      border: 'from-brand-red/30 to-red-300/20',
      image: 'https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fd7d74058a9ce46a0916900244fcd45d5?format=webp&width=800&height=1200',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F59dc7109e391432d9e680e18ef48c9eb?format=webp&width=800&height=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.06,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/30" />

      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-8 sm:mb-10 animate-in fade-in slide-in-from-top-6 duration-700">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            WYF, a long history since 1957!
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
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
                  style={{ animationDelay: `${idx * 100}ms`, minWidth: '280px', maxWidth: '280px' }}
                >
                  {/* Timeline Connector - Vertical line from dot to card */}
                  <div className="flex flex-col items-center">
                    {/* Timeline Dot */}
                    <div className="relative z-10 mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${point.color} text-white font-bold text-xl shadow-lg ring-4 ring-white`}>
                        {point.number}
                      </div>
                    </div>

                    {/* Connector line from dot to card */}
                    <div className="w-0.5 h-2 bg-gradient-to-b from-gray-400 to-transparent" />

                    {/* Content Card */}
                    <div className={`relative w-full rounded-xl backdrop-blur-sm bg-gradient-to-br ${point.bg} border border-gray-300 p-0 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col h-full`}>
                      {/* Decorative top bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${point.color} z-20`} />

                      {/* Image if available */}
                      {point.image && (
                        <div className="relative h-28 sm:h-32 overflow-hidden bg-gray-200">
                          <img
                            src={point.image}
                            alt={point.year}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        </div>
                      )}

                      <div className="relative z-10 flex-grow flex flex-col p-4">
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
        <div className="mt-8 relative animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '400ms' }}>
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-brand-red to-red-700 border border-brand-red/30">
            {/* Content */}
            <div className="relative px-5 sm:px-6 py-5 sm:py-6 text-white">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold mb-1">
                    Within this festival, WYF Morocco was officially created!
                  </h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
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
