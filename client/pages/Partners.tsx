import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { fetchPartners, type Partner, fetchPartnerVisions, type PartnerVision } from "../lib/supabase";

export default function Partners() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedLanguage") || "en";
    }
    return "en";
  });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [partnerVisionsList, setPartnerVisionsList] = useState<PartnerVision[]>([]);
  const sponsorsScrollRef = useRef<HTMLDivElement>(null);
  const visionsScrollRef = useRef<HTMLDivElement>(null);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", lang);
    }
  };

  const scrollSponsors = (direction: "left" | "right") => {
    if (sponsorsScrollRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        sponsorsScrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        sponsorsScrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = document.querySelectorAll(".scroll-section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(index);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target?.closest?.("[data-lang-menu]");
      if (!el) setLanguageMenuOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const loadPartners = async () => {
      const data = await fetchPartners();
      if (data.length > 0) setPartnersList(data);
      const visionsData = await fetchPartnerVisions();
      if (visionsData.length > 0) setPartnerVisionsList(visionsData);
    };
    loadPartners();
  }, []);

  // Set RTL direction for Arabic language
  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;
      const isArabic = currentLanguage === "ar";
      htmlElement.setAttribute("dir", isArabic ? "rtl" : "ltr");
      htmlElement.setAttribute("lang", currentLanguage);
      if (isArabic) {
        htmlElement.classList.add("rtl");
      } else {
        htmlElement.classList.remove("rtl");
      }
    }
  }, [currentLanguage]);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇲🇦" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const I18N = useMemo(
    () => ({
      en: {
        nav_home: "Home",
        nav_news: "News",
        nav_about: "About Us",
        nav_partners: "Partners",
        nav_contact: "Contact",
        sign_in: "Sign In",
        get_started: "Get Started",
        partners_quote_1: "The Youth of WYF are those who will make a",
        partners_quote_2:
          "constructive point and shape this new world architecture",
        partners_attribution: "— Leonid Slutsky",
        partners_attribution_role:
          "Chairman of the State Duma Committee on International Affairs",
        institutional_partners: "Institutional Partners",
        institutional_partners_desc:
          "Trusted by leading organizations worldwide",
        partners_desc_call: "Partner with us or list your organization",
        get_in_touch: "Get in Touch",
        footer_tagline: "Empowering Moroccans to achieve their global dreams.",
        platform: "Platform",
        company: "Organization",
        legal: "Legal",
        scholarships: "Scholarships",
        jobs: "Jobs",
        programs: "Programs",
        about_us: "About Us",
        contact: "Contact",
        careers: "Careers",
        blog: "Blog",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy",
        rights: "© 2026 WYF Morocco. All rights reserved.",
        made_with: "Made with ❤️ in Morocco",
        sitemap: "Sitemap",
        nav_resources: "Team",
        language: "Language",
        telegram: "Telegram",
        instagram: "Instagram",
        version: "v1.0.0 • 2026",

        // Informational Partners Section
        informational_partners: "Informational Partners",
        informational_partners_desc:
          "Knowledge partners and information sources supporting our mission",

        // Vision of our Partners Section
        vision_of_partners: "Vision of Our Partners",
        vision_of_partners_desc:
          "Hear from our partners about their vision of cooperation and partnership",

        // International Affiliation Section
        affiliation_quote:
          '"The Youth Assembly is a space for real dialogue and joint action, where young people from different countries come together to exchange experiences, find common ground, and co-create projects based on cooperation and trust"',
        affiliation_author: "Anastasia Shishkina",
        affiliation_role: "Head of the Directorate for Youth Cooperation",
        affiliation_org: "World Peoples Assembly",
        world_assembly_title: "World Peoples Assembly",
        world_assembly_desc:
          'An international platform uniting young leaders and organizations from across the globe to promote dialogue, public diplomacy, and sustainable international cooperation. In 2025, the Assembly brought together representatives from over 25 countries through the International Youth Forum "Generation of Unity" and the Public Talk "The Voice of Time", strengthening global youth partnerships.',
      },
      ar: {
        nav_home: "الرئيسية",
        nav_news: "الأخبار",
        nav_about: "معلومات عنا",
        nav_partners: "الشركاء",
        nav_contact: "اتصل بنا",
        sign_in: "تسجيل الدخول",
        get_started: "ابدأ الآن",
        partners_quote_1: "شباب مهرجان الشباب العالمي هم من سيحققون",
        partners_quote_2: "نقطة بناءة ويشكلون هذا العمارة العالمية الجديدة",
        partners_attribution: "— ليونيد سلوتسكي",
        partners_attribution_role: "رئيس لجنة الشؤون الدولية في مجلس الدولة",
        institutional_partners: "الشركاء المؤسسيون",
        institutional_partners_desc:
          "موثوق به من قبل المنظمات الرائدة في العالم",
        partners_desc_call: "شارك معنا أو اعرض مؤسستك",
        get_in_touch: "تواصل معنا",
        footer_tagline: "تمكين المغاربة لتحقيق أحلامهم العالمية.",
        platform: "المنصة",
        company: "الشركة",
        legal: "قانوني",
        scholarships: "المنح الدراسية",
        jobs: "الوظائف",
        programs: "البرامج",
        about_us: "عننا",
        contact: "اتصل بنا",
        careers: "الوظائف",
        blog: "المدونة",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        cookies: "سياسة ملفات تعريف الارتباط",
        rights: "© 2026 مهرجان الشباب العالمي المغربي. جميع الحقوق محفوظة.",
        made_with: "صُنع بـ ❤️ في المغرب",
        sitemap: "خريطة الموقع",
        nav_resources: "الموارد",
        language: "اللغة",
        telegram: "تيليجرام",
        instagram: "إنستغرام",
        version: "v1.0.0 • 2026",

        // Informational Partners Section
        informational_partners: "شركاء المعلومات",
        informational_partners_desc:
          "شركاء المعرفة ومصادر المعلومات الداعمة لمهمتنا",

        // Vision of our Partners Section
        vision_of_partners: "رؤية شركائنا",
        vision_of_partners_desc:
          "استمع إلى شركائنا حول رؤيتهم للتعاون والشراكة",

        // International Affiliation Section
        affiliation_quote:
          '"جمعية الشباب هي مساحة للحوار الحقيقي والعمل المشترك، حيث يتجمع الشباب من دول مختلفة لتبادل الخبرات والعثور على أرضية مشتركة وإنشاء مشاريع مشتركة بناءً على التعاون والثقة"',
        affiliation_author: "أناستازيا شيشكينا",
        affiliation_role: "رئيسة مديرية التعاون الشبابي",
        affiliation_org: "جمعية الشعوب العالمية",
        world_assembly_title: "جمعية الشعوب العالمية",
        world_assembly_desc:
          'منصة دولية توحد قادة الشباب والمنظمات من جميع أنحاء العالم لتعزيز الحوار والدبلوماسية العامة والتعاون الدولي المستدام. في عام 2025، جمعت الجمعية ممثلين من أكثر من 25 دولة من خلال المنتدى الشبابي الدولي "جيل الوحدة" والنقاش العام "صوت الوقت"، مما يعزز الشراكات الشبابية العالمية.',
      },
      ru: {
        nav_home: "Главная",
        nav_news: "Новости",
        nav_about: "О нас",
        nav_partners: "Партнёры",
        nav_contact: "Контакты",
        sign_in: "Войти",
        get_started: "Начать",
        partners_quote_1: "Молодёжь МФМ - это те, кто внесут",
        partners_quote_2:
          "конструктивный вклад и сформируют эту новую мировую архитектуру",
        partners_attribution: "— Леонид Слуцкий",
        partners_attribution_role:
          "Председатель Комитета Госдумы по международным делам",
        institutional_partners: "Институциональные партнёры",
        institutional_partners_desc:
          "Пользуется доверием ведущих организаций мира",
        partners_desc_call:
          "Сотрудничайте с нами или зарегистрируйте вашу организацию",
        get_in_touch: "Свяжитесь с нами",
        footer_tagline: "Помогаем марокканцам достигать глобальных целей.",
        platform: "Платформа",
        company: "Компания",
        legal: "Юридическое",
        scholarships: "Стипендии",
        jobs: "Работа",
        programs: "Программы",
        about_us: "О нас",
        contact: "Контакты",
        careers: "Карьера",
        blog: "Блог",
        privacy: "Конфиденциальность",
        terms: "Условия",
        cookies: "Cookies",
        rights:
          "© 2026 Мировой фестиваль молодежи Марокко. Все права защищены.",
        made_with: "Сделано с ❤️ в Марокко",
        sitemap: "Карта сайта",
        nav_resources: "Ресурсы",
        language: "Язык",
        telegram: "Телеграм",
        instagram: "Инстаграм",
        version: "v1.0.0 • 2026",

        // Informational Partners Section
        informational_partners: "Информационные партнёры",
        informational_partners_desc:
          "Партнёры по знаниям и информационные источники, поддерживающие нашу миссию",

        // Vision of our Partners Section
        vision_of_partners: "Видение наших партнёров",
        vision_of_partners_desc:
          "Услышьте от наших партнёров об их видении сотрудничества и партнёрства",

        // International Affiliation Section
        affiliation_quote:
          '"Молодёжное собрание - это пространство для подлинного диалога и совместных действий, где молодые люди из разных стран собираются для обмена опытом, поиска общей почвы и создания совместных проектов на основе сотрудничества и доверия"',
        affiliation_author: "Анастасия Шишкина",
        affiliation_role: "Руководитель дирекции по молодёжному сотрудничеству",
        affiliation_org: "Всемирное собрание народов",
        world_assembly_title: "Всемирное собрание народов",
        world_assembly_desc:
          'Международная платформа, объединяющая молодых лидеров и организации со всего мира для содействия диалогу, публичной дипломатии и устойчивому международному сотрудничеству. В 2025 году Собрание объединило представителей из более чем 25 стран через Международный молодёжный форум "Поколение единства" и публичный диалог "Голос времени", укрепляя глобальные молодёжные партнёрства.',
      },
    }),
    [],
  );

  const t = (key) => I18N[currentLanguage]?.[key] ?? I18N.en[key] ?? key;

  const menuItems = [
    { name: t("nav_home"), path: "/" },
    { name: t("nav_news"), path: "/news" },
    { name: t("nav_about"), path: "/about" },
    { name: t("nav_partners"), path: "/partners" },
    { name: t("nav_contact"), path: "/contact" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between py-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                alt="WYF Logo"
                className="h-12 sm:h-14 w-auto"
              />
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
                    className={`absolute -bottom-1 ${currentLanguage === "ar" ? "right-0" : "left-0"} h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                      item.path === "/partners"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
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
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
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
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
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
                  <span className="text-sm">
                    {languages.find((l) => l.code === currentLanguage)?.flag}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {languages
                      .find((l) => l.code === currentLanguage)
                      ?.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      languageMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {languageMenuOpen && (
                  <div
                    className={`absolute mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${
                      currentLanguage === "ar" ? "left-0" : "right-0"
                    }`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between ${
                          currentLanguage === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span className="text-sm text-gray-800">
                            {lang.name}
                          </span>
                        </div>
                        {currentLanguage === lang.code && (
                          <Check className="w-4 h-4 text-brand-red" />
                        )}
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
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
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
            <div
              className={`fixed top-16 h-[calc(100vh-64px)] w-[88%] max-w-sm bg-white shadow-2xl flex flex-col ${
                currentLanguage === "ar"
                  ? "left-0 border-r"
                  : "right-0 border-l"
              } border-gray-100`}
            >
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
                        currentLanguage === "ar" ? "text-right" : "text-left"
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
                    <svg
                      className="w-5 h-5 text-brand-red"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.042 0-.084 0-.127-.01l.214-3.053 5.56-5.023c.242-.213-.054-.328-.375-.115L6.871 12.93l-2.99-.924c-1.294-.403-1.319-1.374.268-2.042l11.953-4.602c.55-.213 1.075.124.892.943z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">
                      Telegram
                    </span>
                  </a>
                  <a
                    href="https://www.instagram.com/wyfmorocco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-100 px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-brand-red"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c2.687 0 3.014.01 4.077.059 1.044.048 1.606.22 1.985.365.498.194.854.425 1.227.796.371.371.602.729.796 1.227.145.379.317.941.365 1.985.049 1.063.06 1.39.06 4.077s-.01 3.014-.059 4.077c-.048 1.044-.22 1.606-.365 1.985-.194.498-.425.854-.796 1.227-.371.371-.729.602-1.227.796-.379.145-.941.317-1.985.365-1.063.049-1.39.06-4.077.06s-3.014-.01-4.077-.059c-1.044-.048-1.606-.22-1.985-.365-.498-.194-.854-.425-1.227-.796-.371-.371-.602-.729-.796-1.227-.145-.379-.317-.941-.365-1.985-.049-1.063-.06-1.39-.06-4.077s.01-3.014.059-4.077c.048-1.044.22-1.606.365-1.985.194-.498.425-.854.796-1.227.371-.371.729-.602 1.227-.796.379-.145.941-.317 1.985-.365 1.063-.049 1.39-.06 4.077-.06z" />
                      <circle cx="12" cy="12" r="3.471" />
                      <circle cx="18.406" cy="5.594" r="0.813" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white pt-20">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fdbc1960e871c41fea425a6c865e4946d?format=webp&width=800&height=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
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
                  {t("partners_quote_1")}
                  <span className="block text-brand-red mt-2">
                    {t("partners_quote_2")}
                  </span>
                </blockquote>

                {/* Attribution */}
                <div className="space-y-1 pt-3 border-t border-brand-red/30">
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {t("partners_attribution")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t("partners_attribution_role")}
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
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span
              className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full mb-4 border border-brand-red/30 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              {t("institutional_partners")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("institutional_partners")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t("institutional_partners_desc")}
            </p>
          </div>

          {/* Partners Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSponsors("left")}
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
              {partnersList
                .filter((p) => p.type === "institutional")
                .map((partner, index) => (
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
              onClick={() => scrollSponsors("right")}
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
        <div
          className="absolute -top-32 -left-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span
              className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full mb-4 border border-brand-red/30 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              {t("informational_partners")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("informational_partners")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t("informational_partners_desc")}
            </p>
          </div>

          {/* Partners Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSponsors("left")}
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
              {partnersList
                .filter((p) => p.type === "informational")
                .map((partner, index) => (
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
              onClick={() => scrollSponsors("right")}
              className="hidden lg:flex absolute right-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <style>{`
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

      {/* Vision of our Partners Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(187,9,9,0.15)_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        {/* Floating animated orbs */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span
              className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-xs sm:text-sm font-semibold rounded-full mb-4 border border-brand-red/30 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              {t("vision_of_partners")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("vision_of_partners")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t("vision_of_partners_desc")}
            </p>
          </div>

          {/* Partner Visions Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (visionsScrollRef.current) {
                  visionsScrollRef.current.scrollBy({
                    left: -400,
                    behavior: "smooth",
                  });
                }
              }}
              className="hidden lg:flex absolute left-0 top-1/2 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scroll Container - Show Partner Visions */}
            <div
              ref={visionsScrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 scrollbar-hide"
            >
              {partnerVisionsList.map((vision, index) => (
                <div
                  key={vision.id}
                  className="group flex flex-col flex-shrink-0 animate-in fade-in slide-in-from-bottom-8 duration-500 w-96 sm:w-[480px]"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Vision Card */}
                  <div className="relative rounded-3xl overflow-hidden bg-white h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-brand-red/30">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-silver to-brand-red scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-700" />

                    {/* Image - Larger */}
                    <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                      {vision.image_url && (
                        <img
                          src={vision.image_url}
                          alt={vision.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                      {/* Image overlay - enhanced */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-red/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content - Enhanced spacing */}
                    <div className="relative z-10 flex-1 p-7 sm:p-8 flex flex-col justify-between bg-white/95 backdrop-blur-sm">
                      {/* Name and Position */}
                      <div className="mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-brand-red transition-colors duration-300 leading-tight">
                          {vision.name}
                        </h3>
                        <p className="text-sm sm:text-base text-brand-red font-semibold mt-2 tracking-wide uppercase">
                          {vision.position}
                        </p>
                        <div className="h-1 w-12 bg-gradient-to-r from-brand-red to-transparent mt-3 group-hover:w-20 transition-all duration-300" />
                      </div>

                      {/* Quote - Fully displayed */}
                      <div className="space-y-4">
                        <div className="text-brand-red/60 text-4xl leading-none">
                          "
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 italic font-light leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {vision.quote}
                        </p>
                        <div className="text-brand-red/60 text-4xl leading-none text-right">
                          "
                        </div>
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/0 via-brand-red/0 to-brand-red/0 group-hover:from-brand-red/5 group-hover:via-transparent group-hover:to-brand-red/5 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                if (visionsScrollRef.current) {
                  visionsScrollRef.current.scrollBy({
                    left: 400,
                    behavior: "smooth",
                  });
                }
              }}
              className="hidden lg:flex absolute right-0 top-1/2 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* International Affiliation Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-50 to-white py-16 sm:py-20 lg:py-28">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fdbc1960e871c41fea425a6c865e4946d?format=webp&width=800&height=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
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

        {/* Main Content */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left side - Image */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="relative w-full max-w-sm sm:max-w-2xl">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F1af03a62cabc4172ad9eddeb3f8790aa?format=webp&width=800&height=1200"
                  alt="Anastasia Shishkina"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000">
              {/* First Quote - Youth Assembly */}
              <div className="space-y-4">
                <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 leading-snug">
                  {t("affiliation_quote")}
                </blockquote>

                {/* Attribution */}
                <div className="space-y-1 pt-3 border-t border-brand-red/30">
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    {t("affiliation_author")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t("affiliation_role")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">
                    {t("affiliation_org")}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-1 bg-gradient-to-r from-brand-red/20 via-brand-red to-brand-red/20 rounded-full my-6" />

              {/* Second Section */}
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-brand-red to-transparent rounded-full" />
                  {t("world_assembly_title")}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {t("world_assembly_desc")}
                </p>

                {/* World Peoples Assembly Image */}
                <div className="rounded-2xl overflow-hidden border border-brand-red/20 hover:border-brand-red/50 transition-all duration-300 h-64 sm:h-80">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F8bea44c5c4fc4bd3ac9176a0feed3f6c?format=webp&width=800&height=1200"
                    alt="World Peoples Assembly Conference"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
                {t("footer_tagline")}
              </p>
            </div>

            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t("platform")}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-brand-red transition-colors"
                    >
                      {t("nav_home")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news"
                      className="hover:text-brand-red transition-colors"
                    >
                      {t("nav_news")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/partners"
                      className="hover:text-brand-red transition-colors"
                    >
                      {t("nav_partners")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-wide">
                  {t("company")}
                </h4>
                <ul className="space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li>
                    <Link
                      to="/about"
                      className="hover:text-brand-red transition-colors"
                    >
                      {t("about_us")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-brand-red transition-colors"
                    >
                      {t("contact")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-brand-silver/40 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <p>{t("rights")}</p>
              <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-2">
                <span>{t("made_with")}</span>
                <a href="#" className="hover:text-brand-red transition-colors">
                  {t("sitemap")}
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
