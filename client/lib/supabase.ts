import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn(
    '⚠️  Supabase credentials not configured.\n' +
    'Add these to your .env.local file:\n' +
    'VITE_SUPABASE_URL=your_url\n' +
    'VITE_SUPABASE_ANON_KEY=your_key\n\n' +
    'News and events will not load without proper Supabase configuration.'
  );

  // Create a mock client that returns empty data for development
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      delete: () => Promise.resolve({ error: new Error('Supabase not configured') }),
      eq: () => Promise.resolve({ data: null, error: null }),
      order: () => Promise.resolve({ data: [], error: null }),
    }),
  };
}

export { supabase };

// Subscriber types
export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

// Multilingual string type
export type I18nString = {
  en: string;
  fr: string;
  ar: string;
  ru: string;
};

// News types
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  date: string;
  title_i18n?: I18nString;
  description_i18n?: I18nString;
  content_i18n?: I18nString;
  order_index?: number;
  created_at: string;
}

// Events types
export interface Event {
  id: string;
  title: string;
  description: string;
  about_event: string;
  location: string | null;
  date: string;
  time: string;
  image_url: string | null;
  details?: string[];
  show_register_button: boolean;
  register_url: string | null;
  show_learn_more_button: boolean;
  learn_more_url: string | null;
  title_i18n?: I18nString;
  description_i18n?: I18nString;
  about_event_i18n?: I18nString;
  details_i18n?: Record<string, string[]>;
  created_at: string;
}

// Team types
export interface TeamMember {
  id: string;
  name: string;
  name_i18n?: I18nString;
  role: string;
  role_i18n?: I18nString;
  bio: string;
  bio_i18n?: I18nString;
  image_url: string | null;
  order_index: number;
  created_at: string;
}

// Gallery types
export interface GalleryItem {
  id: string;
  image_url: string;
  caption_i18n?: I18nString;
  order_index: number;
  created_at: string;
}

// Partners types
export interface Partner {
  id: string;
  logo_url: string;
  name: string;
  link: string;
  order_index: number;
  created_at: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  question_i18n?: I18nString;
  answer_i18n?: I18nString;
  order_index: number;
  created_at: string;
}

// Past Events types
export interface PastEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image_url: string | null;
  title_i18n?: I18nString;
  description_i18n?: I18nString;
  order_index: number;
  created_at: string;
}

// Fetch all news
export async function fetchNews(): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching news:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching news:', err);
    return [];
  }
}

// Fetch single news article
export async function fetchNewsById(id: string): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching news:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Create news article
export async function createNews(article: Omit<NewsArticle, 'id' | 'created_at'>): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error('Error creating news:', error);
      throw new Error(`Failed to create news: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
}

// Update news article
export async function updateNews(id: string, updates: Partial<Omit<NewsArticle, 'id' | 'created_at'>>): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating news:', error);
      throw new Error(`Failed to update news: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
}

// Delete news article
export async function deleteNews(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting news:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Fetch all events
export async function fetchEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching events:', err);
    return [];
  }
}

// Create event
export async function createEvent(event: Omit<Event, 'id' | 'created_at'>): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update event
export async function updateEvent(id: string, updates: Partial<Omit<Event, 'id' | 'created_at'>>): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete event
export async function deleteEvent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Subscribe to newsletter
export async function subscribeNewsletter(email: string): Promise<boolean> {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      console.log('Email already subscribed');
      return true;
    }

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      console.error('Error subscribing:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Upload file to Supabase Storage
export async function uploadImage(file: File, bucket: string = 'media'): Promise<string | null> {
  try {
    console.log('Starting image upload...', { fileName: file.name, fileSize: file.size, fileType: file.type });

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    console.log('Uploading to path:', filePath);

    const { data, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Upload Error:', {
        message: uploadError.message,
        status: (uploadError as any).status,
        error: uploadError
      });
      return null;
    }

    console.log('✅ Upload successful:', filePath);

    // Get public URL
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
    console.log('Generated public URL:', urlData.publicUrl);

    return urlData.publicUrl;
  } catch (err) {
    console.error('❌ Unexpected error during image upload:', err);
    console.error('Error details:', (err as any).message || JSON.stringify(err));
    return null;
  }
}

// Fetch all team members
export async function fetchTeam(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching team:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching team:', err);
    return [];
  }
}

// Fetch single team member
export async function fetchTeamById(id: string): Promise<TeamMember | null> {
  try {
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team member:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Create team member
export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at'>): Promise<TeamMember | null> {
  try {
    const { data, error } = await supabase
      .from('team')
      .insert([member])
      .select()
      .single();

    if (error) {
      console.error('Error creating team member:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update team member
export async function updateTeamMember(id: string, updates: Partial<Omit<TeamMember, 'id' | 'created_at'>>): Promise<TeamMember | null> {
  try {
    const { data, error } = await supabase
      .from('team')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating team member:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete team member
export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting team member:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Fetch all gallery items
export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching gallery:', err);
    return [];
  }
}

// Create gallery item
export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at'>): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery item:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update gallery item
export async function updateGalleryItem(id: string, updates: Partial<Omit<GalleryItem, 'id' | 'created_at'>>): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gallery item:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete gallery item
export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery item:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Fetch all partners
export async function fetchPartners(): Promise<Partner[]> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching partners:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching partners:', err);
    return [];
  }
}

// Create partner
export async function createPartner(partner: Omit<Partner, 'id' | 'created_at'>): Promise<Partner | null> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .insert([partner])
      .select()
      .single();

    if (error) {
      console.error('Error creating partner:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update partner
export async function updatePartner(id: string, updates: Partial<Omit<Partner, 'id' | 'created_at'>>): Promise<Partner | null> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating partner:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete partner
export async function deletePartner(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting partner:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Fetch all FAQs
export async function fetchFAQs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching FAQs:', err);
    return [];
  }
}

// Create FAQ
export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>): Promise<FAQ | null> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single();

    if (error) {
      console.error('Error creating FAQ:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update FAQ
export async function updateFAQ(id: string, updates: Partial<Omit<FAQ, 'id' | 'created_at'>>): Promise<FAQ | null> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating FAQ:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete FAQ
export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}

// Fetch all past events
export async function fetchPastEvents(): Promise<PastEvent[]> {
  try {
    const { data, error } = await supabase
      .from('past_events')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching past events:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching past events:', err);
    return [];
  }
}

// Create past event
export async function createPastEvent(event: Omit<PastEvent, 'id' | 'created_at'>): Promise<PastEvent | null> {
  try {
    const { data, error } = await supabase
      .from('past_events')
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error('Error creating past event:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Update past event
export async function updatePastEvent(id: string, updates: Partial<Omit<PastEvent, 'id' | 'created_at'>>): Promise<PastEvent | null> {
  try {
    const { data, error } = await supabase
      .from('past_events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating past event:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Delete past event
export async function deletePastEvent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('past_events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting past event:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error:', err);
    return false;
  }
}
