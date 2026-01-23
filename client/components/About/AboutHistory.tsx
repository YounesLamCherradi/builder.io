interface AboutHistoryProps {
  t: (key: string) => string;
}

export function AboutHistory({ t }: AboutHistoryProps) {
  const historyPoints = [
    {
      year: '1945',
      title: 'A World Conference for Peace',
      description: 'After the end of World War II, a world conference of youth for peace was held in London, where a decision was made to begin holding world festivals of youth and students.',
    },
    {
      year: '1957',
      title: 'The First World Youth Festival',
      description: 'Moscow hosted the World Festival of 1957, which became the largest in the history of the festival movement with 34,000 people participating from 130+ countries including Morocco and other African Nations.',
    },
    {
      year: '2017',
      title: 'Festival Relocation',
      description: 'Moscow hosted the Festival in Sochi before starting the new version of the World Youth Festival in 2024.',
    },
    {
      year: '2024',
      title: 'The New Era Begins',
      description: 'By decree of the President of the Russian Federation, the largest World Youth Festival was held on the federal territory "Sirius", from March 1 to 7, 2024, under the motto "Let\'s start the future together!"',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="border-l-4 border-brand-red pl-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            WYF, a long history since 1957!
          </h2>
          <p className="text-gray-600 font-semibold">
            World Youth Festival started originally many decades ago
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8 sm:space-y-10">
          {historyPoints.map((point, idx) => (
            <div
              key={idx}
              className="relative animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Timeline line (not for last item) */}
              {idx !== historyPoints.length - 1 && (
                <div className="absolute left-0 sm:left-6 top-20 h-8 w-0.5 bg-gradient-to-b from-brand-red to-brand-red/30" />
              )}

              {/* Timeline dot and content */}
              <div className="flex gap-4 sm:gap-8">
                {/* Dot */}
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-red-600 text-white font-bold text-lg shadow-lg">
                    {point.year.slice(-2)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow pb-8">
                  <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-red p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                          {point.title}
                        </h3>
                        <p className="text-brand-red font-bold text-sm sm:text-base">
                          {point.year}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WYF Morocco Creation */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-10 bg-gradient-to-r from-brand-red/10 via-gray-50 to-white rounded-2xl border-2 border-brand-red/30">
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            Within this festival, WYF Morocco was officially created!
          </p>
          <p className="text-gray-700 mt-3 leading-relaxed">
            The main idea was to unite countries to create a multipolar world based on the principles of justice and equality.
          </p>
        </div>
      </div>
    </section>
  );
}
