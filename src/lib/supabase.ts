import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
    console.warn('⚠️ Supabase URL is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
