const createClient = require("@supabase/supabase-js");
const supabaseUrl = "https://lrxsabvitoecnhgmynmk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeHNhYnZpdG9lY25oZ215bm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NTUxMzQsImV4cCI6MjAyOTQzMTEzNH0.62r2T8CrtT2BsEV5ve5GoD_hwnEpp5wPoNw5eEasvVE";

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = { supabase };