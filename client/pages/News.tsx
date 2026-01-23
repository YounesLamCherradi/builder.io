import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Check,
  Newspaper,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { fetchNews, type NewsArticle } from '../lib/supabase';

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
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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

  // Set RTL direction for Arabic language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const htmlElement = document.documentElement;
      const isArabic = currentLanguage === 'ar';
      htmlElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
      htmlElement.setAttribute('lang', currentLanguage);
      if (isArabic) {
        htmlElement.classList.add('rtl');
      } else {
        htmlElement.classList.remove('rtl');
      }
    }
  }, [currentLanguage]);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchNews();
        // Data is already sorted by order_index from Supabase query
        setArticles(data);
      } catch (error) {
        console.error('Error loading news articles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const I18N = useMemo(
    () => ({
      en: {
        nav_home: 'Home',
        nav_news: 'News',
        nav_about: 'About Us',
        nav_partners: 'Partners',
        nav_contact: 'Contact',
        news_title: 'Latest News & Articles',
        news_subtitle: 'Stay updated with our latest news, announcements, and insights',
        read_more: 'Read More',
        no_articles: 'No articles available',
        loading: 'Loading articles...',
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
        rights: '© 2026 WYF Morocco. All rights reserved.',
        made_with: 'Made with ❤️ in Morocco',
        sitemap: 'Sitemap',
      },
      ar: {
        nav_home: 'الرئيسية',
        nav_news: 'الأخبار',
        nav_about: 'عننا',
        nav_partners: 'الشركاء',
        nav_contact: 'اتصل بنا',
        news_title: 'أحدث الأخبار والمقالات',
        news_subtitle: 'ابقَ محدثاً مع أحدث أخبارنا والإعلانات والرؤى',
        read_more: 'اقرأ المزيد',
        no_articles: 'لا توجد مقالات متاحة',
        loading: 'جاري تحميل المقالات...',
        footer_tagline: 'تمكين المغاربة لتحقيق أحلامهم العالمية.',
        platform: 'المنصة',
        company: 'الشركة',
        legal: 'قانوني',
        scholarships: 'المنح الدراسية',
        jobs: 'الوظائف',
        programs: 'البرامج',
        about_us: 'عننا',
        contact: 'اتصل بنا',
        careers: 'الوظائف',
        blog: 'المدونة',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        cookies: 'سياسة ملفات تعريف الارتباط',
        rights: '© 2026 مهرجان الشباب العالمي المغربي. جميع الحقوق محفوظة.',
        made_with: 'صُنع بـ ❤️ في المغرب',
        sitemap: 'خريطة الموقع',
      },
      ru: {
        nav_home: 'Главная',
        nav_news: 'Новости',
        nav_about: 'О нас',
        nav_partners: 'Партнёры',
        nav_contact: 'Контакты',
        news_title: 'Последние новости и статьи',
        news_subtitle: 'Будьте в курсе наших последних новостей, объявлений и рекомендаций',
        read_more: 'Подробнее',
        no_articles: 'Нет доступных статей',
        loading: 'Загрузка статей...',
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
        rights: '© 2026 Мировой фестиваль молодежи Марокко. Все права защищены.',
        made_with: 'Сделано с ❤️ в Марокко',
        sitemap: 'Карта сайта',
      },
    }),
    []
  );

  const t = (key) => I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;

  // Pagination calculations
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);
  const displayFeaturedArticle = currentPage === 1 && articles[0]; // Featured article only on first page
  const otherArticles = currentPage === 1 ? articles.slice(1, articlesPerPage) : currentArticles;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_partners'), path: '/partners' },
    { name: t('nav_contact'), path: '/contact' },
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
              className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            >
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                  alt="WYF Logo"
                  className="h-12 sm:h-14 w-auto"
                />
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
                    className={`absolute -bottom-1 ${currentLanguage === 'ar' ? 'right-0' : 'left-0'} h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                      item.path === '/news' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Controls */}
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
                  href="https://www.instagram.com/wyfmorocco/"
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
                  <div className={`absolute mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${
                    currentLanguage === 'ar' ? 'left-0' : 'right-0'
                  }`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between ${
                          currentLanguage === 'ar' ? 'text-right' : 'text-left'
                        }`}
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
            <div className={`fixed top-16 h-[calc(100vh-64px)] w-[88%] max-w-sm bg-white shadow-2xl flex flex-col ${
              currentLanguage === 'ar' ? 'left-0 border-r' : 'right-0 border-l'
            } border-gray-100`}>
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
                      className={`w-full px-4 py-4 rounded-xl hover:bg-brand-red/10 text-gray-800 font-semibold text-lg transition-all duration-300 block border-2 border-transparent hover:border-brand-red/30 ${
                        currentLanguage === 'ar' ? 'text-right' : 'text-left'
                      }`}
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
      <section className="pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-gray-900 via-brand-red/10 to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 px-5 py-2 rounded-full border border-brand-red/20 mb-6">
              <Newspaper className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold text-brand-red uppercase tracking-widest">Latest Updates</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              {t('news_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              {t('news_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
                </div>
                <p className="text-gray-500 text-lg mt-4">{t('loading')}</p>
              </div>
            </div>
          ) : articles.length > 0 ? (
            <div className="space-y-12">
              {/* Featured Article */}
              {articles[0] && (
                <div className="group relative rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-brand-red/50 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image */}
                    {articles[0].image_url && (
                      <div className="relative h-64 lg:h-full overflow-hidden bg-gray-200">
                        <img
                          src={articles[0].image_url}
                          alt={articles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                          <span className="bg-brand-red text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          {articles[0].date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-brand-red" />
                              <span className="font-semibold">{new Date(articles[0].date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight group-hover:text-brand-red transition-colors">
                          {articles[0].title}
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                          {articles[0].content.substring(0, 200)}...
                        </p>
                      </div>
                      <button onClick={() => setSelectedArticle(articles[0])} className="inline-flex items-center gap-3 text-brand-red font-bold hover:gap-4 transition-all group/btn">
                        <span className="text-base">{t('read_more')}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Articles Grid */}
              {articles.length > 1 && (
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">More Stories</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.slice(1).map((article, idx) => (
                      <div
                        key={article.id}
                        className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-brand-red/50 hover:shadow-xl transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700"
                        style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                        onClick={() => setSelectedArticle(article)}
                      >
                        {/* Image */}
                        {article.image_url && (
                          <div className="relative h-48 overflow-hidden bg-gray-200">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 sm:p-7">
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                            {article.date && (
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-brand-red" />
                                <span className="font-semibold">{new Date(article.date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                            {article.content}
                          </p>
                          <div className="flex items-center gap-2 text-brand-red font-semibold text-sm group-hover:gap-3 transition-all">
                            <span>{t('read_more')}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24">
              <Newspaper className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 text-lg font-semibold">{t('no_articles')}</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates</p>
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Article</h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10">
              {selectedArticle.image_url && (
                <img
                  src={selectedArticle.image_url}
                  alt={selectedArticle.title}
                  className="w-full rounded-2xl mb-8 object-cover max-h-96"
                />
              )}

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                {selectedArticle.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-red" />
                    <span className="font-semibold">{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  <span>Close Article</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 text-gray-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="mb-12 sm:mb-16">
            <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-brand-silver/40 p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Stay Updated
                </h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to get the latest news and updates
                </p>
                <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 sm:gap-10">
            <div className="md:col-span-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                alt="WYF Logo"
                className="h-16 sm:h-20 w-auto mb-5"
              />
              <p className="text-gray-700 leading-relaxed mb-7 text-sm sm:text-base">
                {t('footer_tagline')}
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 tracking-wide">
                  {t('platform')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('scholarships')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('jobs')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('programs')}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 tracking-wide">
                  {t('company')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('about_us')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('contact')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('careers')}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 tracking-wide">
                  {t('legal')}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('privacy')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('terms')}</a></li>
                  <li><a href="#" className="hover:text-brand-red transition-colors">{t('cookies')}</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-brand-silver/40 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-600">{t('rights')}</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                <span className="text-xs sm:text-sm text-gray-600">{t('made_with')}</span>
                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-brand-red transition-colors">
                  {t('sitemap')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
