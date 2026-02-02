import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  subscribeNewsletter,
  fetchGallery,
  fetchPartners,
  fetchNews,
  type GalleryItem,
  type Partner,
  type NewsArticle,
} from "../lib/supabase";
import { toast } from "sonner";
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
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Check,
  Calendar,
} from "lucide-react";

export default function Index() {
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const sponsorsScrollRef = useRef<HTMLDivElement>(null);
  const newsScrollRef = useRef<HTMLDivElement>(null);

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

  const scrollNews = (direction: "left" | "right") => {
    if (newsScrollRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        newsScrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        newsScrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setSubmittingNewsletter(true);
    try {
      const success = await subscribeNewsletter(newsletterEmail);
      if (success) {
        toast.success("Thank you for subscribing!");
        setNewsletterEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Error subscribing to newsletter");
    } finally {
      setSubmittingNewsletter(false);
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

  useEffect(() => {
    const loadData = async () => {
      const [gallery, partners, news] = await Promise.all([
        fetchGallery(),
        fetchPartners(),
        fetchNews(),
      ]);
      if (gallery.length > 0) setGalleryItems(gallery);
      if (partners.length > 0) setPartnersList(partners);
      if (news.length > 0) {
        // Data is already sorted by order_index from Supabase query
        setNewsList(news);
      }
    };
    loadData();
  }, []);

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
        nav_stories: "Success Stories",
        nav_resources: "Team",
        nav_contact: "Contact",
        sign_in: "Sign In",
        get_started: "Get Started",

        serving: "🇲🇦 Serving 50,000+ Moroccan Students",
        hero_line1: "Transform Your",
        hero_line2: "Global Dreams",
        hero_line3: "Into Reality",
        hero_desc:
          "Discover thousands of scholarships, jobs, and international programs tailored for talented Moroccans. Your passport to global success starts here.",
        explore_opps: "Explore Opportunities",
        who_we_are: "Who We Are",

        stat_users: "Active Users",
        stat_countries: "Countries",
        stat_success: "Success Rate",
        stat_support: "Support",

        hero_stat_users: "Youth Reached",
        hero_stat_countries: "Partners",
        hero_stat_success: "Countries",
        hero_stat_support: "Support",

        latest_updates: "Latest Updates",
        trending_now: "Trending Now",
        read: "Read",
        back_to_news: "Back to News",

        opps_title_1: "Discover Your",
        opps_title_2: "Perfect Match",
        opps_desc:
          "Browse thousands of verified opportunities across multiple categories",
        explore: "Explore",

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

        opp_scholarships: "Scholarships",
        opp_jobs: "Jobs & Internships",
        opp_exchange: "Exchange Programs",
        opp_grants: "Grants & Fellowships",
        opp_desc_sch: "Full & partial funding",
        opp_desc_jobs: "Global positions",
        opp_desc_ex: "Cultural immersion",
        opp_desc_grants: "Research funding",

        feat_match: "Instant Matching",
        feat_match_desc:
          "AI matches you with the best opportunities based on your profile in seconds",
        feat_dash: "Personalized Dashboard",
        feat_dash_desc:
          "Track applications, deadlines, and get tailored recommendations",
        feat_comm: "Community Support",
        feat_comm_desc:
          "Connect with mentors and peers who've succeeded in their journey",
        feat_lib: "Resource Library",
        feat_lib_desc: "Access guides, templates, and tutorials for every step",
        feat_review: "Application Review",
        feat_review_desc: "Get expert feedback on your essays and documents",
        feat_analytics: "Success Analytics",
        feat_analytics_desc:
          "Insights on acceptance rates and competition levels",

        tagline: "Your World Awaits",
        explore_all_opps: "Explore All Opportunities",
        moments_of: "Moments of",
        moroccan_success: "WYF Morocco Impact",
        made_with: "Made with ❤️ in Morocco",
        sitemap: "Sitemap",
        subscribe_privacy:
          "We respect your privacy. Unsubscribe anytime. No spam, ever.",
        subscribe_now: "Subscribe Now",

        morocco: "Morocco",
        morocco_subtitle: "Foundation Hub",
        morocco_b1: "Local University Network",
        morocco_b2: "Career Development Centers",
        morocco_b3: "Student Support Services",
        morocco_b4: "Scholarship Guidance",
        morocco_b5: "Test Preparation Programs",
        morocco_stat: "Students Served",

        china: "China",
        china_subtitle: "BRI Partnership",
        china_b1: "Belt & Road Scholarships",
        china_b2: "Chinese Government Grants",
        china_b3: "Technology Exchange Programs",
        china_b4: "Engineering Fellowships",
        china_b5: "Cultural Integration Support",
        china_stat: "Active Placements",

        russia: "Russia",
        russia_subtitle: "Federal Programs",
        russia_b1: "Government Scholarships",
        russia_b2: "Research Grants",
        russia_b3: "Academic Exchange",
        russia_b4: "Science & Innovation Focus",
        russia_b5: "Language Training Support",
        russia_stat: "Annual Opportunities",

        south_america: "South America",
        sa_subtitle: "Regional Network",
        sa_b1: "Brazilian Partnerships",
        sa_b2: "Argentine Universities",
        sa_b3: "Chilean Innovation Programs",
        sa_b4: "Cultural Exchange Initiatives",
        sa_b5: "Spanish Language Programs",
        sa_stat: "Growing Network",

        inspiring_text:
          "Celebrating real journeys of Moroccan youth — from international assemblies and cultural exchanges to leadership roles and global collaborations.",

        home_stay_updated_title: "Stay Updated with",
        home_stay_updated_highlight: "Global Opportunities",
        home_stay_updated_desc:
          "Get the latest scholarships, internships, success stories and exclusive tips delivered to your inbox every month.",
        home_email_placeholder: "Enter your email address",

        sponsors_title: "Our Partners",
        sponsors_desc: "Trusted by leading organizations worldwide",

        caption_1: "Conference Panel – Global Perspectives Shared",
        caption_2: "Youth Delegation – Morocco Represented with Pride",
        caption_3: "Workshop Excellence – Learning and Growth",
        caption_4: "International Summit – Networking Moments",
        caption_5: "Cultural Showcase – Moroccan Heritage Celebrated",
        caption_6: "Team Collaboration – Success Through Unity",
        caption_7: "Achievement Recognition – Celebrating Excellence",
        caption_8: "Global Forum – Moroccan Leaders Speaking",
        caption_9: "Festival Participation – Youth Engagement",
        caption_10: "Strategic Discussions – Building Bridges",
        caption_11: "Community Gathering – Shared Values",
        caption_12: "Professional Development – Advancing Careers",
        caption_13: "Exchange Program Success – Cultural Exchange",
        caption_14: "Diplomatic Mission – Representing Morocco",
        caption_15: "Student Initiative – Innovation Showcase",
        caption_16: "Regional Conference – Moroccan Presence",
        caption_17: "Legacy Building – Future Leaders United",

        // Hero section strings
        official_page_wyf: "Official Page of WYF Morocco",
        putin_quote_1: "Russia is now your friend.",
        putin_quote_2: "Our doors are always open to you.",
        putin_attribution:
          "— Vladimir Putin, Closing Ceremony of World Youth Festival (2024)",
        wyf_description:
          "The official page of the National Committee of Morocco for the World Youth Festival, the largest youth network in Africa.",

        // Sponsors section strings
        partners_desc_call: "Partner with us or list your organization",
        get_in_touch: "Get in Touch",

        // News section strings
        news_title: "News & Updates",
        news_desc: "Stay informed with our latest news and announcements",
        no_news_available: "No news articles available yet",
      },

      ar: {
        nav_home: "الرئيسية",
        nav_news: "الأخبار",
        nav_about: "عننا",
        nav_partners: "الشركاء",
        nav_stories: "قصص النجاح",
        nav_resources: "الموارد",
        nav_contact: "اتصل بنا",
        sign_in: "تسجيل الدخول",
        get_started: "ابدأ الآن",

        serving: "🇲🇦 خدمة أكثر من 50,000 طالب مغربي",
        hero_line1: "حول",
        hero_line2: "أحلامك العالمية",
        hero_line3: "إلى واقع",
        hero_desc:
          "اكتشف آلاف المنح الدراسية والوظائف والبرامج الدولية المخصصة للمواهب المغربية. تذكرتك نحو النجاح العالمي تبدأ هنا.",
        explore_opps: "استكشف الفرص",
        who_we_are: "من نحن",

        stat_users: "المستخدمون النشطون",
        stat_countries: "دول",
        stat_success: "معدل النجاح",
        stat_support: "الدعم",

        hero_stat_users: "الشباب المستهدفون",
        hero_stat_countries: "الدول المستهدفة",
        hero_stat_success: "معدل النجاح",
        hero_stat_support: "الدعم",

        latest_updates: "أحدث التحديثات",
        trending_now: "الاتجاه الحالي",
        read: "اقرأ",
        back_to_news: "العودة إلى الأخبار",

        opps_title_1: "ابحث عن",
        opps_title_2: "مطابقتك المثالية",
        opps_desc: "استكشف آلاف الفرص المتحققة في فئات متعددة",
        explore: "استكشف",

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
        rights: "© 2026 WYF Morocco. جميع الحقوق محفوظة.",

        opp_scholarships: "المنح الدراسية",
        opp_jobs: "الوظائف والتدريب",
        opp_exchange: "برامج التبادل",
        opp_grants: "المنح والزمالات",
        opp_desc_sch: "تمويل كامل/جزئي",
        opp_desc_jobs: "منصب دولي",
        opp_desc_ex: "الانغمار الثقافي",
        opp_desc_grants: "تمويل البحث",

        feat_match: "المطابقة الفورية",
        feat_match_desc: "تتطابق الذكاء الاصطناعي معك مع أفضل الفرص في ثوان",
        feat_dash: "لوحة المعلومات",
        feat_dash_desc: "تابع التطبيقات والمواعيد النهائية والتوصيات",
        feat_comm: "المجتمع",
        feat_comm_desc: "تواصل مع المرشدين والأقران",
        feat_lib: "مكتبة المراجع",
        feat_lib_desc: "أدلة وقوالب وبرامج تعليمية في كل خطوة",
        feat_review: "مراجعة التطبيق",
        feat_review_desc: "احصل على تعليقات خبيرة حول مقالاتك ومستنداتك",
        feat_analytics: "التحليلات",
        feat_analytics_desc: "رؤى معدلات القبول ومستويات المنافسة",

        tagline: "عالمك ينتظرك",
        explore_all_opps: "استكشف جميع الفرص",
        moments_of: "لحظات",
        moroccan_success: "تأثير النجاح المغربي",
        made_with: "صُنع بـ ❤️ في المغرب",
        sitemap: "خريطة الموقع",
        subscribe_privacy:
          "نحن نحترم خصوصيتك. ألغِ الاشتراك في أي وقت. لا بريد عشوائي أبداً.",
        subscribe_now: "اشترك الآن",

        morocco: "المغرب",
        morocco_subtitle: "مركز الأساس",
        morocco_b1: "شبكة الجامعات المحلية",
        morocco_b2: "مراكز التطور الوظيفي",
        morocco_b3: "خدمات دعم الطلاب",
        morocco_b4: "إرشادات المنح الدراسية",
        morocco_b5: "برامج الإعداد للاختبارات",
        morocco_stat: "الطلاب المخدومون",

        china: "الصين",
        china_subtitle: "شراكة الحزام والطريق",
        china_b1: "منح طريق الحرير",
        china_b2: "منح الحكومة الصينية",
        china_b3: "برامج التبادل التكنولوجي",
        china_b4: "زمالات الهندسة",
        china_b5: "دعم الاندماج الثقافي",
        china_stat: "التنسيب النشط",

        russia: "روسيا",
        russia_subtitle: "البرامج الاتحادية",
        russia_b1: "المنح الحكومية",
        russia_b2: "منح البحث",
        russia_b3: "التبادل الأكاديمي",
        russia_b4: "التركيز على العلوم والابتكار",
        russia_b5: "دعم التدريب اللغوي",
        russia_stat: "الفرص السنوية",

        south_america: "أمريكا الجنوبية",
        sa_subtitle: "الشبكة الإقليمية",
        sa_b1: "الشراكات البرازيلية",
        sa_b2: "الجامعات الأرجنتينية",
        sa_b3: "برامج الابتكار الشيلية",
        sa_b4: "مبادرات التبادل الثقافي",
        sa_b5: "برامج اللغة الإسبانية",
        sa_stat: "الشبكة المتنامية",

        inspiring_text:
          "الاحتفال برحلات حقيقية للشباب المغربي — من المنح والتبادلات إلى الأدوار القيادية والتعاون العالمي.",

        home_stay_updated_title: "ابق على تحديث مع",
        home_stay_updated_highlight: "الفرص العالمية",
        home_stay_updated_desc:
          "احصل على أحدث المنح والتدريبات وقصص النجاح والنصائح الحصرية المرسلة إلى صندوق الوارد الخاص بك كل شهر.",
        home_email_placeholder: "أدخل عنوان بريدك الإلكتروني",

        sponsors_title: "شركاؤنا",
        sponsors_desc: "موثوق به من قبل المنظمات الرائدة في العالم",

        caption_1: "لجنة المؤتمر - وجهات نظر عالمية مشتركة",
        caption_2: "وفد الشباب - المغرب ممثل بفخر",
        caption_3: "التميز في الورشة - التعلم والنمو",
        caption_4: "القمة الدولية - لحظات التواصل",
        caption_5: "عرض ثقافي - التراث المغربي احتفل به",
        caption_6: "التعاون الجماعي - النجاح من خلال الوحدة",
        caption_7: "الاعتراف بالإنجاز - الاحتفال بالتميز",
        caption_8: "المنتدى العالمي - قادة مغاربة يتحدثون",
        caption_9: "المشاركة في المهرجان - المشاركة الشبابية",
        caption_10: "النقاشات الاستراتيجية - بناء الجسور",
        caption_11: "التجمع المجتمعي - القيم المشتركة",
        caption_12: "التطور الوظيفي - تقدم المسارات الوظيفية",
        caption_13: "نجاح برنامج التبادل - التبادل الثقافي",
        caption_14: "المهمة الدبلوماسية - تمثيل المغرب",
        caption_15: "مبادرة الطلاب - عرض الابتكار",
        caption_16: "المؤتمر الإقليمي - الحضور المغربي",
        caption_17: "بناء الإرث - قادة المستقبل المتحدون",

        // Hero section strings
        official_page_wyf: "الصفحة الرسمية لمهرجان الشباب العالمي بالمغرب",
        putin_quote_1: "روسيا أصبحت صديقتك الآن.",
        putin_quote_2: "أبوابنا مفتوحة أمامك دائماً.",
        putin_attribution:
          "— فلاديمير بوتين، حفل الإغلاق لمهرجان الشباب العالمي (2024)",
        wyf_description:
          "الصفحة الرسمية للجنة الوطنية المغربية لمهرجان الشباب العالمي، أكبر شبكة شبابية في أفريقيا..',",

        // Sponsors section strings
        partners_desc_call: "شارك معنا أو اعرض مؤسستك",
        get_in_touch: "تواصل معنا",

        // News section strings
        news_title: "الأخبار والتحديثات",
        news_desc: "ابق على اطلاع مع أحدث الأخبار والإعلانات",
        no_news_available: "لا توجد مقالات أخبار متاحة حالياً",
      },

      ru: {
        nav_home: "Главная",
        nav_news: "Новости",
        nav_about: "О нас",
        nav_partners: "Партнёры",
        nav_stories: "Истории успеха",
        nav_resources: "Ресурсы",
        nav_contact: "Контакты",
        sign_in: "Войти",
        get_started: "Начать",

        serving: "🇲🇦 Более 50 000 марокканских студентов",
        hero_line1: "Преврати свои",
        hero_line2: "Глобальные мечты",
        hero_line3: "В реальность",
        hero_desc:
          "Тысячи стипендий, вакансий и международных программ для талантливых марокканцев. Твой путь к успеху начинается здесь.",
        explore_opps: "Найти возможности",
        who_we_are: "О нас",

        stat_users: "Пользователи",
        stat_countries: "Страны",
        stat_success: "Успешность",
        stat_support: "Поддержка",

        hero_stat_users: "Молодёжь охвачена",
        hero_stat_countries: "Страны охвачены",
        hero_stat_success: "Успешность",
        hero_stat_support: "Поддержка",

        latest_updates: "Последние обновления",
        trending_now: "Актуально сейчас",
        read: "Читать",

        opps_title_1: "Найди свой",
        opps_title_2: "идеальный вариант",
        opps_desc: "Тысячи проверенных возможностей в разных категориях",
        explore: "Открыть",

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
        rights: "© 2026 WYF Morocco. Все права защищены.",

        opp_scholarships: "Стипендии",
        opp_jobs: "Работа и стажировки",
        opp_exchange: "Обменные программы",
        opp_grants: "Гранты и феллоушипы",
        opp_desc_sch: "Полное/частичное финансирование",
        opp_desc_jobs: "Международные позиции",
        opp_desc_ex: "Культурный обмен",
        opp_desc_grants: "Финансирование исследований",

        feat_match: "Мгновенный подбор",
        feat_match_desc: "ИИ подбирает лучшие возможности за секунды",
        feat_dash: "Личный кабинет",
        feat_dash_desc: "Отслеживай заявки, дедлайны и рекомендации",
        feat_comm: "Сообщество",
        feat_comm_desc: "Связь с менторами и участниками",
        feat_lib: "Библиотека",
        feat_lib_desc: "Гайды, шаблоны и туториалы",
        feat_review: "Проверка заявки",
        feat_review_desc: "Экспертный фидбек по эссе и документам",
        feat_analytics: "Аналитика успеха",
        feat_analytics_desc: "Инсайты по шансам и конкуренции",

        tagline: "Ваш мир ждёт",
        explore_all_opps: "Откройте все возможности",
        moments_of: "Моменты",
        moroccan_success: "Глобального успеха марокканцев",
        made_with: "Сделано с ❤️ в Марокко",
        sitemap: "Карта сайта",
        subscribe_privacy:
          "Мы уважаем вашу приватность. Отпишитесь в любой момент. Без спама.",
        subscribe_now: "Подписаться сейчас",

        morocco: "Марокко",
        morocco_subtitle: "Информационный центр",
        morocco_b1: "Местная сеть университетов",
        morocco_b2: "Центры карьерного развития",
        morocco_b3: "Служба поддержки студентов",
        morocco_b4: "Консультирование по стипендиям",
        morocco_b5: "Программы подготовки к тестам",
        morocco_stat: "Студентов обслужено",

        china: "Китай",
        china_subtitle: "Партнёрство БРИ",
        china_b1: "Стипендии Пути Шёлка",
        china_b2: "Китайские государственные гранты",
        china_b3: "Программы технологического обмена",
        china_b4: "Инженерные стипендии",
        china_b5: "Поддержка культурной интеграции",
        china_stat: "Активные размещения",

        russia: "Россия",
        russia_subtitle: "Федеральные программы",
        russia_b1: "Государственные стипендии",
        russia_b2: "Гранты на исследования",
        russia_b3: "Академический обмен",
        russia_b4: "Фокус на науку и инновации",
        russia_b5: "Поддержка языковой подготовки",
        russia_stat: "Годовые возможности",

        south_america: "Южная Америка",
        sa_subtitle: "Региональная сеть",
        sa_b1: "Бразильские партнёрства",
        sa_b2: "Аргентинские университеты",
        sa_b3: "Чилийские инновационные программы",
        sa_b4: "Инициативы культурного обмена",
        sa_b5: "Программы на испанском языке",
        sa_stat: "Растущая сеть",

        inspiring_text:
          "Вдохновляющие реальные истории — от стипендий и обменов к мировым достижениям",

        home_stay_updated_title: "Будьте в курсе",
        home_stay_updated_highlight: "Глобальные возможности",
        home_stay_updated_desc:
          "Получайте последние стипендии, стажировки, истории успеха и эксклюзивные советы в вашу почту каждый месяц.",
        home_email_placeholder: "Введите свой адрес электронной почты",

        sponsors_title: "Наши партнёры",
        sponsors_desc: "Пользуется доверием ведущих организаций мира",

        caption_1: "Панель конференции – Глобальные перспективы",
        caption_2: "Молодёжная делегация – Марокко представлено с гордостью",
        caption_3: "Мастерская совершенства – Обучение и рост",
        caption_4: "Международный саммит – Моменты сетевого взаимодействия",
        caption_5: "Культурная витрина – Празднование марокканского наследия",
        caption_6: "Командное сотрудничество – Успех через единство",
        caption_7: "Признание достижений – Празднование совершенства",
        caption_8: "Глобальный форум – Марокканские лидеры выступают",
        caption_9: "Участие в фестивале – Вовлечение молодёжи",
        caption_10: "Стратегические обсуждения – Построение мостов",
        caption_11: "Сбор сообщества – Общие ценности",
        caption_12: "Профессиональное развитие – Развитие карьеры",
        caption_13: "Успех программы обмена – Культурный обмен",
        caption_14: "Дипломатическая миссия – Представление Марокко",
        caption_15: "Студенческая инициатива – Витрина инноваций",
        caption_16: "Региональная конференция – Марокканское присутствие",
        caption_17: "Создание наследия – Будущие лидеры объединены",

        // Hero section strings
        official_page_wyf: "Официальная страница МФМ Марокко",
        putin_quote_1: "Россия теперь ваш друг.",
        putin_quote_2: "Наши двери всегда открыты для вас.",
        putin_attribution:
          "— Владимир Путин, Церемония закрытия Всемирного фестиваля молодёжи (2024)",
        wyf_description:
          "Официальная страница национального комитета Марокко по Всемирному фестивалю молодёжи, крупнейшей молодёжной сети в Африке..',",

        // Sponsors section strings
        partners_desc_call:
          "Сотрудничайте с нами или зарегистрируйте вашу организацию",
        get_in_touch: "Свяжитесь с нами",

        // News section strings
        news_title: "Новости и обновления",
        news_desc: "Будьте в курсе последних новостей и объявлений",
        no_news_available: "Пока нет доступных новостей",
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

  const opportunities = [
    {
      icon: BookOpen,
      title: t("opp_scholarships"),
      count: "2,500+",
      color: "from-gray-800 to-brand-silver",
      desc: t("opp_desc_sch"),
    },
    {
      icon: Briefcase,
      title: t("opp_jobs"),
      count: "5,000+",
      color: "from-brand-red to-gray-800",
      desc: t("opp_desc_jobs"),
    },
    {
      icon: Users,
      title: t("opp_exchange"),
      count: "800+",
      color: "from-brand-red to-black",
      desc: t("opp_desc_ex"),
    },
    {
      icon: Award,
      title: t("opp_grants"),
      count: "1,200+",
      color: "from-gray-800 to-black",
      desc: t("opp_desc_grants"),
    },
  ];

  const stats = [
    { number: "8M+", label: t("stat_users"), icon: Users },
    { number: "155+", label: t("stat_countries"), icon: Globe },
    { number: "35+", label: t("stat_success"), icon: TrendingUp },
    { number: "24/7", label: t("stat_support"), icon: Sparkles },
  ];

  const sponsors = [
    {
      id: 1,
      name: "Coat of Arms of Ryazan Oblast",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F17892532a17e40d1b12b791ae4f2fb66?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 2,
      name: "Coat of Arms of Volgograd Oblast",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Fdc3871c8e6e44b8c83f216cf7f4da1ca?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 3,
      name: "Russian Student Safety Corps",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff96089f4b92d4701a923f960b840aa0e?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 4,
      name: "Yunarmiya",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F4608d7484aac425f9ce3cf73bcb94f88?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 5,
      name: "World Peoples Assembly",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff015b212fef044bb9744451c7217f876?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 6,
      name: "Coat of Arms of Kaliningrad Oblast",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F0db76a0cd43040ec947c4c77f35b385b?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 7,
      name: "Coat of Arms of Dagestan",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Fad39b7d7fe02449cb3ef97a7a398cb94?format=webp&width=800",
      link: "#",
      isImage: true,
    },
    {
      id: 8,
      name: "Coat of Arms of the Komi Republic",
      logo: "https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Fdebb584a0f9046a7bf2f2b227313f15b?format=webp&width=800",
      link: "#",
      isImage: true,
    },
  ];

  const selectedLang =
    languages.find((l) => l.code === currentLanguage) ?? languages[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in scale-95">
            {/* Confetti Icon */}
            <div className="mb-6 flex justify-center">
              <div className="text-5xl">
                <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8m-4-4h8M6 3l3 3m9 0l-3 3m-9 9l3-3m9 0l-3-3" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-brand-red">Welcome!</span> WYF<br />
              <span className="text-gray-900">Morocco is</span><br />
              <span className="text-brand-red">officially live!</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              You are special to us, and we're thrilled to<br />have you here
            </p>

            {/* Divider */}
            <div className="w-12 h-1 bg-brand-red mx-auto mb-8"></div>

            {/* CTA Button */}
            <Link
              to="/news"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand-red to-gray-900 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 w-full"
              onClick={() => setShowWelcomeModal(false)}
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            {/* Close Button */}
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

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
            {/* Logo - stays on the right */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            >
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                  alt="MoroccoGlobal Logo"
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
                    className={`absolute -bottom-1 ${currentLanguage === "ar" ? "right-0" : "left-0"} h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 w-0 group-hover:w-full`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Right Controls - stays on the left */}
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
                  href="https://t.me/wyfmorocco"
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
                  <span className="text-sm">{selectedLang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {selectedLang.code.toUpperCase()}
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
      <section
        id="home"
        className="scroll-section relative min-h-auto sm:min-h-[100svh] flex items-center pt-20 sm:pt-24 md:pt-16 lg:pt-24 pb-8 sm:pb-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 opacity-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{
                  backgroundColor: ["#BB0909", "#D9D4D4", "#000000"][i % 3],
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
          {/* Mobile: Stack vertically (image first), Desktop: 2-column grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-24 items-center">
            {/* Image - appears first on mobile */}
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto lg:max-w-2xl lg:mx-0 order-1 lg:order-2 animate-in fade-in slide-in-from-top-8 duration-1000 pt-2 sm:pt-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F3eee9a46b02f44de88fb675aaf879228?format=webp&width=800&height=1200"
                alt="Portrait"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Content - appears second on mobile */}
            <div className="space-y-3 sm:space-y-5 lg:space-y-8 w-full order-2 lg:order-1 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex items-center justify-start gap-3 mb-2 sm:mb-3">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 bg-brand-red/10 rounded-full border border-brand-red/30">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-red rounded-full animate-pulse" />
                  <span className="text-[10px] sm:text-sm font-semibold text-brand-red">
                    {t("official_page_wyf")}
                  </span>
                </div>
              </div>

              <h1 className="font-bold leading-[1.25] sm:leading-[1.15]">
                <span className="block text-brand-red text-lg sm:text-4xl lg:text-6xl">
                  "{t("putin_quote_1")}
                </span>
                <span className="block text-gray-900 text-lg sm:text-4xl lg:text-6xl mt-0.5 sm:mt-2">
                  {t("putin_quote_2")}"
                </span>
                <span
                  className="text-xs sm:text-base lg:text-lg font-serif text-brand-red font-semibold mt-8 sm:mt-6 block sm:inline-block sm:ml-3 w-full sm:w-auto"
                  style={{
                    letterSpacing: "0.05em",
                    fontStyle: "italic",
                    fontWeight: "600",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {t("putin_attribution")}
                </span>
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-gray-600 max-w-xl leading-relaxed">
                {t("wyf_description")}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Link
                  to="/news"
                  className="group flex-1 sm:flex-none px-3 sm:px-6 lg:px-7 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-brand-red to-gray-900 text-white rounded-full font-semibold text-[11px] sm:text-sm lg:text-base shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <span>{t("explore_opps")}</span>
                  <ArrowRight className="w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="group flex-1 sm:flex-none px-3 sm:px-6 lg:px-7 py-2 sm:py-3 lg:py-4 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-full font-semibold text-[11px] sm:text-sm lg:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-red-200/50 hover:scale-105 flex items-center justify-center gap-1.5 sm:gap-2"
                >
                  <span>{t("who_we_are")}</span>
                  <ArrowRight className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Grid - Desktop 4 columns, Mobile stacked cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-10 w-full">
            {/* Stat 1 - Users */}
            <div className="group animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative h-full rounded-xl backdrop-blur-md bg-gradient-to-br from-brand-red/5 to-red-100/5 border border-gray-300 bg-white/60 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-white/80 group-hover:-translate-y-1">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-brand-red to-red-600 opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-red-600 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-brand-red to-red-600 p-2 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Users className="w-full h-full text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-brand-red to-red-600 bg-clip-text text-transparent mb-1 tracking-tight leading-none">
                    8M+
                  </div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-brand-red to-red-600 rounded-full mb-2 group-hover:w-full transition-all duration-500" />
                  <p className="text-xs font-semibold text-gray-700 leading-snug">
                    {t("hero_stat_users")}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Stat 2 - Countries */}
            <div
              className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "100ms" }}
            >
              <div className="relative h-full rounded-xl backdrop-blur-md bg-gradient-to-br from-slate-700/5 to-slate-900/5 border border-gray-300 bg-white/60 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-white/80 group-hover:-translate-y-1">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-900 opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-700 to-slate-900 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 p-2 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Globe className="w-full h-full text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-1 tracking-tight leading-none">
                    115+
                  </div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full mb-2 group-hover:w-full transition-all duration-500" />
                  <p className="text-xs font-semibold text-gray-700 leading-snug">
                    {t("hero_stat_countries")}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-700 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Stat 3 - Success */}
            <div
              className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative h-full rounded-xl backdrop-blur-md bg-gradient-to-br from-brand-red/5 to-red-100/5 border border-gray-300 bg-white/60 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-white/80 group-hover:-translate-y-1">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-brand-red to-red-600 opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-red-600 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-brand-red to-red-600 p-2 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <TrendingUp className="w-full h-full text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-brand-red to-red-600 bg-clip-text text-transparent mb-1 tracking-tight leading-none">
                    35+
                  </div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-brand-red to-red-600 rounded-full mb-2 group-hover:w-full transition-all duration-500" />
                  <p className="text-xs font-semibold text-gray-700 leading-snug">
                    {t("hero_stat_success")}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Stat 4 - Support */}
            <div
              className="group animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative h-full rounded-xl backdrop-blur-md bg-gradient-to-br from-slate-700/5 to-slate-900/5 border border-gray-300 bg-white/60 p-4 sm:p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:bg-white/80 group-hover:-translate-y-1">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-900 opacity-0 group-hover:opacity-15 rounded-full blur-3xl transition-all duration-700" />
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-700 to-slate-900 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 p-2 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <Sparkles className="w-full h-full text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-1 tracking-tight leading-none">
                    24/7
                  </div>
                  <div className="h-0.5 w-8 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full mb-2 group-hover:w-full transition-all duration-500" />
                  <p className="text-xs font-semibold text-gray-700 leading-snug">
                    {t("hero_stat_support")}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-700 to-slate-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-16 sm:-bottom-20 lg:-bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
        </div>
      </section>

      {/* Sponsors Section */}
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
              {t("sponsors_title")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("sponsors_title")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              {t("sponsors_desc")}
            </p>
          </div>

          {/* Sponsors Horizontal Scroll with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSponsors("left")}
              className="hidden lg:flex absolute left-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Scroll Container */}
            <div
              ref={sponsorsScrollRef}
              className="flex overflow-x-auto gap-6 sm:gap-8 pb-4 scrollbar-hide"
            >
              {(partnersList.length > 0 ? partnersList : sponsors).map(
                (sponsor, index) => (
                  <div
                    key={sponsor.id}
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
                        {"logo_url" in sponsor ? (
                          <img
                            src={sponsor.logo_url}
                            alt={sponsor.name}
                            className="h-20 sm:h-24 lg:h-28 w-auto group-hover:scale-110 transition-all duration-500 object-contain"
                          />
                        ) : (sponsor as any).isImage ? (
                          <img
                            src={(sponsor as any).logo}
                            alt={sponsor.name}
                            className="h-20 sm:h-24 lg:h-28 w-auto group-hover:scale-110 transition-all duration-500 object-contain"
                          />
                        ) : (
                          <div className="text-3xl sm:text-4xl lg:text-5xl group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500">
                            {(sponsor as any).logo}
                          </div>
                        )}
                      </div>

                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-brand-red/0 group-hover:bg-brand-red/10 transition-all duration-500 pointer-events-none" />
                    </div>

                    {/* Text Label Below Card */}
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-brand-red transition-all duration-300 text-center w-40 sm:w-48 lg:w-56">
                      {sponsor.name}
                    </p>
                  </div>
                ),
              )}
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

          {/* View All Link */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {t("partners_desc_call")}
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-full font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-red-200/50 hover:scale-105"
            >
              <span>{t("get_in_touch")}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes float-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 20px rgba(187, 9, 9, 0);
            }
            50% {
              box-shadow: 0 0 30px rgba(187, 9, 9, 0.3);
            }
          }

          .animate-in {
            animation: float-up 0.6s ease-out forwards;
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

          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
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

      {/* Latest News Section */}
      <section
        id="latest-news"
        className="scroll-section py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-red/10 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-red/5 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          />
        </div>

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(220,38,38,0.08)_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-red/10 to-red-100/10 text-brand-red text-sm font-bold rounded-full border border-brand-red/40 animate-pulse hover:animate-none transition-all duration-300 shadow-lg">
                <Zap className="w-5 h-5 animate-bounce" />
                {t("latest_updates").toUpperCase()}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8">
              Latest{" "}
              <span
                className="bg-gradient-to-r from-brand-red via-red-600 to-red-800 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: "100ms" }}
              >
                {t("news_title")}
              </span>
            </h2>
            <p
              className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "200ms" }}
            >
              {t("news_desc")}
            </p>
          </div>

          {newsList.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Featured News - Left Side (2 columns on desktop) */}
              <div className="lg:col-span-2 animate-in fade-in slide-in-from-left-8 duration-700">
                <div
                  onClick={() =>
                    setSelectedNews(
                      [...newsList].sort(
                        (a, b) => (a.order_index || 0) - (b.order_index || 0),
                      )[0],
                    )
                  }
                  className="group rounded-3xl overflow-hidden bg-white border-2 border-gray-100 shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 h-full max-h-[600px] lg:max-h-[800px] flex flex-col cursor-pointer hover:border-brand-red/70 relative"
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl p-[2px] pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-red-500 to-brand-red rounded-3xl" />
                  </div>
                  {(() => {
                    // Articles are already sorted by order_index from Supabase
                    if (!newsList[0]) return null;
                    return (
                      newsList[0].image_url && (
                        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-gray-200">
                          <img
                            src={newsList[0].image_url}
                            alt={newsList[0].title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover:via-black/50" />

                          {/* Trending Badge with enhanced styling */}
                          <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-red via-red-600 to-red-700 text-white text-xs sm:text-sm font-bold rounded-full shadow-2xl animate-pulse hover:animate-none group-hover:animate-none transition-all duration-300 ring-2 ring-white/30">
                            <Zap className="w-5 h-5" />
                            <span>{t("trending_now")}</span>
                          </div>

                          {/* Accent corner elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )
                    );
                  })()}

                  {(() => {
                    // Articles are already sorted by order_index from Supabase
                    if (!newsList[0]) return null;
                    return (
                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col flex-grow relative z-10">
                        <div className="flex items-center gap-3 mb-5 flex-wrap">
                          {newsList[0].category && (
                            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-brand-red to-red-700 text-white text-xs sm:text-sm font-bold rounded-full shadow-xl group-hover:shadow-2xl transition-all duration-300 ring-2 ring-brand-red/30 group-hover:ring-brand-red/50">
                              {newsList[0].category}
                            </span>
                          )}
                          <span className="text-sm font-semibold text-gray-600 flex items-center gap-2 group-hover:text-brand-red transition-colors duration-300">
                            <Calendar className="w-5 h-5 text-brand-red" />
                            {new Date(
                              newsList[0].date || newsList[0].created_at,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-5 group-hover:text-brand-red transition-colors duration-300 leading-tight">
                          {newsList[0].title_i18n?.[currentLanguage as any] ||
                            newsList[0].title}
                        </h2>

                        <p className="text-base sm:text-lg text-gray-700 mb-8 flex-grow line-clamp-3 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                          {newsList[0].description_i18n?.[
                            currentLanguage as any
                          ] || newsList[0].description}
                        </p>

                        {/* CTA Button */}
                        <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-200 group-hover:border-brand-red/30 transition-colors duration-300">
                          <span className="text-sm font-bold text-brand-red group-hover:text-red-700 transition-colors duration-300">
                            Read Full Story
                          </span>
                          <ArrowRight className="w-4 h-4 text-brand-red group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* News Carousel - Right Side */}
              <div className="lg:col-span-2">
                <div className="relative group/carousel">
                  {/* Left Arrow */}
                  <button
                    onClick={() => scrollNews("left")}
                    className="hidden lg:flex absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-20 items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-red-700 border-2 border-brand-red text-white hover:from-red-700 hover:to-brand-red hover:shadow-red-300/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-125 group-hover/carousel:opacity-100"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>

                  {/* Scroll Container */}
                  <div
                    ref={newsScrollRef}
                    className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide"
                  >
                    {newsList.slice(1).map((article, idx) => (
                      <div
                        key={article.id}
                        onClick={() => setSelectedNews(article)}
                        className="group animate-in fade-in slide-in-from-bottom-8 duration-700 rounded-3xl overflow-hidden bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-brand-red/70 cursor-pointer flex-shrink-0 w-80 sm:w-96 flex flex-col hover:bg-white relative hover:-translate-y-2"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {/* Gradient border effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl p-[2px] pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-red via-red-500 to-brand-red rounded-3xl" />
                        </div>

                        {article.image_url && (
                          <div className="relative h-56 overflow-hidden bg-gray-200">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 transition-opacity duration-300" />

                            {/* Index Badge with animation */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-brand-red via-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-xl group-hover:scale-125 transition-all duration-300 ring-2 ring-white/50">
                              {idx + 2}
                            </div>

                            {/* Trending indicator */}
                            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg group-hover:bg-white transition-all duration-300">
                              <Zap className="w-4 h-4 text-brand-red" />
                              <span className="text-xs font-bold text-gray-900">
                                {t("trending_now")}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-5 sm:p-6 flex flex-col flex-grow relative z-10">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            {article.category && (
                              <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-brand-red to-red-600 px-3 py-1.5 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                                {article.category}
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-red transition-colors line-clamp-2 mb-3 leading-tight">
                            {article.title_i18n?.[currentLanguage as any] ||
                              article.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors mb-4 flex-grow leading-relaxed">
                            {article.description_i18n?.[
                              currentLanguage as any
                            ] || article.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 group-hover:border-brand-red/30 transition-all duration-300">
                            <span className="text-xs font-semibold text-gray-500 flex items-center gap-2 group-hover:text-gray-700 transition-colors">
                              <Calendar className="w-4 h-4 text-brand-red" />
                              {new Date(
                                article.date || article.created_at,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="text-xs font-bold text-brand-red group-hover:gap-2 flex items-center gap-1 transition-all">
                              {t("read")}{" "}
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => scrollNews("right")}
                    className="hidden lg:flex absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-20 items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-red-700 border-2 border-brand-red text-white hover:from-red-700 hover:to-brand-red hover:shadow-red-300/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-125 group-hover/carousel:opacity-100"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t("no_news_available")}</p>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image */}
            {selectedNews.image_url && (
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <img
                  src={selectedNews.image_url}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Category & Date */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                {selectedNews.category && (
                  <span className="inline-block px-4 py-2 bg-brand-red text-white text-xs sm:text-sm font-bold rounded-full">
                    {selectedNews.category}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {new Date(
                    selectedNews.date || selectedNews.created_at,
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                {selectedNews.title_i18n?.[currentLanguage as any] ||
                  selectedNews.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
                {selectedNews.description_i18n?.[currentLanguage as any] ||
                  selectedNews.description}
              </p>

              {/* Content */}
              {selectedNews.content && (
                <div className="prose prose-lg max-w-none">
                  <div className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedNews.content_i18n?.[currentLanguage as any] ||
                      selectedNews.content}
                  </div>
                </div>
              )}

              {/* Footer Action */}
              <div className="mt-10 pt-8 border-t border-gray-200 flex items-center gap-4 flex-wrap">
                {selectedNews.redirect_url && (
                  <a
                    href={selectedNews.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-brand-red text-white hover:bg-red-700 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedNews(null)}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <span>Back to News</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
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
                  {t("home_stay_updated_title")}{" "}
                  <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                    {t("home_stay_updated_highlight")}
                  </span>
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  {t("home_stay_updated_desc")}
                </p>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t("home_email_placeholder")}
                  className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-800 placeholder-gray-500 shadow-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingNewsletter}
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:min-w-[180px] disabled:opacity-50"
                >
                  <span>
                    {submittingNewsletter
                      ? "Subscribing..."
                      : t("subscribe_now")}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
                {t("subscribe_privacy")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="relative shrink-0">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                    alt="MoroccoGlobal Logo"
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
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
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
