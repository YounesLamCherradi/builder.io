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
  Check,
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
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const sponsorsScrollRef = useRef<HTMLDivElement>(null);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
    }
  };

  const scrollSponsors = (direction: 'left' | 'right') => {
    if (sponsorsScrollRef.current) {
      const scrollAmount = 400;
      if (direction === 'left') {
        sponsorsScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        sponsorsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
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

  useEffect(() => {
    const loadPartners = async () => {
      const data = await fetchPartners();
      if (data.length > 0) setPartnersList(data);
    };
    loadPartners();
  }, []);

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
        institutional_partners: 'Institutional Partners',
        institutional_partners_desc: 'Trusted by leading organizations worldwide',
        partners_desc_call: 'Partner with us or list your organization',
        get_in_touch: 'Get in Touch',
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
        nav_resources: 'Team',
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
        institutional_partners: 'الشركاء المؤسسيون',
        institutional_partners_desc: 'موثوق به من قبل المنظمات الرائدة في العالم',
        partners_desc_call: 'شارك معنا أو اعرض مؤسستك',
        get_in_touch: 'تواصل معنا',
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
        nav_resources: 'الموارد',
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
        institutional_partners: 'Институциональные партнёры',
        institutional_partners_desc: 'Пользуется доверием ведущих организаций мира',
        partners_desc_call: 'Сотрудничайте с нами или зарегистрируйте вашу организацию',
        get_in_touch: 'Свяжитесь с нами',
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
        nav_resources: 'Ресурсы',
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

      {/* Partners Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(187,9,9,0.15)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        {/* Floating animated orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full mb-4 border border-brand-red/30 animate-pulse" style={{ animationDuration: '3s' }}>
              {t('institutional_partners')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t('institutional_partners')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t('institutional_partners_desc')}
            </p>
          </div>

          {/* Partners Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSponsors('left')}
              className="hidden lg:flex absolute left-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scroll Container - Show Institutional partners */}
            <div
              ref={sponsorsScrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 scrollbar-hide"
            >
              {partnersList.filter(p => p.type === 'institutional').map((partner, index) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Logo Card */}
                <div className="relative h-28 sm:h-32 lg:h-36 w-40 sm:w-48 lg:w-56 rounded-2xl border-2 border-gray-200 group-hover:border-brand-red transition-all duration-500 bg-white flex items-center justify-center overflow-hidden hover:shadow-2xl hover:shadow-red-200/40">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/8 via-transparent to-brand-silver/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Accent bar with animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-silver to-brand-red scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-500 group-hover:drop-shadow-lg" />

                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center h-full p-4">
                    {partner.logo_url && (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-20 sm:h-24 lg:h-28 w-auto group-hover:scale-110 transition-all duration-500 object-contain"
                      />
                    )}
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-brand-red/0 group-hover:bg-brand-red/10 transition-all duration-500 pointer-events-none" />
                </div>

                {/* Text Label Below Card */}
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-brand-red transition-all duration-300 text-center w-40 sm:w-48 lg:w-56">
                  {partner.name}
                </p>
              </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollSponsors('right')}
              className="hidden lg:flex absolute right-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Informational Partners Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(187,9,9,0.15)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        {/* Floating animated orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full mb-4 border border-brand-red/30 animate-pulse" style={{ animationDuration: '3s' }}>
              Informational Partners
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Informational Partners
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Knowledge partners and information sources supporting our mission
            </p>
          </div>

          {/* Partners Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSponsors('left')}
              className="hidden lg:flex absolute left-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scroll Container - Show Informational partners */}
            <div
              ref={sponsorsScrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 scrollbar-hide"
            >
              {partnersList.filter(p => p.type === 'informational').map((partner, index) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Logo Card */}
                <div className="relative h-28 sm:h-32 lg:h-36 w-40 sm:w-48 lg:w-56 rounded-2xl border-2 border-gray-200 group-hover:border-brand-red transition-all duration-500 bg-white flex items-center justify-center overflow-hidden hover:shadow-2xl hover:shadow-red-200/40">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/8 via-transparent to-brand-silver/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Accent bar with animation */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-silver to-brand-red scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-500 group-hover:drop-shadow-lg" />

                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-center h-full p-4">
                    {partner.logo_url && (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-20 sm:h-24 lg:h-28 w-auto group-hover:scale-110 transition-all duration-500 object-contain"
                      />
                    )}
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-brand-red/0 group-hover:bg-brand-red/10 transition-all duration-500 pointer-events-none" />
                </div>

                {/* Text Label Below Card */}
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-brand-red transition-all duration-300 text-center w-40 sm:w-48 lg:w-56">
                  {partner.name}
                </p>
              </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollSponsors('right')}
              className="hidden lg:flex absolute right-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-in {
            animation: fade 0.6s ease-out forwards;
            opacity: 0;
          }

          .fade-in {
            animation: fade 0.6s ease-out forwards;
            opacity: 0;
          }

          .slide-in-from-bottom-4 {
            animation: slideUp 0.6s ease-out forwards;
          }

          .slide-in-from-bottom-6 {
            animation: slideUp 0.6s ease-out forwards;
          }

          .slide-in-from-bottom-8 {
            animation: slideUp 0.6s ease-out forwards;
          }

          .delay-100 {
            animation-delay: 100ms;
          }

          .delay-300 {
            animation-delay: 300ms;
          }

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
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white via-amber-50/40 to-green-50/30 text-gray-800 pt-12 sm:pt-16 pb-10 sm:pb-12 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 sm:gap-10">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="relative shrink-0">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                    alt="WYF Logo"
                    className="h-16 sm:h-20 w-auto"
                  />
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
    </main>
  );
}
