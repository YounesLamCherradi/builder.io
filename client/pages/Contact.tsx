import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchFAQs, subscribeNewsletter, type FAQ } from "../lib/supabase";
import { toast } from "sonner";
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  ArrowRight,
} from "lucide-react";

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Form validation helper
function validateFormData(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string | null {
  if (!formData.name || formData.name.trim().length === 0) {
    return "Name is required";
  }
  if (formData.name.length > 100) {
    return "Name must be less than 100 characters";
  }
  if (!formData.email || !isValidEmail(formData.email)) {
    return "Please enter a valid email address";
  }
  if (!formData.subject || formData.subject.trim().length === 0) {
    return "Subject is required";
  }
  if (formData.subject.length > 200) {
    return "Subject must be less than 200 characters";
  }
  if (!formData.message || formData.message.trim().length === 0) {
    return "Message is required";
  }
  if (formData.message.length > 5000) {
    return "Message must be less than 5000 characters";
  }
  return null;
}

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedLanguage") || "en";
    }
    return "en";
  });
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dbFaqs, setDbFaqs] = useState<FAQ[]>([]);

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", lang);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
    const loadFaqs = async () => {
      const faqs = await fetchFAQs();
      if (faqs.length > 0) setDbFaqs(faqs);
    };
    loadFaqs();
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

        contact_hero_title: "Get in Touch",
        contact_hero_subtitle:
          "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

        contact_form_name: "Full Name",
        contact_form_email: "Email Address",
        contact_form_subject: "Subject",
        contact_form_message: "Your Message",
        contact_form_send: "Send Message",
        contact_form_sending: "Sending...",
        contact_form_success: "Message sent successfully!",

        contact_info_title: "Contact Information",
        contact_email: "Email",
        contact_phone: "Phone",
        contact_location: "Location",
        contact_office: "WYF Morocco Main Office",
        contact_email_address: "wyfmorocco@gmail.com",
        contact_phone_number: "+212 7 73 70 64 47 / +212 6 49 57 43 26",
        contact_location_address:
          "Дирекция Всемирного фестиваля молодежи\nПодколокольный пер., 10А/2",

        contact_hours_title: "Business Hours",
        contact_hours_weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
        contact_hours_saturday: "Saturday: 10:00 AM - 4:00 PM",
        contact_hours_sunday: "Sunday: Closed",

        contact_faq_title: "Frequently Asked Questions",
        contact_faq_q1: "How long does it take to get a response?",
        contact_faq_a1:
          "We typically respond to all inquiries within 24-48 business hours.",
        contact_faq_q2: "What information do you need from me?",
        contact_faq_a2:
          "We need your name, email, and a detailed description of your inquiry to assist you better.",
        contact_faq_q3: "Do you offer phone support?",
        contact_faq_a3:
          "Yes, we offer phone support during business hours. Please call us at the number provided above.",
        contact_faq_q4: "Can I schedule a consultation?",
        contact_faq_a4:
          "Absolutely! You can request a consultation through the contact form or by calling us directly.",

        contact_social_title: "Connect With Us",
        contact_social_desc:
          "Follow us on social media for updates and success stories",

        // Form messages
        email_sent_success:
          "Email sent successfully! We will get back to you soon.",
        email_send_error: "Failed to send email. Please try again.",
        email_send_failed: "Failed to send email",

        home_stay_updated_title: "Stay Updated with",
        home_stay_updated_highlight: "Global Opportunities",
        home_stay_updated_desc:
          "Get the latest news about scholarships, visas, and opportunities delivered to your inbox every month.",
        home_email_placeholder: "Enter your email address",
        subscribe_now: "Subscribe",
        subscribe_privacy:
          "We respect your privacy. Unsubscribe at any time. No spam.",

        tagline: "Your World Awaits",
        footer_tagline: "Helping Moroccans achieve global dreams.",
        platform: "Platform",
        company: "Organization",
        legal: "Legal",
        scholarships: "Scholarships",
        jobs: "Jobs",
        programs: "Programs",
        about_us: "About",
        contact: "Contact",
        careers: "Careers",
        blog: "Blog",
        privacy: "Privacy",
        terms: "Terms",
        cookies: "Cookies",
        rights: "© 2026 WYF Morocco. All rights reserved.",
        made_with: "Made with ❤️ in Morocco",
        language: "Language",
        telegram: "Telegram",
        instagram: "Instagram",
        version: "v1.0.0 • 2026",
      },

      ar: {
        nav_home: "الرئيسية",
        nav_news: "الأخبار",
        nav_about: "عننا",
        nav_partners: "الشركاء",
        nav_stories: "قصص النجاح",
        nav_resources: "الموارد",
        nav_contact: "اتصل بنا",

        contact_hero_title: "اتصل بنا",
        contact_hero_subtitle:
          "نود أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.",

        contact_form_name: "الاسم الكامل",
        contact_form_email: "عنوان البريد الإلكتروني",
        contact_form_subject: "الموضوع",
        contact_form_message: "رسالتك",
        contact_form_send: "إرسال الرسالة",
        contact_form_sending: "جاري الإرسال...",
        contact_form_success: "تم إرسال الرسالة بنجاح!",

        contact_info_title: "معلومات الاتصال",
        contact_email: "البريد الإلكتروني",
        contact_phone: "الهاتف",
        contact_location: "الموقع",
        contact_office: "مكتب مهرجان الشباب العالمي الرئيسي",
        contact_email_address: "wyfmorocco@gmail.com",
        contact_phone_number: "+212 7 73 70 64 47 / +212 6 49 57 43 26",
        contact_location_address:
          "دائرة مهرجان الشباب العالمي\nممر بودكولوكولني، 10 أ/2",

        contact_hours_title: "ساعات العمل",
        contact_hours_weekdays: "24/7",
        contact_hours_saturday: "",
        contact_hours_sunday: "",

        contact_faq_title: "الأسئلة الشائعة",
        contact_faq_q1: "كم من الوقت يستغرق للحصول على رد؟",
        contact_faq_a1:
          "نحن عادة نرد على جميع الاستفسارات خلال 24-48 ساعة عمل.",
        contact_faq_q2: "ما المعلومات التي تحتاجها مني؟",
        contact_faq_a2: "نحتاج إلى اسمك وبريدك الإلكتروني ووصف مفصل لاستفسارك.",
        contact_faq_q3: "هل تقدمون دعماً هاتفياً؟",
        contact_faq_a3: "نعم، نقدم دعماً هاتفياً خلال ساعات العمل.",
        contact_faq_q4: "هل يمكنني جدولة استشارة؟",
        contact_faq_a4:
          "بالتأكيد! يمكنك طلب استشارة من خلال النموذج أو بالاتصال بنا مباشرة.",

        contact_social_title: "تواصل معنا",
        contact_social_desc:
          "تابعنا على وسائل التواصل الاجتماعي للحصول على التحديثات وقصص النجاح",

        // Form messages
        email_sent_success:
          "تم إرسال البريد الإلكتروني بنجاح! سنرد عليك قريباً.",
        email_send_error:
          "فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
        email_send_failed: "فشل إرسال البريد الإلكتروني",

        home_stay_updated_title: "ابقَ محدثاً مع",
        home_stay_updated_highlight: "الفرص العالمية",
        home_stay_updated_desc:
          "احصل على أحدث الأخبار عن المنح والتأشيرات والفرص كل شهر في صندوق بريدك.",
        home_email_placeholder: "أدخل عنوان بريدك الإلكتروني",
        subscribe_now: "اشترك الآن",
        subscribe_privacy:
          "نحن نحترم خصوصيتك. ألغِ الاشتراك في أي وقت. لا بريد عشوائي.",

        tagline: "عالمك ينتظرك",
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
        privacy: "الخصوصية",
        terms: "الشروط",
        cookies: "ملفات تعريف الارتباط",
        rights: "© 2026 WYF Morocco. جميع الحقوق محفوظة.",
        made_with: "صُنع بـ ❤️ في المغرب",
        language: "اللغة",
        telegram: "تيليجرام",
        instagram: "إنستغرام",
        version: "v1.0.0 • 2026",
      },

      ru: {
        nav_home: "Главная",
        nav_news: "Новости",
        nav_about: "О нас",
        nav_partners: "Партнёры",
        nav_stories: "Истории успеха",
        nav_resources: "Ресурсы",
        nav_contact: "Контакты",

        contact_hero_title: "Свяжитесь с Нами",
        contact_hero_subtitle:
          "Нам было бы приятно услышать от вас. Отправьте нам сообщение, и мы ответим как можно скорее.",

        contact_form_name: "Полное имя",
        contact_form_email: "Адрес электронной почты",
        contact_form_subject: "Тема",
        contact_form_message: "Ваше сообщение",
        contact_form_send: "Отправить сообщение",
        contact_form_sending: "Отправка...",
        contact_form_success: "Сообщение отправлено успешно!",

        contact_info_title: "Контактная информация",
        contact_email: "Электронная почта",
        contact_phone: "Телефон",
        contact_location: "Местоположение",
        contact_office: "Главный офис Всемирного фестиваля молодежи",
        contact_email_address: "wyfmorocco@gmail.com",
        contact_phone_number: "+212 7 73 70 64 47 / +212 6 49 57 43 26",
        contact_location_address:
          "Дирекция Всемирного фестиваля молодежи\nПодколокольный пер., 10А/2",

        contact_hours_title: "Время работы",
        contact_hours_weekdays: "24/7",
        contact_hours_saturday: "",
        contact_hours_sunday: "",

        contact_faq_title: "Часто задаваемые вопросы",
        contact_faq_q1: "Сколько времени занимает получение ответа?",
        contact_faq_a1:
          "Мы обычно отвечаем на все запросы в течение 24-48 рабочих часов.",
        contact_faq_q2: "Какая информация вам нужна от меня?",
        contact_faq_a2:
          "Нам нужны ваши имя, почта и подробное описание вашего запроса.",
        contact_faq_q3: "Предоставляете ли вы поддержку по телефону?",
        contact_faq_a3:
          "Да, мы предоставляем поддержку по телефону в рабочее время.",
        contact_faq_q4: "Могу ли я запланировать консультацию?",
        contact_faq_a4:
          "Конечно! Вы можете запросить консультацию через форму или позвонив нам.",

        contact_social_title: "Свяжитесь с нами",
        contact_social_desc:
          "Следите за нами в социальных сетях для новостей и историй успеха",

        // Form messages
        email_sent_success:
          "Электронное письмо отправлено успешно! Мы свяжемся с вами в ближайшее время.",
        email_send_error:
          "Ошибка при отправке электронного письма. Пожалуйста, попробуйте еще раз.",
        email_send_failed: "Ошибка при отправке электронного письма",

        home_stay_updated_title: "Оставайтесь в курсе",
        home_stay_updated_highlight: "Глобальные возможности",
        home_stay_updated_desc:
          "Получайте последние новости о стипендиях, визах и возможностях каждый месяц.",
        home_email_placeholder: "Введите ваш адрес электронной почты",
        subscribe_now: "Подписаться",
        subscribe_privacy:
          "Мы уважаем вашу конфиденциальность. Отпишитесь в любой момент. Нет спама.",

        tagline: "Твой мир ждёт",
        footer_tagline: "Помогаем марокканцам воплощать глобальные мечты.",
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
        privacy: "Приватность",
        terms: "Условия",
        cookies: "Куки",
        rights: "© 2026 WYF Morocco. Все права защищены.",
        made_with: "Сделано с ❤️ в Марокко",
        language: "Язык",
        telegram: "Телеграм",
        instagram: "Инстаграм",
        version: "v1.0.0 • 2026",
      },
    }),
    [],
  );

  const t = (key) => I18N[currentLanguage]?.[key] || I18N["en"][key] || key;
  const selectedLang =
    languages.find((l) => l.code === currentLanguage) ?? languages[0];

  const menuItems = [
    { name: t("nav_home"), path: "/" },
    { name: t("nav_news"), path: "/news" },
    { name: t("nav_about"), path: "/about" },
    { name: t("nav_partners"), path: "/partners" },
    { name: t("nav_contact"), path: "/contact" },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data first
    const validationError = validateFormData(formData);
    if (validationError) {
      const { toast } = await import("sonner");
      toast.error(validationError);
      return;
    }

    setFormSubmitted(true);

    try {
      // Send email via our API endpoint
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        const { toast } = await import("sonner");
        toast.success(t("email_sent_success"));

        // Reset form
        setTimeout(() => {
          setFormData({ name: "", email: "", subject: "", message: "" });
          setFormSubmitted(false);
        }, 3000);
      } else {
        const { toast } = await import("sonner");
        toast.error(result.error || t("email_send_failed"));
        setFormSubmitted(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      const { toast } = await import("sonner");
      toast.error(t("email_send_error"));
      setFormSubmitted(false);
    }
  };

  const faqs =
    dbFaqs.length > 0
      ? dbFaqs.map((faq) => {
          // Parse question and answer translations
          let questionText = faq.question;
          let answerText = faq.answer;

          // Handle question_i18n - could be object or JSON string
          if (faq.question_i18n) {
            try {
              let questionI18n = faq.question_i18n;
              if (typeof questionI18n === "string") {
                questionI18n = JSON.parse(questionI18n);
              }
              if (typeof questionI18n === "object" && questionI18n !== null) {
                // Try to get translation for current language
                if (questionI18n[currentLanguage]) {
                  questionText = questionI18n[currentLanguage];
                } else if (currentLanguage !== "en" && questionI18n.en) {
                  // Fallback to English if translation not found
                  questionText = questionI18n.en;
                }
              }
            } catch (e) {
              console.warn(
                "Error parsing question_i18n:",
                e,
                faq.question_i18n,
              );
              questionText = faq.question;
            }
          }

          // Handle answer_i18n - could be object or JSON string
          if (faq.answer_i18n) {
            try {
              let answerI18n = faq.answer_i18n;
              if (typeof answerI18n === "string") {
                answerI18n = JSON.parse(answerI18n);
              }
              if (typeof answerI18n === "object" && answerI18n !== null) {
                // Try to get translation for current language
                if (answerI18n[currentLanguage]) {
                  answerText = answerI18n[currentLanguage];
                } else if (currentLanguage !== "en" && answerI18n.en) {
                  // Fallback to English if translation not found
                  answerText = answerI18n.en;
                }
              }
            } catch (e) {
              console.warn("Error parsing answer_i18n:", e, faq.answer_i18n);
              answerText = faq.answer;
            }
          }

          return {
            q: questionText,
            a: answerText,
          };
        })
      : [
          { q: t("contact_faq_q1"), a: t("contact_faq_a1") },
          { q: t("contact_faq_q2"), a: t("contact_faq_a2") },
          { q: t("contact_faq_q3"), a: t("contact_faq_a3") },
          { q: t("contact_faq_q4"), a: t("contact_faq_a4") },
        ];

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact_email"),
      value: t("contact_email_address"),
    },
    {
      icon: Phone,
      label: t("contact_phone"),
      value: t("contact_phone_number"),
    },
    {
      icon: MapPin,
      label: t("contact_location"),
      value:
        "Дирекция Всемирного фестиваля молодежи\nПодколокольный пер., 10А/2",
      url: "https://yandex.ru/maps/org/direktsiya_vsemirnogo_festivalya_molodezhi/4837929064?si=4um6krn4vrnc3mub8n7bzta47w",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white backdrop-blur-lg shadow-lg"
            : "bg-white/90 backdrop-blur-sm"
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
                  className={`text-gray-700 hover:text-brand-red font-medium transition-colors relative group ${
                    item.path === "/contact" ? "text-brand-red" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                      item.path === "/contact"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
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
            <div className="fixed top-16 right-0 h-[calc(100vh-64px)] w-[88%] max-w-sm bg-white shadow-2xl border-l border-gray-100 flex flex-col">
              <div className="p-4 space-y-4 overflow-y-auto flex-1">
                <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-700" />
                    <span className="text-sm text-gray-700">
                      {t("language")}
                    </span>
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
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2Ff4a5df7a53c344c384c5df7655028bcb?format=webp&width=800)",
            backgroundSize: "cover",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t("contact_hero_title")}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t("contact_hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 p-8 sm:p-10 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t("contact_form_send")}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        {t("contact_form_name")}
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.name.length}/100
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("contact_form_email")}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        formData.email && !isValidEmail(formData.email)
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-brand-red"
                      }`}
                      placeholder="john@example.com"
                    />
                    {formData.email && !isValidEmail(formData.email) && (
                      <p className="text-xs text-red-500 mt-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        {t("contact_form_subject")}
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.subject.length}/200
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        {t("contact_form_message")}
                      </label>
                      <span className="text-xs text-gray-500">
                        {formData.message.length}/5000
                      </span>
                    </div>
                    <textarea
                      required
                      maxLength={5000}
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors resize-none"
                      placeholder="Your message here..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full bg-gradient-to-r from-brand-red to-gray-900 text-white px-6 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-90"
                  >
                    {formSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        {t("contact_form_success")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t("contact_form_send")}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t("contact_info_title")}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info: any, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-brand-red hover:bg-brand-red/5 transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-brand-red/10">
                          <info.icon className="h-6 w-6 text-brand-red" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {info.label}
                        </h3>
                        {info.url ? (
                          <a
                            href={info.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-red hover:text-red-700 hover:underline mt-1 block font-semibold transition-colors whitespace-pre-line"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600 mt-1">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-red/10 to-brand-red/5 rounded-2xl border-2 border-brand-red/20 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("contact_hours_title")}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-red rounded-full" />
                    <span className="text-2xl font-bold text-brand-red">
                      24/7
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t("contact_faq_title")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-brand-red transition-all duration-300 cursor-pointer"
              >
                <summary className="flex items-center justify-between p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {faq.q}
                  </h3>
                  <ChevronDown className="w-6 h-6 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-gray-600 border-t-2 border-gray-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {t("contact_social_title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
            {t("contact_social_desc")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://t.me/wyfmorocco"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-gray-900 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.042 0-.084 0-.127-.01l.214-3.053 5.56-5.023c.242-.213-.054-.328-.375-.115L6.871 12.93l-2.99-.924c-1.294-.403-1.319-1.374.268-2.042l11.953-4.602c.55-.213 1.075.124.892.943z" />
              </svg>
              Telegram
            </a>
            <a
              href="https://www.instagram.com/wyfmorocco/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-gray-900 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.224.223 2.742.072 7.1.014 8.38 0 8.788 0 12s.014 3.62.072 4.9c.15 4.358 2.623 6.876 6.98 7.028 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.358-.152 6.83-2.669 6.98-7.028.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.15-4.358-2.623-6.876-6.98-7.028C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
              Instagram
            </a>
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
                  {t("home_stay_updated_title")}{" "}
                  <span className="bg-gradient-to-r from-brand-red via-gray-900 to-black bg-clip-text text-transparent">
                    {t("home_stay_updated_highlight")}
                  </span>
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  {t("home_stay_updated_desc")}
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder={t("home_email_placeholder")}
                  className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-800 placeholder-gray-500 shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:min-w-[180px]"
                >
                  <span>{t("subscribe_now")}</span>
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
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F911b3f35eb7b487196e59df5ecec5440?format=webp&width=800"
                  alt="MoroccoGlobal Logo"
                  className="h-16 sm:h-20 w-auto"
                />
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
    </div>
  );
}
