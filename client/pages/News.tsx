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
  Search,
  X as XIcon,
  Loader,
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

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
    if (mobileMenuOpen || selectedArticle) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, selectedArticle]);

  // Fetch articles from Supabase
  useEffect(() => {
    const loadArticles = async () => {
      setLoadingArticles(true);
      const data = await fetchNews();
      setArticles(data);
      setLoadingArticles(false);
    };
    loadArticles();
  }, []);

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

        news_article_1_content: 'The F-1 student visa is the most common visa type for international students studying in the United States. This comprehensive guide walks you through every step of the application process.\n\nRequirements:\n• Valid passport\n• I-20 form from your educational institution\n• Proof of financial support\n• SEVIS fee payment receipt\n• Visa application fee payment\n\nThe Interview Process:\nYour visa interview is a crucial step. Be prepared to answer questions about your study plans, financial support, and ties to your home country. Answer truthfully and confidently.\n\nTimeline:\nTypically, the process takes 4-8 weeks from start to finish. Apply as soon as you receive your I-20 form. Processing times vary by location, so check your local embassy website.\n\nAfter Arrival:\nOnce you arrive in the US, maintain your status by following all F-1 regulations. Keep your documents updated and inform your school\'s international office of any changes.',

        news_article_2_content: 'The Fulbright Scholarship is one of the most prestigious scholarship programs available for international students. We\'re excited to announce that applications for the 2025-2026 academic year are now open!\n\nEligibility Requirements:\n• Moroccan citizenship\n• Bachelor\'s degree completed\n• Strong academic record\n• English language proficiency\n• Commitment to your field\n\nApplication Timeline:\nApplications are open now through March 15, 2025. Submit all materials through the official Fulbright website. Selected candidates will undergo interviews in April-May 2025.\n\nWhat the Program Covers:\n• Full tuition and fees\n• Monthly stipend for living expenses\n• Travel allowance\n• Health insurance\n• Professional development opportunities\n\nThis is an incredible opportunity to study at top universities in the United States while representing Morocco. Don\'t miss this chance!',

        news_article_3_content: 'Silicon Valley is the epicenter of technological innovation, and 2025 offers unprecedented opportunities for international student interns. Explore the most sought-after tech internship positions available.\n\nTop Companies Hiring:\n• Google\n• Apple\n• Meta (Facebook)\n• Microsoft\n• Amazon\n• Netflix\n• Stripe\n\nInternship Benefits:\n• Competitive salaries (typically $25-40/hour)\n• Relocation assistance\n• Free meals and transportation\n• Networking opportunities\n• Real-world project experience\n\nHow to Apply:\n1. Polish your resume and GitHub profile\n2. Practice coding interviews\n3. Apply directly on company career websites\n4. Network at tech conferences and events\n5. Follow up with recruiters\n\nDeadline for summer 2025 positions is typically February-March. Start your applications now!',

        news_article_4_content: 'Fatima Al-Mansouri\'s journey from Marrakech to Oxford University is an inspiring testament to determination and hard work.\n\nFatima\'s Background:\nGrowing up in Marrakech, Fatima faced financial challenges but maintained an unwavering commitment to education. She excelled in her secondary school studies, particularly in mathematics and physics.\n\nThe Challenge:\nWhile her academic credentials were strong, the cost of a university education seemed impossible. Fatima applied to various scholarship programs while working part-time to support her family.\n\nThe Breakthrough:\nAfter multiple rejections, Fatima persisted. She refined her application essays, sought mentorship, and applied to the prestigious Oxford Scholarship program. Her unique story and academic excellence finally caught the attention of the selection committee.\n\nAt Oxford:\nFatima is now pursuing a Master\'s degree in Physics, conducting groundbreaking research in quantum computing. She credits her success to perseverance, excellent mentorship, and her unwavering belief in herself.\n\nHer Message:\n"Don\'t give up. Every rejection brings you closer to acceptance. Believe in yourself and keep pushing forward."',

        news_article_5_content: 'The UK government has implemented several important changes to student visa requirements effective January 1, 2025. Here\'s what you need to know:\n\nKey Changes:\n• New English language proficiency requirements\n• Updated financial documentation standards\n• Revised visa processing timeline (now 6-8 weeks)\n• New post-visa work options\n• Changes to dependent visa regulations\n\nFinancial Requirements:\nYou must now demonstrate at least 4 weeks of funds covering:\n• Annual tuition (typically £15,000-30,000)\n• Living expenses (£1,025 per month in London, £820 elsewhere)\n• Any dependents\n\nEnglish Language Requirements:\n• IELTS: minimum 5.5 overall\n• TOEFL iBT: minimum 46\n• Cambridge English: Grade C or above\n\nPost-Graduation Work Visa:\nInternational graduates can now stay for:\n• 2 years for Bachelor\'s and Master\'s degrees\n• 3 years for PhD graduates\n\nAction Steps:\nStart gathering documents immediately if applying. Submit your visa application at least 8 weeks before your program start date.',

        news_article_6_content: 'Canada\'s Express Entry system offers one of the fastest pathways to permanent residence for skilled workers. Here\'s everything you need to know.\n\nWhat is Express Entry?\nExpress Entry is an online system that manages applications for permanent residence in Canada. It\'s designed for skilled workers and international graduates.\n\nPrograms Included:\n• Federal Skilled Worker Program (FSWP)\n• Federal Skilled Trades Program (FSTP)\n• Canadian Experience Class (CEC)\n• Provincial Nominee Program (PNP)\n\nComprehensive Ranking System (CRS):\nCandidates are ranked based on factors like:\n• Age\n• Education level\n• Language proficiency (English/French)\n• Canadian work experience\n• Arranged job offer\n• Provincial nomination\n\nTimeline:\n• Create profile: 5 minutes\n• Invitation to apply: Typically within 6 months\n• Final processing: 6 months or less\n\nNext Steps:\n1. Complete language proficiency test (IELTS or TOEFL)\n2. Get education credentials assessed\n3. Gather required documents\n4. Create your Express Entry profile\n5. Wait for invitation\n6. Submit complete application',

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
        news_search_placeholder: 'Search articles by title or content...',
        news_close: 'Close',
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

        news_article_1_content: 'Le visa étudiant F-1 est le type de visa le plus courant pour les étudiants internationaux étudiant aux États-Unis. Ce guide complet vous guide à travers chaque étape du processus de demande.\n\nExigences:\n• Passeport valide\n• Formulaire I-20 de votre établissement d\'enseignement\n• Preuve du soutien financier\n• Reçu du paiement des frais SEVIS\n\nLe Processus d\'Entrevue:\nVotre entrevue de visa est une étape cruciale. Soyez prêt à répondre aux questions sur vos plans d\'études.\n\nCalendrier:\nTypiquement, le processus prend 4 à 8 semaines. Postulez dès que vous recevez votre formulaire I-20.',

        news_article_2_content: 'La Bourse Fulbright est l\'un des programmes de bourses les plus prestigieux disponibles pour les étudiants internationaux. Les candidatures pour l\'année académique 2025-2026 sont maintenant ouvertes!\n\nCritères d\'Admissibilité:\n• Citoyenneté marocaine\n• Diplôme de premier cycle complété\n• Dossier académique solide\n• Maîtrise de la langue anglaise\n• Engagement dans votre domaine',

        news_article_3_content: 'La Silicon Valley est l\'épicentre de l\'innovation technologique, et 2025 offre des opportunités sans précédent pour les stagiaires étudiants internationaux.\n\nMeilleures Entreprises:\n• Google\n• Apple\n• Meta (Facebook)\n• Microsoft\n• Amazon\n• Netflix\n• Stripe',

        news_article_4_content: 'Le parcours de Fatima Al-Mansouri de Marrakech à l\'Université d\'Oxford est un témoignage inspirant de détermination et de travail acharné.\n\nAntécédents de Fatima:\nGrandissant à Marrakech, Fatima a fait face à des défis financiers mais a maintenu un engagement inébranlable envers l\'éducation.\n\nLe Défi:\nBien que ses qualifications académiques soient solides, le coût d\'une formation universitaire semblait impossible.\n\nLa Percée:\nAprès plusieurs rejets, Fatima a persisté et a reçu une attention spéciale du comité de sélection d\'Oxford.',

        news_article_5_content: 'Le gouvernement britannique a mis en œuvre plusieurs changements importants aux exigences de visa étudiant à partir du 1er janvier 2025.\n\nChangements Clés:\n• Nouvelles exigences de maîtrise de la langue anglaise\n• Normes de documentation financière mises à jour\n• Calendrier de traitement des visas révisé (6-8 semaines)\n• Nouvelles options de travail après visa',

        news_article_6_content: 'Le système Canadian Express Entry de Canada offre l\'un des chemins les plus rapides vers la résidence permanente pour les travailleurs qualifiés.\n\nQu\'est-ce qu\'Express Entry?\nExpress Entry est un système en ligne qui gère les demandes de résidence permanente au Canada. Il est conçu pour les travailleurs qualifiés et les diplômés internationaux.',

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
        news_search_placeholder: 'Rechercher des articles par titre ou contenu...',
        news_close: 'Fermer',
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

        news_article_1_content: 'Виза F-1 для студентов - наиболее распространённый тип визы для иностранных студентов, обучающихся в Соединённых Штатах. Это полное руководство проведёт вас через каждый этап процесса подачи заявления.\n\nТребования:\n• Действительный паспорт\n• Форма I-20 от вашего учебного заведения\n• Доказательство финансовой поддержки\n• Квитанция об оплате сбора SEVIS\n\nПроцесс Собеседования:\nВаше интервью для получения визы - критически важный этап. Будьте готовы ответить на вопросы о ваших планах обучения.',

        news_article_2_content: 'Стипендия Фулбрайт - один из самых престижных стипендиальных программ, доступных для иностранных студентов. Приём заявлений на 2025-2026 учебный год теперь открыт!\n\nКритерии приемлемости:\n• Марокканское гражданство\n• Завершённая степень бакалавра\n• Высокий академический рейтинг\n• Владение английским языком\n• Преданность своей области обучения',

        news_article_3_content: 'Силиконовая долина - эпицентр технологических инноваций, и 2025 год предлагает беспрецедентные возможности для иностранных студентов-стажёров.\n\nТоповые Компании:\n• Google\n• Apple\n• Meta (Facebook)\n• Microsoft\n• Amazon\n• Netflix\n• Stripe',

        news_article_4_content: 'Путь Фатимы Аль-Мансури из Марракеша в Оксфордский университет - вдохновляющее свидетельство решимости и упорного труда.\n\nПредыстория Фатимы:\nВырастая в Марракеше, Фатима столкнулась с финансовыми трудностями, но сохранила непоколебимое стремление к образованию.\n\nВызов:\nХотя её академические квалификации были сильными, стоимость университетского образования казалась невозможной.',

        news_article_5_content: 'Британское правительство внедрило несколько важных изменений в требования к студенческим визам, вступившие в силу с 1 января 2025 года.\n\nКлючевые Изменения:\n• Новые требования к владению английским языком\n• Обновленные стандарты финансовой документации\n• Пересмотренные сроки обработки виз (6-8 недель)\n• Новые возможности работы после получения визы',

        news_article_6_content: 'Система Express Entry Канады предлагает один из самых быстрых путей к постоянному резидентству для квалифицированных работников.\n\nЧто такое Express Entry?\nExpress Entry - это онлайн-система, которая управляет заявлениями на постоянное резидентство в Канаде. Она предназначена для квалифицированных работников и выпускников международных учреждений.',

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
        news_search_placeholder: 'Поиск статей по названию или содержанию...',
        news_close: 'Закрыть',
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


  const categories = [
    { id: 'all', label: t('news_category_all') },
    { id: 'visa', label: 'Visa Updates' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'notice', label: 'Notice' },
    { id: 'general', label: 'General' },
    { id: 'cooperation', label: 'Cooperation' },
  ];

  const categoryMap: { [key: string]: string } = {
    'visa': 'Visa Updates',
    'scholarships': 'Scholarships',
    'notice': 'Notice',
    'general': 'General',
    'cooperation': 'Cooperation',
  };

  // Helper to get multilingual content
  const getArticleContent = (article: NewsArticle) => ({
    title: article.title_i18n?.[currentLanguage] || article.title,
    description: article.description_i18n?.[currentLanguage] || article.description,
    content: article.content_i18n?.[currentLanguage] || article.content,
  });

  const filteredArticles = articles.filter(article => {
    // Filter by category
    const matchesCategory = selectedCategory === 'all'
      ? true
      : article.category === categoryMap[selectedCategory];

    // Filter by search query
    const searchLower = searchQuery.toLowerCase();
    const articleContent = getArticleContent(article);
    const matchesSearch = searchQuery === ''
      ? true
      : articleContent.title.toLowerCase().includes(searchLower) ||
        articleContent.description.toLowerCase().includes(searchLower) ||
        articleContent.content.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

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
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-red to-gray-900 transition-all duration-300 w-0 group-hover:w-full`}
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
              <div className="relative" data-lang-menu="true">
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

      {/* Search Bar */}
      <section className="py-8 sm:py-12 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('news_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border-2 border-gray-200 focus:border-brand-red focus:outline-none transition-all text-gray-800 placeholder-gray-400 shadow-sm hover:border-gray-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article found' : 'articles found'}
            </p>
          )}
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
          {loadingArticles ? (
            <div className="text-center py-16 sm:py-20">
              <Loader className="w-12 h-12 mx-auto text-brand-red animate-spin" />
              <p className="text-gray-600 mt-4">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto opacity-50" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {filteredArticles.map((article, idx) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-brand-red overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
                    <img
                      src={article.image_url || 'https://images.unsplash.com/photo-1505252585461-04db1267ae5e?w=400&h=300&fit=crop'}
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
                      {getArticleContent(article).title}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2 flex-1">
                      {getArticleContent(article).description}
                    </p>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{t('news_published')} {article.date}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="mt-4 group/btn inline-flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all duration-300"
                    >
                      <span>{t('news_read_more')}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
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

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-black/40 animate-in fade-in duration-300"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 line-clamp-1">
                {getArticleContent(selectedArticle).title}
              </h2>
              <button
                onClick={() => setSelectedArticle(null)}
                className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label={t('news_close')}
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Featured Image */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <img
                  src={selectedArticle.image_url || 'https://images.unsplash.com/photo-1505252585461-04db1267ae5e?w=800&h=600&fit=crop'}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {selectedArticle.category}
                  </span>
                </div>
              </div>

              {/* Article Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm sm:text-base">{t('news_published')} {selectedArticle.date}</span>
                </div>
              </div>

              {/* Article Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 my-6 sm:my-8">
                {getArticleContent(selectedArticle).title}
              </h1>

              {/* Article Content */}
              <div className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed">
                {getArticleContent(selectedArticle).content.split('\n\n').map((paragraph, idx) => (
                  <div key={idx} className="mb-6 sm:mb-8">
                    {paragraph.includes('•') ? (
                      <ul className="space-y-2 sm:space-y-3">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className={`${item.trim().startsWith('•') ? 'ml-6 sm:ml-8 text-gray-700' : 'font-semibold text-gray-900 mt-4'}`}>
                            {item.replace('•', '').trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={paragraph.includes(':') && paragraph.length < 100 ? 'font-semibold text-gray-900 text-lg sm:text-xl mb-3' : 'text-gray-700'}>
                        {paragraph}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-8 sm:mt-10 w-full px-6 sm:px-8 py-3 sm:py-4 bg-brand-red text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                {t('news_close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
