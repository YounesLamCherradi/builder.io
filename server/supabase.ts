import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: any = null;

if (supabaseUrl && supabaseServiceRoleKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
} else {
  console.warn(
    "⚠️ Supabase credentials not configured for server-side admin operations.\n" +
    "Add SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_SERVICE_ROLE_KEY to your environment.",
  );
}

export { supabaseAdmin };
