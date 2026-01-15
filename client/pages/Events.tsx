import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Check,
} from 'lucide-react';

export default function Events() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const onClick = (e) => {
      const el = e.target?.closest?.('[data-lang-menu]');
      if (!el) setLanguageMenuOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  React.useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const I18N = useMemo(
    () => ({
      en: {
        nav_home: 'Home',
        nav_events: 'Events',
        nav_stories: 'Success Stories',
        nav_resources: 'Team',
        get_started: 'Get Started',
        events_title: 'Upcoming Events & Opportunities',
        events_subtitle: 'Join us for seminars, workshops, and networking events designed to accelerate your global journey',
        filter_all: 'All Events',
        filter_scholarship: 'Scholarships',
        filter_webinar: 'Webinars',
        filter_workshop: 'Workshops',
        filter_networking: 'Networking',
        date: 'Date',
        location: 'Location',
        attendees: 'Attendees',
        learn_more: 'Learn More',
        register: 'Register Now',
        view_details: 'View Details',
        event_full: 'Registration Full',
        spots_left: 'spots left',
        register_early: 'Register Early',
        free_event: 'Free',
        paid_event: 'Paid',
        online_event: 'Online',
        in_person: 'In Person',
        footer_tagline: 'Empowering Moroccans to achieve their global dreams.',
        platform: 'Platform',
        company: 'Company',
        legal: 'Legal',
        scholarships: 'Scholarships',
        jobs: 'Jobs',
        programs: 'Programs',
        about_us: 'About Us',
        contact: 'Contact',
        careers: 'Careers',
        blog: 'Blog',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
        rights: '© 2026 MoroccoGlobal. All rights reserved.',
      },
      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_stories: 'Témoignages',
        nav_resources: 'Ressources',
        get_started: 'Commencer',
        events_title: 'Événements et Opportunités à Venir',
        events_subtitle: 'Rejoignez-nous pour des séminaires, ateliers et événements de réseautage conçus pour accélérer votre parcours mondial',
        filter_all: 'Tous les Événements',
        filter_scholarship: 'Bourses',
        filter_webinar: 'Webinaires',
        filter_workshop: 'Ateliers',
        filter_networking: 'Réseautage',
        date: 'Date',
        location: 'Lieu',
        attendees: 'Participants',
        learn_more: 'En Savoir Plus',
        register: 'S\'inscrire',
        view_details: 'Voir les Détails',
        event_full: 'Inscription Complète',
        spots_left: 'places restantes',
        register_early: 'S\'inscrire Tôt',
        free_event: 'Gratuit',
        paid_event: 'Payant',
        online_event: 'En Ligne',
        in_person: 'En Personne',
        footer_tagline: 'Aider les Marocains à réaliser leurs rêves.',
        platform: 'Plateforme',
        company: 'Entreprise',
        legal: 'Légal',
        scholarships: 'Bourses',
        jobs: 'Emplois',
        programs: 'Programmes',
        about_us: 'À propos',
        contact: 'Contact',
        careers: 'Carrières',
        blog: 'Blog',
        privacy: 'Confidentialité',
        terms: "Conditions d'utilisation",
        cookies: 'Cookies',
        rights: '© 2026 MoroccoGlobal. Tous droits réservés.',
      },
      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_stories: 'Истории успеха',
        nav_resources: 'Ресурсы',
        get_started: 'Начать',
        events_title: 'Предстоящие События и Возможности',
        events_subtitle: 'Присоединяйтесь к нам на семинарах, мастер-классах и сетевых мероприятиях, разработанных для ускорения вашего глобального пути',
        filter_all: 'Все События',
        filter_scholarship: 'Стипендии',
        filter_webinar: 'Вебинары',
        filter_workshop: 'Мастер-классы',
        filter_networking: 'Сетевое Взаимодействие',
        date: 'Дата',
        location: 'Место',
        attendees: 'Участники',
        learn_more: 'Узнать Больше',
        register: 'Зарегистрироваться',
        view_details: 'Посмотреть Детали',
        event_full: 'Регистрация Завершена',
        spots_left: 'мест осталось',
        register_early: 'Зарегистрироваться Рано',
        free_event: 'Бесплатно',
        paid_event: 'Платный',
        online_event: 'Онлайн',
        in_person: 'Очно',
        footer_tagline: 'Помогаем марокканцам достигать глобальных целей.',
        platform: 'Платформа',
        company: 'Компания',
        legal: 'Юридическое',
        scholarships: 'Стипендии',
        jobs: 'Работа',
        programs: 'Программы',
        about_us: 'О нас',
        contact: 'Контакты',
        careers: 'Карьера',
        blog: 'Блог',
        privacy: 'Конфиденциальность',
        terms: 'Условия',
        cookies: 'Cookies',
        rights: '© 2026 MoroccoGlobal. Все права защищены.',
      },
    }),
    []
  );

  const t = (key) => I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_events'), path: '/events' },
    { name: t('nav_stories'), path: '/stories' },
    { name: t('nav_resources'), path: '/resources' },
  ];

  const events = [
    {
      id: 1,
      title: 'Fulbright Scholarship Masterclass',
      type: 'workshop',
      date: '2026-02-15',
      time: '18:00 - 20:00',
      location: 'Casablanca, Morocco',
      eventType: 'in-person',
      price: 'free',
      attendees: 150,
      spotsLeft: 25,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      description: 'Learn everything about applying for Fulbright scholarships. Expert mentors from Fulbright Morocco will guide you through the application process.',
      details: [
        'Application timeline and requirements',
        'Essay writing tips from successful applicants',
        'Interview preparation and mock interviews',
        'Q&A session with Fulbright alumni',
      ],
      link: 'https://fulbright.org.ma',
    },
    {
      id: 2,
      title: 'Chinese Government Scholarships Webinar',
      type: 'webinar',
      date: '2026-02-20',
      time: '19:00 - 20:30',
      location: 'Online',
      eventType: 'online',
      price: 'free',
      attendees: 320,
      spotsLeft: 0,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
      description: 'Discover Chinese Government Scholarship opportunities through this comprehensive webinar. Learn about different scholarship types and application strategies.',
      details: [
        'Types of Chinese scholarships available',
        'University selection and ranking',
        'Visa and residence permit information',
        'Life as a student in China - Student testimonials',
      ],
      link: 'https://www.chinesescholarship.org',
    },
    {
      id: 3,
      title: 'European Study Abroad Fair',
      type: 'networking',
      date: '2026-03-01',
      time: '10:00 - 16:00',
      location: 'Rabat International Convention Center',
      eventType: 'in-person',
      price: 'free',
      attendees: 500,
      spotsLeft: 100,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      description: 'Meet representatives from 50+ European universities and explore study abroad opportunities. Network with other Moroccan students and education advisors.',
      details: [
        'Direct conversations with university representatives',
        'Financial aid and scholarship presentations',
        'Visa application process workshops',
        'Campus tour virtual sessions',
      ],
      link: 'https://www.studyabroad.eu',
    },
    {
      id: 4,
      title: 'Tech Internship Opportunities Summit',
      type: 'workshop',
      date: '2026-03-10',
      time: '17:00 - 19:00',
      location: 'Marrakech Tech Hub',
      eventType: 'in-person',
      price: 'free',
      attendees: 200,
      spotsLeft: 50,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      description: 'Explore internship opportunities with leading tech companies. Learn about application strategies and career development in the tech industry.',
      details: [
        'Top tech companies recruiting interns',
        'Resume and portfolio review',
        'Interview tips from tech professionals',
        'Networking with tech leaders',
      ],
      link: 'https://www.techjobs.ma',
    },
    {
      id: 5,
      title: 'Study in USA Information Session',
      type: 'webinar',
      date: '2026-03-15',
      time: '20:00 - 21:30',
      location: 'Online',
      eventType: 'online',
      price: 'free',
      attendees: 450,
      spotsLeft: 30,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
      description: 'Comprehensive information about studying in the USA. Covers university selection, SAT/ACT preparation, visa process, and funding options.',
      details: [
        'US University system explained',
        'SAT/ACT preparation strategies',
        'Financial aid for international students',
        'F-1 Visa requirements and procedures',
      ],
      link: 'https://www.iie.org',
    },
    {
      id: 6,
      title: 'Master\'s Programs in Canada',
      type: 'workshop',
      date: '2026-03-22',
      time: '18:00 - 19:30',
      location: 'Fez Convention Center',
      eventType: 'in-person',
      price: 'free',
      attendees: 180,
      spotsLeft: 40,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      description: 'Discover Master\'s degree opportunities in Canada. Learn about application requirements, tuition costs, and pathway to permanent residency.',
      details: [
        'Top Canadian universities and programs',
        'GRE/GMAT preparation tips',
        'Tuition costs and financial aid',
        'Post-study work permit information',
      ],
      link: 'https://www.studyincanada.ca',
    },
    {
      id: 7,
      title: 'Research Grant Opportunities Webinar',
      type: 'webinar',
      date: '2026-04-05',
      time: '19:00 - 20:00',
      location: 'Online',
      eventType: 'online',
      price: 'free',
      attendees: 280,
      spotsLeft: 15,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
      description: 'Learn about research funding opportunities for Moroccan scholars. Explore international research grants and fellowship programs.',
      details: [
        'Types of research grants available',
        'How to write a competitive grant proposal',
        'Research fellowship opportunities',
        'Case studies of successful applicants',
      ],
      link: 'https://www.researchfunding.org',
    },
    {
      id: 8,
      title: 'Language & Culture Exchange Program Launch',
      type: 'networking',
      date: '2026-04-12',
      time: '16:00 - 18:00',
      location: 'Multiple Cities (Hybrid)',
      eventType: 'online',
      price: 'free',
      attendees: 600,
      spotsLeft: 200,
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
      description: 'Join our new language and cultural exchange initiative. Connect with students from around the world and participate in cultural activities.',
      details: [
        'Language exchange partnerships',
        'Cultural immersion activities',
        'Virtual and in-person meetups',
        'Partner country presentations',
      ],
      link: 'https://www.culturalexchange.ma',
    },
  ];

  const filterOptions = ['all', 'scholarship', 'webinar', 'workshop', 'networking'];
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = events.filter((event) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'scholarship') return event.type === 'workshop' && event.title.includes('Scholarship');
    return event.type === activeFilter;
  });

  const selectedLang = languages.find((l) => l.code === currentLanguage) ?? languages[0];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'from-blue-500 to-cyan-500';
      case 'webinar':
        return 'from-purple-500 to-pink-500';
      case 'networking':
        return 'from-orange-500 to-red-500';
      case 'scholarship':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'workshop':
        return t('filter_workshop');
      case 'webinar':
        return t('filter_webinar');
      case 'networking':
        return t('filter_networking');
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar - Same as Homepage */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between py-3">
            <Link
              to="/"
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 via-amber-500 to-green-600 rounded-xl flex items-center justify-center transform rotate-45">
                  <Globe className="w-5 h-5 text-white -rotate-45" />
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                  MoroccoGlobal
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 -mt-0.5">Your World Awaits</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-600 to-green-600 transition-all duration-300 w-0 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/MoroccoGlobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  aria-label="Join us on Telegram"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.639-17.13c.373-1.747-.678-2.572-1.887-2.06L.857 8.913c-1.713.685-1.708 1.666-.283 2.147l4.822 1.5 11.102-6.933c.523-.326 1.004-.15.623.325z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/moroccoglobal_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.224.223 2.742.072 7.1.014 8.38 0 8.788 0 12s.014 3.62.072 4.9c.15 4.358 2.623 6.876 6.98 7.028 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.152 6.83-2.669 6.98-7.028.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.15-4.358-2.623-6.876-6.98-7.028C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>
              </div>

              <div className="relative" data-lang-menu>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguageMenuOpen((v) => !v);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-5 h-5 text-gray-700" />
                  <span className="text-sm">{selectedLang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{selectedLang.code.toUpperCase()}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      languageMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {languageMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span className="text-sm text-gray-800">{lang.name}</span>
                        </div>
                        {currentLanguage === lang.code && <Check className="w-4 h-4 text-green-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-5 py-2 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {t('get_started')}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute top-0 right-0 h-full w-[88%] max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-red-600 via-amber-500 to-green-600 rounded-xl flex items-center justify-center transform rotate-45">
                    <Globe className="w-4 h-4 text-white -rotate-45" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-base font-bold text-gray-900">MoroccoGlobal</div>
                    <div className="text-xs text-gray-500 -mt-0.5">Your World Awaits</div>
                  </div>
                </div>
                <button
                  className="rounded-xl p-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto">
                <div className="space-y-1">
                  {menuItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-left px-3 py-3 rounded-xl hover:bg-gray-50 text-gray-800 font-medium transition-colors block"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full font-semibold shadow-lg">
                  {t('get_started')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-gradient-to-br from-red-50 via-amber-50 to-green-50">
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{
                backgroundColor: ['#dc2626', '#f59e0b', '#10b981'][i % 3],
                width: `${Math.random() * 320 + 180}px`,
                height: `${Math.random() * 320 + 180}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${Math.random() * 8 + 6}s`,
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">{t('events_title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                {t('events_title').split(' ').slice(2).join(' ')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {t('events_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'all', label: t('filter_all') },
              { id: 'scholarship', label: t('filter_scholarship') },
              { id: 'webinar', label: t('filter_webinar') },
              { id: 'workshop', label: t('filter_workshop') },
              { id: 'networking', label: t('filter_networking') },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="text-center mt-6 text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setExpandedEventId(expandedEventId === event.id ? null : event.id)}
                className="group cursor-pointer relative h-full"
              >
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                  {/* Event Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${getTypeColor(event.type)} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg`}>
                      {getTypeLabel(event.type)}
                    </div>
                    {event.price === 'free' && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs sm:text-sm font-bold rounded-full shadow-lg">
                        {t('free_event')}
                      </div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {event.title}
                    </h3>

                    {/* Quick Info */}
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString(currentLanguage)} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-red-600 shrink-0" />
                        <span>
                          {event.spotsLeft > 0
                            ? `${event.spotsLeft} ${t('spots_left')}`
                            : t('event_full')}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {expandedEventId === event.id && (
                      <div className="border-t border-gray-200 pt-4 mb-4 space-y-3">
                        <p className="text-sm text-gray-700 leading-relaxed">{event.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-900">What to expect:</h4>
                          <ul className="space-y-1.5">
                            {event.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="mt-auto flex flex-col gap-2 sm:gap-3">
                      {event.spotsLeft > 0 ? (
                        <>
                          <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                            {t('register')}
                          </button>
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 sm:py-3 bg-gray-100 text-gray-800 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2"
                          >
                            <span>{t('learn_more')}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </>
                      ) : (
                        <button disabled className="w-full py-2.5 sm:py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold text-sm sm:text-base cursor-not-allowed">
                          {t('event_full')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Same as Homepage */}
      <footer className="bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 text-gray-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#dc2626_1px,transparent_1px)] bg-[length:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#10b981_1px,transparent_1px)] bg-[length:80px_80px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-amber-100/60 p-6 sm:p-8 md:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Stay Updated with{' '}
                  <span className="bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                    Global Opportunities
                  </span>
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Get the latest events, scholarships, and exclusive tips delivered to your inbox every month.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-800 placeholder-gray-500 shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:min-w-[180px]"
                >
                  <span>Subscribe</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>

              <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
                We respect your privacy. Unsubscribe anytime. No spam, ever.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 via-amber-500 to-green-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-xl">
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white -rotate-12" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-amber-600 to-green-600 bg-clip-text text-transparent">
                    MoroccoGlobal
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Your World Awaits</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-7 sm:mb-8 max-w-md text-sm sm:text-base">
                {t('footer_tagline')}
              </p>

              <div className="flex gap-3 sm:gap-4">
                {['Telegram', 'Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-green-100 hover:from-red-100 hover:to-amber-100 flex items-center justify-center text-gray-700 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow"
                    aria-label={platform}
                  >
                    <span className="text-lg font-medium">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t('platform')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('scholarships')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('jobs')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('programs')}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t('company')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('about_us')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('contact')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('careers')}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t('legal')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('privacy')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('terms')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-red-600 transition-colors">
                      {t('cookies')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-amber-100/60 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <p>{t('rights')}</p>
              <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2">
                <span>Made with ❤️ in Morocco</span>
                <a href="#" className="hover:text-red-600 transition-colors">
                  Sitemap
                </a>
                <span>v1.0.0 • 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
