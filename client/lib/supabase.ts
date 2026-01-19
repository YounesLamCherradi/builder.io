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
  role: string;
  role_i18n?: I18nString;
  bio: string;
  bio_i18n?: I18nString;
  image_url: string | null;
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
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
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
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
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
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

// Fetch all team members
export async function fetchTeam(): Promise<TeamMember[]> {
  try {
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: true });

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
