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
  Target,
  Check,
  Heart,
  Lightbulb,
  Handshake,
  Zap,
} from 'lucide-react';

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en';
    }
    return 'en';
  });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
    }
  };

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
        nav_about: 'About Us',
        tagline: 'Your World Awaits',

        about_hero_title: 'About MoroccoGlobal',
        about_hero_subtitle: 'Empowering Moroccan Talent to Achieve Global Success',
        about_hero_desc: 'We believe every Moroccan student deserves access to world-class opportunities. Since our inception, we\'ve been on a mission to bridge the gap between ambition and opportunity.',

        about_who_title: 'Who We Are',
        about_who_desc: 'MoroccoGlobal is a pioneering platform dedicated to connecting Moroccan students and professionals with international scholarships, jobs, and educational programs. We\'re a team of passionate educators, technologists, and global enthusiasts committed to breaking down barriers and opening doors to success.',
        about_who_highlight: 'Founded with the belief that talent knows no borders, we\'ve grown to become a trusted partner for thousands of Moroccan seekers worldwide.',

        about_mission_title: 'Our Mission',
        about_mission_desc: 'To democratize access to global opportunities for every Moroccan student and professional, regardless of their background or location.',
        about_mission_values: 'We operate on three core pillars: Accessibility, Excellence, and Impact.',

        about_vision_title: 'Our Vision',
        about_vision_desc: 'A world where every talented Moroccan can pursue their dreams globally, breaking geographic barriers and creating opportunities that transform lives.',

        about_values_title: 'Our Core Values',
        about_values_access: 'Accessibility',
        about_values_access_desc: 'Making world-class opportunities available to everyone',
        about_values_excellence: 'Excellence',
        about_values_excellence_desc: 'Delivering the highest quality guidance and support',
        about_values_impact: 'Impact',
        about_values_impact_desc: 'Creating lasting change in the lives of our community',
        about_values_innovation: 'Innovation',
        about_values_innovation_desc: 'Continuously evolving to serve our users better',

        about_team_title: 'Our Team',
        about_team_subtitle: 'Meet the passionate individuals driving MoroccoGlobal forward',
        about_team_member_1: 'Founder & CEO',
        about_team_member_2: 'Head of Operations',
        about_team_member_3: 'Lead Product Manager',
        about_team_member_4: 'Community Director',
        about_team_member_5: 'Technology Lead',
        about_team_member_6: 'Partnerships Manager',

        about_achievements_title: 'Our Achievements',
        about_achievements_subtitle: 'Milestones that define our impact',
        about_achievements_1: '50,000+',
        about_achievements_1_desc: 'Active Users Globally',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Countries Reached',
        about_achievements_3: '5,000+',
        about_achievements_3_desc: 'Opportunities Shared',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'User Success Rate',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Scholarships Connected',
        about_achievements_6: '2024',
        about_achievements_6_desc: 'Year Founded',

        about_journey_title: 'Our Journey',
        about_journey_milestone_1: '2024',
        about_journey_milestone_1_desc: 'MoroccoGlobal Founded with a vision to empower Moroccan talent globally',
        about_journey_milestone_2: '2024',
        about_journey_milestone_2_desc: 'Reached 10,000 active users and expanded partnerships across Africa',
        about_journey_milestone_3: 'Today',
        about_journey_milestone_3_desc: 'Serving 50,000+ users with opportunities in 150+ countries',

        about_cta_title: 'Join Our Community',
        about_cta_desc: 'Be part of a movement that\'s changing lives and opening doors to global success',
        about_cta_button: 'Explore Opportunities',
      },

      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_stories: 'Témoignages',
        nav_resources: 'Ressources',
        nav_about: 'À Propos',
        tagline: 'Votre monde vous attend',

        about_hero_title: 'À Propos de MoroccoGlobal',
        about_hero_subtitle: 'Autonomiser les talents marocains pour réussir mondialement',
        about_hero_desc: 'Nous croyons que chaque étudiant marocain mérite l\'accès à des opportunités de classe mondiale. Depuis notre création, nous sommes en mission pour combler le fossé entre l\'ambition et l\'opportunité.',

        about_who_title: 'Qui Sommes-Nous',
        about_who_desc: 'MoroccoGlobal est une plateforme pionnière dédiée à connecter les étudiants et professionnels marocains avec des bourses internationales, des emplois et des programmes éducatifs. Nous sommes une équipe d\'éducateurs passionnés, de technologues et d\'enthousiastes mondiaux engagés à éliminer les barrières.',
        about_who_highlight: 'Fondée sur la conviction que le talent n\'a pas de frontières, nous sommes devenues un partenaire de confiance pour des milliers de chercheurs marocains dans le monde.',

        about_mission_title: 'Notre Mission',
        about_mission_desc: 'Démocratiser l\'accès aux opportunités mondiales pour chaque étudiant et professionnel marocain, indépendamment de son origine ou de sa localisation.',
        about_mission_values: 'Nous opérons sur trois piliers fondamentaux : Accessibilité, Excellence et Impact.',

        about_vision_title: 'Notre Vision',
        about_vision_desc: 'Un monde où chaque talent marocain peut poursuivre ses rêves mondialement, en brisant les barrières géographiques et en créant des opportunités qui transforment les vies.',

        about_values_title: 'Nos Valeurs Fondamentales',
        about_values_access: 'Accessibilité',
        about_values_access_desc: 'Rendre les opportunités de classe mondiale accessibles à tous',
        about_values_excellence: 'Excellence',
        about_values_excellence_desc: 'Fournir les meilleurs conseils et soutien',
        about_values_impact: 'Impact',
        about_values_impact_desc: 'Créer un changement durable dans les vies de notre communauté',
        about_values_innovation: 'Innovation',
        about_values_innovation_desc: 'Évoluer continuellement pour mieux servir nos utilisateurs',

        about_team_title: 'Notre Équipe',
        about_team_subtitle: 'Rencontrez les individus passionnés qui font avancer MoroccoGlobal',
        about_team_member_1: 'Fondateur et PDG',
        about_team_member_2: 'Directrice des Opérations',
        about_team_member_3: 'Directrice Produit',
        about_team_member_4: 'Directrice Communauté',
        about_team_member_5: 'Responsable Technologie',
        about_team_member_6: 'Responsable Partenariats',

        about_achievements_title: 'Nos Réalisations',
        about_achievements_subtitle: 'Des jalons qui définissent notre impact',
        about_achievements_1: '50 000+',
        about_achievements_1_desc: 'Utilisateurs Actifs Mondialement',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Pays Atteints',
        about_achievements_3: '5 000+',
        about_achievements_3_desc: 'Opportunités Partagées',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'Taux de Réussite',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Bourses Connectées',
        about_achievements_6: '2024',
        about_achievements_6_desc: 'Année de Fondation',

        about_journey_title: 'Notre Parcours',
        about_journey_milestone_1: '2024',
        about_journey_milestone_1_desc: 'MoroccoGlobal fondée avec une vision d\'autonomiser les talents marocains mondialement',
        about_journey_milestone_2: '2024',
        about_journey_milestone_2_desc: 'Atteint 10 000 utilisateurs actifs et étendu les partenariats en Afrique',
        about_journey_milestone_3: 'Aujourd\'hui',
        about_journey_milestone_3_desc: 'Servir 50 000+ utilisateurs avec des opportunités dans 150+ pays',

        about_cta_title: 'Rejoignez Notre Communauté',
        about_cta_desc: 'Faites partie d\'un mouvement qui change des vies et ouvre des portes au succès mondial',
        about_cta_button: 'Explorer les Opportunités',
      },

      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_stories: 'Истории успеха',
        nav_resources: 'Ресурсы',
        nav_about: 'О нас',
        tagline: 'Ваш мир ждёт',

        about_hero_title: 'О MoroccoGlobal',
        about_hero_subtitle: 'Раскрывая потенциал марокканских талантов на мировой арене',
        about_hero_desc: 'Мы верим, что каждый марокканский студент достоин доступа к мировым возможностям. С момента нашего основания мы работаем над тем, чтобы закрыть разрыв между амбициями и реальностью.',

        about_who_title: 'Кто Мы',
        about_who_desc: 'MoroccoGlobal - это передовая платформа, посвященная соединению марокканских студентов и профессионалов с международными стипендиями, работой и образовательными программами. Мы - команда увлеченных педагогов, технологов и глобальных энтузиастов.',
        about_who_highlight: 'Основанные на убеждении, что талант не знает границ, мы стали надежным партнером для тысяч марокканских соискателей по всему миру.',

        about_mission_title: 'Наша Миссия',
        about_mission_desc: 'Демократизировать доступ к глобальным возможностям для каждого марокканского студента и профессионала, независимо от их происхождения и местоположения.',
        about_mission_values: 'Мы работаем на основе трех ключевых принципов: Доступность, Отличие и Влияние.',

        about_vision_title: 'Наше Видение',
        about_vision_desc: 'Мир, где каждый талантливый марокканец может реализовать свои мечты глобально, преодолев географические барьеры и создав возможности, которые трансформируют жизни.',

        about_values_title: 'Наши Ценности',
        about_values_access: 'Доступность',
        about_values_access_desc: 'Обеспечение мировых возможностей для всех',
        about_values_excellence: 'Отличие',
        about_values_excellence_desc: 'Предоставление высочайшего качества помощи и поддержки',
        about_values_impact: 'Влияние',
        about_values_impact_desc: 'Создание устойчивых изменений в жизни нашего сообщества',
        about_values_innovation: 'Инновация',
        about_values_innovation_desc: 'Постоянное совершенствование для лучшего обслуживания',

        about_team_title: 'Наша Команда',
        about_team_subtitle: 'Встречайте страстных людей, движущих MoroccoGlobal вперед',
        about_team_member_1: 'Основатель и Генеральный Директор',
        about_team_member_2: 'Директор по Операциям',
        about_team_member_3: 'Руководитель Продукта',
        about_team_member_4: 'Директор Сообщества',
        about_team_member_5: 'Технический Лидер',
        about_team_member_6: 'Менеджер Партнерств',

        about_achievements_title: 'Наши Достижения',
        about_achievements_subtitle: 'Вехи, которые определяют наше влияние',
        about_achievements_1: '50 000+',
        about_achievements_1_desc: 'Активных Пользователей по Всему Миру',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Стран Охватано',
        about_achievements_3: '5 000+',
        about_achievements_3_desc: 'Возможностей Поделено',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'Коэффициент Успеха',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Стипендий Подключено',
        about_achievements_6: '2024',
        about_achievements_6_desc: 'Год Основания',

        about_journey_title: 'Наш Путь',
        about_journey_milestone_1: '2024',
        about_journey_milestone_1_desc: 'MoroccoGlobal основана с видением расширения марокканских талантов глобально',
        about_journey_milestone_2: '2024',
        about_journey_milestone_2_desc: 'Достигнута 10 000 активных пользователей и расширено партнерство по Африке',
        about_journey_milestone_3: 'Сегодня',
        about_journey_milestone_3_desc: 'Обслуживаем 50 000+ пользователей с возможностями в 150+ странах',

        about_cta_title: 'Присоединитесь к Нашему Сообществу',
        about_cta_desc: 'Будьте частью движения, которое меняет жизни и открывает двери к глобальному успеху',
        about_cta_button: 'Исследовать Возможности',
      },
    }),
    []
  );

  const t = (key) => I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_events'), path: '/events' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_stories'), path: '/stories' },
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
                  className={`text-gray-700 hover:text-brand-red font-medium transition-colors relative group ${
                    item.path === '/about' ? 'text-brand-red' : ''
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                      item.path === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 sm:pt-24 overflow-hidden">
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
          <div className="space-y-6 sm:space-y-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg max-w-full">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                {t('about_hero_subtitle')}
              </span>
            </div>

            <h1 className="font-bold leading-[1.05]">
              <span className="block bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-7xl">
                {t('about_hero_title')}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('about_hero_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <Link
                to="/events"
                className="group w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-brand-red to-gray-900 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{t('about_cta_button')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full border border-brand-red/30">
                  {t('nav_about')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                {t('about_who_title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('about_who_desc')}
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium bg-gradient-to-r from-brand-red/10 via-gray-50 to-transparent p-6 rounded-2xl border-l-4 border-brand-red">
                {t('about_who_highlight')}
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission */}
            <div className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('about_mission_title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
                {t('about_mission_desc')}
              </p>
              <p className="text-sm text-brand-red font-semibold">
                {t('about_mission_values')}
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('about_vision_title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('about_vision_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about_values_title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { title: t('about_values_access'), desc: t('about_values_access_desc'), icon: Globe },
              { title: t('about_values_excellence'), desc: t('about_values_excellence_desc'), icon: Award },
              { title: t('about_values_impact'), desc: t('about_values_impact_desc'), icon: Heart },
              { title: t('about_values_innovation'), desc: t('about_values_innovation_desc'), icon: Zap },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 100}ms forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-red/20 to-brand-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-brand-red group-hover:to-gray-900 transition-all">
                    <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about_team_title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about_team_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              { name: t('about_team_member_1'), emoji: '👨‍💼', color: 'from-brand-red to-gray-900' },
              { name: t('about_team_member_2'), emoji: '👩‍💼', color: 'from-gray-900 to-black' },
              { name: t('about_team_member_3'), emoji: '👩‍💻', color: 'from-brand-red to-black' },
              { name: t('about_team_member_4'), emoji: '👩‍🤝‍👨', color: 'from-gray-900 to-brand-red' },
              { name: t('about_team_member_5'), emoji: '👨‍💻', color: 'from-brand-red via-gray-900 to-black' },
              { name: t('about_team_member_6'), emoji: '🤝', color: 'from-black to-brand-red' },
            ].map((member, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Background */}
                <div className={`h-64 bg-gradient-to-br ${member.color} relative overflow-hidden`}>
                  <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500">
                    {member.emoji}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Making global impact through dedication and innovation
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about_achievements_title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about_achievements_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              { num: t('about_achievements_1'), desc: t('about_achievements_1_desc') },
              { num: t('about_achievements_2'), desc: t('about_achievements_2_desc') },
              { num: t('about_achievements_3'), desc: t('about_achievements_3_desc') },
              { num: t('about_achievements_4'), desc: t('about_achievements_4_desc') },
              { num: t('about_achievements_5'), desc: t('about_achievements_5_desc') },
              { num: t('about_achievements_6'), desc: t('about_achievements_6_desc') },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="group text-center rounded-2xl border-2 border-gray-200 hover:border-brand-red p-4 sm:p-6 bg-white hover:bg-gradient-to-br hover:from-brand-red/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-red to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-3">
                  {achievement.num}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {achievement.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('about_journey_title')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-red via-gray-300 to-black sm:transform sm:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-8 sm:space-y-12">
              {[
                { year: t('about_journey_milestone_1'), desc: t('about_journey_milestone_1_desc') },
                { year: t('about_journey_milestone_2'), desc: t('about_journey_milestone_2_desc') },
                { year: t('about_journey_milestone_3'), desc: t('about_journey_milestone_3_desc') },
              ].map((milestone, idx) => (
                <div key={idx} className={`flex gap-4 sm:gap-8 ${idx % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-brand-red to-gray-900 rounded-full border-4 border-white shadow-lg relative z-10 mt-2 sm:mt-6" />
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-red p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-lg sm:text-xl font-bold text-brand-red mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-base sm:text-lg text-gray-600">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-brand-red/10 via-white to-gray-900/10 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t('about_cta_title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
            {t('about_cta_desc')}
          </p>
          <Link
            to="/events"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-gray-900 text-white px-6 sm:px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            <span>{t('about_cta_button')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
