import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { fetchPartners, type Partner } from '../lib/supabase';

export default function Partners() {
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
        sign_in: 'Sign In',
        get_started: 'Get Started',
        partners_quote_1: 'The Youth of WYF are those who will make a',
        partners_quote_2: 'constructive point and shape this new world architecture',
        partners_attribution: '— Leonid Slutsky',
        partners_attribution_role: 'Chairman of the State Duma Committee on International Affairs',
      },
      ar: {
        nav_home: 'الرئيسية',
        nav_news: 'الأخبار',
        nav_about: 'معلومات عنا',
        nav_partners: 'الشركاء',
        nav_contact: 'اتصل بنا',
        sign_in: 'تسجيل الدخول',
        get_started: 'ابدأ الآن',
        partners_quote_1: 'شباب مهرجان الشباب العالمي هم من سيحققون',
        partners_quote_2: 'نقطة بناءة ويشكلون هذا العمارة العالمية الجديدة',
        partners_attribution: '— ليونيد سلوتسكي',
        partners_attribution_role: 'رئيس لجنة الشؤون الدولية في مجلس الدولة',
      },
      ru: {
        nav_home: 'Главная',
        nav_news: 'Новости',
        nav_about: 'О нас',
        nav_partners: 'Партнёры',
        nav_contact: 'Контакты',
        sign_in: 'Войти',
        get_started: 'Начать',
        partners_quote_1: 'Молодёжь МФМ - это те, кто внесут',
        partners_quote_2: 'конструктивный вклад и сформируют эту новую мировую архитектуру',
        partners_attribution: '— Леонид Слуцкий',
        partners_attribution_role: 'Председатель Комитета Госдумы по международным делам',
      },
    }),
    []
  );

  const t = (key) => I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;

  const menuItems = [
    { name: t('nav_home'), path: '/' },
    { name: t('nav_news'), path: '/news' },
    { name: t('nav_about'), path: '/about' },
    { name: t('nav_partners'), path: '/partners' },
    { name: t('nav_contact'), path: '/contact' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-brand-red transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-red to-gray-900 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span>WYF Morocco</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  activeSection === menuItems.indexOf(item)
                    ? 'text-brand-red'
                    : 'text-gray-700 hover:text-brand-red'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Language Selector & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative" data-lang-menu>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
              >
                <span className="text-lg">{languages.find(l => l.code === currentLanguage)?.flag}</span>
                <span className="hidden sm:inline">{languages.find(l => l.code === currentLanguage)?.code.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code);
                        setLanguageMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 bg-white">
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-brand-red transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fdbc1960e871c41fea425a6c865e4946d?format=webp&width=800&height=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.08,
          }}
        />

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-50/20 to-white/10" />

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 right-0 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
        </div>

        {/* Main Hero Content */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10 pt-16 sm:pt-20 pb-12 sm:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left side - Profile Image */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F1b18b24cd31a4b7982fc6278d3e220a6?format=webp&width=800&height=1200"
                alt="Leonid Slutsky"
                className="w-full max-w-sm sm:max-w-2xl h-auto"
              />
            </div>

            {/* Right side - Quote and Attribution */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              {/* Quote */}
              <div className="space-y-4">
                <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-snug">
                  {t('partners_quote_1')}
                  <span className="block text-brand-red mt-2">{t('partners_quote_2')}</span>
                </blockquote>

                {/* Attribution */}
                <div className="space-y-1 pt-3 border-t border-brand-red/30">
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {t('partners_attribution')}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t('partners_attribution_role')}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  to="/news"
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-red to-red-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Explore More</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-400">
              © 2026 WYF Morocco. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
