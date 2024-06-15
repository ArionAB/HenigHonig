import { createClient } from "@supabase/supabase-js";
import { Database } from "@/src/Store/Models/Database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(url, key)

export default supabase