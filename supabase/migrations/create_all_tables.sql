-- Create News table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  image_url TEXT,
  date DATE DEFAULT CURRENT_DATE,
  title_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  description_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  content_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  order_index INTEGER DEFAULT 0,
  redirect_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  about_event TEXT NOT NULL,
  location TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  image_url TEXT,
  details TEXT[] DEFAULT '{}',
  show_register_button BOOLEAN DEFAULT false,
  register_url TEXT,
  show_learn_more_button BOOLEAN DEFAULT false,
  learn_more_url TEXT,
  title_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  description_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  about_event_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  details_i18n JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Team table
CREATE TABLE IF NOT EXISTS team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  role TEXT NOT NULL,
  role_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  bio TEXT NOT NULL,
  bio_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT NOT NULL,
  name TEXT NOT NULL,
  link TEXT,
  type TEXT CHECK (type IN ('institutional', 'informational')) DEFAULT 'institutional',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  question_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  answer_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Past Events table
CREATE TABLE IF NOT EXISTS past_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  image_url TEXT,
  title_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  description_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read
CREATE POLICY "Allow public read access" ON news FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON team FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON past_events FOR SELECT USING (true);

-- Create RLS policies for subscribers (insert only)
CREATE POLICY "Allow public insert access" ON subscribers FOR INSERT WITH CHECK (true);

-- Note: Admin operations are performed via the Express server using the service_role key,
-- which bypasses RLS policies. No additional policies are strictly needed for the admin panel to function
-- as long as SUPABASE_SERVICE_ROLE_KEY is correctly configured on the server.
