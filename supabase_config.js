// ============================================================================
// გარდაბნის მობილური აკადემია — SUPABASE CONFIGURATION
// ============================================================================
// ეს ფაილი აკავშირებს თქვენს საიტს Supabase-ის უფასო PostgreSQL ღრუბლოვან ბაზასთან.
// ============================================================================

const SUPABASE_CONFIG = {
  // თქვენი Supabase პროექტის URL:
  url: 'https://yybukkmrmhslbyzhtyfh.supabase.co',

  // თქვენი Supabase საჯარო Anon Key:
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5YnVra21ybWhzbGJ5emh0eWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NTgyNTgsImV4cCI6MjEwNjQzNDI1OH0.NemjWHSNBKNksFvqgHvABr5QH4cVLabMOcGEvCaFXXk',

  // ადმინისტრატორის ელ-ფოსტა (ავტომატურად ივსება შესვლის ფორმაში):
  adminEmail: 'sajaia.andria1@gmail.com'
};

// დამხმარე ფუნქცია: ამოწმებს, დაკონფიგურირებულია თუ არა Supabase
function isSupabaseConfigured() {
  return typeof SUPABASE_CONFIG !== 'undefined' &&
         typeof SUPABASE_CONFIG.url === 'string' &&
         SUPABASE_CONFIG.url.startsWith('https://') &&
         !SUPABASE_CONFIG.url.includes('YOUR_SUPABASE') &&
         typeof SUPABASE_CONFIG.anonKey === 'string' &&
         SUPABASE_CONFIG.anonKey.length > 20 &&
         !SUPABASE_CONFIG.anonKey.includes('YOUR_SUPABASE') &&
         typeof supabase !== 'undefined' &&
         typeof supabase.createClient === 'function';
}
