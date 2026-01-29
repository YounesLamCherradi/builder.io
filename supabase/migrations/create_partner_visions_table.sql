-- Create partner_visions table
CREATE TABLE IF NOT EXISTS partner_visions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  quote TEXT NOT NULL,
  quote_i18n JSONB DEFAULT '{"en": "", "ar": "", "ru": ""}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for order_index
CREATE INDEX IF NOT EXISTS idx_partner_visions_order_index ON partner_visions(order_index);

-- Enable RLS
ALTER TABLE partner_visions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access" ON partner_visions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access" ON partner_visions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update access" ON partner_visions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete access" ON partner_visions
  FOR DELETE USING (auth.role() = 'authenticated');
