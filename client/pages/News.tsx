import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  Calendar,
  User,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function News() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en';
    }
    return 'en';
  });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
        nav_contact: 'Contact',
        nav_news: 'News',

        news_hero_title: 'Latest News & Insights',
        news_hero_subtitle: 'Stay informed with the latest opportunities, visa updates, and success stories from our community',
        
        news_category_all: 'All Articles',
        news_category_visa: 'Visa Updates',
        news_category_scholarships: 'Scholarships',
        news_category_opportunities: 'Opportunities',
        news_category_stories: 'Success Stories',

        news_read_more: 'Read More',
        news_published: 'Published',
        news_by: 'By',

        news_article_1_title: 'Complete Guide to US Student Visa (F-1)',
        news_article_1_desc: 'Learn everything you need to know about applying for the F-1 student visa, including requirements, timeline, and interview tips.',
        news_article_1_category: 'Visa Updates',
        news_article_1_author: 'Sarah Johnson',
        news_article_1_date: 'Jan 15, 2025',

        news_article_2_title: '2025 Fulbright Scholarship Applications Now Open',
        news_article_2_desc: 'The Fulbright Commission is now accepting applications for the 2025-2026 academic year. Discover eligibility criteria and how to apply.',
        news_article_2_category: 'Scholarships',
        news_article_2_author: 'Mohammed Hassan',
        news_article_2_date: 'Jan 12, 2025',

        news_article_3_title: 'Top Tech Internship Opportunities in Silicon Valley',
        news_article_3_desc: 'Explore the most competitive tech internships available for international students in 2025 with competitive salaries.',
        news_article_3_category: 'Opportunities',
        news_article_3_author: 'Lisa Chen',
        news_article_3_date: 'Jan 10, 2025',

        news_article_4_title: 'From Marrakech to Oxford: Fatima\'s Success Story',
        news_article_4_desc: 'Read how Fatima overcame challenges and secured a full scholarship to study at Oxford University.',
        news_article_4_category: 'Success Stories',
        news_article_4_author: 'Ahmed Aziz',
        news_article_4_date: 'Jan 8, 2025',

        news_article_5_title: 'UK Visa Requirements Updated for 2025',
        news_article_5_desc: 'Important changes to UK student visa requirements. Find out what\'s new and how it affects your application.',
        news_article_5_category: 'Visa Updates',
        news_article_5_author: 'Robert Williams',
        news_article_5_date: 'Jan 5, 2025',

        news_article_6_title: 'Canada Express Entry: Quick Path to Permanent Residence',
        news_article_6_desc: 'Discover how Canadian Express Entry can help you achieve permanent residence status faster than traditional routes.',
        news_article_6_category: 'Opportunities',
        news_article_6_author: 'Julia Martinez',
        news_article_6_date: 'Dec 28, 2024',

        tagline: 'Your World Awaits',
        footer_tagline: 'Helping Moroccans achieve global dreams.',
        platform: 'Platform',
        company: 'Company',
        legal: 'Legal',
        scholarships: 'Scholarships',
        jobs: 'Jobs',
        programs: 'Programs',
        about_us: 'About',
        contact: 'Contact',
        careers: 'Careers',
        blog: 'Blog',
        privacy: 'Privacy',
        terms: 'Terms',
        cookies: 'Cookies',
        rights: '© 2026 MoroccoGlobal. All rights reserved.',
        made_with: 'Made with ❤️ in Morocco',
        sitemap: 'Sitemap',
        home_stay_updated_title: 'Stay Updated with',
        home_stay_updated_highlight: 'Global Opportunities',
        home_stay_updated_desc: 'Get the latest news about scholarships, visas, and opportunities delivered to your inbox every month.',
        home_email_placeholder: 'Enter your email address',
        subscribe_now: 'Subscribe',
        subscribe_privacy: 'We respect your privacy. Unsubscribe at any time. No spam.',
      },

      fr: {
        nav_home: 'Accueil',
        nav_events: 'Événements',
        nav_about: 'À Propos',
        nav_contact: 'Contact',
        nav_news: 'Actualités',

        news_hero_title: 'Dernières Actualités et Perspectives',
        news_hero_subtitle: 'Restez informé avec les dernières opportunités, mises à jour de visa et histoires de succès de notre communauté',
        
        news_category_all: 'Tous les Articles',
        news_category_visa: 'Mises à Jour Visa',
        news_category_scholarships: 'Bourses',
        news_category_opportunities: 'Opportunités',
        news_category_stories: 'Histoires de Succès',

        news_read_more: 'Lire Plus',
        news_published: 'Publié',
        news_by: 'Par',

        news_article_1_title: 'Guide Complet du Visa Étudiant Américain (F-1)',
        news_article_1_desc: 'Découvrez tout ce que vous devez savoir sur la demande de visa étudiant F-1, y compris les exigences et les conseils d\'entrevue.',
        news_article_1_category: 'Mises à Jour Visa',
        news_article_1_author: 'Sarah Johnson',
        news_article_1_date: '15 jan 2025',

        news_article_2_title: 'Les Candidatures Fulbright 2025 Sont Ouvertes',
        news_article_2_desc: 'La Commission Fulbright accepte maintenant les candidatures pour l\'année académique 2025-2026. Découvrez les critères d\'admissibilité.',
        news_article_2_category: 'Bourses',
        news_article_2_author: 'Mohammed Hassan',
        news_article_2_date: '12 jan 2025',

        news_article_3_title: 'Meilleures Opportunités de Stage Technologique à Silicon Valley',
        news_article_3_desc: 'Explorez les stages technologiques les plus compétitifs disponibles pour les étudiants internationaux en 2025.',
        news_article_3_category: 'Opportunités',
        news_article_3_author: 'Lisa Chen',
        news_article_3_date: '10 jan 2025',

        news_article_4_title: 'De Marrakech à Oxford: L\'Histoire de Succès de Fatima',
        news_article_4_desc: 'Lisez comment Fatima a surmonté les défis et obtenu une bourse complète pour étudier à l\'Université d\'Oxford.',
        news_article_4_category: 'Histoires de Succès',
        news_article_4_author: 'Ahmed Aziz',
        news_article_4_date: '8 jan 2025',

        news_article_5_title: 'Exigences de Visa au Royaume-Uni Mises à Jour pour 2025',
        news_article_5_desc: 'Changements importants aux exigences de visa étudiant au Royaume-Uni. Découvrez ce qui est nouveau et comment cela affecte votre candidature.',
        news_article_5_category: 'Mises à Jour Visa',
        news_article_5_author: 'Robert Williams',
        news_article_5_date: '5 jan 2025',

        news_article_6_title: 'Canada Express Entry: Chemin Rapide vers la Résidence Permanente',
        news_article_6_desc: 'Découvrez comment Canada Express Entry peut vous aider à obtenir le statut de résident permanent plus rapidement.',
        news_article_6_category: 'Opportunités',
        news_article_6_author: 'Julia Martinez',
        news_article_6_date: '28 déc 2024',

        tagline: 'Votre monde vous attend',
        footer_tagline: 'Aider les Marocains à réaliser leurs rêves mondiaux.',
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
        terms: 'Conditions',
        cookies: 'Cookies',
        rights: '© 2026 MoroccoGlobal. Tous droits réservés.',
        made_with: 'Fait avec ❤️ au Maroc',
        sitemap: 'Plan du site',
        home_stay_updated_title: 'Restez Informé avec',
        home_stay_updated_highlight: 'Opportunités Mondiales',
        home_stay_updated_desc: 'Recevez les dernières nouvelles sur les bourses, visas et opportunités chaque mois dans votre boîte de réception.',
        home_email_placeholder: 'Entrez votre adresse email',
        subscribe_now: 'S\'abonner',
        subscribe_privacy: 'Nous respectons votre vie privée. Désinscrivez-vous à tout moment. Pas de spam.',
      },

      ru: {
        nav_home: 'Главная',
        nav_events: 'События',
        nav_about: 'О нас',
        nav_contact: 'Контакты',
        nav_news: 'Новости',

        news_hero_title: 'Последние Новости и Инсайты',
        news_hero_subtitle: 'Будьте в курсе последних возможностей, обновлений виз и историй успеха нашего сообщества',
        
        news_category_all: 'Все Статьи',
        news_category_visa: 'Обновления Виз',
        news_category_scholarships: 'Стипендии',
        news_category_opportunities: 'Возможности',
        news_category_stories: 'Истории Успеха',

        news_read_more: 'Читать Далее',
        news_published: 'Опубликовано',
        news_by: 'Автор',

        news_article_1_title: 'Полное Руководство по Студенческой Визе США (F-1)',
        news_article_1_desc: 'Узнайте все, что нужно знать о подаче заявления на визу F-1, включая требования и советы по собеседованию.',
        news_article_1_category: 'Обновления Виз',
        news_article_1_author: 'Sarah Johnson',
        news_article_1_date: '15 янв 2025',

        news_article_2_title: 'Приём Заявлений на Стипендию Фулбрайт 2025 Открыт',
        news_article_2_desc: 'Комиссия Фулбрайт теперь принимает заявления на 2025-2026 учебный год. Узнайте критерии приемлемости.',
        news_article_2_category: 'Стипендии',
        news_article_2_author: 'Mohammed Hassan',
        news_article_2_date: '12 янв 2025',

        news_article_3_title: 'Лучшие Стажировки в Технологической Сфере в Силиконовой Долине',
        news_article_3_desc: 'Изучите наиболее конкурентные технологические стажировки для иностранных студентов в 2025 году.',
        news_article_3_category: 'Возможности',
        news_article_3_author: 'Lisa Chen',
        news_article_3_date: '10 янв 2025',

        news_article_4_title: 'От Марракеша к Оксфорду: История Успеха Фатимы',
        news_article_4_desc: 'Прочитайте, как Фатима преодолела трудности и получила полную стипендию для учёбы в Оксфордском Университете.',
        news_article_4_category: 'Истории Успеха',
        news_article_4_author: 'Ahmed Aziz',
        news_article_4_date: '8 янв 2025',

        news_article_5_title: 'Требования Британской Визы Обновлены на 2025 Год',
        news_article_5_desc: 'Важные изменения в требованиях к британской студенческой визе. Узнайте, что нового и как это влияет на вашу заявку.',
        news_article_5_category: 'Обновления Виз',
        news_article_5_author: 'Robert Williams',
        news_article_5_date: '5 янв 2025',

        news_article_6_title: 'Канадская Система Express Entry: Быстрый Путь к Постоянному Резидентству',
        news_article_6_desc: 'Узнайте, как Express Entry может помочь вам быстрее получить статус постоянного резидента Канады.',
        news_article_6_category: 'Возможности',
        news_article_6_author: 'Julia Martinez',
        news_article_6_date: '28 дек 2024',

        tagline: 'Твой мир ждет',
        footer_tagline: 'Помогаем марокканцам реализовывать глобальные мечты.',
        platform: 'Платформа',
        company: 'Компания',
        legal: 'Право',
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
        home_stay_updated_title: 'Будьте Информированы',
        home_stay_updated_highlight: 'Глобальные Возможности',
        home_stay_updated_desc: 'Получайте последние новости о стипендиях, визах и возможностях каждый месяц на вашу почту.',
        home_email_placeholder: 'Введите ваш адрес электронной почты',
        subscribe_now: 'Подписаться',
        subscribe_privacy: 'Мы уважаем вашу конфиденциальность. Отпишитесь в любой момент. Нет спама.',
      },
    }),
    []
  );

  const t = (key) => I18N[currentLanguage]?.[key] || I18N['en'][key] || key;
  const selectedLang = languages.find((l) => l.code === currentLanguage) ?? languages[0];

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_events'), path: '/events' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_contact'), path: '/contact' },
    { name: t('nav_news'), path: '/news' },
  ];

  const articles = [
    {
      id: 1,
      title: t('news_article_1_title'),
      description: t('news_article_1_desc'),
      category: t('news_article_1_category'),
      author: t('news_article_1_author'),
      date: t('news_article_1_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F92f8b815178841d0bd08aed5b20d683c?format=webp&width=800',
    },
    {
      id: 2,
      title: t('news_article_2_title'),
      description: t('news_article_2_desc'),
      category: t('news_article_2_category'),
      author: t('news_article_2_author'),
      date: t('news_article_2_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F777feb4da2644478bce44a65dfd42f41?format=webp&width=800',
    },
    {
      id: 3,
      title: t('news_article_3_title'),
      description: t('news_article_3_desc'),
      category: t('news_article_3_category'),
      author: t('news_article_3_author'),
      date: t('news_article_3_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800',
    },
    {
      id: 4,
      title: t('news_article_4_title'),
      description: t('news_article_4_desc'),
      category: t('news_article_4_category'),
      author: t('news_article_4_author'),
      date: t('news_article_4_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F92f8b815178841d0bd08aed5b20d683c?format=webp&width=800',
    },
    {
      id: 5,
      title: t('news_article_5_title'),
      description: t('news_article_5_desc'),
      category: t('news_article_5_category'),
      author: t('news_article_5_author'),
      date: t('news_article_5_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F777feb4da2644478bce44a65dfd42f41?format=webp&width=800',
    },
    {
      id: 6,
      title: t('news_article_6_title'),
      description: t('news_article_6_desc'),
      category: t('news_article_6_category'),
      author: t('news_article_6_author'),
      date: t('news_article_6_date'),
      image: 'https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800',
    },
  ];

  const categories = [
    { id: 'all', label: t('news_category_all') },
    { id: 'visa', label: t('news_category_visa') },
    { id: 'scholarships', label: t('news_category_scholarships') },
    { id: 'opportunities', label: t('news_category_opportunities') },
    { id: 'stories', label: t('news_category_stories') },
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => 
        article.category.toLowerCase().includes(selectedCategory) ||
        (selectedCategory === 'visa' && article.category.includes(t('news_category_visa'))) ||
        (selectedCategory === 'scholarships' && article.category.includes(t('news_category_scholarships'))) ||
        (selectedCategory === 'opportunities' && article.category.includes(t('news_category_opportunities'))) ||
        (selectedCategory === 'stories' && article.category.includes(t('news_category_stories')))
      );

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between py-3">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                alt="MoroccoGlobal Logo"
                className="h-12 sm:h-14 w-auto"
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`text-gray-700 hover:text-brand-red font-medium transition-colors relative group ${
                    item.path === '/news' ? 'text-brand-red' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                    item.path === '/news' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-5">
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
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${languageMenuOpen ? 'rotate-180' : ''}`} />
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 top-16 pt-0">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm top-16" onClick={() => setMobileMenuOpen(false)} />
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

                <div className="space-y-2 pt-4">
                  {menuItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-left px-4 py-4 rounded-xl hover:bg-brand-red/10 text-gray-800 font-semibold text-lg transition-all duration-300 block border-2 border-transparent hover:border-brand-red/30"
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
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t('news_hero_title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t('news_hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full whitespace-nowrap font-medium transition-all duration-300 flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-brand-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-brand-red overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-brand-red text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 flex-1">
                    {article.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{t('news_by')} {article.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{t('news_published')} {article.date}</span>
                    </div>
                  </div>

                  <button className="mt-4 group/btn inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all duration-300">
                    <span>{t('news_read_more')}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 text-gray-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,#dc2626_1px,transparent_1px)] bg-[length:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,#10b981_1px,transparent_1px)] bg-[length:80px_80px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-12">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                  alt="MoroccoGlobal Logo"
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
              <p className="text-gray-700 leading-relaxed mb-7 sm:mb-8 max-w-md text-sm sm:text-base">
                {t('footer_tagline')}
              </p>
            </div>

            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">{t('platform')}</h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('scholarships')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('jobs')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('programs')}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">{t('company')}</h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('about_us')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('contact')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('careers')}</a></li>
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">{t('legal')}</h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('privacy')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('terms')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('cookies')}</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-brand-silver/40 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <p>{t('rights')}</p>
              <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2">
                <span>{t('made_with')}</span>
                <a href="#" className="hover:text-brand-red transition-colors">{t('sitemap')}</a>
                <span>v1.0.0 • 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
