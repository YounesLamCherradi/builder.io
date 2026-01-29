-- Drop existing RLS policies
DROP POLICY IF EXISTS "Allow public read access" ON partner_visions;
DROP POLICY IF EXISTS "Allow authenticated write access" ON partner_visions;
DROP POLICY IF EXISTS "Allow authenticated update access" ON partner_visions;
DROP POLICY IF EXISTS "Allow authenticated delete access" ON partner_visions;

-- Create new RLS policies that allow public access for all operations
-- (Since the admin panel uses its own authentication)
CREATE POLICY "Allow public read access" ON partner_visions
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON partner_visions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON partner_visions
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON partner_visions
  FOR DELETE USING (true);
