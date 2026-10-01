-- ============================================================================
-- გარდაბნის მობილური აკადემია — SUPABASE SQL SETUP SCRIPT
-- ============================================================================
-- ეს სკრიპტი ქმნის ლოკაციების ცხრილს, რთავს Row-Level Security-ს (RLS)
-- და ავსებს ბაზას 2026 წლის ოქტომბრის 7 დადასტურებული ლოკაციით.
--
-- გამოყენების ინსტრუქცია:
-- 1. შედით Supabase Dashboard-ში: https://supabase.com/dashboard
-- 2. გახსენით "SQL Editor" მარცხენა მენიუდან
-- 3. ჩასვით ეს კოდი და დააჭირეთ "Run" (მწვანე ღილაკს)
-- ============================================================================

-- 1. ლოკაციების ცხრილის შექმნა
CREATE TABLE IF NOT EXISTS locations (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'village',
  date DATE NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  activity_title TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Row-Level Security-ს (RLS) გააქტიურება
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- 3. საჯარო წაკითხვის წესი (Public Read):
-- საიტის ნებისმიერ ვიზიტორს შეუძლია ლოკაციებისა და კალენდრის ნახვა
DROP POLICY IF EXISTS "Public Read Access" ON locations;
CREATE POLICY "Public Read Access"
ON locations
FOR SELECT
TO public
USING (true);

-- 4. ადმინისტრატორის ჩაწერის წესები (Admin Only Write):
-- მხოლოდ ავტორიზებულ მომხმარებელს (Admin-ს) შეუძლია დამატება, ჩასწორება და წაშლა
DROP POLICY IF EXISTS "Admin Insert Access" ON locations;
CREATE POLICY "Admin Insert Access"
ON locations
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Update Access" ON locations;
CREATE POLICY "Admin Update Access"
ON locations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Delete Access" ON locations;
CREATE POLICY "Admin Delete Access"
ON locations
FOR DELETE
TO authenticated
USING (true);

-- 5. საწყისი 7 დადასტურებული ლოკაციის შეყვანა (ოქტომბერი 2026)
INSERT INTO locations (id, name, short_name, type, date, latitude, longitude, activity_title, activity_description)
VALUES
(1, 'მთავარი ჰაბი — ქ. გარდაბანი', 'ქ. გარდაბანი', 'hub', '2026-10-03', 41.4589, 45.0928, 'ცენტრალური საგანმანათლებლო პროგრამა და კოორდინაცია', 'პროგრამის ძირითადი შტაბი და ცენტრალური შეხვედრების სივრცე. ქართველ და აზერბაიჯანელ ახალგაზრდებს შორის კულტურული დიალოგი, ენობრივი გაცვლა და ტექნოლოგიური ვორქშოფები.'),
(2, 'ლოკაცია 1: სოფ. კესალო', 'კესალო', 'village', '2026-10-07', 41.4360, 45.0315, 'მობილური ვორქშოფი: შემოქმედებითი უნარები და გუნდურობა', 'ახალგაზრდული გუნდური პროექტები, ხელოვნების თერაპია, დებატები და ერთობლივი ინიციატივების დაგეგმვა ადგილობრივი თემის მონაწილეობით.'),
(3, 'ლოკაცია 2: სოფ. ნაზარლო', 'ნაზარლო', 'village', '2026-10-12', 41.4085, 45.0740, 'მობილური ვორქშოფი: სამოქალაქო ჩართულობა და მედიაწიგნიერება', 'ტრენინგები კრიტიკულ აზროვნებაში, ციფრული უსაფრთხოება, ადგილობრივი საჭიროებების ადვოკატირება და სამოქალაქო აქტივიზმი.'),
(4, 'ლოკაცია 3: სოფ. სართიჭალა', 'სართიჭალა', 'village', '2026-10-16', 41.7145, 45.1820, 'მობილური ვორქშოფი: ტექნოლოგიები და კარიერული ორიენტაცია', 'ციფრული უნარების განვითარება, თანამედროვე პროფესიების გაცნობა, CV-ის შედგენა და პროფესიული განათლების შესაძლებლობები.'),
(5, 'ლოკაცია 4: სოფ. კუმისი', 'კუმისი', 'village', '2026-10-21', 41.5860, 44.8380, 'მობილური ვორქშოფი: ეკოლოგია და გარემოსდაცვითი ინიციატივები', 'ერთობლივი ეკო-აქტივობები, კუმისის ტბის მიმდებარე ტერიტორიის დასუფთავების აქცია და გარემოსდაცვითი ცნობიერების ამაღლება.'),
(6, 'ლოკაცია 5: სოფ. ყარაჯალარი', 'ყარაჯალარი', 'village', '2026-10-25', 41.5650, 45.0220, 'მობილური ვორქშოფი: ქართულ-აზერბაიჯანული ენობრივი კლუბი', 'ინტერაქტიული ენობრივი თამაშები, ორმხრივი ენის პრაქტიკა, კულტურათაშორისი დიალოგი და ახალგაზრდების დამეგობრების კლუბი.'),
(7, 'ლოკაცია 6: სოფ. ვახტანგისი', 'ვახტანგისი', 'village', '2026-10-29', 41.3480, 45.1050, 'მობილური ვორქშოფი: სოციალური მეწარმეობა და იდეების ბანკი', 'სასაზღვრო რეგიონის ახალგაზრდებისთვის მცირე სოციალური ბიზნეს-იდეების გენერირება და სათემო პროექტების დაფინანსების შესაძლებლობები.')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  type = EXCLUDED.type,
  date = EXCLUDED.date,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  activity_title = EXCLUDED.activity_title,
  activity_description = EXCLUDED.activity_description;

-- ============================================================================
-- 6. მენტორების ცხრილის შექმნა (MENTORS TABLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'მენტორი',
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  avatar_color TEXT DEFAULT '#8b5cf6',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Row-Level Security მენტორების ცხრილისთვის
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Mentors" ON mentors;
CREATE POLICY "Public Read Mentors"
ON mentors
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Admin Insert Mentors" ON mentors;
CREATE POLICY "Admin Insert Mentors"
ON mentors
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Update Mentors" ON mentors;
CREATE POLICY "Admin Update Mentors"
ON mentors
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Delete Mentors" ON mentors;
CREATE POLICY "Admin Delete Mentors"
ON mentors
FOR DELETE
TO authenticated
USING (true);

-- 8. საწყისი 5 მენტორის შეყვანა
INSERT INTO mentors (id, name, role, description, tags, avatar_color)
VALUES
(1, 'დაკო კეჟერაშვილი', 'მენტორი', 'არაფორმალური განათლება, კულტურათაშორისი დიალოგი და შემოქმედებითი უნარების განვითარება ახალგაზრდებში.', ARRAY['არაფორმალური განათლება', 'კულტურათაშორისი დიალოგი'], '#8b5cf6'),
(2, 'ნია ჩინტლაძე', 'მენტორი', 'ახალგაზრდული ინიციატივები, სამოქალაქო აქტივიზმი და სათემო პროექტების დაგეგმვა.', ARRAY['ახალგაზრდული პროექტები', 'სამოქალაქო აქტივიზმი'], '#ec4899'),
(3, 'მიშო გოგიაშვილი', 'მენტორი', 'კომუნიკაცია, გუნდური ლიდერობა და ახალგაზრდების ჩართულობის პროგრამების კოორდინაცია.', ARRAY['გუნდური ლიდერობა', 'კომუნიკაცია'], '#3b82f6'),
(4, 'დავით მაკარიანი', 'მენტორი', 'ტექნოლოგიები, ციფრული წიგნიერება და რეგიონული ახალგაზრდების ინოვაციური პროექტები.', ARRAY['ციფრული უნარები', 'ინოვაციები'], '#10b981'),
(5, 'ანდრია საჯაია', 'მენტორი', 'სოციალური მეწარმეობა, კვლევა და საგანმანათლებლო მოდულების განვითარება.', ARRAY['სოციალური მეწარმეობა', 'საგანმანათლებლო მოდულები'], '#0d9488')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags,
  avatar_color = EXCLUDED.avatar_color;

-- ============================================================================
-- 9. ვიზიტების ანალიტიკის ცხრილი (SITE ANALYTICS TABLE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT DEFAULT '',
  consent_status TEXT DEFAULT 'pending',
  is_returning BOOLEAN DEFAULT false,
  visit_count INT DEFAULT 1,
  network_type TEXT DEFAULT '',
  scroll_depth INT DEFAULT 0,
  page_path TEXT NOT NULL,
  page_title TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  device_type TEXT DEFAULT 'Desktop',
  os TEXT DEFAULT '',
  browser TEXT DEFAULT 'Unknown',
  screen_resolution TEXT DEFAULT '',
  language TEXT DEFAULT '',
  duration_seconds INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- მიგრაცია არსებული ცხრილისთვის (თუ უკვე შექმნილია)
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS visitor_id TEXT DEFAULT '';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS consent_status TEXT DEFAULT 'pending';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS is_returning BOOLEAN DEFAULT false;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS visit_count INT DEFAULT 1;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS network_type TEXT DEFAULT '';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS scroll_depth INT DEFAULT 0;
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS browser_lang TEXT DEFAULT 'ka';
ALTER TABLE site_analytics ADD COLUMN IF NOT EXISTS load_time_seconds DOUBLE PRECISION DEFAULT 0;

-- 10. Row-Level Security ანალიტიკისთვის
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- საჯარო ჩაწერა (ანონიმური ვიზიტორებისთვის)
DROP POLICY IF EXISTS "Public Insert Analytics" ON site_analytics;
CREATE POLICY "Public Insert Analytics"
ON site_analytics
FOR INSERT
TO public
WITH CHECK (true);

-- საჯარო განახლება (სესიის ხანგრძლივობის გასაზრდელად)
DROP POLICY IF EXISTS "Public Update Analytics" ON site_analytics;
CREATE POLICY "Public Update Analytics"
ON site_analytics
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- წაკითხვა მხოლოდ ავტორიზებული ადმინისტრატორისთვის
DROP POLICY IF EXISTS "Admin Read Analytics" ON site_analytics;
CREATE POLICY "Admin Read Analytics"
ON site_analytics
FOR SELECT
TO authenticated
USING (true);

-- ============================================================================
-- 11. ანალიტიკის ივენთების ცხრილი (სოფლების ნახვები & ნავიგაცია)
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_analytics_events (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  target_name TEXT DEFAULT '',
  page_path TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Insert Events" ON site_analytics_events;
CREATE POLICY "Public Insert Events"
ON site_analytics_events
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Read Events" ON site_analytics_events;
CREATE POLICY "Admin Read Events"
ON site_analytics_events
FOR SELECT
TO authenticated
USING (true);

-- საწყისი სადემონსტრაციო ვიზიტები
INSERT INTO site_analytics (session_id, visitor_id, consent_status, is_returning, visit_count, network_type, scroll_depth, page_path, page_title, referrer, device_type, os, browser, screen_resolution, language, browser_lang, load_time_seconds, duration_seconds, created_at)
VALUES
('sess_demo_1', 'usr_demo_1', 'accepted', true, 3, '4G', 85, 'index.html', 'გარდაბნის მობილური აკადემია', 'Facebook', 'Mobile', 'iOS', 'Safari', '390x844', 'ka-GE', 'ka', 0.9, 145, NOW() - INTERVAL '15 minutes'),
('sess_demo_2', 'usr_demo_2', 'accepted', false, 1, '4G', 100, 'calendar.html', 'კალენდარი — გარდაბნის მობილური აკადემია', 'პირდაპირი (Direct)', 'Mobile', 'Android', 'Chrome', '412x915', 'az', 'az', 1.2, 230, NOW() - INTERVAL '40 minutes'),
('sess_demo_3', 'usr_demo_3', 'accepted', true, 2, 'WIFI', 60, 'mentors.html', 'მენტორები — გარდაბნის მობილური აკადემია', 'Google', 'Desktop', 'Windows', 'Chrome', '1920x1080', 'ka-GE', 'ka', 0.7, 180, NOW() - INTERVAL '1 hour'),
('sess_demo_4', '', 'rejected', false, 1, '3G', 40, 'index.html', 'გარდაბნის მობილური აკადემია', 'Facebook', 'Mobile', 'Android', 'Samsung Internet', '384x854', 'ka-GE', 'ka', 2.1, 95, NOW() - INTERVAL '2 hours'),
('sess_demo_5', 'usr_demo_5', 'accepted', true, 5, 'WIFI', 90, 'settings.html', 'პარამეტრები — გარდაბნის მობილური აკადემია', 'პირდაპირი (Direct)', 'Desktop', 'macOS', 'Safari', '1440x900', 'en-US', 'en', 1.0, 310, NOW() - INTERVAL '3 hours')
ON CONFLICT DO NOTHING;


