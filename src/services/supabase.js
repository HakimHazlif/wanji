import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://exzqptikrvhrasuxiwpb.supabase.co";
const supabaseKey = import.meta.env.VITE_API_SUPABASE;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
