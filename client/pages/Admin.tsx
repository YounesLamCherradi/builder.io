import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Loader, Upload, X, LogOut } from 'lucide-react';
import { fetchNews, createNews, updateNews, deleteNews, fetchEvents, createEvent, updateEvent, deleteEvent, fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember, fetchGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem, fetchPartners, createPartner, updatePartner, deletePartner, uploadImage, type NewsArticle, type Event, type TeamMember, type GalleryItem, type Partner } from '../lib/supabase';
import { toast } from 'sonner';

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'team' | 'gallery' | 'partners'>('news');
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'fr' | 'ru'>('en');

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
  });

  // Multilingual form data
  const [i18nData, setI18nData] = useState({
    title_i18n: { en: '', fr: '', ru: '' },
    description_i18n: { en: '', fr: '', ru: '' },
    content_i18n: { en: '', fr: '', ru: '' },
    about_event_i18n: { en: '', fr: '', ru: '' },
    role_i18n: { en: '', fr: '', ru: '' },
    bio_i18n: { en: '', fr: '', ru: '' },
    caption_i18n: { en: '', fr: '', ru: '' },
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
    } else {
      const data = await fetchTeam();
      setTeamList(data);
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

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
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
      } else {
        // Team member handling
        if (editingId) {
          await updateTeamMember(editingId, {
            name: formData.name,
            role: i18nData.role_i18n.en,
            role_i18n: i18nData.role_i18n,
            bio: i18nData.bio_i18n.en,
            bio_i18n: i18nData.bio_i18n,
            image_url: formData.image_url,
          });
        } else {
          await createTeamMember({
            name: formData.name,
            role: i18nData.role_i18n.en,
            role_i18n: i18nData.role_i18n,
            bio: i18nData.bio_i18n.en,
            bio_i18n: i18nData.bio_i18n,
            image_url: formData.image_url,
          });
        }
      }

      // Reset form and reload
      resetForm();
      await loadData();
      toast.success(`${activeTab === 'news' ? 'Article' : activeTab === 'events' ? 'Event' : 'Team member'} ${editingId ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsArticle | Event | TeamMember) => {
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
      });
      setI18nData({
        title_i18n: news.title_i18n || { en: news.title, fr: '', ru: '' },
        description_i18n: news.description_i18n || { en: news.description, fr: '', ru: '' },
        content_i18n: news.content_i18n || { en: news.content, fr: '', ru: '' },
        about_event_i18n: { en: '', fr: '', ru: '' },
        role_i18n: { en: '', fr: '', ru: '' },
        bio_i18n: { en: '', fr: '', ru: '' },
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
        title_i18n: event.title_i18n || { en: event.title, fr: '', ru: '' },
        description_i18n: event.description_i18n || { en: event.description, fr: '', ru: '' },
        content_i18n: { en: '', fr: '', ru: '' },
        about_event_i18n: event.about_event_i18n || { en: event.about_event, fr: '', ru: '' },
        role_i18n: { en: '', fr: '', ru: '' },
        bio_i18n: { en: '', fr: '', ru: '' },
      });
      setImagePreview(event.image_url || null);
      setEventDetails(event.details || ['', '', '', '']);
      setButtonConfig({
        show_register_button: event.show_register_button ?? true,
        register_url: event.register_url || '',
        show_learn_more_button: event.show_learn_more_button ?? true,
        learn_more_url: event.learn_more_url || '',
      });
    } else {
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
      });
      setI18nData({
        title_i18n: { en: '', fr: '', ru: '' },
        description_i18n: { en: '', fr: '', ru: '' },
        content_i18n: { en: '', fr: '', ru: '' },
        about_event_i18n: { en: '', fr: '', ru: '' },
        role_i18n: member.role_i18n || { en: member.role, fr: '', ru: '' },
        bio_i18n: member.bio_i18n || { en: member.bio, fr: '', ru: '' },
      });
      setImagePreview(member.image_url || null);
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
      } else {
        await deleteTeamMember(id);
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
    });
    setI18nData({
      title_i18n: { en: '', fr: '', ru: '' },
      description_i18n: { en: '', fr: '', ru: '' },
      content_i18n: { en: '', fr: '', ru: '' },
      about_event_i18n: { en: '', fr: '', ru: '' },
      role_i18n: { en: '', fr: '', ru: '' },
      bio_i18n: { en: '', fr: '', ru: '' },
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
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {showForm ? (editingId ? 'Edit' : 'Create New') : 'Add New'} {activeTab === 'news' ? 'Article' : activeTab === 'events' ? 'Event' : 'Team Member'}
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
                {(['en', 'fr', 'ru'] as const).map((lang) => (
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
                    {lang === 'en' ? '🇬🇧 English' : lang === 'fr' ? '🇫🇷 Français' : '🇷🇺 Русский'}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
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
                            <span className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</span>
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
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
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
                Add New {activeTab === 'news' ? 'Article' : activeTab === 'events' ? 'Event' : 'Team Member'}
              </button>
            </div>
          )}
        </div>

        {/* List Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'news' ? `Articles (${newsList.length})` : activeTab === 'events' ? `Events (${eventsList.length})` : `Team Members (${teamList.length})`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
