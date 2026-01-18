import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ArrowRight,
  Sparkles,
  Users,
  BookOpen,
  Briefcase,
  Award,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Zap,
  Target,
  Check,
} from 'lucide-react';

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(index);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target?.closest?.('[data-lang-menu]');
      if (!el) setLanguageMenuOpen(false);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
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
        sign_in: 'Sign In',
        get_started: 'Get Started',

        serving: '🇲🇦 Serving 50,000+ Moroccan Students',
        hero_line1: 'Transform Your',
        hero_line2: 'Global Dreams',
        hero_line3: 'Into Reality',
        hero_desc:
          'Discover thousands of scholarships, jobs, and international programs tailored for talented Moroccans. Your passport to global success starts here.',
        explore_opps: 'Explore Opportunities',
        watch_demo: 'Watch Demo',

        stat_users: 'Active Users',
        stat_countries: 'Countries',
        stat_success: 'Success Rate',
        stat_support: 'Support',

        opps_title_1: 'Discover Your',
        opps_title_2: 'Perfect Match',
        opps_desc: 'Browse thousands of verified opportunities across multiple categories',
        explore: 'Explore',

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

        opp_scholarships: 'Scholarships',
        opp_jobs: 'Jobs & Internships',
        opp_exchange: 'Exchange Programs',
        opp_grants: 'Grants & Fellowships',
        opp_desc_sch: 'Full & partial funding',
        opp_desc_jobs: 'Global positions',
        opp_desc_ex: 'Cultural immersion',
        opp_desc_grants: 'Research funding',

        feat_match: 'Instant Matching',
        feat_match_desc: 'AI matches you with the best opportunities based on your profile in seconds',
        feat_dash: 'Personalized Dashboard',
        feat_dash_desc: 'Track applications, deadlines, and get tailored recommendations',
        feat_comm: 'Community Support',
        feat_comm_desc: "Connect with mentors and peers who've succeeded in their journey",
        feat_lib: 'Resource Library',
        feat_lib_desc: 'Access guides, templates, and tutorials for every step',
        feat_review: 'Application Review',
        feat_review_desc: 'Get expert feedback on your essays and documents',
        feat_analytics: 'Success Analytics',
        feat_analytics_desc: 'Insights on acceptance rates and competition levels',

        tagline: 'Your World Awaits',
        explore_all_opps: 'Explore All Opportunities',
        moments_of: 'Moments of',
        moroccan_success: 'Moroccan Global Success',
        made_with: 'Made with ❤️ in Morocco',
        sitemap: 'Sitemap',
        subscribe_privacy: 'We respect your privacy. Unsubscribe anytime. No spam, ever.',
        subscribe_now: 'Subscribe Now',

        morocco: 'Morocco',
        morocco_subtitle: 'Foundation Hub',
        morocco_b1: 'Local University Network',
        morocco_b2: 'Career Development Centers',
        morocco_b3: 'Student Support Services',
        morocco_b4: 'Scholarship Guidance',
        morocco_b5: 'Test Preparation Programs',
        morocco_stat: 'Students Served',

        china: 'China',
        china_subtitle: 'BRI Partnership',
        china_b1: 'Belt & Road Scholarships',
        china_b2: 'Chinese Government Grants',
        china_b3: 'Technology Exchange Programs',
        china_b4: 'Engineering Fellowships',
        china_b5: 'Cultural Integration Support',
        china_stat: 'Active Placements',

        russia: 'Russia',
        russia_subtitle: 'Federal Programs',
        russia_b1: 'Government Scholarships',
        russia_b2: 'Research Grants',
        russia_b3: 'Academic Exchange',
        russia_b4: 'Science & Innovation Focus',
        russia_b5: 'Language Training Support',
        russia_stat: 'Annual Opportunities',

        south_america: 'South America',
        sa_subtitle: 'Regional Network',
        sa_b1: 'Brazilian Partnerships',
        sa_b2: 'Argentine Universities',
        sa_b3: 'Chilean Innovation Programs',
        sa_b4: 'Cultural Exchange Initiatives',
        sa_b5: 'Spanish Language Programs',
        sa_stat: 'Growing Network',

        inspiring_text: 'Inspiring real journeys — from scholarships and exchanges to world-class achievements',
      },

      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_stories: 'Témoignages',
        nav_resources: 'Ressources',
        sign_in: 'Se connecter',
        get_started: 'Commencer',

        serving: '🇲🇦 Au service de plus de 50 000 étudiants marocains',
        hero_line1: 'Transformez vos',
        hero_line2: 'Rêves mondiaux',
        hero_line3: 'En réalité',
        hero_desc:
          "Découvrez des milliers de bourses, emplois et programmes internationaux adaptés aux talents marocains. Votre passeport vers la réussite commence ici.",
        explore_opps: 'Explorer les opportunités',
        watch_demo: 'Voir la démo',

        stat_users: 'Utilisateurs actifs',
        stat_countries: 'Pays',
        stat_success: 'Taux de réussite',
        stat_support: 'Support',

        opps_title_1: 'Trouvez votre',
        opps_title_2: 'match parfait',
        opps_desc: "Parcourez des milliers d'opportunités vérifiées dans plusieurs catégories",
        explore: 'Explorer',

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

        opp_scholarships: 'Bourses',
        opp_jobs: 'Emplois & Stages',
        opp_exchange: "Programmes d'échange",
        opp_grants: 'Subventions & Bourses',
        opp_desc_sch: 'Financement total/partiel',
        opp_desc_jobs: 'Postes internationaux',
        opp_desc_ex: 'Immersion culturelle',
        opp_desc_grants: 'Financement recherche',

        feat_match: 'Matching instantané',
        feat_match_desc: 'Une IA vous associe aux meilleures opportunités en quelques secondes',
        feat_dash: 'Tableau de bord',
        feat_dash_desc: 'Suivez candidatures, deadlines et recommandations',
        feat_comm: 'Communauté',
        feat_comm_desc: 'Connectez-vous à des mentors et à des pairs',
        feat_lib: 'Bibliothèque',
        feat_lib_desc: 'Guides, modèles et tutoriels à chaque étape',
        feat_review: 'Relecture',
        feat_review_desc: 'Retour expert sur vos essais et documents',
        feat_analytics: 'Analytique',
        feat_analytics_desc: "Insights sur les taux d'acceptation et la concurrence",

        tagline: 'Votre monde vous attend',
        explore_all_opps: 'Explorer toutes les opportunités',
        moments_of: 'Moments de',
        moroccan_success: 'Succès marocains mondiaux',
        made_with: 'Fait avec ❤️ au Maroc',
        sitemap: 'Plan du site',
        subscribe_privacy: 'Nous respectons votre vie privée. Désinscrivez-vous à tout moment. Pas de spam.',
        subscribe_now: 'S\'abonner',

        morocco: 'Maroc',
        morocco_subtitle: 'Hub fondateur',
        morocco_b1: 'Réseau universitaire local',
        morocco_b2: 'Centres de développement professionnel',
        morocco_b3: 'Services de soutien aux étudiants',
        morocco_b4: 'Orientation en bourses',
        morocco_b5: 'Programmes de préparation aux tests',
        morocco_stat: 'Étudiants servis',

        china: 'Chine',
        china_subtitle: 'Partenariat BRI',
        china_b1: 'Bourses Route de la Soie',
        china_b2: 'Subventions gouvernementales chinoises',
        china_b3: 'Programmes d\'échange technologique',
        china_b4: 'Bourses d\'ingénierie',
        china_b5: 'Soutien à l\'intégration culturelle',
        china_stat: 'Placements actifs',

        russia: 'Russie',
        russia_subtitle: 'Programmes fédéraux',
        russia_b1: 'Bourses gouvernementales',
        russia_b2: 'Subventions de recherche',
        russia_b3: 'Échange académique',
        russia_b4: 'Accent sur la science et l\'innovation',
        russia_b5: 'Soutien à la formation linguistique',
        russia_stat: 'Opportunités annuelles',

        south_america: 'Amérique du Sud',
        sa_subtitle: 'Réseau régional',
        sa_b1: 'Partenariats brésiliens',
        sa_b2: 'Universités argentines',
        sa_b3: 'Programmes d\'innovation chiliens',
        sa_b4: 'Initiatives d\'échange culturel',
        sa_b5: 'Programmes en langue espagnole',
        sa_stat: 'Réseau en croissance',

        inspiring_text: 'Inspirant de vrais voyages — des bourses et échanges aux réalisations de classe mondiale',
      },

      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_stories: 'Истории успеха',
        nav_resources: 'Ресурсы',
        sign_in: 'Войти',
        get_started: 'Начать',

        serving: '🇲🇦 Более 50 000 марокканских студентов',
        hero_line1: 'Преврати свои',
        hero_line2: 'Глобальные мечты',
        hero_line3: 'В реальность',
        hero_desc:
          'Тысячи стипендий, вакансий и международных программ для талантливых марокканцев. Твой путь к успеху начинается здесь.',
        explore_opps: 'Найти возможности',
        watch_demo: 'Смотреть демо',

        stat_users: 'Пользователи',
        stat_countries: 'Страны',
        stat_success: 'Успешность',
        stat_support: 'Поддержка',

        opps_title_1: 'Найди свой',
        opps_title_2: 'идеальный вариант',
        opps_desc: 'Тысячи проверенных возможностей в разных категориях',
        explore: 'Открыть',

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

        opp_scholarships: 'Стипендии',
        opp_jobs: 'Работа и стажировки',
        opp_exchange: 'Обменные программы',
        opp_grants: 'Гранты и феллоушипы',
        opp_desc_sch: 'Полное/частичное финансирование',
        opp_desc_jobs: 'Международные позиции',
        opp_desc_ex: 'Культурный обмен',
        opp_desc_grants: 'Финансирование исследований',

        feat_match: 'Мгновенный подбор',
        feat_match_desc: 'ИИ подбирает лучшие возможности за секунды',
        feat_dash: 'Личный кабинет',
        feat_dash_desc: 'Отслеживай заявки, дедлайны и рекомендации',
        feat_comm: 'Сообщество',
        feat_comm_desc: 'Связь с менторами и участниками',
        feat_lib: 'Библиотека',
        feat_lib_desc: 'Гайды, шаблоны и туториалы',
        feat_review: 'Проверка заявки',
        feat_review_desc: 'Экспертный фидбек по эссе и документам',
        feat_analytics: 'Аналитика успеха',
        feat_analytics_desc: 'Инсайты по шансам и конкуренции',

        tagline: 'Ваш мир ждёт',
        explore_all_opps: 'Откройте все возможности',
        moments_of: 'Моменты',
        moroccan_success: 'Глобального успеха марокканцев',
        made_with: 'Сделано с ❤️ в Марокко',
        sitemap: 'Карта сайта',
        subscribe_privacy: 'Мы уважаем вашу приватность. Отпишитесь в любой момент. Без спама.',
        subscribe_now: 'Подписаться',

        morocco: 'Марокко',
        morocco_subtitle: 'Информационный центр',
        morocco_b1: 'Местная сеть университетов',
        morocco_b2: 'Центры карьерного развития',
        morocco_b3: 'Служба поддержки студентов',
        morocco_b4: 'Консультирование по стипендиям',
        morocco_b5: 'Программы подготовки к тестам',
        morocco_stat: 'Студентов обслужено',

        china: 'Китай',
        china_subtitle: 'Партнёрство БРИ',
        china_b1: 'Стипендии Пути Шёлка',
        china_b2: 'Китайские государственные гранты',
        china_b3: 'Программы технологического обмена',
        china_b4: 'Инженерные стипендии',
        china_b5: 'Поддержка культурной интеграции',
        china_stat: 'Активные размещения',

        russia: 'Россия',
        russia_subtitle: 'Федеральные программы',
        russia_b1: 'Государственные стипендии',
        russia_b2: 'Гранты на исследования',
        russia_b3: 'Академический обмен',
        russia_b4: 'Фокус на науку и инновации',
        russia_b5: 'Поддержка языковой подготовки',
        russia_stat: 'Годовые возможности',

        south_america: 'Южная Америка',
        sa_subtitle: 'Региональная сеть',
        sa_b1: 'Бразильские партнёрства',
        sa_b2: 'Аргентинские университеты',
        sa_b3: 'Чилийские инновационные программы',
        sa_b4: 'Инициативы культурного обмена',
        sa_b5: 'Программы на испанском языке',
        sa_stat: 'Растущая сеть',

        inspiring_text: 'Вдохновляющие реальные истории — от стипендий и обменов к мировым достижениям',
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

  const opportunities = [
    {
      icon: BookOpen,
      title: t('opp_scholarships'),
      count: '2,500+',
      color: 'from-gray-800 to-brand-silver',
      desc: t('opp_desc_sch'),
    },
    {
      icon: Briefcase,
      title: t('opp_jobs'),
      count: '5,000+',
      color: 'from-brand-red to-gray-800',
      desc: t('opp_desc_jobs'),
    },
    {
      icon: Users,
      title: t('opp_exchange'),
      count: '800+',
      color: 'from-brand-red to-black',
      desc: t('opp_desc_ex'),
    },
    {
      icon: Award,
      title: t('opp_grants'),
      count: '1,200+',
      color: 'from-gray-800 to-black',
      desc: t('opp_desc_grants'),
    },
  ];

  const stats = [
    { number: '50K+', label: t('stat_users'), icon: Users },
    { number: '150+', label: t('stat_countries'), icon: Globe },
    { number: '95%', label: t('stat_success'), icon: TrendingUp },
    { number: '24/7', label: t('stat_support'), icon: Sparkles },
  ];

  const selectedLang = languages.find((l) => l.code === currentLanguage) ?? languages[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between py-3">
            {/* Logo */}
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
                <div className="text-[11px] sm:text-xs text-gray-500 -mt-0.5">{t('tagline')}</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`text-gray-700 hover:text-brand-red font-medium transition-colors relative group`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 w-0 group-hover:w-full`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Right Controls */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-3">
                <a
                  href="https://t.me/wyfmorocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red to-black flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
                  aria-label="Join us on Telegram"
                  title="Telegram"
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
                  title="Instagram"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.224.223 2.742.072 7.1.014 8.38 0 8.788 0 12s.014 3.62.072 4.9c.15 4.358 2.623 6.876 6.98 7.028 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.152 6.83-2.669 6.98-7.028.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.15-4.358-2.623-6.876-6.98-7.028C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>
              </div>

              {/* Language Selector */}
              <div className="relative" data-lang-menu>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguageMenuOpen((v) => !v);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Change language"
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
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
                    <div className="text-xs text-gray-500 -mt-0.5">{t('tagline')}</div>
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
                    href="https://t.me/wyfmorocco"
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
      <section
        id="home"
        className="scroll-section relative min-h-[100svh] flex items-center pt-20 sm:pt-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{
                  backgroundColor: ['#BB0909', '#D9D4D4', '#000000'][i % 3],
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
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg max-w-full">
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  {t('serving')}
                </span>
              </div>

              <h1 className="font-bold leading-[1.05]">
                <span className="block text-gray-900 text-4xl sm:text-5xl lg:text-7xl">
                  {t('hero_line1')}
                </span>
                <span className="block bg-gradient-to-r from-brand-red via-gray-900 to-brand-black bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-7xl">
                  {t('hero_line2')}
                </span>
                <span className="block text-gray-900 text-4xl sm:text-5xl lg:text-7xl">
                  {t('hero_line3')}
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
                {t('hero_desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/events" className="group w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-brand-red to-gray-900 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                  <span>{t('explore_opps')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="w-full sm:w-auto px-7 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
                  <span>{t('watch_demo')}</span>
                  <div className="w-8 h-8 bg-gradient-to-r from-brand-red to-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl bg-white/75 backdrop-blur-sm border border-white/40 p-4 text-center shadow-sm"
                    >
                      <Icon className="w-5 h-5 text-brand-red mx-auto mb-1" />
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                {opportunities.map((opp, index) => {
                  const Icon = opp.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${opp.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{opp.count}</div>
                      <div className="text-base font-semibold text-gray-800 mb-1">{opp.title}</div>
                      <div className="text-sm text-gray-500">{opp.desc}</div>
                    </div>
                  );
                })}
              </div>

              <div className="hidden lg:block relative h-[600px]">
                {opportunities.map((opp, index) => {
                  const Icon = opp.icon;
                  return (
                    <div
                      key={index}
                      className="absolute bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
                      style={{
                        top: `${index * 18}%`,
                        left: `${index % 2 === 0 ? '0' : '25%'}`,
                        right: `${index % 2 === 0 ? '25%' : '0'}`,
                        animation: `float ${3 + index}s ease-in-out infinite`,
                        animationDelay: `${index * 0.2}s`,
                        zIndex: 4 - index,
                      }}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${opp.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{opp.count}</div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">{opp.title}</div>
                      <div className="text-sm text-gray-500">{opp.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
        </div>
      </section>

      {/* Opportunities Section */}
      <section
        id="opportunities"
        className="scroll-section py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-black/10" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-brand-red to-gray-900 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg">
                Strategic International Partnerships
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {t('opps_title_1')}{' '}
              <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                {t('opps_title_2')}
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-1">
              {t('opps_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                topBar: 'from-brand-red to-black',
                emoji: '🇲🇦',
                title: t('morocco'),
                subtitle: t('morocco_subtitle'),
                bullets: [
                  ['bg-brand-red', 'Local University Network'],
                  ['bg-black', 'Career Development Centers'],
                  ['bg-brand-silver', 'Student Support Services'],
                  ['bg-brand-red', 'Scholarship Guidance'],
                  ['bg-black', 'Test Preparation Programs'],
                ],
                number: '50,000+',
                label: 'Students Served',
              },
              {
                topBar: 'from-brand-red to-brand-silver',
                emoji: '🇨🇳',
                title: t('china'),
                subtitle: t('china_subtitle'),
                bullets: [
                  ['bg-brand-red', 'Belt & Road Scholarships'],
                  ['bg-brand-silver', 'Chinese Government Grants'],
                  ['bg-brand-red', 'Technology Exchange Programs'],
                  ['bg-brand-silver', 'Engineering Fellowships'],
                  ['bg-brand-red', 'Cultural Integration Support'],
                ],
                number: '20,000+',
                label: 'Active Placements',
              },
              {
                topBar: 'from-black via-brand-silver to-brand-red',
                emoji: '🇷🇺',
                title: t('russia'),
                subtitle: t('russia_subtitle'),
                bullets: [
                  ['bg-black', 'Government Scholarships'],
                  ['bg-brand-red', 'Research Grants'],
                  ['bg-black', 'Academic Exchange'],
                  ['bg-brand-red', 'Science & Innovation Focus'],
                  ['bg-black', 'Language Training Support'],
                ],
                number: '10,000+',
                label: 'Annual Opportunities',
              },
              {
                topBar: 'from-brand-silver via-brand-red to-black',
                emoji: '🌎',
                title: t('south_america'),
                subtitle: t('sa_subtitle'),
                bullets: [
                  ['bg-brand-silver', 'Brazilian Partnerships'],
                  ['bg-brand-red', 'Argentine Universities'],
                  ['bg-black', 'Chilean Innovation Programs'],
                  ['bg-brand-silver', 'Cultural Exchange Initiatives'],
                  ['bg-brand-red', 'Spanish Language Programs'],
                ],
                number: '8,000+',
                label: 'Growing Network',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg border-2 border-gray-200 hover:border-red-500 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.topBar} rounded-t-2xl`}
                />
                <div className="text-center mb-5 sm:mb-6">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{card.emoji}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {card.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">{card.subtitle}</div>
                </div>

                <div className="space-y-3">
                  {card.bullets.map(([dot, text], i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 ${dot} rounded-full`} />
                      <span className="text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{card.number}</div>
                  <div className="text-sm text-gray-600">{card.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <Link to="/events" className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-red via-gray-900 to-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
              <Globe className="w-5 h-5" />
              <span className="font-semibold text-base sm:text-lg">{t('explore_all_opps')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section
        id="success-stories"
        className="scroll-section py-16 sm:py-20 md:py-28 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(220,38,38,0.08)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 sm:mb-5">
              {t('moments_of')}{' '}
              <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                {t('moroccan_success')}
              </span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Inspiring real journeys — from scholarships and exchanges to world-class achievements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                src: 'https://www.moroccoworldnews.com/wp-content/uploads/2024/11/munich-is-top-destination-for-moroccan-students-in-germany.png',
                caption: 'Moroccan Scholars in Germany – Munich Welcome',
              },
              {
                src: 'https://media.licdn.com/dms/image/v2/D4E12AQE9ybFDnRm1XA/article-cover_image-shrink_720_1280/B4EZjnOKdiGwAM-/0/1756225912720?e=2147483647&v=beta&t=WaBogNKIrzrqg6v2VHX7aFDPlEfu-B086wd-1K7fFt0',
                caption: 'Journey from Morocco to London – Student Success',
              },
              {
                src: 'https://ec.usembassy.gov/wp-content/uploads/sites/167/2024/06/IMG_4913-copy-1-1140x684-1.jpg',
                caption: 'Fulbright Award Ceremony – Proud Moment',
              },
              {
                src: 'https://www.shutterstock.com/image-photo/graduate-students-diplomas-light-room-260nw-2445597597.jpg',
                caption: 'Graduation Joy – Diplomas & Smiles',
              },
              {
                src: 'https://www.amideast.org/sites/default/files/styles/large/public/2025-07/YES%20Morocco_0.jpg?itok=4to3HsO5',
                caption: 'YES Program – Moroccan Youth Abroad',
              },
              {
                src: 'https://e2.hespress.com/wp-content/uploads/2025/09/IMG-20250920-WA0015.jpg',
                caption: 'Cultural Gathering – Global Peers United',
              },
              {
                src: 'https://www.yes-abroad.org/assets/general/Maria-and-her-friends-smile-from-the-street.JPG',
                caption: 'Friendships Built in Morocco Exchange',
              },
              {
                src: 'https://ualr.edu/news-archive/wp-content/uploads/sites/208/2019/11/Morocco3.jpg',
                caption: 'University Life – Moroccan Students Abroad',
              },
              {
                src: 'https://f.hubspotusercontent10.net/hubfs/67369/2021%20Compressed%20Images/Morocco%20Compressed/Ariel-Dansky-Oujda-Morocco-students.jpeg',
                caption: 'Classroom Connections – Immersive Learning',
              },
              {
                src: 'https://www.iesabroad.org/sites/default/files/styles/media_gallery_preview/public/2022-07/31803254657_626b62c73e_k.jpg?h=a01a9706&itok=PVJTp2H5',
                caption: 'Campus Moments – New Horizons',
              },
              {
                src: 'https://e1.hespress.com/wp-content/uploads/2024/01/Alumni-Summit-3-900x600.jpeg',
                caption: 'Alumni Networking – Innovation & Collaboration',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 hover:scale-[1.01]"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm sm:text-base md:text-lg font-semibold drop-shadow-md">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  Get the latest scholarships, internships, success stories and exclusive tips delivered to your inbox every month.
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
                  <span>{t('subscribe_now')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
                {t('subscribe_privacy')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-brand-red via-brand-silver to-black rounded-2xl flex items-center justify-center transform rotate-12 shadow-xl">
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

              <div className="flex gap-3 sm:gap-4">
                {['Telegram', 'Instagram', 'LinkedIn', 'Twitter'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-green-100 hover:from-red-100 hover:to-amber-100 flex items-center justify-center text-gray-700 hover:text-brand-red transition-all duration-300 hover:scale-110 shadow-sm hover:shadow"
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
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('nav_resources')}
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
                  <li>
                    <a href="#" className="hover:text-brand-red transition-colors">
                      {t('blog')}
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
                <span>{t('made_with')}</span>
                <a href="#" className="hover:text-brand-red transition-colors">
                  {t('sitemap')}
                </a>
                <span>v1.0.0 • 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
        }
      `}</style>
    </div>
  );
}
