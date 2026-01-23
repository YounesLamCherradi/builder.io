interface AboutIntroductionProps {
  t: (key: string) => string;
}

export function AboutIntroduction({ t }: AboutIntroductionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        <div className="space-y-8">
          {/* Section Title */}
          <div className="border-l-4 border-brand-red pl-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              The National Committee of Morocco of the World Youth Festival (WYF Morocco) is an International Russian Youth Network created for the first time within the World Youth Festival 2024 in Sochi according to the Instructions of Russian President Vladimir Putin on developing the work and the legacy of the festival.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Currently our committee is considered as the largest Russian youth network in Africa, reaching millions of Youth in Morocco and beyond and providing hundreds of opportunities through an emerging wide network of members and partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
