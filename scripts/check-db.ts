import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const tables = ['news', 'events', 'partners', 'team', 'gallery', 'faqs', 'past_events', 'subscribers'];
  console.log("Checking tables and data counts...");

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.log(`❌ Table "${table}" error:`, error.message);
    } else {
      const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      // Actually just fetch count directly
      const { count: realCount } = await supabase.from(table).select('*', { count: 'exact', head: true });
      console.log(`✅ Table "${table}" exists. Count: ${realCount}`);
    }
  }
}

checkTables();
