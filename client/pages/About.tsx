import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
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
  Target,
  Check,
  Heart,
  Lightbulb,
  Handshake,
  Zap,
  Rocket,
  Brain,
  Star,
} from "lucide-react";
import {
  fetchTeam,
  subscribeNewsletter,
  type TeamMember,
} from "../lib/supabase";
import { toast } from "sonner";
import { AboutHero } from "../components/About";
import { AboutIntroduction } from "../components/About/AboutIntroduction";
import { AboutMembers } from "../components/About/AboutMembers";
import { AboutHistory } from "../components/About/AboutHistory";

export default function About() {
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const teamScrollRef = useRef<HTMLDivElement>(null);

  const scrollTeam = (direction: "left" | "right") => {
    if (teamScrollRef.current) {
      const scrollAmount = 400;
      if (direction === "left") {
        teamScrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        teamScrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const setCurrentLanguage = (lang) => {
    setCurrentLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", lang);
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
    const loadTeamData = async () => {
      try {
        const data = await fetchTeam();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error loading team data:", error);
      }
    };
    loadTeamData();
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
        tagline: "Your World Awaits",

        about_hero_title: "Transforming Lives Through Global Opportunities",
        about_hero_subtitle: "Empowering Moroccan Talent Worldwide",
        about_hero_desc:
          "We believe every Moroccan student deserves access to world-class opportunities. WYF Morocco is the bridge connecting ambition with possibility.",

        about_story_title: "Our Story",
        about_story_desc:
          "WYF Morocco is the National Committee of Morocco of the World Youth Festival, created to represent Moroccan youth and connect them with international platforms, global events, and cross-cultural opportunities. Through sustained engagement and international partnerships, the committee has is the bridge connecting ambition with possibility.become a recognized actor in youth diplomacy and global youth cooperation.",
        about_story_highlight:
          "WYF Morocco works closely with international institutions, diplomatic partners, and youth networks to enable Moroccan students, young professionals, researchers, and community leaders to take part in major global forums, assemblies, and cultural exchanges. These efforts aim to strengthen youth leadership, promote intercultural understanding, and enhance Morocco’s presence within the global youth ecosystem.",

        about_mission_title: "Our Mission",
        about_mission_desc:
          "To represent, engage, and empower Moroccan youth by facilitating their participation in international platforms, global events, and youth cooperation initiatives, while promoting cultural exchange, dialogue, and leadership at the international level.",

        about_vision_title: "Our Vision",
        about_vision_desc:
          "A world in which Moroccan youth are fully represented and actively engaged on the global stage, empowered to develop leadership, foster cross-cultural understanding, and contribute positively to their communities and the international youth ecosystem.",

        about_values_title: "Core Values That Guide Us",
        about_values_access: "Representation & Inclusion",
        about_values_access_desc:
          "Ensuring Moroccan youth from all regions and backgrounds have the opportunity to participate in international events, dialogue, and cultural exchange.",
        about_values_excellence: "Excellence & Integrity",
        about_values_excellence_desc:
          "Maintaining the highest standards of professionalism, transparency, and accountability in all activities, partnerships, and engagements.",
        about_values_impact: "Impact & Empowerment",
        about_values_impact_desc:
          "Creating meaningful opportunities that develop leadership, skills, and global awareness, enabling youth to contribute positively to their communities and beyond.",
        about_values_innovation: "Collaboration & Innovation",
        about_values_innovation_desc:
          "Fostering strategic partnerships and continuously improving methods to strengthen youth engagement, cultural diplomacy, and international cooperation.",

        about_team_title: "Meet Our Team",
        about_team_subtitle: "Diverse talents united by one mission",
        about_team_member_1: "Founder & CEO - Leading the vision",
        about_team_member_2: "Director of Operations - Scaling impact",
        about_team_member_3: "Head of Product - Building solutions",
        about_team_member_4: "Community Lead - Empowering users",
        about_team_member_5:
          "Chief Technology Officer - Engineering excellence",
        about_team_member_6: "Partnerships Manager - Growing networks",

        about_achievements_title: "Impact by the Numbers",
        about_achievements_subtitle:
          "Measurable change in the lives of Moroccan students",
        about_achievements_1: "8M+",
        about_achievements_1_desc: "Youth Reached",
        about_achievements_2: "115+",
        about_achievements_2_desc: "Partners",
        about_achievements_3: "5,000+",
        about_achievements_3_desc: "Opportunities Shared",
        about_achievements_4: "35+",
        about_achievements_4_desc: "Countries",
        hero_stat_support: "Support",
        about_achievements_5: "₹10M+",
        about_achievements_5_desc: "Scholarships Connected",
        about_achievements_6: "4+",
        about_achievements_6_desc: "Languages Supported",

        about_journey_title: "Our Growth Journey",
        about_journey_milestone_1: "Day One",
        about_journey_milestone_1_desc:
          "Vision born: Building a platform to connect Moroccan talent with global opportunities",
        about_journey_milestone_2: "Year One",
        about_journey_milestone_2_desc:
          "10,000+ users empowered, partnerships established across Africa, success stories pouring in",
        about_journey_milestone_3: "Today",
        about_journey_milestone_3_desc:
          "50,000+ transformations, 150+ countries, and we're just getting started",

        about_why_title: "Why WYF Morocco?",
        about_why_1:
          "As the official National Committee of Morocco of the World Youth Festival, WYF Morocco is trusted by diplomatic partners, institutions, and youth organizations both nationally and internationally.",
        about_why_2:
          "We provide Moroccan youth with access to international events, cultural exchanges, and leadership forums across 150+ countries, fostering exposure, skills, and global collaboration.",
        about_why_3:
          "Through strong collaborations with embassies, educational institutions, and youth networks, WYF Morocco connects participants with guidance, mentorship, and structured programs.",
        about_why_4:
          "Our programs and delegations are open to all Moroccan youth, promoting diversity, equal opportunity, and broad participation regardless of background or location.",

        about_cta_title: "Ready to Transform Your Future?",
        about_cta_desc:
          "Join thousands of Moroccan students who have already begun their global journey",
        about_cta_button: "Explore Opportunities Now",

        // About History Section
        history_title: "WYF, a long history since 1957!",
        history_subtitle:
          "World Youth Festival started originally many decades ago",
        history_1945_year: "1945",
        history_1945_title: "A World Conference for Peace",
        history_1945_desc:
          "After the end of World War II, a world conference of youth for peace was held in London, where a decision was made to begin holding world festivals of youth and students.",
        history_1957_year: "1957",
        history_1957_title: "The First World Youth Festival",
        history_1957_desc:
          "Moscow hosted the World Festival of 1957, which became the largest in the history of the festival movement with 34,000 people participating from 130+ countries including Morocco and other African Nations.",
        history_2017_year: "2017",
        history_2017_title: "Festival Relocation",
        history_2017_desc:
          "Moscow hosted the Festival in Sochi before starting the new version of the World Youth Festival in 2024.",
        history_2024_year: "2024",
        history_2024_title: "The New Era Begins",
        history_2024_desc:
          'By decree of the President of the Russian Federation, the largest World Youth Festival was held on the federal territory "Sirius", from March 1 to 7, 2024, under the motto "Let\'s start the future together!"',
        history_wyf_morocco_title:
          "Within this festival, WYF Morocco was officially created!",
        history_wyf_morocco_desc:
          "The main idea was to unite countries to create a multipolar world based on the principles of justice and equality.",

        // About Introduction Section
        intro_title: "Introduction",
        intro_point_1:
          "The National Committee of Morocco of the World Youth Festival (WYF Morocco) is an International Russian Youth Network created for the first time within the World Youth Festival 2024 in Sochi according to the Instructions of Russian President Vladimir Putin on developing the work and the legacy of the festival.",
        intro_point_2:
          "Currently our committee is considered as the largest Russian youth network in Africa, reaching millions of Youth in Morocco and beyond and providing hundreds of opportunities through an emerging wide network of members and partners.",
        intro_metric_1: "2024",
        intro_metric_1_label: "Year Founded",
        intro_metric_2: "∞",
        intro_metric_2_label: "Growing Impact",
        intro_metric_3: "Africa",
        intro_metric_3_label: "Our Base",

        // Testimonial section
        about_testimonial_quote:
          '"WYF Morocco has grown into a strong international platform that unites young leaders and strengthens long-term cooperation and dialogue between nations."',
        about_testimonial_author: "Maria Zakharova",
        about_testimonial_role:
          "Official Spokesperson of the Ministry of Foreign Affairs of the Russian Federation",

        // PATRIOT Award Section
        patriot_official_recognition: "Official Recognition",
        patriot_award_title: "Award Title",
        patriot_award_label: "Best International Project",
        patriot_award_location: "in Russia",
        patriot_award_year: "2025",
        patriot_description_1:
          "The National Committee of Morocco of the World Youth Festival (WYF Morocco) has been honored with the prestigious PATRIOT Award for outstanding contributions to international youth cooperation.",
        patriot_description_2:
          "This remarkable recognition was presented by Maria Zakharova, Official Spokesperson of the Russian Foreign Ministry, during the exclusive ROSPATRIOT award ceremony in Moscow on December 9, 2025.",
        patriot_highlight_1:
          "International recognition for exceptional youth diplomacy",
        patriot_highlight_2: "Presented by Russian Foreign Ministry leadership",
        patriot_highlight_3:
          "Strengthening global cooperation & cultural exchange",
        patriot_cta_button: "Explore Our Global Impact",

        // Our Vision Section
        vision_badge: "Our Vision",
        vision_title: "Our Vision for a",
        vision_title_highlight: "Multipolar World",
        vision_card_1:
          "Our vision is rooted in the belief that the modern world must move beyond uniform models of development and rediscover the value of diversity among civilizations. We believe that each nation and society has the right to follow its own historical path, shaped by its culture, traditions, values, and collective memory, without external pressure or imposed standards.",
        vision_card_2:
          "We support the emergence of a balanced and multipolar international order, where cooperation is based on equality, mutual respect, and recognition of sovereign choices. In such a world, dialogue replaces domination, partnership replaces hierarchy, and long-term stability prevails over short-term interests.",
        vision_card_3:
          "True international cooperation can only exist when different civilizations engage with one another as equals, preserving their identities while working toward shared goals.",
        vision_core_principles: "Core Principles",
        vision_principle_1: "Equality",
        vision_principle_1_desc: "Nations cooperate as equal partners",
        vision_principle_2: "Respect",
        vision_principle_2_desc: "Recognition of sovereign choices",
        vision_principle_3: "Cooperation",
        vision_principle_3_desc: "Preserving identities, sharing goals",

        // Our Members Section
        members_title: "Our Members",
        members_exec_title: "Executive Committee",
        members_exec_subtitle: "Leadership Team",
        members_council_title: "General Council",
        members_council_subtitle: "Community Members",

        home_stay_updated_title: "Stay Updated with",
        home_stay_updated_highlight: "Global Opportunities",
        home_stay_updated_desc:
          "Get the latest scholarships, internships, success stories and exclusive tips delivered to your inbox every month.",
        home_email_placeholder: "Enter your email address",
        subscribe_now: "Subscribe Now",
        subscribe_privacy:
          "We respect your privacy. Unsubscribe anytime. No spam, ever.",

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
        tagline: "عالمك ينتظرك",

        about_hero_title: "تحويل الحياة من خلال الفرص العالمية",
        about_hero_subtitle: "تمكين المواهب المغربية",
        about_hero_desc:
          "نحن نؤمن أن كل طالب مغربي يستحق الوصول إلى الفرص العالمية. نحن الجسر الذي يربط الطموح بالإمكانية.",

        about_story_title: "قصتنا",
        about_story_desc:
          "تأسست برؤية واحدة: ديمقراطية الوصول إلى الفرص التعليمية والمهنية العالمية للطلاب والمهنيين المغاربة. رأينا العقول الرائعة محدودة بالجغرافيا والمعلومات غير الكافية.",
        about_story_highlight:
          "اليوم، نحن منصة موثوقة لأكثر من 50,000 باحث مغربي عالمياً، نغير الحياة يومياً.",

        about_mission_title: "مهمتنا",
        about_mission_desc:
          "ديمقراطية الوصول إلى الفرص العالمية لكل طالب ومهني مغربي، بغض النظر عن أصله أو موقعه.",

        about_vision_title: "رؤيتنا",
        about_vision_desc:
          "عالم حيث يمكن لكل موهبة مغربية متابعة أحلامها عالمياً، كسر الحواجز الجغرافية وإنشاء جيل من القادة العالميين.",

        about_values_title: "القيم الأساسية",
        about_values_access: "إمكانية الوصول أولاً",
        about_values_access_desc:
          "جعل الفرص العالمية من الدرجة الأولى متاحة للجميع",
        about_values_excellence: "التميز دائماً",
        about_values_excellence_desc: "تقديم أفضل النصائح والدعم",
        about_values_impact: "التأثير المقاس",
        about_values_impact_desc: "إنشاء تغيير دائم في حياة مجتمعنا",
        about_values_innovation: "الابتكار المستمر",
        about_values_innovation_desc:
          "التطور المستمر لخدمة مستخدمينا بشكل أفضل",

        about_team_title: "تعرف على فريقنا",
        about_team_subtitle: "مواهب متنوعة موحدة برسالة واحدة",
        about_team_member_1: "المؤسس والرئيس التنفيذي - قيادة الرؤية",
        about_team_member_2: "مديرة العمليات - توسيع التأثير",
        about_team_member_3: "مديرة المنتج - بناء الحلول",
        about_team_member_4: "مسؤول المجتمع - تمكين المستخدمين",
        about_team_member_5: "مسؤول التكنولوجيا - التميز التقني",
        about_team_member_6: "مدير الشراكات - توسيع الشبكات",

        about_achievements_title: "التأثير بالأرقام",
        about_achievements_subtitle:
          "تغيير قابل للقياس في حياة الطلاب المغاربة",
        about_achievements_1: "8M+",
        about_achievements_1_desc: "الشباب المستهدفون",
        about_achievements_2: "115+",
        about_achievements_2_desc: "الشركاء",
        about_achievements_3: "5,000+",
        about_achievements_3_desc: "فرص مشتركة",
        about_achievements_4: "35+",
        about_achievements_4_desc: "الدول",
        hero_stat_support: "الدعم",
        about_achievements_5: "₹10M+",
        about_achievements_5_desc: "منح متصلة",
        about_achievements_6: "4+",
        about_achievements_6_desc: "لغات مدعومة",

        about_journey_title: "رحلة نمونا",
        about_journey_milestone_1: "اليوم الأول",
        about_journey_milestone_1_desc:
          "ولدت الرؤية: بناء منصة لربط المواهب المغربية",
        about_journey_milestone_2: "السنة الأولى",
        about_journey_milestone_2_desc:
          "10,000+ مستخدم مكّن، شراكات في أفريقيا",
        about_journey_milestone_3: "اليوم",
        about_journey_milestone_3_desc: "50,000+ تحول ونحن فقط نبدأ",

        about_why_title: "لماذا اختيار WYF Morocco؟",
        about_why_1: "فرص منتقاة - أكثر من 50,000 مصدر تم التحقق منه",
        about_why_2: "مساعدة الخبير - مطابقة الذكاء الاصطناعي + التوجيه البشري",
        about_why_3: "مجتمع منخرط - تعلم من آلاف الأقران",
        about_why_4: "يمكن الوصول إليه دائماً - منصة مجانية، دعم متميز اختياري",

        about_cta_title: "هل أنت مستعد لتحويل مستقبلك؟",
        about_cta_desc:
          "انضم إلى آلاف الطلاب المغاربة الذين بدأوا رحلتهم العالمية",
        about_cta_button: "استكشف الفرص الآن",

        // About History Section
        history_title: "مهرجان الشباب العالمي، تاريخ طويل منذ 1957!",
        history_subtitle:
          "بدأ مهرجان الشباب العالمي في الأصل قبل عقود من الزمان",
        history_1945_year: "1945",
        history_1945_title: "مؤتمر عالمي من أجل السلام",
        history_1945_desc:
          "بعد انتهاء الحرب العالمية الثانية، عقد مؤتمر عالمي للشباب من أجل السلام في لندن، حيث تم الاتفاق على بدء عقد مهرجانات عالمية للشباب والطلاب.",
        history_1957_year: "1957",
        history_1957_title: "مهرجان الشباب العالمي الأول",
        history_1957_desc:
          "استضافت موسكو مهرجان الشباب العالمي عام 1957، والذي أصبح الأكبر في تاريخ حركة المهرجانات بمشاركة 34,000 شخص من 130+ دولة بما فيها المغرب والدول الأفريقية الأخرى.",
        history_2017_year: "2017",
        history_2017_title: "نقل المهرجان",
        history_2017_desc:
          "استضافت موسكو المهرجان في سوتشي قبل بدء النسخة الجديدة من مهرجان الشباب العالمي في 2024.",
        history_2024_year: "2024",
        history_2024_title: "بدء عصر جديد",
        history_2024_desc:
          'بمرسوم من رئيس الاتحاد الروسي، تم عقد أكبر مهرجان شباب عالمي على الإقليم الفيدرالي "سيريوس" من 1 إلى 7 مارس 2024، تحت شعار "لنبدأ المستقبل معاً!"',
        history_wyf_morocco_title:
          "ضمن هذا المهرجان، تم إنشاء لجنة مهرجان الشباب العالمي المغربية رسمياً!",
        history_wyf_morocco_desc:
          "الفكرة الرئيسية كانت توحيد الدول لإنشاء عالم متعدد الأقطاب يقوم على مبادئ العدالة والمساواة.",

        // About Introduction Section
        intro_title: "مقدمة",
        intro_point_1:
          "لجنة مهرجان الشباب العالمي الوطنية المغربية (WYF Morocco) هي شبكة شباب روسية دولية تم إنشاؤها للمرة الأولى في مهرجان الشباب العالمي 2024 في سوتشي بناءً على تعليمات الرئيس الروسي فلاديمير بوتين بشأن تطوير عمل وتراث المهرجان.",
        intro_point_2:
          "في الوقت الحالي، تعتبر اللجنة الخاصة بنا أكبر شبكة شباب روسية في أفريقيا، وتصل إلى ملايين الشباب في المغرب وخارجه وتوفر مئات الفرص من خلال شبكة ناشئة واسعة من الأعضاء والشركاء.",
        intro_metric_1: "2024",
        intro_metric_1_label: "سنة التأسيس",
        intro_metric_2: "∞",
        intro_metric_2_label: "تأثير متنام",
        intro_metric_3: "أفريقيا",
        intro_metric_3_label: "قاعدتنا",

        // Testimonial section
        about_testimonial_quote:
          '"لقد أصبح مهرجان الشباب العالمي المغربي منصة دولية قوية توحد القادة الشباب وتعزز التعاون والحوار طويل الأجل بين الدول."',
        about_testimonial_author: "ماريا زاخاروفا",
        about_testimonial_role:
          "المتحدثة الرسمية لوزارة الخارجية للاتحاد الروسي",

        // PATRIOT Award Section
        patriot_official_recognition: "الاعتراف الرسمي",
        patriot_award_title: "عنوان الجائزة",
        patriot_award_label: "أفضل مشروع دولي",
        patriot_award_location: "في روسيا",
        patriot_award_year: "2025",
        patriot_description_1:
          "تم تكريم اللجنة الوطنية المغربية لمهرجان الشباب العالمي بجائزة باتريوت المرموقة لإسهاماتها الاستثنائية في التعاون الدولي للشباب.",
        patriot_description_2:
          "تم تقديم هذا الاعتراف الرائع من قبل ماريا زاخاروفا، المتحدثة الرسمية لوزارة الخارجية الروسية، خلال حفل جوائز روسباتريوت الحصري في موسكو في 9 ديسمبر 2025.",
        patriot_highlight_1: "الاعتراف الدولي بدبلوماسية الشباب الاستثنائية",
        patriot_highlight_2: "تقديم من قيادة وزارة الخارجية الروسية",
        patriot_highlight_3: "تعزيز التعاون العالمي والتبادل الثقافي",
        patriot_cta_button: "اكتشف تأثيرنا العالمي",

        // Our Vision Section
        vision_badge: "رؤيتنا",
        vision_title: "رؤيتنا لـ",
        vision_title_highlight: "عالم متعدد الأقطاب",
        vision_card_1:
          "تستند رؤيتنا إلى الاعتقاد بأن العالم الحديث يجب أن يتجاوز نماذج التنمية الموحدة واستكشاف قيمة التنوع بين الحضارات. نحن نؤمن بأن لكل أمة ومجتمع الحق في اتباع مساره التاريخي الخاص، الذي يشكله ثقافته وتقاليده وقيمه وذاكرته الجماعية، دون ضغط خارجي أو معايير مفروضة.",
        vision_card_2:
          "ندعم ظهور نظام دولي متوازن ومتعدد الأقطاب، حيث يقوم التعاون على المساواة والاحترام المتبادل والاعتراف بالخيارات السيادية. في هذا العالم، يحل الحوار محل الهيمنة، والشراكة محل الهرمية، والاستقرار طويل الأجل محل المصالح قصيرة الأجل.",
        vision_card_3:
          "التعاون الدولي الحقيقي لا يمكن أن يوجد إلا عندما تتفاعل الحضارات المختلفة مع بعضها البعض كأنداد، محافظة على هوياتها مع السعي نحو أهداف مشتركة.",
        vision_core_principles: "المبادئ الأساسية",
        vision_principle_1: "المساواة",
        vision_principle_1_desc: "الأمم تتعاون كشركاء متساويين",
        vision_principle_2: "الاحترام",
        vision_principle_2_desc: "الاعتراف بالخيارات السيادية",
        vision_principle_3: "التعاون",
        vision_principle_3_desc: "الحفاظ على الهويات، تبادل الأهداف",

        // Our Members Section
        members_title: "أعضاء اللجنة",
        members_exec_title: "اللجنة التنفيذية",
        members_exec_subtitle: "فريق القيادة",
        members_council_title: "المجلس العام",
        members_council_subtitle: "أعضاء المجتمع",

        home_stay_updated_title: "ابقَ محدثاً مع",
        home_stay_updated_highlight: "الفرص العالمية",
        home_stay_updated_desc:
          "احصل على أحدث المنح والتدريبات وقصص النجاح والنصائح الحصرية المرسلة إلى صندوق الوارد الخاص بك كل شهر.",
        home_email_placeholder: "أدخل عنوان بريدك الإلكتروني",
        subscribe_now: "اشترك الآن",
        subscribe_privacy:
          "نحن نحترم خصوصيتك. ألغِ الاشتراك في أي وقت. لا بريد عشوائي أبداً.",

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
        made_with: "صُنع بـ ❤️ في المغرب",
        sitemap: "خريطة الموقع",
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
        tagline: "Ваш мир ждёт",

        about_hero_title: "Преобразование жизней через глобальные возможности",
        about_hero_subtitle: "Раскрывая потенциал марокканских талантов",
        about_hero_desc:
          "Мы верим, что каждый марокканский студент достоин доступа к мировым возможностям. MoroccoGlobal - это мост, соединяющий амбицию с реальностью.",

        about_story_title: "Наша История",
        about_story_desc:
          "Основана с единственной целью: демократизировать доступ к мировым образовательным и профессиональным возможностям для марокканских студентов и профессионалов.",
        about_story_highlight:
          "Сегодня мы - надежная платформа для 50 000+ марокканских соискателей по всему миру, ежедневно меняя жизни.",

        about_mission_title: "Наша Миссия",
        about_mission_desc:
          "Демократизировать доступ к глобальным возможностям для каждого марокканского студента и профессионала.",

        about_vision_title: "Наше Видение",
        about_vision_desc:
          "Мир, где каждый талантливый марокканец может реализовать свои мечты глобально, преодолев географические барьеры.",

        about_values_title: "Наши Ценности",
        about_values_access: "Доступность Прежде Всего",
        about_values_access_desc: "Обеспечение мировых возможностей для всех",
        about_values_excellence: "Отличие Всегда",
        about_values_excellence_desc:
          "Предоставление высочайшего качества помощи и поддержки",
        about_values_impact: "Влияние Измеримое",
        about_values_impact_desc:
          "Создание устойчивых изменений в жизни нашего сообщества",
        about_values_innovation: "Инновация Постоянно",
        about_values_innovation_desc:
          "Постоянное совершенствование для лучшего обслуживания",

        about_team_title: "Встречайте Нашу Команду",
        about_team_subtitle:
          "Разнообразные таланты, объединенные одной миссией",
        about_team_member_1:
          "Основатель и Генеральный Директор - Лидер видения",
        about_team_member_2: "Директор по Операциям - Масштабирование влияния",
        about_team_member_3: "Руководитель Продукта - Создание решений",
        about_team_member_4: "Директор Сообщества - Расширение прав",
        about_team_member_5: "Технический Директор - Техническое совершенство",
        about_team_member_6: "Менеджер Партнерств - Расширение сетей",

        about_achievements_title: "Влияние в Цифрах",
        about_achievements_subtitle:
          "Измеримые изменения в жизни марокканских студентов",
        about_achievements_1: "8M+",
        about_achievements_1_desc: "Молодёжь охвачена",
        about_achievements_2: "115+",
        about_achievements_2_desc: "Партнёры",
        about_achievements_3: "5,000+",
        about_achievements_3_desc: "Возможностей Поделено",
        about_achievements_4: "35+",
        about_achievements_4_desc: "Страны",
        hero_stat_support: "Поддержка",
        about_achievements_5: "₹10M+",
        about_achievements_5_desc: "Стипендий Подключено",
        about_achievements_6: "4+",
        about_achievements_6_desc: "Языков Поддерживается",

        about_journey_title: "Наш Путь Роста",
        about_journey_milestone_1: "День Первый",
        about_journey_milestone_1_desc:
          "Родилась идея: построить платформу для подключения талантов",
        about_journey_milestone_2: "Год Первый",
        about_journey_milestone_2_desc:
          "10 000+ расширенных пользователей, партнерства по Африке",
        about_journey_milestone_3: "Сегодня",
        about_journey_milestone_3_desc:
          "50 000+ трансформаций и мы только начинаем",

        about_why_title: "Почему Выбирать WYF Morocco?",
        about_why_1: "Отобранные Возможности - 50 000+ проверенных источников",
        about_why_2: "Экспертная Помощь - Подбор ИИ + менторство",
        about_why_3: "Сообщество Вовлечено - Учитесь у тысяч коллег",
        about_why_4:
          "Всегда Доступна - Бесплатная платформа, премиум опционально",

        about_cta_title: "Готовы Трансформировать Ваше Будущее?",
        about_cta_desc:
          "Присоединитесь к тысячам марокканских студентов в глобальном путешествии",
        about_cta_button: "Исследовать Возможности Сейчас",

        // About History Section
        history_title: "ВМФ, долгая история с 1957 года!",
        history_subtitle:
          "Всемирный фестиваль молодёжи изначально начался много десятилетий назад",
        history_1945_year: "1945",
        history_1945_title: "Всемирная конференция за мир",
        history_1945_desc:
          "После окончания Второй мировой войны в Лондоне состоялась всемирная конференция молодёжи за мир, на которой было решено начать проведение всемирных фестивалей молодёжи и студентов.",
        history_1957_year: "1957",
        history_1957_title: "Первый Всемирный фестиваль молодёжи",
        history_1957_desc:
          "Москва принимала Всемирный фестиваль молодёжи в 1957 году, который стал самым крупным в истории движения фестивалей с участием 34 000 человек из 130+ стран, включая Марокко и другие африканские страны.",
        history_2017_year: "2017",
        history_2017_title: "Переезд фестиваля",
        history_2017_desc:
          "Москва принимала фестиваль в Сочи перед началом новой версии Всемирного фестиваля молодёжи в 2024 году.",
        history_2024_year: "2024",
        history_2024_title: "Начало новой эры",
        history_2024_desc:
          'По указу Президента Российской Федерации на федеральной территории "Сириус" состоялся крупнейший Всемирный фестиваль молодёжи с 1 по 7 марта 2024 года под девизом "Давайте начнём будущее вместе!"',
        history_wyf_morocco_title:
          "В рамках этого фестиваля была официально создана Лига WYF Morocco!",
        history_wyf_morocco_desc:
          "Главная идея состояла в объединении стран для создания многополярного мира, основанного на принципах справедливости и равенства.",

        // About Introduction Section
        intro_title: "Введение",
        intro_point_1:
          "Национальный комитет Марокко Всемирного фестиваля молодёжи (WYF Morocco) — это международная российская молодёжная сеть, созданная впервые в рамках Всемирного фестиваля молодёжи 2024 в Сочи в соответствии с указаниями Президента Российской Федерации Владимира Путина по развитию работы и наследия фестиваля.",
        intro_point_2:
          "В настоящее время наш комитет считается крупнейшей российской молодёжной сетью в Африке, охватывающей миллионы молодых людей в Марокко и за его пределами и предоставляющей сотни возможностей через развивающуюся широкую сеть членов и партнёров.",
        intro_metric_1: "2024",
        intro_metric_1_label: "Год основания",
        intro_metric_2: "∞",
        intro_metric_2_label: "Растущее влияние",
        intro_metric_3: "Африка",
        intro_metric_3_label: "Наша база",

        // Testimonial section
        about_testimonial_quote:
          '"Всемирный фестиваль молодёжи Марокко превратился в сильную международную платформу, которая объединяет молодых лидеров и укрепляет долгосрочное сотрудничество и диалог между нациями."',
        about_testimonial_author: "Мария Захарова",
        about_testimonial_role:
          "Официальный представитель Министерства иностранных дел Российской Федерации",

        // PATRIOT Award Section
        patriot_official_recognition: "Официальное признание",
        patriot_award_title: "Название награды",
        patriot_award_label: "Лучший международный проект",
        patriot_award_location: "в России",
        patriot_award_year: "2025",
        patriot_description_1:
          "Национальный комитет Марокко Всемирного фестиваля молодёжи (WYF Morocco) удостоен престижной награды PATRIOT за выдающийся вклад в международное молодёжное сотрудничество.",
        patriot_description_2:
          "Это замечательное признание было представлено Марией Захаровой, официальным представителем Министерства иностранных дел Российской Федерации, на эксклюзивной церемонии награждения ROSPATRIOT в Москве 9 декабря 2025 года.",
        patriot_highlight_1:
          "Международное признание исключительной молодёжной дипломатии",
        patriot_highlight_2:
          "Презентация от руководства Министерства иностранных дел России",
        patriot_highlight_3:
          "Укрепление глобального сотрудничества и культурного обмена",
        patriot_cta_button: "Исследуйте наше глобальное влияние",

        // Our Vision Section
        vision_badge: "Наше видение",
        vision_title: "Наше видение",
        vision_title_highlight: "многополярного мира",
        vision_card_1:
          "Наше видение основано на убеждении, что современный мир должен выйти за пределы унифицированных моделей развития и переоткрыть ценность разнообразия цивилизаций. Мы верим, что каждое государство и общество имеют право следовать своим историческим путём, сформированным их культурой, традициями, ценностями и коллективной памятью, без внешнего давления или навязанных стандартов.",
        vision_card_2:
          "Мы поддерживаем формирование сбалансированного многополярного международного порядка, где сотрудничество основано на равенстве, взаимном уважении и признании суверенных выборов. В таком мире диалог вытесняет доминирование, партнёрство вытесняет иерархию, а долгосрочная стабильность преобладает над краткосрочными интересами.",
        vision_card_3:
          "Подлинное международное сотрудничество может существовать только тогда, когда различные цивилизации взаимодействуют друг с другом как равные, сохраняя свои идентичности и стремясь к общим целям.",
        vision_core_principles: "Основные принципы",
        vision_principle_1: "Равенство",
        vision_principle_1_desc: "Нации сотрудничают как равные партнёры",
        vision_principle_2: "Уважение",
        vision_principle_2_desc: "Признание суверенных выборов",
        vision_principle_3: "Сотрудничество",
        vision_principle_3_desc: "Сохранение идентичностей, общие цели",

        // Our Members Section
        members_title: "Наши члены",
        members_exec_title: "Исполнительный комитет",
        members_exec_subtitle: "Команда лидеров",
        members_council_title: "Генеральный совет",
        members_council_subtitle: "Члены сообщества",

        home_stay_updated_title: "Будьте в курсе",
        home_stay_updated_highlight: "Глобальные возможности",
        home_stay_updated_desc:
          "Получайте последние стипендии, стажировки, истории успеха и эксклюзивные советы в вашу почту каждый месяц.",
        home_email_placeholder: "Введите свой адрес электронной почты",
        subscribe_now: "Подписаться сейчас",
        subscribe_privacy:
          "Мы уважаем вашу приватность. Отпишитесь в любой момент. Без спама.",

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
        made_with: "Сделано с ❤️ в Марокко",
        sitemap: "Карта сайта",
        language: "Язык",
        telegram: "Телеграм",
        instagram: "Инстаграм",
        version: "v1.0.0 • 2026",
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

  const selectedLang =
    languages.find((l) => l.code === currentLanguage) ?? languages[0];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation Bar - SAME AS INDEX */}
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
                    item.path === "/about" ? "text-brand-red" : ""
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 ${
                      item.path === "/about"
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

      {/* Hero Section with Testimonial and Statistics */}
      <AboutHero t={t} />

      {/* Introduction Section */}
      <AboutIntroduction t={t} />

      {/* Our Members Section */}
      <AboutMembers t={t} />

      {/* Team Section - Horizontal Scroll */}
      <section className="scroll-section py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2F77da8a686cb94e459afcaad255d5edb5?format=webp&width=800)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.07,
            backgroundAttachment: "fixed",
          }}
        />
        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 lg:mb-20">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t("about_team_title")}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {t("about_team_subtitle")}
              </p>
            </div>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollTeam("left")}
              className="hidden lg:flex absolute left-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div ref={teamScrollRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 sm:gap-8 pb-6 px-4 sm:px-6 min-w-min mx-auto">
                {teamMembers.length > 0 ? (
                  [...teamMembers]
                    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                    .map((member, idx) => {
                      const displayName =
                        member.name_i18n?.[currentLanguage] ||
                        member.name ||
                        "";
                      const displayRole =
                        member.role_i18n?.[currentLanguage] ||
                        member.role ||
                        "";
                      const displayBio =
                        member.bio_i18n?.[currentLanguage] ||
                        member.bio ||
                        "Making global impact through dedication and innovation";
                      return (
                        <div
                          key={member.id}
                          className="group relative rounded-2xl overflow-hidden bg-white border-2 border-gray-200 shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700 flex-shrink-0 w-72 sm:w-80"
                          style={{ animationDelay: `${idx * 80}ms` }}
                        >
                          {/* Image */}
                          <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                            {member.image_url ? (
                              <img
                                src={member.image_url}
                                alt={displayName}
                                className="w-full h-full object-cover"
                                style={{
                                  filter:
                                    "brightness(1.1) contrast(1.15) saturate(1.1)",
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-brand-red/20 to-gray-900/20 flex items-center justify-center">
                                <Users className="w-16 h-16 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="p-5 sm:p-6">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                              {displayName}
                            </h3>
                            <p className="text-xs sm:text-sm text-brand-red font-semibold mb-2">
                              {displayRole}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {displayBio}
                            </p>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="flex items-center justify-center w-full py-12">
                    <p className="text-gray-500">Loading team members...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollTeam("right")}
              className="hidden lg:flex absolute right-0 top-1/3 z-20 -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200 hover:border-brand-red text-gray-700 hover:text-brand-red transition-all duration-300 shadow-lg hover:shadow-red-200/50 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fade gradients for better UX */}
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* WYF History Section */}
      <AboutHistory t={t} />

      {/* PATRIOT Award Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-red/8 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand-red/6 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(187,9,9,0.02)_1px,transparent_1px),linear-gradient(rgba(187,9,9,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Main Container */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                {/* Background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red/30 to-red-400/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                {/* Image container */}
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fd4fd91be66e54271aa0c8ae2c3c89e7c%2Fe1228f0e51854d36a0ea75ed8cd549ec?format=webp&width=800&height=1200"
                    alt="PATRIOT Award Ceremony - Maria Zakharova presenting award"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>

                {/* Premium badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-brand-red px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-2xl flex items-center gap-2 border border-brand-red/20">
                  <Award className="w-5 h-5" />
                  <span>PATRIOT 2025</span>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-brand-red/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-brand-red/30 rounded-br-2xl" />

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-brand-red to-transparent" />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-7 sm:space-y-8">
                {/* Animated header badge */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-red/10 to-red-50/10 px-5 py-3 rounded-full border border-brand-red/20 hover:border-brand-red/50 transition-all duration-300">
                  <Award className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-brand-red uppercase tracking-widest">
                    {t("patriot_official_recognition")}
                  </span>
                </div>

                {/* Main Heading with accent */}
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="text-xs sm:text-sm font-bold text-brand-red bg-brand-red/5 px-4 py-2 rounded-full uppercase tracking-widest">
                      {t("patriot_award_title")}
                    </span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                    {t("patriot_award_label")}{" "}
                    <span className="bg-gradient-to-r from-brand-red to-red-700 bg-clip-text text-transparent">
                      {t("patriot_award_location")}
                    </span>
                  </h2>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-20 h-1 bg-gradient-to-r from-brand-red to-transparent rounded-full" />
                    <span className="text-xs text-gray-600 font-semibold uppercase">
                      {t("patriot_award_year")}
                    </span>
                  </div>
                </div>

                {/* Main Description */}
                <div className="space-y-5">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                    {t("patriot_description_1")}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {t("patriot_description_2")}
                  </p>
                </div>

                {/* Achievement highlights with better animation */}
                <div className="space-y-3 pt-4">
                  {[
                    t("patriot_highlight_1"),
                    t("patriot_highlight_2"),
                    t("patriot_highlight_3"),
                  ].map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 group cursor-default"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-red/20 transition-all duration-300">
                        <Check className="w-4 h-4 text-brand-red font-bold" />
                      </div>
                      <p className="text-gray-700 text-base sm:text-lg font-medium group-hover:text-gray-900 transition-colors">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <div className="pt-6">
                  <a
                    href="https://en.hespress.com/127130-moroccos-youth-festival-committee-wins-top-russian-award.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-red via-red-600 to-red-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-brand-red/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">
                      {t("patriot_cta_button")}
                    </span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="scroll-section py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-900/4 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(187,9,9,0.02)_1px,transparent_1px),linear-gradient(rgba(187,9,9,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          {/* Header Badge */}
          <div className="text-center mb-10 sm:mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 px-5 py-2 rounded-full border border-brand-red/20 mb-6">
              <Lightbulb className="w-4 h-4 text-brand-red" />
              <span className="text-xs font-bold text-brand-red uppercase tracking-widest">
                {t("vision_badge")}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black text-gray-900 mb-2 leading-tight">
              {t("vision_title")}{" "}
              <span className="bg-gradient-to-r from-brand-red via-red-600 to-red-700 bg-clip-text text-transparent">
                {t("vision_title_highlight")}
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-red to-transparent rounded-full mx-auto" />
          </div>

          {/* Vision Cards Container */}
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {/* Card 1 */}
            <div className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-red/30 p-7 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-1 h-full bg-gradient-to-b from-brand-red to-transparent flex-shrink-0 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {t("vision_card_1")}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-red/30 p-7 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-1 h-full bg-gradient-to-b from-brand-red to-transparent flex-shrink-0 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {t("vision_card_2")}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-brand-red/30 p-7 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-1 h-full bg-gradient-to-b from-brand-red to-transparent flex-shrink-0 rounded-full" />
                <div className="flex-1">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {t("vision_card_3")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mt-14 sm:mt-16 pt-12 sm:pt-14 border-t-2 border-gray-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-10">
              {t("vision_core_principles")}
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Equality */}
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-red/10 to-red-50 border-2 border-brand-red/20 group-hover:border-brand-red/50 group-hover:bg-brand-red/20 transition-all duration-300 mb-4 group-hover:shadow-lg">
                  <Handshake className="w-8 h-8 text-brand-red" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-red transition-colors">
                  {t("vision_principle_1")}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("vision_principle_1_desc")}
                </p>
              </div>

              {/* Respect */}
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-red/10 to-red-50 border-2 border-brand-red/20 group-hover:border-brand-red/50 group-hover:bg-brand-red/20 transition-all duration-300 mb-4 group-hover:shadow-lg">
                  <Heart className="w-8 h-8 text-brand-red" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-red transition-colors">
                  {t("vision_principle_2")}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("vision_principle_2_desc")}
                </p>
              </div>

              {/* Cooperation */}
              <div className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-red/10 to-red-50 border-2 border-brand-red/20 group-hover:border-brand-red/50 group-hover:bg-brand-red/20 transition-all duration-300 mb-4 group-hover:shadow-lg">
                  <Globe className="w-8 h-8 text-brand-red" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-brand-red transition-colors">
                  {t("vision_principle_3")}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("vision_principle_3_desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://cdn.builder.io/api/v1/image/assets%2F558607bd11ef4f5c96a63357270e2bfa%2F92f8b815178841d0bd08aed5b20d683c?format=webp&width=800)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
            filter: "sepia(0.1) brightness(1.1) contrast(1.3)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-red/20 via-transparent to-brand-red/10" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t("about_cta_title")}
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {t("about_cta_desc")}
          </p>
          <Link
            to="/news"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-gray-900 text-white px-6 sm:px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
          >
            <span>{t("about_cta_button")}</span>
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
                  placeholder={t("home_email_placeholder")}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-gray-800 placeholder-gray-500 shadow-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingNewsletter}
                  className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-brand-red to-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:min-w-[180px] disabled:opacity-50 disabled:cursor-not-allowed"
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
