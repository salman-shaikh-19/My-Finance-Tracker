import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = "https://wudvvfqqjqtjplznzwdj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZHZ2ZnFxanF0anBsem56d2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NzYzMzIsImV4cCI6MjA3NDM1MjMzMn0.o4AN4VGMPayB8BU9HcSwuVLzpYb7ldvPdE51PhbFA2Q";



// Create a single Supabase client instance
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



export default supabase;
