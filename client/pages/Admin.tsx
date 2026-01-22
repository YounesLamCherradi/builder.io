import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Loader, Upload, X, LogOut } from 'lucide-react';
import { fetchNews, createNews, updateNews, deleteNews, fetchEvents, createEvent, updateEvent, deleteEvent, fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember, fetchGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem, fetchPartners, createPartner, updatePartner, deletePartner, fetchFAQs, createFAQ, updateFAQ, deleteFAQ, fetchPastEvents, createPastEvent, updatePastEvent, deletePastEvent, uploadImage, type NewsArticle, type Event, type TeamMember, type GalleryItem, type Partner, type FAQ, type PastEvent } from '../lib/supabase';
import { toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'team' | 'gallery' | 'partners' | 'faqs' | 'past_events'>('news');
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [faqsList, setFaqsList] = useState<FAQ[]>([]);
  const [pastEventsList, setPastEventsList] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar' | 'ru'>('en');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Visa Updates',
    author: '',
    image_url: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    about_event: '',
    name: '',
    role: '',
    partnerName: '',
    partnerLink: '',
    question: '',
    answer: '',
    bio: '',
    orderIndex: 0,
  });

  // Multilingual form data
  const [i18nData, setI18nData] = useState({
    title_i18n: { en: '', ar: '', ru: '' },
    description_i18n: { en: '', ar: '', ru: '' },
    content_i18n: { en: '', ar: '', ru: '' },
    about_event_i18n: { en: '', ar: '', ru: '' },
    name_i18n: { en: '', ar: '', ru: '' },
    role_i18n: { en: '', ar: '', ru: '' },
    bio_i18n: { en: '', ar: '', ru: '' },
    caption_i18n: { en: '', ar: '', ru: '' },
    question_i18n: { en: '', ar: '', ru: '' },
    answer_i18n: { en: '', ar: '', ru: '' },
  });

  const [eventDetails, setEventDetails] = useState<string[]>([
    '',
    '',
    '',
    '',
  ]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [buttonConfig, setButtonConfig] = useState({
    show_register_button: true,
    register_url: '',
    show_learn_more_button: true,
    learn_more_url: '',
  });

  // Load data
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    if (activeTab === 'news') {
      const data = await fetchNews();
      setNewsList(data);
    } else if (activeTab === 'events') {
      const data = await fetchEvents();
      setEventsList(data);
    } else if (activeTab === 'team') {
      const data = await fetchTeam();
      setTeamList(data);
    } else if (activeTab === 'gallery') {
      const data = await fetchGallery();
      setGalleryList(data);
    } else if (activeTab === 'partners') {
      const data = await fetchPartners();
      setPartnersList(data);
    } else if (activeTab === 'faqs') {
      const data = await fetchFAQs();
      setFaqsList(data);
    } else if (activeTab === 'past_events') {
      const data = await fetchPastEvents();
      setPastEventsList(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image size must be less than 15MB');
      return;
    }

    setUploadingImage(true);
    try {
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
        setImagePreview(publicUrl);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (activeTab === 'gallery' && !formData.image_url) {
      toast.error('Please upload an image for the gallery');
      setLoading(false);
      return;
    }

    if (activeTab === 'partners' && !formData.image_url) {
      toast.error('Please upload a logo for the partner');
      setLoading(false);
      return;
    }

    if (activeTab === 'partners' && !formData.partnerName) {
      toast.error('Please enter a partner name');
      setLoading(false);
      return;
    }

    if (activeTab === 'team' && !i18nData.name_i18n.en) {
      toast.error('Please enter the team member name in English');
      setLoading(false);
      return;
    }

    if (activeTab === 'team' && !i18nData.role_i18n.en) {
      toast.error('Please enter the team member role in English');
      setLoading(false);
      return;
    }

    try {
      if (activeTab === 'news') {
        if (editingId) {
          await updateNews(editingId, {
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            content: i18nData.content_i18n.en,
            category: formData.category,
            author: formData.author,
            image_url: formData.image_url,
            date: formData.date,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            content_i18n: i18nData.content_i18n,
            order_index: formData.orderIndex,
          });
        } else {
          await createNews({
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            content: i18nData.content_i18n.en,
            category: formData.category,
            author: formData.author,
            image_url: formData.image_url,
            date: formData.date,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            content_i18n: i18nData.content_i18n,
            order_index: formData.orderIndex,
          });
        }
      } else if (activeTab === 'events') {
        if (editingId) {
          await updateEvent(editingId, {
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            about_event: i18nData.about_event_i18n.en,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            image_url: formData.image_url,
            details: eventDetails.filter(d => d.trim()),
            show_register_button: buttonConfig.show_register_button,
            register_url: buttonConfig.register_url || null,
            show_learn_more_button: buttonConfig.show_learn_more_button,
            learn_more_url: buttonConfig.learn_more_url || null,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            about_event_i18n: i18nData.about_event_i18n,
          });
        } else {
          await createEvent({
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            about_event: i18nData.about_event_i18n.en,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            image_url: formData.image_url,
            details: eventDetails.filter(d => d.trim()),
            show_register_button: buttonConfig.show_register_button,
            register_url: buttonConfig.register_url || null,
            show_learn_more_button: buttonConfig.show_learn_more_button,
            learn_more_url: buttonConfig.learn_more_url || null,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            about_event_i18n: i18nData.about_event_i18n,
          });
        }
      } else if (activeTab === 'team') {
        // Team member handling
        if (editingId) {
          await updateTeamMember(editingId, {
            name: i18nData.name_i18n.en,
            role: i18nData.role_i18n.en,
            role_i18n: i18nData.role_i18n,
            bio: i18nData.bio_i18n.en,
            bio_i18n: i18nData.bio_i18n,
            image_url: formData.image_url,
            order_index: formData.orderIndex,
          });
        } else {
          await createTeamMember({
            name: i18nData.name_i18n.en,
            role: i18nData.role_i18n.en,
            role_i18n: i18nData.role_i18n,
            bio: i18nData.bio_i18n.en,
            bio_i18n: i18nData.bio_i18n,
            image_url: formData.image_url,
            order_index: formData.orderIndex,
          });
        }
      } else if (activeTab === 'gallery') {
        // Gallery handling
        if (editingId) {
          await updateGalleryItem(editingId, {
            image_url: formData.image_url,
            caption_i18n: i18nData.caption_i18n,
            order_index: formData.orderIndex,
          });
        } else {
          await createGalleryItem({
            image_url: formData.image_url,
            caption_i18n: i18nData.caption_i18n,
            order_index: formData.orderIndex,
          });
        }
      } else if (activeTab === 'partners') {
        // Partners handling
        if (editingId) {
          await updatePartner(editingId, {
            logo_url: formData.image_url,
            name: formData.partnerName,
            link: formData.partnerLink,
            order_index: formData.orderIndex,
          });
        } else {
          await createPartner({
            logo_url: formData.image_url,
            name: formData.partnerName,
            link: formData.partnerLink,
            order_index: formData.orderIndex,
          });
        }
      } else if (activeTab === 'faqs') {
        // FAQs handling
        if (editingId) {
          await updateFAQ(editingId, {
            question: i18nData.question_i18n.en,
            answer: i18nData.answer_i18n.en,
            question_i18n: i18nData.question_i18n,
            answer_i18n: i18nData.answer_i18n,
            order_index: formData.orderIndex,
          });
        } else {
          await createFAQ({
            question: i18nData.question_i18n.en,
            answer: i18nData.answer_i18n.en,
            question_i18n: i18nData.question_i18n,
            answer_i18n: i18nData.answer_i18n,
            order_index: formData.orderIndex,
          });
        }
      } else if (activeTab === 'past_events') {
        // Past Events handling
        if (editingId) {
          await updatePastEvent(editingId, {
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            location: formData.location,
            date: formData.date,
            image_url: formData.image_url,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            order_index: formData.orderIndex,
          });
        } else {
          await createPastEvent({
            title: i18nData.title_i18n.en,
            description: i18nData.description_i18n.en,
            location: formData.location,
            date: formData.date,
            image_url: formData.image_url,
            title_i18n: i18nData.title_i18n,
            description_i18n: i18nData.description_i18n,
            order_index: pastEventsList.length,
          });
        }
      }

      // Reset form and reload
      resetForm();
      await loadData();
      const tabLabels = {
        news: 'Article',
        events: 'Event',
        team: 'Team member',
        gallery: 'Gallery item',
        partners: 'Partner',
        faqs: 'FAQ',
        past_events: 'Past Event'
      };
      toast.success(`${tabLabels[activeTab as keyof typeof tabLabels]} ${editingId ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Error saving:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsArticle | Event | TeamMember | GalleryItem | Partner | FAQ | PastEvent) => {
    if (activeTab === 'news') {
      const news = item as NewsArticle;
      setFormData({
        title: news.title,
        description: news.description,
        content: news.content,
        category: news.category,
        author: news.author,
        image_url: news.image_url || '',
        location: '',
        date: news.date,
        name: '',
        role: '',
        time: '18:00',
        about_event: '',
        partnerName: '',
        partnerLink: '',
        question: '',
        answer: '',
        bio: '',
        orderIndex: news.order_index || 0,
      });
      setI18nData({
        title_i18n: news.title_i18n || { en: news.title, ar: '', ru: '' },
        description_i18n: news.description_i18n || { en: news.description, ar: '', ru: '' },
        content_i18n: news.content_i18n || { en: news.content, ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
      });
      setImagePreview(news.image_url || null);
    } else if (activeTab === 'events') {
      const event = item as Event;
      setFormData({
        title: event.title,
        description: event.description,
        content: '',
        category: '',
        author: '',
        image_url: event.image_url || '',
        location: event.location || '',
        date: event.date,
        time: event.time || '18:00',
        about_event: event.about_event || '',
        name: '',
        role: '',
      });
      setI18nData({
        title_i18n: event.title_i18n || { en: event.title, ar: '', ru: '' },
        description_i18n: event.description_i18n || { en: event.description, ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: event.about_event_i18n || { en: event.about_event, ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
      });
      setImagePreview(event.image_url || null);
      setEventDetails(event.details || ['', '', '', '']);
      setButtonConfig({
        show_register_button: event.show_register_button ?? true,
        register_url: event.register_url || '',
        show_learn_more_button: event.show_learn_more_button ?? true,
        learn_more_url: event.learn_more_url || '',
      });
    } else if (activeTab === 'team') {
      const member = item as TeamMember;
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Visa Updates',
        author: '',
        image_url: member.image_url || '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        about_event: '',
        name: member.name,
        role: member.role,
        partnerName: '',
        partnerLink: '',
        question: '',
        answer: '',
        bio: '',
        orderIndex: member.order_index || 0,
      });
      setI18nData({
        title_i18n: { en: '', ar: '', ru: '' },
        description_i18n: { en: '', ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        name_i18n: { en: member.name, ar: '', ru: '' },
        role_i18n: member.role_i18n || { en: member.role, ar: '', ru: '' },
        bio_i18n: member.bio_i18n || { en: member.bio, ar: '', ru: '' },
        caption_i18n: { en: '', ar: '', ru: '' },
      });
      setImagePreview(member.image_url || null);
    } else if (activeTab === 'gallery') {
      const gallery = item as GalleryItem;
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Visa Updates',
        author: '',
        image_url: gallery.image_url || '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        about_event: '',
        name: '',
        role: '',
        partnerName: '',
        partnerLink: '',
        question: '',
        answer: '',
        bio: '',
        orderIndex: gallery.order_index || 0,
      });
      setI18nData({
        title_i18n: { en: '', ar: '', ru: '' },
        description_i18n: { en: '', ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
        caption_i18n: gallery.caption_i18n || { en: '', ar: '', ru: '' },
      });
      setImagePreview(gallery.image_url || null);
    } else if (activeTab === 'partners') {
      const partner = item as Partner;
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Visa Updates',
        author: '',
        image_url: partner.logo_url || '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        about_event: '',
        name: '',
        role: '',
        partnerName: partner.name,
        partnerLink: partner.link,
        question: '',
        answer: '',
        bio: '',
        orderIndex: partner.order_index || 0,
      });
      setI18nData({
        title_i18n: { en: '', ar: '', ru: '' },
        description_i18n: { en: '', ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
        caption_i18n: { en: '', ar: '', ru: '' },
      });
      setImagePreview(partner.logo_url || null);
    } else if (activeTab === 'faqs') {
      const faq = item as FAQ;
      setFormData({
        title: '',
        description: '',
        content: '',
        category: 'Visa Updates',
        author: '',
        image_url: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        about_event: '',
        name: '',
        role: '',
        partnerName: '',
        partnerLink: '',
        question: faq.question,
        answer: faq.answer,
        bio: '',
        orderIndex: faq.order_index || 0,
      });
      setI18nData({
        title_i18n: { en: '', ar: '', ru: '' },
        description_i18n: { en: '', ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
        caption_i18n: { en: '', ar: '', ru: '' },
        question_i18n: faq.question_i18n || { en: faq.question, ar: '', ru: '' },
        answer_i18n: faq.answer_i18n || { en: faq.answer, ar: '', ru: '' },
      });
    } else if (activeTab === 'past_events') {
      const pastEvent = item as PastEvent;
      setFormData({
        title: pastEvent.title,
        description: pastEvent.description,
        content: '',
        category: 'Visa Updates',
        author: '',
        image_url: pastEvent.image_url || '',
        location: pastEvent.location,
        date: pastEvent.date,
        time: '18:00',
        about_event: '',
        name: '',
        role: '',
        partnerName: '',
        partnerLink: '',
        question: '',
        answer: '',
        bio: '',
        orderIndex: pastEvent.order_index || 0,
      });
      setI18nData({
        title_i18n: pastEvent.title_i18n || { en: pastEvent.title, ar: '', ru: '' },
        description_i18n: pastEvent.description_i18n || { en: pastEvent.description, ar: '', ru: '' },
        content_i18n: { en: '', ar: '', ru: '' },
        about_event_i18n: { en: '', ar: '', ru: '' },
        role_i18n: { en: '', ar: '', ru: '' },
        bio_i18n: { en: '', ar: '', ru: '' },
        caption_i18n: { en: '', ar: '', ru: '' },
      });
      setImagePreview(pastEvent.image_url || null);
    }
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      if (activeTab === 'news') {
        await deleteNews(id);
      } else if (activeTab === 'events') {
        await deleteEvent(id);
      } else if (activeTab === 'team') {
        await deleteTeamMember(id);
      } else if (activeTab === 'gallery') {
        await deleteGalleryItem(id);
      } else if (activeTab === 'partners') {
        await deletePartner(id);
      } else if (activeTab === 'faqs') {
        await deleteFAQ(id);
      } else if (activeTab === 'past_events') {
        await deletePastEvent(id);
      }
      await loadData();
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'Visa Updates',
      author: '',
      image_url: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      about_event: '',
      name: '',
      role: '',
      partnerName: '',
      partnerLink: '',
      question: '',
      answer: '',
      bio: '',
      orderIndex: 0,
    });
    setI18nData({
      title_i18n: { en: '', ar: '', ru: '' },
      description_i18n: { en: '', ar: '', ru: '' },
      content_i18n: { en: '', ar: '', ru: '' },
      about_event_i18n: { en: '', ar: '', ru: '' },
      name_i18n: { en: '', ar: '', ru: '' },
      role_i18n: { en: '', ar: '', ru: '' },
      bio_i18n: { en: '', ar: '', ru: '' },
      caption_i18n: { en: '', ar: '', ru: '' },
      question_i18n: { en: '', ar: '', ru: '' },
      answer_i18n: { en: '', ar: '', ru: '' },
    });
    setEventDetails(['', '', '', '']);
    setImagePreview(null);
    setButtonConfig({
      show_register_button: true,
      register_url: '',
      show_learn_more_button: true,
      learn_more_url: '',
    });
    setActiveLanguage('en');
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-brand-red hover:opacity-80">
              <ArrowLeft className="w-5 h-5" />
              Back to Site
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-8">
          <button
            onClick={() => setActiveTab('news')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'news'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            News Articles
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'events'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'team'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Team Members
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'gallery'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'partners'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Partners
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'faqs'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('past_events')}
            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
              activeTab === 'past_events'
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {showForm ? (editingId ? 'Edit' : 'Create New') : 'Add New'} {
                activeTab === 'news' ? 'Article' :
                activeTab === 'events' ? 'Event' :
                activeTab === 'team' ? 'Team Member' :
                activeTab === 'gallery' ? 'Gallery Item' :
                activeTab === 'partners' ? 'Partner' :
                activeTab === 'faqs' ? 'FAQ' :
                'Past Event'
              }
            </h2>
            {showForm && (
              <button
                onClick={resetForm}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Language Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                {(['en', 'ar', 'ru'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLanguage(lang)}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      activeLanguage === lang
                        ? 'border-brand-red text-brand-red'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang === 'en' ? '🇬🇧 English' : lang === 'ar' ? '🇸🇦 العربية' : '🇷🇺 Русский'}
                  </button>
                ))}
              </div>

              {activeTab === 'team' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="Team member full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title * ({activeLanguage.toUpperCase()})</label>
                    <input
                      type="text"
                      value={i18nData.role_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        role_i18n: { ...prev.role_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder={`Role in ${activeLanguage.toUpperCase()}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title * ({activeLanguage.toUpperCase()})</label>
                    <input
                      type="text"
                      value={i18nData.title_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        title_i18n: { ...prev.title_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder={`Article/Event title in ${activeLanguage.toUpperCase()}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeTab === 'news' ? 'Author' : 'Location'}
                    </label>
                    <input
                      type="text"
                      name={activeTab === 'news' ? 'author' : 'location'}
                      value={activeTab === 'news' ? formData.author : formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder={activeTab === 'news' ? 'Author name' : 'Event location'}
                    />
                  </div>
                </div>
              )}

              {activeTab !== 'team' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  {activeTab === 'news' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      >
                        <option>Visa Updates</option>
                        <option>Scholarships</option>
                        <option>General</option>
                        <option>Notice</option>
                        <option>Cooperation</option>
                      </select>
                    </div>
                  )}

                  {activeTab === 'events' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'team' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio * ({activeLanguage.toUpperCase()})
                    </label>
                    <textarea
                      value={i18nData.bio_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        bio_i18n: { ...prev.bio_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="Team member bio or description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="0 (first position), 1 (second), etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the position number to control where this team member appears. Lower numbers appear first.</p>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === 'news' ? 'Description' : 'Short Description'} * ({activeLanguage.toUpperCase()})
                  </label>
                  <textarea
                    value={i18nData.description_i18n[activeLanguage]}
                    onChange={(e) => setI18nData(prev => ({
                      ...prev,
                      description_i18n: { ...prev.description_i18n, [activeLanguage]: e.target.value }
                    }))}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder={activeTab === 'news' ? 'Brief summary' : 'Brief event summary for event card'}
                  />
                </div>
              )}

              {activeTab === 'events' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About This Event * ({activeLanguage.toUpperCase()})</label>
                  <textarea
                    value={i18nData.about_event_i18n[activeLanguage]}
                    onChange={(e) => setI18nData(prev => ({
                      ...prev,
                      about_event_i18n: { ...prev.about_event_i18n, [activeLanguage]: e.target.value }
                    }))}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder="Detailed description shown in the event details modal"
                  />
                </div>
              )}

              {activeTab === 'news' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Content * ({activeLanguage.toUpperCase()})</label>
                    <textarea
                      value={i18nData.content_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        content_i18n: { ...prev.content_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="Full article content"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="0 (first position), 1 (second), etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the position number to control where this article appears. Lower numbers appear first.</p>
                  </div>
                </>
              )}

              {activeTab === 'events' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What to Expect (Event Details)</label>
                    <p className="text-xs text-gray-500 mb-3">Add up to 4 details about what attendees will experience</p>
                    <div className="space-y-2">
                      {eventDetails.map((detail, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={detail}
                          onChange={(e) => {
                            const newDetails = [...eventDetails];
                            newDetails[idx] = e.target.value;
                            setEventDetails(newDetails);
                          }}
                          placeholder={`Detail ${idx + 1} (optional)`}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none text-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Event Action Buttons</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={buttonConfig.show_register_button}
                            onChange={(e) => setButtonConfig(prev => ({ ...prev, show_register_button: e.target.checked }))}
                            className="w-4 h-4 text-brand-red rounded focus:ring-2 focus:ring-brand-red"
                          />
                          <span className="text-sm font-medium text-gray-700">Show "Register Now" Button</span>
                        </label>
                        {buttonConfig.show_register_button && (
                          <input
                            type="url"
                            value={buttonConfig.register_url}
                            onChange={(e) => setButtonConfig(prev => ({ ...prev, register_url: e.target.value }))}
                            placeholder="https://example.com/register"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none text-sm mt-2"
                          />
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={buttonConfig.show_learn_more_button}
                            onChange={(e) => setButtonConfig(prev => ({ ...prev, show_learn_more_button: e.target.checked }))}
                            className="w-4 h-4 text-brand-red rounded focus:ring-2 focus:ring-brand-red"
                          />
                          <span className="text-sm font-medium text-gray-700">Show "Learn More" Button</span>
                        </label>
                        {buttonConfig.show_learn_more_button && (
                          <input
                            type="url"
                            value={buttonConfig.learn_more_url}
                            onChange={(e) => setButtonConfig(prev => ({ ...prev, learn_more_url: e.target.value }))}
                            placeholder="https://example.com/learn-more"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none text-sm mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'partners' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
                      <input
                        type="text"
                        name="partnerName"
                        value={formData.partnerName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                        placeholder="Organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Partner Link</label>
                      <input
                        type="url"
                        name="partnerLink"
                        value={formData.partnerLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="0 (first position), 1 (second), etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the position number to control where this partner appears. Lower numbers appear first.</p>
                  </div>
                </>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                  <input
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder="0 (first position), 1 (second), etc..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Set the position number to control where this image appears. Lower numbers appear first.</p>
                </div>
              )}

              {activeTab === 'faqs' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question * ({activeLanguage.toUpperCase()})</label>
                    <input
                      type="text"
                      value={i18nData.question_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        question_i18n: { ...prev.question_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="FAQ question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Answer * ({activeLanguage.toUpperCase()})</label>
                    <textarea
                      value={i18nData.answer_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        answer_i18n: { ...prev.answer_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="FAQ answer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="0 (first position), 1 (second), etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the position number to control where this FAQ appears. Lower numbers appear first.</p>
                  </div>
                </>
              )}

              {activeTab === 'past_events' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title * ({activeLanguage.toUpperCase()})</label>
                    <input
                      type="text"
                      value={i18nData.title_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        title_i18n: { ...prev.title_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="Past event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Description * ({activeLanguage.toUpperCase()})</label>
                    <textarea
                      value={i18nData.description_i18n[activeLanguage]}
                      onChange={(e) => setI18nData(prev => ({
                        ...prev,
                        description_i18n: { ...prev.description_i18n, [activeLanguage]: e.target.value }
                      }))}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="Event description"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                        placeholder="Event location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order Position</label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) => setFormData(prev => ({ ...prev, orderIndex: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                      placeholder="0 (first position), 1 (second), etc..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the position number to control where this event appears. Lower numbers appear first.</p>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'gallery' ? 'Image' : activeTab === 'partners' ? 'Logo' : activeTab === 'past_events' ? 'Event Image' : 'Image'} Upload
                  {(activeTab === 'gallery' || activeTab === 'partners' || activeTab === 'past_events') && <span className="text-red-600"> *</span>}
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-red hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {uploadingImage ? (
                          <>
                            <Loader className="w-6 h-6 animate-spin text-brand-red" />
                            <span className="text-sm text-gray-600">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-brand-red" />
                            <span className="text-sm text-gray-600">Click to upload image</span>
                            <span className="text-xs text-gray-400">PNG, JPG, GIF up to 15MB</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  {imagePreview && (
                    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image_url: '' }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-white rounded-lg shadow hover:bg-red-50"
                      >
                        <X className="w-5 h-5 text-brand-red" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || (activeTab === 'gallery' && !formData.image_url) || (activeTab === 'partners' && (!formData.image_url || !formData.partnerName)) || (activeTab === 'past_events' && !formData.image_url)}
                  className="flex-1 px-6 py-2 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  title={
                    activeTab === 'gallery' && !formData.image_url ? 'Please upload an image' :
                    activeTab === 'partners' && !formData.image_url ? 'Please upload a logo' :
                    activeTab === 'partners' && !formData.partnerName ? 'Please enter partner name' :
                    activeTab === 'past_events' && !formData.image_url ? 'Please upload an event image' :
                    ''
                  }
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {!showForm && (
            <div className="p-6">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700"
              >
                <Plus className="w-5 h-5" />
                Add New {
                  activeTab === 'news' ? 'Article' :
                  activeTab === 'events' ? 'Event' :
                  activeTab === 'team' ? 'Team Member' :
                  activeTab === 'gallery' ? 'Gallery Item' :
                  activeTab === 'partners' ? 'Partner' :
                  activeTab === 'faqs' ? 'FAQ' :
                  'Past Event'
                }
              </button>
            </div>
          )}
        </div>

        {/* List Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {
                activeTab === 'news' ? `Articles (${newsList.length})` :
                activeTab === 'events' ? `Events (${eventsList.length})` :
                activeTab === 'team' ? `Team Members (${teamList.length})` :
                activeTab === 'gallery' ? `Gallery Items (${galleryList.length})` :
                activeTab === 'partners' ? `Partners (${partnersList.length})` :
                activeTab === 'faqs' ? `FAQs (${faqsList.length})` :
                `Past Events (${pastEventsList.length})`
              }
            </h2>
          </div>

          {loading && !showForm ? (
            <div className="p-12 text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto text-brand-red" />
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {activeTab === 'news' && newsList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No articles yet. Create your first one!</div>
              ) : activeTab === 'events' && eventsList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No events yet. Create your first one!</div>
              ) : activeTab === 'team' && teamList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No team members yet. Create your first one!</div>
              ) : activeTab === 'gallery' && galleryList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No gallery items yet. Create your first one!</div>
              ) : activeTab === 'partners' && partnersList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No partners yet. Create your first one!</div>
              ) : activeTab === 'faqs' && faqsList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No FAQs yet. Create your first one!</div>
              ) : activeTab === 'past_events' && pastEventsList.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No past events yet. Create your first one!</div>
              ) : null}

              {activeTab === 'news' &&
                newsList.map(article => (
                  <div key={article.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{article.date}</span>
                          <span className="bg-brand-red text-white px-2 py-1 rounded text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'events' &&
                eventsList.map(event => (
                  <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          {event.location && <span>{event.location}</span>}
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'team' &&
                teamList.map(member => (
                  <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{member.bio}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'gallery' &&
                galleryList.map(item => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 flex gap-4">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.caption_i18n?.en || 'Gallery item'}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <p className="text-sm text-gray-600">{item.caption_i18n?.en || 'No caption'}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {item.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'partners' &&
                partnersList.map(partner => (
                  <div key={partner.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 flex gap-4">
                        {partner.logo_url && (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{partner.link}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {partner.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(partner)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'faqs' &&
                faqsList.map(faq => (
                  <div key={faq.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{faq.answer}</p>
                        <p className="text-xs text-gray-500 mt-2">ID: {faq.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === 'past_events' &&
                pastEventsList.map(event => (
                  <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 flex gap-4">
                        {event.image_url && (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{event.location}</span>
                            <span>{event.date}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">ID: {event.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
