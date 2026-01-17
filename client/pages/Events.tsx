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
  ArrowRight,
  Star,
  ChevronUp,
} from 'lucide-react';

export default function Events() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  React.useEffect(() => {
    if (selectedEvent) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEvent]);

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
        free_event: 'Free',
        online_event: 'Online',
        in_person: 'In Person',
        past_events: 'Past Events Highlights',
        past_events_subtitle: 'Relive the magic - See what our students experienced',
        faq_title: 'Frequently Asked Questions',
        faq_subtitle: 'Find answers to common questions about our events',
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
        event_time: 'Event Time',
      },
      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_stories: 'Témoignages',
        nav_resources: 'Ressources',
        get_started: 'Commencer',
        events_title: 'Événements et Opportunités à Venir',
        events_subtitle: 'Rejoignez-nous pour des séminaires, ateliers et événements de réseautage',
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
        free_event: 'Gratuit',
        online_event: 'En Ligne',
        in_person: 'En Personne',
        past_events: 'Faits Marquants des Événements Passés',
        past_events_subtitle: 'Revivez la magie - Découvrez ce qu\'ont vécu nos étudiants',
        faq_title: 'Questions Fréquemment Posées',
        faq_subtitle: 'Trouvez les réponses aux questions courantes sur nos événements',
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
        event_time: 'Horaire de l\'Événement',
      },
      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_stories: 'Истории успеха',
        nav_resources: 'Ресурсы',
        get_started: 'Начать',
        events_title: 'Предстоящие События и Возможности',
        events_subtitle: 'Присоединяйтесь к нам на семинарах, мастер-классах и сетевых мероприятиях',
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
        free_event: 'Бесплатно',
        online_event: 'Онлайн',
        in_person: 'Очно',
        past_events: 'Знаковые Моменты Прошлых События',
        past_events_subtitle: 'Переживайте снова - Посмотрите, что испытали наши студенты',
        faq_title: 'Часто Задаваемые Вопросы',
        faq_subtitle: 'Найдите ответы на распространенные вопросы о наших событиях',
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
        event_time: 'Время События',
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
      description: 'Discover Chinese Government Scholarship opportunities through this comprehensive webinar.',
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
      description: 'Meet representatives from 50+ European universities and explore study abroad opportunities.',
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
      description: 'Explore internship opportunities with leading tech companies.',
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
      description: 'Comprehensive information about studying in the USA.',
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
      description: 'Discover Master\'s degree opportunities in Canada.',
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
      description: 'Learn about research funding opportunities for Moroccan scholars.',
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
      description: 'Join our new language and cultural exchange initiative.',
      details: [
        'Language exchange partnerships',
        'Cultural immersion activities',
        'Virtual and in-person meetups',
        'Partner country presentations',
      ],
      link: 'https://www.culturalexchange.ma',
    },
  ];

  const pastEvents = [
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Fulbright Alumni Success Panel 2025',
      rating: 4.9,
      attendees: '250+ Students',
    },
    {
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
      title: 'European Universities Expo 2025',
      rating: 4.8,
      attendees: '450+ Participants',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Tech Leaders Roundtable 2025',
      rating: 4.9,
      attendees: '180+ Attendees',
    },
    {
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
      title: 'Global Scholarship Workshop 2024',
      rating: 4.7,
      attendees: '380+ Students',
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      title: 'Master\'s Programs Information Day 2024',
      rating: 4.8,
      attendees: '320+ Participants',
    },
    {
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
      title: 'Cultural Exchange Gala 2024',
      rating: 5.0,
      attendees: '550+ Guests',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I register for an event?',
      answer: 'Click on any event card and hit the "Register Now" button. You\'ll need to fill in your basic information and confirm your email. Once registered, you\'ll receive all event details and reminders.',
    },
    {
      id: 2,
      question: 'Are the events really free?',
      answer: 'Most of our events are completely free! Some specialized premium workshops may have a small fee, but it\'s always clearly labeled on the event card. We believe in making quality education accessible.',
    },
    {
      id: 3,
      question: 'Can I attend online events from anywhere?',
      answer: 'Yes! Online events are accessible from anywhere in the world with an internet connection. You\'ll receive a Zoom link via email after registration. You can attend from home, office, or anywhere convenient.',
    },
    {
      id: 4,
      question: 'Do I get a certificate after attending?',
      answer: 'Certificates are provided for completed workshops and paid events. Attendance at free webinars also earns you a digital badge. Both are shareable on LinkedIn and other professional platforms.',
    },
    {
      id: 5,
      question: 'What if I can\'t make the scheduled time?',
      answer: 'Recorded versions are available for registered attendees if you miss the live session. You\'ll receive the recording link within 24 hours of the event. You\'ll still get all materials and certificates.',
    },
    {
      id: 6,
      question: 'How do I get notifications about new events?',
      answer: 'Subscribe to our newsletter using the email box in the footer! We\'ll send you curated event recommendations, early bird offers, and exclusive opportunities. You can unsubscribe anytime.',
    },
    {
      id: 7,
      question: 'Can I bring friends to in-person events?',
      answer: 'Absolutely! Friends are welcome. Each person needs their own registration to secure a spot. Group registrations are especially welcome - contact us for group discounts.',
    },
    {
      id: 8,
      question: 'What technical requirements do I need for online events?',
      answer: 'Just a device (computer, tablet, or phone) and a stable internet connection. We recommend using a desktop for the best experience. Audio and video should be enabled for interactive sessions.',
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
        return 'from-brand-red to-gray-900';
      case 'webinar':
        return 'from-brand-red to-black';
      case 'networking':
        return 'from-brand-silver to-black';
      case 'scholarship':
        return 'from-gray-800 to-black';
      default:
        return 'from-gray-600 to-gray-800';
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

  const currentEvent = events.find((e) => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="w-full px-4 sm:px-6">
          <div className="mx-auto max-w-7xl flex h-16 sm:h-18 items-center justify-between py-3">
            <Link
              to="/"
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-red via-gray-400 to-black rounded-xl flex items-center justify-center transform rotate-45">
                  <Globe className="w-5 h-5 text-white -rotate-45" />
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
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
                  className="text-gray-700 hover:text-brand-red font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 w-0 group-hover:w-full" />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/MoroccoGlobal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red to-black flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  aria-label="Join us on Telegram"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.639-17.13c.373-1.747-.678-2.572-1.887-2.06L.857 8.913c-1.713.685-1.708 1.666-.283 2.147l4.822 1.5 11.102-6.933c.523-.326 1.004-.15.623.325z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/wyfmorocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red via-brand-silver to-black flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
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
                        {currentLanguage === lang.code && <Check className="w-4 h-4 text-brand-red" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-5 py-2 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
          <div className="md:hidden fixed inset-0 z-50 top-16 pt-0">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm top-16"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-16 right-0 h-[calc(100vh-64px)] w-[88%] max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-red via-gray-400 to-black rounded-xl flex items-center justify-center transform rotate-45">
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
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-700" />
                    <span className="text-sm text-gray-700">Language</span>
                  </div>
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

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

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://t.me/MoroccoGlobal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.042 0-.084 0-.127-.01l.214-3.053 5.56-5.023c.242-.213-.054-.328-.375-.115L6.871 12.93l-2.99-.924c-1.294-.403-1.319-1.374.268-2.042l11.953-4.602c.55-.213 1.075.124.892.943z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-800">Telegram</span>
                  </a>
                  <a
                    href="https://www.instagram.com/wyfmorocco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c2.687 0 3.014.01 4.077.059 1.044.048 1.606.22 1.985.365.498.194.854.425 1.227.796.371.371.602.729.796 1.227.145.379.317.941.365 1.985.049 1.063.06 1.39.06 4.077s-.01 3.014-.059 4.077c-.048 1.044-.22 1.606-.365 1.985-.194.498-.425.854-.796 1.227-.371.371-.729.602-1.227.796-.379.145-.941.317-1.985.365-1.063.049-1.39.06-4.077.06s-3.014-.01-4.077-.059c-1.044-.048-1.606-.22-1.985-.365-.498-.194-.854-.425-1.227-.796-.371-.371-.602-.729-.796-1.227-.145-.379-.317-.941-.365-1.985-.049-1.063-.06-1.39-.06-4.077s.01-3.014.059-4.077c.048-1.044.22-1.606.365-1.985.194-.498.425-.854.796-1.227.371-.371.729-.602 1.227-.796.379-.145.941-.317 1.985-.365 1.063-.049 1.39-.06 4.077-.06z"/>
                      <circle cx="12" cy="12" r="3.471"/>
                      <circle cx="18.406" cy="5.594" r="0.813"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-800">Instagram</span>
                  </a>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-white">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold shadow-lg">
                  {t('get_started')}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-white">
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
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">{t('events_title').split(' ').slice(0, 2).join(' ')}</span>
              <br />
              <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
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
      <section className="py-12 sm:py-16 bg-white sticky top-16 z-30 shadow-sm">
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
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-brand-red to-gray-900 text-white shadow-lg scale-105'
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
            {filteredEvents.map((event, idx) => (
              <div
                key={event.id}
                className="group cursor-pointer relative h-full animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  onClick={() => setSelectedEvent(event.id)}
                  className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col transform hover:scale-[1.02]"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${getTypeColor(event.type)} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
                      {getTypeLabel(event.type)}
                    </div>
                    {event.price === 'free' && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-brand-red text-xs sm:text-sm font-bold rounded-full shadow-lg">
                        {t('free_event')}
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-red transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-brand-red shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString(currentLanguage)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-brand-red shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-brand-red shrink-0" />
                        <span>
                          {event.spotsLeft > 0
                            ? `${event.spotsLeft} ${t('spots_left')}`
                            : t('event_full')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-2 sm:gap-3">
                      {event.spotsLeft > 0 ? (
                        <button
                          onClick={() => setSelectedEvent(event.id)}
                          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-brand-red to-black text-white rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                          {t('view_details')}
                        </button>
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

      {/* Past Events Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('past_events')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('past_events_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transform hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(event.rating)
                            ? 'fill-brand-red text-brand-red'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-brand-red ml-1 font-semibold">{event.rating}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-200 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.attendees}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            {t('faq_title')} ❓
          </h2>
          <p className="text-gray-600 text-center mb-12">{t('faq_subtitle')}</p>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-red-500 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${faq.id * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-gray-900 text-left">{faq.question}</h3>
                  <ChevronUp
                    className={`w-5 h-5 text-brand-red transition-transform duration-300 ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && currentEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>

            <div>
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-6 right-6 px-4 py-2 bg-gradient-to-r ${getTypeColor(currentEvent.type)} text-white text-sm sm:text-base font-semibold rounded-full shadow-lg`}>
                  {getTypeLabel(currentEvent.type)}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {currentEvent.title}
                </h1>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-brand-red/10 to-brand-red/20 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-brand-red" />
                      <span className="text-sm text-gray-600">{t('date')}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(currentEvent.date).toLocaleDateString(currentLanguage)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-brand-red" />
                      <span className="text-sm text-gray-600">{t('event_time')}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {currentEvent.time}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-brand-silver/20 to-brand-silver/40 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-black" />
                      <span className="text-sm text-gray-600">{t('location')}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {currentEvent.location}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-brand-red" />
                      <span className="text-sm text-gray-600">Attendees</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {currentEvent.attendees}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    About This Event
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {currentEvent.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    What to Expect
                  </h2>
                  <div className="space-y-3">
                    {currentEvent.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {currentEvent.spotsLeft > 0 ? (
                    <>
                      <button className="flex-1 py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform active:scale-95">
                        {t('register')}
                      </button>
                      <a
                        href={currentEvent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-gray-100 text-gray-800 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2"
                      >
                        <span>{t('learn_more')}</span>
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </>
                  ) : (
                    <button disabled className="w-full py-4 bg-gray-300 text-gray-600 rounded-xl font-bold text-lg cursor-not-allowed">
                      {t('event_full')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 text-gray-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#dc2626_1px,transparent_1px)] bg-[length:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#10b981_1px,transparent_1px)] bg-[length:80px_80px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-brand-silver/40 p-6 sm:p-8 md:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Stay Updated with{' '}
                  <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
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
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:min-w-[180px]"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-red via-gray-400 to-black rounded-2xl flex items-center justify-center transform rotate-12 shadow-xl">
                    <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-white -rotate-12" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-brand-silver" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                    MoroccoGlobal
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">Your World Awaits</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-7 sm:mb-8 max-w-md text-sm sm:text-base">
                {t('footer_tagline')}
              </p>
            </div>

            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t('platform')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('scholarships')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('jobs')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
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
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('about_us')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('contact')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
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
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('privacy')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('terms')}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('cookies')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-brand-silver/40 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <p>{t('rights')}</p>
              <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2">
                <span>Made with ❤️ in Morocco</span>
                <a href="#" className="hover:text-brand-red transition-colors">
                  Sitemap
                </a>
                <span>v1.0.0 • 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
