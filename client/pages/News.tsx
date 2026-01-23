import React, { useState, useEffect, useMemo } from 'react';
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
        nav_contact: 'Contact',
        news_title: 'Latest News & Articles',
        news_subtitle: 'Stay updated with our latest news, announcements, and insights',
        read_more: 'Read More',
        no_articles: 'No articles available',
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
        nav_contact: 'اتصل بنا',
        news_title: 'أحدث الأخبار والمقالات',
        news_subtitle: 'ابقَ محدثاً مع أحدث أخبارنا والإعلانات والرؤى',
        read_more: 'اقرأ المزيد',
        no_articles: 'لا توجد مقالات متاحة',
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
        nav_contact: 'Контакты',
        news_title: 'Последние новости и статьи',
        news_subtitle: 'Будьте в курсе наших последних новостей, объявлений и рекомендаций',
        read_more: 'Подробнее',
        no_articles: 'Нет доступных статей',
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

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  const selectedLang = languages.find((l) => l.code === currentLanguage) ?? languages[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white backdrop-blur-lg shadow-lg' : 'bg-white/90 backdrop-blur-sm'
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
                  className={`text-gray-700 hover:text-brand-red font-medium transition-colors ${
                    item.path === '/news' ? 'text-brand-red' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative" data-lang-menu="true">
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
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 top-16 pt-0">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm top-16"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-16 right-0 h-[calc(100vh-64px)] w-[88%] max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col">
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
              {t('news_title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('news_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500 text-lg">{t('loading')}</p>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-brand-red/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Image */}
                  {article.image_url && (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      {article.published_at && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.published_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {article.content}
                    </p>
                    <button className="inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all">
                      <span>{t('read_more')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t('no_articles')}</p>
            </div>
          )}
        </div>
      </section>

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
