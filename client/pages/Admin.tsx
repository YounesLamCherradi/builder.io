import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Loader, Upload, X } from 'lucide-react';
import { fetchNews, createNews, updateNews, deleteNews, fetchEvents, createEvent, updateEvent, deleteEvent, uploadImage, type NewsArticle, type Event } from '../lib/supabase';
import { toast } from 'sonner';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
  });

  const [eventDetails, setEventDetails] = useState<string[]>([
    '',
    '',
    '',
    '',
  ]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    if (activeTab === 'news') {
      const data = await fetchNews();
      setNewsList(data);
    } else {
      const data = await fetchEvents();
      setEventsList(data);
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
            title: formData.title,
            description: formData.description,
            content: formData.content,
            category: formData.category,
            author: formData.author,
            image_url: formData.image_url,
            date: formData.date,
          });
        } else {
          await createNews({
            title: formData.title,
            description: formData.description,
            content: formData.content,
            category: formData.category,
            author: formData.author,
            image_url: formData.image_url,
            date: formData.date,
          });
        }
      } else {
        if (editingId) {
          await updateEvent(editingId, {
            title: formData.title,
            description: formData.description,
            about_event: formData.about_event,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            image_url: formData.image_url,
            details: eventDetails.filter(d => d.trim()),
          });
        } else {
          await createEvent({
            title: formData.title,
            description: formData.description,
            about_event: formData.about_event,
            location: formData.location,
            date: formData.date,
            time: formData.time,
            image_url: formData.image_url,
            details: eventDetails.filter(d => d.trim()),
          });
        }
      }

      // Reset form and reload
      resetForm();
      await loadData();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsArticle | Event) => {
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
      });
    } else {
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
      });
      setEventDetails(event.details || ['', '', '', '']);
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
      } else {
        await deleteEvent(id);
      }
      await loadData();
    } catch (error) {
      console.error('Error deleting:', error);
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
    });
    setEventDetails(['', '', '', '']);
    setImagePreview(null);
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
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {showForm ? (editingId ? 'Edit' : 'Create New') : 'Add New'} {activeTab === 'news' ? 'Article' : 'Event'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder="Article/Event title"
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
                      <option>Opportunities</option>
                      <option>Success Stories</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'news' ? 'Description' : 'Short Description'} *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                  placeholder={activeTab === 'news' ? 'Brief summary' : 'Brief event summary for event card'}
                />
              </div>

              {activeTab === 'events' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About This Event *</label>
                  <textarea
                    name="about_event"
                    value={formData.about_event}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder="Detailed description shown in the event details modal"
                  />
                </div>
              )}

              {activeTab === 'news' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                    placeholder="Full article content"
                  />
                </div>
              )}

              {activeTab === 'events' && (
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
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-brand-red focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
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
                Add New {activeTab === 'news' ? 'Article' : 'Event'}
              </button>
            </div>
          )}
        </div>

        {/* List Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'news' ? `Articles (${newsList.length})` : `Events (${eventsList.length})`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
