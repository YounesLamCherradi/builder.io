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
  Rocket,
  Brain,
  Star,
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
        nav_about: 'About Us',
        nav_stories: 'Success Stories',
        nav_resources: 'Team',
        tagline: 'Your World Awaits',

        about_hero_title: 'Transforming Lives Through Global Opportunities',
        about_hero_subtitle: 'Empowering Moroccan Talent Worldwide',
        about_hero_desc: 'We believe every Moroccan student deserves access to world-class opportunities. MoroccoGlobal is the bridge connecting ambition with possibility.',

        about_story_title: 'Our Story',
        about_story_desc: 'Founded with a singular vision: to democratize access to global education and career opportunities for Moroccan students and professionals. We witnessed brilliant minds limited by geography and information gaps. So we built MoroccoGlobal to eliminate those barriers.',
        about_story_highlight: 'Today, we\'ve become the trusted platform for 50,000+ Moroccan seekers worldwide, changing lives daily.',

        about_mission_title: 'Our Mission',
        about_mission_desc: 'To democratize access to global opportunities for every Moroccan student and professional, regardless of their background or location, empowering them to achieve their dreams.',

        about_vision_title: 'Our Vision',
        about_vision_desc: 'A world where every talented Moroccan can pursue their dreams globally, breaking geographic barriers and creating a generation of global leaders who transform their communities.',

        about_values_title: 'Core Values That Guide Us',
        about_values_access: 'Accessibility First',
        about_values_access_desc: 'Making world-class opportunities available to everyone, breaking down financial and geographical barriers',
        about_values_excellence: 'Excellence Always',
        about_values_excellence_desc: 'Delivering the highest quality guidance, support, and resources to our community',
        about_values_impact: 'Impact Driven',
        about_values_impact_desc: 'Creating lasting, measurable change in the lives of our users and their families',
        about_values_innovation: 'Innovation Constant',
        about_values_innovation_desc: 'Continuously evolving technology and services to better serve our growing global community',

        about_team_title: 'Meet Our Team',
        about_team_subtitle: 'Diverse talents united by one mission',
        about_team_member_1: 'Founder & CEO - Leading the vision',
        about_team_member_2: 'Director of Operations - Scaling impact',
        about_team_member_3: 'Head of Product - Building solutions',
        about_team_member_4: 'Community Lead - Empowering users',
        about_team_member_5: 'Chief Technology Officer - Engineering excellence',
        about_team_member_6: 'Partnerships Manager - Growing networks',

        about_achievements_title: 'Impact by the Numbers',
        about_achievements_subtitle: 'Measurable change in the lives of Moroccan students',
        about_achievements_1: '50K+',
        about_achievements_1_desc: 'Active Users',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Countries Reached',
        about_achievements_3: '5,000+',
        about_achievements_3_desc: 'Opportunities Shared',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'User Success Rate',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Scholarships Connected',
        about_achievements_6: '4+',
        about_achievements_6_desc: 'Languages Supported',

        about_journey_title: 'Our Growth Journey',
        about_journey_milestone_1: 'Day One',
        about_journey_milestone_1_desc: 'Vision born: Building a platform to connect Moroccan talent with global opportunities',
        about_journey_milestone_2: 'Year One',
        about_journey_milestone_2_desc: '10,000+ users empowered, partnerships established across Africa, success stories pouring in',
        about_journey_milestone_3: 'Today',
        about_journey_milestone_3_desc: '50,000+ transformations, 150+ countries, and we\'re just getting started',

        about_why_title: 'Why Choose MoroccoGlobal?',
        about_why_1: 'Curated Opportunities - Handpicked from 50,000+ verified sources',
        about_why_2: 'Expert Guidance - AI-powered matching + human mentorship',
        about_why_3: 'Community Driven - Learn from thousands of successful peers',
        about_why_4: 'Accessible Always - Free platform, premium support optional',

        about_cta_title: 'Ready to Transform Your Future?',
        about_cta_desc: 'Join thousands of Moroccan students who have already begun their global journey',
        about_cta_button: 'Explore Opportunities Now',

        home_stay_updated_title: 'Stay Updated with',
        home_stay_updated_highlight: 'Global Opportunities',
        home_stay_updated_desc: 'Get the latest scholarships, internships, success stories and exclusive tips delivered to your inbox every month.',
        home_email_placeholder: 'Enter your email address',
        subscribe_now: 'Subscribe Now',
        subscribe_privacy: 'We respect your privacy. Unsubscribe anytime. No spam, ever.',

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
        made_with: 'Made with ❤️ in Morocco',
        sitemap: 'Sitemap',
      },

      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_about: 'À Propos',
        nav_stories: 'Témoignages',
        nav_resources: 'Ressources',
        tagline: 'Votre monde vous attend',

        about_hero_title: 'Transformer Les Vies Par Les Opportunités Mondiales',
        about_hero_subtitle: 'Autonomiser Les Talents Marocains',
        about_hero_desc: 'Nous croyons que chaque étudiant marocain mérite l\'accès à des opportunités de classe mondiale. MoroccoGlobal est le pont connectant l\'ambition à la possibilité.',

        about_story_title: 'Notre Histoire',
        about_story_desc: 'Fondée avec une vision singulière : démocratiser l\'accès aux opportunités éducatives et professionnelles mondiales pour les étudiants et professionnels marocains. Nous avons vu des esprits brillants limités par la géographie et le manque d\'information.',
        about_story_highlight: 'Aujourd\'hui, nous sommes la plateforme de confiance pour 50 000+ chercheurs marocains mondialement, changeant des vies quotidiennement.',

        about_mission_title: 'Notre Mission',
        about_mission_desc: 'Démocratiser l\'accès aux opportunités mondiales pour chaque étudiant et professionnel marocain, indépendamment de son origine ou de sa localisation.',

        about_vision_title: 'Notre Vision',
        about_vision_desc: 'Un monde où chaque talent marocain peut poursuivre ses rêves mondialement, en brisant les barrières géographiques et en créant une génération de leaders mondiaux.',

        about_values_title: 'Valeurs Fondamentales',
        about_values_access: 'Accessibilité D\'Abord',
        about_values_access_desc: 'Rendre les opportunités de classe mondiale accessibles à tous',
        about_values_excellence: 'Excellence Toujours',
        about_values_excellence_desc: 'Fournir les meilleurs conseils et soutien',
        about_values_impact: 'Impact Mesuré',
        about_values_impact_desc: 'Créer un changement durable dans les vies de notre communauté',
        about_values_innovation: 'Innovation Continue',
        about_values_innovation_desc: 'Évoluer continuellement pour mieux servir nos utilisateurs',

        about_team_title: 'Rencontrez Notre Équipe',
        about_team_subtitle: 'Des talents divers unis par une mission',
        about_team_member_1: 'Fondateur et PDG - Menant la vision',
        about_team_member_2: 'Directrice des Opérations - Agrandissant l\'impact',
        about_team_member_3: 'Directrice Produit - Construisant des solutions',
        about_team_member_4: 'Responsable Communauté - Autonomisant les utilisateurs',
        about_team_member_5: 'Responsable Technologie - Excellence technique',
        about_team_member_6: 'Responsable Partenariats - Étendant les réseaux',

        about_achievements_title: 'Impact en Chiffres',
        about_achievements_subtitle: 'Changement mesurable dans la vie des étudiants marocains',
        about_achievements_1: '50 000+',
        about_achievements_1_desc: 'Utilisateurs Actifs',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Pays Atteints',
        about_achievements_3: '5 000+',
        about_achievements_3_desc: 'Opportunités Partagées',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'Taux de Réussite',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Bourses Connectées',
        about_achievements_6: '4+',
        about_achievements_6_desc: 'Langues Supportées',

        about_journey_title: 'Notre Croissance',
        about_journey_milestone_1: 'Jour Un',
        about_journey_milestone_1_desc: 'Vision née : construire une plateforme pour connecter les talents marocains',
        about_journey_milestone_2: 'Année Un',
        about_journey_milestone_2_desc: '10 000+ utilisateurs autonomisés, partenariats en Afrique',
        about_journey_milestone_3: 'Aujourd\'hui',
        about_journey_milestone_3_desc: '50 000+ transformations et nous commençons seulement',

        about_why_title: 'Pourquoi Choisir MoroccoGlobal?',
        about_why_1: 'Opportunités Sélectionnées - 50 000+ sources vérifiées',
        about_why_2: 'Assistance Expert - Matching IA + mentorat humain',
        about_why_3: 'Communauté Engagée - Apprenez de milliers de pairs',
        about_why_4: 'Toujours Accessible - Plateforme gratuite, support premium optionnel',

        about_cta_title: 'Prêt à Transformer Votre Avenir?',
        about_cta_desc: 'Rejoignez des milliers d\'étudiants marocains qui ont commencé leur parcours mondial',
        about_cta_button: 'Explorez Les Opportunités Maintenant',

        home_stay_updated_title: 'Restez informé avec',
        home_stay_updated_highlight: 'Opportunités mondiales',
        home_stay_updated_desc: 'Recevez les dernières bourses, stages, histoires de réussite et conseils exclusifs dans votre boîte de réception chaque mois.',
        home_email_placeholder: 'Entrez votre adresse e-mail',
        subscribe_now: 'S\'abonner',
        subscribe_privacy: 'Nous respectons votre vie privée. Désinscrivez-vous à tout moment. Pas de spam.',

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
        terms: 'Conditions d\'utilisation',
        cookies: 'Cookies',
        rights: '© 2026 MoroccoGlobal. Tous droits réservés.',
        made_with: 'Fait avec ❤️ au Maroc',
        sitemap: 'Plan du site',
      },

      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_about: 'О нас',
        nav_stories: 'Истории успеха',
        nav_resources: 'Ресурсы',
        tagline: 'Ваш мир ждёт',

        about_hero_title: 'Преобразование жизней через глобальные возможности',
        about_hero_subtitle: 'Раскрывая потенциал марокканских талантов',
        about_hero_desc: 'Мы верим, что каждый марокканский студент достоин доступа к мировым возможностям. MoroccoGlobal - это мост, соединяющий амбицию с реальностью.',

        about_story_title: 'Наша История',
        about_story_desc: 'Основана с единственной целью: демократизировать доступ к мировым образовательным и профессиональным возможностям для марокканских студентов и профессионалов.',
        about_story_highlight: 'Сегодня мы - надежная платформа для 50 000+ марокканских соискателей по всему миру, ежедневно меняя жизни.',

        about_mission_title: 'Наша Миссия',
        about_mission_desc: 'Демократизировать доступ к глобальным возможностям для каждого марокканского студента и профессионала.',

        about_vision_title: 'Наше Видение',
        about_vision_desc: 'Мир, где каждый талантливый марокканец может реализовать свои мечты глобально, преодолев географические барьеры.',

        about_values_title: 'Наши Ценности',
        about_values_access: 'Доступность Прежде Всего',
        about_values_access_desc: 'Обеспечение мировых возможностей для всех',
        about_values_excellence: 'Отличие Всегда',
        about_values_excellence_desc: 'Предоставление высочайшего качества помощи и поддержки',
        about_values_impact: 'Влияние Измеримое',
        about_values_impact_desc: 'Создание устойчивых изменений в жизни нашего сообщества',
        about_values_innovation: 'Инновация Постоянно',
        about_values_innovation_desc: 'Постоянное совершенствование для лучшего обслуживания',

        about_team_title: 'Встречайте Нашу Команду',
        about_team_subtitle: 'Разнообразные таланты, объединенные одной миссией',
        about_team_member_1: 'Основатель и Генеральный Директор - Лидер видения',
        about_team_member_2: 'Директор по Операциям - Масштабирование влияния',
        about_team_member_3: 'Руководитель Продукта - Создание решений',
        about_team_member_4: 'Директор Сообщества - Расширение прав',
        about_team_member_5: 'Технический Директор - Техническое совершенство',
        about_team_member_6: 'Менеджер Партнерств - Расширение сетей',

        about_achievements_title: 'Влияние в Цифрах',
        about_achievements_subtitle: 'Измеримые изменения в жизни марокканских студентов',
        about_achievements_1: '50 000+',
        about_achievements_1_desc: 'Активных Пользователей',
        about_achievements_2: '150+',
        about_achievements_2_desc: 'Стран Охвачено',
        about_achievements_3: '5 000+',
        about_achievements_3_desc: 'Возможностей Поделено',
        about_achievements_4: '95%',
        about_achievements_4_desc: 'Коэффициент Успеха',
        about_achievements_5: '₹10M+',
        about_achievements_5_desc: 'Стипендий Подключено',
        about_achievements_6: '4+',
        about_achievements_6_desc: 'Языков Поддерживается',

        about_journey_title: 'Наш Путь Роста',
        about_journey_milestone_1: 'День Первый',
        about_journey_milestone_1_desc: 'Родилась идея: построить платформу для подключения талантов',
        about_journey_milestone_2: 'Год Первый',
        about_journey_milestone_2_desc: '10 000+ расширенных пользователей, партнерства по Африке',
        about_journey_milestone_3: 'Сегодня',
        about_journey_milestone_3_desc: '50 000+ трансформаций и мы только начинаем',

        about_why_title: 'Почему Выбирать MoroccoGlobal?',
        about_why_1: 'Отобранные Возможности - 50 000+ проверенных источников',
        about_why_2: 'Экспертная Помощь - Подбор ИИ + менторство',
        about_why_3: 'Сообщество Вовлечено - Учитесь у тысяч коллег',
        about_why_4: 'Всегда Доступна - Бесплатная платформа, премиум опционально',

        about_cta_title: 'Готовы Трансформировать Ваше Будущее?',
        about_cta_desc: 'Присоединитесь к тысячам марокканских студентов в глобальном путешествии',
        about_cta_button: 'Исследовать Возможности Сейчас',

        home_stay_updated_title: 'Будьте в курсе',
        home_stay_updated_highlight: 'Глобальные возможности',
        home_stay_updated_desc: 'Получайте последние стипендии, стажировки, истории успеха и эксклюзивные советы в вашу почту каждый месяц.',
        home_email_placeholder: 'Введите свой адрес электронной почты',
        subscribe_now: 'Подписаться',
        subscribe_privacy: 'Мы уважаем вашу приватность. Отпишитесь в любой момент. Без спама.',

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
        made_with: 'Сделано с ❤️ в Марокко',
        sitemap: 'Карта сайта',
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
    { name: t('nav_resources'), path: '/resources' },
  ];

  const selectedLang = languages.find((l) => l.code === currentLanguage) ?? languages[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar - SAME AS INDEX */}
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
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 sm:pt-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F92f8b815178841d0bd08aed5b20d683c?format=webp&width=800)',
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="space-y-6 sm:space-y-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg max-w-full animate-in fade-in slide-in-from-bottom-4 duration-700 border border-white/30">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white truncate">
                {t('about_hero_subtitle')}
              </span>
            </div>

            <h1 className="font-bold leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <span className="block text-white text-4xl sm:text-5xl lg:text-7xl drop-shadow-xl">
                {t('about_hero_title')}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 drop-shadow-lg">
              {t('about_hero_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link
                to="/events"
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-red to-brand-red text-white rounded-full font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover:brightness-110"
              >
                <span>{t('about_cta_button')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="inline-block animate-in fade-in slide-in-from-left-4 duration-700">
                <span className="px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full border border-brand-red/30">
                  {t('about_story_title')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
                {t('about_story_title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                {t('about_story_desc')}
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium bg-gradient-to-r from-brand-red/10 via-gray-50 to-transparent p-6 rounded-2xl border-l-4 border-brand-red animate-in fade-in slide-in-from-left-10 duration-700 delay-300">
                {t('about_story_highlight')}
              </p>
            </div>
            <div className="relative order-1 lg:order-2 animate-in fade-in zoom-in-50 duration-700 delay-200">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800"
                alt="Global representation with Moroccan flag"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 w-full h-auto"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F124d87ee51824b9a881ed04fbeff769c?format=webp&width=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div
              className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-left-4 duration-700"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {t('about_mission_title')}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                {t('about_mission_desc')}
              </p>
            </div>

            <div
              className="group bg-white rounded-3xl border-2 border-gray-200 hover:border-brand-red p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-700"
              style={{ animationDelay: '200ms' }}
            >
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

      {/* Core Values */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F96b25083da1648fc945bd37d8b67b8bc?format=webp&width=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
                  className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${idx * 100}ms` }}
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

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('about_why_title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-3xl mx-auto">
            {[
              t('about_why_1'),
              t('about_why_2'),
              t('about_why_3'),
              t('about_why_4'),
            ].map((reason, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-4 p-6 sm:p-8 rounded-2xl border-2 border-gray-200 hover:border-brand-red bg-white hover:bg-gradient-to-br hover:from-brand-red/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-brand-red to-gray-900 group-hover:scale-110 transition-transform">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-brand-red transition-colors">
                    {reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Moments Gallery */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Journey in Moments
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating partnerships, international events, and the impact we're creating together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F96b25083da1648fc945bd37d8b67b8bc?format=webp&width=800',
                title: 'Global Discussions',
                desc: 'Engaging in international dialogues about education and opportunities'
              },
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F481a670441c749588fa9123ea890126b?format=webp&width=800',
                title: 'International Events',
                desc: 'Representing Morocco at prestigious global conferences and assemblies'
              },
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F124d87ee51824b9a881ed04fbeff769c?format=webp&width=800',
                title: 'Cultural Pride',
                desc: 'Celebrating Moroccan heritage at world youth festivals and global platforms'
              },
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Fd3f4a862a09848f59bda97b5f7122d66?format=webp&width=800',
                title: 'Global Representation',
                desc: 'Connecting Moroccan youth with opportunities across 150+ countries'
              },
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800',
                title: 'Youth Empowerment',
                desc: 'Building confidence and networks for Moroccan students on the world stage'
              },
              {
                image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F257d7571060a432ab27e06f12b4bd593?format=webp&width=800',
                title: 'Partnerships & Collaborations',
                desc: 'Signing agreements and building lasting relationships with global institutions'
              },
            ].map((moment, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                    {moment.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90">
                    {moment.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
                className="group relative rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-brand-red shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${idx * 80}ms` }}
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

      {/* Achievements */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
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
                className="group text-center rounded-2xl border-2 border-gray-200 hover:border-brand-red p-4 sm:p-6 bg-white hover:bg-gradient-to-br hover:from-brand-red/5 to-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in zoom-in-50 duration-500"
                style={{ animationDelay: `${idx * 80}ms` }}
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

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-brand-red/10 via-white to-gray-900/10 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t('about_cta_title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t('about_cta_desc')}
          </p>
          <Link
            to="/events"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-gray-900 text-white px-6 sm:px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
          >
            <span>{t('about_cta_button')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer - SAME AS INDEX */}
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
                  {t('home_stay_updated_title')}{' '}
                  <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                    {t('home_stay_updated_highlight')}
                  </span>
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('home_stay_updated_desc')}
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder={t('home_email_placeholder')}
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
